---
title: Innsyn
description: Er en tjeneste som benyttes for å gi bruker innsyn i data som er registrert i tjenesteeier sitt system, for eksempel saksbehandlingsløsninger eller elektroniske arkiv.
weight: 100
---

Er en tjeneste som benyttes for å gi bruker innsyn i data som er registrert i tjenesteeier sitt system, for eksempel saksbehandlingsløsninger eller elektroniske arkiv.
En innsynstjeneste kan gi innsyn i flere forskjellige systemer hos tjenesteeier.


### Fordeler og muligheter
Innsynstjenester er tjenester som brukes til å hente data fra en tjenesteeier til Altinn ved å kalle en eller flere web services.
Forretningslogikk og data ligger hos tjenesteeier, mens presentasjonen av dataene ligger i Altinn.
Tjenesteeiere kan gjøre informasjon i egne registre (for eksempel saksbehandlingsløsninger eller elektroniske saksarkiv/saksmapper)
tilgjengelig for den enkelte brukeren eller dennes representant. Dataene kan også gjøres tilgjengelig for sluttbrukersystem.

Innholdet i en innsynstjeneste vil på samme måte som for innsendingstjenester være alt som har med skjema,
datainnholdet og selve interaksjonen med sluttbruker i sluttbrukerløsningen å gjøre.
Uthenting av data fra tjenesteeiers systemer håndteres gjennom en såkalt mapper, som er en komponent for fleksibel integrasjon mellom Altinn og andre systemer.

Innsynstjenesten består av følgende hoveddeler

 - Mappere mot eksterne webtjenester- For utarbeidelse av Web Service mappere av innsynstjenester så er dette kode som tjenesteeier utvikler i Visual Studio
 - InfoPath-skjema – visningen av innsynsoppslaget

Tjenesteeier definerer tjenesten som skal supplere dataene, og definerer så et InfoPath-skjema som viser dataene for brukeren.
Tjenesteeier kan definere om brukerne skal kunne lagre innsynstjenesten i min meldingsboks.
Dette for at sluttbruker kan velge om de vil lagre en signert kopi av en innsynstjeneste.
Den signerte innsynstjenesten lagres da i brukers arkiv i Altinn. En innsynstjeneste som ikke er signer og arkivert vil ikke være tilgjengelig i Altinn etter at den er benyttet.
Sluttbruker kan også videresende Altinn-signert innsynstjeneste på e-post.



### Funksjonalitet som tilbys
 - Kvittering
 - Virksomhetssertifikat

### Hvordan komme i gang
Under utvikling

### Råd og tips
Under utvikling

### Kanaler
 - Portal
 - Web service

### Avhengigheter
Innsynstjeneste i Altinn forutsetter bruk av autentisering og autorisasjon i Altinn.

### Teknisk dokumentasjon
 - Brukerdokumentasjon TUL
 - [Implementasjonsguide for tjenesteeier](/docs/guides/tjenesteeier/)