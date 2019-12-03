---
title: Master
description: Mastertjenester er innsendingstjenester som utvikles med tanke på å at de skal bli delt av flere tjenesteeiere.
---

Selve tjenesten skal da utvikles av en tjenesteeier, mens en eller flere andre tjenesteeiere tar den i bruk.
Dette vil da egne seg best for tjenester der flere tjenesteeiere
skal utføre det samme. Alle som tar i bruk en slik mastertjeneste vil få sin egen eksterne tjenestekode og utgavekode, men nesten alle
innstillinger vil være identiske med det som er definert i mastertjenesteutgaven. Bare oversendingsmetode og gyldighetsperiode vil være
mulig å endre på.

Bare innsendingstjenester kan bli brukt som mastertjenester.

Når du utvikler en utgave som skal bli master, må du gjøre den helt ferdig før du merker den som master. Valget vil av den grunn være
deaktivert når du oppretter ny utgave. Med en gang du gjør den om til master vil den bli tilgjengelig for gjenbruk. De som skal ta i bruk en
mastertjeneste vil forvente at den da fungerer helt fra starten av.

Navnet du gir mastertjenesten og utgaven vil også være det navnet som alle utgaver basert på denne vil få. Derfor bør du tenke på at dette
navnet skal brukes av flere tjenesteeiere før du bestemmer navn på tjeneste og utgave.

En utgave basert på master har i utgangspunktet bare sin egen tjenestekode, utgavekode, oversendingsmetode og gyldighetsperiode. Alle andre
innstillinger henter den ved migrering fra mastertjenesten. Dette betyr at det er først ved migrering at en slik utgave blir «definert». Som
en følge av dette er det også på migreringstidspunktet at utgaven vil synkronisere seg med masterutgaven. Det vil med andre ord være
innstillingene i masterutgaven på migreringstidspunktet som vil avgjøre hvordan hver enkelt utgave blir i SBL. Dersom det blir gjort
oppdateringer på masterutgaven etter at en utgave som bruker den er migrert, så vil ikke disse endringene bli brukt av utgaven før den
eventuelt har blitt migrert på nytt. For å få en oppdatering inn i alle utgaver, må altså alle tjenesteeierne som bruker mastertjenesten
migrere på nytt.

Skjemasett kan bare bli brukt i mastertjenester dersom alle underskjemautgavene også er mastertjenester. En utgave merket som «kun
underskjema» vil ikke kunne bli brukt som mastertjeneste direkte, og vil derfor ikke dukke opp i oversikten over mastertjenester. Den kan
likevel bli brukt ved at den er del av skjemasettet til en hovedutgave som er master. Dersom du lager en utgave basert på en master med
skjemasett, vil også underskjemautgavene bli opprettet i din tjenesteeier.

For å fjerne markeringen av en utgave som master, eller for å slette en masterutgave, så må først alle utgaver basert på denne slettes
permanent. Dette er fordi alle disse utgavene er avhengige av at mastertjenesteutgaven eksisterer som mastertjeneste.

![Figur 97 - Sette utgave som mastertjeneste](/docs/images/guides/tul/sette-utgave-som-mastertjeneste.png "Figur 97 - Sette utgave som mastertjeneste")


Vedleggstyper kan brukes i mastertjenester, men du bør da bruke vedleggstyper med navn som ikke risikerer navnekonflikt. Det kan bli problem
om mastertjenesten bruker en vedleggstype som har samme navn som en vedleggstype i en annen tjenesteeier som bruker den. Skulle det skje så
risikerer du at det ikke er vedleggstypen hos mastertjenestens tjenesteeierens som blir brukt. Ved bruk via sluttbrukersystem vil det da
være vedleggstypen med samme navn hos den tjenesteeier mastertjenesten er i bruk som kommer til å brukes.

For å hindre et slikt problem bør du lage/bruke vedleggstyper med navn som er såpass spesifikke at en slik navnekonflikt er usannsynlig.

