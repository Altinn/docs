---
title: Konsumere APIer i en app
linktitle: Konsumere
description: En applikasjon kan konsumere åpne og lukkede API som er tilgjengelig via Internett.
toc: true
---

ASP.NET Core har gode muligheter til å konsumere forskjellige typer API.

Dette kan være nyttig dersom man ønsker å eksponere organisasjonens
egne API via en app eller har behov for hjelp fra eksterne API i applikasjonslogikken.

Det er mange måter å gjøre dette på, og på denne siden finner du eksempler på
hvordan man kan konsumere REST APIer i en app.


## Kalle et eksternt API direkte i en metode

I dette eksemplet brukes et åpent API til å kalkulere et felt i skjemaet basert på input i et annet felt.
Klientkallet implementeres direkte i kalkuleringsmetoden og det implementeres en modell for å kunne parse API responsen.

[REST Countries](https://restcountries.eu/) tilbyr et API som returnerer fakta om et land dersom man sender med navnet på landet.
Vi ønsker å lage en app som tilbyr en bruker å søke opp hovedstaden i et land
ved å bruke deres åpne API-endepunkt: `https://restcountries.eu/rest/v2/name/`.

![App example animation](capital-app-example.gif "App example")

API-kallet er lagt til i kalkuleringsmetoden i `App/logic/CalculationHandler`
slik at et nytt søk trigges hver gang man endrer et felt i appen.

Forutsetninger:

1. Det er laget en app i Altinn Studio.
2. Det er lastet opp en datamodell som beskriver verden bestående av land med et navn og en hovedstad.
3. Autogenerert C# klasse av datamodellen er utvidet med JSON-property tags for å kunne gjenbruke klassen i parsing av API responsen.

Implementasjon:

```C# {hl_lines=[14,19]}
/// <summary>
/// Perform calculations and update data model
/// </summary>
/// <param name="instance">The data</param>
public async Task<bool> Calculate(object instance)
{
    if (instance.GetType() == typeof(Verden))
    {
        Verden verden = (Verden)instance;
        string navn = verden?.land?.Navn;

        if (!string.IsNullOrEmpty(navn))
        {
            using var client = new HttpClient
            {
                BaseAddress = new Uri("https://restcountries.eu/rest/v2/name/");
            };

            HttpResponseMessage response = await client.GetAsync(navn);

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var land = await response.Content.ReadAsAsync<List<Land>>();
                Land l = land.FirstOrDefault();
                verden.land.Hovedstad = l.Hovedstad;
            }
            else {
                verden.land.Hovedstad =
                    $"Hmm.. Du skrev {navn}. Er det et land?";
            }
        }
    }
    
    return true;
}
```

## Konsumere REST API uten klientbibliotek

I dette eksemplet setter man opp en klient som konsumerer et åpent API til bruk i ulike deler av appen.
Vi dekker oppsett av et klient interface, implementasjon av klient, tilgjengeliggjøring av klienten i appen og dependency injection inn i ulike klasser.

Hvis REST API'et ikke tilbyr et klientbibliotek for sitt API må dette opprettes som en del av applikasjonen eller som et ekstern bibliotek.

### Definere API modeller

Hvis API-et som skal konsumeres er dokumentert ved hjelp av Swagger eller OpenAPI kan man relativt lett genere C# klasser basert på datamodellen.
Dette kan gjøres manuelt eller ved hjelp av verktøy som tilbyr slik generering.
Bruker man Visual Studio kan man konvertere dette direkte. Velg "Paste JSON as classes".

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Altinn.App.services.br.models
{
    public class Enhet
    {
        public string organisasjonsnummer { get; set; }
        public string navn { get; set; }
        public Organisasjonsform organisasjonsform { get; set; }
        public Adresse postadresse { get; set; }
        public string registreringsdatoEnhetsregisteret { get; set; }
        public bool registrertIMvaregisteret { get; set; }
        public Naeringskode naeringskode1 { get; set; }
        public int antallAnsatte { get; set; }
        public Adresse forretningsadresse { get; set; }
        public string stiftelsesdato { get; set; }
        public Institusjonellsektorkode institusjonellSektorkode { get; set; }
        public bool registrertIForetaksregisteret { get; set; }
        public bool registrertIStiftelsesregisteret { get; set; }
        public bool registrertIFrivillighetsregisteret { get; set; }
        public string sisteInnsendteAarsregnskap { get; set; }
        public bool konkurs { get; set; }
        public bool underAvvikling { get; set; }
        public bool underTvangsavviklingEllerTvangsopplosning { get; set; }
        public string maalform { get; set; }
        public Links _links { get; set; }
    }
}
```

Eksempel modeller for API ses [her](https://altinn.studio/repos/ttd/mva/src/branch/master/App/services/br/models).

### Definere Klient Interface

Det anbefales at det defineres et interface for klienten som skal kalle API. Dette gjør at man kan benytte seg av dependency injection 
ved enhetstesting for å kunne mocke vekk API kall.  Definer interface som vist nedenfor.

```C#
using Altinn.App.services.br.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Altinn.App.services.br.client
{
    public interface IEnhetsregisteret
    {
        Task<Enhet> GetEnhetAsync(string orgnr);
    }
}
```

Eksempel interface kan sees [her](https://altinn.studio/repos/ttd/mva/src/branch/master/App/services/br/client/IEnhetsregisteret.cs).

### Implementere klient

Klienten er selve koden som gjøre kallene mot API og omformer resultatet til gitt datamodell.

```C# {linenos=false,hl_lines=[20,25]}
using Altinn.App.services.br.models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Altinn.App.services.br.client
{
    public class EnhetsregistreretCI : IEnhetsregisteret
    {
        private HttpClient _apiClient;

        public async Task<Enhet> GetEnhetAsync(string orgnr)
        {
            string apiUrl = $"enheter/" + orgnr;
            var result = new Enhet();

            HttpResponseMessage respons = await ApiClient.GetAsync(apiUrl);

            if (respons.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string data = respons.Content.ReadAsStringAsync().Result;
                result = JsonConvert.DeserializeObject<Enhet>(data);
            }

            return result;
        }

        public HttpClient ApiClient
        {
            get
            {
                if (_apiClient != null)
                {
                    return _apiClient;
                }

                string url = "https://data.brreg.no/enhetsregisteret/api/";
                _apiClient = GetNewHttpClient(url);

                return _apiClient;
            }
        }

        private HttpClient GetNewHttpClient(string apiEndpoint)
        {
            var httpClient = new HttpClient
            {
                BaseAddress = new Uri(apiEndpoint)
            };

            return httpClient;
        }
    }
}
```

Eksempel kan sees [her](https://altinn.studio/repos/ttd/mva/src/branch/master/App/services/br/client/EnhetsregistreretCI.cs).

### Sett opp klient i applikasjon

Når tjenesten med interface og klient er implementert kan den settes opp for bruk av applikasjonen.

Dette gjøres i _App/Startup.cs_ hvor det settes opp interface og implementasjon av interface som tilbyr en gitt service til applikasjonen.

```C#
// Custom service used by this application
services.AddTransient<IEnhetsregisteret, EnhetsregistreretCI>();
```

Eksempel kan sees [her](https://altinn.studio/repos/ttd/mva/src/branch/master/App/Startup.cs)


## Konsumere API fra applikasjonslogikk/API kontrollere

For å få tak i service som er satt opp i applikasjonen må disse "injectes" inn i konstrukturøen på kontrolleren eller applikasjonslogikken.

```C# {linenos=false,hl_lines=[17,23]}
using System.Threading.Tasks;
using Altinn.App.services.br.client;
using Altinn.App.services.br.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Altinn.App.controllers
{
    [ApiController]
    [Route("{org}/{app}/enhetsregisteret")]
    public class EnhetsregisteretController : ControllerBase
    {
        private IEnhetsregisteret _enhetsregisteret;

        public EnhetsregisteretController(IEnhetsregisteret enhetsregisteret)
        {
            _enhetsregisteret = enhetsregisteret;
        }

        [HttpGet("enhet/{orgnr}")]
        public async Task<ActionResult<Enhet>> GetEnhet([FromRoute] string orgnr)
        {
            Enhet enhet = await _enhetsregisteret.GetEnhetAsync(orgnr);
            return Ok(enhet);
        }
    }
}
```

Eksempel kan sees [her](https://altinn.studio/repos/ttd/mva/src/branch/master/App/controllers/EnhetsregisteretController.cs).
