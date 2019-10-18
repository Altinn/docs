---
title: Altinn Roadmap 2019
linktitle: 2019
description: Overordnet roadmap for videreutvikling av Altinn i 2019.
weight: 20
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2019

### :heavy_check_mark: Tilby bruker mulighet til å definere "mine favoritt-aktører" for å lette aktørvalg i pålogging
Tidligere har bruker med mange aktører blitt presentert alle aktører hvor de mest brukte aktørene står øverst. Konseptet "mest brukte aktører" er fjernet og i stedet er det etablert funksjonalitet for å legge til - og fjerne favorittaktører.
Dette ble [levert i release 19.3](../../releases/2019/19-3/#mulighet-for-opprettelse-av-favorittliste).


## Q2 - 2019

### :heavy_check_mark: Nasjonal tjeneste for dokumentasjonsbevis - eBevis
Det er etablert en [løsning](/docs/utviklingsguider/ebevis/) for innhenting av dokumentasjonsbevis fra leverandør.
Denne ble produksjonssatt 4. april, [se artikkel på digi.no](https://www.digi.no/artikler/lover-mindre-pdf-bruk-i-bedriftenes-anbudskonkurranser/463182).

![eBevis arkitektur](https://www.lucidchart.com/publicSegments/view/f3ce06b1-22a8-4b29-9af4-13dbeb258c83/image.png "eBevis")


### :heavy_check_mark: Forenkle administrasjon av lokal rolle med mange rettigheter
Prosessen med å legge til nye tjenester i en lokal rolle er forenklet. I stedet for å måtte legge til en og en tjeneste kan  administrator legge til flere tjenester i en operasjon. Det er også mulig å administrere flere tjenester i samme skjermbilde. Eier av tjenesten vises i søkevinduet slik at det er lettere å velge riktig tjeneste.
Dette ble [levert i release 19.5](../../releases/2019/19-5/#forenkle-prosessen-med-opprettelse-av-lokal-rolle-som-skal-inneholde-mange-rettigheter).


### :heavy_check_mark: Altinn skytjenester
Altinn testmiljø er etablert i sky. Miljøene skal benyttes til å teste tjenester utviklet i Altinn Studio, samt endringer i sluttbrukerløsningen. Dette ble levert i mai 2019.


### :heavy_check_mark: Opprette rolle for hovedadministrator
Det er nå mulig for daglig leder/styrets leder eller tilsvarende rolleinnehaver i Enhetsregisteret å peke ut en eller flere tiltrodde medarbeidere i organisasjonen som hovedadministrator for å håndtere all tilgangsstyring i Altinn på vegne av virksomheten. Disse personene vil kunne delegere roller og rettigheter de selv ikke innehar til andre og til seg selv. Dette gjelder også fremtidige roller og rettigheter som opprettes. Det er også mulig for privatpersoner å utnevne en hovedadministrator på vegne av seg selv.
Dette ble [levert i release 19.6](../../releases/2019/19-6/#innf%C3%B8ring-av-hovedadministrator-rolle-for-virksomheter).


## Q3 - 2019

### :heavy_check_mark: Versjonering av webserviceendepunkter (EC2) med sertifikatautentisering
For å forbedre ytelse og forenkle integrasjoner med bruk av virksomhetssertifikat har det blitt lagt ut nye versjoner av alle EC-endepunkter. 
Endringen består av er utelukkende på konfigurasjonsnivå og skal ikke medføre funksjonelle endringer. Les mer [her](/docs/api/soap/grensesnitt/nye-ec-endepunkter/).

Alle som bruker webserviceer med virksomhetssertfikat mot Altinn bør bytte til de nye endepunktene i løpet av høsten 2019.

Denne endringen ble levert juli 2019


### :heavy_check_mark: Tilby REST grensesnitt for å opprette (persistent) samtykkeforespørsel og oppdatere tjenesteeierstyrt rettighetsregister (SRR)
Det blir nå mulig å ta i bruk en mer robust løsning for å be om - og gi samtykke.

Dagens løsning for å opprette et samtykke benytter url for å sende parametre til en samtykkeside som skal vises for den som skal gi samtykke.
Tjenesteeier må bruke webService for å registre regler knyttet til bruk av samtykke. Denne tjenesten er konstruert slik at det er lett for Tjenesteeier å gjøre feil. 

Med denne endringen tilbys to nye REST-tjenester:

* REST for å opprette samtykkeforespørsel. Aktør som ønsker samtykke kaller en REST-tjeneste med nødvendige parametre for å registrere en samtykkeforespørsel. Altinn returnerer en GUID som senere brukes for å sende bruker videre til samtykkedialogen. 
* REST for å oppdatere tjenesteeierstyrt rettighetsregister (SRR) hvor regler endres ved å sende verdier i en godt definert liste

Dette ble [levert i release 19.8](../../releases/2019/19-8/#endringer-i-rest-api)


### :heavy_check_mark: Ny innlesing av Enhetsregisteret
Følgende skal utføres:

* Tilpasning/utvidelse av [Enhetsregisteret](https://www.brreg.no/om-oss/oppgavene-vare/alle-registrene-vare/om-enhetsregisteret/) i Altinn
* Full re-innlesing av Enhetsregisteret i Altinn

Dette ble utført 29. september


## Q4 - 2019

### Ny brukerdialog for å be om - og gi rettighet
Det blir nå mulig for sluttbruker å "be om tilgang" til en bestemt rolle eller utføre en bestemt tjeneste. En forespørsel vil da gå til de i virksomheten som har administratormyndighet og som kan ta stilling til om rettighet skal innvilges eller ikke. Endringen omfatter ny dialog og brukergrensesnitt som skal brukes for de som ber om rettighet samt for de som skal gi rettighet.

Leveres i versjon 19.10 den 21. oktober

### Oppgradering av Biztalk
Biztalk skal oppgraderes til nyere versjon. Dette er et produkt som anvendes til forsendelse og mottak av data mellom Altinn og tjenesteeiere.
Oppgraderingen planlegges gjennomført slik at eksisterende tjenester ikke skal påvirkes.

Nytt Biztalk Cluster skal tas i bruk 23. oktober

### Sanering i tjenesteeieres arkiv
Tjenesteeieres arkiv er der tjenesteeiere i Altinn kan se elementer som tilhører egen virksomhet.
Det skal gjennomføres en revisjon av lagringstid for tjenester i dette arkivet. Det er sendt ut varsel om dette til tjenesteeiere.

Elementer der lagringstiden er utløpt vil slettes fra tjenesteeieres arkiv fortløpende fra og med 11. november

### Utfasing av støtte for TLS 1.1 og 1.0
Transport Layer Security (TLS) er kryptografiske protokoller som tilbyr sikker kommunikasjon på Internett.
Støtte for TLS 1.0 og 1.1 skal fjernes for all inngående trafikk til Altinn. Altinn vil kun støtte inngående trafikk basert på TLS 1.2.
Driftsvarsling er sendt ut til tjenesteeiere og sluttbrukersystemleverandører.

Planlegges utført 18. november


### Håndtering av meldinger og skjema med særlig sensitivt innhold til organisasjoner
I dag må alle tjenester knyttes til roller som daglig leder i virksomheten har. Dette resulterer i at daglig leder får automatisk innsyn i alle meldinger som sendes virksomheten. 
Det blir nå mulig å sende meldinger/opprette skjema til virksomheten som ingen i utgangspunktet får innsyn i. Daglig leder eller hovedadministrator kan fortsatt gi tilgang til disse meldingene til utvalgt medarbeider eller seg selv.

Planlegges levert i versjon 19.11 den 18. november


### Tilby mer fleksibilitet i utforming av fullmakt og samtykke
I dagens løsning for å gi samtykke og fullmakt finnes kun èn mal for hvordan samtykke og formålstekst kan fremstilles for brukeren. Dette gir en del begrensninger i utforming av samtykke- eller fullmaktssiden. Det er ønskelig å kunne tilby mer fleksibilitet i hvordan en forespørsel om samtykke eller fullmakt kan utformes. Det gjelder tekst og utforming av hoved- og underoverskrifter, kunne lage felles innledning eller avslutning på formålsbeskrivelse, utforming av tekst knyttet til selve fullmakt/samtykketjenesten og benevnelser brukt på knapper og annen funksjonalitet. 


### Tjenester 3.0
Tre nye løsninger skal tas i bruk:

* **Altinn Studio** anvendes til å utvikle nye container-baserte applikasjoner ("apps"). Denne løsningen vil overta for dagens tjenesteutviklingsløsning (TUL).
* **Altinn Apps** er container-infrastrukturen som vil kjøre og tilgjengeliggjøre applikasjonene for brukerne. Hver organisasjon vil ha sin helt egen infrastruktur.
* **Altinn Platform** vil tilby APIer for felles funksjonalitet som f.eks. registre, grensesnitt, autorisasjon og datalagring.

Vi utvikler smidig og endringer gjøres fortløpende tilgjengelig på https://altinn.studio.

Alle de nye løsningene etableres i public cloud.

![Altinn Studio](studio-arch.png "Altinn Studio i skyen")

1. Utvikler lager applikasjoner i Altinn Studio og migrerer selv til infrastrukturen Altinn Apps.
2. I Altinn Apps vil brukere få tilgang til og kunne benytte applikasjonene.
3. Altinn Platform inneholder bl.a. APIer for fellesfunksjoner og data/registre som deles på tvers av alle applikasjoner.
4. Utviklere vil fortsatt kunne utvikle tjenester i TUL i en periode fremover. Det er kun leverandør som kan migrere disse tjenestene til produksjonsmiljøet
5. Brukere går inn på vanlige måte på www.altinn.no, og finner elementer i sin innboks.
   - Når bruker benytter en tjeneste som er utviklet i TUL så vil dette skje på samme måte som tidligere, og denne vil kjøre i sluttbrukerløsningen (SBL).
   - Når bruker benytter en app som er utviklet i Altinn Studio vil den kjøre i sky-infrastrukturen Altinn Apps.  
     Brukerene vil oppleve en annen interaksjon og layout på nye apps vs tjenester som kjører direkte i sluttbrukerløsningen.  
     Skjermbilder og brukergrensesnitt vil oppleves mer moderne og fremtidsrettet i Altinn Apps.

All [kode](https://github.com/Altinn/altinn-studio) og [backlog for utvikling](https://github.com/Altinn/altinn-studio/issues) ligger åpent på GitHub.
Alle kan dermed enkelt [opprette en issue](https://github.com/Altinn/altinn-studio/issues/new/choose), f.eks. bug, spørsmål eller et forbedringsforslag.

De nye løsningene vil eksistere i parallell med TUL og dagens Altinn sluttbrukerløsning (SBL).
Når alle tjenester fra TUL er flyttet over til Altinn Studio vil både TUL og tilhørende funksjonalitet i SBL fases ut.

Mer detaljerte arkitekturtegninger finnes på [docs.altinn.studio](https://docs.altinn.studio), f.eks.
[løsningsarkitektur](https://docs.altinn.studio/architecture/solution/) og
[infrastruktur](https://docs.altinn.studio/architecture/infrastructure/).

Se også https://www.altinndigital.no/studio.

Planlegges levert i versjon 19.12 den 16. desember


### Støtte for tjenester uten grafisk brukergrensesnitt
Siden Tjenester 3.0 gir økt fleksibilitet for hva slags applikasjoner man kan utvikle, vil vi legge til rette for at tjenesteeiere kan lage applikasjoner uten å måtte definere et brukergrensesnitt for disse. Dette vil være tjenester som kun er tilgjengelig som API-er. Første antatte bruker av denne funksjonaliteten vil være Sirius-prosjektet i Skatteetaten som vil lage en valideringsapp for bruk mot sluttbrukersystemer.

Planlegges levert i versjon 19.12 den 16. desember


### Bedre oversikt over rettigheter
Det blir nå mulig å tilby bruker bedre og mer tilgjengelig oversikt over rettigheter.
Det kan oppleves som vanskelig for sluttbruker å skaffe oversikt hva man selv kan gjøre og hva andre kan gjøre på vegene av valgt aktør.

Det skal etableres løsning som gir bruker bedre oversikt over:

* hva jeg har og kan gjøre, dvs "Min oversikt"
* hva andre kan gjøre på vegne av valgt aktør, dvs "tilgangsstyrers oversikt"

Planlegges levert i versjon 19.12 den 16. desember


### Sikkerhet i eOppslag - felles tjeneste fra Maskinporten og Altinn autorisasjon
[Maskinporten](https://www.difi.no/nyhet/2019/09/maskinporten-enklare-deling-av-data) og Altinn Autorisasjon skal sammen gjøre det enklare å dele og bruke data på tvers i offentleg forvalting. Maskinporten sørger for å verifisere identiteten til virksomheter og gi disse riktig tilgang til data som offentlege virksomheter tilbyr via API. 

Løsningen fra Maskinporten skal i samarbeid med Altinn utvides slik at det blir mulig å bruke Altinns autorisasjonsløsning for å delegere tilgang til API (en definert delegerbar ressurs) fra den som har "lov" til å hente data til den som faktisk skal gjøre det.  Et tenkt brukerscenario som skal løses er "Leikanger Kommune har hjemmel til å hente informasjon fra NAV sitt API. Leikanger kommune ønsker at Evry skal bruke APIet for dem."

Løsningen skal også kunne integreres med [API-katalogen](https://fellesdatakatalog.brreg.no/apis) slik at API (definert delegerbar ressurs) er synkronisert på tvers av de tre løsningene. 
Foreslått arkitektur for sikkerhet i eOppslag finnes skissert i Nasjonal Referansearkitektur her: [eOppslag](https://doc.difi.no/nasjonal-arkitektur/nab_referanse_arkitekturer/#_eoppslag). 

Planlegges levert i versjon 19.12 den 16. desember
