---
title: Nadobe
description: Nasjonal Tjeneste for Dokumentasjonsbevis
---

{{% notice info %}}
Dette er levende dokumentasjon (under arbeid) for NADOBE - Nasjonal Tjeneste for Dokumentasjonsbevis
{{% /notice %}}

## Innledning
NADOBE legger til rettet for at offentlige innkjøpere skal kunne få sanntids tilgang til kvalifikasjonsbevis for norske leverandører både før og etter kontraktsinngåelse. Ved hjelp av samtykkeløsningen i Altinn, samt en ny hjemmelskomponent, vil løsningen også kunne høste og avgi ikke-åpne data, f.eks. skatteattest. Løsningen vil tilby to grensesnitt - det ene eMeldings-basert via et PEPPOL aksesspunkt, samt et eOppslags-basert grensesnitt implementert som REST over HTTP.

Tjenesten etableres i Azure, og integrasjon mot eksisterende Altinn-funksjonalitet løses ved hjelp av eksisterende WCF/REST-APIer, og/eller utvidelser av disse. I første omgang er det snakk om initiering og sjekk av samtykke, samt logging av samtykkebruk. Sistnevnte vil kreve noe utvidelse på Altinn-siden. På sikt vil det kunne bli aktuelt med ytterligere kall mot autorisasjons-komponentet, men dette er ikke i scope for løsningen per i dag.

## Arkitekturskisse
Dette er arkitekturskissen slik den foreligger i Lucidchart for øyeblikket. Denne er sanntidsoppdatert.

<div style="width: 100%; height: 800px; margin: 10px 0; position: relative;"><iframe allowfullscreen frameborder="0" style="width:100%; height:800px" src="https://www.lucidchart.com/documents/embeddedchart/115d2e6f-9c41-496e-b22b-e7a39c58e168" id="9V591xyG_t7Q"></iframe></div>

