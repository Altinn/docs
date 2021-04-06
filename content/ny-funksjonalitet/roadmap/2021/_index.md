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

### Data.altinn.no
Støtte Maskinporten-autentisering i egne api-er

### :heavy_check_mark: Varsling sendes hovedenhetens varslingsadresse når underenhet ikke har registrert varslingsadressse
I noen tilfeller så finnes det kontaktinformasjon registrert i KOFUVI på virksomheten men ikke på tilhørende  underenhet. I dag blir det i slike tilfeller ikke sendt ut varsel. 
Dette skal endres slik at varsel skal til hovedenhetens varslingsadresse dersom underenheten ikke har registrert egen varslingsadresse. 

### :heavy_check_mark: Tilby favoritter/alfabetisk visning ved valg av avgiver når man starter tjenste
Endringen gjelder 2.0 tjenester. Når bruker starter en 2.0 tjeneste i dag så må han velge hvilken aktør han skal utføre tjenesten for. Denne visningen skal forbedres og fornyes slik at aktørene viser valgte favoritter samt lister opp aktører alfabetisk, i tillegg til at aktør kan søkes opp. 
 
## Q2 - 2021
### Ta i bruk vergemål som autorisasjonskilde
I forbindelse med at Altinn skal ta i bruk modernisert folkeregister så vil vi få tilgang til opplysninger om hvem som er oppnevnt som verge på vegne av personer satt under vergemål. 

_Vergeroller_
I første omgang vil man kun få oppnevnt 3 ulike typer vergeroller i Altinn.

* "Verge", denne rollen vil i utgangspunktet ikke gi noen rettigheter på vegne av den som er satt under vergemål. Men den som er oppnevnt som verge kan "be om rettighet" fra den han er verge for. Så kan  den som er satt under vergemål gi vergen rettigheten eller vergen kan logge på med kodebrikke/minID til den som er satt under vergemål. 
* "Verge for mindreårig asylsøker eller flykning"

Sivilrettsforvaltningen starter i 2020 et prosjekt "Vergemålsopplysninger integrert i Fullmaktsregister for Innbyggere (FUFINN)". 
De vil gjennom dette prosjketet granulerer og kvalitetssikrer vergemål som er registert hos Fylkesmannen. Dette vil igjen gjøre det mulig å automatisere vergehavers fullmakter og rettighter ytterligere. Altinn vil ta i bruk og tilpasse seg de nye vergerollene etterhvert som de etableres. 

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

### Tilby tilgangsstrying på app-nivå for tjeneste 3.0
Altinn Autorisasjon skal utvikle støtte for tilgangsstyring og autorisering av operasjoner på applikasjoner i Tjenester 3.0.

### :heavy_check_mark: Nødvendige endringer i Altinnknyttet til KS svarut og behandling av meldinger med taushetsbelagt informasjon
For å sikre tilgang til meldinger med sensitiv innhold skal KS benytte Altinn Autorisasjon som informasjonspunkt for å gi tilgang til meldinger på instansnivå. Dette betyr at delegering av tilgang til instanser i innboksen må videreføres ved arkivering av melding. 

### Støtte for å sende digitalt valgkort via Altinn til innbyggere som ikke har DPI
Valgkort skal i 2021 distribueres digitalt til alle innbyggere. For innbyggere som ikke er reservert men som ikke har valgt digital postboks (digipost, eboks) så vil valgkortet sendes til innboksen i Altinn. 

### Tidbegrensning av rettighter og rolle
I dag finnes det mulighet for å angi "gyldig til" tidspunkt for samtykkedelegeringer. Tilsvarende funksjonalitet skal tilbys ved delegering av øvrige rettighter og roller som gir tilgang til å utføre tjenester på vegne av andre. 


## Q3 - 2021
### Publisering av hendelser på REST-API for tjenesteeier 
Det vil bli mulig å hente ut status på meldinger og varsler ved at det i Altinn publiseres en feed for hendelser. Denne feed vil på sikt erstatte dagens SOAP-operasjoner for meldingshistorikk. Dataene i feeden vil i første omgang ha levetid på 30 dager.

