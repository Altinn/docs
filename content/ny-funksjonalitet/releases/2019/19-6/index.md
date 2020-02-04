---
title: 19.6
description: Innføring av Hovedadministrator-rolle, oppgradert BankID, meny på mobil rettet og mindre endringer
weight: 70
type: releasenote
releasenote_info: Release 19.6, produksjonssatt 12. juni 2019
---

## Endringer i Autorisasjon

### Innføring av Hovedadministrator-rolle for virksomheter

Rolledelegering må i dag ofte utføres av daglig leder (eller tilsvarende), som er upraktisk i store organisasjoner.

Daglig leder (samt Styrets leder, Bestyrende reder og Innehaver) får rollen Hovedadministrator tildelt ved registrering
i Enhetsregisteret, og kan dermed delegere Hovedadministrator videre til andre ansatte eller virksomhetsbrukere.
Selve Hovedadministrator-rollen inneholder også rollene Tilgangsstyring og Klienadministrator, i tillegg til at rollen gir tilgang til ny system ressurs: MainAdmin.

Ny systemressurs vil i fremtidig endring brukes til å autorisere tilgang til delegering av spesielle roller og rettigheter (blant annet for tjenester med personsensitivt innhold).
Det spesielle med Hovedadministrator-rollen er at en hovedadministrator får tilgang til å delegere Roller og Tjenesterettigheter både til andre og seg selv, tilsvarende som daglig leder.
Dette uten at hovedadministratoren selv først har mottatt noen annen rolle eller tjenesterettigheter, utover Hovedadministrator rollen.
Dette gjelder også administrering og delegering av Klientroller til ansatte på vegne av klientene til virksomheten.

Rollen Hovedadministrator er derimot ikke en nøkkelrolle.
Altså vil ikke en hovedadministrator for en virksomhet arve roller og rettigheter som andre brukere eller virksomheter har gitt til virksomheten.

Siden Hovedadministrator får utvidet mulighet til å gi både seg selv og andre alle rettigheter for virksomheten, vil det komme opp en advarselstekst ved delegering.

![Beskrivelse av hovedadministrator](HovedAdministrator2.png "Beskrivelse av hovedadministrator"")


![Advarsel ved delegering](HovedAdministrator3.png "Advarsel når man delegerer "Hovedadministrator"")

## Endringer i REST API

### Forbedret grensesnitt for SRR på REST API

Hovedmålet er å forenkle bruken av SRR og gjøre dette tilgjengelig via REST.
API-et for SRR inneholder nå GetRights (GET), GetRightById (GET), AddRights (POST), DeleteRight (DELETE) og UpdateRight (PUT).

### REST API er rettet til å ikke linke til arkiverte elementer hvis tjenesten ikke tillater arkivering

Altinn har noen tjenester som ikke tillater at elementer blir arkivert i avgivers arkiv. Dette er typisk for tjenester med sensitiv informasjon.
Når et slikt element blir ferdigstilt/signert blir det sendt til tjenesteeier, men det blir ikke lagret noen kopi i avgivers arkiv.
Dette har fungert riktig også gjennom REST API, men REST API har likevel generert en lenke for arkivert element (som ikke eksisterer).
Dette er nå er rettet. Forutsetningene er altså at en sluttbruker ferdigstiller et element basert på en tjeneste som ikke tillater arkivering.
For forespørsler som ikke utfører arkivering blir det fortsatt generert lenke.

## Diverse bugfix

### Menyen på mobil overlappet med det lille aktørvalget

Feilen oppsto når en bruker byttet mellom meny og aktørlisten flere ganger etter hverandre.
Løsningen ble å lage en sjekk som sikrer at menyen er lukket før man kan åpne aktørvalget, og vice versa.
Endringen kommer via designsystemet og en ny NPM-pakke med versjon 2.3.1.

### Samtykkepanelet hadde feil visning når et samtykke trekkes

Løsningen viser nå samtykke-listen eller en tekst hvis listen er tom når man trekker en samtykke.
Når man fjerner en samtykke kommer man til den forrige siden man var på.
Der ser man nå enten samtykkelisten (hvis man oppgitt flere samtykker), eller en tekst (hvis samtykke-listen er tom).

### NotificationSent ble ikke logget for faktiske SMS sendinger

Loggingen tok ikke hensyn til at meldingslengde er avgjørende for hvor mange SMS som sendes for en melding.
Første melding deles opp i maks 160 karakterer, resterende er på maks 155 karakterer.

## Andre endringer

### Oppgradering av BankID signering

BankID innførte endringer som krevde oppgradering på vår side. Dette er nå utført.

### Lokal rolle mistet tilgang etter migrering av ny tjeneste fra TUL

Lokal rolle var feilaktig knyttet til tjenestens versjon. Dette gjorde at når ny versjon av en tjeneste ble lagt ut mistet man tilgangen.
Dette er nå rettet ved at tilgangen blir gitt på selve tjenesten og ikke knyttet opp til hvilken versjon denne har.
