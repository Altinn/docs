---
title: 21.2
description: Endringer i skattemeldingen. Forbedringer og feilrettinger
weight: 190
type: releasenote
releasenote_info: Release 21.2, produksjonssatt 15. februar 2021
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Fritekstsøk støtter Altinn App instanser basert på elementtittel

Det innført støtte for å inkludere Altinn App instanser i søkeresultater. Fritekstsøk og filtrering på perioder er støttet.
Denne endringen inkluderer ikke støtte for å søke på Altinn App instanser på tvers av avgivere.

### Kø løsning QueueIT støttes

Kø løsning 2021 Det er lagt inn støtte for integrasjon mot kø-løsningen QueueIT. I første omgang er integrasjonen skrudd av. Når den blir skrudd på vil all trafikk mot ID-Porten rutes til kø løsningen.


## Endringer i Legacy

### Visning av favoritter i aktørliste i Legacy

Bruke favoritter / alfabetisk visning i legacy aktørvalg
Visning av favoritter har frem til nå bare vært altuelt i aktørvalget MVC-delen av altinn.no. Denne endringen viderefører favoritter-konseptet fra det store aktørvalget i MVC og muliggjør fjerning av MostUsedReportee fra Legacy-løsningen til Altinn. Nedtrekkslisten over tilgjengelige avgivere i Legacy er endret til å vise favoritter øverst, og resterende i alfabetisk rekkefølge under en skillestrek.
Fødselsnummer til privatpersoner er maskert for for de som kan representere i aktørene.


### Oppdatert jquery versjon i Legacy portal (unntatt Websa)

Legacy sider bruker eldre versjoner av jQuery-biblioteker. Nå er det endret til siste versjon av jquery som er 3.5.1. Jquery-UI er også oppdatert til nyeste versjon som er 1.12.1. Websa sider og tilhørende master sider skal oppdateres fortløpende.

## Endringer i SBL

### SameSite=None for BigIP-cookies

BigIP-cookies mangler SameSite-attributt, noe som gjør at disse ikke blir sendt med når brukeren blir sendt tilbake fra ID-porten (som skjer via POST). Dette innebærer at pinningen til rett portalserver faller bort, og eventuell sesjonstilstand som ligger på den portalserveren vil da gå tapt. Denne endringen setter SameSite=None på cookies som kommer fra BigIp. Dette retter opp en feil som noen sluttbrukere opplever ved lasting av samtykkesiden etter login.

### Komprimering av response cookies

Komprimering av AltinnContext-cookie over en gitt størrelse
Dette er en endring for å støtte innføringen av RedirectURL i cookie for å sikre at brukere etter login blir redirectet til korrekt side i Altinn. Denne endringen ble forsøkt gjort i 21.1, men måtte reverseres da størrelsen på Response-cookiene ble for stor. Gjennom nå å komprimere disse cookiene før man returnerer vil man kunne gjenninføre denne endringen som holder på RedirectURL på nytt. Det er gjort følgende forbedringer:
- Lagt til komprimering av response cookie dersom verdien av cookien er større enn en config-styrt verdi
- Lagt til summering og kasting av exception dersom summen av alle response-cookiene overstiger en config-styrt verdi

## Endringer i REST

### Oppdatere Knockout til nyere versjon

Hjelpesidene til Rest-API har fått siste versjon av javascript rammeverkene Knockout og Modernizr.

## Endringer i Autorisasjon

### Utvidelse av eksternt Soap grensesnitt for Decision Point
 
Utvidet DecisionPoint for å kunne sjekke både arkiv og serviceengine. Det eksterne Soap grensesnittet for DecisionPoint i Altinn autorisasjon har blitt utvidet med mulighet til å kunne gjøre authorisasjonssjekk på elementnivå også for arkiverte elementer.
XACML request schema for grensesnittet utvidet med nytt ressurs attributt: urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:archivereporteeelementid for å kunne spørre om tilganger på arkiv id nivå.
Det er også gjort utvidelse slik at dersom det spørres på reportee element id (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reporteeelementid) fra aktivt element i meldingsboksen (dette gjelder også CorrespondenceId) men for en av arkiv operasjonene: ArchiveRead eller ArchiveDelete, vil DecisionPoint selv forsøke å slå opp arkiv id dersom elementet har blitt arkivert og internt authorisere på korrekt arkiv id.

### Alfabetisk sortering av avgiverliste ved opprettelse av "be om tilgang" forespørsel

Listen over de du kan be om tilgang til er ikke alfabetisk. Dersom man starter prosessen om å skulle be om tilgang på vegne av deg selv eller en aktør man er tilgangsstyrer for fra Profilsiden får man som første steg opp avgiverliste for aktøren for å velge hvem forespørselen skal sendes til. Dette er nå utbedret så avgiverne er sortert alfabetisk på navnet de vises med i listen.

## Endringer i skattemeldingen

