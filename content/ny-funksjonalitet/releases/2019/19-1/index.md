---
title: 19.1
description: Samtykke utvidelse NADOBE, filtrere bort slettede virksomheter, mindre endringer og feilrettinger
type: releasenote
weight: 120
releasenote_info: Release 19.1, produksjonssatt 14. januar 2019
---

## Endringer i Service Rights Registry (SRR) og samtykke

### Autorisering av tredjepart for behandling av samtykker på vegne av datakonsument

Det er introdusert mulighet til å registrere organisasjon som tredjepart i tjenesteeierstyrt rettighetsregister (SRR). Det er utført en utvidelse av autorisasjonskomponenten i Altinn for å autorisere denne tilgangen. Samtykkesiden er også endret slik at teksten der gjenspeiler endringen. Dette er en tilpasning til [NADOBE](/docs/guides/nadobe/).

## Endringer i REST API

### REST grensesnittet utvidet for å kunne filtrere på slettede virksomheter

Ved henting av avgivere er det lagt til et filter å kunne filtrere bort slettede selskap.

### Replyoptions er synlig for alle

 Replyoptions er nå synlig for alle (uavhengig av accept header) for messages av typen Correspondence.

### Visning av organisasjonsform og foreldreorganisasjon for Reportees i REST API for tjenesteeiere

Organisasjonformen til hvert selskap vises nå slik at man kan filtrere bort indre selskap og underenheter. Denne er forøvrig en videreføring av en endring som kom i [18.12](/docs/releases/2018/18-12) hvor man så et behov for å synliggjøre organisasjonsform og foreldreorganisasjonen til en underenhet.

## ShipmentMetadata

### Tjenesteeiere kan nå få metadata om en skjemaforsendelse i DownloadQueue uten å måtte parse skjema xml

Dersom tjenesteutvikler har lagt til et eller flere metadatafelt i et skjema i TUL, vil disse bli populert når utfylt skjema blir signert/arkivert av skjemamottaker. Ved kall til webservicemetoden GetDownloadQueueItems, vil ShipmentMetadataList bli returnert som ny property i hvert DownloadQueueItem i returen, med Key (metadatafeltnavn) og Value for hvert metadatafelt. Dersom et skjema ikke har metadatafelt, vil ShipmentMetadataList være NULL. Metadataverdiene kan for eksempel brukes av tjenesteeier til å kategorisere en skjemaretur før selve skjemaet blir lastet ned. Dette reduserer behovet for å laste ned og parse hvert enkelt skjema for å avgjøre videre behandling. For tjenesteeiere som ikke ønsker å ta denne funksjonaliteten i bruk, kreves ingen endringer. Merk også at ShipmentMetadata kun er tilgjengeliggjort via GetDownloadQueueItems og ikke via GetArchivedFormtaskDQ.

## Andre endringer

### Ny tjenesteeier i SBL - Enova SF

Ressursfiler er oppdatert med beskrivelse av koden til Enova SF på bokmål, nynorsk og engelsk.

## Feilrettinger

### Aktivitetsloggen - Hendelser registrert på samme tidspunkt ble vist i feil rekkefølge

En feil gorde at det kunne se ut som signering ble utført etter innsending i Aktivitetslogg. Dette er nå rettet opp.

![Bilde av aktivitetslogg](Aktivitetslogg2.png "Slik kunne det se ut før feilen ble rettet")

### Profilsiden - Virksomheter med virksomhetsbrukere fikk feil visning under “Andre med rettigheter til virksomheten”

Feilen oppsto når det var virksomhetsbrukere registrert på selskapet og denne virksomhetsbrukeren hadde roller. I disse tilfellene vistes også virksomheten. Dette er nå rettet opp.

### ReporteeType i REST blir feil for AAFY-underenheter

AAFY (ikke næringsdrivende enhet) ble ikke med som underenhet. Dette er nå rettet opp.

### Hyppige feil ved SOAP overføringene fra Enhetsregisteret til Altinn

Hasteoverføringene via SOAP har inneholdt personstatus med feil lengde. Dette medførte at hjelpetabellen ikke kunne lagre informasjonen og innlesingen feilet. Det sendes derfor nå ‘null’ som verdi på personsatus til databasen. Dette kan gjøres fordi verdien i dag ikke blir lagret hos Altinn.
