---
title: Profil
description: Altinn API tilbyr tilgang til profil-data.
toc: true
weight: 50
---

## Lese egne profildata (privatperson)
Man kan hente ut informasjon fra egen brukerprofil i Altinn, som gir oversikt over hvem som er logget inn (navn, adresse, personnr, etc).
Det returneres også en lenke til profilsiden i altinn.no (lenke av type `portalview`).

GET operasjon for å lese min Profil:
```HTTP
GET https://www.altinn.no/api/my/profile HTTP/1.1
ApiKey: myKey
Accept: application/hal+json
```
 
Respons:
```JSON
{
    "Name": "HÅKON TRANA",
    "AddressLine1": "",
    "AddressLine2": "Borgermester Platous gate 7",
    "AddressLine3": "5008 BERGEN",
    "UserName": "haakon@trana.net",
    "MobileNumber": "99988888",
    "PreferredLanguage": "NorwegianNO",
    "ShowClientUnits": true,
    "PrivateConsent": true,
    "ProfessionalConsent": true,
    "ContactInformation": {
        "Email": "haakon@trana.net",
        "Mobile": "99988888",
        "RequestsEmailReceipts": false
    },
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/my/profile"
        },
        "portalview": {
            "href": "https://www.altinn.no/Pages/Profile/MyUserSettings.aspx"
        }
    }
}
```


## Les kontaktinformasjon for virksomheter
Det er mulig å hente ut informasjon fra på virksomheter som brukeren har rettigheter til i Altinn.
Organisasjonsnummeret til virksomheten benyttes til adressering.

GET operasjon for å lese kontaktinformasjon for en virksomhet:
```HTTP
GET https://www.altinn.no/api/{orgno}/profile HTTP/1.1
ApiKey: myKey
Accept: application/hal+json
```
 
Respons:
```JSON
{
    "Entity": "Altinn testvirksomhet",
    "Email": "test@test.com",
    "MobileNumber": 99988888,
    "Address": "Storgata 1",
    "PostCode":"8900",
    "City":"Brønnøysund",
    "BusinessAddress": "Kirkeveien 2",
    "BusinessPostCode":"8800",
    "BusinessCity":"Sandnessjøen",
    "LastModifiedBy": "LANDE JAN ÅGE",
    "LastModifiedDate": "2014-06-14T17:17:11.223",
    "IsSelectedForNotification": false,
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/428743989/profile"
        },
        "portalview": {
            "href": "https://www.altinn.no/Pages/Profile/UnitProfile.aspx?o=428743989"
        },
        "contactinformation": {
            "href": "https://www.altinn.no/api/428743989/profile/contactinformation"
        }
    }
}
```

`Email` og `MobileNumber` og adresse informasjon er registrert på virksomheten i Enhetsregisteret.

Dersom brukere følger lenken til `contactinformation` vil det bli returnert en liste med kontaktinformasjon registert av brukerne i Altinn.
Kontaktinformasjonen blir benyttet til varsling (epost og sms) på vegne av tjenesteeiere i Altinn.

Følgende er en GET operasjon for å lese kontaktinformasjon for en virksomhet:
```HTTP 
GET https://www.altinn.no/api/{orgno}/profile/contactinformation HTTP/1.1
ApiKey: myKey
Accept: application/json
```
 
Respons:
```JSON
[
  {
    "Id": 2686,
    "Name": "+4799000000",
    "Email": "",
    "MobileNumber": "+4799000000",
    "IsSelectedForNotification": true
  },
  {
    "Id": 7960,
    "Name": "alfa@beta.no",
    "Email": "alfa@beta.no",
    "MobileNumber": "",
    "IsSelectedForNotification": true
  }
]
```

Man kan slette enkelte innlegg av kontakinformasjon ved å sende en DELETE-operasjon på innleggets Id:
```HTTP 
DELETE https://www.altinn.no/api/{orgno}/profile/contactinformation/{Id} HTTP/1.1
ApiKey: myKey
```

Ved vellykket sletting vil man få tilbake en tom respons av type "204 Contact Information Deleted".

For å legge inn ny kontaktinformasjon kan man sende en POST-operasjon med enten Email eller MobileNumber fylt ut. Merk at de andre feltene ikke skal ha noen verdier!

```HTTP 
POST https://www.altinn.no/api/{orgno}/profile/contactinformation HTTP/1.1
Content-Type: application/json
Accept: application/json
ApiKey: myKey

{
    "Email": "alfa@beta.no"
}
```

```HTTP 
POST https://www.altinn.no/api/{orgno}/profile/contactinformation HTTP/1.1
Content-Type: application/json
Accept: application/json
ApiKey: myKey

{
    "MobileNumber": "+4799000000"
}
```

Ved vellykket innlegg vil man få tilbake en tom respons av type "204 Contact Information Created".