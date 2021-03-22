---
title: Settings og miljøvariabler
linktitle: Settings
description: Hvordan legge inn konfigurasjon- og miljøspesifikke verdier slik at de er tilgjengelig fra app-koden.
toc: true
weight: 500
---

## Standard .NET konfigurasjon

Altinn 3 sin App template baserer seg på en ASP.Net Core applikasjon og har med dette en rekke muligheter for å styre konfigurasjon av en App. Denne dokumentasjonen er derfor i stor grad utdrag fra eller linker til [Microsoft sin egen dokumentasjon](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-3.1). Det er derimot ikke alt som er mulig i en App da det er litt begrenset hva Altinn 3 gir av tilganger til miljøet en App kjører i.

## appsettings.json

Første og enkleste kilde til konfigurasjonsinformasjon er `appsettings` filene. En hver ny app som blir laget vil komme med en eksisterende `appsettings.json` fil. Denne filen blir lest inn av en App under oppstart uavhengig av hvilke miljø Appen kjører i. Det vil si at den bør inneholde standarinnstillinger og innstillinger som er lik i alle miljøer. Filen har allerede en del innstillinger som er i bruk og verdiene er i stor grad beregnet for et utviklingsmiljø hvor man kjører [LocalTest](https://github.com/Altinn/altinn-studio/blob/master/LOCALAPP.md). 

I appsettings.json filene organiseres verdier i ulike seksjoner. Det anbefales å ikke legge til nye verdier i de eksisterende seksjonene, men isteden lage nye seksjoner. Følgende seksjoner er reservert for å unngå kollisjoner: `Kestrel`, `AppSettings`, `GeneralSettings`, `PlatformSettings`, `PEPSettings`, `ApplicationInsights`, `kvSettings`.

```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi lest inn i alle miljøer, men kanskje overstyrt av miljøspesifikke kilder"
  },
  "AppSettings": {
      ...
  },
  "GeneralSettings": {
      ...
  },
  "PlatformSettings": {
    "ApiStorageEndpoint": "http://localhost:5101/storage/api/v1/",
    "ApiRegisterEndpoint": "http://localhost:5101/register/api/v1/",
    ...
  },
  "ApplicationInsights": {
    "InstrumentationKey": "retrieved from environment at runtime"
  }
}
```

I fremtiden vil en ny App få med en egen seksjon som det skal være enkelt å utvide. I mellomtiden refereres det til [Microsoft sin dokumentasjon](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-3.1) for hvordan dette kan gjøres.

### Miljøspesifikke appsettings

En ny app vil også inneholde et set med miljøspesifikke appsettings filer: `appsettings.Development.json`, `appsettings.Staging.json` og `appsettings.Production.json`. Disse filene blir lest inn kun i det aktuelle miljøet. TT02-miljøet er definert som Staging og produksjonsmiljøet er definert som Production.

Hver fil skal altså ha verdier som er unike eller anderledes i minst ett annet miljø. Et eksempel på en type verdi som kan variere fra miljø til miljø er "timeout" verdier. Hvis man ønsker at en App skal vente lengre på respons fra et eksternt API under utvikling enn det man ønsker å tillate i produksjon.

#### appsettings.Development.json
```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi lest inn kun for utviklingsmiljø"
  }
}
```

#### appsettings.Staging.json
```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi lest inn kun for TT02"
  }
}
```

#### appsettings.Production.json
```json
{
  "ExampleSection": {
    "ExampleValue": "Verdi lest inn kun for produksjon"
  }
}
```

## Miljøvariabler

Standard oppførsel til en ASP.Net applikasjon er å lese inn miljøvariabler. Dette gjøres også for en App, men det er ikke mulig for en Apputvikler å lage eller endre noen verdier per i dag. Altinn 3 mener at denne måten å styre miljøspesifikke verdier på dekkes av appsettings og KeyVault. 

## Kommandolinjeargumenter

Det er teknisk mulig å overstyre alle andre data kilder ved hjelp av kommandolinjeargumenter. Det er derimot ikke mulig å bruke dette til å endre verdier fra et miljø til et annet.

## Azure KeyVault

Hver applikasjonseier skal få tilgang til sitt eget Azure KeyVault for lagring av sensitive verdier. Altså verdier man ikke ønsker å ha synlig i kode eller konfigurasjonsfiler. Noen naturlig eksempler på dette er ting som brukernavn og passord for eksterne APIer en App skal benytte. Et sertifikat, privat nøkkel eller lignende.

Per i dag blir ikke verdier fra KeyVault lest inn i konfigurasjonsstyringen av en App. Isteden må man benytte Secrets komponenten. Dette er dokumentert under [hemmeligheter](../../secrets).
