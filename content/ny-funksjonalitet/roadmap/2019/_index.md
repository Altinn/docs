---
title: Altinn Roadmap 2019
linktitle: 2019
description: Overordnet roadmap for videreutvikling av Altinn i 2019.
weight: 30
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

Alle som bruker webserviceer med virksomhetssertifikat mot Altinn bør bytte til de nye endepunktene i løpet av høsten 2019.

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

### :heavy_check_mark: Ny brukerdialog for å be om - og gi rettighet
Det blir nå mulig for sluttbruker å "be om tilgang" til en bestemt rolle eller utføre en bestemt tjeneste. En forespørsel vil da gå til de i virksomheten som har administratormyndighet og som kan ta stilling til om rettighet skal innvilges eller ikke. Endringen omfatter ny dialog og brukergrensesnitt som skal brukes for de som ber om rettighet samt for de som skal gi rettighet.

Dette ble [levert i release 19.10](../../releases/2019/19-10/#endringer-i-portal)


### :heavy_check_mark: Oppgradering av Biztalk
Biztalk skal oppgraderes til nyere versjon. Dette er et produkt som anvendes til forsendelse og mottak av data mellom Altinn og tjenesteeiere.
Oppgraderingen planlegges gjennomført slik at eksisterende tjenester ikke skal påvirkes.

Nytt Biztalk Cluster ble tatt i bruk 23. oktober


### :heavy_check_mark: Sikkerhet i eOppslag - felles tjeneste fra Maskinporten og Altinn autorisasjon
[Maskinporten](https://www.difi.no/nyhet/2019/09/maskinporten-enklare-deling-av-data) og Altinn skal sammen gjøre det enklare å dele og bruke data på tvers i offentleg forvalting. Maskinporten sørger for å verifisere identiteten til virksomheter og gi disse riktig tilgang til data som offentlege virksomheter tilbyr via API. 

Løsningen fra Maskinporten skal i samarbeid med Altinn utvides slik at det blir mulig å bruke Altinns autorisasjonsløsning for å delegere tilgang til API (en definert delegerbar ressurs) fra den som har "lov" til å hente data til den som faktisk skal være utførende. Et tenkt brukerscenario som skal løses er "Leikanger Kommune har hjemmel til å hente informasjon fra NAV sitt API. Leikanger kommune ønsker at Evry skal bruke APIet for dem."

Løsningen skal også kunne integreres med [API-katalogen](https://fellesdatakatalog.brreg.no/apis) slik at API (definert delegerbar ressurs) er synkronisert på tvers av de tre løsningene. 
Foreslått arkitektur for sikkerhet i eOppslag finnes skissert i Nasjonal Referansearkitektur her: [eOppslag](https://doc.difi.no/nasjonal-arkitektur/nab_referanse_arkitekturer/#_eoppslag). 

Dette ble [levert i release 19.12](https://altinn.github.io/docs/utviklingsguider/sikkerhet-i-eoppslag)
