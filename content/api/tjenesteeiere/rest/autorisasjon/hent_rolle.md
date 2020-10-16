---
title: Hente ut liste over roller
weight: 300
---

Denne siden beskriver hvordan Altinn kan brukes til å hente ut liste over roller en bruker har på vegne av andre
## Hente ut roller

Hente ut alle roller en person/organisasjon `{subject}` har for en annen person/organisasjon `{reportee}` på tjenester som tilhører autentisert tjenesteeier.

```HTTP
GET https://www.altinn.no/api/serviceowner/authorization/roles?ForceEIAuthentication&language={language}&subject={subject}&reportee={reportee} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:

```JSON
{
    "_links": {
        "self": {
            "href": "https://tt02.altinn.no/api/serviceowner/authorization/roles?subject=811077062&reportee=23114702129"
        }
    },
    "_embedded": {
        "roles": [
            {
                "RoleId": 491068,
                "RoleType": "Altinn",
                "RoleDefinitionId": 11,
                "RoleName": "Reporter/sender",
                "RoleDescription": "Access to selected forms and services",
                "Delegator": "ERLING ENGENES",
                "DelegatedTime": "2019-08-26T12:39:29.113",
                "_links": {
                    "roledefinition": {
                        "href": "https://tt02.altinn.no/api/serviceowner/roledefinitions/11"
                    }
                }
            }
        ]
    }
}
```

## Hente ut alle rolledefinisjoner

```HTTP
GET https://www.altinn.no/api/serviceowner/roledefinitions?ForceEIAuthentication&language={language} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:

```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/roledefinitions"
        }
    },
    "_embedded": {
        "roledefinitions": [
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 1,
                "RoleName": "Bankruptcy read",
                "RoleDescription": "Reading rights for information in the service Konkursbehandling (bankruptcy proceedings)",
                "RoleDefinitionCode": "BOBEL",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/1"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 2,
                "RoleName": "Bankruptcy write",
                "RoleDescription": "Writing rights for information in the service Konkursbehandling (bankruptcy proceedings)",
                "RoleDefinitionCode": "BOBES",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/2"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 3,
                "RoleName": "Salaries and personnel employee",
                "RoleDescription": "Access to services related to salaries and personnel",
                "RoleDefinitionCode": "LOPER",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/3"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 4,
                "RoleName": "Access manager",
                "RoleDescription": "Administration of access",
                "RoleDefinitionCode": "ADMAI",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/4"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 5,
                "RoleName": "Limited rights for an individual",
                "RoleDescription": "Delegable rights to services for individuals",
                "RoleDefinitionCode": "PRIUT",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/5"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 6,
                "RoleName": "Accounting employee",
                "RoleDescription": "Access to accounting related forms and services",
                "RoleDefinitionCode": "REGNA",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/6"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 7,
                "RoleName": "Auditor's rights",
                "RoleDescription": "Delegable auditor's rights",
                "RoleDefinitionCode": "REVAI",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/7"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 8,
                "RoleName": "Limited signing rights",
                "RoleDescription": "Signing access for selected forms and services",
                "RoleDefinitionCode": "SISKD",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/8"
                    }
                }
            }
        ]
    }
}
```

## Hente ut én spesifikk rolledefinisjon

```HTTP
GET https://www.altinn.no/api/serviceowner/roledefinitions/{roleDefinitionId}?ForceEIAuthentication&language={language}
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:

```JSON
{
    "RoleType": "Altinn",
    "RoleDefinitionId": 4,
    "RoleName": "Tilgangsstyring",
    "RoleDescription": "Denne rollen gir administratortilgang til å gi videre rettigheter til andre.\r\n",
    "RoleDefinitionCode": "ADMAI",
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/roledefinitions/4"
        }
    }
}
```