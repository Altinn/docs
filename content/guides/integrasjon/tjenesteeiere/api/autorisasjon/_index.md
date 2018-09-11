---
title: Autorisasjon
description: Spørringer mot Altinns autorisasjonskomponent
weight: 10
---

Ved å bruke autorisasjonsdelen av REST-API for tjenesteeier kan man autorisere tilganger og verifisere roller og rettigheter til bruk utenfor Altinn,
for eksempel som alternativ til XACML/webservice eller som oppslag i forbindelse med tilgangsstyring.
 

## Hente ut liste over avgivere

Hente ut liste over alle avgivere en person eller organisasjon `{subject}`kan representere,
eventuelt spesifisert ned på spesifikk tjeneste eller rolle.

```HTTP
GET https://www.altinn.no/api/serviceowner/serviceowner/reportees?ForceEIAuthentication&subject={subject}&serviceCode={serviceCode}&serviceEdition={serviceEdition}&roleDefinitionId={roleDefinitionId}&showConsentReportees={showConsentReportees} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/reportees?subject={subject}"
        }
    },
    "_embedded": {
        "reportees": [
            {
                "Name": "BIRI OG TORPO REGNSKAP",
                "Type": "Enterprise",
                "OrganizationNumber": "910437127",
                "Status": "Active"
            },
            {
                "Name": "EIDSNES OG AUSTRE ÅMØY",
                "Type": "Business",
                "OrganizationNumber": "910521551",
                "Status": "Active"
            },
            {
                "Name": "FJELL LISA FOS",
                "Type": "Person",
                "SocialSecurityNumber": "130549 *****"
            },
            {
                "Name": "KIRKENES OG AUSTBØ",
                "Type": "Enterprise",
                "OrganizationNumber": "910021451",
                "Status": "Active"
            },
            {
                "Name": "KYSTBASEN ÅGOTNES OG ILSENG REGNSKAP",
                "Type": "Enterprise",
                "OrganizationNumber": "910514318",
                "Status": "Active"
            },
            {
                "Name": "ROLF BJØRN               ",
                "Type": "Person",
                "SocialSecurityNumber": "061177 *****"
            }
        ]
    }
}
```

## Hente ut rettigheter

Hente ut alle rettigheter en person eller organisasjon `{subject}` har for en annen person eller organisasjon `{reportee}` på tjenester som tilhører autentisert tjenesteeier.

```HTTP
GET https://www.altinn.no/api/serviceowner/authorization/rights?ForceEIAuthentication&subject={subject}&reportee={reportee} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
 {
    "Subject": {
        "Name": "ROLF BJØRN",
        "Type": "Person",
        "SocialSecurityNumber": "061177 *****"
    },
    "Reportee": {
        "Name": "KIRKENES OG AUSTBØ",
        "Type": "Enterprise",
        "OrganizationNumber": "910021451",
        "Status": "Active"
    },
    "Rights": [
        {
            "RightID": 1018549,
            "RightType": "Service",
            "ServiceCode": "2480",
            "ServiceEditionCode": 20,
            "Action": "Read",
            "RightSourceType": "RoleTypeRights",
            "IsDelegatable": true
        },
        {
            "RightID": 1018550,
            "RightType": "Service",
            "ServiceCode": "2480",
            "ServiceEditionCode": 20,
            "Action": "ArchiveRead",
            "RightSourceType": "RoleTypeRights",
            "IsDelegatable": true
        },
        {
            "RightID": 1018551,
            "RightType": "Service",
            "ServiceCode": "2480",
            "ServiceEditionCode": 20,
            "Action": "ArchiveDelete",
            "RightSourceType": "RoleTypeRights",
            "IsDelegatable": true
        },
        {
            "RightID": 1222878,
            "RightType": "Service",
            "ServiceCode": "2509",
            "ServiceEditionCode": 201412,
            "Action": "Sign",
            "RightSourceType": "RoleTypeRights",
            "IsDelegatable": true
        }
    ],
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/authorization/rights?subject={subject}&reportee={reportee}"
        }
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
