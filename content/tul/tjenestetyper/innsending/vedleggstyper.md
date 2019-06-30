---
title: Vedleggstyper
description: En vedleggstype kan du bruke til å definere et sett med vilkår som må følges for å laste opp filvedlegg.
toc: true
---

Disse vilkårene vil bli brukt av sluttbrukerløsningen for å godkjenne filer som blir lastet opp.
På denne måten kan du definere et sett med regler for filer som skal lastes opp, som kan bli brukt av flere tjenester.

Vedleggstyper blir opprettet og vedlikeholdt av hver enkelt tjenesteeier. Alle vedleggstyper som blir opprettet av tjenesteeier vil være
tilgjengelig for alle innsendingstjenester hos denne tjenesteeieren. Vedleggstyper fra andre tjenesteeiere vil ikke være tilgjengelig. For å
opprette, endre eller se på vedleggstyper går tjenesteeier inn på siden «Definer vedleggstyper». Denne siden finnes det link til på
tjenesteeierarbeidsflaten.

Etter at du har sjekket ut, kan du lage en ny vedleggstype ved å fylle ut feltene i "Legg til vedleggstype"-seksjonen, og trykke "Legg til
vedleggstype"-knappen når du er ferdig. Da vil den nye vedleggstypen bli lagt i listen over vedleggstyper. Den vil derimot ikke bli lagret
før du sjekker inn. Dersom du ikke sjekker inn, vil endringen din ikke bli lagret. Du kan gjøre endringer på flere forskjellige
vedleggstyper før du sjekker inn, og på den måten lagre flere samtidig.

## Definere vedleggstyper

![Figur 134a Definere vedleggstyper-siden](/docs/images/guides/tul/definere-vedleggstyper-1.png?width=700 "Figur 134a Definere vedleggstyper-siden")
![Figur 134b Definere vedleggstyper-siden](/docs/images/guides/tul/definere-vedleggstyper-2.png?width=700 "Figur 134b Definere vedleggstyper-siden")

### Navn 

Navnet du gir vedleggstypen er navnet tjenesteutviklere vil se når de skal velge vedleggstypen for en tjenesteutgave. Dette navnet blir også
brukt av sluttbrukersystemet for å identifisere vedleggstype ved opplasting. Navnet må derfor være unikt innenfor hver tjenesteeier. Små og
store bokstaver vil bli betraktet som like, det vil si at «ABC» vil være identisk med «abc». Du vil ikke få lov til å bruke et navn som
allerede er i bruk. Bare små og store bokstaver mellom a og z er tillatt. I tillegg kan du bruke tall og \_ (understrek). Navnet kan ikke
starte med «xml».

Foretrukket navngiving skal baserest på at flere ledd blir skilt med understrek (\_) som for eksempel «skd\_lonnslipp».

Navnet kan du bare endre på dersom vedleggstypen ikke er i bruk av tjenesteutgaver. Dersom du endrer navn eller sletter en vedleggstype så
vil navnet den hadde kunne brukes av en ny vedleggstype.

### Visningsnavn 

Visningsnavnet er navnet som vil bli vist til sluttbruker når han skal velge hvilken vedleggstype han ønsker å laste opp. Dette er basert på
brukerens språk, og må derfor oversettes.

### Minimum/Maksimum antall filvedlegg 

Minimum/Maksimum antall filvedlegg kan du bruke dersom du vil begrense hvor mange filvedlegg av denne typen som kan bli lastet opp. Verdien
for minimum antall er forhåndsutfylt til 0, noe som betyr at det ikke er noen begrensing. Minimum antall filvedlegg kan du bruke til å kreve
at brukeren må laste opp minst et visst antall filvedlegg. Dersom du ikke ønsker å kreve et minimums- /maksimum antall kan du la feltet stå
blankt.

### Maks filstørrelse 

Maks filstørrelse brukes for å begrense størrelsen på filvedleggene som lastes opp. Filopplastingstjenesten har en begrensing på 200 MB, og
du kan derfor ikke tillate større filer enn det.

Valgene om lagring i tjenesteeierarkivet og sluttbrukerarkivet avgjør om filvedleggene vil bli lagret i de respektive arkivene. Valget du
gjør her vil ikke påvirke lagring av selve tjenesteutgaven, bare filvedleggene. Dersom tjenesteutgaven ikke tillater lagring i arkivene, så
vil heller ikke filvedleggene bli lagret, selv om du har satt dem til "ja" på vedleggstypen.

### Filtyper

Filtyper som kan lastes opp defineres dersom du vil begrense filene som kan bli lastet opp basert på filendelser. Dersom du vil sette
begrensinger fjerner du haken for "Godta alle filtyper" og fyller inn filendelsene for filtypene du vil tillate. Vil du fylle inn mer enn en
filendelse, bruker du komma til å skille mellom dem. Du trenger ikke punktum eller stjerne framfor filendelsene.

Eksempel: "doc, xls, xml"

### Xsd-validering

Valideringsfil i xsd-format vil bli brukt til å validere xml-filer som lastes opp. Last opp valideringsfil ved å klikke på filvalgsknappen
og last opp filen du vil bruke. Dersom du har fjernet "godta alle filtyper", vil du ikke kunne laste opp en slik fil før du har fylt inn
"xml" som en gyldig filtype.

Dersom du har lastet opp en valideringsfil, betyr dette at denne vil bli brukt til å validere alle xml-filer som blir lastet opp. Det er
bare xml-filer som vil bli validert. Andre filtyper kan ikke valideres. Ønsker du å fjerne valideringen, må du fjerne xsd-filen fra
vedleggstypen.

### Generer sjekksum

Generer sjekksum avgjør om det skal genereres sjekksummer for filvedleggene ved opplasting. Dette kan brukes til å forsikre seg om at filen
som er lastet opp har samme innhold som filen sjekksummen er generert fra. Vær oppmerksom på at generering av sjekksum kan være tidkrevende
for store filer.

## Endring av vedleggstype

For å endre en eksisterende vedleggstype må du finne den i lista og trykke på "Endre"-knappen. Dette forutsetter at siden er sjekket ut.
Verdiene til den valgte vedleggstypen vil da bli fylt ut i de samme feltene du bruker til å lage en ny vedleggstype. Du kan så endre
verdiene du vil. Legg merke til at navnet ikke kan endres på dersom vedleggstypen er tatt i bruk av en eller flere utgaver. For å lagre
endringene, må du klikke på "Oppdater"-knappen. Vil du avbryte endringene dine, trykker du på "Forkast endringer".

Dersom vedleggstypen er i bruk vil du få en advarsel om dette. For å finne ut hvilke tjenesteutgaver som bruker vedleggstypen kan du enten
trykke på "Se hvilke tjenesteutgaver" bak advarselen, eller trykke på linken i "Brukt av"-kolonnen i listen. Endringene du gjør vil bli del
av framtidige migreringer for alle tjenesteutgaver som bruker vedleggstypen. Tjenesteutgaver som allerede har blitt migrert med gamle
innstillinger vil fortsette å bruke disse inntile utgaven eventuelt blir migrert på nytt. Utviklerene av tjenesteutgavene vil ikke få noen
advarsel om at vedleggstypen har blitt endret. Det er derfor tjenesteeier sitt ansvar å vurdere om endringene er noe tjenesteutviklerene bør
gjøres oppmerksomme på.
