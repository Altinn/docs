---
title: 18.1
description: Del tilgang, slette delegeringer på instans-nivå, diverse bugfix ...
type: releasenote
releasenote_info: Release 18.1, produksjonssatt 15. januar 2018.
weight: 120
---


## Portal

### Del og gi tilgang
Skjema under utfylling og meldinger med sensitivt innhold kan ikke videresendes på epost fra Altinn til en ekstern mottaker. 
Disse må istedet deles med å sende en lenke til skjema/meldingen som ligger i Altinn og som mottaker da må få tilgang til og logge på for å se.

![Lenke til "Del og gi tilgang"](del-gi-tilgang.png?width=600 "Lenke til \"Del og gi tilgang\"")

![Velg hvem som skal motta varsel](velg-til-hvem.png?width=600 "Velg hvem som skal motta varsel")

Hvis du har delegerbare rettigheter på den instans du ønsker å dele kan du dele skjemaet med andre som ikke allerede har tilgang til det

![Legg til ny person](legg-til-ny.png?width=600 "Legg til ny person")

Det er mulig å skrive personlig melding til den som mottar epost-varsle. Denne er begrenset til 5000 tegn.

![Skriv en personlig melding](skriv-personlig-melding.png?width=600 "Skriv en personlig melding")

Hva som er delt med hvem vil vises i Altinn slik at det er enklere for evt flere å se hva som er delt. Det er kun den som sender/mottar meldingen som ser teksten som ble utformet. 

![Se hva som er sendt i meldingsboksen](se-hva-som-er-sendt.png?width=600 "Se hva som er sendt i meldingsboksen")

Det spores også i aktivitetsloggen hva som er delegert og videresendt. 

### Se og slette delegeringer gjort til andre og meg selv på instans-nivå
Det er nå lettere å se hvem som har fått delegert tilgang på enkeltinstanser av skjema og meldinger. 
Alle kan slette delegeringer gjort til seg selv og tilgangstyrer har også mulighet for å slette delegeringer som er gjort på andre
på instansnivå som er gjort til andre under "andre med rettigheter" i profil. 
Det blir ikke anledning til å slette delegeringer gjort i forbindelse med paralellsignering.

![Se/slett delegeringer på skjema-instans nivå](se-delegeringer-på-skjema-instans.png?width=600 "Se/slett delegeringer på skjema-instans nivå")

### Bedre løsning for oppdatering av varslingsadresser i Altinn for regnskapsfører og revisor 
Det er nå mulig via klientdelegeringsfunksjonalitet å oppdatere kontaktinformasjon for revisor eller regnskapsfører som får tildelt en klientdelegeringsrolle. 
Løsningen støtter å laste opp en fil som inneholder informasjon om rolle, klient og hvem som er mottaker av rollen.
Samme fil kan brukes til å settes epost og telefonnr slik at man kan bruke funksjonaliteten til å sette kontaktinformasjon på brukerne for en gitt klient. Det skal være mulig å sette nye adresser eller endre adresser.
Filen man laster ned med rolleoversikt inneholder epost og sms satt for bruker/klient. Dette gir en oversikt over kontaktadressene for sine ansatte/klienter. 

### Andre mindre forbedringer av innboks
- Vise hele tittel i meldingsboks (14038)
- Endret tilbakemelding ved bestilling av kodebrev (13557)
- Bedre løsning for oppdatering av varslingsadresser i Altinn for regnskapsfører og revisor (12503)
- Meldinger som er lest og/eller bekreftede meldinger ut av gruppen haster i innboksen (15063)
  - Melding med frist uten bekreftelse skal forsvinne fra listen haster i innboksen når den er lest. 
  - Meldng med bekreftelse og frist skal forsvinne fra gruppen haster i innboksen når den er bekreftet mottatt. Det betyr at det ikke er tilstrekkelig at disse bare er lest.
- For brukere med mange meldinger i innboks er det nå mulighet for å sortere på leste elementer i avansert søk (14951)

![Filtrer på meldinger som er åpnet i avansert søk](sorter-på-åpnet.png?width=600 "Filtrer på meldinger som er åpnet i avansert søk")

### Diverse bugfix

