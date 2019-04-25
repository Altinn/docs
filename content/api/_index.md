---
title: API
description: Altinns REST-API og SOAP-API
weight: 10
aliases:
- /guides/integrasjon/
---

Altinns tjenester er tilgjengelig både via REST API og SOAP-API. Hvilket API du velger avhenger av hva du skal lage.

Tjenesteeiere (offentlige virksomheter som har tjenester på Altinn-plattformen) kan få tilgang til en egen del av Altinns API der man kan gjøre oppslag i roller, rettigheter og kontaktinformasjon til bruk i eksterne løsninger.

Dette api-et er beskrevet under [API for tjenesteeiere](/docs/api-tjenesteeiere/).

## Skal du bruke REST eller SOAP?

### REST API
Altinns [REST API](/docs/api/rest-api) gir tilgang til meldingsboks, innsendingstjenester og informasjon om en sluttbruker,
som enten kan være privatperson eller eller personer med roller/rettigheter til å representere en virksomhet.
Det er dette api-et man bruker dersom man skal tilby en nettløsning eller app der sluttbrukere logger på for å utføre operasjoner mot Altinn, selv om eier av løsningen er en tjenesteeier i Altinn.

### SOAP API
Altinns [SOAP API](/docs/api/soap-api) kan brukes når...


## API-key
Altinns apikey er definert per api og applikasjonstype.

Apikeys som skal brukes i nettløsninger (typisk javascript) bestilles av type 'Nettleserapplikasjon' og må tilknyttes gyldige domener for å slippe gjennom CORS. Apikeyen blir dermed ingen hemmelighet i så måte, men vil være knyttet opp mot et spesifikt domene.
Det er mulig å tillate flere domener, og i test også "localhost".

Løsninger som kaller Altinns REST-api utenfor nettleser, for eksempel fra backend-applikasjoner, desktop-programmer eller mobilapps bruker apikey av typen "Annet" i bestillingsskjemaet
inntil skjemaet blir oppdatert. Dette gjelder uavhengig av om det er apikey som kaller sluttbrukerdelen av api-et eller tjenesteeierdelen.

## Retningslinjer

### Krav til merking

Merkingen gjelder bruk av Altinn API i web-applikasjoner. Det må komme frem for brukeren at data kommer fra Altinn.

Vi har ikke krav til hvordan teksten skal vises, men den skal være godt synlig for brukeren, når vedkommende tar i bruk eller starter applikasjonen.

### Andre krav
 - Du har ikke lov til å lage tjenester/applikasjoner som framstår som om de er laget av Altinn.
 - Du kan ikke endre på innholdet i data som leveres.
 - Du har ikke lov til å bruke innholdet på nettsider med pornografisk eller rasistisk innhold, eller på nettsider som bryter norsk lov.
 - Se dokumentasjonen for informasjon om autentisering og sikkerhet. Det kreves at  applikasjonsleverandøren fyller ut egenerklæringskjema for bruk av Altinn API.
 - Ved integrasjon av innhold fra Altinn API i andre fødererte portaler er det et krav at brukeren opplyses om bruken av Altinn API og hvilke ressurser i Altinn portalen benytter.

## Kjente feil og mangler
- Det er kun mulig å legge meldinger sendt til organisasjoner i søppelbøtten via REST tjenesten. Pr i dag finnes ikke denne muligheten via Webservice


{{% children description="true" depth="1" %}}