## Opprette tjeneste basert på en mastertjeneste

For å ta i bruk en mastertjeneste som en annen tjenesteeier har laget starter du ved å klikke på lenken «Ny basert på mastertjeneste» på
tjenesteeierarbeidsflaten.

![Figur 98 - Ny basert på mastertjeneste](/docs/images/guides/tul/ny-basert-på-master.png "Figur 98 - Ny basert på mastertjeneste")

Dette vil ta deg til en ny side som gir deg en oversikt over de mastertjenestene som er tilgjengelige. Du velger så den mastertjenesten du
skal bruke og klikker på «Opprett tjeneste basert på master» bak denne.

![Figur 99 - Oversikt mastertjenester](/docs/images/guides/tul/oversikt-mastertjenester.png?width=700 "Figur 99 - Oversikt mastertjenester")

Dette vil opprette både en ny tjeneste og en ny utgave i din tjenesteeier. Dersom din tjenesteeier allerede har en annen utgave fra samme
mastertjeneste vil den nye utgaven bli lagt inn i samme tjeneste som denne. Når utgaven har blitt opprettet vil du havne på arbeidsflaten
for den nye utgaven.

![Figur 100 - Arbeidsflate for utgave basert på mastertjeneste](/docs/images/guides/tul/arbeidsflate-basert-på-master.png?width=700 "Figur 100 - Arbeidsflate for utgave basert på mastertjeneste")

En utgave som er basert på mastertjeneste vil ha en veldig enkel utgavearbeidsflate. For å kunne se hva som er definert for utgaven, må du
se på selve mastertjenesteutgaven. Du vil finne lenke til den på utgavearbeidsflaten.

Når du tar i bruk en utgave basert på mastertjeneste, så vil din utgave være nesten identisk med mastertjenesteutgaven. Forskjellene vil
være i hvilken tjenesteeier den tilhører og eksterne koder for tjeneste og utgave. Når utgaven er opprettet skal den være ferdig utviklet,
og kan migreres med en gang.

![Figur 101 - Utgaveparameterside for utgaver basert på mastertjenester](/docs/images/guides/tul/utgaveparams-basert-på-master.png?width=700 "Figur 101 - Utgaveparameterside for utgaver basert på mastertjenester")

Gyldighetsperiode og overføringsmetode kan du endre, men det er ikke nødvendig å gjøre det. Overføringsmetode er som standard satt til
metoden «Hent ved hjelp av webservice» («Download queue») for alle tjenesteutgaver som er basert på mastertjeneste. Dersom du ønsker en
annen overføringsmetode må du endre dette på utgaveparametersiden.

En slik utgave vil få samme tjenestenavn og utgavenavn som mastertjenesten. Disse navnene kan ikke endres. Det er bare lov å ha en utgave
per mastertjeneste i en tjenesteeier. Du kan heller ikke ha en utgave basert på en mastertjeneste i samme tjenesteeier som mastertjenesten
befinner seg.

En utgave basert på master har i utgangspunktet bare sin egen tjenestekode, utgavekode, oversendingsmetode og gyldighetsperiode. Alle andre
innstillinger henter den ved migrering fra mastertjenesten. Dette betyr at det er først ved migrering at en slik utgave blir «definert». Som
en følge av dette er det også på migreringstidspunktet at utgaven vil synkronisere seg med masterutgaven. Det vil med andre ord være
innstillingene i masterutgaven på migreringstidspunktet for hver enkelt utgave som vil avgjøre hvordan utgaven blir i SBL. Dersom det blir
gjort oppdateringer på masterutgaven etter at en utgave som bruker den er migrert, så vil ikke disse endringene bli brukt av utgaven som
bruker den før den eventuelt har blitt migrert på nytt.

Ikonet foran lenken til mastertjenesten vil fortelle deg om mastertjenesteutgaven har blitt endret etter sist gang utgaven ble migrert.