---
title: Altinn Roadmap 2020
linktitle: 2020
description: Overordnet roadmap for videreutvikling av Altinn i 2020
weight: 10
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2020
### Gamle webservicegrensesnitt skal slettes
Den høyfrekvente bruken av gamle grensesnitt med virksomhetssertifikat resulterer i ustabilitet og hindrer oss i å effektivisere løsningen på vår side. Det er viktig at tempoet i utbredelsen av nye grensesnitt (EC2) hos sluttbrukersystemer økes betydelig. Mer informasjon om dette finner dere på https://altinn.github.io/docs/api/soap/grensesnitt/nye-ec-endepunkter/ og  https://altinn.github.io/docs/api/soap/endepunkter-oversikt/

De gamle webservicegrensesnittene (EC) slettes i TT02 den 25.11.2019 og i PROD den 01.02.2020.

### Meldinger som er arkivert skal slettes fra serviceengine databasen
Vi skal sanere meldinger i serviceengine som ligger lagret dobbelt i både serviceengine og arkiv. Sluttbrukersystemer som henter ut meldinger må derfor ta i bruk nytt grensesnitt ReporteeArchive.GetArchivedCorrespondence for å hente arkiverte meldinger fra Arkiv. I tillegg må eksisterende grensesnitt GetCorrespondenceForEndUserSystemV2 fortsatt anvendes for å hente meldinger fra serviceengine som ikke er arkivert. Mer informasjon finner en under https://altinn.github.io/docs/api/soap/grensesnitt/nye-ec-endepunkter/#ny-operasjon-for-å-hente-arkiverte-meldinger-correspondence 

Når meldingert arkiveres vil de saneres fortløpende i serviceengine databasen i TT02 fra den 25.11.2019 og i PROD fra den 01.02.2020.


### Altinn 3 - Støtte for tjenester uten grafisk brukergrensesnitt
Den nye plattformen Altinn 3 gir økt fleksibilitet for hva slags applikasjoner som kan utvikles. Det skal også legges til rette for at tjenesteeiere kan lage applikasjoner uten å måtte definere et brukergrensesnitt for disse. Dette vil være tjenester som kun er tilgjengelig som API-er. Første bruker av denne funksjonaliteten vil være Sirius-prosjektet i Skatteetaten som vil lage en valideringsapp for bruk mot sluttbrukersystemer.

Planlegges levert i versjon 20.1 den 20. januar

### Håndtering av meldinger og skjema med særlig sensitivt innhold til organisasjoner
I dag må alle tjenester knyttes til roller som daglig leder i virksomheten har. Dette resulterer i at daglig leder får automatisk innsyn i alle meldinger som sendes virksomheten. 
Det blir nå mulig å sende meldinger/opprette skjema til virksomheten som ingen i utgangspunktet får innsyn i. Daglig leder eller hovedadministrator kan fortsatt gi tilgang til disse meldingene til utvalgt medarbeider eller seg selv.

Planlegges levert i versjon 20.2 den 12. februar

### Større fleksibilitet i utforming av fullmakt og samtykke
I dagens løsning for å gi samtykke og fullmakt finnes kun èn mal for hvordan samtykke og formålstekst kan fremstilles for brukeren. Dette gir en del begrensninger i utforming av samtykke- eller fullmaktssiden. Det er ønskelig å kunne tilby mer fleksibilitet i hvordan en forespørsel om samtykke eller fullmakt kan utformes.

Planlegges levert i versjon 20.2 den 12. februar

### Bedre oversikt over rettigheter
Det blir nå mulig å tilby bruker bedre og mer tilgjengelig oversikt over rettigheter.
Det kan oppleves som vanskelig for sluttbruker å skaffe oversikt hva man selv kan gjøre og hva andre kan gjøre på vegene av valgt aktør.

Det skal etableres løsning som gir bruker bedre oversikt over:

* hva jeg har og kan gjøre, dvs "Min oversikt"
* hva andre kan gjøre på vegne av valgt aktør, dvs "tilgangsstyrers oversikt"

Planlegges levert i versjon 20.2 den 12. februar

### Brukerorienterte roller og tilgangsstruktur som begrenser innsyn
Dagens roller i Altinn er forholdsvis store og gir tilgang til mange tjenester. Det skal etableres en rollesturktur hvor det vil bli mulig å gi tilgang avhengig av om mottaker skal ha vide eller mer reduserte fullmakter.

