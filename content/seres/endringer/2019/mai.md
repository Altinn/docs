---
title: Mai
description: Nytt repository, ny brukeradministrasjonsløsning, splitting av domene og endring av Domenepanelet i Domeneklienten.
weight: 20
type: releasenote
releasenote_info: Produksjonssatt 4. mai 2019
---

### Nytt repository 

Adaptive Metadata Management er byttet ut og Domeneklienten går nå mot et egenutviklet metadatarepository. 

### Ny brukeradministrasjonsløsning 

Adaptive Metadata Management er byttet ut og administrasjon av brukere, kataloger og miljøer i SERES Repository gjøres nå via den egenutviklede web-klienten SERES Administrasjonsklient. Opplysningene brukes av Domeneklienten for autentisering og autorisasjon av brukere, og for visning av oversikten over tilgjengelige kataloger. Se egen brukerveiledning for SERES Administrasjonsklient: [Brukerveiledning for SERES Administrasjonsklient](https://samarbeid.brreg.no/seres/Brukerdokumentasjon/Brukerveiledning%20for%20SERES%20Administrasjonsklient.pdf). 

### GUID-generering er reimplementert 

Adaptive Metadata Management er byttet ut og GUID-genereringen ble reimplementert inn i REST-APIet til SERES Administrasjonsklient.

### Innføring av noden «Katalog» i Domenepanelet 

Det er innført et nivå over domene som vi kaller «Katalog». Navnet til katalogen vil være det samme som det offisielle navnet til eier av domene(ne). Katalogen registreres i Administrasjonsklienten ved bruk av organisasjonsnummer og navnet hentes fra Enhetsregisteret. En katalog kan ha flere domener. 

### Ny rolle «Katalogadministrator» 

Den som er Katalogadministrator for en katalog kan i Domeneklienten opprette og deaktivere/reaktivere domene og endre navn på domene, i tillegg til å kunne gjøre det samme som de som har skrivetilgang til katalogen. Brukeren vil også få rettigheter i Administrasjonsklienten. Se brukerveiledningen til Administrasjonsklienten for mer informasjon. Eieren av katalogen kan bestille denne rettigheten til en eller flere av sine brukere.

### Mulig å opprette og deaktivere/reaktivere domene 

Det er mulig å opprette og deaktivere/reaktivere en eller flere domener under en katalog i Domeneklienten. Dette kan gjøres av personer med rollene Systemadministrator og Katalogadministrator.  

### Mulig å endre navn på domene 

Det er mulig å endre navn på et domene i Domeneklienten. Vær oppmerksom på at GUID-er som ble opprettet før navnet på domenet ble endret ikke vil bli endret. Navneendringen kan gjøres av personer med rollene Systemadministrator og Katalogadministrator.  

### Mulig å deaktivere/reaktivere Fellesmodell og Tjenestemodeller 

Det er mulig å deaktivere/reaktivere modeller. Dette kan gjøres av personer som har skrivetilgang til modellen.  

### Splitting av domene 

Domene er splittet i en «Fellesmodell» som inneholder Begrepsnivå og Strukturnivå samt Felles datamodell(er) og Plattform fra Implementasjonsnivå, og en modell for hver Tjenestemodell. 

### Nye og større ikoner i Domenepanelet 

Det er laget ikoner for Fellesmodell og de nye statusutgavene, samt nytt ikon for Tjenestemodell. Alle ikonene i Domenepanelet er blitt større. 

### Bedre synliggjøring av kataloger man har skrivetilgang til 

Kataloger man har skrivetilgang til vil alltid vises øverst i Domenepanelet. Navnet til katalogen(e) vil i tillegg være med uthevet skrift. 

### Ny fremgangsmåte ved versjonering av modellendringer 

For å lage en ny versjon av en modell kan man kopiere en tidligere utgave av modellen. Eventuelt kan man å lage en helt ny modell basert på kopi av en modellversjon fra en annen modell. En og samme modell kan ha flere godkjente versjoner samtidig 

### Modellversjon kan gis et versjonsnavn 

En versjon av en modell kan gis et versjonsnavn. F.eks. tjenestemodellnavn «xx – Innrapportering», versjonsnavn «2019». Versjonsnavn kan endres uavhengig av modellversjonens status. 

### Modellversjon kan gis en beskrivelse/kommentar 

En versjon av en modell kan gis en tekstlig beskrivelse/kommentar i feltet «Versjonsinfo». Teksten vises i arbeidspanelet og under «Versjonsinformasjon», og kan endres uavhengig av modellversjonens status. 

### Versjonsinformasjon 

Det logges hver gang noen lagrer en endring på en modellversjon og de 20 siste hendelsene vises i eget versjonsinformasjonsvindu som kan åpnes fra Domenepanelet. I tillegg er det mulig fra dette vinduet å endre versjonsnavn og versjonsinfo, samt se opplysninger som versjonsid, katalogsti, versjonsnr, status og datoer for opprettet, siste endret og avsluttet. 

### Modellversjoner under en katalog er tilgjengelig for alle som har skrivetilgang til katalogen

Alle som har skrivetilgang til en katalog har tilgang til alle modellversjoner som finnes under katalogen. Her kan de gjøre endringer på alle modellversjoner som er under arbeid uavhengig av hvem som har startet arbeidet.  

### Nye statuser på en modellversjon 
En modellversjon kan ha en av disse fire statusene:
* Arbeidsversjon – modellversjonen er under arbeid. Den kan leses og endres av alle som har skrivetilgang til katalogen/domenet, og ingen andre.
* Publisert versjon – modellversjoner er kvalitetssikret, godkjent og låst for redigering. Den vil være tilgjengelig for lesing og kopiering for alle brukere av Domeneklienten.
* Historisk versjon – modellversjon har tidligere vært publisert, men er nå foreldet/tatt ut av produksjon. Den vil være tilgjengelig for lesing og kopiering for alle brukere av Domeneklienten.
* Forkastet versjon – modellversjon som man har valgt å ikke godkjenne og/eller jobbe videre med. Den vil være tilgjengelig for lesing og kopiering av alle som har skrivetilgang til katalogen/domenet, og ingen andre.

### Åpning og lagring av modellversjoner 

All åpning og lagring av modellversjoner går direkte mot repository, inkl. autolagringen. Foreløpig lagres også modellversjonene lokalt, men disse hentes kun hvis man går via filmenyen i Domeneklienten.  

### Ytelsesforbedring 

Som en konsekvens av at Domeneklienten går mot nytt repository og at domene er blitt splittet opp tar det mindre tid å åpne eller lagre en modellversjon. For de største domenene vil det være en markant endring fra ca. 15 minutter til ca. 1 sekund. 

### Ny løsning for «Glemt passord» 

Når bruker ber om nytt passord via funksjonen «Glemt passord» så sendes det automatisk ut en e-post til brukerens registrere e-postadresse med lenke for å endre passordet. Lenken er gyldig i en time.  

### Endret innlogging 

Miljø er fjernet fra innloggingsvinduet «SERES-autentisering». Hvis brukeren har tilgang til flere miljø, vil det komme opp et eget vindu for å velge blant de miljøene brukeren har tilgang til etter autentiseringen. 

### Mulighet for å endre ORid i egenskapspanel 

Det er åpnet opp for redigering av ORid-er i egenskapspanelet. 

### 32-bit og 64-bit versjon av Domeneklienten

Domeneklienten leveres som 32-bit og 64-bit versjon. De som kjører Domeneklienten lokalt på egen PC må installere den versjonen som passer til sin PC.
