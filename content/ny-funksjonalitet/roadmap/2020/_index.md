---
title: Altinn Roadmap 2020
linktitle: 2020
description: Overordnet roadmap for videreutvikling av Altinn i 2020
weight: 10
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2020
### Utfasing av støtte for TLS 1.1 og 1.0
Transport Layer Security (TLS) er kryptografiske protokoller som tilbyr sikker kommunikasjon på Internett.
Støtte for TLS 1.0 og 1.1 skal fjernes for all inngående trafikk til Altinn. Altinn vil kun støtte inngående trafikk basert på TLS 1.2.
Driftsvarsling er sendt ut til tjenesteeiere og sluttbrukersystemleverandører.

Endringen ble utført i TT02 08.10.2019 og planlegges utført i PROD 14.01.2020

### Sanering i tjenesteeieres arkiv
Tjenesteeieres arkiv er der tjenesteeiere i Altinn kan se elementer som tilhører egen virksomhet.
Det skal gjennomføres en revisjon av lagringstid for tjenester i dette arkivet. Det er sendt ut varsel om dette til tjenesteeiere.

Elementer der lagringstiden er utløpt vil slettes fra tjenesteeieres arkiv fortløpende i PROD fra og med 15.01.2020.

### Gamle webservicegrensesnitt skal slettes
Den høyfrekvente bruken av gamle grensesnitt med virksomhetssertifikat resulterer i ustabilitet og hindrer oss i å effektivisere løsningen på vår side. Det er viktig at tempoet i utbredelsen av nye grensesnitt (EC2) hos sluttbrukersystemer økes betydelig. Mer informasjon om dette finner dere på https://altinn.github.io/docs/api/soap/grensesnitt/nye-ec-endepunkter/ og  https://altinn.github.io/docs/api/soap/endepunkter-oversikt/

De gamle webservicegrensesnittene (EC) ble slettet i TT02 26.11.2019. Dette planlegges slettet i PROD 01.02.2020.

### Kopi av arkiverte meldinger skal slettes i serviceengine
Vi skal slette kopier av meldinger som ligger i serviceengine. Dette er meldinger som ligger lagret dobbelt, da i serviceengine og i arkiv. Sluttbrukersystemer som henter ut meldinger må derfor ta i bruk nytt grensesnitt; ReporteeArchive.GetArchivedCorrespondence for å hente ut arkiverte meldinger fra Arkiv. Kopier av arkiverte meldinger kan ikke lenger hentes fra serviceengine. I tillegg må eksisterende grensesnitt GetCorrespondenceForEndUserSystemV2 fortsatt anvendes for å hente meldinger fra serviceengine som ikke er arkivert. Mer informasjon finner en under https://altinn.github.io/docs/api/soap/grensesnitt/nye-ec-endepunkter/#ny-operasjon-for-å-hente-arkiverte-meldinger-correspondence 

Når meldingert arkiveres vil kopien i serviceengine databasen slettes fortløpende. Sletting ble startet i TT02 02.12.2019. Sletting planlegges startet i PROD fra 01.02.2020.

### Håndtering av meldinger og skjema med særlig sensitivt innhold til organisasjoner
I dag må alle tjenester knyttes til roller som daglig leder i virksomheten har. Dette resulterer i at daglig leder får automatisk innsyn i alle meldinger som sendes virksomheten. 
Det blir nå mulig å sende meldinger/opprette skjema til virksomheten som ingen i utgangspunktet får innsyn i. Daglig leder eller hovedadministrator kan fortsatt gi tilgang til disse meldingene til utvalgt medarbeider eller seg selv.

Planlegges levert i versjon 20.2 den 12.02.2020

### Større fleksibilitet i utforming av fullmakt og samtykke
I dagens løsning for å gi samtykke og fullmakt finnes kun èn mal for hvordan samtykke og formålstekst kan fremstilles for brukeren. Dette gir en del begrensninger i utforming av samtykke- eller fullmaktssiden. Det er ønskelig å kunne tilby mer fleksibilitet i hvordan en forespørsel om samtykke eller fullmakt kan utformes.

Planlegges levert i versjon 20.2 den 12.02.2020


### Oppgradering av jQuery i portal
jQuery er et JavaScript-bibliotek som benyttes flere steder i Altinn-løsningen. Endringen består i å oppgradere dette til nyeste versjon som blant annet har en del ytelsesforbedringer. Det skal ikke være funksjonelt merkbart at biblioteket blir oppgradert.


