---
title: Konsumere API
description: En applikasjon kan konsumere åpne og lukkede api som er tilgjengelig på Internett.
toc: true
weight: 100
---

ASP.Net Core har gode muligheter til å konsumere forskjellige typer API. 

## Konsumere REST API uten klientbibliotek
Hvis REST API'et ikke tilbyr et klientbibliotek for sitt API må dette opprettes som en del av applikasjonen eller som et ekstern bibliotek.

### Definere API modeller.
Hvis API som skal konsumeres er dokumentert ved hjelp av Swagger eller OpenAPI kan man relativt lett genere C# klasser basert på datamodellen.

Dette kan gjøres manuelt eller forskjellige nettsider som tilbyr en slik generering. Bruke man Visual Studio kan man konvertere dette direkte. (Paste JSON as classes)

```c#
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

Eksempel modeler for API ses [her](https://dev.altinn.studio/repos/ttd/mva/src/branch/master/App/services/br/models). 

### Definere Klient Interface
Det anbefales at det defineres et interface for klienten som skal kalle API. Dette gjør at man kan benytte seg av dependency injection 
ved enhetstesting for å kunne mocke vekk API kall.  Definer interface


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
Eksempel interface kan sees [her](https://dev.altinn.studio/repos/ttd/mva/src/branch/master/App/services/br/client/IEnhetsregisteret.cs).


### Implementere klient
Klienten er selve koden som gjøre kallene mot API og omformer resultatet til gitt datamodell

```c#
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


            Enhet result = new Enhet();

            HttpResponseMessage respons = await ApiClient.GetAsync(apiUrl);

            if (respons.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string responseData = respons.Content.ReadAsStringAsync().Result;
                result = JsonConvert.DeserializeObject<Enhet>(responseData);
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

                _apiClient = GetNewHttpClient("https://data.brreg.no/enhetsregisteret/api/");

                return _apiClient;
            }
        }

        private HttpClient GetNewHttpClient(string apiEndpoint)
        {
            HttpClient httpClient = new HttpClient
            {
                BaseAddress = new Uri(apiEndpoint)
            };

            return httpClient;
        }
    }
}

```

Eksempel kan sees [her](https://dev.altinn.studio/repos/ttd/mva/src/branch/master/App/services/br/client/EnhetsregistreretCI.cs)

## Sett opp klient i applikasjon
Når tjensten med interface og klient er implementert kan den settes opp for bruk av applikasjonen. 

Dette gjøres i startup hvor det settes opp interface og implementasjon av interface som tilbyr en gitt service til applikasjonen.

```C#
// Custom service used by this application
services.AddTransient<IEnhetsregisteret, EnhetsregistreretCI>();

```

Eksempel kan sees [her](https://dev.altinn.studio/repos/ttd/mva/src/branch/master/App/Startup.cs)


## Konsumere REST API fra applikasjonslogikk/api kontrollere
For å få tak i service som er satt opp i applikasjonen må disse "injectes" inn i konstrukturøen på kontrolleren eller applikasjonslogikken. 


```C#
using System.Threading.Tasks;
using Altinn.App.services.br.client;
using Altinn.App.services.br.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Altinn.App.controllers
{

    [Route("{org}/{app}/enhetsregisteret")]
    [ApiController]
    public class EnhetsregisteretController : ControllerBase
    {

        private IEnhetsregisteret _enhetsregisteret;

        public EnhetsregisteretController(
            IEnhetsregisteret enhetsregisteret)
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
Eksempel kan sees [her](https://dev.altinn.studio/repos/ttd/mva/src/branch/master/App/controllers/EnhetsregisteretController.cs)