### Generelt om årets revisjon av skattemeldingen i Altinn. 
Hvert år gjøres det oppdateringer og endringer i RF-1030 (skattemeldingen), f.eks. nye poster og underskjema, endring i eksisterende poster, sletting av utgåtte poster og underskjema. Disse oppdateringene gjøres i RF-1030 datamodellen, som tas inn i nye utgaver av tjenestene “RF-1030PSA” og “RF-1030PSAN”. I tillegg oppdateres en rekke tekster og det gjøres også endringer på bl.a. overførings- og valideringsregler. Nyheter om skattemeldingen vil bli publisert på skatteetaten.no.

### Hendelsesstyrte dialogbokser med informasjon om ny løsning av skattemeldingen.
Oppdatert dialogbokser som vises både i PSA og PSAN meny avhengig av om sluttbruker kan benytte ny løsning av skattemeldingen på skatteetaten.no eller ikke.

### Nye poster for kompensasjonsytelse til næringsdrivende utbetalt fra NAV
Nye poster for kompensasjonsytelse til næringsdrivende utbetalt fra NAV på 1.6.5, 2.1.3 og 2.7.14. Postene endres via post 1.6.5 Kompensasjonsytelse til næringsdrivende utbetalt fra NAV.

### Nye finansprodukter og forvaltningskostnader
Ny post 3.3.7 Forvaltningskostnad og utvidelse av post 3.1.15 Annen inntekt, avkastning eller rente finansprodukter.

### Feilmelding ved kontroll av skjema – ta bruker til post
Når det vises feilmelding ved kontroll av skjema, så skal sluttbruker blir sendt til posten hvor feilen er, og postens ledetekst eller beløp skal være markert som feil. Når posteditor åpnes skal feltet med feil være markert.

### Start skatteberegning i skattemeldingen
Det er nå mulig å starte skatteberegning fra kvitteringssiden for RF-1030 Skattemelding for formues- og inntektsskatt – lønnstakere og pensjonister mv. på vegne av andre dersom en representerer andre aktører.

## Endringer i Infoportal

### Oppgradert Episerver
Oppgradert Episerver CMS til versjon 11.20.00. Mest synlige endringer for redaktør er ny versjon av TinyMCE. I tillegg er behandling av blokker forbedret.

### Feil i filtrering av støtteordninger
Utvalget som vises etter å ha valgt formål og bransje for støtteordninger er nå korrigert.

## Feilrettinger

### Feil linker på /api/delegationrequests

Etter innføring av endepunkt for å opprette tilgangsforespørsler på vegne av virksomheter gjennom REST-API i v20.12, ble linkene som leveres ut sammen med resultatet for GET/POST-operasjonene generert feil. Disse linkene refererte alltid til operasjoner på serviceowner-APIet. Dette er nå rettet til å returnere korrekt link for disse operasjonene. Det er også fjernet en “GUI”-link som ved en feiltakelse ble levert ut sammen med Self-linken.
Denne endringen filtrerer også ut alle DelegationRequests med status "Created". Dette er forespørsler som kan være opprettet av en Tjenesteeier, men ikke faktisk sendt til den delegerende parten ("offeredBy"). Disse forespørslene er ugyldige for virksomheten i dette stadiet, og har derfor blitt fjernet fra resultatet.

### Feil visning av utropstegn i header

Panelet for å vise innkommende tilgangsforespørsler til privatpersoner under profil skal bare vises til personen selv. Denne begrensningen som ble gjort i 21.1 førte til at enkelte tilgangsstyrere for privatpersoner fikk vist et utropstegn over profil-teksten i navigasjonsvisningen. Dette er nå korrigert til å ikke vises til andre enn privatpersonen selv.

### Feil sortering for arkiverte Altinn Apps instanser

I stedet for å sortere elementene på arkivertdato er det dato instansen ble opprettet (Created date) som er blitt brukt så langt. Dette er nå rettet.

### Manglende invalidering av AltinnPartyId cookie ved utlogging

Utdatert cookie ble liggende igjen i nettleser dersom man ikke var innom portalen ved neste innlogging.
Feilen har førte til at aktørvalg i en Altinn App var misvisende dersom man brukte samme nettleser for sesjoner med ulike brukere. Dette er nå rettet.

### Feil i setting av utropstegn på profil-siden

I v21.1 ble noe av logikken som holder rede på når utropstegnet skal vises i profil-siden endret. Dette medførte at eventuelle endringer i innkommende/utgående forespørsler ikke påvirket varselsikonet på profilsiden før brukeren gjorde en manuell relasting av siden. Dette er nå korrigert, og utropstegnet skal oppføre seg som før v21.1-releasen.

### Manglende logging av enkelte feil i SubmitFormTask/InitateFormTask

Functional Errors fra InitateFormTask logget ikke underliggende feil. I v20.10 ble SubmitFormTask endret fra Async til Sync. I denne sammenhengen ble feilhåndtering endret, for å sikre at kvittering ble returnert OK. Desverre medførte det at i enkelte tilfeller med tekniske feil ikke blir logget detaljer om feilen. Klienten får en kvittering med status “UnExpectedError” og teksten “Your request suffered from a non-functional error…”, men det finnes ikke informasjon som kan brukes til feilsøkning om hva feilen var.
Denne endringen legger til logging når feil av denne typen oppstår slik at det er mulig å feilsøke.
