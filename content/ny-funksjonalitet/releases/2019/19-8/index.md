---
title: 19.8
description: Samtykkeforespørsel via REST, oppgradering av eksterne REST API biblioteker, filstørrelse på streaming økt til 500 MB og feilrettinger.
weight: 50
type: releasenote
releasenote_info: Release 19.8, produksjonsatt 26. August 2019
---

## Endringer i Autorisasjon

### Enkeltrettigheter vises ikke på rettighetshaver under “Andre med rettigheter”

Ved introduksjonen av hovedadministrator endringen ble det fjernet det som tilsynelatende var et unødvendig rolleoppslag. Dette kallet er nå gjeninnført da det i praksis er det som autoriserer at alle som har minst en rettighet for en avgiver kan se alle andre rettighetshavere sine rettigheter under “Andre med rettigheter” i profilsiden. Dette kallet er bare nødvendig for de brukerne som ikke direkte er autoriserte Tilgangsstyrere for avgiveren.

## Endringer i SOAP API

### Maks grensen på filer som lastes opp gjennom streaming økt til 500 MB

Endringen gjelder opplasting av vedlegg ved hjelp av tjenester som støtter streaming av større vedlegg. Grensen blir justert opp til 500 MB fra tidligere 200 MB. I tillegg har Altinn økt timeout verdien på de aktuelle operasjonene fra 40 sekunder til 5 minutter. Det bør gi sluttbrukersystemer nok tid til å laste opp de største vedleggene.
Aktuelle operasjoner og endepunkter:

|  Operasjon | Endepunkt URL  |
|---|---|
| SubmitAttachmentStreamed | https://www.altinn.no/IntermediaryExternal/IntermediaryInboundStreamed.svc |
| SubmitAttachmentStreamedBasic | https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasicStreamed.svc |
| SubmitAttachmentStreamedEC | https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalECStreamed.svc |

## Endringer i REST API

### Oppgradering av eksterne biblioteker som REST API er avhengig av

Det har blitt gjort en gjennom gang av alle NuGet pakker som benyttes av REST API applikasjonen. Alle pakker bortsett fra Newtonsoft.Json er blitt oppdatert til siste versjon. mvc til versjon 5.2 og web api til 3.2. Odata oppdatert til versjon 5.8.4. Alle NuGet pakker bortsett fra Newtonsoft.Json er oppgradert til siste versjon.

### Opprette en samtykkeforespørsel via REST API

Denne endringen kommer som en forbedring av eksisterende samtykkeløsning. Istedenfor å sende sluttbruker til samtykkesiden ved hjelp av en url som tar inn mange parameter, vil datakonsument nå kunne registrere en samtykkeforespørsel via REST, for så å sende brukeren til samtykkesiden ved hjelp av en guid. Datakonsument kan dermed opprette en forespørsel og validere denne, slik at risikoen for at sluttbruker blir truffet av feil minsker.
Denne endringen tar for seg følgende:

- Nytt endepunkt i REST (/api/consentRequest) som kun er tilgjengelig ved bruk av gyldig virksomhetssertifikat og api-nøkkel.
- Nye eksterne entiteter: ConsentRequest, ConsentRequestError, ConsentRequestResource
- Nye interne entiteter og enums: AuthorizationRequestBE, AuthorizationRequestResourceBE, AuthorizationRequestErrorBE, AuthorizationRequestType, AuthorizationRequestStatus
- Nye tabeller: AuthorizationRequest, AuthorizationRequestResource, AuthorizationRequestStatus, AuthorizationRequestType
- Tar i bruk ny arkitektur PAP/PIP hvor alt har interfaces
- Unit-tester for hvert lag, samt integrasjonstester ned til database fra SI
- Endepunktene i REST er lagt under FeatureToggle
- Eksisterende kode som denne endringen er avhengig av, er blitt flyttet over på ny arkitektur. De stedene i AuthorizationAdministrationSI som gammel kode hadde sitt opphav fra, kaller PIP/PAP for da eksisterende unit
- tester ikke skal bli påvirket.

Det vil kun være mulighet for å registrere forespørsler nå i første omgang. Endepunktet i portalen som skal benytte seg av en samtykkeforespørsel vil komme i en senere leveranse. Endepunktet støttes for innsendelse av JSON-format. Utfyllende informasjon om hvordan endepunktet kan benyttes finnes på <https://www.altinn.no/api/help>

### Utbedret støtte for HAL på REST grensesnittet for tjenesteeierstyrt rettighetsregister (SRR)

Det er blitt gjort en større jobb for å utbedre application/hal+json og application/hal+xml støtten på /api/serviceowner/srr ressursen. Det er blant annet blitt innført et nytt grensesnitt for å kunne ha komplekse egenskaper på en ressurs uten at egenskapen selv må være en ressurs. Dette er blitt benyttet for å kunne serialisere og deserialisere SrrRightCondition typen som er en egenskap på SrrRight ressursen. Dette gir full støtte for HAL i GET, POST og PUT operasjonene til SRR ressursen. Noe som manglet når SRR først kom i produksjon.
Lenken <https://www.altinn.no/api/serviceowner/help> er oppdatert med riktige eksempler. Her er også modellbeskrivelsene for SrrRight og SrrRightCondition blitt betydelig bedre.

## Diverse feilrettinger

### BrokerServiceBatch filopprydding

 BrokerServiceBatch feilet på grunn av svakhet i kode som rensket opp mappe strukturen filene lagres i. Dette har ført til at enkelte filmapper ikke har blitt ryddet unna samt endel støy i loggene. Feilen som nå er rettet har bare gitt utslag i TT02 miljøet.

### FileCleanupBatch lagde feil for ShipmenResendQueue

FileCleanupBatch ga feil i ShipmentResendQueue fordi FileCleanupBatch sammenlignet gamle filer opp mot ShipmentQueue status uten å gjøre forskjell på store og små bokstaver. Dette gjorde at filer som fortsatt lå i køen kunne bli slettet. Dette er nå rettet.

### Feil under PDF generering

Når et binærvedlegg hadde unikode 255 eller høyere i navnet feilet PDF generering av skjemasettet. Dette kunne føre til problemer ved "PDF til etat" og downloadqueue. Slike tegn blir nå erstattet med spørsmålstegn (?) for å unngå problemet.

### Potensielt manglende elementer i meldingsboksen

Det har vist seg at nylig opprettede elementer i meldingsboksen ikke vises hvis ikke klokkene er perfekt synkronisert mellom port/iweb server og db server. Bakgrunnen er at standard søk i meldingsboksen setter øvre ramme i datointervall til “nå” i stedet for framover i tid.
Dette er endret slik at “to date” i standard søk blir uendelig i stedet for “nå”. I tillegg har man fjernet logikken som endrer søkets “to date” til “nå” hvis verdien er større enn “nå”.

### Feil ved forsøk på å arkivere allerede arkivert melding

Logger i produksjon viste feil når sluttbrukersystem forsøker å arkivere meldinger som allerede er arkivert, noe som skjer ganske ofte. Det vises nå isteden en spesifikk feilmelding når dette blir forsøkt.
