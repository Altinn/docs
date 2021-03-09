---
title: Sporvalg
description: Hvordan legge til dynamisk sporvalg i app
toc: true
---

Dynamisk sporvalg i en applikasjon kan være nyttig dersom man ønsker å vise og/eller skjule enkelte sider 
basert input fra sluttbruker på forutgående deler av skjemaet. 

## Trigge kalkulering av sporvalg fra frontend

For å trigge kalkuleringingen av sporvalg må man legge inn dette som en trigger på den aktuelle navigasjons-komponenten man ønsker.
Dette gjøres ved å legge til `calculatePageOrder` som en del av triggers. Eksempel:

```json
{
    "id": "navigation-button",
    "type": "NavigationButtons",
    "textResourceBindings": {
        "next": "Neste",
        "back": "Tilbake"
    },
    "triggers": ["calculatePageOrder"],
    "dataModelBindings": {},
    "showBackButton": true
}
```

Her vil frontend da gjøre kallet mot apiet definert i appen og benytte listen som returneres til å avgjøre hvilke side den går til i det brukeren trykker neste.
Denne rekkefølgen blir også lagret i staten frontend slik at navigering vil fungere både frem og tilbake på den gitte rekkefølgen man returnerer fra backend.

Om man ønsker å trigge kalkulering på hvert eneste sidebytte kan dette gjøres ved å enten legge inn `calculatePageOrder` som en del av `triggers` for alle
navigasjonskomponentene man har i applikasjonen, eller legge til en trigger i `Settings.json` under `pages`-seksjonen. Eksempel:

```json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "order": [
      "Side1",
      "Side2",
      "Side3"
    ],
    "triggers": ["calculatePageOrder"]
  }
}
```

Om `triggers` er satt på navigasjonskomponenten vil denne overstyre `triggers` som settes i Settings.json, på denne måten er det mulig å styre default-oppførsel på komponentnivå om ønskelig.

## Sette opp sporvalg backend

I App.cs må man overstyre metoden som henter ut den standardrekkefølgen av sider som er definert i `Settings.json`
Dette gjøres ved å legge til funksjonen nedenfor i App.cs.
Forventet output fra denne metoden er en stortert liste som inneholder navnet på de relevante sidene i applikasjonen.

```cs
/// <inheritdoc />
public override async Task<List<string>> GetPageOrder(string org, string app, int instanceOwnerId, Guid instanceGuid, string layoutSetId, string currentPage, string dataTypeId, object formData)
{
    List<string> pageOrder = new List<string>();

    // Implement your own logic here

    return pageOrder;
}
```

Funksjonen får inn en rekke parametere som kan være nyttig dersom man skal benytte skjemadata
eller annen informasjon om sluttbruker til å kalkulere sporvalget.

- *layoutSetId* Dersom appen din definerer flere layout set vil id på det gjeldende layout settet sendes inn.
Dersom applikasjonen ikke har layout set vil denne strengen være tom. Basert på denne parameteren kan man hente
ut standard siderekkefølge som er definert i applikasjonen:

```cs
List<string> pageOrder = new List<string>();

if (string.IsNullOrEmpty(layoutSetId))
{
    pageOrder = _appResources.GetLayoutSettings().Pages.Order;
}
else
{
    pageOrder = _appResources.GetLayoutSettingsForSet(layoutSetId).Pages.Order;
}
```

Dette forutsetter at servicen `IAppResources` gjøres tilgjengelig i App.cs. 
Da servicen allerede dependency injectes inn i klasen er det kun to steg som kreves. 

1. Opprett en privat variabel i staten av klassen.

```cs
private readonly IAppResources _appResources;
```

2. Definer den nye private variabelen lik servicen som sendes med i konstruktøren til App.cs

```cs
 _appResources = appResourcesService;
```

- *CurrentPage* Siden man ønsker å navigere fra vil være spesifisert i denne parameteren.

- *FormData* inneholder skjemadataen. Den kan enkelt jobbes med som et objekt ved å caste den til riktig type `Skjema skjema = (Skjema)formData;`.
Her heter C# modellen til skjemadataen `Skjema` for din applikasjon kan det være et annet navn. 
Dette kan du sjekke ved å finne klassenavnet på C# filen i App/models-mappen.

## Reflektere sporvalg i kvittering (PDF)

Som applikasjonsutvikler må man selv sørge for å reflektere de sporvalgene som gjøres i PDFen som opprettes i slutten av hver task. 
I `App.cs` finnes funksjonen `FormatPdf`: 

```cs
public override async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
    return await _pdfHandler.FormatPdf(layoutSettings, data);
}
```

Som input til metoden får man `layoutSettings` som inneholder default siderekkefølge under propertyen `layoutSettings.Pages.Order`.
I tillegg får man skjemadataen som er knyttet til steget som skal avsluttes. Denne kan parses til en C# modell som beskrevet lengere oppe på denne siden.

Ved å manipulere `layoutSettings.Pages.Order` i denne metoden vil man kunne duplisere de sporvalgene som er gjort for sluttbruker.
MERK! Kallet til PDF handler, vist nedenfor, må ikke fjernes fra `FormatPDF` metoden dersom du har implementert ytterlig logikk for kvitteringen i `PDFHandler.cs`.

```cs
return await _pdfHandler.FormatPdf(layoutSettings, data);
```

For å unngå å duplisere logikk vil vi anbefale å lage en privat metode som manipulerer siderekkefølgen basert på skjemadata og kalle denne både fra `FormatPdf`og `GetPageOrder`.
Et kodeeksempel på en slik implementasjon følger.

```cs
public override async Task<List<string>> GetPageOrder(string org, string app, int instanceOwnerId, Guid instanceGuid, string layoutSetId, string currentPage, string dataTypeId, object formData)
{
    List<string> pageOrder = new List<string>();
    if (string.IsNullOrEmpty(layoutSetId))
    {
        pageOrder = _appResourcesService.GetLayoutSettings().Pages.Order;
    }
    else
    {
        pageOrder = _appResourcesService.GetLayoutSettingsForSet(layoutSetId).Pages.Order;
    }
    UpdatePageOrder(pageOrder, (FavorittArtist)formData);
    return pageOrder;
}

public override async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
    UpdatePageOrder(layoutSettings.Pages.Order, (FavorittArtist)data);
    return await _pdfHandler.FormatPdf(layoutSettings, data);
}
private void UpdatePageOrder(List<string> pageOrder, FavorittArtist formdata)
{
    if (formdata.EnGodNrTo.Contains("Tix"))
    {
        pageOrder.Remove("Prince");
    }
    else
    {
        pageOrder.Remove("Tix");
    }
}        
```
