---
title: 19.7
description: Endringer i Autorisasjon. Ny operasjon i SOAP API. Forbedringer i innlesing av data fra Enhetsregisteret. Feilrettinger.
weight: 60
type: Releasenote
releasenote_info: Release 19.7, produksjonssettes 3. juli 2019
---
{{% notice info %}}.
Dette er en fremtidig versjon av Altinn. Se [19.6](../19-6) for siste versjon i produksjon.
{{% /notice %}}
***

## Endringer i SOAP API

### Ny operasjon for nedlasting av meldinger fra avgiverarkivet

Det er blitt opprettet en ny operasjon på grensesnittene for sluttbrukersystemer mot avgiverarkivet. Operasjonen gir tilgang til arkiverte meldinger.
Aktuelle endepunkter og operasjonsnavn:

|Basis operasjon|Endepunkt|Endepunkt operasjon|Endepunkt URL|
|---------------|---------|-------------------|-------------|
|GetArchivedCorrespondence|WS Http|GetArchivedCorrespondence|https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc|
| |Basic Http|GetArchivedCorrespondenceBasic|https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc|
| |EC|GetArchivedCorrespondenceEC|https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc|

Input parameter er meldingens id i arkivet. Dette er et tall man får når man kaller på tjenesten for meldingsboksen. Altså en av GetReporteeElementList operasjonene. Operasjonen er dokumentert nærmere [her](../api/soap/grensesnitt/).

## Andre endringer

### Endringer for å forbedre kommende re-innlesing og generell innlesing fra Enhets registeret

Det er gjort noen endringer som gjør innlesing av batch fra Enhetsregistret raskere. Dette er gjort i forbindelse med forestående full re-innlesing og utvidelse av Altinn's kopi av Enhetsregister data.
Endel tomme felter blir ikke lenger lest inn, nye indekser er opprettet. Endringer for å unngå låsinger ved stor pågang mot databasen er også gjort.

## Feilrettinger

### Innehaver i enkeltpersonforetak fikk ikke delegert roller til daglig leder

Det ble i release [18.6](../18-6) gjort endring for at daglig leder av enkeltpersonforetak ikke lenger skulle få tilgang til innehaver som avgiver og tilgang til innehavers meldingsboks. Det ble i den sammenheng oppdatert for uthenting av avgiverliste samt uthenting av rettigheter for autorisasjon av tilgang (DecisionPoint), mens det manglet oppdatering for logikken knytt til hvilke roller som er tilgjengelig for delegering. Dette er nå utbedret slik at løsningen ved delegering ikke tror at daglig leder allerede har tilganger for innehaver.

### Permanent sletting av elementer i meldingsboks som virksomhetsbruker

Kravet for å kunne få utføre permanent sletting for en virksomhet er at brukeren må ha rettigheten Tilgangsstyring for virksomheten. Feilen oppstod for virksomhetsbrukere uten tilgangsstyring, fordi slette knappen feilaktig alltid var aktiv og da denne ble brukt forårsaket dette feil i underliggende kode.

### Redigering av en eksisterende lokal rolle med utgått tjeneste

Det ble i release [19.5](../19-5) gjort en forenkling av brukergrensesnittet for opprettelse og redigering av en lokal rolle. Implementasjonen fikk da med seg en uheldig avhengighet til listen over tilgjengelige/aktive tjenester i løsningen, slik at visningen av en eksisterende lokal rolle med rettighet til en eller flere utgåtte tjenester feilet. Dette er nå utmedret, men det er fortsatt en svakhet i løsningen som gjør at dersom man redigerer en lokal rolle vil rettigheter knyttet til utgåtte tjenester bli fjernet fra rollen. Dette vil bli utbedret i en kommende release.

### Hovedadministrator får ikke delegert enkeltrettigheter til tjenester som kun har eksterne roller tilknyttet 

Første versjon av Hovedadministrator (HADM) rollen fikk bare delegere roller og enkeltrettigheter til tjenester, basert på delegerbare barneroller av Daglig leder (DAGL) rollen. Dette er nå utvidet slik at HADM også får opprettet lokale roller og delegert enkeltrettigheter til tjenester som er knyttet direkte til DAGL rollen.

### Utbedring av feilsituasjoner rundt validering av selv-delegeringer

Det ble i release [19.6](../19-6) som del av introduksjon av Hovedadministrator (HADM) rollen, lagt til unntak for at HADM skal få delegere roller og rettigheter til seg selv fra virksomheten sin. Denne endringen i validering rundt “selv-delegering” har avdekket to feilsituasjoner som nå er utbedret:

- Person med Tilgangsstyring og rettigheter for enkelttjeneste får ikke delegere disse enkeltrettighetene videre til en annen virksomhet
- Hovedadministrator har mulighet til å delegere roller og enkeltrettigheter som er både fra og til sin egen virksomhet

### SRR fjerne tomme verdier fra retur objektet

Ved innsending av et object hvor man har skrive feil så får man ikke tilbakemelding om skrivefeilen. I den forbindelsen så ble det instansiert en tom liste av ett av attributtene. Denne tomme listen er nå fjernet. Det er ikke gjort noen endring i forbindelse med skrive feil da dette anses som ikke hensiktsmessig.

### Feil ved uthenting av aktørliste, eier av enkeltpersonforetak ble ikke med i listen til regnskapsfører 

Det er tidligere blitt gjort en refaktorering av uthenting av aktørlisten. Her ble det gjort en feil som fjernet triming og null sjekk for unittype, og logikken ble endret til at det var bare siste som gjaldt og ikke bare hvis det fantets et enkeltpersonforetak.
Den utførte rettingen er å legge til nullsjekk og trimming av unittype, samt å sette flagget til true hvis det finnes minst et enkeltpersonforetak.

