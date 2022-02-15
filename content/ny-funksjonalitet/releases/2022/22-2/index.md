---
title: 22.2
description: Endringer i skattemeldingen. Forbedringer og feilrettinger
weight: 190
type: releasenote
releasenote_info: Release 22.2. Produksjonssatt 14. februar
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**


## Endringer i SBL

### Forbedring av Dowloadqueue for økt fleksibilitet og logging

Databasestrukturen som ligger til grunn for SAOP-API’et ServiceOwnerExternal.DownloadQueue har blitt forbedret for å redusere databaselast og spesielt databaselåser.

Tidligere var kun elementer nyere enn 30 dager tilgjengelig i DownloadQueue.GetDownloadQueueItems, noe som var et problem i avvikssituasjoner der Tjenesteeiere trengte å få gamle elementer overført på nytt. Denne 30-dagers grensen er fjernet.

GetDownloadQueueItems returnerer fremdeles de 500 eldste elementene i køen, og den eneste måten elementene fjernes fra køen er derved ved kall til PurgeItem. Kall til PurgeItem skal inngå som en del av den normale bruken av tjeneste, etter at man har lastet ned elementene OK, så det burde ikke føre til akkumulering i kø gitt at konsumering av tjenesten er implementert korrekt.

Logging til ServiceOwner.ReporteeArchiveShipmentStatus er innført slik at bruken av DownloadQueue er mer sporbart, og innsendinger via DQ følger samme mønster som elementer som blir pushet til Tjenesteeiere via Batch/Immediate-overføring.

## Endringer i REST

### Endre rolerequirements-API til å vise reelle rettigheter for 3.0-apps

Utvidet operasjonen /api/metadata/rolerequirements til å vise reelle rettigheter for Altinn 3.0 apps.

### Støtte for filtrert avgiverliste for aktører hvor bruker har mottatt tilgang til en gitt Altinn App

Implementere støtte for filtrering på 3.0-apps i serviceowner/reportees-API i Altinn2

Endepunkter for uthenting av avgiverliste er oppdatert både for sluttbruker REST APIet og tjenesteeier REST APIet med støtte for å kunne gjøre filtrert uthenting av bare avgivere hvor brukeren har tilgang til en spesifikk Altinn App.

### Støtte for filtrert utlisting av rettighetshavere som har mottatt tilgang til en gitt Altinn App

Implementere filtrert utlisting av rettighetshavere for 3.0-apps i REST API i Altinn2

Endepunkt for uthenting av rettighetsholdere er oppdatert for sluttbruker REST APIet med støtte for å kunne gjøre filtrert uthenting av bare rettighetsholdere som har tilgang til en spesifikk Altinn App.

## Endringer i skattemeldingen

### Generelt om årets revisjon av skattemeldingen i Altinn 

Hvert år gjøres det oppdateringer og endringer i RF-1030 (skattemeldingen), f.eks. nye poster og underskjema, endring i eksisterende poster, sletting av utgåtte poster og underskjema. Disse oppdateringene gjøres i RF-1030 datamodellen, som tas inn i nye utgaver av tjenestene “RF-1030PSA” og “RF-1030PSAN”. I tillegg oppdateres en rekke satser og tekster, og det gjøres også endringer på bl.a. overførings- og valideringsregler. Nyheter om skattemeldingen vil bli publisert på skatteetaten.no.

I versjonen av RF-1030 for inntektsår 2021 er enkelte deler av løsningen fjernet. Dette med bakgrunn i ny tilgjengelig løsning for skattemeldingen ved SIRIUS, som vil dekke de fleste skattemessige forhold. Sluttbrukere som skal se, endre og levere skattemeldingen vil bli rutet via skatteetaten.no eller Altinn til løsningen Min Skatt som videre ruter sluttbruker til riktig skattemeldingsløsning.

### Hendelsesstyrte dialogbokser med informasjon om ny løsning av skattemeldingen

Dialogbokser som vises både i PSA og PSAN meny avhengig av om sluttbruker skal benytte ny løsning av skattemeldingen på skatteetaten.no eller ikke.

### Næringsrapport skatt

Næringsrapport skatt er fjernet som innsendingsmulighet for inntektsår 2021. I skattemeldingen for formue- og inntektsskatt – personlig næringsdrivende mv (RF-1030) er poster, felt og tekster i løsningen, samt valgt som tidligere fantes på velg næringsoppgave visning fjernet. Ny løsning innføres gradvis, mer informasjon finnes her: https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/Oppdatert.

### Start skatteberegning i skattemeldingen

Start skatteberegning som tidligere har vært tilgjengelig fra «WebSA-meny» og på kvitteringssiden i Skattemelding for formue- og inntektsskatt - lønnstakere og pensjonister mv. (RF-1030), er fjernet. Lenken er endret og ruter sluttbruker til skatteberegning som finnes på skatteeaten.no. 

## Feilrettinger

### Skrivefeil på kvittering for opplastet klientdelegeringsfil når Nynorsk språk er valgt

Det er oppdaget en skrivefeil i en tekst som benyttes på nynorsk på kvitteringen for klientdelegeringer. Denne er rettet.

### Endring av varslingsadresser på slettet enhet.

Det skal nå være mulig å endre kontaktinformasjon på slettede enheter.

### Utbedring av feil i MVC portalen etter oppgradert bootstrap versjon i designsystemet

-	Ekspandering av altinn-app/delegation-scheme beskrivelse var ikke mulig på delegeringskvittering eller BoT oppsummeringsvisningene
-	X-knapp for fjerning søk i søkeboks i lite aktørvalg fjernet da funksjonen ikke fungerer i denne popover visningen

### Innlogging dyplenke med hash fungerte ikke.

En gammel nøkkel var forsvunnet fra altinn.config. Dette medførte at logikk i ReporteeController i altinn portal manipulerte alle url’er i stedet for kun de som gjelder /ui/profile.

### Høyt CPU forbruk

[Role_GetReporteeListByServiceDetails202_SELECT] har vært optimalisert flere ganger. I det siste er det observert nye datakombinasjoner i produksjon som gir svært høyt cpu forbruk i databasen - opp mot 100%. Prosedyren er optimalisert.

### Språkfeil i Altinn

I enkelte tilfeller vises teksten “representerer nå” på engelsk selv om brukeren hadde valgt norsk språk. Dette er nå rettet slik at teksten vises på brukerens valgte portalspråk




