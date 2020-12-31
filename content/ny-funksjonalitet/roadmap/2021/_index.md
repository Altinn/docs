---
title: Altinn Roadmap 2021
linktitle: 2021
description: Overordnet roadmap for videreutvikling av Altinn i 2021.
weight: 10
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2021
### Tilby bruker en liste over "mine oppgaver"
Bruker skal kunne merke meldinger i innboks slik at de inngår i et søk som er unik for bruker. Dette søket vil fremstå som en liste over "mine oppgaver" og den vil kun være tilgjengelig for den enkelte bruker.

### Tidbegrensning av rettighter og rolle
I dag finnes det mulighet for å angi "gyldig til" tidspunkt for samtykkedelegeringer. Tilsvarende funksjonalitet skal tilbys ved delegering av øvrige rettighter og roller som gir tilgang til å utføre tjenester på vegne av andre. 

### Altinn 3 - Støtte for tjenester uten grafisk brukergrensesnitt
Den nye plattformen Altinn 3 gir økt fleksibilitet for hva slags applikasjoner som kan utvikles. Det skal også legges til rette for at tjenesteeiere kan lage applikasjoner uten å måtte definere et brukergrensesnitt for disse. Dette vil være tjenester som kun er tilgjengelig som API-er. Første bruker av denne funksjonaliteten vil være Sirius-prosjektet i Skatteetaten som vil lage en valideringsapp for bruk mot sluttbrukersystemer.

### Data.altinn.no
Støtte Maskinporten-autentisering i egne api-er

### Varsling sendes hovedenhetens varslingsadresse når underenhet ikke har registrert varslingsadressse
I noen tilfeller så finnes det kontaktinformasjon registrert i KOFUVI på virksomheten men ikke på tilhørende  underenhet. I dag blir det i slike tilfeller ikke sendt ut varsel. 
Dette skal endres slik at varsel skal til hovedenhetens varslingsadresse dersom underenheten ikke har registrert egen varslingsadresse. 

### Tilby favoritter/alfabetisk visning ved valg av avgiver når man starter tjenste
Endringen gjelder 2.0 tjenester. Når bruker starter en 2.0 tjeneste i dag så må han velge hvilken aktør han skal utføre tjenesten for. Denne visningen skal forbedres og fornyes slik at aktørene viser valgte favoritter samt lister opp aktører alfabetisk, i tillegg til at aktør kan søkes opp. 
 
## Q2 - 2021
### Ta i bruk vergemål som autorisasjonskilde
I forbindelse med at Altinn skal ta i bruk modernisert folkeregister så vil vi få tilgang til opplysninger om hvem som er oppnevnt som verge på vegne av personer satt under vergemål. 

_Vergeroller_
I første omgang vil man kun få oppnevnt 3 ulike typer vergeroller i Altinn.

* "Verge", denne rollen vil i utgangspunktet ikke gi noen rettigheter på vegne av den som er satt under vergemål. Men den som er oppnevnt som verge kan "be om rettighet" fra den han er verge for. Så kan  den som er satt under vergemål gi vergen rettigheten eller vergen kan logge på med kodebrikke/minID til den som er satt under vergemål. 

* "Økonomisk verge",  denne rollen kan brukes av tjenesteeier til å gi vergehaver tilgang til økonomiske tjenester, hvis tjenesteeier etter vurdering anser at dette er tilstrekkelig representasjonsforhold for sin tjeneste. 

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

### Erstatte dagens samtykke/fullmakts løsning i TUL med en APP i Altinn 3 for å definere generisk autorisasjonsressurs
I dag brukes lenketjenester i TUL for å definere samtykke og fullmakt. Dette skal erstattes av en APP i Altinn 3

### Tilby tilgangsstrying på app-nivå for tjeneste 3.0
Altinn Autorisasjon skal utvikle støtte for tilgangsstyring og autorisering av operasjoner på applikasjoner i Tjenester 3.0.

## Q3 - 2021
### Publisering av hendelser på REST-API for tjenesteeier 
Det vil bli mulig å hente ut status på meldinger og varsler ved at det i Altinn publiseres en feed for hendelser. Denne feed vil på sikt erstatte dagens SOAP-operasjoner for meldingshistorikk. Dataene i feeden vil i første omgang ha levetid på 30 dager.

### Datakilde kan logge i Altinn at samtykke er benyttet
Det skal etableres løsning der en registrerer at et samtykke er brukt. Det skal i Altinn være mulig få informasjon om at dette er tatt i bruk samt hvilken informasjon som er utlevert.

### Slett data om meg knyttet til gitt samtykke
Det skal etableres løsning for at sluttbruker skal kunne slette data i forbindelse med at et samtykke trekkes. Dette vil registreres i Altinn og varsles datakonsument. Datakonsument er selv ansvarlig for å følge opp anmodning om at data slettes. 

### Altinn 3 - Signering
Arbeidsflytstegene utfylling og arkivering vil bli utvidet med nytt signeringssteg.



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
