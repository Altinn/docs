---
title: "18.11"
description: Forbedringer, fjerning av ALLEA, ytelse, feilrettinger m.m.
weight: 20
type: releasenote
releasenote_info: Release 18.11, produksjonssatt 12. november 2018.
---

## Endringer i portal

### Ytelse i meldingsboks - kostbar logikk per element

Profilering fra produksjon samt code-review har avdekket at det gjøres mange tjenestekall for hvert element i meldingsboksen.
Dette er svært uheldig i forhold til ytelse. Alle relevante data om et element bør hentes ut av tjenesten som returnerer meldingslista.
Det er kun visuell logikk som ikke trenger tjenestedata som bør gjøres i meldingsboksen. Konkret er følgende utbedret:

- CanArchiveCorrespondence: Forbedret nøkkelhåndtering
- MessageSender: Logikk for å hente SBS navn caches
- CanDelete: Eksisterende tjenestekall erstattes av informasjon som allerede finnes

### Flaskehals i navigasjonsmeny

Profilering i produksjonsmiljøet viser en flaskehals i FillInForm-siden når man lager navigasjonsmenyen.
Det blir gjort en "data bind" for hvert sporvalg i menyen. Man trenger bare å gjøre data bind for det første sporvalget.

### Feil i profil for administrering av varslingsadressene til en virksomhet

#### Sletting av en varslingsadresse kunne vise feil rad som slettet rett etter lagring

Feilen kunne gjennskapes ved å ha minst 2 varsladresser av samme type. For eksempel to epostadresser.
Når bruker valgte å slette den øverste varseladressen for så å lagre endringen ville panelet igjen vise den slettete adressen.
Adressen man ønsket å beholde var derimot borte. Hvis siden ble relastet så var det den riktige varslingsadressen som ble vist.

#### En slettet varslingsadresse ville dukke opp igjen hvis bruker trykket legg til ny varslingsadresse rett etter lagring

Feilen kunne gjennskapes ved å ha minst 2 varsladresser av samme type. For eksempel to epostadresser.
Bruker måtte så slette den nederste adressen å trykke lagre.
Hvis bruker så valgte å legge til ny epostadresse ville den tidligere slettete varslingsadressen dukke opp igjen i det nye feltet.
Denne feilen hadde nøyaktig de samme problemstillingene som den forrige og den ble også løst på nøyaktig samme måte.

### Forretningslogikk i views benyttet av meldingsboks og aktørvalg

Hjelpemetoder som benytter tjenestekall mot forretningslaget i views benyttet i meldingsboks
og aktørvalg er ryddet opp i slik at arkitekturretningslinjene til Altinn overholdes.

## Endringer i integrasjon

### Utbedringer i integrasjon mot KoFuVi sitt synkroniseringsgrensesnitt

KoFuVi har gjort endringer som har påvirket hvilke elementer som må være med i en *fragment* forespørsel.
Hvor de tidligere skulle ha en *KoFuViID* skal det nå være noe de kaller *Elastic search scroll id*.
Dessverre hadde Altinn hardkodet inn generering av forespørselen til å inkludere *KoFuViID* for siste element på forrige side istedenfor å benytte *next page* url.
Denne endringen har korrigert dette slik at Altinn nå benytter angitt *next page* url istedenfor å generere dette selv. 

Det er også innført konfigurasjon av antall elementer per side når Altinn spørr KoFuVi om en *Fragment*.
Verdien er i utganspunktet satt til 10000 som er maks for det KoFuVi vil levere, men det kan justeres helt ned til 2.
Dette kan være spesielt nyttig ved testing av *paging*.

### Mulighet for tjenesteeier å stå som avsender av SMS standalone varslinger

Som tjenesteeier ønsker jeg å kunne endre avsender på sms standalone notification fra Altinn slik at det ser ut som SMS er sendt fra tjenesteeier og ikke Altinn.  
Driftsleverandør har fått støtte for å kunne motta hvem som skal stå som avsender for SMS varslinger. 

SOAP-grensesnitt for SendStandaloneNotification har nå fått nytt valgfritt input parameter: UseServiceOwnerShortNameAsSenderOfSms.
For at tjenesteeier skal kunne stå som avsender må det registreres ShortName i tjenesteeier-tabellen i databasen.
Ved deploy av 18.11 vil det bli satt ShortName for tjenesteeierene: NAV og ACN.
Om/når andre tjenesteeiere ønsker å ta i bruk funksjonen må det innhentes ønsket ShortName for disse og oppdatere tjenesteeier tabellen.

Det er også innført konfigurasjonverdi i Altinn: Notify_DefaultSmsOriginator, som spesifierer default avsender (Altinn).  
Denne benyttes når:

- tjenesteeier ikke ønsker å stå som avsender
- UseServiceOwnerShortNameAsSenderOfSms flagget ikke er spesifisert
- eller når det ikke er registrert ShortName for tjenesteeier

## Endringer i autorisasjon

###  Fjerning av basisrolle 

Som en rettighetsdelegerer ønsker jeg at det ikke følger med basisrolle når jeg gjør en delegering,
slik at det er forutsigbart for bruker hvilke tilganger som deles ved en delegering, og at løsningen er i tråd med personopplysningsloven.

Denne brukerhistorien handler om å fjerne automatikken som fører til at alle får ALLEA/Basisrolle i tillegg til den rollen som egentig er ment delegert.
Alle steder hvor ALLEA er brukt er endret slik at Basis rolle ikke hentes opp eller automatisk tildelses.


### Rydde opp i databasen rundt ALLEA

Script utvikles for å lokalisere tjenester der ALLEA er eneste rollen som gir tilgang til opperasjoner og bytte ut rollen på disse opperasjonene
med A0236 for meldingstjenester og UTINN for andre tjenester.

