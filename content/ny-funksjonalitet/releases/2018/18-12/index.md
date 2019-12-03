---
title: "18.12"
description: Visning av organisasjonsform i REST, styre utsendelse av varsel ved prefill, feilrettinger m.m.
weight: 10
type: releasenote
releasenote_info: Release 18.12, produksjonssatt 11. desember 2018.
---

## Endringer i portal

### Filtrering av aktørlisten basert på innstilling angitt i portalen

Regnskapsførere og revisorer kan velge bort å se klienter i aktørlisten hvis de ønsker dette ved å gå inn i "profil" og "Avanserte innstillinger".
Etter 17.2 releasen fungerte ikke dette selv om man valgte bort å se klienter. Dette er nå korrigert og fungerer som tiltenkt.

![Skjermdump av innstillingene for forhåndsvalgt aktør](profil.png "Filtrering av aktørlisten")

## Endringer i REST API

### Mulighet for delegering av revisor/regnskapsfører rolle i REST API er tatt bort

Blir det forsøkt delegert en revisor/regnskapsfører rolle (klientrolle) gjennom rolle og rettighetsdelegering i sluttbrukers REST API,
vil delegeringen nå gi feilkode 403 med en beskrivende feilmelding. Disse rollene må delegeres via portalen.

### Visning av organisasjonsform, foreldreorganisasjon og link til Enhetsregisteret via REST API

Tidligere var det ikke mulig fra REST responsen å avgjøre hvorvidt en hovedenhet hadde underenheter eller ikke.
Endringen medfører at det nå er mulig å se organisasjonsformen til hvert selskap slik at man kan filtrere på hovedenheter, underenheter og indre selskap.
I tillegg er det lagt til en lenke som peker til Enhetsregisteret for hvert element.

### Legge til Secure og HttpOnly på .ASPXAUTH ved fornyelse av cookie ved bruk av REST API

Ved fornyelse av cookien .ASPXAUTH via REST API ble tidligere ikke “Secure” og “HttpOnly” satt. Dette blir nå gjort.

## Endringer i SOAP API

### Nytt parameter for å styre utsendelse av varsel ved opprettelse av elementer gjennom Prefill

Operasjonen SubmitAndInstantiatePrefilledFormTask har fått et nytt parameter kalt ValidateButDoNotSendNotification.
Når dette flagget blir satt til true vil logikken stoppe utsending av varsel selv om alt validerer OK.
I tillegg gjør logikken en bedre verifisering av kontaktinformasjon knyttet til avgiver opp mot varsel innstillinger.
Flagget er avhengig av at forespørselen inneholder informasjon om varsel utsending, men vil ikke gi noen feil om det skulle mangle.

Det nye flagget ValidateButDoNotSendNotification skal kunne brukes av tjenesteeiere hvis de ønsker å validere at
Altinn har nok informasjon til å kunne sende varsel uten at det faktisk sendes varsel.
Dette kan da brukes i de tilfellene hvor de også skal lage et meldingselement (correspondence) og ønsker å knytte varsel til det isteden.
Skulle verifisering av kontaktinformasjon resultere i en feil så vil tjenesten returnere en feilmelding om dette.
Det blir ikke laget noe skjemaelement i en slik situasjon. Tjenesteeier kan da velge å opprette skjema i en forespørsel uten varselinformasjon eller velge en annen kanal som for eksempel papir.

Endringen gjelder alle typer avgivere. Utbedringene som nå er gjort kan føre til litt andre feilmeldinger enn tidligere.

## Diverse bugfix

### Profilsiden - Resultat for tjenestesøk vises ikke på mobil

En feil i tjenestesøk komponenten førte til at søkeresultatet ikke ble synlig for mobilvisning for tre visninger i profilsiden:

- Gi og fjerne rettigheter
- Opprettelse av lokal rolle
- Din kontaktinformasjon for virksomheten > Varsling kun for enkelttjenester
  
Feilen er nå rettet

### Utbedret logikk som bestemmer fødselsdatoen ut fra fødselsnummer ved bruk av makroer i varsel maler

Altinn benytter per i dag fødselsnummer til å beregne fødselsdato. Logikken som gjør denne beregningen før fødselsdato benyttes i varsel maler hadde 2 feil.
Det kunne plassere personer i feil århundre og gi personer med D-nummer ugyldige fødselsdatoer. Dette er nå rettet.

### Klientdelegering - feil i teller på fjern alle klienter

I klientrolle administrasjonen for en gitt ansatt er det en link/knapp for å slette alle klienter den ansatte har.
Link teksten sin teller er nå endret til å vise oppdatert totalt antall klienter den ansatte har,
i stedet for antall klienter visningen inneholdt (visningen var begrenset til å laste 20 om gangen).

### Klientdelegering - Utbedring av feil for klientdelegering på fil for å unngå duplikat utsendelser av epostvarsling

For versjon 18.7 av Altinn ble det levert forbedring rundt format på eposter for klientdelegerin på fil.
I den sammenheng ble det innført en feil der utsending av epost til de som mottar delegering av en eller flere klientroller kunne motta opptil flere tusen eposter.

Feilen er nå utbedret så mottaker mottar en epost pr. rolle, pr. klient.
