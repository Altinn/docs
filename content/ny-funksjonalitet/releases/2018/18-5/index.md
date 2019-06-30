---
title: 18.5
description: Forbedringer på varsling og portal samt div bugfiks.
weight: 80
type: releasenote
releasenote_info: Release 18.5, produksjonssatt 14. mai 2018.
---


## Endringer i portal

### Vise oppgitt avsender på skjema i innboks og i arkiv
Som sluttbruker ønsker jeg å se i innboksen hvem som er "oppgitt skjema-avsender" på skjema som har InstantiatedOnBehalfOfPartyId feltet satt. Hvis det er oppgitt en annen skjema-avsender enn tjenesteeier, vil det nå dukke opp navnet på oppgitt avsender under tittelen på skjemaet både i innboks og i arkiv.


### Innføring av "foretrukket kanal" som kanaltype ved opprettelse av varsel
I tjenesteeiergrensesnittene for Prefill, Correspondence og Notification har tjenesteeiere mulighet til å definere kanalen varselene skal sendes på. Valgmulighetene har vært "epost", "sms" eller "begge". Usikkerhet rundt hvorvidt varselmottaker har registrert mobilnummer eller epostadresse har gjort at "begge" har vært det tryggeste valget. Problemene med dette er at mange mottakere da har fått 2 varsel og at det blir sendt unødvendig med SMS.

Løsningen på dette blir det som kalles "foretrukket kanal". Dette defineres som 2 nye kanaler i tillegg til de 3 eksisterende kanalene. De to nye vil bli "foretrukket epost" og "foretrukket SMS". Disse vil indikere for Altinn at løsningen først skal forsøke angitt kanal. Hvis mottaker ikke har registrert noen adresse for foretrukket kanal, så skal løsningen isteden generere varsel på den andre kanalen. For eksempel hvis en person kun har registrert et mobilnummer og foretrukket kanal er epost så vil Altinn da lage varsel på SMS. Implementasjon inkluderer også innlesing av Correspondence via batch grensesnittet.


### Altinn skal kreve varslingsadresser selvom bruker har klikket "Slutt å mase" i vindu for personlig kontaktinformasjon
Slutt å mase er en knapp som er synlig i vinduet som spørr etter personlig kontaktinformasjon. Knappen blir synlig for brukere som har mange avgivere. Når bruker benytter seg av muligheten vil Altinn lagre dato og tidspunkt. Hvis det har gått færre enn 365 dager siden dette ble registrert vil Altinn ikke spørre om personlig kontaktinformasjon. Denne sjekken hindret feilaktig også spørsmål om varslingsadresser for organisasjonen. Dette er nå rettet.

### Fjerne låsing av GUI-elementer som ikke er bekreftet av KoFuVi

Det var tidligere ikke mulig å endre eller slette kontakt-endepunkter som ble lagt til, før batch hadde kjørt og godkjent disse endringene. Det var derfor en 10-min periode etter hver innlegging av data der man ikke kunne endre eller slette kontakt-endepunkter. Denne begrensningen er nå fjernet slik at det alltid er mulig å endre og å slette nylagde kontakt-endepunkter.

### Vise sluttbrukersystemets navn på skjema når det er instansiert fra sluttbrukersystem
For å kunne skille mellom elementer som er instansiert opp av sluttbrukersystem og elementer som er instansiert opp av tjenesteeier, skal navnet på sluttbrukersystemet gå fram av elementlista når det er sluttbrukersystem som har instansiert opp elementet.


### Avgivertypeendring blir kommunisert på riktig måte når man instansierer skjema
Avgivertypen endres ikke når man skifter avgiver (så sjekken på avgivertypen blir feil). Tidligere ble det ikke registrert på riktig måte at avgivertypen ble endret slik at før ble du hindret selv med en lovlig avgiver og fikk da en feilaktig feilmelding. Dette er nå fikset opp i slik at skjema blir instansiert uten at brukeren ser denne feilmeldingen.

### Vise tjenesteeiernavn basert på valgt språk i profil 
Det er gjort endring på visningen av "Rollene dine gir deg tilgang til disse tjenestene" når man viser alternativ for å filtrere på tjenesteeiere. Oppbyggingen av tjenesteeiernavn på filter alternativene tar nå i bruk ressurstekster med en nøkkelverdi. Hvis det er ikke eksisterer en ressurstekst for tjenesteeierkoden blir eksisterende løsning brukt, som benytter seg av beskrivelsesfeltet fra ServiceOwner tabellen i databasen.

### Skjule test-tjenesteeiere
Det finnes et sett med tjenesteeiere som benyttes av systemeier og leverandører til å utføre testing og overvåking av løsningen. Disse tjenesteeierene vil aldri ha reelle tjenester tilgjengelig for sluttbrukere. Disse tjenesteeierene blir med denne endringen skjult for sluttbruker i 2 spesifikke lister. Listene det gjelder brukes i sammenheng med filtrering av tjenester basert på tjenesteeier. De konkrete listene finner man under henholdsvis "Profil --> Skjema og tjenester du har rettighet til --> Disse rollene gir tilgang til disse tjenstene" og "Profil --> Andre med rettigheter til virksomheten --> (velg aktør) --> Disse rollene gir tilgang til disse tjenstene"

