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
ApiKey: myKey
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
ApiKey: myKey
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

## Hente metadata om tillatte vedlegg på en innsendingstjeneste

Enkelte innsendingstjenester har definert vedleggstyper man kan legge ved. 
Disse angir blant annet hvilke filtyper, filstørrelser og antall som er tillatt.

Feltet som brukes for å angi type vedlegg i en [innsending](/docs/guides/integrasjon/sluttbrukere/api/meldinger/sende-inn/) er *AttachmentTypeName*.
```HTTP
GET https://www.altinn.no/api/metadata/formtask/3734/150114 HTTP/1.1
ApiKey: myKey
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