### Altinn 3 - Signering
Arbeidsflytstegene utfylling og arkivering vil bli utvidet med nytt signeringssteg.

### Integrasjon mot Advokatregisteret
Altinn skal kobles opp mot Advokatregisteret for å kunne bruke dette som autorisasjonskilde. Formålet er å gi advokater mulighet til enklere å få rettigheter på vegne av sine klienter til å utføre digitale tjenester. 
Altinn skal også legge til rette for videreformidling av informasjon fra advokatregisteret til andre offentlig og private aktører

### Ta i bruk AA registeret for å registerer Ansatt relasjon til virksomhet
AA-registeret (arbeidsgiver- og arbeidstakerregisteret) eies og forvaltes av NAV og er et grunndataregister som gir en oversikt over alle arbeidsforhold i Norge med noen få unntak. AA registeret skal tas i bruk som et hjelpemiddel og forenkling av tilgangsstyring i Altinn. Når vi tar i bruk dette registeret vil vi kunne: 
* gi bedre oversikt over hvem som har tilganger (er vedkommende ansatt/ikke ansatt)

* finne og velge rettighetsmottaker fra en liste over ansatte i stedet for å spørre den ansatte etter fødselsnummer

* gi varsling hvis ansatt slutter

* legge til rette for at ansatte selv kan be om rettigheter

## Q4 - 2021
### Tilgangsstyring i kunde-leverandør forhold
Ofte leier personer/virksomheter inn andre virksomheter til å utføre oppgaver for seg som innebærer bruk av tjenester i Altinn, f eks bistand på HR eller regnskapsføring.

I dagens Altinn delegerer en rettighet/rolle til Leverandørens organisasjonsnummer og nøkkelrolleinnehaver hos leverandør (eks daglig leder). Ofte er det andre ansatte enn daglig leder hos Leverandør som faktisk skal utføre oppgaven for kunden. Det er ingen enkel og oversiktlig måte å kunne delegere dette videre til egne ansatte for Leverandøren. I tillegg er det krevende å følge opp når ansatte hos leverandør skifter jobb.

Det skal etableres en løsning for tilgangstyring mellom Kunde og Leverandør som inkluderer en mer oversiktlig håndtering av tilganger på vegne av kunde. Løsningen vil gjøre det mulig for Leverandør å be Kunde om de tilganger de har behov for. I tillegg skal leverandør kunne administrere disse tilgangene for egne ansatte. 

### Erstatte /api/help med dokumentasjon på Altinn docs
[altinn.no/api/help](https://www.altinn.no/api/help) for REST-APIet skal avvikles. I stedet skal dokumentasjon av REST-APIet legges ut på Altinn docs.
Dette vil blir tilrettelagt gjennom at det skal etableres en offentlig tilgjengelig [OpenAPI 3.0](https://swagger.io/docs/specification/about/)-spesifikasjon
som blir lagt til grunn for å generere dokumentasjon.

Målsetning med endringen er å oppnå bedre dokumentasjon samt enklere vedlikehold av dokumentasjon av REST-API.

### Bytte ut roller med brukerorienterte oppgaver og tilgangsstruktur som begrenser innsyn
Dagens roller i Altinn er forholdsvis store og gir tilgang til mange tjenester. Det skal etableres en rollesturktur hvor det vil bli mulig å gi tilgang avhengig av om mottaker skal ha vide eller mer reduserte fullmakter.

### Integrasjon mot eHelses fullmaktsdatabase 
Gi innbygger oversikt i Altinn over hvilke fullmakter som er registert hos eHelse

### Forenkle og videreutvikle innbyggers oversikt over fullmakter (Q4 - 2021)
En bruker-app med biometrisk pålogging, pushvarsel og som gir enkel tilgang til "mine fullmakter"

### Vise informasjon om rettigheter for Altinn-tjenester i skjemakatalogen i altinn
Når pålogget bruker finner en tjeneste i skjemakatalogen så skal det vises frem hvilke rettigheter bruker har til tjenesten på vegne av valgt avgiver, samt hvem andre som kan utføre denne tjenesten. 