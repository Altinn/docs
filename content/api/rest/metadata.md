---
title: Metadata
description: Altinn API tilbyr en ressurs som gir tilgang til metadata for tjenester tilgjengelige i Altinn. Metadata ressursen er åpent tilgjengelig og krever ikke autentisering.
toc: true
weight: 10
---

## Hente metadata for alle tjenester

```HTTP
GET https://www.altinn.no/api/metadata HTTP/1.1
Accept: application/hal+json
```

Respons fra API:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/metadata"
        }
    },
    "_embedded": {
        "metadata": [{
            "ServiceOwnerCode": "BUF",
            "ServiceOwnerName": "Barne-, ungdoms- og familiedirektoratet",
            "ServiceName": "BUF-0021 Søknad om tilskudd til frivillige, landsomfattende barne- og ungdomsorganisasjoner - internasjonal grunnstøtte for partipolitiske ungdomsorganisasjoner",
            "ServiceCode": "3734",
            "ServiceEditionCode": 150114,
            "ValidFrom": "2014-05-15T08:00:00",
            "ValidTo": "2099-01-15T00:56:00",
            "ServiceType": "FormTask",
            "_links": {
                "self": {
                    "href": "https://www.altinn.no/api/metadata/formtask/3734/150114"
                }
            }
        },
        {
            "ServiceOwnerCode": "BUF",
            "ServiceOwnerName": "Barne-, ungdoms- og familiedirektoratet",
            "ServiceName": "Søknad om aktivitetstilskot for å betre levekår og livskvalitet blant lesbiske, homofile, bifile og transpersonar (LHBT)",
            "ServiceCode": "3610",
            "ServiceEditionCode": 130802,
            "ValidFrom": "2014-01-16T10:23:50",
            "ValidTo": "2099-02-01T00:51:00",
            "ServiceType": "FormTask",
            "_links": {
                "self": {
                    "href": "https://www.altinn.no/api/metadata/formtask/3610/130802"
                }
            }
        }]
    }
}
```

## Hente metadata for enkelt tjeneste

```HTTP
GET https://www.altinn.no/api/metadata/formtask/3734/150114 HTTP/1.1
Accept: application/hal+json
```

Respons fra API:
```JSON
{
  "ServiceOwnerCode": "BUF",
  "ServiceOwnerName": "Barne-, ungdoms- og familiedirektoratet",
  "ServiceName": "BUF-0021 Søknad om tilskudd til frivillige, landsomfattende barne- og ungdomsorganisasjoner - internasjonal grunnstøtte for partipolitiske ungdomsorganisasjoner",
  "ServiceCode": "3734",
  "ServiceEditionCode": 150114,
  "ValidFrom": "2014-05-15T08:00:00",
  "ValidTo": "2099-01-15T00:56:00",
  "ServiceType": "FormTask",
  "RestEnabled": false,
  "EUSEnabled": true,
  "EnterpriseUserEnabled": true,
  "FormsMetaData": [{
    "FormID": 3686,
    "FormName": "BUF-0021 Søknad om tilskudd til frivillige, landsomfattende barne- og ungdomsorganisasjoner - internasjonal grunnstøtte for partipolitiske ungdomsorganisasjoner",
    "DataFormatProviderType": "Seres",
    "DataFormatID": "4362",
    "DataFormatVersion": 36770,
    "IsOnlyXsdValidation": false,
    "FormType": "MainForm",
    "_links": {
      "schema": {
        "href": "https://www.altinn.no/api/metadata/formtask/3734/150114/forms/4362/36770/xsd"
      }
    }
  }],
  "ProcessSteps": [{
    "Name": "Innsending",
    "SecurityLevel": 2
    },{
    "Name": "Signering",
    "SecurityLevel": 4
  }],
  "_links": {
    "self": {
      "href": "https://www.altinn.no/api/metadata/formtask/3734/150114"
    }
  }
}
```

Metadata om den enkelte tjenesten vil for eksempel inkludere informasjon om det er mulig å sende inn skjema via REST API,
samt gi tilgang til XSD for skjema (datamodell).

## Hente oversikt over kodelister
I Altinn ligger det også noe som heter kodelister. Dette er i prinsippet lister med koder hvor hver kode kan ha tre verdier. En navngitt kodeliste kan komme i flere språk og versjoner. Kodelister blir gjerne brukt som oppslagsverk i tjenester.  

Mer teknisk informasjon på hjelpesidene for API: https://www.altinn.no/api/Help/Api/GET-metadata-codelists_language

```HTTP
GET https://www.altinn.no/api/metadata/codelists HTTP/1.1
Accept: application/hal+json
```

Eksempel på respons fra API (ikke full liste):
```JSON
{
    "_links": {
        "self": {
            "href": "http://www.altinn.no/api/metadata/codelists?language=1044"
        }
    },
    "_embedded": {
        "codelists": [
            {
                "Name": "ASF_Land",
                "Version": 404,
                "Language": 1044,
                "_links": {
                    "self": {
                        "href": "http://www.altinn.no/api/metadata/codelists/ASF_Land/404?language=1044"
                    }
                }
            },
            {
                "Name": "SKD_RF1030_BilSats",
                "Version": 432,
                "Language": 1044,
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/metadata/codelists/SKD_RF1030_BilSats/432?language=1044"
                    }
                }
            },
        ]
    }
}
```
## Hente detaljer om en kodeliste
Dette grensesnittet er laget for å gjøre tilgjengelig detaljene til en kodeliste. Det vil si at i tillegg til navn, versjon og språk får man med de faktiske kodene i listen.  

Mer teknisk informasjon på hjelpesidene for API: https://www.altinn.no/api/Help/Api/GET-metadata-codelists-name-version_language

```HTTP
GET https://www.altinn.no/api/metadata/codelists HTTP/1.1
Accept: application/hal+json
```

Eksempel på respons fra API (ikke full liste):
```JSON
{
    "Name": "ASF_Land",
    "Version": 404,
    "Language": 1044,
    "Codes": [
        {
            "Code": "DANMARK",
            "Value1": "DANMARK",
            "Value2": "DK",
            "Value3": "101"
        },
        {
            "Code": "NORGE",
            "Value1": "NORGE",
            "Value2": "NO",
            "Value3": "000"
        },
        {
            "Code": "USA",
            "Value1": "USA",
            "Value2": "US",
            "Value3": "684"
        },
    ],
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/metadata/codelists/ASF_Land/404?language=1044"
        }
    }
}
```
## Hente metadata om tillatte vedlegg på en innsendingstjeneste

Enkelte innsendingstjenester har definert vedleggstyper man kan legge ved. 
Disse angir blant annet hvilke filtyper, filstørrelser og antall som er tillatt.

Feltet som brukes for å angi type vedlegg i en [innsending](/docs/guides/integrasjon/sluttbrukere/api/meldinger/sende-inn/) er *AttachmentTypeName*.
```HTTP
GET https://www.altinn.no/api/metadata/formtask/3734/150114 HTTP/1.1
Accept: application/hal+json
```

Respons fra API:
```JSON
{
    "ServiceOwnerCode": "SKD",
    "ServiceOwnerName": "Skatteetaten",
    "ServiceName": "A02 a-melding innsending fra system",
    "ServiceCode": "3357",
    "ServiceEditionCode": 130815,
    "ValidFrom": "2017-08-08T10:21:00",
    "ValidTo": "2999-12-31T13:00:00",
    "ServiceType": "FormTask",
    "RestEnabled": false,
    "AttachmentRules": [
        {
            "AttachmentRuleId": 284,
            "AllowedFileTypes": "*.xml, zip, enc",
            "AttachmentTypeName": "Amelding",
            "AttachmentTypeNameLanguage": "Amelding",
            "IsCheckSumAllowed": false,
            "IsXsdValidationRequired": false,
            "MaxAttachmentCount": 1,
            "MaxFileSize": 200,
            "MinAttachmentCount": 1
        }
    ],
    "FormsMetaData": [
        {
            "FormID": 213428,
            "FormName": "A02 a-melding submission from system",
            "DataFormatProviderType": "Seres",
            "DataFormatID": "4166",
            "DataFormatVersion": 35895,
            "IsOnlyXsdValidation": false,
            "FormType": "MainForm",
            "_links": {
                "schema": {
                    "href": "https://tt02.altinn.no/api/metadata/formtask/3357/130815/forms/4166/35895/xsd"
                }
            }
        }
    ],
    "_links": {
        "self": {
            "href": "https://tt02.altinn.no/api/metadata/formtask/3357/130815"
        }
    }
}
```

Metadata om den enkelte tjenesten vil for eksempel inkludere informasjon om det er mulig å sende inn skjema via REST API,
samt gi tilgang til XSD for skjema (datamodell).

## Hente metadata om rolledefinisjoner i Altinn

Åpent grensesnitt for uthenting av metadata informasjon om rolledefinisjoner som finnes i Altinn. Her vil man kunne finne alle rolledefinisjoner for ER-roller og Altinn-roller, men ikke private lokale roller opprettet for en gitt avgiver.

Eksempel spørring for å hente alle ER og Altinn-roller:
```HTTP
GET /api/metadata/roledefinitions/?language=1044 HTTP/1.1
Accept: application/hal+json
```

Eksempel spørring for å hente en spesifikk rolledefinisjon basert på id:
```HTTP
GET /api/metadata/roledefinitions/11?language=1044 HTTP/1.1
Accept: application/hal+json
```

Respons fra API:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/metadata/roledefinitions"
        }
    },
    "_embedded": {
        "roledefinitions": [
            {
                "RoleType": "Altinn",
                "RoleDefinitionId": 11,
                "RoleName": "Utfyller/Innsender",
                "RoleDescription": "Denne rollen gir rettighet til utvalgte skjema og tjenester.\r\n",
                "RoleDefinitionCode": "UTINN",
                "ParentRoleDefinitionIds": [
                    82,
                    117,
                    122,
                    123,
                    125,
                    126,
                    127,
                    138,
                    139,
                    143,
                    152,
                    154,
                    155,
                    156,
                    158,
                    160,
                    161
                ],
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/metadata/roledefinitions/11"
                    }
                }
            },
            {
                "RoleType": "External",
                "RoleDefinitionId": 82,
                "RoleName": "Privatperson",
                "RoleDescription": "Denne rollen er hentet fra Folkeregisteret og gir rettighet til flere tjenester.\r\n",
                "RoleDefinitionCode": "PRIV",
                "ChildRoleDefinitionIds": [
                    3,
                    4,
                    5,
                    6,
                    8,
                    10,
                    11,
                    12,
                    87,
                    95,
                    108,
                    2374,
                    13612,
                    28088,
                    29486
                ],
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/metadata/roledefinitions/82"
                    }
                }
            }
        ]
    }
}
```

