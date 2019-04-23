---
title: Altinn roadmap 2019
linktitle: 2019
description: Overordnet roadmap for videreutvikling av Altinn i 2019.
weight: 1
---

Overordnet roadmap for videreutvikling av Altinn i 2019.

!["Vei i Brønnøysund"](../vei-i-brønnøysund.jpg)

## Q1 - 2019

### :heavy_check_mark: Tilby bruker mulighet til å definere "mine favoritt-aktører" for å lette aktørvalg i pålogging

I dag får bruker med mange aktører presentert alle aktører hvor de mest brukte aktørene står øverst. Konseptet "mest brukte aktører" skal fjernes og i stedet vil det tilbys funksjonalitet for å legge til - og fjerne favorittaktører.
Dette ble [levert i release 19.3](/docs/releases/2019/19-3/#mulighet-for-opprettelse-av-favorittliste).


## Q2 - 2019

### Altinn skytjenester

Det skal etableres Altinn testmiljø i sky. Miljøene skal benyttes til å teste tjenester utviklet i Altinn Studio, samt endringer i sluttbrukerløsningen.

### Nasjonal tjeneste for dokumentasjonsbevis - eBevis

Det skal etableres en [løsning](/docs/guides/ebevis/) for innhenting av dokumentasjonsbevis fra leverandør.
![NADOBE](https://www.lucidchart.com/publicSegments/view/f3ce06b1-22a8-4b29-9af4-13dbeb258c83/image.png?width=800)

### Forenkle administrasjon av lokal rolle med mange rettigheter

Prosessen med å legge til nye tjenester i en lokal rolle forenkles. I stedet for å måtte legge til en og en tjeneste skal administrator kunne legge til flere tjenester i en operasjon. Det vil også bli mulig å administrere flere tjenester i samme skjermbilde. Eier av tjenesten skal også vises i søkevinduet slik at det er lettere å velge riktig tjeneste.

### Ny innlesing av Enhetsregisteret

Følgende skal utføres:

* Tilpasning/utvidelse av [Enhetsregisteret](https://www.brreg.no/om-oss/oppgavene-vare/alle-registrene-vare/om-enhetsregisteret/) i Altinn
* Full re-innlesing av Enhetsregisteret i Altinn

### Sanering i tjenesteeieres arkiv

Tjenesteeieres arkiv er der tjenesteeiere i Altinn kan se elementer som tilhører egen virksomhet.
Det skal gjennomføres en revisjon av lagringstid for tjenester i dette arkivet. Det er sendt ut varsel om dette til tjenesteeiere.

### Opprette rolle for hovedadministrator

Det blir nå mulig for daglig leder/styrets leder eller tilsvarende rolleinnehaver i Enhetsregisteret å peke ut en eller flere tiltrodde medarbeidere i organisasjonen som hovedadministrator for å håndtere all tilgangsstyring i Altinn på vegne av virksomheten. Disse personene vil kunne delegere roller og rettigheter de selv ikke innehar til andre og til seg selv. Dette gjelder også fremtidige roller og rettigheter som opprettes. 

Det vil også være mulig for privatpersoner å utnevne en hovedadministrator på vegne av seg selv.

### Håndtering av meldinger og skjema med særlig sensitivt innhold til organisasjoner

I dag må alle tjenester knyttes til roller som daglig leder i virksomheten har. Dette resulterer i at daglig leder får automatisk innsyn i alle meldinger som sendes virksomheten. 
Det blir nå mulig å sende meldinger/opprette skjema til virksomheten som ingen i utgangspunktet får innsyn i. Daglig leder eller hovedadministrator kan fortsatt gi tilgang til disse meldingene til utvalgt medarbeider eller seg selv.

### Ny brukerdialog for å be om - og gi rettighet

Det blir nå mulig for sluttbruker å "be om tilgang" til en bestemt rolle eller utføre en bestemt tjeneste. En forespørsel vil da gå til de i virksomheten som har administratormyndighet og som kan ta stilling til om rettighet skal innvilges eller ikke. Endringen omfatter ny dialog og brukergrensesnitt som skal brukes for de som ber om rettighet samt for de som skal gi rettighet.

### Ta i bruk AA registeret for å registrere ansatt relasjon til virksomhet

AA registeret skal tas i bruk som et hjelpemiddel i tilgangsstyring i Altinn. Det blir nå mulig ved bruk av AA-registeret som autorisasjonskilde å forenkle tilgangsstyring ved å: 

* gi bedre oversikt over hvem som har tilganger (er vedkommende ansatt/ikke ansatt)
* finne og velge rettighetsmottaker fra en liste over ansatte i stedet for å spørre den ansatte etter fødselsnummer
* gi varsling hvis ansatt slutter
* legge til rette for at ansatte selv kan be om rettigheter

### Autorisasjon for Tjenester 3.0

Det skal etableres støtte for å kunne autorisere applikasjoner utviklet i Tjenester 3.0.
Altinn Autorisasjon skal forholde seg til Tjenester 3.0 som en ekstern ressurs (på lik linje med andre typer ressurser som skal kunne tilgangsstyres i Altinn). Dette gjør det enklere å introdusere nye typer ressurser.

### Tilby mulighet for å opprette persistent samtykkeforespørsel samt bedre løsning for å oppdatere tjenesteeierstyrt rettighetsregister (SRR)

Det blir nå mulig å ta i bruk en mer robust løsning for å be om - og gi samtykke.

Dagens løsning for å opprette et samtykke benytter url for å sende parametre til en samtykkeside som skal vises for den som skal gi samtykke. Tjenesteeier må bruke webService for å registre regler knyttet til bruk av samtykke. Denne tjenesten er konstruert slik at det er lett for Tjenesteeier å gjøre feil. 

Med denne endringen tilbys to nye REST-tjenester:

* REST for å opprette samtykkeforespørsel. Aktør som ønsker samtykke kaller en REST-tjeneste med nødvendige parametre for å registrere en samtykkeforespørsel. Altinn returnerer en GUID som senere brukes for å sende bruker videre til samtykkedialogen. 
* REST for å oppdatere tjenesteeierstyrt rettighetsregister (SRR) hvor regler endres ved å sende verdier i en godt definert liste


## Q3 - 2019

### Utfasing av støtte for TLS 1.1 og 1.0

Transport Layer Security (TLS) er kryptografiske protokoller som tilbyr sikker kommunikasjon på Internett.
Støtte for TLS 1.0 og 1.1 skal fjernes for all inngående trafikk til Altinn. Altinn vil kun støtte inngående trafikk basert på TLS 1.2.
Driftsvarsling er sendt ut til tjenesteeiere og sluttbrukersystemleverandører.

### Konsolidering av brukere med D-nummer

Et D-nummer er et midlertidig ID-nummer.
Det skal etableres en løsning slik at bruker med [D-nummer](https://www.skatteetaten.no/person/utenlandsk/norsk-identitetsnummer/d-nummer/)
som har fått fødselsnummer skal kunne få tilgang til det som lå i innboks/arkiv på D-nummer samt kunne videreføre en skattedialog som ble startet på D-nummer.

### Oppgradering av Biztalk

Biztalk skal oppgraderes til nyere versjon. Dette er et produkt som anvendes til forsendelse og mottak av data mellom Altinn og tjenesteeiere.
Oppgraderingen planlegges gjennomført slik at eksisterende tjenester ikke skal påvirkes.

### Bedre oversikt over rettigheter

Det blir nå mulig å tilby bruker bedre og mer tilgjengelig oversikt over rettigheter.
Det kan oppleves som vanskelig for sluttbruker å skaffe oversikt hva man selv kan gjøre og hva andre kan gjøre på vegene av valgt aktør.   

Det skal etableres løsning som gir bruker bedre oversikt over hva:

* JEG har og kan gjøre, dvs "Min oversikt"
* andre har og kan gjøre på vegne av valgt aktør, dvs tilgangsstyrers oversikt

### Sikkerhet i eOppslag - felles tjeneste fra Maskinporten og Altinn autorisasjon

Det blir nå mulig å bruke Altinns autorisasjonsløsning for å kunne gi tilgang til andre løsninger utenfor Altinn. 
I samarbeid med DIFI skal Altinn Autorisasjon nå tilby autorisasjonsløsning for tilgangsstyring til trydeopplysninger fra NAV sitt API. 

### Tjenester 3.0

Det vil etableres tre nye løsninger:

1. **Altinn Studio** anvendes til å utvikle nye container-baserte applikasjoner ("apps"). Denne løsningen vil overta for dagens tjenesteutviklingsløsning (TUL).
2. **Altinn Apps** er container-infrastrukturen som vil kjøre og tilgjengeliggjøre applikasjonene for brukerne. Hver organisasjon vil ha sin helt egen infrastruktur.
3. **Altinn Platform** vil tilby APIer for felles funksjonalitet som f.eks. registre, grensesnitt, autorisasjon og datalagring.

Vi utvikler smidig og endringer gjøres fortløpende tilgjengelig på https://altinn.studio.

Alle de nye løsningene etableres i public cloud.
Funksjonalitet for å utvikle en applikasjon og teste den i et testmiljø vil komme i Q2,
og mulighet for å produksjonssette applikasjoner vil komme i Q3.

![Altinn Studio](studio-arch.png?width=800)

1. Tjenesteutvikler utvikler tjenester i Altinnstudio. Tjenesteutvikler migrerer tjenestene selv til Altinn Apps 
2. I Altinn Apps vil sluttbrukere få tilgang til og kunne arbeide med tjenester utviklet i Altinnstudio
3. Altinn Plattform inneholder fellesfunksjoner og data/registre som deles på tvers av alle tjenester i Altinn Apps
4. Tjenesteutvikler vil fortsatt kunne utvikle tjenester i TUL i en periode fremover. Det er kun leverandør som kan migrere disse tjenestene til produksjonsmiljøet
5. Sluttbruker går inn på vanlige måte på www.altinn.no. Når bruker arbeider med en tjeneste utviklet i TUL vil dette skje på samme måte som tidligere. Denne tjenesten kjøres i sluttbrukerløsningen (SBL). Men, når bruker velger å arbeide med en tjeneste som er utviklet i Altinnstudio vil bruker kjøre denne tjenesten i skymiljøet Altinn Apps. Brukere vil oppleve en annen interaksjon og layout på  tjenester som kjører i Altinn Apps vs en tjeneste som kjører direkte i sluttbrukerløsningen. Skjermbilder og brukergrensesnitt vil oppleves mer moderne og fremtidsrettet i Altinn Apps

All [kode](https://github.com/Altinn/altinn-studio) og [backlog for utvikling](https://github.com/Altinn/altinn-studio/issues) ligger åpent på GitHub.
Alle kan dermed enkelt [opprette en issue](https://github.com/Altinn/altinn-studio/issues/new/choose), f.eks. bug, spørsmål eller et forbedringsforslag.

De nye løsningene vil eksistere i parallell med TUL og dagens Altinn sluttbrukerløsning (SBL).
Når alle tjenester fra TUL er flyttet over til Altinn Studio vil både TUL og tilhørende funksjonalitet i SBL fases ut.

Mer detaljerte arkitekturtegninger finnes på [docs.altinn.studio](https://docs.altinn.studio), f.eks.
[løsningsarkitektur](https://docs.altinn.studio/architecture/solution/) og
[infrastruktur](https://docs.altinn.studio/architecture/infrastructure/).

Se også https://www.altinndigital.no/studio.


## Q4 - 2019

### Erstatte /api/help med dokumentasjon på Altinn docs

[altinn.no/api/help](https://www.altinn.no/api/help) for REST-APIet skal avvikles. I stedet skal dokumentasjon av REST-APIet legges ut på Altinn docs.
Dette vil blir tilrettelagt gjennom at det skal etableres en offentlig tilgjengelig [OpenAPI 3.0](https://swagger.io/docs/specification/about/)-spesifikasjon
som blir lagt til grunn for å generere dokumentasjon.

Målsetning med endringen er å oppnå bedre dokumentasjon samt enklere vedlikehold av dokumentasjon av REST-API.

### Forbedre logging av tjenesteeiers bruk av løsningen

For å støtte opp under en evt. ny forretningsmodell for Altinn vil vi få på plass en bedre logging av tjenesteeiers bruk av løsningen.
Dette omfatter bruk av melding-, skjema-, innsyn-, autorisasjon/lenke-, integrasjons- og varslingstjeneste.

### "Proffversjon" av innboks

Som proffbruker av Altinn skal det kunne være mulig å tilpasse innboksen slik at den bedre ivaretar behovene, samt legger til rette
for at en skal kunne gjøre fleksible søk på tvers av aktører.