### Oppgradering av Bootstrap-rammeverk
Bootstrap-rammeverket som benyttes til å bygge design på sidene i Altinn blir oppgradert til versjon 4.0 stable. I denne sammenheng kan enkelte sider få mindre justeringer i hvordan de ser ut. Endringen gjelder både portal og infoportal.


## Endringer i eksterne grensesnitt
### Tillate utsending av varsel i helger.
Det er gjort endringer i det som kalles sendevindu slik at det blir mulig å sende varsel på lørdager og søndager. I tillegg er det blitt lov å sende varsel på helligdager. Inkludering av helligdager i sendevindu er en innstilling separat fra søndager. Alle regler må være møtt for at det skal sendes varsel. Hvis man endrer sendevindu til å ekskludere fredag vil det ikke sendes varsel på langfredag selvom det er lov å sende varsel på helligdager.

Dette gjelder SMS varsel som lages i sammenheng med nye meldinger, prefill og abonnement, og frittstående varsel.

### Test-prefix i utsendte epost/sms for å indikere at det kommer fra testmiljø
Det er lagt til en prefiks for alle utsendte epost/sms fra test-miljøer. For SMS vil meldingen ha teksten "ENV - " i starten av meldingen og epost vil ha teksten "ENV - " i starten av emne-feltet (der ENV er testmiljø; DEV, AT02, TT02 etc).

### Lagt til en "bryter" slik at vi kan slå av overføringer av oppdateringer mot Kofuvi i testsammenheng
Når kontaktaddresser for organisasjoner oppdateres vil normalt alle oppdateringene bli sendt til Kofuvi. Om bryteren slåes av vil dette ikke skje, og alle oppdateringer er begrenset til lokale database-endringer.

Det er lagt til en config-verdi, Kofuvi_UseLiveClient, som bestemmer om man skal overføre oppdatering til Kofuvi. Denne har per dags dato verdi som er hentet fra Variables (%KOFUVI_USELIVECLIENT%), som er satt til å være slått av for DEV (utviklingsmiljø).

### Lik navnestandard på miljø mellom feature toggles og altinn config.
Det er gjort endringer på navngivning av miljø både i altinn.config og features.json slik at disse følger lik navnestandard; DEV,AT1,AT2,AT3,AT4,YT1,YT2,YT3,TT2,PROD.

Dette vil gjelde for oppsett av nye feature toggles samt tjenesten AuthorizationDecisionPointExternal.AuthorizeAccessExternal.

## Diverse bugfix

### Problemer med samtidige enkeltrettigheter på instansnivå og tjenestenivå
#### Enkeltrettigheter som ikke fungerer (17750)
Utbedret et problem med at ikke alle rettigheter blir delegert på tjenestenivå dersom det eksisterer en aktiv rettighet på instansnivå.

#### Trekking av tjenestenivå rettigheter sletter også rettigheter på instansnivå for samme bruker (19154)
Utbedret et problem med at instans-rettigheter også blir slettet i det man trekker rettighet på tjenestenivå for samme tjeneste.

### Ytelsesforbedringer
Versjonen inneholder forbedringer i ytelsen på innlevering, og en endring som reduserer størrelsen på PDF-er Altinn genererer.

### Øvrige bugfix

#### Ekspandert visning av innboks elementet viser opprettet dato og ikke visningsdato (18997)
Dato for mottatt melding i innboks er forskjellig fra dato i aktivitetsloggen. Aktivitetsloggen bruker visningsdato av elementet og ekspandert visning viser opprettet dato for elementet.

For skjema som er instantiert av tjenesteeiere vises nå visningsdato i ekspandert visning og opprettet dato på aktivitetsloggen. Det er nå fikset slik at aktivitetsloggen viser visningsdato.

#### Fjernet krav om at telefonnummer skal være oppført om man endrer valgbokser under login informasjon (19346)
Et krav om at telefonnummer skulle være oppført når man endret et av login informasjons-valgende "Tillat EUS"/"Tillat level 3"  har blitt introdusert i en tidligere versjon. Denne endringen har blitt reversert.
Det er fjernet krav til å oppgi passord på nytt om man har valgt en av boksene som krever passord fra før.

#### Fjerner ikke endpoints fra førstevarsel dersom det ikke har noen revarsler (notification) (19234)
Notification finner template for sending basert på input parameterene NotificationType, TransportType og LanguageCode. Endepunkter som det ikke fantes template for førte til exception. Det er gjordt retting i denne bug for Correspondence og Prefill, endepunktene fjernet slik at exception unngås. (Feilen er fortsatt gjeldende for StandAlone-vasrling.)

#### Mindre bugfix på redaktørgrensesnittet for infoportal
Kun merkbart for redaktører. Inkluderer forbedret håndtering av svar på "Fant du det du lette etter?" og sperrer for å gjøre endringer som ikke burde være mulige.