- Mangler oversettelse i avansert innstillinger når pålogget med nivå 1 (12197)
- Firmanavn beskjæres i aktivitetesloggen (12687)
- Korrigere lenke som peker henviser til aktørvalg når man kommer til tom boks (13240)
- Gi bedre feilmelding når bruker forsøker å vidresende melding med for stort innhold (13488)
- Lange utskrifter knuttes og kun første side blir med (printfunksjon i IE, Edge og firefox) (13533)
- AdvancedSearch - for 14" screen or less button is misplaced (13655)
- Videresend: Lenke til element i epost tar ikke brukeren til elementet (13734)
- Stort Aktørvalg: Lagt til funksjon som starter søk automatisk når siden lastes med tekst i søkefeltet (13816)
- Økt innrykk for underenheter i liste over aktører som vises i søk på tvers slik at det er enklere å se at de tilhører hovedenhet over (13998)
- Aktørvalg: inaktivere sjekkbokser for underenhet/sletta enheter når bruker starter å skrive noe i søkefelet (14077)
- Korrigert tekst for når samtykke (fjernet sekunder og oppdatert tekst) (14091)
- Vsert ansatt listes opp med rettighet på klient uten at det er tilfelle (usikker) (14260)
- Feil med paralellsignering HELFO-04 (etter 17.2 deploy?) (usikker) (14387)
- Lange navn i rettighetsknapper får scrollbar (14451)
- Ved valg av "alle, inkludert underenheter" i søk på tvers skjules aktørlisten (14418)
- Samtykke: manglende sjekk for unicode script tags (usikker) (14641)
- Økt innrykk for underenheter i liste over aktører som vises i søk på tvers slik at det er enklere å se at de tilhører hovedenhet over (13998)
- Ved valget "alle, inkludert underhenther" i søk på tvers skal aktørlisten skjules (14418)
- Sjekk for metadataparametre til samtykke (usikker) (14641)
- Archive - link to "chosen the right party" is linking to loginpage not select reportee  (14691)
- Validring av valgt avgiver for søk på tvers (14720)
- Forbedret visning av knapp i avansert søk (14958)
- Fjernet overflødig lenke til utskriftsversjon fra visning av correspondence på egen url (15050)
- Enkeltrettigheter til virksomheter med virksomhetsbruker skal vises (den vises ikke) (15871)
- Endret timeout fra 5 til 15 minutter samt optimalisert GetRolesForDownload. Denne funksjon blir benyttet ved nedlasting av fil med klientdelegeringer. (Retting i PROD 23. januar) (16364)
- Tillate søk på tvers I ARKIVET når en velger «alle jeg kan rapportere for» der en har flere enn 100 avgivere (Retting i PROD 23. januar) (16353)
- Vise navn på klienter ved klientdelegering (Retting i PROD 23. januar) (16464)




## Eksterne grensesnitt

### Tillate sletting av melding via web service ved å utnytte papirkurv funksjonaliteten (14388)
Som representant for en organisasjon ønsker jeg å kunne slette aktive meldinger ved hjelp av et sluttbrukersystem
Det er lagt til logikk i DeleteCorrespondence som gjør at en melding til en organisasjon flyttes til papirkurv
istedenfor at det gis feilmelding om at elementet ikke kan slettes.

Det er fortsatt sperret for å permanent slette meldinger hvor avgiver er en organisasjon.
Endringen skal ikke påvirke funksjonalitet relatert til personer eller elementer i arkiv.

### Hente ut pdf av spesifikke skjema via DQ (12621)

- Det blir nå mulig å hente ut pdf av spesifikke skjema i et skjemasett via DQ og REST API. 
- Ved å legge til parameteren dataFormatId og dataFormatVersion kan man filtrere bort uønskede skjemasett.
- For REST API, se `/api/Help/Api/GET-who-Messages-messageId-Print_language`
- For DQ, se `/ArchiveExternal/DownloadQueueExternalBasic.svc`

### Støtte for reserverte brukere i instansiering av prefill (12617)
Tjenesteeier har nå støtte for å hensynta reserverte brukere i instansiering av prefill fra eksterne systemer
Det er blitt lagt inn logikk som gjør det mulig for tjenesteeier å angi at Altinn skal respektere en persons reservasjon mot
elektronisk kommunikasjon. Altinn benytter i denne sammenheng kontakt- og reservasjonsregisteret.
Default oppførsel er at Altinn ikke tar hensyn til en persons reservasjon.
Dette for å opprettholde dagens funksjonalitet for de tjenesteeiere som ikke har implementert støtte for ny funksjonalitet.
Logikken understøttes av et nytt input parameter i operasjonene `SubmitPrefilledFormTasks` og `SubmitAndInstantiatePrefilledFormTask`
på prefill tjenesten mot tjenesteeier.
Feltet ligger på `PrefillFormTask` entiteten og heter `IsReservable`.
Hvis verdien ikke blir satt av tjenesteeier vil logikken behandle den som `false`.
Hvis verdien settes til `true` og sluttbruker er reservert vil Altinn ikke legge inn prefill på personen.
I responsen til tjenesten vil en kvittering indikere at prefill ikke kunne legges inn fordi personen er reservert.

