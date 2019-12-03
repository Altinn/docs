---
title: 15.2
description: Ny formidlingstjeneste, forenklet registrering av kontaktinformasjon, forbedret parallell signering, delegering via REST API, +++
type: releasenote
releasenote_info: Release 15.2, produksjonssatt 11. juni, 2015.
weight: 200
---

Denne versjonen inneholder flere store endringer, blant annet en [ny tjenestetype](#ny-tjenestetype-for-transport-av-data-16230),
og store forandringer i [registrering av kontaktinformasjon](#forenklet-forbedret-registrering-av-kontaktinformasjon-17415).

Endringene for kontaktinformasjon gjøres for å sikre at Altinn skal være godt egnet for tjenesteeiere som benytter tjenester
til virksomheter som krever varsling. Her gjøres det endringer både på brukersiden med et forenklet, moderne design,
og mot tjenesteeierne for å sikre kontroll på at varsel sendes ut til de riktige varslingsadressene.


## Tjenester

### Ny tjenestetype for transport av data (16230)
Vi gjør det mulig å lage [tjenester for utveksling av store datafiler](/docs/guides/tul/tjenestetyper/formidling/) mellom ulike aktører. En avsender
vil laste opp data til Altinn, som vil sørge for at dataene blir tilgjengelig for nedlasting for de angitte
mottakerne. Det skal være mulig å bruke de nye tjenestene både via webservice og SFTP.

### Parallell signering – bedret informasjon ved signering av flere (17528)
Justering av hvilken informasjon som vises i situasjoner der man selv har signert, mens man venter på
at andre skal signere.

### Styring av parallell signering (18230)
Forbedring av funksjonaliteten for parallell signering, slik at det blir mulig å styre hva de ulike
signererne skal signere. Dette er nødvendig for den planlagte tjenesten for elektronisk stiftelse av
aksjeselskap.

### Instansiering av innsendingstjenester fra dialogsider i samhandlingstjeneste (16151)
Det innføres mulighet for eier av samhandlingstjenester å definere at tjenester som startes mens
man er inne i samhandlingstjenesten må sendes inn av aktøren som har samhandlingstjenesten.

### Feilretting: Regelmotor og SERES ved like felter (18075)
Feilretting for å få regelmotoren til å håndtere at felter som er definert i SERES kan ha samme navn.

### Feilretting: Problem med caching i regelmotor (18442)
Regelmotor får støtte for at ulike tjenester/tjenesteutgaver skal kunne bruke ulike versjoner av
samme skjema. Dette ble tidligere ikke unikt identifisert ved lasting fra cache.


## Tilgangsstyring og kontaktinformasjon

### Forenklet/forbedret registrering av kontaktinformasjon (17415)
Dagens "Min profil" erstattes med en ny side for registrering av kontaktinformasjon. Denne siden vil
ha et mer moderne, responsivt design (som tilpasser seg ulike skjermstørrelser). I tillegg vil det
innføres mulighet for personlige varsel for en virksomhet (for tjenester man har tilgang til). Det
legges også opp til større grad av validering av kontaktinformasjonen som legges inn.  
**Oppdatert 19.05.15**: Denne endringen leveres med nytt design og funksjonalitet for personlige varsel
i versjon 15.2. Det gjøres også relevante endringer i grensesnittet mot tjenesteeierne for å sikre
oversikt over hvem som har fått varsel både for meldingstjenester og ved frittstående varsel.

### Forenklet/forbedret tilgangsstyringsfunksjonalitet (17593)
Dagens "Tilgangsstyring" integreres med ny side for registrering av kontaktinformasjon. Denne siden
vil gjøre det mer intuitivt å finne ut av hvem som har tilgang til hva for en virksomhet, og å delegere
disse tilgangene videre. Den vil også ha et mer moderne, responsivt design (som tilpasser seg ulike
skjermstørrelser).  
**Oppdatert 19.05.15**: Endringer på tilgangsstyringsområdet vil ikke bli produksjonssatt i versjon 15.2.
Det leveres kun et konsept på hvordan dette kan løses.


## Varsler (sms/e-post)

### Prioritet på varsler (sms/e-post) (17330)
Forbedring av funksjonaliteten for å prioritere varsler (sms/e-post) ved utsending av store mengder
varsler, slik at ikke en masseutsending av (mindre tidskritiske) varslinger fører til at mer akutte varsel
blir liggende lenge i kø i påvente av at massevarslene sendes ut.

### Utvidelse av standardmakroer for varsling (18101)
Vi utvider hvilke mulige identifikatorer som kan være del av et varsel, slik at man kan sende ut varsel
der det er tydelig hvem varselet gjelder uten at man sender ut for mye identifiserende informasjon i
en uegnet kanal.


## Eksterne grensesnitt

### Delegeringsmulighet i REST-grensesnittet (17668)
Vi innfører mulighet til å bruke REST-grensesnittet til å hente ut og administrere tilganger/rettigheter
i Altinn. Dette gjøres ved først å forbedre autorisasjonskomponenten med mer robuste og
gjenbrukbare tjenester, og deretter å implementere dette i REST-grensesnittet. Endringen gjør det
mulig for utviklere å inkludere rettighetsstyring i eksterne portaler og applikasjoner.


## Integrasjonsplattform og grensesnitt

### Forbedret håndtering av items som feiler i batchinnlesing (17621)
Vi innfører mellomlagring, logging til database og automatisk retry-funksjonalitet i batcher som leses
inn i Altinn. Dette vil både redusere behovet for manuell oppfølging, og gi bedre oversikt og kontroll
over de feilene som krever manuell oppfølging.

### Innfasing av ny CreateShipment-funksjonalitet for immediate-overføringer (17622)
I versjon 14.3 tok vi i bruk ny logikk for pakking av forsendelser for batch-overføringer. Nå skal den
samme logikken også brukes for grensensitt med umiddelbare overføringer (immediate). Dette vil
forbedre ytelse og kapasitet i løsningen, og gi mer konsistent kode av høyere kvalitet.

### Oppsplitting av PrepareShipmentPart-orkestrering basert på outbound ShipmentType (17626)
Forbedring av orkestrering av forsendelser, slik at ulike typer forsendelser kan behandles ulikt. Dette
gjør det mulig å styre ressursbruken for ulike typer forsendelser. I tillegg er det en forenkling av
løsningen som gjør den enklere å vedlikeholde.

### Store meldinger og ESB Excetion database (17659)
Retting av et problem ved feilhåndteringen i PrepareShipmentPart-orkestreringen. Store meldinger
vil ikke lenger legges ved til ESB faults.

### Feilretting: Kolonnenavn i BAM observasjonsmodellen stemmer ikke overens med faktisk verdi (17757)
Feilretting for å sørge for bedre datakvalitet fra BAM. Det vil nå være samsvar mellom data i løsning
og det som vises i view.

### Custom Pipeline for Inbound Receive Porter (17619)
Forbedring av håndtering av inkommende batch-filer for å redusere belastningen på BizTalkmeldingsboksen.
Innkommende batch vil nå håndteres mer likt som utgående ved at selve filen
skrives til disk, mens det kun er en melding med referanse til filplassering som legges i BizTalkmeldingsboksen.

### Ny makro for metadata-informasjon i generic batch (18099)
Mulighet for å inkludere informasjon om hvilke sluttbrukersystem som var brukt i de enkelte
innsendingene i xml-filene som mottas i batch.


## Teknisk arkitektur

### Oppgradering av PDF-bibliotek (18216)
Mindre teknisk oppgradering i forbindelse med PDF-print.


## Tjenesteutviklingsløsning

### Forbedringer av tjenesteutviklingsløsningen (17778)
Rammeendring for forbedringer. Detaljer om endringene som gjøres vil tilgjengeliggjøres når
omfanget er avklart.  
**Oppdatert 19.05.15**: Det leveres et nytt, forenklet design for utgaveparameter-siden, preutfylling av
bostedsadresse blir mulig (tidligere kun postadresse) og det innføres en automatisk sjekk av om
tjenesteeierrolle er satt før migrering av tjeneste (for tilgang til tjenesteeiers arkiv). I tillegg utføres
det noe bugfixing, og det gjøres endringer for å forenkle synkronisering mellom TUL- og TUT-miljøer.
