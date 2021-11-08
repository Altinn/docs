---
title: Altinn Roadmap 2021
linktitle: 2021
description: Overordnet roadmap for videreutvikling av Altinn i 2021.
weight: 10
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2021

### Altinn 3 - Støtte for tjenester uten grafisk brukergrensesnitt
Den nye plattformen Altinn 3 gir økt fleksibilitet for hva slags applikasjoner som kan utvikles. Det skal også legges til rette for at tjenesteeiere kan lage applikasjoner uten å måtte definere et brukergrensesnitt for disse. Dette vil være tjenester som kun er tilgjengelig som API-er. Første bruker av denne funksjonaliteten vil være Sirius-prosjektet i Skatteetaten som vil lage en valideringsapp for bruk mot sluttbrukersystemer.

### :heavy_check_mark: Data.altinn.no
Støtte Maskinporten-autentisering i egne api-er

### :heavy_check_mark: Varsling sendes hovedenhetens varslingsadresse når underenhet ikke har registrert varslingsadressse
I noen tilfeller så finnes det kontaktinformasjon registrert i KOFUVI på virksomheten men ikke på tilhørende  underenhet. I dag blir det i slike tilfeller ikke sendt ut varsel. 
Dette skal endres slik at varsel skal til hovedenhetens varslingsadresse dersom underenheten ikke har registrert egen varslingsadresse. 

### :heavy_check_mark: Tilby favoritter/alfabetisk visning ved valg av avgiver når man starter tjenste
Endringen gjelder 2.0 tjenester. Når bruker starter en 2.0 tjeneste i dag så må han velge hvilken aktør han skal utføre tjenesten for. Denne visningen skal forbedres og fornyes slik at aktørene viser valgte favoritter samt lister opp aktører alfabetisk, i tillegg til at aktør kan søkes opp. 
 
## Q2 - 2021

### Altinn 3 - Støtte for meldinger som del av en dialog
Støtte for at tjenesteeier skal kunne sende en melding som del av dialogen med sluttbrukeren i en Altinn 3-applikasjon.

### Altinn 3 - Finne Tjenester ved søk i innboks/arkiv
Når bruker søker i innboks skal en kunne liste applikasjoner fra Altinn apps sammen med treffene fra Altinn 2-innboksen. 

### Altinn 3 - ny løsning for administrasjon av roller
Roller og autorisasjonstjenester (delegerbare ressurser/lenketjenester) opprettes og administreres fra tjenesteutviklingsløsningen Altinn 2/TUL i dag. TUL skal på sikt erstattes med Altinn 3/Altinn studio. Det er derfor nødvendig å lage en ny løsning for administrasjon og vedlikehold av roller og autoriasjonsressurser i Altinn studio.

### Altinn 3 - Bedre støtte for applikasjoner med mange elementer
Det skal innføres funksjonalitet for at tjenester som består av mange input-felter, avkryssingsbokser og radioknapper osv. skal fungere effektivt for bruker ved utfylling i Altinn-portalen.

### "Proffversjon" av innboks
Brukere som har mye innhold i innboksen eller kan representere mange aktører skal få mulighet å tilpasse innboksen. Dette for at den bedre skal kunne ivareta behovene i den enkelte innboks og på tvers av innboksene til flere aktører. Det vil tilbys muligheter for å sette ulike innstillinger som påvirker hva som vises. I tillegg vil søk på tvers av aktører gjøres mer fleksibelt.

### :heavy_check_mark: Nødvendige endringer i Altinnknyttet til KS svarut og behandling av meldinger med taushetsbelagt informasjon
For å sikre tilgang til meldinger med sensitiv innhold skal KS benytte Altinn Autorisasjon som informasjonspunkt for å gi tilgang til meldinger på instansnivå. Dette betyr at delegering av tilgang til instanser i innboksen må videreføres ved arkivering av melding. 

### :heavy_check_mark: Støtte for å sende digitalt valgkort via Altinn til innbyggere som ikke har DPI
Valgkort skal i 2021 distribueres digitalt til alle innbyggere. For innbyggere som ikke er reservert men som ikke har valgt digital postboks (digipost, eboks) så vil valgkortet sendes til innboksen i Altinn. 

## Q3 - 2021
### Publisering av hendelser på REST-API for tjenesteeier 
Det vil bli mulig å hente ut status på meldinger og varsler ved at det i Altinn publiseres en feed for hendelser. Denne feed vil på sikt erstatte dagens SOAP-operasjoner for meldingshistorikk. Dataene i feeden vil i første omgang ha levetid på 30 dager.

### Altinn 3 - Signering
Arbeidsflytstegene utfylling og arkivering vil bli utvidet med nytt signeringssteg.

## Q4 - 2021
### Tilby tilgangsstrying på app-nivå for tjeneste 3.0
Altinn Autorisasjon skal utvikle støtte for tilgangsstyring og autorisering av operasjoner på applikasjoner i Tjenester 3.0.


### Erstatte /api/help med dokumentasjon på Altinn docs
[altinn.no/api/help](https://www.altinn.no/api/help) for REST-APIet skal avvikles. I stedet skal dokumentasjon av REST-APIet legges ut på Altinn docs.
Dette vil blir tilrettelagt gjennom at det skal etableres en offentlig tilgjengelig [OpenAPI 3.0](https://swagger.io/docs/specification/about/)-spesifikasjon
som blir lagt til grunn for å generere dokumentasjon.

Målsetning med endringen er å oppnå bedre dokumentasjon samt enklere vedlikehold av dokumentasjon av REST-API.

### Integrasjon mot Advokatregisteret
Altinn skal kobles opp mot Advokatregisteret for å kunne bruke dette som autorisasjonskilde. Formålet er å gi advokater mulighet til enklere å få rettigheter på vegne av sine klienter til å utføre digitale tjenester. 
Altinn skal også legge til rette for videreformidling av informasjon fra advokatregisteret til andre offentlig og private aktører

### Tilby API for Formidlingstjeneste via REST
I dag er API for Formidlingstjenesten i all hovedsak tilbudt bare via Webservice. Det er ønskelig å kunne tilby tilsvarende tjenester via REST i henhold til design i Swagger: https://app.swaggerhub.com/apis/Altinn/BrokerService/. Releases i 21.12. 
