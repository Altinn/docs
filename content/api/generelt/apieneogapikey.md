---
title: Api-ene og apikey
description: Apikey-typer og bruk
weight: 10
---

### Apiene

#### Tjenesteeiere
Alle offentlige virksomheter som har tjenester på Altinn-plattformen kalles tjenesteeiere. 
Disse har mulighet for å få tilgang til en egen del av Altinns REST-api der man kan gjøre oppslag i roller, rettigheter og kontaktinformasjon til bruk i eksterne løsninger.

Dette api-et ligger under /serviceowner/ og er beskrevet under [Tjenesteeiere](/docs/api/tjenesteeier) og brukes til oppslag mot Altinn.

#### Sluttbrukere
Altinns REST-api for sluttbruker gir tilgang til meldingsboks, innsendingstjenester og informasjon om en sluttbruker, 
som enten kan være privatperson eller eller personer med roller/rettigheter til å representere en virksomhet. 
Det er dette api-et man bruker dersom man skal tilby en nettløsning eller app der sluttbrukere logger på for å utføre operasjoner mot Altinn, 
selv om eier av løsningen er en tjenesteeier i Altinn.

Nærmere beskrivelse av apiet ligger under [Sluttbrukere](/docs/api/sluttbruker)

### Apikey
Altinns apikey er definert per api og applikasjonstype.

Apikeys som skal brukes i nettløsninger (typisk javascript) bestilles av type 'webapplikasjon' og må tilknyttes gyldige domener for å slippe gjennom CORS.
Det er mulig å tillate flere domener, og i test også "localhost".

Løsninger som kaller Altinns REST-api utenfor nettleser, for eksempel fra backend-applikasjoner, desktop-programmer eller mobilapps bruker apikey av typen "mobilapplikasjon" i bestillingsskjemaet 
inntil skjemaet blir oppdatert. Dette gjelder uavhengig av om det er apikey som kaller sluttbrukerdelen av api-et eller tjenesteeierdelen.

