---
title: Hente ut liste over avgivere
weight: 100
---

Denne siden beskriver hvordan Altinn kan brukes til å hente ut liste over alle avgivere en bruker kan represtentere

## Hente ut liste over avgivere

Henter ut en liste over alle avgivere en person `{subject}`kan representere,
eventuelt spesifisert ned på spesifikk tjeneste eller rolle.

```HTTP
GET https://www.altinn.no/api/serviceowner/reportees?ForceEIAuthentication&subject={subject}&serviceCode={serviceCode}&serviceEdition={serviceEdition}&roleDefinitionId={roleDefinitionId}&showConsentReportees={showConsentReportees} HTTP/1.1
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
                "OrganizationForm": "AS",
                "Status": "Active"
            },
            {
                "Name": "EIDSNES OG AUSTRE ÅMØY",
                "Type": "Business",
                "OrganizationNumber": "910521551",
                "OrganizationForm": "ORGL",
                "Status": "Active"
            },
            {
                "Name": "FJELL LISA FOS",
                "Type": "Person",
                "SocialSecurityNumber": "13054900281"
            },
            {
                "Name": "BARDU OG SØRUM REGNSKAP",
                "Type": "Business",
                "OrganizationNumber": "910441205",
                "ParentOrganizationNumber": "910460048",
                "OrganizationForm": "BEDR",
                "Status": "Active"
            },
            {
                "Name": "HOLUM OG SVARSTAD REGNSKAP",
                "Type": "Enterprise",
                "OrganizationNumber": "910460048",
                "OrganizationForm": "FLI",
                "Status": "Active"
            },
            {
                "Name": "NICOLINE HANNISDAL",
                "Type": "Person",
                "SocialSecurityNumber": "02066681060"
            }
        ]
    }
}
```
