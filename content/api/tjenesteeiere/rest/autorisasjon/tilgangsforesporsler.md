---
title: Opprett tilgangsforespørsler for en eller flere tjenester
weight: 500
---
Denne siden beskriver hvordan man kan opprette, hente ut og slette en "Be om tilgang"-forespørsel som inneholder tjenesteeiers tjenester via REST API.

Fra [versjon 20.4](../../../../../ny-funksjonalitet/releases/2020/20-4) ble det 
mulig for tjenesteeier å opprette en "Be om tilgang"-forespørsel som inneholder en eller tjenester eid av tjenesteeier via REST API. 

## Detaljert beskrivelse 
Konseptet "Be om tilgang" ble i slutten av 2019 lansert i Altinn. I første omgang ble dette lansert som en funksjonalitet i portalen, hvor en person som manglet tilstrekkelige rettigheter for å instansiere en tjeneste, ble møtt med en "Be om tilgangs"-knapp. Ved å trykke på denne, ble brukeren sendt til "Be om tilgang"-siden hvor h*n kunne opprette en tilgangssforespørsel for den aktuelle tjenesten. Denne forespørselen ble så sendt til tilgangsstyrer for den aktuelle aktøren.

Nytt i denne funksjonaliteten er at tjenesteeier nå har mulighet for å opprette en "Be om tilgang"-forespørsel via REST-api på vegne av brukeren. Den aktuelle brukeren må likevel innom "Be om tilgang"-siden for å "sende" denne forespørselen videre til tilgangsstyrer. Dette kan nå gjøres ved å laste denne siden ved hjelp av en GUID som tjenesteeier får tilbake når en tilgangssforespørsel er opprettet.

#### For å eksemplifisere dette har vi følgende scenario:

Caset omhandler eksterne portaler hvor sluttbrukere agerer på vegne av andre enn seg selv, og hvor portal-eier ønsker å tilgangsstyre individuelle moduler via rettigheter i Altinn. Dette kan illustreres på følgende vis:

1. Bruker logger inn i ekstern portal hos tjenesteeier
2. Bruker velger å representere sin "virksomhet", og navigerer til en vilkårlig modul
3. Bruker er ikke delegert noen rettigheter i Altinn, og får feilmelding om manglende tilgang, samt knapp med "Be om tilgang"
4. Bruker trykker "Be om tilgang"
5. Tjenesteeier oppretter tilgangsforespørsel på brukerens vegne via tjenesteeier-API for den aktuelle tjenesten, og mottar en GUID som retur
6. Tjenesteeier redirecter bruker til Altinn til URL (basert på guid) med forhåndstutfylt "be om tilgang"-forespørsel (denne forespørselen kan ikke endres)
7. Bruker kan legge ved valgfri tekst ("RequestMessage"), og velge hvem h*n vil sende et varsel til via E-post.
8. Bruker får kvittering på at forespørsel er sendt i Altinn. Klikker "Fortsett", og blir tatt til URL oppgitt i trinn 5.

## Tekniske detaljer
De utfyllende tekniske detaljene finnes under [API-dokumentasjonen på altinn.no](https://www.altinn.no/api/serviceowner/Help)

### API
[GET serviceowner/delegationRequests dokumentasjon](https://www.altinn.no/api/serviceowner/Help/Api/GET-serviceowner-delegationRequests_serviceCode_serviceEditionCode_status[0]_status[1]_continuation)

[GET serviceowner/delegationRequests/{id} dokumentasjon](https://www.altinn.no/api/serviceowner/Help/Api/GET-serviceowner-delegationRequests-id)

[POST serviceowner/delegationRequests dokumentasjon](https://www.altinn.no/api/serviceowner/Help/Api/POST-serviceowner-delegationRequests)

[DELETE serviceowner/delegationRequests/{id} dokumentasjon](https://www.altinn.no/api/serviceowner/Help/Api/DELETE-serviceowner-delegationRequests-id)


### Continuation token 

Det er veldig mange tilgangsforepørsler i Altinn og av ytelseshensyn er det derfor 
anbefalt å bruke `continuation` parameteret ved gjentatte kall. Les mer her: 

[Hvordan bruke continuation token i Altinn](../../continuation-token)