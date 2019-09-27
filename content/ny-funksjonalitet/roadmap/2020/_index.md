---
title: Altinn Roadmap 2020
linktitle: 2020
description: Overordnet roadmap for videreutvikling av Altinn i 2020.
weight: 10
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2020
### Slett data om meg knyttet til gitt samtykke
Det er ønskelig å kunne tilby sluttbruker å be om at all lagret data om sluttbruker skal slettes i forbindelse med at et aktivt samtykke trekkes. Dette vil registreres i Altinn og varsles datakonsument. Datakonsument er selv ansvarlig for å følge opp anmodning om at data slettes. 
### Datakilde kan logge i Altinn at samtykke er benyttet
Som tjenesteeier ønsker jeg å logge tilbake til Altinn at et samtykke er brukt og hvilke data som ble utlevert slik at den som har gitt samtykke er informert om at det er brukt

## Q2 - 2020
### Tilgangsstyring i kunde-leverandør forhold
Ofte leier personer/virksomheter inn andre virksomheter til å utføre oppgaver for seg som innebærer bruk av tjenester i Altinn, f eks bistand på HR eller regnskapsføring.

I dagens Altinn delegerer man da rettighet/rolle til Leverandørens organisasjonsnummer og nøkkelrolleinnehaver hos leverandør (eks daglig leder) får disse på vegne av Kunden. Ofte er det andre ansatte enn daglig leder hos Leverandør som faktisk skal utføre oppgaven for kunden og i dag finnes ingen enkel og oversiktlig måte å kunne delegere dette videre til egne ansatte for Leverandøren. I tillegg er det krevende å følge opp når ansatte hos leverandør slutter eller oppdrag avsluttes.

Med det som utgangspunkt er det ønskelig å lage en bedre løsning for tilgangstyring mellom Kunde og Leverandør som inkluderer en bedre og mer oversiktlig håndtering av tilganger på vegne av kunde. Løsningen vil gjøre det mulig for Leverandør å be Kunde om de tilganger de trenger samt administrere disse til egne ansatte. 

### Erstatte dagens TUL med ny løsning for administrasjon av roller
Roller og autorisasjonstjenester (delegerbare ressurser/lenketjenester) opprettes og administreres fra TUL i dag. TUL skal på sikt erstattes med Altinn studio, det er derfor nødvendig å lage en ny løsning for administrasjon og vedlikehold av roller og autoriasjonsressurser.

## Q3 - 2020
### "Proffversjon" av innboks
For brukere av Altinn som har mye innhold i innboksen og/eller kan representere mange aktører skal det kunne være mulig å tilpasse innboksen slik at den bedre ivaretar behovene for god oversikt over innholdet både i den enkelte innboks, og på tvers av innboksene til flere aktører. Dette vil løses dels gjennom ulike innstillinger som påvirker hva som vises, og dels ved å gjøre søk på tvers av aktører mer fleksibelt.

### Publisering av hendelser på REST-API for tjenesteeier 
Det vil bli mulig å hente ut status på meldinger og varsler ved at det i Altinn publiseres en feed for hendelser. Denne feed vil på sikt erstatte dagens SOAP-operasjoner for meldingshistorikk. Dataene i feeden vil i første omgang ha levetid på 30 dager.
