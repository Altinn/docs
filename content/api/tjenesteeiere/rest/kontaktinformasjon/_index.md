---
title: Kontaktinformasjon
description: Uthenting og søk i kontaktinformasjon for virksomheter
toc: true
---

## Hente kontaktinformasjon for alle organisasjoner

```HTTP
GET https://www.altinn.no/api/serviceowner/organizations?ForceEIAuthentication HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/organizations"
        }
    },
    "_embedded": {
        "organizations": [
            {
                "Name": "HERDLA OG SAULAND",
                "OrganizationNumber": "010000211",
                "Type": "IS",
                "LastChanged": "2014-11-05T00:00:00",
                "LastConfirmed": null,
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/010000211"
                    },
                    "personalcontacts": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/010000211/personalcontacts"
                    },
                    "officialcontacts": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/010000211/officialcontacts"
                    }
                }
            }
        ]
    }
}       
```

## Søke opp kontaktpunkt i organisasjoner

Søke opp kontaktpunkt i organisasjoner ved hjelp av e-post og/eller telefon.

```HTTP
GET https://www.altinn.no/api/serviceowner/organizations?ForceEIAuthentication&email={email}&phoneNumber={phonenumber} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/organizations"
        }
    },
    "_embedded": {
        "organizations": [
            {
                "Name": "KYSTBASEN ÅGOTNES OG ILSENG REGNSKAP",
                "OrganizationNumber": "910514318",
                "Type": "ASA",
                "LastChanged": "2015-10-27T12:43:02.23",
                "LastConfirmed": "2017-03-22T10:42:34.713",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/910514318"
                    },
                    "personalcontacts": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/910514318/personalcontacts"
                    },
                    "officialcontacts": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/910514318/officialcontacts"
                    }
                }
            },
            {
                "Name": "LEINSTRAND OG HOMBORSUND",
                "OrganizationNumber": "810748532",
                "Type": "BEDR",
                "LastChanged": null,
                "LastConfirmed": null,
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/810748532"
                    },
                    "personalcontacts": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/810748532/personalcontacts"
                    },
                    "officialcontacts": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/810748532/officialcontacts"
                    }
                }
            }
        ]
    }
}
```

## Hente kontaktinformasjon for én organisasjon

```HTTP
GET https://www.altinn.no/api/serviceowner/organizations/{who}/?ForceEIAuthentication HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
    "Name": "HERDLA OG SAULAND",
    "OrganizationNumber": "010000211",
    "Type": "IS",
    "LastChanged": "2014-11-05T00:00:00",
    "LastConfirmed": null,
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/organizations/010000211"
        },
        "personalcontacts": {
            "href": "https://www.altinn.no/api/serviceowner/organizations/010000211/personalcontacts"
        },
        "officialcontacts": {
            "href": "https://www.altinn.no/api/serviceowner/organizations/010000211/officialcontacts"
        }
    }
}
```


## Hente offisiell kontaktinformasjon for én organisasjon
Dette tilsvarer "Felles kontaktinformasjon for virksomheten" på altinn.no.

```HTTP
GET https://www.altinn.no/api/serviceowner/organizations/{who}/officialcontacts/?ForceEIAuthentication HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```


Eksempel på respons:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/organizations/910021451/officialcontacts"
        }
    },
    "_embedded": {
        "officialcontacts": [
            {
                "MobileNumber": "22334455",
                "MobileNumberChanged": "2017-06-15T09:07:20.84",
                "EMailAddress": "34234324@gg.com",
                "EMailAddressChanged": "2017-06-15T09:07:20.84"
            },
            {
                "MobileNumber": "33445566",
                "MobileNumberChanged": "2017-06-15T09:07:20.84",
                "EMailAddress": "eeee@bb.com",
                "EMailAddressChanged": "2017-06-15T09:07:20.84"
            }
        ]
    }
}
```

## Hente personlig kontaktinformasjon for én organisasjon
Dette er en liste over det de forskjellige med roller og rettigheter i en organisasjon har registrert under "Min kontaktinformasjon for virksomheten" på altinn.no.

```HTTP
GET https://www.altinn.no/api/serviceowner/organizations/{who}/personalcontacts/?ForceEIAuthentication&roleDefinitionCode={roleDefinitionCode}&serviceCode={serviceCode}&serviceEdition={serviceEdition} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```


