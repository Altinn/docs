---
title: Slette tjeneste og utgave
description: Det er mulig å slette en tjeneste eller en tjenesteutgave fra TUL dersom du skulle ønske det.
toc: true
---

Det kan være fordi tjenesten ikke lenger skal være i bruk og dermed skal slettes både fra TUL og fra sluttbrukerløsningen.
Det kan også skyldes at en tjeneste erstatter en annen eller at det er startet arbeid på en tjeneste eller utgave som ikke er korrekt.

Sletting av tjenester og utgaver i TUL blir gjort i to separate steg. Den første slette­operasjonen kan gjøres av brukeren selv.
Dette er en operasjon som bare vil gjøre at tjenesten eller utgaven ikke lenger vil bli vist, men den
er ikkje fjernet. Dermed er den mulig å gjenopprette. En administrator vil kunne [permanent slette](#permanent-slette-tjenester-og-utgaver) en slik tjeneste eller utgave som har
blitt slettet.

## Gjenopprettbar sletting av tjeneste

Når du har slettet en tjeneste eller tjenesteutgave vil den ikke lenger være synlig i TUL eller SBL. Den vil ikke fjernes fysisk fra TUL
SharePoint, men vil bli merket som slettet. Utgaven da bare kunne sees av en administrator.

### Slette tjeneste

For å slette en tjeneste fra TUL starter du med å slette eventuelle utgaver først. Du får ikke lov å slette en tjeneste som har aktive
utgaver. Deretter går du til tjenesteeiers arbeidsflate og velger alternativet *Slett* i kontekstmenyen til tjenesten du ønsker å slette.

![Figur 112 - Slett tjeneste](/docs/images/guides/tul/slette-tjeneste.png?width=700 "Figur 112 - Slett tjeneste")

Du kommer da til et eget skjermbilde der du kan slette tjenesten.

![Figur 113 - Det er kun mulig å slette tjenester som ikke har noen utgaver](/docs/images/guides/tul/kan-kun-slette-tjenester-uten-utgaver.png?width=700 "Figur 113 - Det er kun mulig å slette tjenester som ikke har noen utgaver")


Når du har bekreftet slettingen vil tjenesten fjernes fra alle steder den tidligere har vært tilgjengelig. Det er verdt å merke seg, at
tjenesten vil være synlig for administratorer, men da ville være markert i rødt. I skjermbildet over er slett-knappen deaktivert pga at
tjenesten har utgaver.

### Hvordan slette utgave

For å slette en tjenesteutgave fra TUL starter du på tjenestens arbeidsflate og velger alternativet *Slett* i kontekstmenyen til utgaven du
ønsker å slette. Du kommer da til et skjermbilde der du kan slette tjenesteutgaven. Sletting er bare mulig dersom ingen deler av utgaven er
sjekket ut for editering.

![Figur 114 - Slett tjenesteutgave](/docs/images/guides/tul/slette-utgave.png?width=700 "Figur 114 - Slett tjenesteutgave")

Når du har bekreftet slettingen vil prosessen videre være avhengig av om utgaven er produksjonssatt eller ikke.

Hvis utgaven er produksjonssatt vil det bli sendt melding til applikasjonsforvalter om at utgaven skal deaktiveres i produksjon. Utgaven
blir liggende i TUL med status *deaktivering bestilt*, inntil bekreftelse kommer fra driftsoperatøren om at deaktivering er utført. Først da
blir utgaven slettet, og det gjøres manuelt av en bruker med administratorrettigheter i TUL. Bare brukere med administratorrettighet får lov
å velge *Slett* på en utgave som har status *deaktivering bestilt* status.

Hvis utgaven ikke er produksjonssatt blir den slettet i TUL SharePoint straks, samtidig som eventuelle versjoner som er migrert til
testmiljø blir deaktivert der.

Det er verdt å merke seg, er at tjenesteutgaven vil kunne vises for administratorer, men da ville være markert i rødt.

### Gjenopprette slettede tjenester og utgaver

Dette er en operasjon som utføres sjelden, og det er derfor ikke et eget brukergrensesnitt for dette i TUL, men en manuell jobb som gjøres i
databasen av driftsleverandør. Det vil avhenge av tjenesteeier sin prosess mot driftsleverandør, men det oppfordres til at gjennopprettelse
av slettede utgaver og tjenester bestilles enkeltvis ved behov.

## Permanent slette tjenester og utgaver

Tjenester og utgaver som har blitt slettet ved hjelp av metoden beskrevet under [gjenopprettbar sletting av tjeneste](#gjenopprettbar-sletting-av-tjeneste) kan bli
permanent slettet fra TUL. Dette må gjøres av en bruker som har administratorrettigheter (såkalt «administrator for områdesamling» / «site
collection administrator» i SharePoint) for den tjenesteeieren tjenesten ligger i. Dersom du kan se slettede tjenester og utgaver (markert
med rød bakgrunn) skal du også kunne permanent slette de.

Tjenester og utgaver som er permanent sletting vil bli helt og holdent fjernet fra databasen og SharePoint, og det vil ikke være mulig å
gjenopprette de. Også alt innhold, som for eksempel skjema og migreringspakker, vil bli slettet. Innholdet kan heller ikke gjenopprettes
etter permanent sletting.

### Permanent slette tjeneste

For å permanent slette en tjeneste må du logge inn med en administratorbruker og gå til tjenesteeierarbeidsflaten. Tjenester markert med rød
bakgrunn er slettet og er dermed mulig å permanent slette. For å permanent slette en tjeneste velger du menyvalget «Slett tjenesten
permanent» som du får opp ved å trykke ved siden av tjenestelenken i kolonnen «Tjenestenavn». Dette menyvalget er bare tilgjengelig for
tjenester som allerede er markert med rødt.

For å kunne slette tjenesten må også alle utgavene være slettet (markert med rødt). Dersom en eller flere utgaver ikke er slettet vil du få
feilmelding når du prøver å slette permanent. Har tjenesten utgaver, og alle disse er slettet, så vil «Slett tjenesten permanent» slette
både tjenesten og alle utgavene permanent. Du vil få opp en bekreftelsesdialog med liste over alle utgaver som vil bli slettet.

![Figur 115 – Menyvalg for å permanent slette tjeneste](/docs/images/guides/tul/slette-tjeneste-permanent.png?width=700 "Figur 115 – Menyvalg for å permanent slette tjeneste")


### Permanent slette utgave

For å permanent slette en utgave må du logge inn med en administratorbruker og gå til tjenestearbeidsflaten. Utgaver markert med rød
bakgrunn er slettet, og kan dermed permanent slettes. Bruk menyvalget «Slett utgaven permanent» for å permanent slette utgaven. Dette valget
får du ved å klikke på aktuell utgave i «Kortnavn»-kolonnen. Merk at menyvalget bare vil være tilgjengelig for utgaver som er markert med
rød bakgrunn. Utgaver som er del av et skjemasett kan ikke slettes.

![Figur 116 – Menyvalg for å permanent slette utgave](/docs/images/guides/tul/slette-utgave-permanent.png?width=700 "Figur 116 – Menyvalg for å permanent slette utgave")
