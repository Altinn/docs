---
title: Altinn Roadmap 2020
linktitle: 2020
description: Overordnet roadmap for videreutvikling av Altinn i 2020.
weight: 10
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2020
### Gamle webservicegrensesnitt skal slettes
Den høyfrekvente bruken av gamle grensesnitt med virksomhetssertifikat resulterer i ustabilitet og hindrer oss i å effektivisere løsningen på vår side. Det er viktig at tempoet i utbredelsen av nye grensesnitt (EC2) økes betydelig. Mer informasjon om dette finner dere på https://altinn.github.io/docs/api/soap/grensesnitt/nye-ec-endepunkter/ og  https://altinn.github.io/docs/api/soap/endepunkter-oversikt/

De gamle webservicegrensesnittene (EC) slettes i TT02 den 25.11.2019 og i PROD den 01.02.2020.

### Meldinger som er arkivert skal slettes fra innboksen
Vi skal sanere meldinger i serviceengine som ligger lagret dobbelt i både serviceengine og arkiv. Sluttbrukersystemer som henter ut meldinger må derfor ta i bruk nytt grensesnitt ReporteeArchive.GetArchivedCorrespondence for å hente arkiverte meldinger fra Arkiv. I tillegg må eksisterende grensesnitt GetCorrespondenceForEndUserSystemV2 fortsatt anvendes for å hente meldinger fra serviceengine som ikke er arkivert. Når meldinger arkiveres vil de slettes kontinuerlig fra serviceengine. Mer informasjon om dette finner dere på https://altinn.github.io/docs/api/soap/grensesnitt/nye-ec-endepunkter/#ny-operasjon-for-å-hente-arkiverte-meldinger-correspondence 

Når meldingert arkiveres vil de saneres fortløpende i serviceengine databasen i TT02 fra den 25.11.2019 og i PROD fra den 01.02.2020

### Brukerorienterte roller og tilgangsstruktur som begrenser innsyn
Dagens roller i Altinn er forholdsvis store og gir tilgang til mange tjenester. Det skal etableres en rollesturktur hvor det vil bli mulig å gi tilgang på ulike nivå av omfang avhengig av om mottaker skal ha vide eller noe mer innsnevrede fullmakter.

### Slett data om meg knyttet til gitt samtykke
Det skal etableres løsning for at sluttbruker skal kunne slette data i forbindelse med at et samtykke trekkes. Dette vil registreres i Altinn og varsles datakonsument. Datakonsument er selv ansvarlig for å følge opp anmodning om at data slettes. 

### Datakilde kan logge i Altinn at samtykke er benyttet
Det skal etableres løsning der en registrerer at et samtykke er brukt. Det skal i Altinn fremgå informasjon slik at den som har gitt samtykke kan få informasjon om at dette er tatt i bruk samt hvilken informasjon som er utlevert.

### Språkhåndtering i Tjenester 3.0
Selv om Tjenester 3.0 teknisk sett støtter at applikasjoner finnes på flere språk, er det i MVP ikke innført støtte for å velge språk eller bytte mellom dem. Dette vil bli lagt til.

### Finne Tjenester 3.0-applikasjoner ved søk i innboks/arkiv
Rett etter lansering vil de instansene en bruker har av applikasjoner fra Tjenester 3.0 ikke dukke opp når brukeren søker i sin(e) innboks(er). Dette vil utbedres.

### Oppgradering av jQuery i portal
jQuery er et JavaScript-bibliotek som benyttes flere steder i Altinn-løsningen. Endringen består i å oppgradere dette til nyeste versjon som blant annet har en del ytelsesforbedringer. Det skal ikke være funksjonelt merkbart at biblioteket blir oppgradert.

## Q2 - 2020
### Tilgangsstyring i kunde-leverandør forhold
Ofte leier personer/virksomheter inn andre virksomheter til å utføre oppgaver for seg som innebærer bruk av tjenester i Altinn, f eks bistand på HR eller regnskapsføring.

I dagens Altinn delegerer man da rettighet/rolle til Leverandørens organisasjonsnummer og nøkkelrolleinnehaver hos leverandør (eks daglig leder) får disse på vegne av Kunden. Ofte er det andre ansatte enn daglig leder hos Leverandør som faktisk skal utføre oppgaven for kunden og i dag finnes ingen enkel og oversiktlig måte å kunne delegere dette videre til egne ansatte for Leverandøren. I tillegg er det krevende å følge opp når ansatte hos leverandør slutter eller oppdrag avsluttes.

Med det som utgangspunkt er det ønskelig å lage en bedre løsning for tilgangstyring mellom Kunde og Leverandør som inkluderer en bedre og mer oversiktlig håndtering av tilganger på vegne av kunde. Løsningen vil gjøre det mulig for Leverandør å be Kunde om de tilganger de trenger samt administrere disse til egne ansatte. 

### Erstatte dagens TUL med ny løsning for administrasjon av roller
Roller og autorisasjonstjenester (delegerbare ressurser/lenketjenester) opprettes og administreres fra TUL i dag. TUL skal på sikt erstattes med Altinn studio, det er derfor nødvendig å lage en ny løsning for administrasjon og vedlikehold av roller og autoriasjonsressurser.

### Signering i Tjenester 3.0
MVP-en av Tjenester 3.0 har en svært enkel arbeidsflyt, der kun arbeidsflytstegene utfylling og arkivering er tilgjengelig. Dette vil bli utvidet med å tilby signeringssteg.

### Bedre støtte for applikasjoner med mange elementer i Tjenester 3.0
Applikasjonene i Tjenester 3.0 er kun tilrettelagt for at alle elementer (input-felter, avkryssingsbokser, radioknapper mm.) skal komme fortløpende i en lang rekke. Når det er behov for mye data vil dette fort kunne bli uoversiktlig. Funksjonalitet for å bedre dette skal innføres.

## Endringer etter Q2 - 2020
### "Proffversjon" av innboks
For brukere av Altinn som har mye innhold i innboksen og/eller kan representere mange aktører skal det kunne være mulig å tilpasse innboksen slik at den bedre ivaretar behovene for god oversikt over innholdet både i den enkelte innboks, og på tvers av innboksene til flere aktører. Dette vil løses dels gjennom ulike innstillinger som påvirker hva som vises, og dels ved å gjøre søk på tvers av aktører mer fleksibelt.


### Publisering av hendelser på REST-API for tjenesteeier 
Det vil bli mulig å hente ut status på meldinger og varsler ved at det i Altinn publiseres en feed for hendelser. Denne feed vil på sikt erstatte dagens SOAP-operasjoner for meldingshistorikk. Dataene i feeden vil i første omgang ha levetid på 30 dager.


### Erstatte /api/help med dokumentasjon på Altinn docs
[altinn.no/api/help](https://www.altinn.no/api/help) for REST-APIet skal avvikles. I stedet skal dokumentasjon av REST-APIet legges ut på Altinn docs.
Dette vil blir tilrettelagt gjennom at det skal etableres en offentlig tilgjengelig [OpenAPI 3.0](https://swagger.io/docs/specification/about/)-spesifikasjon
som blir lagt til grunn for å generere dokumentasjon.

Målsetning med endringen er å oppnå bedre dokumentasjon samt enklere vedlikehold av dokumentasjon av REST-API.
