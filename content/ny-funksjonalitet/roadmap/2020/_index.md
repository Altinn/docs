---
title: Altinn Roadmap 2020
linktitle: 2020
description: Overordnet roadmap for videreutvikling av Altinn i 2020
weight: 20
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2020
### :heavy_check_mark: Utfasing av støtte for TLS 1.1 og 1.0
Transport Layer Security (TLS) er kryptografiske protokoller som tilbyr sikker kommunikasjon på Internett.
Støtte for TLS 1.0 og 1.1 skal fjernes for all inngående trafikk til Altinn. Altinn vil kun støtte inngående trafikk basert på TLS 1.2.
Driftsvarsling er sendt ut til tjenesteeiere og sluttbrukersystemleverandører.

Endringen ble utført i TT02 08.10.2019 og PROD den 14.01.2020

### :heavy_check_mark: Sanering i tjenesteeieres arkiv
Tjenesteeier i Altinn kan se elementer som tilhører egen virksomhet i tjenesteeiers arkiv.
Det har blitt gjennomført en revisjon av lagringstid for alle tjenester i dette arkivet i samråd med tjenesteeiere.

Sletting av elementer der lagringstiden er utløpt ble igangsatt for alle tjenester i PROD den 15.01.2020.

### :heavy_check_mark: Støtte for meldinger og skjema med tausehetsbelagt og sensitivt innhold
I dag må alle tjenester knyttes til roller som daglig leder i virksomheten har. Dette resulterer i at daglig leder får automatisk innsyn i alle meldinger som sendes virksomheten. 
Det blir nå mulig å sende meldinger/opprette skjema til virksomheten som ingen i utgangspunktet får innsyn i. Daglig leder eller hovedadministrator kan fortsatt gi tilgang til disse meldingene til utvalgt medarbeider eller seg selv.

