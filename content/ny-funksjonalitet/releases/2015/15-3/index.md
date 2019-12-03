---
title: 15.3
description: Støtte for virksomhetssertifikat i REST API, tekniske forbedringer, EIR, innlogging med utenlandsk id (eIDAS), +++
type: releasenote
releasenote_info: Release 15.3, produksjonssatt uke 46, 2015.
weight: 100
---

Omfanget av denne versjonen er litt mindre enn vanlig. Hovedtyngden er forbedringer av grensesnitt og feilrettinger.

## Autentisering

### Støtte for innlogging med utenlandsk identifikasjon (18497)
Altinn får støtte for føderering av brukere på tvers av landegrenser innenfor eIDAS (EU-prosjekt). Kun
brukere med D-nummer vil få tilgang til Altinn.

{{% alert theme="danger" %}}NB! Denne endringen vil ikke være aktiv i produksjonsmiljøet rett etter produksjonssetting, men vil
aktiveres når bakenforliggende systemer er klare for det.{{% /alert %}}


## Brukskvalitet

### Mindre feilrettinger – Min profil (18829)
Flere mindre feilrettinger i den nye versjonen av Min profil lansert i [versjon 15.2](..//15-2/#tilgangsstyring-og-kontaktinformasjon).


## Eksterne grensesnitt

### Støtte for sertifikat-autentisering i REST-grensesnittet (18311)
REST-grensesnittet får støtte for autentisering via virksomhetssertifikat, slik det allerede er støtte for
i webservice og i portal.

### ServiceEditionCode som frivillig parameter i GetShipmentStatus (18677)
Støtte for å bruke GetShipmentStatus uten å definere en bestemt ServiceEditionCode – det vil si få
en oversikt over alle innsendinger for en tjeneste, uavhengig av versjon.

### GetShipmentStatus - mulig å hente ut full shipment status historikk på et element (18727)
Alle statusendringer og tidspunkt logges for å kunne returnere disse på listeformat, istedenfor å bare
ha ett felt som har siste verdi.

### Verifisering av signeringsrettigheter via eksternt grensesnitt (18728)
AuthorizeAccessExternal skal kunne brukes til å verifisere at en bruker har signeringsrettigheter på
en gitt tjeneste.

### Feilretting – GetShipmentStatus (18812)
Retting av feil der GetArchiveShipmentStatus-kallet sammen med sekvensnummer på immediategrensesnitt,
ikke får treff basert på dette.

### Flere mindre endringer på REST-grensesnitt (18767)
Mindre feilrettinger på REST-grensesnittet – blant annet økt app-vennlighet.


## Integrasjonsplattform og grensesnitt

### Automatisering av oppsett av BizTalk (18213)
Oppsett av BizTalk skal kunne gjøres automatisert, slik at blant annet unngår problemer med
etablering/reetablering av integrasjonsløsningene i de ulike miljøene ved deploy.

### Bedre unntakshåndtering og logging i SendShipmentToEndpoint (18486)
Mer intelligent håndtering av feil i SendShipmentToEndpoint – blant annet vurdering av om retry har
noe for seg.

### Utvidelser av støtteverktøyet EIR (18489)
Støtteverktøyet EIR får funksjonalitet for å kjøre forhåndsgodkjente lagrede prosedyrer og SQL-script.


## Driftsrutiner og registerintegrasjon

### Standardisert prosedyre for deaktivering og sanering av grensesnitt (17690)
Det blir mulig for driftsleverandør på bestilling fra tjenesteeier på en forutsigbar og effektiv måte å
kunne deaktivere et grensesnitt midlertidig eller sanere det permanent.

### Feilretting – Enhetsregisterinnlesing for enheter med lange navn
I enkelte tilfeller blir mellomrom fjernet i enhetsnavn som er lengre enn 35 tegn – rettes slik at de
leses inn korrekt.


## Teknisk arkitektur

### Bedre logging og oppgradering av EntLib (18370)
Det gjøres en del forbedringer på logging i løsningen, blant annet for å redusere mengden logginger
uten verdi ("falske positive").

### Partisjonering av databaser (18497)
Data i Altinn fordeles på en mer hensiktsmessig måte for å minske tid og lagringsbehov ved
backup/restore.


## Informasjonsportal

### Feilretting - Søkeindeksering (18777)
Retting av flere små svakheter i søkeløsningen for innhold før innlogging.


## Tjenesteutvikling

### Forbedring av uthenting av familiemedlemmer (18200)
Webservicen for å hente ut familieforhold får forbedringer, slik at alle medlemmer av en familie kan
hente ut familiedata.

### Feilretting – GetPersonRegisterData og adresser (18366)
Denne webservicen gir i dag en blanding av bostedsadresse og postadresse – rettes slik at begge
adresser hentes hver for seg.