Metadata om den enkelte rolledefinisjonen vil for eksempel inkludere informasjon om rollen er barn eller foreldre for en eller flere andre roller i Altinn.
Alle "ParentRoleDefinitionIds" rollene er da roller som også gir tilgang til denne rollen, mens alle "ChildRoleDefinitionIds" er roller man også får tilgang til gjennom å ha denne rollen.
Fra eksempelet over ser vi da at "PRIV" rollen man har som privatperson har "UTINN" med rolledefinisjonid: 11 som barn. Mens "UTINN" rollen har "PRIV" rollen med rolledefinisjonsid: 82 som foreldre.

## Hente metadata om rollekrav

Dette grensesnittet gjør det mulig å hente rollekravet som gir tilgang for en gitt tjeneste, app eller delegerbar ressurs i Altinn.
Alle tjenester, Altinn Apps fra 3.0 eller delegerbare API-ressurser (“delegation schemes”) fra Maskinporten, blir knytt til minst en ER eller Altinn-rolle som gir tilgang til en eller flere operasjoner for ressursen. 

Både tjenestekoder og evt. AltinnAppId kan man finne i API for å [hente metadata for alle tjenester](/docs/api/rest/metadata/#hente-metadata-for-alle-tjenester).

Eksempel spørring ved bruk av Altinn service koder:
```HTTP
GET https://www.altinn.no/api/metadata/rolerequirements?serviceCode=3357&serviceEditionCode=130815&language=1044 HTTP/1.1
Accept: application/hal+json
```

Eksempel spørring ved bruk av AppId service kode for ett Delegation Scheme fra Maskinporten:
```HTTP
GET https://www.altinn.no/api/metadata/rolerequirements?serviceCode=Appid:85&language=1044 HTTP/1.1
Accept: application/hal+json
```

Eksempel spørring ved bruk av AltinnAppId på formatet org/appnavn for en Altinn App fra tjenester 3.0:
```HTTP
GET https://www.altinn.no/api/metadata/roledefinitions/11&language=1044 HTTP/1.1
Accept: application/hal+json
```

Respons fra API:
```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/metadata/rolerequirements?serviceCode=3357&serviceEditionCode=130815"
        }
    },
    "_embedded": {
        "rolerequirements": [
            {
                "RoleDefinitionId": 11,
                "RoleDefinitionCode": "UTINN",
                "LocalizedRoleName": "Utfyller/Innsender",
                "ParentRoleDefinitionIds": [
                    82,
                    117,
                    122,
                    123,
                    125,
                    126,
                    127,
                    138,
                    139,
                    143,
                    152,
                    154,
                    155,
                    156,
                    158,
                    160,
                    161
                ],
                "IsDelegable": true,
                "Operations": [
                    {
                        "Name": "Read",
                        "LocalizedFriendlyName": "Lese"
                    },
                    {
                        "Name": "Write",
                        "LocalizedFriendlyName": "Fylle ut",
                        "AppliesTo": [
                            {
                                "Name": "Default",
                                "SecurityLevel": 2
                            },
                            {
                                "SequenceNumber": 2,
                                "Name": "SendIn",
                                "SecurityLevel": 2
                            },
                            {
                                "SequenceNumber": 1,
                                "Name": "FormFilling",
                                "SecurityLevel": 2
                            }
                        ]
                    },
                    {
                        "Name": "ArchiveRead",
                        "LocalizedFriendlyName": "Les Arkiv"
                    },
                    {
                        "Name": "ArchiveDelete",
                        "LocalizedFriendlyName": "Slett Arkiv"
                    }
                ],
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/metadata/roledefinitions/11"
                    }
                }
            },
            {
                "RoleDefinitionId": 153,
                "RoleDefinitionCode": "KNUF",
                "LocalizedRoleName": "Kontaktperson for NUF",
                "IsDelegable": true,
                "Operations": [
                    {
                        "Name": "Read",
                        "LocalizedFriendlyName": "Lese"
                    },
                    {
                        "Name": "Write",
                        "LocalizedFriendlyName": "Fylle ut",
                        "AppliesTo": [
                            {
                                "Name": "Default",
                                "SecurityLevel": 2
                            },
                            {
                                "SequenceNumber": 2,
                                "Name": "SendIn",
                                "SecurityLevel": 2
                            },
                            {
                                "SequenceNumber": 1,
                                "Name": "FormFilling",
                                "SecurityLevel": 2
                            }
                        ]
                    },
                    {
                        "Name": "ArchiveRead",
                        "LocalizedFriendlyName": "Les Arkiv"
                    },
                    {
                        "Name": "ArchiveDelete",
                        "LocalizedFriendlyName": "Slett Arkiv"
                    }
                ],
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/metadata/roledefinitions/153"
                    }
                }
            }
        ]
    }
}
```

Metadata om rollekravet til den enkelte tjeneste vil for eksempel inkludere informasjon om hver enkelt rolletype som gir tilgang til en eller flere operasjoner for tjenesten.
Dersom det er snakk om en innsendingstjeneste vil det også kunne spesifiseres en "AppliesTo" seksjon pr. operasjon dersom det finnes forskjellige prosess-steg for operasjonen som f.eks: "SendIn", "FormFilling", "Payment".

For Altinn Apps eller Delegation Schemes fra Maskinporten, vil det bare foreligge forenklet informasjon om tilgang for "Access" operasjon.