I TUL så oppdateres loggen (ServiceEditionStatus) på alle berørte tjenester som står som uendret til Completed.
For overstyrte rettigheter så benyttes "OverrideRights" som DataArea men for Tjenester og Tjenesteeier så benyttes "All".

I SBL oppdateres det på siste migrerte versjon siden det er denne som benyttes som basis for alle versjoner av utgaven.
I tillegg så slettes alle knyttinger av ALLEA i TUL etter utbyttingen slik at ingen utgaver lenger vil være knyttet til ALLEA rollen.

Script utvikles  for å slette delegeringer av ALLEA i miljøene i Produksjon er det ca 9000 slike delegeringer.
I tilleg så fjernes den som underrolle på alle ER roller ca 40 rolletyper slik at personer med DAGL, LEDE osv. heller ikke får ALLEA lenger.
Dette gjøres både i TUL og i SBL.

### Sanering av autorisasjonsregler

Siden det er endret i tilgangskontrollen til å sjekke tilgang på utgave nivå og ikke på versjons nivå så er det en del regler
som vil fremstå som duplikater siden de gjelder forskjellig versjon men samme utgave. Dette brutt ned i 4 scripts.

1. Authorisasjonsregler for ER og ALtinn roller disse er alltid knyttet til nyeste versjon på en utgave så alle andre regler er overflødige 
2. Lokale roller har et innslag for hver versjon på samme utgave og det er bare en av disse som er nødvendig valgt å beholde den med lavest id
3. Direkte delegete rettigheter fikk lagt inn nye versjoner hver gang en ny versjon ble migrert den nye versjonen fikk ikke delegeringsinformasjon og derfor er det reglene uten denne infoen som må slettes først
4. Ved delegering ble det tidligere delegert på alle tidligere versjoner som allerede eksisterte slik at her er det bare en som må beholdes men alle er knyttet til hvem som delegerte og når så det må slettes fra begge tabellene.


## Endringer i REST API

### Filtype på attachments via REST

Som bruker av REST-API ønsker jeg å se filtype på attachments slik at jeg kan finne det vedlegget jeg ønsker uten å måtte laste ned alle.

Denne brukerhistorien handler om å vise filtype på attachment som er sendt inn sammen med filnavnet.
Det er lagt til et nytt parameter som returneres sammen med attachmentet i JSON-responsen. Den nye verdien har navngivning "fileName".
Den nye responsen er nå basert på at "Name" og "FileName" er satt riktig ved innsendelse av attachment.
"Name" skal bare inneholde navnet på filen, f.eks "Vedlegg1", mens "FileName" skal inneholde filnavn med extension, f.eks "Vedlegg1.pdf".

### Authorize reportee flaskehals

Profilering i produksjon viser at den store flaskehalsen i Altinn API er autorisasjon av reportee. Dette er forbedret ved caching.

## Endringer i ERImport

### Informasjon registrert i enheters hjemland

Som forvalter av Altinn løsningen, ønsker vi at informasjon registrert i enheters hjemland leses inn via ER batch.
UREGN og ULOVN data blir nå lest inn til altinns register.
Altinns Organisasjons-addresse er blitt utvidet med sin egen tabell, denne vil inneholde Organisasjonsaddresse, post-addresse og utenlandsk addresse (UREGN).

## Andre endringer

### Sanering av temp nøkler for lenketjenester

Disse lagres for å kunne knytte en videresendt lenke til en brukers valg i Altinn slik at tjenesteeieren kan be om mer informasjon fra Altinn
men denne har ikke verdi etter at den er brukt og heller ikke etter at det ikke lenger er noen naturlig knytting til en videresending det vil
si at dette er ferskvare og her er det valgt å bare slette alt som er eldre en 30 dager dette er utført med en prosedyre som kan kalles.

Den bør settes opp som en jobb som går kontinuerlig. Men først bør det kjøres kontrollert og slette det som er av etterslep siden 2012.

### Flytting av prosjektfiler i ulike komponenter for å fysisk skille logikk og PnC-prosjektene

Fysisk separere logikk og PnC prosjektene i Authentication komponenten.

Disse sakene gjøres for å få bedre support for NuGet pakker og vil gjøre det enklere for Altinn å lage NuGet pakker av egne komponenter.
Dette vil være nødvendig for de prosjektene som fortsatt krever eldre versjoner av Visual Studio.
For eksempel TUL og BizTalk. Dette er en del av et større arbeid før det er mulig å ta i bruk C# v7 og nyere.

### Parameter som sendes inn som returnUrl faller bort ved bruk av ExternalAuthentication når autentiseringen går via ID-porten

Query parameters til returnUrl faller bort ved bruk av `ExternalAuthentication/Redirect.aspx`.

Dette er en bug som har eksistert i applikasjonen over en lang periode.
Ved en request mot `ExternalAuthentication/Redirect.aspx` ble bare den første parameteren i returnUrl-verdien sendt med videre til den endelige destinasjonen,

### Forbedret caching i arkiv contekst handler

Arkiv kontekst handler har fått en bedre og mer effektiv bruk av caching.

### Flaskehals i prosedyre for henting av roller

Monitorering av databasen i produksjon viser en flaskehals i en prosedyre.
Dette unngås nå ved å fjerne unødvendige joins.

## Feilretting 

### Mottar mange e-poster ved klientdelegering på fil
Som ansatt i regnskapsfirma ønsker jeg ikke å motta tusenvis av eposter når jeg er mottaker av klientdelegering på fil. Feil ble rettet som hasteendring i produksjon torsdag 22. november
