---
title: 21.1
description: Mindre forbedringer og feilrettinger
weight: 200
type: releasenote
releasenote_info: Release 21.1, produksjonssatt 14. januar 2021
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i portal

### "Andre med rettigheter" panelet
Tidligere når en bruker har fått en rettighet eller rolle har vedkommende også hatt mulighet til å se hvilke andre som har rettigheter for denne personen samt hvilke roller og rettigheter de har.
Denne muligheten er nå fjernet. Panelet “Andre med rettigheter til skjema og tjenester” for privatpersoner vises bare når innlogget bruker har tilgangsstyringsrettigheter for den valgte avgiveren. Denne endringen er også gjort på REST-API.

### Støtte for "be om tilgang" for virksomhetsbrukere
“Be om tilgang” løsningen i Altinn er nå blitt utvidet med støtte for virksomhetsbrukere. Disse har tidligere fått feilmelding om at virksomhetsbrukere ikke kan be om tilgang.

Nå kan også virksomhetsbrukere be om å få rettigheter fra sin egen virksomhet fra under “Skjema og tjenester” i virksomhetens profilside eller ved at det spesifiseres URL parameter ‘CoveredBy=me’ ved lasting be om tilgangsiden (/ui/DelgationRequest).
Det er også åpnet for at virksomhetsbrukere som har en av rollene "Tilgangsstyring", "Hovedadministrator" eller "Klientadministrator" nå kan sende forespørsler på vegne av virksomheten sin til andre. Man kan også behandle innkommende forespørsler til virksomheten tilsvarende som for vanlige brukere med disse rollene.

### Ny knapp under "Skjema og tjenester du har rettigheter til" panelet
Det er nå mulig for den innloggede brukeren å opprette nye tilgangsforespørsler. Disse blir sendt til aktøren man representerer under “Skjema og tjenester du har rettighet til”. 

## Endringer i REST-API
Man kan nå bruke OData-filtrering på GET consentRequests-endepunktet slik at man enklere kan finne frem til de forespørslene man er interessert i.

### Endring på "/api/{who}/authorization/Delegations"
For å støtte opp om endringen i visning av “Andre med rettigheter” panelet i portal har det blitt lagt til ekstra autorisasjon på dette endepunktet. Nå når man gjør oppslag på /delegations vil det i tilfeller hvor “who” er en privatperson nå også kreves at den autentiserte brukeren også har tilgangsstyring for “who”. Man vil i tilfeller hvor det ikke foreligger tilgangsstyringsrettigheter få returnert en 403-kode tilbake.

## Endringer i Autorisasjon

### Mulighet for revisor/regnskaps-medarbeidere å parallellsignere på vegne av revisor/regnskapsfører virksomheten
Det er åpnet for mulighet til å spesifisere i Altinn (gjennom altinn.config verdi) at for en gitt parallellsigneringstjeneste så skal også ansatte som har mottatt gitte klientdelegeringsroller for en klient kunne utføre parallellsignering på vegne av revisor/regnskapfører virksomhet som de representerer for klienten.
Dette krever da at man spesifiserer tjenestekode (vil gjelde alle utgaver) og hvilke klientdelegeringsroller som må være gitt for klienten. Dette må utføres for at ansatt skal få "arve" parallellsigneringsrettighet som er blitt gitt fra klienten til revisor/regskapsfører virksomheten.

### Ny intern API for å tilordne eksterne roller
Ny intern API - InsertExternalRole - kan benyttes for å tildele eksterne roller. Dette skal i første omgang benyttes i Oppgjør etter dødsfall (OED) for å tilordne roller for arvinger opp mot avdød.

## Endringer i tjenesteeiers rettighetsregister

### Utvidet tjenesteeieres rettighetsregister til å støtte ArchiveRead, ArchiveDelete og Sign
Pga. måten vi nå legger opp til å gjøre delegeringer i be-om-tilgang og to-kolonne-versjonen, er det behov for å utvide tjenesteeiers rettighetsregister til å støtte alle operasjoner som kan delegeres av sluttbrukere. Tjenesteeiers rettighetsregister har til nå kun støttet Read, Write og Access. Vi derfor lagt til rettighetene Sign, ArchiveRead og ArchiveDelete slik at tilgangsstyrere for avgivere med tilgang til tjenesten kan delegere disse operasjonene videre.

## Diverse feilrettinger

### Oppdatert Varsling til å ta høyde for re-varsling for varsler levert for SubmitAndInstantiatePrefill
Re-varsling for ABO/Prefill SubmitAndInstantiatePrefill kunne levere varsel, men re-varsling ble ikke automatisk resendt. Prosedyre som henter ut re-varsel er oppdatert til å ta høyde for varsler levert for SubmitAndInstantiatePrefill og sender re-varsling basert på skjema status. (Re-varsling blir ikke sendt for skjema som er blitt levert).

### Feil i metadata API for å hente URL
Det ble avdekket en feil i metadata API som førte til at det ble lagt til en ekstra URL for hvert kall inntil cachen ble refreshet. Det er blitt lagt til en kontroll på om en “self”-link allerede er lagt til for å forhindre dupliseringer.

### BoT avgiver/avsender får seg selv i OfferedBy valg listen
Lagt på filtrering av “OfferedBy valg-listen” slik at valgt avgiver ikke vises i listen.

### Brukere får meldingsboksvalg etter innlogging når bruker skulle blitt sendt rett til samtykkesiden
Etter innlogging i Altinn møter man meldingsboksvalg dersom man har flere avgivere og ikke har spesifisert forhåndsvalgt aktør under avanserte innstillinger i profilsiden.
For noen dyplenker inn til Altinn er det derimot gjort unntak fra visning av dette meldingsboksvalget. Samtykkeløsningen (alle sider under /ui/AccessConsent) er en av disse untakene.
Det har blitt rettet en feil som gjorde at URLer måtte spesifisere / etter /ui/AccessConsent. Altså fikk: /ui/AccessConsent/?UrlParam1=… unntak for meldingsboksvalg, mens: /ui/AccessConsent?UrlParam1=… ikke fikk unntak for meldingsboksvalg.
