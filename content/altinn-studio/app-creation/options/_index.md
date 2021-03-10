---
title: Options (kodelister)
linktitle: Options (kodelister)
description: Hvordan konfigurere options/kodelister for en app
toc: true
weight: 70
---

Altinn tilbyr i dag to ulike måter en app kan eksponere kodelister. Dette gjøres gjennom et options-api som er eksponert av appen, og kodelisten vil være tilgjengelig på endepunktet `{org}/{app}/api/options/{optionsId}`.
Dropdown-komponenten vil automatisk kunne hente ut en slik liste om man kobler denne komponenten til en options-id.

## Statisk kodeliste fra app-repo

Ved å legge json-lister i options mappen i app repo vil appen automatisk lese denne filen og eksponere det gjennom options-apiet. 
Options filene må ligge under `App/options/` og vil bli differensiert ved hjelp av navngivningen på json-filen. F.eks `land.json`. Her vil da optionsId være `land`, og vil være eksponert gjennom endepunktet `{org}/{app}/api/options/land`.
Kodelistene må være på et spesifikt format. Eksempel på en kodeliste som inneholder land (`App/options/land.json`):

```json
[
    {
        "value": "norway",
        "label": "Norge"
    },
    {
        "value": "denmark",
        "label": "Danmark"
    },
    {
        "value": "sweden",
        "label": "country.label.sweden"
    }
]
```

`label` feltet kan inneholde en tekstnøkkel til teskstressursene eller ren tekst.

## Kodeliste generert runtime

I app-templaten har man også mulighet til å dynamisk eksponere/endre kodelister under kjøringen av appen. Dette muligjør det å eksponere dynamiske verdier som en del av kodelisten, og settes opp
i metoden `GetOptions` i `App.cs`. Denne metoden vil bli kalt i det appen får et kall mot options-apiet, og man kan selv velge å returnere det objektet man ønsker.

Under finner du et eksempel på hvordan dette kan settes opp. Her vil man få ut den oppsatte kodelisten i det appen får et kall mot `{org}/{app}/api/options/demo_id`.

```C#
public override Task<AppOptions> GetOptions(string id, AppOptions options)
{
    if (id.Equals("demo_id"))
    {
        var demoOptions = new AppOptions
        {
            Options = new List<AppOption>
            {
                new AppOption
                {
                    Label = "Some label",
                    Value = "Some value"
                },
                new AppOption
                {
                    Label = "Some other label",
                    Value = "Some other value"
                }
            }
        };
        return Task.FromResult(demoOptions);
    }
    else
    {
        // don't touch existing options
        return Task.FromResult(options);
    }
}
```

## Koble dropdown-komponent til kodeliste
Dette gjøres ved å legge til feltet optionsId som referer til hvilken option (kodeliste) man ønsker refere til. Eksempel:
```json
{
    "id": "8e6f7b2f-fcf0-438d-8336-c1a8e1e03f44",
    "type": "Dropdown",
    "componentType": 4,
    "textResourceBindings": {},
    "dataModelBindings": {},
    "optionsId": "biler",
}
```
