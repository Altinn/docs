---
title: 18.1
description: Del tilgang, slette delegeringer på instans-nivå, diverse bugfix ...
weight: 120
---

{{% notice info %}}
NB: Dette er en **fremtidig** release av Altinn.
Funksjonaliteten som beskrives kan ikke tas i bruk ennå, og beskrivelsene er fortsatt under arbeid.
Se [17.3](../../2017/17-3) for siste versjon i prod.
{{% /notice %}}

**Release 18.1, produksjonssettes 15 januar 2018.**

- Portal
  - [Del og gi tilgang](#del-og-gi-tilgang)
  - [Se og slette delegeringer gjort til andre og meg selv på instans-nivå](#se-og-slette-delegeringer-gjort-til-andre-og-meg-selv-på-instans-nivå)
  - [Bedre løsning for oppdatering av varslingsadresser i Altinn for regnskapsfører og revisor](#bedre-løsning-for-oppdatering-av-varslingsadresser-i-altinn-for-regnskapsfører-og-revisor)
  - [Andre mindre forbedringer av innboks](#andre-mindre-forbedringer-av-innboks)
 
- Eksterne grensesnitt
  - [Hente ut pdf av spesifikke skjema via DQ](#hente-ut-pdf-av-spesifikke-skjema-via-dq)
  - [Støtte for reserverte brukere i instansiering av prefill](#støtte-for-reserverte-brukere-i-instansiering-av-prefill)
  - [Hente ut created date via REST API](#hente-ut-created-date-via-rest-api)
  - [Bekrefte mottatt correspondence via REST API](#bekrefte-mottatt-correspondence-via-rest-api)
  - [Tillate sletting av melding via web service ved å utnytte papirkurv funksjonaliteten](#tillate-sletting-av-melding-via-web-service-ved-å-utnytte-papirkurv-funksjonaliteten)
  - [Indeksering av tabell for BrokerService og endring på prosedyre](#indeksering-av-tabell-for-brokerservice-og-endring-på-prosedyre)

- [Kontakt og fullmaktsregister for virksomheter - første versjon](#kofuvi)

- [Diverse feilrettinger](#diverse-bugfix)

- [Infoportal](#infoportal)
    - [Forbedringer](#forbedringer)
    - [Feilrettinger infoportal](#bugfixer-infoportal)


******************************************

## Del og gi tilgang
Skjema under utfylling og meldinger med sensitivt innhold kan ikke videresendes på epost fra Altinn til en ekstern mottaker. 
Disse må istedet deles med å sende en lenke til skjema/meldingen som ligger i Altinn og som mottaker da må få tilgang til og logge på for å se. 
{{<figure src="del-gi-tilgang.png?width=600" title="Lenke til \"Del og gi tilgang\"" >}}
{{<figure src="velg-til-hvem.png?width=600" title="Velg hvem som skal motta varsel" >}}
Hvis du har delegerbare rettigheter på den instans du ønsker å dele kan du dele skjemaet med andre som ikke allerede har tilgang til det
{{<figure src="legg-til-ny.png?width=600" title="Legg til ny person" >}}
Det er mulig å skrive personlig melding til den som mottar epost-varsle. Denne er begrenset til 5000 tegn
{{<figure src="skriv-personlig-melding.png?width=600" title="Skriv en personlig melding" >}}
Hva som er delt med hvem vil vises i Altinn slik at det er enklere for evt flere å se hva som er delt. Det er kun den som sender/mottar meldingen som ser teksten som ble utformet. 
{{<figure src="se-hva-som-er-sendt.png?width=600" title="Se hva som er sendt i meldingsboksen" >}}
Det spores også i aktivitetsloggen hva som er delegert og videresendt. 

## Se og slette delegeringer gjort til andre og meg selv på instans-nivå
Det er nå lettere å se hvem som har fått delegert tilgang på enkeltinstanser av skjema og meldinger. 
Alle kan slette delegeringer gjort til seg selv og tilgangstyrer har også mulighet for å slette delegeringer som er gjort på andre. på instansnivå som er gjort til andre under "andre med rettigheter" i profil.  Det blir ikke anledning til å slette delegeringer gjort i forbindelse med paralellsignering
{{<figure src="se-delegeringer-på-skjema-instans.png?width=600" title="Se/slett delegeringer på skjema-instans nivå" >}}

## Bedre løsning for oppdatering av varslingsadresser i Altinn for regnskapsfører og revisor 
Det er nå mulig via klientdelegeringsfunksjonalitet å oppdatere kontaktinformasjon for revisor eller regnskapsfører som får tildelt en klientdelegeringsrolle. 
Løsningen støtter å laste opp en fil som inneholder informasjon om rolle, klient og hvem som er mottaker av rollen.
Samme fil kan brukes til å settes epost og telefonnr slik at man kan bruke funksjonaliteten til å sette kontaktinformasjon på brukerne for en gitt klient. Det skal være mulig å sette nye adresser eller endre adresser.
Filen man laster ned med rolleoversikt inneholder epost og sms satt for bruker/klient. Dette gir en oversikt over kontaktadressene for sine ansatte/klienter. 

## Andre mindre forbedringer av innboks
- 14038 - Vise hele tittel i meldingsbok](#vise-hele-tittel-i-meldingsboks)
- 13557 - Endret tilbakemelding ved bestilling av kodebrev](#endre-tilbakemelding-ved-bestilling-av-kodebrev)
- 12503 - Bedre løsning for oppdatering av varslingsadresser i Altinn for regnskapsfører og revisor (FA-endring)](#bedre-løsning-for-oppdatering-av-varslingsadresser-i-Altinn-for-regnskapsfører-og-revisor)
- 15063 - Meldinger som er lest og/eller bekreftede meldinger ut av gruppen haster i innboksen
    - Melding med frist uten bekreftelse skal forsvinne fra listen haster i innboksen når den er lest. 
    - Meldng med bekreftelse og frist skal forsvinne fra gruppen haster i innboksen når den er bekreftet mottatt. Det betyr at det ikke er tilstrekkelig at disse bare er lest.
- 14951 - For brukere med mange meldinger i innboks er det nå mulighet for å sortere på leste elementer i avansert søk
{{<figure src="sorter-på-åpnet.png?width=600" title="Filtrer på meldinger som er åpnet i avansert søk" >}}

## Diverse bugfix 
-  12197  - Mangler oversettelse i avansert innstillinger når pålogget med nivå 1
-  12687  - Firmanavn beskjæres i aktivitetesloggen
-  13240  - Korrigere lenke som peker henviser til aktørvalg når man kommer til tom boks
-  13488  - Gi bedre feilmelding når bruker forsøker å vidresende melding med for stort innhold
-  13533  - Lange utskrifter knuttes og kun første side blir med (printfunksjon i IE, Edge og firefox)
-  13655  - AdvancedSearch - for 14" screen or less button is misplaced
-  13734  - Videresend: Lenke til element i epost tar ikke brukeren til elementet
-  13816  - Stort Aktørvalg: Lagt til funksjon som starter søk automatisk når siden lastes med tekst i søkefeltet
-  13998  - Økt innrykk for underenheter i liste over aktører som vises i søk på tvers slik at det er enklere å se at de tilhører hovedenhet over
-  14077  - Aktørvalg: inaktivere sjekkbokser for underenhet/sletta enheter når bruker starter å skrive noe i søkefelet
-  14091  - Korrigert tekst for når samtykke (fjernet sekunder og oppdatert tekst)
-  14260  - Vsert ansatt listes opp med rettighet på klient uten at det er tilfelle (usikker)
-  14387  - Feil med paralellsignering HELFO-04 (etter 17.2 deploy?) (usikker)
-  14451  - Lange navn i rettighetsknapper får scrollbar
-  14418  - Ved valg av "alle, inkludert underenheter" i søk på tvers skjules aktørlisten
-  14641  - Samtykke: manglende sjekk for unicode script tags (usikker)
-  13998  - Økt innrykk for underenheter i liste over aktører som vises i søk på tvers slik at det er enklere å se at de tilhører hovedenhet over
-  14418  - Ved valget "alle, inkludert underhenther" i søk på tvers skal aktørlisten skjules
-  14641  - Sjekk for metadataparametre til samtykke (usikker)
-  14691  - Archive - link to "chosen the right party" is linking to loginpage not select reportee 
-  14720  - Validring av valgt avgiver for søk på tvers
-  14958 userst - Forbedret visning av knapp i avansert søk
-  15050  - Fjernet overflødig lenke til utskriftsversjon fra visning av correspondence på egen url

***************************

## Tillate sletting av melding via web service ved å utnytte papirkurv funksjonaliteten
14388 - Som representant for en organisasjon ønsker jeg å kunne slette aktive meldinger ved hjelp av et sluttbrukersystem
Det er lagt til logikk i DeleteCorrespondence som gjør at en melding til en organisasjon flyttes til papirkurv istedenfor at det gis feilmelding om
at elementet ikke kan slettes. Det er fortsatt spærret for å permanent slette meldinger hvor avgiver er en organisasjon. Endringen skal ikke påvirke
funksjonalitet relatert til personer eller elementer i arkiv.

## Hente ut pdf av spesifikke skjema via DQ
12621  
- Det blir nå mulig å hente ut pdf av spesifikke skjema i et skjemasett via DQ og REST API. 
- Ved å legge til parameteren dataFormatId og dataFormatVersion kan man filtrere bort uønskede skjemasett.
- For REST API, se `/api/Help/Api/GET-who-Messages-messageId-Print_language`
- For DQ, se `/ArchiveExternal/DownloadQueueExternalBasic.svc`

## Støtte for reserverte brukere i instansiering av prefill
12617 - Tjenesteeier har nå støtte for å hensynta reserverte brukere i instansiering av prefill fra eksterne systemer
Det er blitt lagt inn logikk som gjør det mulig for tjenesteeier å angi at Altinn skal respektere en persons reservasjon mot elektronisk kommunikasjon. Altinn benytter i denne sammenheng kontakt- og reservasjonsregisteret. Default oppførsel er at Altinn ikke tar hensyn til en persons reservasjon. Dette for å opprettholde dagens funksjonalitet for de tjenesteeiere som ikke har implementert støtte for ny funksjonalitet.
Logikken understøttes av et nytt input parameter i operasjonene `SubmitPrefilledFormTasks` og `SubmitAndInstantiatePrefilledFormTask` på prefill tjenesten mot tjenesteeier.
Feltet ligger på `PrefillFormTask` entiteten og heter `IsReservable`. Hvis verdien ikke blir satt av tjenesteeier vil logikken behandle den som `false`. Hvis verdien settes til `true` og sluttbruker er reservert vil Altinn ikke legge inn prefill på personen. I responsen til tjenesten vil en kvittering indikere at prefill ikke kunne legges inn fordi personen er reservert.

## Hente ut created date via REST API
872  - Som bruker av REST API kan man nå få utskrift av created date for elementer i meldingsboksen. Det er lagt til et felt kalt CreateDate i alle "message"-ressurser i REST APIet. 

Se f.eks. `/api/my/messages?$orderby=CreatedDate`

## Bekrefte mottatt correspondence via REST API
869 - Som bruker av REST API kan man nå få bekrefte mottatt correspondence. 
PUT of correspondence message with parameter confirm eq true gives "204 - Message has been confirmed" 

## Indeksering av tabell for BrokerService og endring på prosedyre 
14873 - Forbedring av ytelse knyttet til tjenesten GetAvailableFiles på Brokerservice (formidlingstjenesten)

*************************

## Kofuvi
 13455  
Tilpasning består av å: 
- lage løsning for lesing av data fra Kofuvi
- batch som henter data 
- tilpasning i GUI for Felles kontaktinformasjon for virksomheten

**********************

## Infoportal
18 mindre forbedringer og bugfix i informasjonportalen (de sidene som er tilgjengelige uten pålogging). 

### Forbedringer 

 14717 - Ytelsesoptimalisering av forside

Google PageSpeed ble brukt for å validere forsidens fart.
Ble gjort mange små grep for å få forsiden til å bli mindre og svare raskere

- SVG kompremering
- Egen forside css/js som har kuttet vekk det unødvendige
- små justeringer i head for bedre score gjennom ytelseverktøy som Google PageSpeed

Dagens forside er på 441kb og har blitt redusert ned til 377kb, 15% redusering.

 13248  - Søk i skjemakatalogen skal også gi treff på etatsnavnet

Søkeindeksen ble utvidet med felt for kategori, subkategori og etatsnavn. Feltene kan justeres av redaktørene i søkeadmin.
Feltene må bli lagt inn i søkeadmin for at de skal kunne være relevante i et søk.

 14346  - Forbedringer av nyhetsbrevfunksjonalitet - tømming av mottakerliste + retting av autogenering av internlenker

Det ble lagt inn en slette knapp for alle brukere av en liste (nyhetsbrev eller driftsmeldinger) for å unngå at abonnenter fra Prod ble liggende i testmiljøene.
Nyhetsbrevet konverte ikke interne lenker til absolutt lenker, og ville dermed ikke ledet noe skulle en bruker trykket inn på den.

 13349  - Forbedring av sjekk av innloggingsstatus (UU-forbedring)

Brukeren vil nå bli varslet om inaktivitet på over 30 min ved innlogging, som vil resultere i en refresh for å unngå at brukere blir logget av backend men ikke frontend.

### Bugfixer infoportal
-  13770  - UU-forbedring på kode for varselbokser/driftsmeldinger 
-  13397  - Benytte npm-versjonering for å hente CSS og JS filer inn i epi-løsningen (teknisk forbedring - ikke merkbar)
-  13398  - Fargekode-felt i Episerver ved opplasting av hovedillustrasjon til «Starte og drive» / forsideillustrasjon
-  13399  - Alt-tekst på de fire ikonene på hjelpesenter
-  13691  - Autogenererte nedtrekksfelter på Om skjema med samme titler som ved import
-  14344  - Ferdigstilling av rapporten "Artikkel generator" (redaktør-funksjonalitet - ikke merkbart for sluttbruker) 
-  11212  - Innføre begrensning i mulige blokktyper i driftsmeldingsarkivet (kun merkbart for redaktør)
-  13341  - Åpne for lenker i driftsmeldingsfeltet på Om skjema-siden
-  13348  - Mulighet for tastatur-navigasjon mellom nivåer i skjemaoversikten
-  13353  - Automatisk lukking av sticky-hjelp ved åpning av kontaktskjema
-  14346  - Fjerne ekstern lenke-ikon når lenka er et bilde
-  14822  - Endre filtype for bilde som brukes ved deling av innhold i Facebook/Twitter

 


