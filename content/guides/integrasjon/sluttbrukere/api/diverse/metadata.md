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
