---
title: Test av tjeneste
description: Teste autorisasjon av datakonsument og samtykketjeneste
weight: 340
aliases:
 - /guides/samtykke/datakilde/test-tjeneste/
---

## Test av tjeneste i Altinn sitt testmiljø
Tjenesten må testes ut i Altinn sitt testmiljø TT02: https://tt02.altinn.no

Forutsetninger for å teste:

1.  Det må være etablert en samtykketjeneste (lenketjeneste) i TUL. Tjenesten må være migrert til TT02.
2.  For å teste henting av token via REST-tjeneste trenger man ApiKey knyttet til det organisasjonsnummeret man skal teste med. Denne kan bestilles hos Altinn via selvbetjeningsportalen eller via [*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no)
3.  Man må ha fiktive testpersoner som kan benyttes i testen. Dette har
    i de fleste tilfeller tjenesteeier allerede tilgang til, men dersom man ikke har
    dette må man sende en henvendelse til Altinn.    
4.  For å verifisere det signerte tokenet må datakilden benytte Altinn
    sitt offentlige sertifikat. Dette får man ved å henvende seg til
    Altinn.


## Registrere en datakonsument i tjenesteeierstyrt rettighetsregister 
For å få testet samtykketjenesten må man først
registrere en test-datakonsument i tjenesteeierstyrt rettighetsregister
(SRR). Dette gjøres ved å benytte vår webtjeneste "RegisterSRRAgencyExternal" (SOAP) eller vår tilsvarende REST-tjeneste.

#### Registrering med SOAP-tjeneste
SOAP-endepunktet RegisterSRRAgencyExternal nås på følgende url:

https://tt02.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc

Denne har operasjonene `AddRights` (legge til nye rettigheter for en gitt tjeneste), `DeleteRights` (slette rettigheter) og `GetRights` (hente rettigheter).

#### Registrering med REST-tjeneste
REST-endepunktet for SRR nås med følgende url:

https://tt02.altinn.no/api/serviceowner/srr

Her kan du bruke operasjonene GET (hente én eller alle rettigheter), POST (legge til rettigheter), DELETE (slette en spesifikk rettighet) og PUT (oppdatere en spesifikk rettighet).


## Eksempler

Eksempel på en SOAP-request for å legge til rettigheter (her testet ved bruk av SoapUI):

{{<figure src="add-rights.png" title="Legge til rettighet i tjenesteeierstyrt - SOAP" >}}

**ServiceCode** er tjenestekoden og **ServiceEditionCode** er tjenesteutgavekoden for lenketjenesten. Disse hentes fra TUL.  

**Reportee** angir hvilken organisasjon (eller person) som skal få lov å hente ut data gjennom tjenesten. I Lånesøknadscasen må organisasjonsnummeret til banken som skal få lov til å hente data fra Skatteetaten legges inn. I test legger man inn organisasjonsnummeret til en fiktiv organisasjon man kan teste med.  

**AllowedRedirectDomain** angir hvilket domene sluttbruker kan sendes til etter at sluttbruker har gitt/ikke gitt samtykke. Dette er en sikkerhetsmekanisme som sørger for at Altinn ikke kan utnyttes til redirects vilkårlig.
Det er kun schema/domene/host (ikke path) som legges inn og wildcard (*) kan benyttes for å støtte flere sub-domener. Om schema ikke spesifiseres tillates både HTTP og HTTPS. Egendefinerte schema kan brukes for å sende resultat tilbake til f.eks. mobile applikasjoner. 
Det er mulig å legge inn flere domener per org.nr. ved å skille de med semikolon. For mer informasjon se [her](../../datakonsument/komme-i-gang/#før-man-kan-ta-i-bruk-tjenesten-må-følgende-være-på-plass).  


Eksempel på en REST-request for å legge til rettigheter (her testet ved bruk av Postman):

{{<figure src="add-rights-rest.png" title="Legge til rettighet i tjenesteeierstyrt rettighetsregister med json-data i request body - REST" >}}  


Eksempel på verdier i request header for REST-restrequst (gjelder alle operasjoner):

{{<figure src="headers-rest.png" title="Eksempel på headerverdier - REST" >}}  


Eksempel på å fjerne en gitt rettighet (SOAP):

{{<figure src="delete-rights.png" title="Fjerne rettighet fra tjenesteeierstyrt rettighetsregister - SOAP" >}}  


Eksempel på å fjerne en gitt rettighet (REST):

{{<figure src="delete-right-rest.png" title="Fjerne rettighet med id 24 fra tjenesteeierstyrt rettighetsregister - REST" >}}  


Uthenting av rettigheter kan skje på grunnlag av tjeneste (SOAP/REST) eller organisasjonsnummer (kun SOAP). Eksempel på uthenting av gitte rettigheter (SOAP):

{{<figure src="get-rights.png" title="Uthenting av rettigheter - SOAP" >}}  


Eksempel på uthenting av gitte rettigheter (REST):

{{<figure src="get-rights-rest.png" title="Uthenting av rettigheter - REST" >}}


## Teste samtykketjenesten 
Etter å ha registrert en test-datakonsument (fiktivt
organisasjonsnummer) i tjenesteeierstyrt rettighetsregister kan man
teste ut samtykketjenesten. Dette krever at tjenesten er migrert til
TT02 i TUL. En beskrivelse av hvordan man kan opptre som datakonsument
for å få testet tjenesten og innveksling av autorisasjonskode i token
finnes [her](../../datakonsument/test-tjeneste/#test-av-samtykketjeneste-i-altinn-sitt-testmiljø).


Se [her](../bruk-av-token/#bruk-av-self-contained-oauth-token) for informasjon om oppbygging og verifikasjon av token.
