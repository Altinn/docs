---
title: "22.12"
description: Mindre forbedringer og feilrettinger
weight: 90
type: releasenote
releasenote_info: Release 22.12. Produksjonssatt 19. desember
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i SBL

### Oppgradering av serverolle BATCH

 Det er utført en oppgradering av operativsystemet for serverrolle BATCH fra Windows Server 2012R2 til 2019. Denne rollen brukes til mange applikasjonsnære jobber, samt enkelte synkroniseringsjobber mot eksterne parter og register. Denne endringen er drevet av ny transportinfrastruktur i DPI, der Altinn nå vil kunne integrere seg mot nye REST-endepunkt. Windows Server 2012R2 støttet ikke nødvendige moderne krypteringsalgoritmer som dette krevde. Endringen vil ellers ikke være merkbar for brukere av Altinn. Nødvendig funksjonalitet ble implementert i release 22.7, men feature togglet av. Denne feature toggle blir nå skrudd på.

## Endringer i SBL Bridge API

### Utvidet Bridge med API for å hente roller som gir tilgang til å delegere

Det er gjort endringer i SBL-bridge i Altinn2 slik at Altinn3 kan hente ut informasjon om hva en Hovedadministrator har anledning til å administrere på vegne av en virksomhet. Endringen er del av leveransen knyttet til å migrere tjenestetypen "delegerbare API ressurser" fra Altinn2 til Altinn3, se https://docs.altinn.studio/technology/solutions/altinn-platform/authorization/migration/servicemigrationplan/#delegerbare-api-ressurser

## Endringer i MaskinPorten

### Overfører Delegeringer av Maskinporten Delegation Schemes til altinn 3.0

Eksportering av delegeringer utført på Delegation Schemes.

## Feilrettinger

### Skrivefeil aktivitetsloggen

Rettet skrivefeil i Aktivitetsloggen for meldinger. 

### Feil firma opplysninger i COO skjema

På grunn av en feil i Altinn så kan preutfylt informasjon om juridisk enhet bli utfylt med informasjon om gammel juridisk enhet eller ikke bli preutfylt i det hele tatt. Dette er nå rettet.

### Feil på useServiceOwnerShortNameAsSenderOfSms

Ved innsending av en Correspondence med varsel for en etat som har definert ShortName i ServiceOwner tabellen i ServiceEngine, så ble ikke etatens shortname brukt selv om man spesifiserte useServiceOwnerShortNameAsSenderOfSms til true i soap requesten som sendes. Dette er nå rettet
