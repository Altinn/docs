---
title: Validering
description: Hvordan legge til logikk for å validere skjemadata?
toc: true
---

## Introduksjon

Valideringer sørger for at brukerens input er gyldig med tanke på datamodellen,
i tillegg til alle egendefinerte regler som settes opp for applikasjonen.
Valideringer kan kjøres enten på klient (dvs. browseren) eller serversiden.

## Klientside-validering

Dette er validering som kjøres i browseren, FØR data er sendt til server for lagring. Dette gjør det mulig å gi raske tilbakemeldinger til 
sluttbruker underveis i utfylling.

Klientside-validering baserer seg på datamodellen som hører til skjemaet, og bruker denne til å bestemme hva som er gyldig input i et felt.
Helt konkret brukes JSON Schema utgaven av datamodellen for valideringen. Denne genereres automatisk når man laster opp XSD.
Det går an å gjøre endringer i JSON schema direkte for å tilpasse valideringen ved behov.

**Merk at dersom man gjør tilpasninger i JSON schema manuelt, for å så oppdatere XSD og laste inn på nytt, vil nytt
JSON schema også genereres, og alle manuelle tilpasninger må gjøres på nytt. Derfor er det anbefalt å gjøre endringer i XSD og/eller datamodelleringsverktøyet
for at disse endringene skal reflekteres i JSON schema.**

Et eksempel på hvordan et felt kan defineres i JSON schema datamodellen er:

```JSON
"someField": {
  "type": "string",
  "maxLength": "4"
}
```

Input i dette feltet vil valideres mot begrensningene som er satt opp, og en feilmelding vil vises dersom disse ikke møtes - i dette tilfellet, dersom 
input er en tekst med lengde mer enn 4 karakterer.

### Standard feilmeldinger
Det er satt opp standard feilmeldinger for alle valideringene som gjøres på klientsiden. Se oversikten under.

| Regel     | Feilmelding bokmål            | Feilmelding nynorsk           | Feilmelding engelsk                   |
| --------- | ----------------------------- | ----------------------------- | ------------------------------------- |
| min       | 'Minste gyldig verdi er {0}'  | 'Minste gyldig verdi er {0}'  | 'Minimum valid value is {0}'          |
| max       | 'Største gyldig verdi er {0}' | 'Største gyldig verdi er {0}' | 'Maximum valid value is {0}'          |
| minLength | 'Bruk {0} eller flere tegn'   | 'Bruk {0} eller flere tegn'   | 'Use {0} or more characters'          |
| maxLength | 'Bruk {0} eller færre tegn'   | 'Bruk {0} eller færre tegn'   | 'Use {0} or fewer characters'         |
| length    | 'Antall tillatte tegn er {0}' | 'Antall tillatte tegn er {0}' | 'Number of characters allowed is {0}' |
| pattern   | 'Feil format eller verdi'     | 'Feil format eller verdi'     | 'Wrong format or value'               |
| required  | 'Feltet er påkrevd'           | 'Feltet er påkrevd'           | 'Field is required'                   |
| enum      | 'Kun verdiene {0} er tillatt' | 'Kun verdiene {0} er tillatt' | 'Only the values {0} are permitted'   |

### Egendefinerte feilmeldinger
Det er mulig å definere egne feilmeldinger som skal vises når et felt får valideringsfeil. Dette gjøres ved å legge på en parameter `errorMessage` der 
hvor feltet er definert i JSON schema. F.eks., man kan utvide eksempelet over:

```json  {hl_lines=[4]}
"someField": {
  "type": "string",
  "maxLength": "4",
  "errorMessage": "myCustomError"
}
```

Man kan skrive ønsket tekst direkte inn her, eller bruke en tekstnøkkel for en [tekst definert i ressursfilene](../../ux/tekster) for språkstøtte.

{{% notice warning %}}
Merk at ved XSD-endringer, så vil ev. egendefinerte feilmeldinger forsvinne da JSON schema filen genereres på nytt fra XSD. På sikt er det tenkt at 
det å sette opp egendefinerte feilmeldinger skal være mulig å gjøre via datamodelleringsverktøyet i Altinn Studio. Per nå må dette gjøres manelt.
{{% /notice %}}

## Serverside-validering

Serverside-validering kan deles opp i to kategorier:

- **Valideringer mot datamodell** - Disse kjører automatisk når brukeren prøver å sende inn skjemadata.
- **Egendefinerte valideringer** - Disse skrives av applikasjonsutvikleren,
og kjører når brukeren prøver å sende inn skjemadata eller flytte prosessen til et nytt steg.

