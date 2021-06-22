---
title: Virksomhetsbrukere
description: Benyttes når du skal hente ut virksomhetsbrukere for den virksomhetsautentiserte organisasjonen. Du kan også opprette og slette virksomhetsbrukere og endre navn og passord.
toc: true
---


## Hente alle virksomhetsbrukere
Hente ut liste over virksomhetsbrukere for den virksomhetsautentiserte organisasjonen.

```HTTP
GET https://www.altinn.no/api/enterpriseusers HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
Authorization: myToken
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

## Hente én virksomhetsbruker
Hente ut én virksomhetsbruker for den virksomhetsautentiserte organisasjonen, der `{userName}` er brukernavnet på virksomhetsbrukeren.

```HTTP
GET https://www.altinn.no/api/enterpriseusers/{username} HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
Authorization: myToken
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

## Opprette en virksomhetsbruker
Oppretter en virksomhetsbruker der body inneholder `{UserName}`. Hvis navnet allerede er i bruk får du en 400 bad request i retur med reasonphrase "This user name is already taken. You must enter a unique user name."

```HTTP
POST https://www.altinn.no/api/enterpriseusers/ HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
Authorization: myToken
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

## Rotate secret for en virksomhetsbruker
Roterer secret for en virskomhetsbruker der `{userName}` er navnet på brukeren.

```HTTP
POST https://www.altinn.no/api/enterpriseusers/{userName}/rotatesecret HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
Authorization: myToken
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

## Endre brukernavn på en virksomhetsbruker
Endrer brukernavnet på en virskomhetsbruker der `{userName}` er navnet på den eksisterende brukeren, og body inneholder `UserName` som er det nye navnet. Hvis navnet allerede er i bruk får du en 400 bad request i retur med reasonphrase "This user name is already taken. You must enter a unique user name."

```HTTP
PUT https://www.altinn.no/api/enterpriseusers/{userName} HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
Authorization: myToken
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

## Slette virksomhetsbruker
Sletter virksomhetsbruker der `{userName}` er navnet på brukeren. 

```HTTP
DELETE https://www.altinn.no/api/enterpriseusers/{userName} HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Returnerer tom respons og statuskode 204 No content.