Dette ble [levert i release 20.1](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-1/#støtte-for-meldinger-og-skjema-med-taushetsbelagt-og-sensitivt-innhold)

### :heavy_check_mark: Kopi av arkiverte meldinger skal slettes i serviceengine
Vi skal slette kopier av meldinger som ligger i serviceengine. Dette er meldinger som ligger lagret dobbelt, da i serviceengine og i arkiv. Sluttbrukersystemer som henter ut meldinger må derfor ta i bruk nytt grensesnitt; ReporteeArchive.GetArchivedCorrespondence for å hente ut arkiverte meldinger fra Arkiv. Kopier av arkiverte meldinger kan ikke lenger hentes fra serviceengine. I tillegg må eksisterende grensesnitt GetCorrespondenceForEndUserSystemV2 fortsatt anvendes for å hente meldinger fra serviceengine som ikke er arkivert. Mer informasjon finner en under https://altinn.github.io/docs/api/soap/grensesnitt/nye-ec-endepunkter/#ny-operasjon-for-å-hente-arkiverte-meldinger-correspondence 

Når meldinger arkiveres vil kopien i serviceengine databasen slettes fortløpende. Sletting ble igangsatt i TT02 den 02.12.2019 og i PROD den 11.02.2020.

### :heavy_check_mark: Bedre støtte for å hente ut liste over samtykker for tjenesteeier 
Tjenesteeiere trenger å kunne hente ned en liste med hvem som har samtykket til en gitt tjeneste i Altinn. De ønsker en funksjonalitet som lar dem enkelt hente ned ny samtykker og endringer på eksisterende samtykker som har oppstått siden sist listeuthenting.

Dette løses ved å tilby et nytt endepunkt i tjenesteeier APIet. Listen som returneres vil inneholde alle aktive og trukne samtykker som er gitt på en tjeneste. Samtykker som har utløpt vil ikke bli vist. Ved gjentatte kall til endepunktet kan man bruke et parameter slik at bare endringer og nye samtykker siden sist kall blir inkludert i listen."

Dette ble [levert i release 20.2](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-2/#nytt-endpunkt-for-å-hente-ut-samtykker-for-en-tjeneste-via-rest-på-tjenesteeier-apiet)

### :heavy_check_mark: Større fleksibilitet i utforming av fullmakt og samtykke
I dagens løsning for å gi samtykke og fullmakt finnes kun èn mal for hvordan samtykke og formålstekst kan fremstilles for brukeren. Dette gir en del begrensninger i utforming av samtykke- eller fullmaktssiden. Det er ønskelig å kunne tilby mer fleksibilitet i hvordan en forespørsel om samtykke eller fullmakt kan utformes.

Dette ble [levert i release 20.3](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-3/#visning-av-samtykkeforespørsler-i-samtykkepanelet)

### :heavy_check_mark: Gamle webservicegrensesnitt med virksomhetssertifikat slettes
Den høyfrekvente bruken av gamle webservicegrensesnitt med virksomhetssertifikat (EC) resulterer i høyt forbruk av ressurser og hindrer oss i å effektivisere løsningen. Det er viktig at nye grensesnitt (EC2) tas i bruk slik at gamle og ressurskrevende grensesnitt kan fases ut. Mer informasjon om dette finner en på https://altinn.github.io/docs/api/soap/grensesnitt/nye-ec-endepunkter/ og  https://altinn.github.io/docs/api/soap/endepunkter-oversikt/

Denne oppgaven er fullført. 
EC2 grensesntt er tatt i bruk og trafikken på EC har opphørt. De gamle webservicegrensesnittene (EC) ble slettet i TT02 26.11.2019 og i PROD 24.03.2020.


## Q2 - 2020

### :heavy_check_mark: Ytelse og kapasitetsforbedring av Samtykkeløsningen
Økt bruk av samtykkeløsningen krever ytelse- og kapasitetsforbedring.  

Dette ble [levert i release 20.5](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-5/#ytelsesforbedring-av-samtykke)

### :heavy_check_mark: Ytelse og kapasitetsforbedring av Formidlingstjenesten
Prosedyren som benyttes av formidlingstjenesten veksler mellom å være nr1 og nr2 på lista over de prosedyrene som bruker mest ressurser i hele løsningen. Ytelse og kapasitet må forbedres med utgangspunt i forventninger om økt bruk.

Dette ble [levert i release 20.5](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-5/#ytelsesforbedring-av-formidlingstjenesten)


### :heavy_check_mark: Altinn 3
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

Det er nå mulig å sette Altinn 3 applikasjoner i produksjon. Dette ble [levert i release 20.6](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-6/#altinn-3-innføres)


## Q3 - 2020

### :heavy_check_mark: Bedre oversikt over rettigheter
Det blir nå mulig å tilby bruker bedre og mer tilgjengelig oversikt over rettigheter.
Det kan oppleves som vanskelig for sluttbruker å skaffe oversikt hva man selv kan gjøre og hva andre kan gjøre på vegene av valgt aktør.
I tillegg så skal det bli enklere for bruker å skaffe seg tilganger og rettigheter.

Følgende funksjonalitet leveres for å gi bruker bedre oversikt: 

* Mulighet for å be om rettighter. Forespørselen om å få rettigheter ligger i profil hos avgiver helt til tilgangsstyrer godtar eller avslår forespørsel. Det er også mulig å legge ved en melding til tilgangsstyrer som forklarer hvorfor man trenger rettighet og det er mulig å sende varsel til tilgangsstyrer slik at denne blir oppmerksom på forespørsel. En forespørsl om rettighet kan opprettes via portalen eller via [REST for tjenesteeier](/api/tjenesteeiere/rest/autorisasjon/tilgangsforesporsler/)
* Liste over hvem som kan utføre en gitt tjeneste på vegene av valgt aktør. Dette gjør det enklere for tilgangsstyrer å få oversikt og evt fjerne rettighter for de som ikke trenger det. 

Dette ble [levert i release 20.7](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-7/#endringer-i-portal) og [20.8](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-8/#tilgangsstyrer-kan-tilpasse-operasjoner-før-en-tilgangsforespørsel-blir-godkjent)

### :heavy_check_mark:Tilby Maskinportautentisering som alternativ metode for virksomhetssertifikat-autentisering i REST
Altinn har i dag en del API-endepunkter som i dag som krever virksomhetsautentisering. Disse grensesnittene må i dag benyttes med virksomhetssertifikat og ForceEIAuthentication. 
Vi vil fremdeles støttes denne metoden fremover, men vi ønsker i tillegg å tilby [Maskinporten](https://samarbeid.difi.no/felleslosninger/maskinporten) som et alternativ for denne type autentisering. I første omgang tilbys dette på følgende REST-tenester
* Alt under /api/serviceowner
* /api/consentrequest
* /api/delegationrequest 
Det vil også bli lagt til et autoriserings filter som åpner opp for å begrense tilganger for klienten via Maskinporten.
Maskinportautentisering er allerede tatt i bruk for Maskinporten-API og Tjenester 3.0
Endringen ble levert i release 20.7 og 20.8

### :heavy_check_mark: Altinn 3 - Språkhåndtering
Altinn 3 skal være tilgjengelig på brukers valgte språk i Altinn II. Dette gjelder både standardtekster i rammeverket, og støtte for at tjenesteeier kan legge til språkfiler i sin applikasjon. Dette ble levert i release 20.8

### :heavy_check_mark: Oppdatering av Buypass bibliotek
Bibliotek som anvendes i forbindelse med signering på nivå 4 ved bruk av Buypass er oppgradert til nyere versjon. Dette ble [levert i release 20.8](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-8/#buypass-bibliotek-oppgradert)

### :heavy_check_mark: Integrasjon mot Modernisert folkeregister
I forbindelse med opprettelse av nytt [Folkeregister](https://www.skatteetaten.no/person/folkeregister/om/modernisering/) vil Altinn ta i bruk nye API hos Skatteetaten for å hente ut oppdateringer fra Folkeregisteret. Endringene ble [levert i release 20.8](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-8/#forberedelse-til-oppdatert-integrasjon-med-folkeregisteret-freg) og satt i drift den 25.09.2020.

### :heavy_check_mark: Tilby nytt endepunkt hvor vi publiserer de offentlige nøklene som brukes for å signere tokens
For å verifisere signatur i samtykketoken fra Altinn, må man i dag laste ned et offentlig sertifikat og verifisere signatur mot dette. Dette skaper utfordringer ed forvaltning av API’ene som krever samtykke. 
Sertifikat varer ikke evig og må byttes ut, dette skaper tradisjonelt trøbbel i integrasjoner. Ved å tilby et jwks endepunkt kan tjenesteeier selv hente aktuelle offentlige nøkler for å verifisere signatur.  
Endringen ble [levert i release 20.9](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-9)

## Q4 - 2020

### :heavy_check_mark: Data.altinn.no: Flytte ebevis-tjenesten til data.altinn.no 
Frikoble tjenestenavnet "eBevis" fra data.altinn.no for å bedre understøtte kommende tjenester. Nye utviklerportaler kommer på data.altinn.no og test.data.altinn.no. Se nærmere beskrivelse av [data.altinn.no her](https://altinn.github.io/docs/utviklingsguider/data.altinn.no/#innledning)
Produksjonssatt mandag 9.nov 

### :heavy_check_mark: Data.altinn.no: Støtte for maskinporten mot bakenforliggende api-er 
Kunne tilby data fra api-er som benytter maskinporten
Produksjonssatt mandag 9.nov

###  :heavy_check_mark: Data.altinn.no: Rikere autorisasjonsmuligheter 
Støtte alle Altinns autorisasjonsvarianter, samt noen egendefinerte (type virksomhet og andre felter i Enhetsregisteret)
Produksjonssatt mandag 9.nov

###  :heavy_check_mark: Data.altinn.no: Oppdatering av alle rammeverk og Azure-tjenester
Hele den underliggende infrastrukturen oppdateres til siste versjoner
Produksjonssatt mandag 9.nov

###  :heavy_check_mark: Data.altinn.no: Ta i bruk ny samtykkefunksjonalitet i Altinn
Implementere bruk av consentRequests i Altinns REST-api i stedet for bruk av samtykkelenke og samtidig bytte til fullmaktsmaler der det er hensiktsmessig
Produksjonssatt mandag 9.nov

### :heavy_check_mark: Overgang til Fileshare
Det skal legges til rette for at filvedlegg skal kunne flyttes ut av databasen og legges på eget fileshare. Dette må gjøres for å redusere størrelsen på databasen samt øke driftbarhet av løsningen. Dette ble [levert i release 20.10](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-10/#endringer-i-arkitektur-for-håndtering-av-filvedlegg)

### :heavy_check_mark: Markere meldinger i Innboks som "ulest"
I dag vil en melding som er åpnes ikke kunne merkes som ulest senere. Dette gjør det utfordrende for virksomheter som har mange brukere i sin innboks å følge med på om en melding er håndtert eller ikke. En melding som åpnes ved et uhell eller om ikke behandles ferdig vil da kunne merkes som ulest for å håndteres senere. Dette ble [levert i release 20.11](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-11/#sette-meldinger-som-ulest)

### :heavy_check_mark: Støtte for ID-porten-token autentisering på sluttbruker-APIet
Altinn tilbyr OIDC/OAuth2-basert autentisering og autorisasjon for eksterne integrasjoner (f.eks. sluttbrukersystemer) via ID-porten for endepunkter som krever person-autentisering. 
Se https://altinn.github.io/docs/api/rest/kom-i-gang/#autentisering for mer informasjon
Endringen ble [levert i release 20.11](https://altinn.github.io/docs/ny-funksjonalitet/releases/2020/20-11)


### :heavy_check_mark: Data.altinn.no: Støtte for maskinporten-autentisering
Autentisere seg mot data.altinn.no ved hjelp av maskinporten-token

