---
title: 22.8
description: Mindre forbedringer og feilrettinger
weight: 130
type: releasenote
releasenote_info: Release 22.8. Produksjonssatt 22. august
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Støtte for Feide-utlogging

Altinn 3.0 har støtte for pålogging gjennom Feide. Dersom en bruker pålogget via Feide forsøkte å logge ut i fra profilsiden eller meldingsboksen i Altinn 2.0 portalen ville dette sende brukeren til ID-porten mens Feide innloggingen fortsatt ville være aktiv i nettleseren.

Dette er nå utbedret slik at bruker i stedet blir sendt til utlogging i 3.0 som basert på innlogingstype igjen vil videresende til utlogging hos ekstern innloggingsleverandør.

### Endre Orgnummer serier som åpnes for visning av kontakt info (KoFuVi)

Det var kun organisasjonsnummer i området 800000000-999999999 som hadde aktivert visning og mulighet for å endre kontaktinformasjon dette ble endret til også inkludere området 200000000-399999999.

### Hente ut sensitive tjenester for bruk i andre med rettigheter

Endret på søket som benyttes fra portalen til å inkludere sensitive tjenester slik at også disse vises når man filtrerer på tjeneste under andre med rettigheter.

## Endringer i SBL

### Oppdatering av tidligere levert transportinfrastruktur for DPI

Endring transportinfrastruktur for DPI (Digital Post) . Vi har oppdatert intern DPI behandling i Altinn til å bruke REST api mot Hjørne 2 til å levere digital post videre til mottakere. Eldre metode for overføring eksisterer fremdeles i Altinn løsning, og vi bruker feature toggling for å sette over til ny eller gammel metode for overføring av Digital Post. 
Vi har også oppdatert kvitteringshenting via Rest til å hente ned kvitteringskø fra Hjørne 4 og markere disse som lest.

### Endring i varsling via Correspondence - ServiceOwnerShortName brukt som avsender av SMS varsel

Endring av avsender i varsel som gjør at SMS-er til sluttbrukere vises nå med tjenesteeier som avsender.

### Hovedadministrator kan administrere lokale roller som han ikke har eller har opprettet selv

Hovedadministrator får nå tilgang til å delegere alle Lokale roller som er opprettet for avgiveren uavhengig av om han har opprettet eller innehar rollen selv.

### Minimering av data som hentes fra FReg

for å ikke hente mer data en vi trenger ble det innført et filter på vår request slik at vi bare henter enkelte felter uten historikk:

•	navn

•	bostedsadresse

•	doedsfall

•	status

•	oppholdsadresse

•	familierelasjon

•	postadresse

•	postadresseIUtlandet

•	sivilstand

•	statsborgerskap

•	identifikasjonsnummer

## Endringer i Autorisasjon

### Endringer i varselmeldingene som blir sendt på mail ved delegering av roller/rettigheter

Teksten i varselmeldinger som blir sendt på mail fra Altinn ved delegering og tilbaketrekking av roller/rettigheter, er blitt oppdatert til å inkludere en liste over rettighetene det gjelder.

## Endringer i REST

### Nytt API for tjenesteeier å kunne delegere rolle på vegne av en bruker i Altinn

Det har dukket opp behov hvor tjenesteeier kan opptre som autorisasjonskilde for spesifikke forhold hvor brukeren selv kanskje ikke har tilgang til Altinn for å utføre delegering. For dette har vi opprette nytt endepunkt på tjenesteeiers REST API, for å kunne gjennomføre delegering av rolle på vegne av en bruker i Altinn.

APIet krever autentisering gjennom maskinporten og tilgang til scopet: altinn:serviceowner/delegations.write

Det er for nå begrenset til delegering av rollen; A0282 - Skatteforhold for privatpersoner, men kan utvides etter hvert som nye behov skulle dukke opp.

Tjenesteeier REST API doc for nytt endepunkt:
POST serviceowner/delegations/roles?onBehalfOf={onBehalfOf}

## Endringer i SBL Bridge API

### Eksponere navn på tjeneste på SBL bridge

For å kunne flytte deler av autorisasjonsløsningen bit for bit til Altinn 3.0 infrastruktur vil det være behov for ytterligere deling av informasjon mellom løsningene, blant annet for tjenestemetadata som tjenestenavn, tjenestekoder, tidsrom tjenesten er aktiv osv.
For dette lager vi ett nytt tjenestemedata endepunkt på det interne SBL Bridge APIet som konsumeres fra Altinn 3.0 Platformen.

## Endringer i DB

### Sanering av elementer i databasen

For å støtte opp om saneringsrutiner i ServiceEngine og ReporteeArchive er det gjort endringer i to prosedyrer og lagt til tre nye prosedyrer.

## Feilrettinger

### Fiks tjenesteeier navn for Patentstyret på Nynorsk

### Fiks i varslingskode for personmakroer


