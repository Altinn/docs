---
title: Metadata
description: Altinn API tilbyr en ressurs som gir tilgang til metadata for tjenester tilgjengelige i Altinn.
weight: 10
---

Altinn API tilbyr en ressurs som gir tilgang til metadata for tjenester tilgjengelige i Altinn.
Metadata ressursen er åpent tilgjengelig og krever ikke autentisering.

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