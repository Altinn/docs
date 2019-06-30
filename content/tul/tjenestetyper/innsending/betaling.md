---
title: Betaling
description: Altinn kan tilby tjenesteeiere å gjennomføre betaling på innsendingstjenester.
toc: true
---

For å kunne ta i bruk dette må tjenesteeieren inngå en avtale
med en eller flere av de betalingsleverandørene som Altinn har støtte for. Altinn har nå støtte for Dibs, Nets og Payex. Når en avtale er på
plass må tjenesteeier legge inn nødvendig informasjon om avtalen i TUL. Det er nødvendig å ha spesielle rettigheter som
betalingsadministrator for å kunne legge inn dette.

## Legge inn ny betalingsleverandøravtale

Dersom du har de [nødvendige rettigheter](../../../diverse/administrators-oppgaver/#adgang-til-betalingsleverandøravtalesiden) vil du få opp en lenke til
betalings­leverandør­avtale­siden på tjenesteeierarbeidsflaten under «Felles ressurser for tjenesteeier». Lenken vil ikke være synlig for
brukere uten adgang.

![Lenke til betalingsleverandøravtaler](/docs/images/guides/tul/link-til-betalingsleverandøravtaler.png?width=300 "Lenke til betalingsleverandøravtaler")

Betalingsleverandøravtalesiden blir brukt til å administrere betaling for tjenesteeieren. Her skal administratorene av betaling hos
tjenesteeier legge inn de avtalene som de vil gjøre tilgjengelig for bruk av utgavene. Det er først etter at minst en avtale har blitt lagt
inn her at betalingsfunksjonaliteten vil bli tilgjengelig for utgavene hos tjenesteeieren.

![Betalingsleverandøravtaler](/docs/images/guides/tul/betalingsleverandøravtaler.png?width=700 "Betalingsleverandøravtaler")

Siden er delt inn i to seksjoner. Den øverste seksjonen blir brukt til å legge inn eller vise detaljer om en bestemt avtale. Den nederste
seksjonen gir en oversikt over alle avtalene som har blitt lagt inn hos tjenesteeieren.

For hver enkelt avtale må betalingsadministrator legge inn de opplysningene som er nødvendig for at Altinn skal kunne bruke avtalen. Du må
først velge hvilken betalings­leverandør avtalen gjelder. Valgene du får her er de leverandørene som Altinn kan bruke.

Merchant id er en unik id som du får hos betalingsleverandør når du inngår avtale. Denne brukes til å identifisere deg (den spesifikke
avtalen) overfør betalingsleverandør. En tjenesteeier kan potensielt ha flere avtaler med den samme leverandøren, og merchant id vil da også
identifisere hvilken avtale som brukes. Hos Nets og Payex vil du få to ulike merchant id-er. En er for bruk i produksjon, den andre er for
testing. Du må fylle ut begge, og Altinn vil bruke id-en for test i testmiljøer og id-en for produksjon i produksjonsmiljøer. Dibs har ikke
testmiljø, og har derfor bare en merchant id.

Du kan bare legge inn en enkelt avtale en gang. Identifikasjonen av en avtale i TUL er kombinasjonen av betalingsleverandør og merchant id
for produksjonsmiljø. Denne kombinasjonen må være unik for hver enkelt avtale.

Secret key er en hemmelig nøkkel som brukes til å verifisere at betalingsanmodningen faktisk kommer fra rett avsender. Denne er knyttet til
merchant id, og du får denne hos betalings­leverandør. De ulike leverandørene har ulikt navn for dette. Den kan være kalt ting som «MAC»,
«secret key» og «token». Til liks med merchant id må du legge inn for både produksjon og test. Dibs har ikke test og produksjonsnøkler, men
har i stedet to ulike nøkler som begge må legges inn. Verdien du legger inn her er sensitiv informasjon, og vil derfor bli kryptert når du
legger til avtalen. Det betyr at selve verdien ikke vil bli vist når du ser på avtalen senere. Du vil bare se noen tegn som viser at det
finst en verdi, men ikke hva verdien er.

Merchant id og secret key kan du ikke endre på etter at utgaver har tatt i bruk avtalen. Pass derfor på at de er korrekte, ellers vil ikke
betaling fungere med avtalen. Både produksjons- og test-variantene bør legges inn med en gang. Det vil være komplisert å legge inn
pro­duk­sjons­detaljer i etterkant på en avtale som har blitt tatt i bruk i testmiljøer. I et slikt tilfelle må du først fjerne
betalingsleverandøravtalen fra alle utgaver som bruker den. Deretter gjøre endringene. Legge inn avtalen på nytt på alle utgavene og til
slutt migrere alle utgavene på nytt.

Betalingsmetoder (som Visa, MasterCard osv.) er noe som kan administreres på avtalen hos betalingsleverandøren. Dersom du ønsker at ulike
utgaver skal kunne tilby ulike betalings­metoder på samme avtale, må du krysse av for «vil du begrense hvilke betalingsmetoder som skal være
lov å bruke». Det samme må du gjøre dersom du bare vil tillate et utvalg av metodene som er tilgjengelig på avtalen.

Når det er valgt å begrense metoder så vil du få opp en av­kryssings­boks for alle de betalingsmetodene som har blitt lagt inn som
tilgjengelige i TUL (se 23.6.2 Betalingsmetoder). Du må velge minst en av disse for at avtalen skal være gyldig. Listen kan inneholde
metoder som den avtalen du legger inn ikke har tilgjengelig. Du må derfor passe på at du bare velger betalingsmetoder som avtalen faktisk
kan tilby. Bare de betalings­metodene du velger her vil kunne bli brukt som betaling på denne avtalen via Altinn.

Lar du være å krysse av her vil alle betalingsmetoder som avtalen godtar kunne brukes. Altinn vil ikke sette noen begrensing på metoder.
Dette betyr at betalingsmetoder helt og holdent blir styrt i adminkonsollet hos betalingsleverandøren. Da vil alle metoder som til enhver
tid er aktive der kunne brukes, også nye som skulle bli lagt til etter at avtalen er lagt inn i TUL og utgaver migrert.

Når du har fylt inn alle opplysningene klikker du «Legg til avtale» for å legge den inn i listen over avtaler. Endringen vil ikke bli lagret
før du sjekker inn siden. Det betyr at du kan legge til flere avtaler eller endre på flere avtaler før du lagrer.

## Administrering av avtaler

Etter at en avtale er tatt i bruk av en eller flere utgaver får du ikke lov å gjøre endringer på annet enn betalingsmetoder. Du kan heller
ikke slette en avtale som er i bruk. Du vil i oversikts­listen se hvor mange utgaver som bruker avtalen. Ved å klikke på den infor­ma­sjonen
vil du få opp en liste over disse utgavene.

Dersom du har behov for å endre på en avtale som er i bruk, så må du først fjerne avtalen fra alle utgavene. Merchant id og secret key er
informasjon som er kritisk for at betalings­løsningen skal fungere. Dersom dette skulle være feil er det derfor viktig at alle utgavene som
har tatt avtalen i bruk blir gjennomgått.

Avtaler kan bare slettes dersom de ikke er i bruk av utgaver. Ønsker du å slette en utgave som er i bruk, må du først sjekke om utgavene
trenger avtalen. Dersom avtalen ikke er nødvendig for alle utgavene, så kan du fjerne den fra utgavene og deretter slette avtalen.
