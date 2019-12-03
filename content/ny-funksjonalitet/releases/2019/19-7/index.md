---
title: 19.7
description: Endringer i autorisasjon, ny operasjon i SOAP API, forbedringer i innlesing av data fra Enhetsregisteret, feilrettinger.
weight: 60
type: releasenote
releasenote_info: Release 19.7, produksjonsatt 3. juli 2019
---

## Endringer i SOAP API

### Ny operasjon for nedlasting av meldinger fra avgiverarkivet

Det er blitt opprettet en ny operasjon på grensesnittene for sluttbrukersystemer mot avgiverarkivet. Operasjonen gir tilgang til arkiverte meldinger.
Aktuelle endepunkter og operasjonsnavn:

| Basis operasjon           | Endepunkt  | Endepunkt operasjon            | Endepunkt URL                                                          |
| ------------------------- | ---------- | ------------------------------ | ---------------------------------------------------------------------- |
| GetArchivedCorrespondence | WS Http    | GetArchivedCorrespondence      | https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc      |
|                           | Basic Http | GetArchivedCorrespondenceBasic | https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc |
|                           | EC         | GetArchivedCorrespondenceEC    | https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc    |

Input parameter er meldingens id i arkivet. Dette er et tall man får når man kaller på tjenesten for meldingsboksen.
Altså en av GetReporteeElementList operasjonene. Operasjonen er dokumentert nærmere [her](/docs/api/soap/grensesnitt).

## Andre endringer

### Endringer for å forbedre kommende re-innlesing og generell innlesing fra Enhetsregisteret

Det er gjort noen endringer som gjør innlesing av batch fra Enhetsregistret raskere.
Dette er gjort i forbindelse med forestående full re-innlesing og utvidelse av Altinn's kopi av Enhetsregister data.
Endel tomme felter blir ikke lenger lest inn, nye indekser er opprettet. Endringer for å unngå låsinger ved stor pågang mot databasen er også gjort.

## Feilrettinger

### Innehaver i enkeltpersonforetak fikk ikke delegert roller til daglig leder

Det ble i release [18.6](../../2018/18-6) gjort endring for at daglig leder av enkeltpersonforetak ikke lenger
skulle få tilgang til innehaver som avgiver og tilgang til innehavers meldingsboks.
Det ble i den sammenheng oppdatert for uthenting av avgiverliste samt uthenting av rettigheter for autorisasjon av tilgang (DecisionPoint),
mens det manglet oppdatering for logikken knyttet til hvilke roller som er tilgjengelig for delegering.
Dette er nå utbedret slik at løsningen ved delegering ikke tror at daglig leder allerede har tilganger for innehaver.

### Permanent sletting av elementer i meldingsboksen som virksomhetsbruker

Kravet for å kunne få utføre permanent sletting for en virksomhet er at brukeren må ha rettigheten "Tilgangsstyring for virksomheten".
Feilen oppstod for virksomhetsbrukere uten tilgangsstyring fordi slette knappen feilaktig alltid var aktiv.
Når knappen ble brukt forårsaket dette feil i underliggende kode.

### Redigering av en eksisterende lokal rolle med utgått tjeneste

Det ble i release [19.5](../19-5) gjort en forenkling av brukergrensesnittet for opprettelse og redigering av en lokal rolle.
Implementasjonen fikk da med seg en uheldig avhengighet til listen over tilgjengelige/aktive tjenester i løsningen.
Dette medførte at visningen av en eksisterende lokal rolle med rettighet til en eller flere utgåtte tjenester ikke fungerte.
Dette er nå utmedret, men det er fortsatt en svakhet i løsningen som gjør at dersom man redigerer
en lokal rolle vil rettigheter knyttet til utgåtte tjenester bli fjernet fra rollen.
Dette vil bli utbedret i en kommende release.

### Hovedadministrator får ikke delegert enkeltrettigheter til tjenester som kun har eksterne roller tilknyttet

Første versjon av Hovedadministrator rollen (HADM) fikk bare delegere roller og enkeltrettigheter til tjenester basert på delegerbare "barneroller" av Daglig leder rollen (DAGL).
Dette er utvidet slik at HADM nå også får opprettet lokale roller og delegert enkeltrettigheter til tjenester som er knyttet direkte til DAGL rollen.

### Utbedring av feilsituasjoner rundt validering av selv-delegeringer

Det ble i release [19.6](../19-6) som del av introduksjon av Hovedadministrator rollen (HADM) lagt til unntak for at HADM skal få delegere roller og rettigheter til seg selv fra virksomheten sin.
Denne endringen i validering rundt “selv-delegering” har avdekket to feilsituasjoner som nå er utbedret:

- Person med Tilgangsstyring og rettigheter for enkelttjeneste får ikke delegere disse enkeltrettighetene videre til en annen virksomhet.
- Hovedadministrator har mulighet til å delegere roller og enkeltrettigheter som er både fra og til sin egen virksomhet.

### Fjernet tomme verdier fra retur objekt ved bruk av SRR i REST API

Man fikk en tom liste fra atributtet hvis man hadde stavefeil eller det ikke var verdier å vise. Man får nå ikke lenger denne tomme listen.
Se bilde under for eksempel på hvordan det var før rettingen. Man får fortsatt ikke tilbakemelding på skrivefeil da dette ikke er hensiktsmessig.

![Eksempel på JSON-struktur som tidligere ble returnert](condition.png "Eksempel på tom liste")

### Eier av enkeltpersonforetak ble ikke med i aktørlisten til regnskapsfører

Aktørlisten endret slik at enkeltmannsforetak nå også blir med.