### Altinn 3
Tjeneste 3.0 prosjektet leverer tre nye løsninger som utgjør den nye plattformen Altinn 3:

* **Altinn Studio** anvendes til å utvikle nye container-baserte applikasjoner ("apps"). Denne løsningen vil overta for dagens tjenesteutviklingsløsning (TUL).
* **Altinn Apps** er container-infrastrukturen som vil kjøre og tilgjengeliggjøre applikasjonene for brukerne. Hver organisasjon vil ha sin helt egen infrastruktur.
* **Altinn Platform** vil tilby APIer for felles funksjonalitet som f.eks. registre, grensesnitt, autorisasjon og datalagring.

Vi utvikler smidig og endringer gjøres fortløpende tilgjengelig på https://altinn.studio.

Alle de nye løsningene etableres i public cloud.

![Altinn Studio](studio-arch.png "Altinn 3 i skyen og Altinn 2 on-prem")

1. Utvikler lager applikasjoner i Altinn Studio og migrerer selv til infrastrukturen Altinn Apps i produksjon.
2. I Altinn Apps vil brukere få tilgang til og kunne benytte applikasjonene.
3. Altinn Platform inneholder bl.a. APIer for fellesfunksjoner og data/registre som deles på tvers av alle applikasjoner.
4. Utviklere vil fortsatt kunne utvikle tjenester i Altinn 2 i en periode fremover. Tjenestene utvikles i TUL. Det er kun leverandør som kan migrere disse tjenestene til produksjonsmiljøet (SBL)
5. Brukere går inn på vanlige måte på www.altinn.no, og finner elementer i sin innboks.
   - Når bruker benytter en tjeneste som er utviklet i TUL så vil dette skje på samme måte som tidligere, og denne vil kjøre i sluttbrukerløsningen (SBL).
   - Når bruker benytter en app som er utviklet i Altinn Studio vil den kjøre i sky-infrastrukturen Altinn Apps.  
     Brukerene vil oppleve en annen interaksjon og layout på nye apps vs tjenester som kjører direkte i sluttbrukerløsningen.  
     Skjermbilder og brukergrensesnitt vil oppleves mer moderne og fremtidsrettet i Altinn Apps.

