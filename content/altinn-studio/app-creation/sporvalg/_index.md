---
title: Sporvalg
description: Hvordan legge til dynamisk sporvalg i app
toc: true
---

Dynamisk sporvalg i en applikasjon kan være nyttig dersom man ønsker å vise og/eller skjule enkelte sider 
basert input fra sluttbruker på forutgående deler av skjemaet. 

For å støtte dynamisk sporvalg i en applikasjon kreves det endring i følgende filer: 
- Logic/App.cs


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
    pageOrder = _appResourcesService.GetLayoutSettings().Pages.Order;
}
else
{
    pageOrder = _appResourcesService.GetLayoutSettingsForSet(layoutSetId).Pages.Order;
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
