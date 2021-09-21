---
title: 21.9
description: Utvidet sertifikatstøtte, mindre endringer og feilrettinger
weight: 120
type: releasenote
releasenote_info: Release 21.9. Produksjonssatt 20. september 2021
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Oppdatering av jQuery for WebSA

WebSA (selvangivelsetjenestene) har nå siste versjon av jQuery, som er 3.6.0. Utdaterte metoder brukt i WebSA er oppdatert med ny implementasjon som er gyldig i jQuery 3.6.0.

### Støtte for Seid 2.0 sertifikater

Det er gjort to kodeendringer for å støtte sertifikater fra Bypass som baserer seg på Seid 2.0 standarden.

## Endringer i REST

### Lagt til håndtering av delegation_source i maskinporten/ID-porten

Det er lagt til validering i REST-API for å verifisere at delegationSource er gyldig på mottatt access token dersom delegationSource er satt.

### Forbedringer på delegationRequests

Det er gjort ytelsesoptimaliseringer samt at det er innført nye valgfrie søkeparametre på operasjonen ServiceOwnerDelegationRequests: coveredBy og OfferedBy.

## Endringer i TUL

### Oppdatert jquery versjon i TUL

Jquery versjonen i TUL (Tjenesteutviklingsløsningen) er oppgradert til 3.6.0.

## Feilrettinger

### Endring på PDF-format på søknader fra Altinn

PDF formatet ble pdf/a når et skjema bestod av flere sider. Dette er nå rettet. Feilrettingen gjelder PDF for tjenesteeiere.

### Rettet logging av feil verdi for ServiceEditionVersionID i autorisasjonsloggen
 
Tidligere ble verdien til ReporteeElementID også lagt inn i kolonnen for ServiceEditionVersionID. Dette er nå rettet slik at ServiceEditionVersionID får riktig verdi.

### Man ble feilaktig redirigert til Innboksen ved åpning av skjema som lå til betaling

Endringen retter en feil som medførte at man ble redirigert tilbake til Innboksen når man forsøkte å åpne innsendingssiden for et skjema som lå til innsending etter at man har utførte betalingen. Dette er en situasjon som vanligvis ikke oppstår, men det kan skje i tilfeller hvor brukeren ikke blir redirigert tilbake til Altinn fra betalingsleverandøren etter at betalingen er gjennomført.

### Feil i oversettelse av filnavn for file med rettigheter på Nynorsk

I versjon 21.8 ble det rettet på oversetting for Nynorsk og Bokmål siden alle filene hadde engelsk filnavn, men på filen for rettigheter på nynorsk ble et av ordene igjen på engelsk og dermed ble det en blanding av nynorsk og engelsk. Dette er nå rettet.

### Opplysning om opprettet tidspunkt manglet for Arkiverte meldinger dersom de ikke ble lagret i ServiceOwnerArchive

Dette er nå rettet.

### Feil i siderekkefølge ved bruk av sporvalg

Når et skjema i TUL brukte sporvalg så kunne siderekkefølgen for sidene før sporvalgssiden komme i “usortert” rekkefølge. Dette er nå rettet slik at alle sidene følger sekvensen de er satt opp med under sideegenskaper i TUL.

### Logging av samtykke byttet om måned og dag - <span style="color:red"> *Breaking change*</span>
 
Logging av samtykke byttet om måned og dag ved bruk av visse datoformater. Det er derfor lagt på strengere kontroll av datoformatet som kommer inn som JSON via REST. Dette for å unngå misforståtte datoer som følge av andre datoformater enn ISO-8601.

### Register-ER batch feil i oppsummering av OK elementer.
 
Det ble innført en strengere verifisering av OK elementer i register-ER batch med Altinn versjon 21.3. Dette medførte at et element måtte være både prossesert og OK for å bli talt opp som OK.
Register-ER batchen har aldri prossesert elementet. Den har sendt hele blokken videre for prossesering dermed fikk den aldri markert elementer som prossesert OK.
Dette er nå endret ved å markere alle elementer som prossesert hver gang det prosesseres en blokk. Feilen har ikke medført feil på data.

### Feil når SBS (Sluttbrukersystem) gjør SOAP-kall mot meldingsboks og bruker har Altinn tjeneste 3.0 elementer

Når et sluttbrukersystem henter en avgivers liste med skjemaer så feilet koden som forsøkte å hente avgiverens tjeneste 3.0 element. Feilen medfører ikke feil tilbake til SBS, men den logges til Altinn sin event logg. Denne endringen gjør at koden ikke lenger feiler og vi slipper disse innslagene i event loggen vår.

### Feil ved innsending av skjema som ikke lagres i Arkiv

Hvis man setter opp en tjeneste i TUL til å benytte sikkerhetsnivå 4 på signeringssteget og samtidig setter at skjema ikke skal lagres i avgivers arkiv så får man en feilmelding i portalen etter at man har utført signeringen.
Det riktige ville vært å fått en kvitteringsside som brukes for skjema som ikke lagres til arkiv, men i dette tilfelle får man den vanlige kvitteringssiden og da feiler koden. Dette er nå rettet slik at man får den riktige kvitteringssiden.

### Uforståelig feilmelding i serviceowner APIet

Feilen gjaldt for GET /api/serviceowner/authorization/rights. Når enhetens navn var null og rettighet/rolle subject hadde for reportee dekket en tjeneste (urelatert til service kodene som oppgis) som hadde SRR.Reportee modus satt. Derfor ble det forsøkt sjekk på om Reportee fantes i SRR for tjenesten. Det feilet når enhets navn var null. Dette er nå rettet slik at party informasjon blir hentet selv om enhetens navn er null.

### Manglende app navn i fil når oversettelse ikke var tilgjengelig

Appnavn ble hentet direkte i prosedyren som hentet info fra Authorisasjon basert på valgt språk uten å bygge inn støtte for at en app ikke trenger å eksistere på mer en standard språk. Måtte derfor få på plass kode som henter ut navn basert på prioritering. Først valgt språk deretter standard språket til appen.
Siden det også eksisterte en task på å benytte MetaData kall for å finne navn på tjenesten som har denne funksjonen innebygd ble det valgt å benytte denne tjenesten og fase ut uthentingen gjennom den opprinnelige prosedyren. Siden delegeringer som eksisterer kan være på tjenester/apper som ikke lenger er gyldige var det behov for å utvide søket i apper til å inkludere ikke aktive tjenester dersom flagget for å inkludere slike tjenester var satt.

### REGN/REVI fikk ikke opprettet skjema for innehaver av Enkeltpersonforetak

Det er nå gjort endringer i koden slik at StartService benytter samme kode som benyttes for valg av avgiver i MVC portalen men utflatet og filtrert på samme måte som tidligere. Dette medfører at det er samme data som hentes ut, men det er mulighet for å filtrere på slettede enheter og underenheter.
