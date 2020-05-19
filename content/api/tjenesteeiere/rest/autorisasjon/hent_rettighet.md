---
title: Hente ut liste over rettigheter
weight: 200
---
Denne siden beskriver hvordan Altinn kan brukes til å hente ut liste over rettigheter en bruker har på vegne av andre

## Hente ut rettigheter

Hente ut alle rettigheter en person `{subject}` har for en annen person eller organisasjon `{reportee}` på tjenester som tilhører autentisert tjenesteeier.

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
        "SocialSecurityNumber": "06117701547"
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