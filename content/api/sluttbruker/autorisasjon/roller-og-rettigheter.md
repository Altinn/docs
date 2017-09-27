---
title: Roller og rettigheter
description: API'er relatert til roller og rettigheter.
weight: 10
---


### Hente roller
Hente ut roller innlogget bruker har for `{who}` - kan være `my`, organisasjonsnummer eller andre privatpersoner
der man spør ved hjelp av `r{id}` som hentes fra api/reportees.

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/GET-who-authorization-roles_language).

```HTTP
GET https://www.altinn.no/api/{who}/authorization/roles HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons på rettigheter innlogget bruker har for 910252240:
```JSON
{
  "_links": {
    "self": {
      "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roles"
    }
  },
  "_embedded": {
    "roles": [
      {
        "RoleId": 38069107,
        "RoleType": "Altinn",
        "RoleDefinitionId": 3,
        "RoleName": "L\u00f8nn og personalmedarbeider",
        "RoleDescription": "Tilgang til l\u00f8nns- og personalrelaterte tjenester",
        "Delegator": "ELLEN FISKE",
        "DelegatedTime": "2014-11-19T08:27:40.577",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/3"
          }
        }
      },
      {
        "RoleId": 38069108,
        "RoleType": "Altinn",
        "RoleDefinitionId": 6,
        "RoleName": "Regnskapsmedarbeider",
        "RoleDescription": "Tilgang til regnskapsrelaterte skjema og tjenester",
        "Delegator": "ELLEN FISKE",
        "DelegatedTime": "2014-11-19T08:27:40.577",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/6"
          }
        }
      },
      {
        "RoleId": 38069101,
        "RoleType": "Altinn",
        "RoleDefinitionId": 8,
        "RoleName": "Begrenset signeringsrettighet",
        "RoleDescription": "Tilgang til \u00e5 signere utvalgte skjema og tjenester",
        "Delegator": "ELLEN FISKE",
        "DelegatedTime": "2014-11-19T08:22:21.653",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/8"
          }
        }
      },
      {
        "RoleId": 38069102,
        "RoleType": "Altinn",
        "RoleDefinitionId": 11,
        "RoleName": "Utfyller\/Innsender",
        "RoleDescription": "Tilgang til utvalgte skjema og tjenester",
        "Delegator": "ELLEN FISKE",
        "DelegatedTime": "2014-11-19T08:22:21.653",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/11"
          }
        }
      },
      {
        "RoleType": "Altinn",
        "RoleDefinitionId": 89,
        "RoleName": "Basisrolle",
        "RoleDescription": "Rolle som f\u00f8lger automatisk med n\u00e5r en bruker f\u00e5r en annen Altinn-rolle",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/89"
          }
        }
      }
    ]
  }
}
```


### Hente rettigheter
Hente ut rettigheter innlogget bruker har for `{who}` - kan være `my`, organisasjonsnummer eller andre privatpersoner der man
spør ved hjelp av `r{id}` som hentes fra api/reportees.

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/GET-who-authorization-rights).

```HTTP
GET https://www.altinn.no/api/{who}/authorization/rights HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
  "_links": {
    "self": {
      "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/rights"
    }
  },
  "_embedded": {
    "rights": [
      {
        "RightID": 103,
        "RightType": "Service",
        "ServiceCode": "1261",
        "ServiceEditionCode": 1,
        "Action": "Read",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 104,
        "RightType": "Service",
        "ServiceCode": "1238",
        "ServiceEditionCode": 3,
        "Action": "Read",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": false
      },
      {
        "RightID": 10481822,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "Read",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 10481823,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "Write",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 10481824,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "ArchiveRead",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 10481825,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "ArchiveDelete",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 10481843,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "Sign",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      }
    ]
  }
}
```


### Slette tildelte roller
Sletter en rolle for `{who}` (`r{id}` fra api/reportees, organisasjonsnummer eller brukernavn) ved hjelp av `roleid` fra GET.

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-roles-roleID).

```HTTP
DELETE https://www.altinn.no/api/{who}/authorization/roles/{rolleid} HTTP/1.1
Host: www.altinn.no
ApiKey: myKey
```

Returnerer tom respons og statuskode/-melding.


### Slette tildelte rettigheter
Sletter en rettighet for `{who}` (`r{id}` fra api/reportees, organisasjonsnummer eller brukernavn) ved hjelp av `rightid` fra GET rights.

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/GET-who-authorization-roles_language).

```HTTP
DELETE https://www.altinn.no/api/{who}/authorization/rights/{rettighetsid} HTTP/1.1
Host: www.altinn.no
ApiKey: myKey
```
Returnerer tom respons og statuskode/-melding.
