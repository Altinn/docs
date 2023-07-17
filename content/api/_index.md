---
title: API
description: "Altinns API kan brukes når du for eksempel skal tilby en nettløsning eller app der sluttbrukere logger på for å utføre operasjoner mot Altinn.
             Med APIet kan du lage skjema og meldinger i egen portal og styre hvem som skal ha tilgang til en tjeneste.
             Du kan også bruke APIet i eksterne systemer der du skal integrere deg mot eksisterende tjenester som etater har tilgjengeliggjort."
toc: true
weight: 10
aliases:
- /guides/integrasjon/
- /api/
---
{{% panel %}}
#### Modernisering av Altinn
Altinn skal moderniseres for å sikre brukervennlige, sikre og kostnadseffektive tjenester til innbyggere og næringsliv.

*Det betyr at mange av dagens API i Altinn 2 innen juni 2025 vil erstattes av nye tjenester.
Før du tar i bruk dagens Altinn 2 API bør du undersøke hvilke konsekvenser moderniseringsløpet har for deg.*

Les mer om dette på samarbeidsportalen under [Modernisering av Altinn](https://samarbeid.digdir.no/eformidling/modernisering-av-altinn/1799)
{{% /panel %}}

{{% panel %}}
### Tilgjengelige APIer for tjenesteeiere
[Tjenesteeiere](https://www.altinndigital.no/kom-i-gang/) (offentlig virksomheter som har tjenester på Altinn-plattformen)
får tilgang til en egen del av Altinns REST-API og SOAP-API. APIene som kun er tilgjengelige for tjenesteeiere er beskrevet under [API for tjenesteeiere](/docs/api/api-tjenesteeiere/).
Selv om du er tjenesteeier vil du også kunne ha behov for den åpne delen av Altinns APIer.  
{{% /panel %}}

{{% panel %}}
### Seksjonen gjelder Altinn II
API-beskrivelsene i denne seksjonen handler om API-ene som er tilgjengelige i Altinn II. I Altinn 3 er det nye API-er. Disse er beskrevet i [API-beskrivelser i docs.altinn.studio](https://docs.altinn.studio/teknologi/altinnstudio/altinn-api/)
{{% /panel %}}

## Skal du bruke REST eller SOAP?
De fleste av Altinns tjenester er tilgjengelig via [SOAP API](/docs/api/soap-api), men mye er også tilgjengelig via [REST API](/docs/api/rest-api).
Hvilket API du skal velge avhenger av hva du skal lage.

Altinns REST API gir tilgang til meldingsboks, innsendingstjenester og informasjon om en sluttbruker,
som enten kan være privatperson eller eller personer med roller/rettigheter til å representere en virksomhet.
Du kan sende inn og motta data fra Altinn med REST-APIet, men noen av disse operasjonene er kun støttet av SOAP. 

Som tjenesteeier må du bruke SOAP når du skal hente skjemadata fra Altinn og for å sende forhåndsutfylte skjema, meldinger, formidle filer til bruker eller organisasjon via Altinn.

### Integrasjon mot eksisterende tjenester
For sluttbrukersystemer vil det i all hovedsak være SOAP API som tilbys som integrasjonsgrensesnitt inn mot tjenester som etater har tilgjengeliggjort.
Dokumentasjon som etater har tilgjengeliggjort for sine tjenester finnes på [Webområde for sluttbrukersystemleverandører](https://www.altinndigital.no/produkter/altinn-api-for-datasystem/tjenesteoversikt).

All kommunikasjon mellom et sluttbrukersystem og et tjenesteeiersystem er ivaretatt ved hjelp av tjeneste og integrasjonsplattformen i Altinn.
Dette gjelder uansett om dataflytbehovet er igangsatt fra sluttbruker eller tjenesteeiers side.
Altinn plattformen benytter også data fra offentlige register som for eksempel Folkeregisteret eller Enhetsregisteret til å komplettere de data som flyter mellom aktørene som benytter Altinn. 

![Integrasjonsskisse som viser systemer koblet mot Altinn](integrasjonsskisse.png "Overordnet integrasjonsskisse")

## API-key
Altinns apikey er definert per api og applikasjonstype.

Apikeys som skal brukes i nettløsninger (typisk javascript) bestilles av type 'Nettleserapplikasjon' og må tilknyttes gyldige domener for å slippe gjennom CORS.
Apikeyen blir dermed ingen hemmelighet i så måte, men vil være knyttet opp mot et spesifikt domene.
Det er mulig å tillate flere domener, og i test også "localhost".

Løsninger som kaller Altinns REST-api utenfor nettleser, for eksempel fra backend-applikasjoner, desktop-programmer eller mobilapps bruker apikey av typen "Annet" i bestillingsskjemaet
inntil skjemaet blir oppdatert. Dette gjelder uavhengig av om det er apikey som kaller sluttbrukerdelen av api-et eller tjenesteeierdelen.

## Formater
Integrasjon i Altinn gjennom filbasert integrasjon eller web services er nesten utelukkende basert på bruk av XML.
XML-spesifikasjonene som benyttes er enten definert som standardformater av Altinn for å integrere mot spesifikk funksjonalitet i løsningen,
XML-spesifikasjoner er tilgjengeliggjort fra offentlige metadatakilder som oppgaveregisteret og SERES, eller tjenesteeiers egne spesifikasjoner.

Eksterne systemer vil bruke disse formatene til å levere eller hente data til og fra Altinn.

## Versjonering

Altinn standardformater som er definert enten for filbasert integrasjon
eller web services benytter versjonering av kontrakter. Versjoneringen
er bygget opp rundt en standard som er mye benyttet av alle større
premissleverandører for spesifikasjoner. Prinsippet går ut på at navnet
på en komponent og entitet i denne er førende for navngiving og deretter
benyttes årstall og måned kontrakten ble generert:

http:<span></span>//www.altinn.no/services/&lt;MainComp&gt;\[/&lt;SubComp&gt;\]/&lt;Year&gt;/&lt;Month&gt;

Et eksempel på dette er:

http:<span></span>//www.altinn.no/services/ServiceEngine/ReporteeElementList/<br>2009/01ReporteeElementList/2009/10

Namespace benyttet i Altinns tjenestekontrakter og XML-spesifikasjoner
(XSD) benytter denne notasjonen for versjonering.

## Binære vedlegg

I Altinn-integrasjoner er muligheten for overføring av binære vedlegg
til/fra løsningen mye benyttet. Siden XML og XML i web services er basis
for standard integrasjon må det benyttes mekanismer som kan bruke XML
som transport for disse data. Altinn tilbyr to muligheter for dette:

-   Base64 koding – Her konverteres det binære vedlegget til en
    tekstbasert streng som lar seg transportere via XML. Base64 benyttes
    i all filbasert integrasjon til/fra Altinn, men er også en av
    valgmulighetene for webtjenester.

## Retningslinjer

### Krav til merking

Merkingen gjelder bruk av Altinn API i web-applikasjoner. Det må komme frem for brukeren at data kommer fra Altinn.

Vi har ikke krav til hvordan teksten skal vises, men den skal være godt synlig for brukeren, når vedkommende tar i bruk eller starter applikasjonen.

### Andre krav
 - Du har ikke lov til å lage tjenester/applikasjoner som framstår som om de er laget av Altinn.
 - Du kan ikke endre på innholdet i data som leveres.
 - Du har ikke lov til å bruke innholdet på nettsider med pornografisk eller rasistisk innhold, eller på nettsider som bryter norsk lov.
 - Se dokumentasjonen for informasjon om autentisering og sikkerhet. Det kreves at  applikasjonsleverandøren fyller ut egenerklæringskjema for bruk av Altinn API.
 - Ved integrasjon av innhold fra Altinn API i andre fødererte portaler er det et krav at brukeren opplyses om bruken av Altinn API og hvilke ressurser i Altinn portalen benytter.

## Kjente feil og mangler
- Det er kun mulig å legge meldinger sendt til organisasjoner i søppelbøtten via REST tjenesten. Pr i dag finnes ikke denne muligheten via Webservice


{{% children description="true" depth="1" %}}
