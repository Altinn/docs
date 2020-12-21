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

{{%notice info%}}
MERK: Konfigurasjon av klientside-validering er foreløpig ikke tilgjenglig.
Dokumentasjonen vil oppdateres når ny funksjonalitet blir tilgjengelig.
{{% /notice%}}

Disse valideringene kjøres automatisk og,
validerer brukerens input opp mot restriksjoner i datamodellen.
Følgende restriksjoner er tilgjengelige for øyeblikket:

- min verdi (tall)
- max verdi (tall)
- min lengde
- max lengde
- lengde
- mønster / patterns

I tillegg støttes påkrevde felt.
Dette kobles automatisk til datamodellen og ingen ytterligere konfigurasjon er nødvendig.

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