---
title: "21.10"
description: Fjernet duplikater i nedtrekksliste, mindre endringer og feilrettinger
weight: 110
type: releasenote
releasenote_info: Release 21.10. Produksjonssatt 25.10.2021 
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Endret navn på knapp i arkiv

Teksten på knappen i arkiv som heter "Vis kvittering" var uklar for brukerne. Teksten er derfor endret til "Se innsendt skjema".

## Endringer i REST

### Tillate uthenting av meldingsboksen med meldinger som er arkivert med innhold brukeren har for lavt sikkerhetsnivå til å se

Tidligere fikk man ikke sett element som hadde høyere påloggingsnivå enn det man var pålogget med. Man fikk isteden en feilmelding. Dette er nå endret slik at elementene kommer opp som forventet.

## Diverse feilrettinger

### Duplikater i nedtrekkslisten

Ved pålogging med en avgiver som hadde tilgang til enheter med underenheter og hadde forskjellige avgiverkrav kunne det bli duplikater i nedtrekkslisten. Dette er nå rettet.

### Logging av samtykke byttet om dag og måned (dette er del 2/2 for fiks av content-type: json) - <span style="color:red"> *Breaking change*</span>

Logging av benyttet samtykke via */api/authorization/token/{authCode}/loguse* byttet om måned og dag ved bruk av visse datoformater. Dette er nå rettet for REST-kall som benytter Content-Type "application/json” ved å kreve at datoen er på ISO-8601 format.

### Når et felt i et InfoPath-skjema hadde både en MYK feil og en XSD feil var det mulig å sende inn skjemaet med XSD feilen.

Denne feilen er nå rettet slik at man ikke får sendt inn skjema hvis det kun inneholder myke valideringsfeil i tillegg til XSD feil.

### Søk på enheter i portalen godtar ikke søk som inkluderer noen vanlige tegn i enhets navn

Søk inkluderer nå flere tegn med aksenter, samt punktum og stemt og ustemt th. Eksempelvis får man nå også treff på èêã dersom man skriver eea.

### Side for oppgradering av pålogging vises ikke lenger når man allerede har tilstrekkelig påloggingsnivå

Side for oppgradering av pålogging vises nå for tjeneste i innboksen kun når det er påkrevet å øke påloggingsnivået.

### Selvidentifiserte brukere fra eksterne ID-providere støttes

Vi har nå lagt inn støtte for å opprette selvidentifiserte brukere for eksterne ved hjelp av utvidet profil muligheter og nye API.

### Endring av Altinn 3 autentiseringscooke

Altinn 2 sjekker nå etter nytt cookienavn for Altinn 3 cookie. Endringen benyttes frem til cookienavn i Altinn 3 autentisering er endret. Dette vil bli utført når alle apps er oppdatert.