## Hvordan legge til egendefinert validering
Egendefinerte validering kan igjen deles opp i to kategorier; task-validering og data-validering.
  - Task-validering vil kjøres hver gang validering trigges enten manuelt fra applikasjonen eller når man prøver å flytte seg framover i prosessen.
  - Data-validering vil kjøre dersom man står på et steg som har definerte dataelementer knyttet til seg.

Valideringer er skrevet i C#, i `ValidationHandler.cs` -filen i applikasjonsmalen.
Filen kan aksesseres og endres i Altinn Studio via logikkmenyen, ved å velge _Rediger valideringer_,
eller direkte i applikasjonsrepoet der ligger filen i `logic/Validation`-mappen.

Endringer gjøres i `ValidateData` og `ValidateTask`-metodene (disse er tomme når appen lages).
Førstnevnte får inn et dataobjekt og sistnevnte får inn instansen og taskId.
For å legge til en valideringsfeil brukes `AddModelError`-metoden til `validationResults` object som sendes med i begge metodene.

Et eksempel på en enkel data-validering som sjekker at feltet _FirstName_ ikke inneholder verdien _1337_, når rotelementet til modellen er `Skjema` er vist nedenfor:

```C# {hl_lines=[12]}
public void ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data.GetType() == typeof(Skjema))
    {
        // Cast instance data to model type
        Skjema model = (Skjema)data;

        // Get value to test - FirstName
        string firstName = Skjema?.Person?.FirstName;

        // Check if FirstName exists, and contains the value "1337"
        if (firstName != null && firstName.Contains("1337"))
        {
            // Add validation error, with error message and list
            // of affected fields (in this case Person.FirstName)
            validationResults.AddModelError(
            "Person.FirstName",
            "Error: First name cannot contain the value '1337'."
            );
        }
    }
}
```

Se kommentarer i koden over for en forklaring på hva de ulike delene gjør.

Et eksempel på en enkel task-validering som sjekker hvor lang tid brukeren har brukt på Task_1 og returnerer en feil dersom det har tatt lenger enn 3 dager.

```C# {hl_lines=["5-6"]}
public async Task ValidateTask(Instance instance, string taskId, ModelStateDictionary validationResults)
{
  if (taskId.Equals("Task_1"))
  {
    DateTime deadline = ((DateTime)instance.Created).AddDays(3);
    if (DateTime.UtcNow < deadline)
    {
      validationResults.AddModelError("Task_1", $"Ferdigstilling av Task_1 har tatt for lang tid. Vennligst start på nytt.");
    }
  }
}
```

## Enkeltfeltvalidering

Dersom det er behov for umiddelbar validering av et felt
som ikke kan dekkes i klientsidevalideringen, 
så kan man sette opp en trigger for validering på enkeltfelter i `formLayout.json`

```json {hl_lines=[13]}
{
  "data": {
    "layout": [
      {
        "id": "3611fb2a-c06b-4fa7-a400-3f6c1ece64e1",
        "textResourceBindings": {
          "title": "25795.OppgavegiverNavnPreutfyltdatadef25795.Label"
        },
        "dataModelBindings": {
          "simpleBinding": "etatid"
        },
        "type": "Input",
        "triggers": ["validation"] , // <--- Add this field
      },
      {
        "id": "9ec368da-d6a9-4fbd-94d0-b4dfa8891981",
        "type": "Button",
        "textResourceBindings": {
          "title": "Button"
        },
        "dataModelBindings": {},
        "textResourceId": "Standard.Button.Button",
        "customType": "Standard"
      }
    ]
  }
}
```

{{% notice warning %}}
Merk at dersom du definerer at et felt skal trigge validering på serverside, så er det kun resultatet av denne valideringen som vil vises. Det vil si at dersom det er 
annen klient-side validering som er definert, så vil en ev. server-validering av feltet overskrive disse. Pass derfor på å implementere alle nødvendige
valideringer på feltet også på server-siden, det går an å legge flere feilmeldinger på samme felt ved behov.
{{% /notice %}}

Konfigurasjonen overfor vil resultere i at din egendefinerte validering i `ValidationHandler.cs`
vil trigges hver gang feltet oppdaterer seg. Dersom du har behov for å vite hvilket
felt som trigget valideringen er denne tilgjengelig i http-konteksten som en header på requesten ved navn _ValidationTriggerField_.

Et eksempel på en egendefinert validering der headerverdien hentes ut er vist nedenfor.

```csharp
 public async Task ValidateData(object data, ModelStateDictionary validationResults)
 {
    _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("ValidationTriggerField", out StringValues value);

    if (value.Count > 0 && value[0].Equals("kommune"))
    {
      // Cast instance data to model type
      flyttemelding model = (flyttemelding)data;

      // Get value to test - Kommune
      string kommune = model.kommune;

      if (!kommune.Equals("Oslo"))
      {
          validationResults.AddModelError(value[0], "Dette er ikke en gyldig kommune.");
      }
    }

    await Task.CompletedTask;
 }
```