### Hente ut created date via REST API (872)
Som bruker av REST API kan man nå få utskrift av created date for elementer i meldingsboksen.
Det er lagt til et felt kalt CreateDate i alle "message"-ressurser i REST APIet. 

Se f.eks. `/api/my/messages?$orderby=CreatedDate`

### Bekrefte mottatt correspondence via REST API (869)
Som bruker av REST API kan man nå få bekrefte mottatt correspondence. 
PUT of correspondence message with parameter confirm eq true gives "204 - Message has been confirmed" 

### Indeksering av tabell for BrokerService og endring på prosedyre (14873)
Forbedring av ytelse knyttet til tjenesten GetAvailableFiles på Brokerservice (formidlingstjenesten)



## Kontakt og fullmaktsregister for virksomheter - første versjon (13455)
  
Tilpasning består av å:

- lage løsning for lesing av data fra KoFuVi
- batch som henter data 
- tilpasning i GUI for Felles kontaktinformasjon for virksomheten



## Infoportal
18 mindre forbedringer og bugfix i informasjonportalen (de sidene som er tilgjengelige uten pålogging). 

### Ytelsesoptimalisering av forside (14717)

Google PageSpeed ble brukt for å validere forsidens fart.
Ble gjort mange små grep for å få forsiden til å bli mindre og svare raskere

- SVG kompremering
- Egen forside css/js som har kuttet vekk det unødvendige
- små justeringer i head for bedre score gjennom ytelseverktøy som Google PageSpeed

Dagens forside er på 441kb og har blitt redusert ned til 377kb, 15% redusering.

### Søk i skjemakatalogen skal også gi treff på etatsnavnet (13248)

Søkeindeksen ble utvidet med felt for kategori, subkategori og etatsnavn. Feltene kan justeres av redaktørene i søkeadmin.
Feltene må bli lagt inn i søkeadmin for at de skal kunne være relevante i et søk.

### Forbedringer av nyhetsbrevfunksjonalitet - tømming av mottakerliste + retting av autogenering av internlenker (14346)

Det ble lagt inn en slette knapp for alle brukere av en liste (nyhetsbrev eller driftsmeldinger) for å unngå at abonnenter fra Prod ble liggende i testmiljøene.
Nyhetsbrevet konverte ikke interne lenker til absolutt lenker, og ville dermed ikke ledet noe skulle en bruker trykket inn på den.

### Forbedring av sjekk av innloggingsstatus (UU-forbedring) (13349)

Brukeren vil nå bli varslet om inaktivitet på over 30 min ved innlogging,
som vil resultere i en refresh for å unngå at brukere blir logget av backend men ikke frontend.

### Bugfixer infoportal

- UU-forbedring på kode for varselbokser/driftsmeldinger (13770)
- Benytte npm-versjonering for å hente CSS og JS filer inn i epi-løsningen (teknisk forbedring - ikke merkbar) (13397)
- Fargekode-felt i Episerver ved opplasting av hovedillustrasjon til «Starte og drive» / forsideillustrasjon (13398)
- Alt-tekst på de fire ikonene på hjelpesenter (13399)
- Autogenererte nedtrekksfelter på Om skjema med samme titler som ved import (13691)
- Ferdigstilling av rapporten "Artikkel generator" (redaktør-funksjonalitet - ikke merkbart for sluttbruker) (14344)
- Innføre begrensning i mulige blokktyper i driftsmeldingsarkivet (kun merkbart for redaktør) (11212)
- Åpne for lenker i driftsmeldingsfeltet på Om skjema-siden (13341)
- Mulighet for tastatur-navigasjon mellom nivåer i skjemaoversikten (13348)
- Automatisk lukking av sticky-hjelp ved åpning av kontaktskjema (13353)
- Fjerne ekstern lenke-ikon når lenka er et bilde (14346)
- Endre filtype for bilde som brukes ved deling av innhold i Facebook/Twitter (14822)

