---
title: 18.7
description: Mindre forbedringer, feilrettinger m.m.
weight: 60
type: releasenote
releasenote_info: Release 18.7, produksjonssettes 4. juli 2018.
---

{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [18.6](../18-6) for siste versjon i produksjon.
{{% /notice %}}

***
## Endringer i portal

### Ekspanderende landkode for mobilnummer i Profil - Varslingsadresser for virksomheten
Felt for landkode for mobilnummer ekspanderer nå opptil 3 sifre med "+" foran. Det har tidligere vært mulig å legge inn 3 sifre, men teksten har havnet utenfor feltet.

### Klientdelegering på fil - delegering til brukernavn gir feilmelding "Feil: E-postadresse"
Det har tidligere vært uklart hvordan delegering på fil virker ved delegering til brukernavn. Det har vært støtte for dette, der man har krevet at man ved brukernavn ikke skal oppgi etternavn/orgnr, og dette førte til at man hadde en mindre kolonne for den relevante raden.
Om man ikke var klar over dette kunne man fort mistolke feilmeldingen man fikk, der etternavn ble tolket som rolle, og rolle ble tolket som epost. 
Dette er nå rettet opp i, ved at man kan spesifisere en tom kolonne etter brukernavnet, slik at kolonne-strukturen blir den samme for alle typer rader. Beskrivelse om hvordan man bruker formatet i oppplastings-dialogen er oppdatert for å reflektere dette.

### Som sluttbruker med klientadministrasjon ønsker jeg å kunne slette roller for flere ansatte uten å måtte lukke siden mellom hver gang
I visse tilfeller har ikke "Ferdig"-knappen blitt synlig ved bruk av av "Fjern alle"-knappen ved gjentatt bruk. Dette skal nå være rettet opp i, slik at "Fjern alle"-knappene skal fungere som forventet.

### Forbedre formatering i kvitteringsepost ved klientdelegering fra fil
Det var formateringsforskjell i mailene vi sender ut for klientdelegering avhengig av hvilken metode vi bruker (enkeldelegerig/Fildelegering).
Formatet på kviteringsepost ved fildelegering er forbedret og tilsvarer nå eposten som som sendt ut når du får tildelt rolle/rettighet gjennom enkeltdelegering.
Det er og lagt til uthenting av språk for hver enkelt bruker slik at alle får eposten på språket de har valgt i portalen.

### Endringer rolledelegeringer etatsportalen
Det er lagt til to endringer på delegeringssidenn og rettet en bug. 

- På siden for å slette delegerte roller så er det lagt til en tekstboks der man kan legge in id til en bruker eller enhet så filtreres listen over roller som kan slettes til kun denne ene avgiveren.
- E-post som sendes fra enten delegering eller fra sletting av delegering bytter ut navnet på den som delegerer med en tekst om at saksbehandler har delegert.
- I tillegg er en bug i e-posten dersom man delegerer til en enhet på tjenesteeier siden så ble både mottaker og avgiver av rollen satt til den privatpersonen som utførte delegeringen. Dette er endret til å sette etaten som avgiver og enheten som mottar som motaker. Det ville ikke gitt mening å skjule hvem som utfører delegeringen for så å oppgi dette navnet på et annet sted i e-posten. 

### Støtte for statistikk på bruk av forenklet utloggingsside
Lagt inn Google Analytics på forenklet utloggingsside slik at det er mulig å uthente statistikk på bruken av denne siden

## Endringer i TUL

### Søkeside for å slå opp hvilke tjenester som bruker et gitt shipment/metode for overføring
Ny side er lagt til i TUL som kan brukes av tjenesteeiere som vil søke etter hvilke utgaver som bruker gitt shipment/metode for overføring. Lenke til siden er lagt til i listen "Felles ressurser for tjenesteeier".

## Endringer i eksterne grensesnitt

### Oppdatering av skjemaer for krypterte tjenester gjennom eksterne grensesnitt
Det har tidligere vært mulig å oppdatere skjemaer som tilhørte krypterte tjenester gjennom REST API. Det er nå lagt til en sjekk ved oppdatering av tjenester gjennom eksterne grensesnitt slik at det ikke er mulig å oppdatere eller legge til skjemaer for krypterte tjenester.

### Støtte for at brukerstøttemedarbeidere ved BR kan hente ut enkeltrettigheter for alle aktører
Det er lagt til støtte for at brukerstøttemedarbeidere ved BR kan hente ut enkeltrettigheter for alle aktører. Det er lagt til en ny konfigurasjonsinstilling, ServiceOwnerCode_For_Full_GetRights_Access, for serviceOwnerCode'en som skal ha denne spesialtilgangen. 
All bruk av GetRights fra REST API'et som tar i bruk denne muligheten blir logget. 

### Returnere messageid i location header etter arkivering av meldinger i REST
Når man arkiverer en melding gjennom REST-api'et (`/api/Help/Api/PUT-who-Messages-messageId-Archive_language`) vil man nå få returnert den nye arkiv-addressen til meldingen gjennom en Location-header. 

Se [integrasjonsguiden](/docs/guides/integrasjon/sluttbrukere/api/meldinger/arkivere/) for mer informasjon.

<!---### Automatisk oppdatering av CORS Whitelisten
Det er lagt til automatisk oppdatering ac CORS whitelisten. Før ble dette kun gjort ved en application pool recycle. Det blir nå leset dynamisk fra databasen og cachet i 3600 sekunder. 
Det vil si at det tar opp til en 1 time fra en ny ApiKey er lagt til med ny Cors-origin til riktige Cors-headers vil bli satt på responser til REST APIet.
--->
### Fjerning av varselmottakere hvis det ikke finnes tekster for angitt transport type.
Altinn vil nå fjerne mottakere av et varsel hvis angitt varsel type (NotificationType) ikke har tekster for varsel typen (TransportType). Dette gjelder alle steder hvor det kan lages varsel: InsertCorrespondence, SubmitAndInstantiatePrefilledFormTask og SendStandaloneNotification. Hvis resultatet av filtreringen er at ingen vil få varsel, så vil grensesnittet informere om dette.

### Visning av arkiv-referanse for meldinger i REST API
Det er lagt til et nytt felt i `Message`-modellen i REST APIet, kalt `ArchiveReference`. Dette feltet vil inneholde en eventuelt referanse til en tidligere melding om det har blitt oppgitt av tjenesteeier. Det er og lagt til en HAL-lenke som peker videre til denne meldingen (rel "archivereference").

### Gi under selskap samme rettigheter som moderselskap ved innsendig 
Som sytem ønsker jeg at systemUserName registrert på juridisk enhet også skal fungere for innsending på bedriftsnummer. For å få til dette er det lagt inn sjekker i DecisionPoint på om det er et underselskap som valideres. Hvis det er det, gis det samme rettigheter som moderselskapet, juridisk enhet. 

### Lokal rolle opprettet på juridisk enhet skal også gjelde på underenheter
Som sluttbruker ønsker jeg at når jeg oppretter lokal rolle på juridisk enhet, så skal rollen også gjelde for tilknyttede underenheter. Endret slik at juridisk enhet brukes som filter når tilgjenngelig roller for en underenhet hentes.

### Ved registrering av varsel til en person, så skal eneste kilde til kontaktinformasjon være kontakt- og reservasjonsregisteret (KRR)
Når tjenesteeier overlater til Altinn å finne epostadressen og mobilnummeret til en person, så har gammel profilinformasjon registrert i Altinn vært en mulig kilde hvis personen ikke har slik informasjon registrert i KRR. Dette er det nå slutt på. Hvis en person ikke har kontaktinformasjon registrert i (KRR) vil Altinn ikke sende varsel til vedkommende. Grensesnittene som gjør det mulig å definere varsel blir ikke endret, men det vil bli en økning i hvor ofte Altinn ikke finner noe kontaktinformasjon på personer. Dette gjelder kun når avgiver er en person.

## Andre endringer

<!---### Resource-tabellen er utvidet med ServiceEditionId og ProcessSequenceNumber
ServiceEditionId og ProcessSequenceNumber blir nå satt i Resource-tabellen ved migrering av nye tjenester. Gamle ressurser må oppdateres med ny data i Athuorization og ServiceEngine. 
--->
### Kontaktinfo fra KRR som er for gammel skal ikke brukes
Om kontaktinformasjon fra KRR ikke har blitt oppdatert eller verifisert på mer enn 18 måneder skal ikke kontaktinformasjonen benyttes (til å sende varsel o.l.). 
Det er lagt til en ny konfigurasjonsinstilling, `KRRContactInfoExpirationMonths`, som bestemmer hvor mange måender det tar før informasjonen ikke brukes lenger.

## Diverse bugfix

### Rette kjent feil hvor lenker til hjelpesider ikke åpner
Kjent feil i legacy-portal. På siden "Oversikt - skjema og vedlegg" skjedde det ingenting når bruker trykket på hjelpelenkene dersom tjenesten støttet flere vedleggstyper. Nå fungerer lenkene også i denne typen tilfeller.

### Rette stack trace på "søk på flere aktører" for konkursbehandling tjeneste
"Søk på flere aktører" og søker etter "konkursbehandling" (i innboks) får treff, men får feilmelding når man aksesserer elementene fra trefflista til søk. Dette er nå rettet.

### Støtte for filopplasting i Safari på Mac
En feil gjorde at brukere av Safari på Mac ikke kunne laste opp filvedlegg i et skjema. Denne feilen er rettet.

***
## Infoportal

### Nytt telefonnummer i hurtighjelp
Lagt til telefonnummer for Bedriftsveiledning i hurtighjelp, slik at denne typen henvendelser rettes til riktig sted.

### Diverse bugfix
Rettet alfabetisk sortering i skjemaoversikten til å håndtere æ/ø/å korrekt.
