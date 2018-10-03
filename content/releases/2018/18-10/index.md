---
title: "18.10"
description: Slette meldinger permanent, andre forbedringer, feilrettinger m.m.
weight: 30
type: releasenote
releasenote_info: Release 18.10, produksjonssettes 15. oktober 2018.
---
{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [18.9](../18-9) for siste versjon i produksjon.
{{% /notice %}}
***

## Endringer i portal

### Brukere som representerer en organisasjon kan nå permanent slette elementer fra “Slettede” i innboksen

Brukere som representerer en organisasjon og som har rollen tilgangsstyring og rettigheter til å slette elementer kan nå permanent slette elementer fra “Slettede” i innboksen. Når bruker ønsker å permanent slette et element kommer det opp et varsel der brukeren er nødt til å bekrefte sitt ønske. Varselet kommer også opp når enkeltpersoner prøver å permanent slette elementer fra “Slettede”.
{{<figure src="permanentSletting.png?width=600" title="">}}

### Altinn husker nå valget brukeren sist hadde ved bruk av “se alle underenheter” og/eller “se slettede enheter”

Når bruker huker av for “se alle underenheter” og/eller “se slettede enheter” vil Altinn nå huske brukerens valg slik at neste gang brukeren er innom aktørvalg-siden vil avhukningsboksene for “se alle underenheter” og “se slettede enheter” reflektere forrige valg.
{{<figure src="aktorvalg.png?width=600" title="">}}

### Maksimum størrelse på e-post utvidet til 1.4 MB

 Max størrelse på vedlegg som kan sendes på epost utvidet til 1.4 MB. Varsel kommer opp når meldingen er for stor til å videresende på epost. Man kan velge å videresende i altinn (ingen begrensing på størrelse for videresending i altinn) eller takke nei.

{{<figure src="vedleggStorrelse.png?width=600" title="">}}

### CAPTCHA oppdatert i MVC portalen

BotDetect [CAPTCHA](https://no.wikipedia.org/wiki/CAPTCHA) er nå blitt oppgradert på alle sider det dette benyttes.

{{<figure src="dcapta.png?width=600" title="">}}

## Endringer i eksterne grensesnitt

### Operasjonene arkivering og permanent sletting av en aktiv melding skal fjerne alle elementdelegeringer på meldingen

Med denne endringen blir det utført sletting av alle elementdelegeringer knyttet til en melding som blir fjernet fra meldingsboksen. De aktuelle operasjonene er permanent sletting og arkivering. Flytting av melding til søppelbøtten trigger ikke sletting av rettigheter da elementer i søppelbøtten kan bli gjennopprettet. Logikken som er innført er i stor grad den samme som allerede fantes for innsendingselementer.
Endringen innebærer at personer som kun hadde slike, litt midlertidige rettigheter ikke lenger dukker opp i listen over aktører som kan representere avgiveren av det aktuelle elementet.

## Diverse bugfix

### Person med rettighet på enkelttjeneste fikk ikke delegert rettigheten videre

Det ble innført en feil i 18.9 releasen av Altinn som gjorde at personer med tjenesterettigheter ikke fikk delegert videre. Dette skjedde hvis rettigheten de hadde var eldre enn versjonen av den gjeldende tjenesten. Dette er nå rettet opp.

### Kvitteringen som skal sendes ut etter prosessering av en klientdelegeringsfil ble ikke alltid sendt

Samlekvittering etter klientdelegering ble ikke sendt dersom fila inneholdt e-postadresse. Feilen oppsto etter 18.8 releasen av Altinn. Dette er nå rettet.

### Tabbing i innboks hoppet over slett knappen

Slett knappen blir nå også aktivert ved tabbing på siden.

### Fjerning av ugyldige linker i resultatet fra slettede elementer i REST API

Ved henting av slettede elementer via REST API ble det returnert noen ugyldige linker. Nå er self-linken korrigert på hele resultatet til å peke på /messages/trashbin istedenfor bare /messages. Find-elementet på hele listen ble fjernet, samt at det nå bare returneres metadata-link på selve message-element som ligger i slettede enheter (trashbin). Alle andre linker på message-objektene er fjernet.