All [kode](https://github.com/Altinn/altinn-studio) og [backlog for utvikling](https://github.com/Altinn/altinn-studio/issues) ligger åpent på GitHub.
Alle kan dermed enkelt [opprette en issue](https://github.com/Altinn/altinn-studio/issues/new/choose), f.eks. bug, spørsmål eller et forbedringsforslag.

De nye løsningene vil eksistere i parallell med dagens TUL og Altinn sluttbrukerløsning (SBL).
Når alle tjenester fra TUL er flyttet over til Altinn Studio vil både TUL og tilhørende funksjonalitet i SBL fases ut.

Mer detaljerte arkitekturtegninger finnes på [docs.altinn.studio](https://docs.altinn.studio), f.eks.
[løsningsarkitektur](https://docs.altinn.studio/architecture/solution/) og
[infrastruktur](https://docs.altinn.studio/architecture/infrastructure/).

Se også https://www.altinndigital.no/studio.

### Altinn 3 - Støtte for tjenester uten grafisk brukergrensesnitt
Den nye plattformen Altinn 3 gir økt fleksibilitet for hva slags applikasjoner som kan utvikles. Det skal også legges til rette for at tjenesteeiere kan lage applikasjoner uten å måtte definere et brukergrensesnitt for disse. Dette vil være tjenester som kun er tilgjengelig som API-er. Første bruker av denne funksjonaliteten vil være Sirius-prosjektet i Skatteetaten som vil lage en valideringsapp for bruk mot sluttbrukersystemer.

### Altinn 3 - Språkhåndtering
Det skal innføres støtte for å velge og bytte språk i Altinn apps.


## Q2 - 2020
### Bedre oversikt over rettigheter
Det blir nå mulig å tilby bruker bedre og mer tilgjengelig oversikt over rettigheter.
Det kan oppleves som vanskelig for sluttbruker å skaffe oversikt hva man selv kan gjøre og hva andre kan gjøre på vegene av valgt aktør.

Det skal etableres løsning som gir bruker bedre oversikt over:

* hva jeg har og kan gjøre, dvs "Min oversikt"
* hva andre kan gjøre på vegne av valgt aktør, dvs "tilgangsstyrers oversikt"

Planlegges levert i versjon 20.2 den 12.02.2020

### Brukerorienterte roller og tilgangsstruktur som begrenser innsyn
Dagens roller i Altinn er forholdsvis store og gir tilgang til mange tjenester. Det skal etableres en rollesturktur hvor det vil bli mulig å gi tilgang avhengig av om mottaker skal ha vide eller mer reduserte fullmakter.


### Altinn 3 - Signering
Arbeidsflytstegene utfylling og arkivering vil bli utvidet med nytt signeringssteg.

### Altinn 3 - Finne Tjenester ved søk i innboks/arkiv
Når bruker søker i innboks skal en kunne liste applikasjoner fra Altinn apps sammen med treffene fra Altinn II-innboksen. 


### Erstatte /api/help med dokumentasjon på Altinn docs
[altinn.no/api/help](https://www.altinn.no/api/help) for REST-APIet skal avvikles. I stedet skal dokumentasjon av REST-APIet legges ut på Altinn docs.
Dette vil blir tilrettelagt gjennom at det skal etableres en offentlig tilgjengelig [OpenAPI 3.0](https://swagger.io/docs/specification/about/)-spesifikasjon
som blir lagt til grunn for å generere dokumentasjon.

Målsetning med endringen er å oppnå bedre dokumentasjon samt enklere vedlikehold av dokumentasjon av REST-API.

## Q3 - 2020
### Datakilde kan logge i Altinn at samtykke er benyttet
Det skal etableres løsning der en registrerer at et samtykke er brukt. Det skal i Altinn være mulig få informasjon om at dette er tatt i bruk samt hvilken informasjon som er utlevert.

### Slett data om meg knyttet til gitt samtykke
Det skal etableres løsning for at sluttbruker skal kunne slette data i forbindelse med at et samtykke trekkes. Dette vil registreres i Altinn og varsles datakonsument. Datakonsument er selv ansvarlig for å følge opp anmodning om at data slettes. 
### Tilgangsstyring i kunde-leverandør forhold
Ofte leier personer/virksomheter inn andre virksomheter til å utføre oppgaver for seg som innebærer bruk av tjenester i Altinn, f eks bistand på HR eller regnskapsføring.

I dagens Altinn delegerer en rettighet/rolle til Leverandørens organisasjonsnummer og nøkkelrolleinnehaver hos leverandør (eks daglig leder). Ofte er det andre ansatte enn daglig leder hos Leverandør som faktisk skal utføre oppgaven for kunden. Det er ingen enkel og oversiktlig måte å kunne delegere dette videre til egne ansatte for Leverandøren. I tillegg er det krevende å følge opp når ansatte hos leverandør skifter jobb.

Det skal etableres en løsning for tilgangstyring mellom Kunde og Leverandør som inkluderer en mer oversiktlig håndtering av tilganger på vegne av kunde. Løsningen vil gjøre det mulig for Leverandør å be Kunde om de tilganger de har behov for. I tillegg skal leverandør kunne administrere disse tilgangene for egne ansatte. 

### Altinn 3 - ny løsning for administrasjon av roller
Roller og autorisasjonstjenester (delegerbare ressurser/lenketjenester) opprettes og administreres fra tjenesteutviklingsløsningen Altinn 2/TUL i dag. TUL skal på sikt erstattes med Altinn 3/Altinn studio. Det er derfor nødvendig å lage en ny løsning for administrasjon og vedlikehold av roller og autoriasjonsressurser i Altinn studio.

### Altinn 3 - Bedre støtte for applikasjoner med mange elementer
Det skal innføres funksjonalitet for at tjenester som består av mange input-felter, avkryssingsbokser og radioknapper osv. skal fungere effektivt for bruker ved utfylling i Altinn-portalen.

### "Proffversjon" av innboks
Brukere som har mye innhold i innboksen eller kan representere mange aktører skal få mulighet å tilpasse innboksen. Dette for at den bedre skal kunne ivareta behovene i den enkelte innboks og på tvers av innboksene til flere aktører. Det vil tilbys muligheter for å sette ulike innstillinger som påvirker hva som vises. I tillegg vil søk på tvers av aktører gjøres mer fleksibelt.

### Publisering av hendelser på REST-API for tjenesteeier 
Det vil bli mulig å hente ut status på meldinger og varsler ved at det i Altinn publiseres en feed for hendelser. Denne feed vil på sikt erstatte dagens SOAP-operasjoner for meldingshistorikk. Dataene i feeden vil i første omgang ha levetid på 30 dager.