**OBS** Merk at validering av enkeltfelter bør implementeres slik at det kjører både på trigger og under generell validering.
Eksempelet som omhandler flere komplekse valideringer viser hvordan dette kan implementeres.

Det er gjort flere ting for å få denne kodesnutten til å kjøre

1. I _ValidationHandler.cs_ inkluderes `using Microsoft.Extensions.Privites;` øverst i filen for å kunne ta i bruk `StringValues`. 
2. I _App.cs_ inkluderes `using Microsoft.AspNetCore.Http;` øverst i filen for å kunne ta i bruk `IHttpContextAccessor`.
3. I _App.cs_ dependency injectes `IHttpContextAccessor` i konstruktøren og sendes med videre til ValidationHandler.

```cs {hl_lines=[10, 14]}
public App(
            IAppResources appResourcesService,
            ILogger<App> logger,
            IData dataService,
            IProcess processService,
            IPDF pdfService,
            IProfile profileService,
            IRegister registerService,
            IPrefill prefillService,
            IHttpContextAccessor httpContextAccessor // <--- Add this line
            ) : base(appResourcesService, logger, dataService, processService, pdfService, prefillService)
        {
            _logger = logger;
            _validationHandler = new ValidationHandler(httpContextAccessor);  // <--- Include the new property here
            _calculationHandler = new CalculationHandler();
            _instantiationHandler = new InstantiationHandler(profileService, registerService);
        }
```

Dersom man har flere komplekse valideringer som er tidkrevende er det anbefalt å implementere flere private metoder
for validering av disse og bruke ValidationTriggerField til å avgjøre hvilken private metode som skal kjøres.
Man kan bl.a. bruke en _switch statement_ for å oppnå dette.

```cs
public async Task ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data is flyttemelding model))
    {
        _httpContextAccessor.HttpContext.Request.Headers
            .TryGetValue("ValidationTriggerField", out StringValues value);

        string dataField = value.Any() ? value[0] : string.Empty;

        switch (dataField)
        {
            case "kommune":
                ValidateKommune(model, validationResults);
                break;
            case "boaddresse":
                ValidateBoAdresse(model, validationResults);
                break;
            default:
                ValidateKommune(model, validationResults);
                ValidateBoAdresse(model, validationResults);
                break;
        }
    }
}

private void ValidateKommune(flyttemelding model, ModelStateDictionary validationResults)
{
    if (model.kommune != null && !model.kommune.Equals("Oslo"))
    {
        validationResults.AddModelError(
            nameof(model.kommune), 
            "Dette er ikke en gyldig kommune.");
    }
}
private void ValidateBoAdresse(flyttemelding model, ModelStateDictionary validationResults)
{
    if (model.boaddresse != null && model.boaddresse.Length > 150)
    {
        validationResults.AddModelError(
            nameof(model.boaddresse), 
            "Boadresse kan ikke være lengere enn 150 tegn.");
    }
}
```

### Spesifisere at valideringsfeil er fikset
Når validering trigges av et enkelt felt, så vil alle tidligere valideringer på dette feltet fjernes i påvente av svar fra den siste valideringen.
Dersom et felt trigger validering som oppdaterer/legger til feilmelding på flere felter på en gang, vil ikke disse fjernes selv om det ikke lenger er noen
feil i disse feltene. Dette er fordi man ikke har noen måte å vite hvilke felter som ev. er validert ifm en enkeltfeltvalidering.

F.eks., dersom man har 2 felter: fornavn og etternavn. Begge felter trigger enkeltfeltvalidering, og dersom begge feltene har verdi så validerer man at fullt navn ikke
kan være lengre enn 50 tegn. Feilmelding settes da på begge feltene. Dersom man retter opp i dette ved å endre fornavn, vil feilmeldingen fra fornavn-feltet forsvinne,
men feilmeldingen som vises på etternavn-feltet vises fortsatt selv om valideringen ikke setter noen feilmeldinger på feltene.

```C#
private void ValidateFullName(Datamodell model, ModelStateDictionary validationResults)
{
  if (!string.isNullOrEmpty(model.fornavn) && !string.isNullOrEmpty(model.etternavn)
    && model.fornavn.Length + model.etternavn.Length > 50)
  {
    validationResults.addModelError(nameof(model.fornavn),
      "Fullt navn kan ikke være lengre enn 50 tegn.");
    validationResults.addModelError(nameof(model.etternavn),
      "Fullt navn kan ikke være lengre enn 50 tegn.");
  }
}
```