## Sikkerhet
### Kryptering
All trafikk til Web-API grensesnittet foregår over TLS 1.2 med sterke ciphers (tilsvarende grade A eller høyere i SSL Labs' test)

### Autentisering
Autentisering av brukere foregår ved hjelp av [X.509](https://en.wikipedia.org/wiki/X.509) klientsertifkater (virksomhetssertifikater). Løsningen skal i denne versjonen kun være tilgjengelig for offentlige virksomheter, og følgelig vil autentisering kunne gjennomføres automatisk gjennom oppslag mot ER og sjekk av næringskode. På sikt vil andre mekanismer (f.eks. registrering av hvilke klientsertifkater som skal ha tilgang) være aktuelt, men dette er ikke i scope for denne løsningen.

WebAPI-grensesnittet vil kreve virksomhetssertifikatet oppgitt i TLS-sesjonen mot endepunktet, på samme måte som dette er implementert i Altinn i dag. (Ved terminering av TLS settes sertifikatet i en HTTP header som da vil være gjenstand for validering i applikasjonen)

For PEPPOL-kanalen vil den spørrende parts (altså den offentlige oppdragsgiveren) være autentisert av PEPPOL-nettverket. Aksessering mot WebAPI-et gjøres ved hjelp av et internt, pre-godkjent sertifikat som kun kan benyttes av mellomvaren.

Serveren vil være satt opp for håndtering av tilbaketrukne sertifkater via CRL / OCSP

### Integritet
Svar fra APIet som inneholder bevisdata vil bli signert via JSON Web Signature (https://tools.ietf.org/html/rfc7515)

### Personvern / behandling av sensitive data
Løsningen etableres i Azure Cloud, noe som medfører juridiske komplikasjoner knyttet til lagring av sensitive opplysninger. Løsningen legger opp til at ingen sensitive data (bevisdata) vil bli skrevet til noe permanent lager, men bevisdata vil i korte tidsrom befinne seg i en meldingskø mot PEPPOL-aksesspunktet. I scenarioer hvor PEPPOL-aksesspunktet er nede, vil utgående sensitive data kunne befinne seg på køen inntil aksesspunktet kommer opp og får tømt køen.

## Beviskoder og bevistyper
Forespørsler om bevisinformasjon inneholder 1) hvem forespørselen gjelder og 2) hvilke(n) beviskoder spørres det om. Hvem som spør er gitt av autentiseringen. 
Det er ikke anledning til å spørre på vegne av andre. Via PEPPOL-kanalen skal forespørsler og svar sendes i formatene [EHF Get Evidence Request og EHF Get Evidence Response](https://github.com/difi/vefa-ehf-getevidence).

De logiske **beviskodene** oppgitt mappes til en eller flere **bevistyper**. Hver bevistype er definert med en tilgangsmetode, en eller flere datakilder samt en Altinn tjenestekode og utgave. En beviskode slik den oppgis av bruker i requesten kan altså innbefatte flere bevistyper med ulike tilgangsmetoder. Beviskoden er å regne som ikke tilgjengelig inntil alle tilhørende bevistyper er blitt innvilget samtykke eller det foreligger hjemmel.

* **Tilgangsmetoden** angir om bevist er åpent tilgjengelig (f.eks. firmaattest) eller krever samtykke, hjemmel eller andre autorisasjonsmekanismer for å kunne høstes.
* **Datakildene** angir en eller flere kilder for hvor informasjon kan hentes. Ulike bevistyper kan referere samme datakilde, så det må håndteres at hver datakilde ikke blir høstet mer enn én gang per request.
* **Tjenestekoden og utgaven** oppgir Altinn-tjenester som samtykke-komponenten skal kobles mot, hvis aktuelt.

Hver bevistype implementerer logikk for å løpe gjennom de angitte datakildene, hente dataene og sammenstille disse til et nøkkel/verdi-par (NVP) samt metadata som beskriver verdi-typen (f.eks. boolean, tall, streng, eller en binær blob som PDF). En logisk beviskode vil da kunne referere en liste med NVPer.

Datakildene kan returnere data i ulike strukturerte eller ustrukturerte formater. Hver bevistype må derfor også ha tilhørende logikk som håndterer hvordan dataene skal trekkes ut og returneres i et omforent format som igjen kan danne grunnlaget for svaret på oppslaget.

## Samtykke
Noen beviskoder vil referere bevistyper som krever samtykke fra leverandøren. Dette vil i første omgang dreie seg om skatteattest, men vil kunne være beviser hentet fra f.eks. bøte- og strafferegisteret. Hvis det kommer en forespørsel på en slik beviskode, vil det ikke kunne utføres oppslag på dette før et aktivt samtykke foreligger. Oppdragsgiver kan oppgi at man ønsker å initiere en samtykkeforespørsel, og dette vil da instansiere en meldingstjeneste med varsling/re-varsling i Altinn, som inneholder samtykkelenke, samt en oversikt over hvilke bevistyper det bes om, hvem som spør og hvor lenge samtykket skal vare. Det vil da være én samtykkeforespørsel per akkreditering, som da vil kunne spenne over en eller flere av de beviskodene det spørres om.

Påfølgende oppslag med GET /evidence/<akkreditering> vil da returnere en datastruktur som indikerer om beviskodene som krever samtykke har fått innvilget dét, eventuelt om det er blitt slettet eller utløpt. Det vil ikke lagres/caches informasjon om hvorvidt samtykke foreligger - dette må spørres hver gang i Altinn-APIet.

### Hjemmel / ESPD
Det legges opp til at man i enkelte sammenhenger kan i det initielle kallet legge ved dokumentasjon som indikerer at leverandøren gir samtykke og/eller at det foreligger hjemmel for å uthente dataene som uthentes.
ESPD er det tiltenkte dokumentet for dette, som er den elektroniske egenerklæringen som leverandøren allerede i dag må kunne levere til oppdragsgivere. 
**Det finnes imidlertid ingen mekaniskmer i ESPD (XML-SIG el.l.) som lar oss foreta en verifisering om ESPD faktisk kommer uforandret fra leverandøren og ikke manipulert av oppdragsgiver.**
Det legges likevel opp til en generisk mekanisme for å kunne oppgi samtykke/hjemmelsgrunnlag slik at beviskoder som ikke er åpne allikevel vil kunne hentes umiddelbart uten at det gjennomføres en samtykkeprosess. Denne må gjøres generisk og parameterstyrt, slik at ulike implementasjoner for verifisering av dette grunnlaget kan utvikles utfra type.

### Samtykkelogging
Leverandøren skal når som helst kunne logge inn i portalen og se en oversikt over hvilke samtykker som foreligger, samt en logg som viser oversikt over bruk.

Alle forespørsler som medfører at data (åpne og ikke) blir utlevert skal medføre innslag i samtykkeloggen til den avgivende virksomheten. Det skal fremkomme 1) hvem som hentet dataene, 2) når dataene ble hentet, 3) hvor dataene ble hentet fra, 4) en visning av hvilke data som ble hentet. For det siste punktet vil dette kreve håndtering av både strukturerte og ustrukturerte data (som PDF).

Logging skal foregå fra Nadobe-tjenesten til REST-APIet i Altinn, ikke ulikt hvordan bankene benytter "loguse" APIet i dag. Dette må utvides / komplementeres med et kall som kan ta i mot bevisdataene, 
som da må lagres i Altinns TTP-database. **Ingen logging av bruk eller bevisdata skal logges i Azure/Nadobe.**
