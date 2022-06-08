---
title: Rolle­definisjoner
description: API relatert til rolledefinisjoner.
toc: true
---

Rolledefinisjoner deles inn i 3 typer: Eksterne, Altinn, og Lokale roller.
Eksterne og Altinn roller er definert for alle brukere og organisasjoner i Altinn, mens Lokale roller opprettes av en avgiver og vil bare være definert i kontekst av den bestemte avgiveren.
API-endepunktene som beskrives på denne siden vil hente ut alle tre typer rolledefinisjoner, og må derfor gjøres autentisert for en avgiver.
For å hente kun Eksterne og Altinn rolledefinisjonene kan man bruke de uautentiserte Metadata-endepunktene som er beskrevet [her](/docs/api/rest/metadata/#hente-metadata-om-rolledefinisjoner-i-altinn).

## Hente rolledefinisjoner
Henter ut alle rolledefinisjoner tilgjengelig for `{who}`.

Se også [altinn.no/api/help](https://www.altinn.no/api/Help/Api/GET-who-authorization-RoleDefinitions_language).

```HTTP
GET https://www.altinn.no/api/{who}/authorization/roledefinitions HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons
```JSON
[
  {
    "RoleType": "External",
    "RoleDefinitionId": 82,
    "RoleName": "Privatperson",
    "RoleDescription": "Privatperson"
  },
  {
    "RoleType": "Altinn",
    "RoleDefinitionId": 1525,
    "RoleName": "UDI referanseperson",
    "RoleDescription": "Videreformidlingstjeneste UDI"
  },
  {
    "RoleType": "Altinn",
    "RoleDefinitionId": 2215,
    "RoleName": "hildetest",
    "RoleDescription": "testrolle"
  }
]
```


## Hente ut en enkelt rolle 

Hente ut alle rettigheter tilknyttet en spesifikk rolle angitt med roledefinitionid fra rollelisten i punktet over.

Se også [altinn.no/api/help](https://www.altinn.no/api/Help/Api/GET-who-authorization-RoleDefinitions-roleTypeID_language).

```HTTP
GET https://www.altinn.no/api/{who}/authorization/roledefinitions/{roledefinitionid} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
  "RoleType": "External",
  "RoleDefinitionId": 82,
  "RoleName": "Privatperson",
  "RoleDescription": "Privatperson",
  "Rights": [
    {
      "RightID": 63,
      "RightType": "Service",
      "ServiceCode": "SKBERG",
      "ServiceEditionCode": 1,
      "Action": "Read",
      "RightSourceType": "RoleTypeRights",
      "IsDelegatable": false
    },
    {
      "RightID": 68,
      "RightType": "Service",
      "ServiceCode": "SKDPSA",
      "ServiceEditionCode": 2,
      "Action": "Read",
      "RightSourceType": "RoleTypeRights",
      "IsDelegatable": false
    },
    {
      "RightID": 70,
      "RightType": "Service",
      "ServiceCode": "SKDSLN",
      "ServiceEditionCode": 1,
      "Action": "Read",
      "RightSourceType": "RoleTypeRights",
      "IsDelegatable": false
    }
  ]
}
```


## Opprette lokal rolle
Oppretter en egendefinert rolle med de spesifikke rettighetene til tjenester/ressurser som angis i kallet. Språk er valgfri inputparameter.

Tillatte actions er `Read`, `Write`, `Delete`, `Sign`, `ReadArchive`, `DeleteArchive` og disse angir hvilke rettigheter rollen gir for de forskjellige
stegene i arbeidsflyten gjennom Altinn. Etter at den er opprettet, må rollen delegeres for faktisk gi rettighetene man har valgt.

Se også [altinn.no/api/help](https://www.altinn.no/api/Help/Api/POST-who-authorization-RoleDefinitions_language).

```HTTP
POST https://www.altinn.no/api/{who}/authorization/roledefinitions/ HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
{
  "RoleName": "min egen lokale rolle2",
  "RoleDescription": "en beskrivelse av rollen", 
  "_embedded": {
    "Rights": [
      {
        "ServiceCode": "3357",
        "ServiceEditionCode": "130429",
        "Action": "Read"
      }
    ]
  }
}
```

Eksempel på respons:  
Det returneres en tom respons, men location header angir id på den nye lokale rollen dersom den ble opprettet OK.
```HTTP
HTTP 201 - Created
Location: https://www.altinn.no/api/my/authorization/roledefinitions/13667
```


## Slette lokal rolle
Se også [altinn.no/api/help](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-RoleDefinitions-roleTypeID).

```HTTP
DELETE https://www.altinn.no/api/my/authorization/roledefinitions/13667 HTTP/1.1
ApiKey: myKey
```

Eksempel på respons:
```HTTP
HTTP 204 - No Content
```

## Oppdatere rolle
Oppdaterer angitt rolle for `{who}`. Språk er valgfri input-parameter

Se også [altinn.no/api/help](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-RoleDefinitions-roleTypeID).

```HTTP
PUT https://www.altinn.no/api/{who}/authorization/roledefinitions/{roledefinitionid} HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
{
  "RoleName": "min egen lokale rolle5",
  "RoleDescription": "en beskrivelse av rollen",
  "RoleType": "service",
  "_embedded": {
    "Rights": [
      {
        "ServiceCode": "3357",
        "ServiceEditionCode": "130429",
        "Action": "Read"
      }
    ]
  }
}
```

Eksempel på respons:
```HTTP
HTTP 204 - No content
Location: https://www.altinn.no/api/my/authorization/roledefinitions/13667
```