Eksempel på respons:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/organizations/910021451/personalcontacts"
        }
    },
    "_embedded": {
        "personalcontacts": [
            {
                "PersonalContactId": "r50022994",
                "Name": "ROLF BJØRN               ",
                "SocialSecurityNumber": "06117701547",
                "MobileNumber": "12345678",
                "MobileNumberChanged": "2017-06-15T09:05:00.86",
                "EMailAddress": "eok@br.no",
                "EMailAddressChanged": "2017-06-15T09:05:00.86",
                "_links": {
                    "roles": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/910021451/personalcontacts/r50022994/roles"
                    }
                }
            },
            {
                "PersonalContactId": "r50041943",
                "Name": "DRAGE TARALD",
                "SocialSecurityNumber": "11106700992",
                "MobileNumber": "12345678",
                "MobileNumberChanged": "2016-06-22T14:17:11.23",
                "EMailAddress": "pubg@gg.kd",
                "EMailAddressChanged": "2016-06-22T14:17:11.23",
                "_links": {
                    "roles": {
                        "href": "https://www.altinn.no/api/serviceowner/organizations/910021451/personalcontacts/r50041943/roles"
                    }
                }
            }
        ]
    }
}
```

## Hente roller for person `{person}` med oppført kontaktinformasjon på vegne av `{who}`

Personidentifikatoren er altinn-id-en (r{id}) kalt `{PersonalContactId}` fra eksempelrespons på personalcontacts.

```HTTP
GET https://www.altinn.no/api/serviceowner/organizations/{who}/personalcontacts/{person}/roles HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/organizations/910514318/personalcontacts/r50051516/roles"
        }
    },
    "_embedded": {
        "roles": [
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 89,
                "RoleName": "Basisrolle",
                "RoleDescription": "Rolle som følger automatisk med når en bruker får en annen Altinn-rolle",
                "RoleDefinitionCode": "ALLEA",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/89"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 8,
                "RoleName": "Begrenset signeringsrettighet",
                "RoleDescription": "Tilgang til å signere utvalgte skjema og tjenester",
                "RoleDefinitionCode": "SISKD",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/8"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 12,
                "RoleName": "Energi, miljø og klima",
                "RoleDescription": "Tilgang til tjenester relatert til energi, miljø og klima",
                "RoleDefinitionCode": "UTOMR",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/12"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 131,
                "RoleName": "Helse-, sosial- og velferdstjenester",
                "RoleDescription": "Tilgang til helse-, sosial- og velferdsrelaterte tjenester",
                "RoleDefinitionCode": "UIHTL",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/131"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 15,
                "RoleName": "Klientadministrator",
                "RoleDescription": "Tilgang til å administrere klientroller for regnskapsførere og revisorer",
                "RoleDefinitionCode": "KLADM",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/15"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 134,
                "RoleName": "Kommunale tjenester",
                "RoleDescription": "Rolle for kommunale tjenester",
                "RoleDefinitionCode": "KOMAB",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/134"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 3,
                "RoleName": "Lønn og personalmedarbeider",
                "RoleDescription": "Denne rollen gir rettighet til lønns- og personalrelaterte tjenester.\r\n",
                "RoleDefinitionCode": "LOPER",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/3"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 5576,
                "RoleName": "Parallell signering",
                "RoleDescription": "Denne rollen gir rettighet til å signere elementer fra andre avgivere.\r\n",
                "RoleDefinitionCode": "PASIG",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/5576"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 87,
                "RoleName": "Patent, varemerke og design",
                "RoleDescription": "Denne rollen gir rettighet til tjenester relatert til patent, varemerke og design.",
                "RoleDefinitionCode": "PAVAD",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/87"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 5603,
                "RoleName": "Post/arkiv",
                "RoleDescription": "Denne rollen gir rettighet til å lese meldinger som blir sendt til brukerens meldingsboks.\r\n",
                "RoleDefinitionCode": "A0236",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/5603"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 272,
                "RoleName": "Primærnæring og næringsmiddel",
                "RoleDescription": "Denne rollen gir rettighet til tjenester innen import, foredling, produksjon og/eller salg av primærnæringsprodukter og andre næringsmiddel, samt dyrehold, akvakultur, planter og kosmetikk.",
                "RoleDefinitionCode": "A0212",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/272"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 6,
                "RoleName": "Regnskapsmedarbeider",
                "RoleDescription": "Denne rollen gir rettighet til regnskapsrelaterte skjema og tjenester.",
                "RoleDefinitionCode": "REGNA",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/6"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 85,
                "RoleName": "Revisorattesterer - MVA kompensasjon",
                "RoleDescription": "Denne rollen gir revisor rettighet til å attestere tjenesten Merverdiavgift - søknad om kompensasjon (RF-0009).",
                "RoleDefinitionCode": "ATTST",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/85"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 10,
                "RoleName": "Samferdsel",
                "RoleDescription": "Rollen gir rettighet til tjenester relatert til samferdsel. For eksempel tjenester fra Statens Vegvesen, Sjøfartsdirektoratet og Luftfartstilsynet.",
                "RoleDefinitionCode": "UILUF",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/10"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 130,
                "RoleName": "Signerer av Samordnet registermelding",
                "RoleDescription": "Denne rollen gir rettighet til tjenester på vegne av enheter/foretak.\r\n",
                "RoleDefinitionCode": "SIGNE",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/130"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 4,
                "RoleName": "Tilgangsstyring",
                "RoleDescription": "Denne rollen gir administratortilgang til å gi videre rettigheter til andre.\r\n",
                "RoleDefinitionCode": "ADMAI",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/4"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 11,
                "RoleName": "Utfyller/Innsender",
                "RoleDescription": "Denne rollen gir rettighet til utvalgte skjema og tjenester.\r\n",
                "RoleDefinitionCode": "UTINN",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/11"
                    }
                }
            },
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 86,
                "RoleName": "Økokrim rapportering",
                "RoleDescription": "Tilgang til tjenester fra Økokrim",
                "RoleDefinitionCode": "HVASK",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/serviceowner/roledefinitions/86"
                    }
                }
            }
        ]
    }
}
```
