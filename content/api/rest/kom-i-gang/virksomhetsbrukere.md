---
title: Virksomhetsbrukere
linktitle: Virksomhetsbrukere
description: Virksomhetsbrukere kan benyttes av organisasjoner som ønsker å integrere et fagsystem e.l. mot Altinn uten å måtte bruke en personinnlogging. 
weight: 30
toc: true
aliases:
- /api/rest/autorisasjon/virksomhetsbrukere/
categories: [Kom-i-gang veiledninger]
keywords: [virksomhetsbruker, autentisering, API, REST, integrasjon]
tags: [REST, Autentisering]
---

Virksomhetsbrukere lar organisasjoner lage brukere som kan gis roller og rettigheter på samme måte som personer, og kan bruke en [virksomhetsinnlogging](../virksomhet/) for å autentisere systemer som da kan benytte seg av disse tilgangene.

<!--more-->

Virksomhetsbrukere kan også benyttes for portal-innlogging gjennom nettlesere, se [sluttbrukerguiden om innlogging med virksomhetssertifikat](https://www.altinn.no/hjelp/innlogging/alternativ-innlogging-i-altinn/virksomhetssertifikat/) hvis de er tilknyttet et spesifikt sertifikat.

Når en virksomhetsbruker opprettes har den i utgangspunktet ingen roller og rettigheter, og vil derfor ikke ha tilgang til å lese virksomhetens innboks, administrere tilganger etc. Før en virksomhetsbruker kan tas i bruk, må en tilgangstyrer eller hovedadministrator i organisasjonen den tilhører gi virksomhetsbrukeren roller og rettigheter for de tjenestene/oppgavene som virksomhetsbrukeren skal benyttes til. Virksomhetsbrukeren kan finnes i panelet "Andre med rettigheter" i på [Profil-siden](https://www.altinn.no/ui/Profile) til organisasjonen, og tildeles roller og rettigheter som vanlige personer.

## Opprette virksomhetsbruker i portal

Virksomhetsbrukere kan opprettes i portal, enten gjennom innlogging eller Avanserte innstillinger i virksomhetens profil. Se [sluttbrukerguiden om innlogging med virksomhetssertifikat](https://www.altinn.no/hjelp/innlogging/alternativ-innlogging-i-altinn/virksomhetssertifikat/). Virksomhetsbrukere opprettet på denne måten er knyttet til et spesifikt sertifikat, men vil også kunne benyttes gjennom [virksomhetsinnlogging med Maskinporten](../virksomhet/#autentisering-med-virksomhetsbruker-og-maskinporten).


## Opprette virksomhetsbruker gjennom API

{{% expiring-notice 2021-08-26  %}}
Dette er funksjonalitet som vil komme i [versjon 21.8](../../../../ny-funksjonalitet/prodsetting/) av Altinn
{{% /expiring-notice %}}

Virksomhetsbrukere kan også opprettes og administreres gjennom REST API. Dette krever en [virksomhetsinnlogging](../virksomhet/), og hvis Maskinporten benyttes, en klient som er tildelt scopene `altinn:enterpriseusers.read` og `altinn:enterpriseusers.write` for hhv. lese- og skriveoperasjoner.

Her følger en oversikt over de ulike operasjonene i API-et for virksomhetsbrukere. Det legges til grunn at det foreligger en API-nøkkel og en virksomhetsautentisering. I eksemplene er det [autentisert med Maskinporten](../virksomhet/#autentisering-med-kun-maskinporten), men det er også mulig å [autentisere med virksomhetssertifikat](../virksomhet/#autentisering-med-kun-virksomhetssertifikat). 

### Hente alle virksomhetsbrukere
Hente ut liste over virksomhetsbrukere for den virksomhetsautentiserte organisasjonen.

```HTTP
GET /api/enterpriseusers HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Authorization: Bearer {maskinporten-token}
```

Eksempel på respons på virksomhetsbrukere for 991825827:
```JSON
[
    {
        "UserName": "IOSAIYVATPUXHWCT",
        "Created": "2021-05-28T12:41:24.263",
        "OwnerOrgNo": "991825827"
    },
    {
        "UserName": "nyttnavn3",
        "Created": "2021-06-02T11:50:24.327",
        "OwnerOrgNo": "991825827"
    },
    {
        "UserName": "hei",
        "Created": "2021-06-03T14:42:22.287",
        "OwnerOrgNo": "991825827"
    },
    {
        "UserName": "hei2",
        "Created": "2021-06-04T13:13:53.897",
        "OwnerOrgNo": "991825827"
    },
    {
        "UserName": "heii3",
        "Created": "2021-06-04T14:26:05.073",
        "OwnerOrgNo": "991825827"
    }
]
```

### Hente én virksomhetsbruker
Hente ut én virksomhetsbruker for den virksomhetsautentiserte organisasjonen, der `{userName}` er brukernavnet på virksomhetsbrukeren.

```HTTP
GET /api/enterpriseusers/{username} HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Authorization: Bearer {maskinporten-token}
```

Eksempel på respons:
```JSON
[
    {
        "UserName": "IOSAIYVATPUXHWCT",
        "Created": "2021-05-28T12:41:24.263",
        "OwnerOrgNo": "991825827"
    }
]
```

### Opprette en virksomhetsbruker
Oppretter en virksomhetsbruker der body inneholder `{UserName}`. Hvis navnet allerede er i bruk vil dette gi en feilmelding.

```HTTP
POST /api/enterpriseusers/ HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Authorization: Bearer {maskinporten-token}
{
  "UserName": "kari"
}
```

Eksempel på respons på nylig opprettet virksomhetsbruker for 991825827:
```JSON
[
  {
      "Secret": "WLs}AC&TEYup/=-loL.u&rh+%Z52GyJTWu5mj#^hO}OJjzK94G",
      "UserName": "kari",
      "Created": "2021-06-14T14:48:48.6370797+02:00",
      "OwnerOrgNo": "991825827"
  }
]
```

### Lage nytt passord for en virksomhetsbruker
Roterer secret (passord) for en virskomhetsbruker der `{userName}` er navnet på brukeren.

```HTTP
POST /api/enterpriseusers/{userName}/rotatesecret HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Authorization: Bearer {maskinporten-token}
```

Eksempel på respons:
```JSON
[
  {
      "Secret": "{T{B{u6$4?GyO-Wd&k)33:8(}G8Sg=^wpAx0^]}?=[Z@K:f(b;",
      "UserName": "kari",
      "Created": "2021-06-02T11:50:24.327",
      "OwnerOrgNo": "991825827"
  }
]
```

### Endre brukernavn på en virksomhetsbruker
Endrer brukernavnet på en virskomhetsbruker der `{userName}` er navnet på den eksisterende brukeren, og body inneholder `UserName` som er det nye navnet. Hvis navnet allerede er i bruk vil du få en feilmelding.

```HTTP
PUT /api/enterpriseusers/{userName} HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Authorization: Bearer {maskinporten-token}
{
    "UserName": "ola"
}
```

Eksempel på respons:
```JSON
[
  {
      "UserName": "ola",
      "Created": "2021-06-02T11:50:24.327",
      "OwnerOrgNo": "991825827"
  }
]
```

### Slette virksomhetsbruker
Sletter virksomhetsbruker der `{userName}` er navnet på brukeren. 

```HTTP
DELETE /api/enterpriseusers/{userName} HTTP/1.1
Host: www.altinn.no
ApiKey: {min-api-nøkkel}
Authorization: Bearer {maskinporten-token}
```

Hvis vellykket vil det returneres en tom respons og statuskode `204 No Content`.