For å kunne fjerne gamle feilmeldinger i et sånt tilfelle, er det lagt til støtte for å kunne spesifisere at en valideringsfeil er **fikset**. Da
vil det aktuelle feltet kunne få beskjed om at en spesifikk feilmelding som den viser frem er fikset og skal skjules.

Dette gjøres ved å legge til en valideringsfeil i koden i det tilfellet der det ikke er noen feil i valideringen, 
og sette `*FIXED*` foran selve feilmeldingen. Dette tilsvarer oppsettet for [myk validering](#myk-validering). 
Denne prefixen gjør at feilmeldingen som settes fjernes fra det aktuelle feltet, eller ignoreres (dersom det ikke er noen feilmelding på feltet fra før).

Man kan da utvide eksempelet over for å støtte dette:

```C# {hl_lines=[14,16]}
private void ValidateFullName(Datamodell model, ModelStateDictionary validationResults)
{
  if (!string.isNullOrEmpty(model.fornavn) && !string.isNullOrEmpty(model.etternavn)
    && model.fornavn.Length + model.etternavn.Length > 50)
  {
    validationResults.addModelError(nameof(model.fornavn),
      "Fullt navn kan ikke være lengre enn 50 tegn.");
    validationResults.addModelError(nameof(model.etternavn),
      "Fullt navn kan ikke være lengre enn 50 tegn.");
  } 
  else
  {
    validationResults.addModelError(nameof(model.fornavn),
      "*FIXED*Fullt navn kan ikke være lengre enn 50 tegn.");
    validationResults.addModelError(nameof(model.etternavn),
      "*FIXED*Fullt navn kan ikke være lengre enn 50 tegn.");
  }
}
```

## Myk validering

Myke valideringer (eller advarsler) er valideringsmeldinger som ikke stopper bruker fra å sende inn eller gå videre til neste steg i prosessen.
Denne typen valideringer kan f.eks. brukes til å be brukeren om å verifisere input som virker feil eller rart, men som strengt tatt ikke er ugyldig.

Meldinger basert på myke validering vil vises en gang, men bruker kan velge å klikke seg videre uten å utføre endringer.

Myke valideringer legges til fra server-siden i validerings-logikken, på samme måte som vanlige validerings-feil. Forskjellen er at valideringsmeldingen
må prefixes med `*WARNING*`. Dette vil da tolkes som en myk validering. Prefixen `*WARNING*` blir ikke synlig for sluttbruker.

**Kodeeksempel**

```csharp
public async Task ValidateData(object data, ModelStateDictionary modelState)
{
  if (data is TestModel testModel)
  {
      string firstName = testModel?.Person?.FirstName;
      if (firstName != null && firstName.Contains("1337")) 
      {
        validationResults.AddModelError(
          "Person.FirstName", 
          "*WARNING*Are you sure your first name contains 1337?");
      }
  }
  
  await Task.CompletedTask;
}
```

## Gruppevalidering

Det er mulig å gjøre valideringer på en repeterende gruppe i det brukeren ønsker å lagre en gitt indeks.
Dette gjøres ved å legge til en trigger på gruppe-komponenten i layoutfilen (f.eks `FormLayout.json`). Eksempel:

```json {hl_lines=[20]}
{
  "data": {
    "layout": [
      {
        "id": "demo-gruppe",
        "type": "Group",
        "children": [
            "..."
        ],
        "maxCount": 3,
        "dataModelBindings": {
            "group": "Endringsmelding-grp-9786.OversiktOverEndringene-grp-9788"
        },
        "triggers": ["validation"]  // <--- Legg til denne              
      },
      ...
    ]
  }
}
```

Dette vil da sørge for at det vil kjøres validering på komponentene som er en del av gruppen på den aktuelle indeksen man jobber på.
Om det finnes valideringsfeil så vil man stoppes fra å lagre gruppen før dette er rettet opp i.

Om man legger til validering på gruppe-komponenten så vil det også gå et kall mot valideringen backend med en header som spesifiserer hvilken komponent som trigget valideringen: `ComponentId`.
Valideringer er skrevet i C#, i `ValidationHandler.cs`-filen i applikasjonsmalen. I valideringen kan man så hente ut denne id'en og skreddersy eventuelle valideringer som skal gjøres backend, eksempel:

```cs
public async Task ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data is flyttemelding model))
    {
        _httpContextAccessor.HttpContext.Request.Headers
            .TryGetValue("ComponentId", out StringValues value);

        string component = value.Any() ? value[0] : string.Empty;

        switch (dataField)
        {
            case "demo-group":
                // kjør valideringer spesifikke til gruppen
                break;
            default:
                // kjør valideringene i sin helhet
                break;
        }
    }
}
```

For tips til hvordan man løser komplekse valideringer se ekemplene under [enkeltfeltvalidering.](#Enkeltfeltvalidering)
