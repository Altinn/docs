---
title: 19.9
description: Utbedret feilmelding hvis TokenValue mangler, endring i visning av rettighetsholders fødselsnummer, feilrettinger.
weight: 40
type: releasenote
releasenote_info: Release 19.9, produksjonssatt 23. september 2019.
---

## Endringer i SOAP API

### Utbedret feilmelding hvis TokenValue mangler

Mangelfull validering av input til SendStandaloneNotification førte til feil hvis TokenValue feltet til en eller flere TextTokens var utelatt. I denne endringen er det innført sjekk av dette med tilhørende feilmelding. Feilmelding One or more TextTokens have an undefined TokenValue.
Aktuelle operasjoner og endepunkter:

|  Operasjon | Endepunkt URL  |
|---|---|
| SendStandaloneNotificationBasic | https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternalBasic.svc |
| SendStandaloneNotificationBasicV2 | https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternalBasic.svc |
| SendStandaloneNotificationBasicV3 | https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternalBasic.svc |
| SendStandaloneNotification | https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternal.svc |
| SendStandaloneNotificationV2 | https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternal.svc |
| SendStandaloneNotificationV3 | https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternal.svc |
| SendStandaloneNotificationECV3 | https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternalEC.svc |
| SendStandaloneNotificationECV3 | https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternalEC2.svc |

## Endringer i REST API

### Endring i visning av rettighetsholders fødselsnummer i /{who}/authorization/delegations

Tidligere har fødselsnummer på rettighetshavere kun vært synlige for delegeringer fra autentisert bruker. Fødselsnummer vises nå i maskert form (010170*****) både for autentisert bruker (“my”) og for andre avgivere. Feltet for e-postadresse er også fjernet. Dette påvirker bare RightHolder-modellen som brukes under /{who}/authorization/delegations, og ikke Reportee-modelen, som brukes i /reportees.

### Forbedrede feilmeldinger ved autentisering av virksomhetssertifikat i REST-API for tjenesteeiere

Det gis nå mer detaljer ved autentiseringsfeil i REST-API ved bruk av virksomhetssertifikat for å lette feilsøking ved onboarding og utvikling.

## Diverse feilrettinger

### Delegering av enkeltrettigheter til org feilet  

Dette er nå rettet.

### Side feilet når man ga samtykke med authorizationCode

Dette er nå rettet.

### Mellomrom i passord

I forrige release utvidet vi tillatte passord med en del tegn, inkludert mellomrom (whitespace). Dette skapte problemer. Mellomrom er derfor ikke lenger tillatt brukt i passord.

### Dupliserte feilmeldinger på ConsentRequest ved bruk av HandledBy

Denne endringen hindrer at dupliserte feilmeldinger kommer med dersom det er noe feil på en ConsentRequest. Det er nå sjekk slik at man bare får en feilmelding og ikke flere like feilmeldinger som tidligere.

### Mulig å omgå maks 70 MB vedleggskontroll i altinn for skjema som har denne begrensningen

Det var tidligere en feil som gjorde at man kunne omgå vedleggskotrollen i Altinn. Dette er nå rettet slik at “Kontroller Skjema” på vedleggsiden nå validerer for vedlegg slik at begrensningen på 70 MB opprettholdes.

### Tilgangsstyrer for virksomhet for ikke slettet enkeltrettigheter delegert til virksomheten fra andre

I [19.8](../19-8)ble det utbedret en feil som førte til at det bare var autorisert tilgangstyrer for en avgiver som fikk sett enkeltrettigheter på en rettighetsinnehaver under “Andre med rettigheter” i profilsiden.
I etterkant er det nå utbedret feil hvor bare tilgangstyrer for avgiver fikk slettet enkeltrettigheter gitt til en rettighetsinnehaver. Når rettighetsinnehaver er en virksomhet skal alle med Tilgangsstyring for virksomheten kunne trekke enkeltrettigheter gitt til virksomheten fra andre.

### Altinn sendte ut feil mime type

Riktig mimetype sendes nå ut i http headeren når man laster ned en fil fra Altinn.