### Datakilde kan logge i Altinn at samtykke er benyttet
Det skal etableres løsning der en registrerer at et samtykke er brukt. Det skal i Altinn være mulig få informasjon om at dette er tatt i bruk samt hvilken informasjon som er utlevert.

### Slett data om meg knyttet til gitt samtykke
Det skal etableres løsning for at sluttbruker skal kunne slette data i forbindelse med at et samtykke trekkes. Dette vil registreres i Altinn og varsles datakonsument. Datakonsument er selv ansvarlig for å følge opp anmodning om at data slettes. 

### Oppgradering av jQuery i portal
jQuery er et JavaScript-bibliotek som benyttes flere steder i Altinn-løsningen. Endringen består i å oppgradere dette til nyeste versjon som blant annet har en del ytelsesforbedringer. Det skal ikke være funksjonelt merkbart at biblioteket blir oppgradert.

### Altinn 3 - Språkhåndtering
Det skal innføres støtte for å velge og bytte språk i Altinn apps.

### Altinn 3 - Finne Tjenester ved søk i innboks/arkiv
Når bruker søker i innboks skal en kunne liste applikasjoner fra Altinn apps. 


## Q2 - 2020
### Tilgangsstyring i kunde-leverandør forhold
Ofte leier personer/virksomheter inn andre virksomheter til å utføre oppgaver for seg som innebærer bruk av tjenester i Altinn, f eks bistand på HR eller regnskapsføring.

I dagens Altinn delegerer en rettighet/rolle til Leverandørens organisasjonsnummer og nøkkelrolleinnehaver hos leverandør (eks daglig leder). Ofte er det andre ansatte enn daglig leder hos Leverandør som faktisk skal utføre oppgaven for kunden. Det er ingen enkel og oversiktlig måte å kunne delegere dette videre til egne ansatte for Leverandøren. I tillegg er det krevende å følge opp når ansatte hos leverandør skifter jobb.

Det skal etableres en løsning for tilgangstyring mellom Kunde og Leverandør som inkluderer en mer oversiktlig håndtering av tilganger på vegne av kunde. Løsningen vil gjøre det mulig for Leverandør å be Kunde om de tilganger de har behov for. I tillegg skal leverandør kunne administrere disse tilgangene for egne ansatte. 

### Altinn 3 - ny løsning for administrasjon av roller
Roller og autorisasjonstjenester (delegerbare ressurser/lenketjenester) opprettes og administreres fra tjenesteutviklingsløsningen Altinn 2/TUL i dag. TUL skal på sikt erstattes med Altinn 3/Altinn studio. Det er derfor nødvendig å lage en ny løsning for administrasjon og vedlikehold av roller og autoriasjonsressurser i Altinn studio.

### Altinn 3 - Signering
Arbeidsflytstegene utfylling og arkivering vil bli utvidet med nytt signeringssteg.

### Altinn 3 - Bedre støtte for applikasjoner med mange elementer
Det skal innføres funksjonalitet for å bedre kunne presentere input-felter, avkryssingsbokser og radioknapper. 

### Erstatte /api/help med dokumentasjon på Altinn docs
[altinn.no/api/help](https://www.altinn.no/api/help) for REST-APIet skal avvikles. I stedet skal dokumentasjon av REST-APIet legges ut på Altinn docs.
Dette vil blir tilrettelagt gjennom at det skal etableres en offentlig tilgjengelig [OpenAPI 3.0](https://swagger.io/docs/specification/about/)-spesifikasjon
som blir lagt til grunn for å generere dokumentasjon.

Målsetning med endringen er å oppnå bedre dokumentasjon samt enklere vedlikehold av dokumentasjon av REST-API.

## Q3 - 2020
### "Proffversjon" av innboks
Brukere som har mye innhold i innboksen eller kan representere mange aktører skal få mulighet å tilpasse innboksen. Dette for at den bedre skal kunne ivareta behovene i den enkelte innboks og på tvers av innboksene til flere aktører. Det vil tilbys muligheter for å sette ulike innstillinger som påvirker hva som vises. I tillegg vil søk på tvers av aktører gjøres mer fleksibelt.

### Publisering av hendelser på REST-API for tjenesteeier 
Det vil bli mulig å hente ut status på meldinger og varsler ved at det i Altinn publiseres en feed for hendelser. Denne feed vil på sikt erstatte dagens SOAP-operasjoner for meldingshistorikk. Dataene i feeden vil i første omgang ha levetid på 30 dager.
