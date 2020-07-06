---
title: Hente liste med samtykker eller fullmakter
description: Denne siden beskriver hvordan man kan hente liste med samtykker eller fullmakter for en tjenesteeiers tjeneste via REST API.
weight: 600
---

Fra [versjon 20.2](../../../../../ny-funksjonalitet/releases/2020/20-2) ble det 
mulig å hente alle samtykker eller fullmakter 
gitt for en tjeneste via REST API. Det nye endepunktet er foreløpig bare 
tilgjengelig på tjenesteeier API. Denne funksjonaliteten er ment å gi 
tjenesteeiere i Altinn en enkel oversikt over hvilke autorisasjoner som er 
aktive på deres samtykke- eller fullmaktstjenester. 

OBS: Det er ikke noen forskjell i bruken av endepunktet mot en samtykketjeneste 
eller en fullmaktstjeneste i Altinn, så for resten av dette dokumentet vil vi 
bare referere til samtykker, men bruken for å hente fullmakter er helt lik. 

## Detaljert beskrivelse 

Listen inneholder følgende informasjon om hvert samtykke:

* autorisasjonskoden til samtykket
* status på samtykket
* avgiverinformasjon om samtykkegiver, -mottaker, og ev. tredjepartsmottaker 
  som kan bruke samtykket på vegne av samtykkemottaker
* tidspunkt for opprettelsen av samtykket, hvor lenge det er gyldig, og når 
  den siste statusendringen på samtykket skjedde

I tillegg til listen blir også følgende informasjon returnert: 

* continuation token som kan brukes ved neste kall
* lenkeadresser til både dette og neste kall

Et samtykke i listen kan ha en av to statuser - `Active` eller `Revoked`. 
Hvis en sluttbruker trekker et samtykke så blir statusen på samtykket 
endret, og nye kall til endepunktet vil da reflektere denne endringen.
Listen som returneres er sortert etter tidspunkt for sist gang statusen på samtykket 
ble endret, i stigende rekkefølge. Dvs. at det samtykket som ble nyligst gitt eller endret 
kommer sist. For aktive samtykker vil dette tidspunktet være lik da de ble gitt.

For gjentagende kall er det mulig å bruke parameteret `continuation` for 
å bare få utlevert samtykker som har blitt opprettet eller endret siden sist 
kall. Det er også mulig å be å filtrere på `status` slik at listen kun 
inneholder enten aktive eller tilbaketrukne samtykker.  Hvis 
`status` parameteret ikke er brukt vil listen inneholde begge statuser. 

Samtykker som har gått ut på dato som følge av at gyldighetsperioden er over 
vil ikke være inkludert i listen.  Det er derfor viktig at listen med trukne 
samtykker ikke brukes som eneste kilde for om et samtykke fortsatt er gyldig. 
Man må alltid sjekke at samtykket fortsatt er gyldig før man forsøker å benytte
seg av det.

## Tekniske detaljer

### API
[GET serviceowner/consents dokumentasjon](https://www.altinn.no/api/serviceowner/Help/Api/GET-serviceowner-consents_serviceCode_serviceEditionCode_status[0]_status[1]_continuation)

#### Request
```HTTP
GET https://www.altinn.no/api/serviceowner/consents?ForceEIAuthentication&serviceCode={serviceCode}&serviceEdition={serviceEdition} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

#### Response
```
{
  "_links": {
    "self": {
      "href": "https://www.altinn.no/api/serviceowner/consents?serviceCode={serviceCode}&serviceEdition={serviceEdition}"
    },
    "next": {
      "href": "https://www.altinn.no/api/serviceowner/consents?serviceCode={serviceCode}&serviceEdition={serviceEdition}&continuation=2020-02-03T10:09:59.548_1"
  },
  "_embedded": {
    "consents": [
      {
        "AuthorizationCode": "616d2c43-17f9-4cc1-9257-41cdda157f11",
        "Status": "active",
        "OfferedBy": {
          "Name": "OLA NORDMANN",
          "Type": "Person",
          "SocialSecurityNumber": "01012012345"
        },
        "CoveredBy": {
          "Name": "BANK AS",
          "Type": "Enterprise",
          "OrganizationNumber": "123456789",
          "OrganizationForm": "sf",
          "Status": "Active"
        },
        "Created": "2020-02-03T10:09:59.5484894+01:00",
        "ValidTo": "2020-05-03T10:09:59.5484894+01:00",
        "LastChanged": "2020-02-03T10:09:59.5484894+01:00"
      }
    ]
  },
  "continuationtoken": "2020-02-03T10:09:59.548_1"
 }
```

### Engangssamtykker 

Engangssamtykker som har blitt registrert brukt vil få samme status som trukne 
samtykker - `Revoked`.

### Continuation token 

Det er veldig mange samtykker i Altinn og av ytelseshensyn er det derfor 
anbefalt å bruke `continuation` parameteret ved gjentatte kall. Les mer her: 

[Hvordan bruke continuation token i Altinn](../../continuation-token)

Hvis man ønsker å hente ut listen i to kall der man i den ene henter ut aktive 
samtykker og i den andre henter ut trukne samtykker, må man være oppmerksom på 
at man benytter riktig continuation token.  
