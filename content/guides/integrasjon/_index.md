---
title: Integrasjon
description: Implementasjonsguide for integrasjon mot Altinn.
---

## Innledning

Implementasjonsguidene for integrasjon mot Altinn kan benyttes av
eksterne systemer som veiledning for hvordan deres systemer kan
integreres mot Altinn. Dette dokumentet beskriver den overordnede
arkitekturen for integrasjon mot Altinn og sikkerhetsmekanismer som
benyttes for kommunikasjon mellom Altinn og eksterne systemer. I tillegg
finnes følgende dokumenter (se Refererte dokumenter og linker for videre
henvisning):

-   Implementasjonsguide – Tjenesteiere.doc

-   Implementasjonsguide – Sluttbrukersystemer.doc

## Målgruppe for dette dokumentet


-   De som skal utvikle integrasjon mot Altinn og trenger mer kunnskap
    om formater og teknologier som benyttes i Altinn integrasjon

-   Arkitekter med behov for å vite mer hvordan Altinn kan passe inn i
    en informasjonsarkitektur

-   De som har behov for å vite mer om Altinn og integrasjonsmuligheter
    for eksterne systemer

## Overordnet prinsipp for dokumentasjon i implementasjonsguider


 Innhold og versjonering av implementasjonsguider skal reflektere siste
 versjon i produksjon. Kun siste versjon av tjenester er dokumentert og
 beskrevet. Dette støtter opp under prinsippet om at nye tjenesteeiere
 og nye sluttbrukersystemer bør bruke siste versjon av en tjeneste.

## Definisjoner


| **Betegnelse**|**Beskrivelse**|
|---------|--------------|
| Arkiv      |                   Komponent som håndterer langtidslagring av data i Altinn|
| Arbeidsflyt      |             Komponent for styring av arbeidsflyt i Altinn tjenester|
| Avgiver      |                 En juridisk eier av data som sendes inn, f.eks. en bedrift eller person|
| Base64      |                  Standard for å representere binære data som tekst, slik at binære data kan være en del av f.eks. en XML struktur|
| EAI   |                        Enterprise Application Integration - Mellomvare for å etablere Integrasjon mellom systemer og applikasjoner innad i en organisasjon|
| ETL      |                     Felles betegnelse på produkter som brukes til uthenting og innlesing av store mengder data mot databaser eller filer|
| FTP    |                       File Transfer Protocol – Protokoll for å overføre filer|
| HTTP   |                       Hypertext Transfer Protocol - Protokoll for overføring av data over nettverk og spesielt internett|
| HTTPS  |                       Hypertext Transfer Protocol Secure - Kryptert protokoll for overføring av sensitive data over nettverk og spesielt internett|
| Innsendingstjeneste |          En innsendingstjeneste er en eller flere skjema definert av en tjenesteeier som fylles ut i portal eller sluttbrukersystem, evt. signeres, og sendes inn. Påbegynte og innsendte innsendingstjenester kan oppbevares på brukernes hovedside i Altinn. Svardata sendes tjenesteeier|
| Innsynstjenester |             Tjenesteeiere kan gjøre informasjon i egne registre (for eksempel saksbehandlingsløsninger eller elektroniske saksarkiv/saksmapper) tilgjengelig for den enkelte brukeren eller dennes representant|
| MTOM   |                       Message Transmission Optimization Mechanism – Metodikk for effektiv forsendelse av binære vedlegg til og fra en web service|
| Samhandlingstjenster |         En tjeneste som knytter sammen andre tjenester som for sluttbruker og/eller tjenesteeier hører naturlig sammen|
| Signering |                    Tjenesteeier kan definere at spesifikke tjenester (for eksempel innsendingstjeneste) må signeres en eller flere ganger av bruker(e) før den aktuelle tjenesten kan ferdigstiller og sendes inn til Altinn|
| Skjema |                       Formular/dokument definert av en tjenesteeier som inneholder rubrikker som skal besvares av den som bruker formularet. Kan være trykket på papir eller elektronisk – sluttbrukerløsningen benytter elektroniske skjema|
| Skjemasett |                   En samling skjema som hører sammen. Gyldige kombinasjoner defineres av tjenesteeiere|
| SFTP |                         Secure File Transfer Protocol - Kryptert filoverføringsforbindelse for sikrere overføring av sensitive data|
| Sluttbrukersystem |            Et system som integrerer med Altinn på vegne av en Altinn bruker|
| SMTP |                         Simple Mail Transfer Protocol - Standard for sending / transport av E-post på internett|
| SOA |                          Konseptet tjenesteorientert arkitektur går ut på at applikasjoner og automatiske prosesser aksesserer informasjonsressurser gjennom standard tjenestegrensesnitt|
| SOAP |                         Uavhengig protokoll spesifikasjon for utveksling av strukturert informasjon gjennom web services|
| URI  |                         Uniform Resource Identifier - En streng som identifiserer en unik ressurs på internett. F.eks. en web side eller et web service endepunkt|
| Web service |                  Tjeneste på Internet aksessert vha. HTTP/HTTPS som utfører en bestemt oppgave, eller en bestemt type oppgaver|
| WSDL |                         Web Services Description Language - Teknisk tjenestekontrakt som beskriver hvilke operasjoner som finnes, samt regler for bruk (policies)|
| WS-\*   |                      En felles betegnelse for web service standarder som finnes|
| WS-Security   |                Standard for å tilby sikkerhet for kommunikasjon på en web service|
| XML    |                       EXtended Markup Language - XML er en språkdefinisjon for strukturering og beskrivelse av data|
| XAML   |                       Standardisert format for å kommunisere autorisasjonsregler og forespørsler|
| XSD    |                       XML Schema. Meta beskrivelse for XML data. Beskrivelse av hvordan XML dataene skal være strukturert og beskrivelse av alle data elementene. Blir også brukt til å validere XML data|


## Overordnet løsning


{{< figure src="/docs/images/guides/integrasjon/Figur1.png" title="Overordnet integrasjonsskisse">}}

All kommunikasjon mellom et sluttbrukersystem og et tjenesteeiersystem
er ivaretatt ved hjelp av tjeneste og integrasjonsplattformen i Altinn.
Dette gjelder uansett om dataflytbehovet er igangsatt fra sluttbruker
eller tjenesteeiers side. Altinn plattformen benytter også data fra
offentlige register som for eksempel Folkeregisteret eller
Enhetsregisteret til å komplettere de data som flyter mellom aktørene
som benytter Altinn. For sluttbrukersystemer vil det i all hovedsak være
web services som tilbys som integrasjonsgrensesnitt inn mot de tjenester
Altinn tilbyr.

## Altinn er en plattform for tjenester og integrasjon


Altinn er i tillegg til å være en portal for kommunikasjon mellom det
offentlige og bedrifter i Norge også en plattform for å sørge for
elektronisk flyt av data og integrasjon. Plattformen er basert på åpne
standarder og støtter nyere og eldre teknologier for integrasjon både
ved hjelp av web services og filbasert integrasjon. Plattformen skal
støtte opp under prinsipper som skal ivareta aktører og dataflyt i
forhold til:

-   Tilgjengelighet – Plattformen har høy tilgjengelighet og er i
    praksis ”alltid åpen” for data kommunikasjon. Det er også lagt vekt
    på å benytte asynkrone mekanismer for leveranse av data der dette er
    hensiktsmessig, for å kunne tillate at flere systemer leverer i
    parallell i perioder med høye volumer.

-   Sikkerhet – Plattformen tilbyr mekanismer for å sikre både
    datainnhold og at de som bruker løsningen er identifisert og har
    rettigheter til å utføre det de forsøker.

    -   Kryptering og dekryptering av meldinger og transport

    -   Signering og sjekk av signering

    -   Autentisering av system og bruker

    -   Autorisasjon av system og bruker

-   Interoperabilitet – Plattformen baserer seg på åpne standarder
    innenfor integrasjon med fokus på bruk av XML og Web Services som er
    bredt støttet i de fleste teknologier og løsninger. Altinn har en
    teknisk oppdatert plattform og er i stand til å kommunisere på
    oppdaterte standarder (f.eks. innenfor WS\* standardene for web
    services)

-   Sporbarhet – Det finnes kvitteringsmekanismer og sporingsmekanismer
    som ivaretar behov for tilbakemelding på og sporing av data som er
    utvekslet gjennom plattformen.

## Sikkerhet


Alle integrasjoner i Altinn har som mål å ivareta sikkerheten for de
systemene som inngår i integrasjonen. Dette går på sikring og kryptering
av data gjennom transport, og sjekking at de som benytter integrasjon
for å hente eller levere data har de nødvendige rettigheter (dvs. er
autorisert) som må til for å kunne aksessere data og tjenester.

Det henvises til mer detaljer i implementasjonsguider, for henholdsvis
sluttbrukersystemer og tjenesteeiere.

## Grensesnitt


Altinn tilbyr to forskjellige grensesnitt for de fleste funksjonelle
integrasjonpunkter

-   Integrasjon via Web service

    -   Tjenestekontrakter (WSDL) beskriver format for data som
        benyttes.

-   Integrasjon via XML-filer (batch)

    -   Altinn har definerte standardformater for alle XML-integrasjoner

## Formater


Formater for integrasjon i Altinn er nesten utelukkende basert på bruk
av XML, enten gjennom filbasert integrasjon eller web services.
XML-spesifikasjonene som benyttes er enten definert som standardformater
av Altinn for å integrere mot spesifikk funksjonalitet i løsningen,
XML-spesifikasjoner er tilgjengeliggjort fra offentlige metadatakilder
som oppgaveregisteret og SERES, eller tjenesteeiers egne
spesifikasjoner.

Eksterne systemer vil bruke disse formatene til å levere eller hente
data til og fra Altinn.

## Versjonering

Altinn standardformater som er definert enten for filbasert integrasjon
eller web services benytter versjonering av kontrakter. Versjoneringen
er bygget opp rundt en standard som er mye benyttet av alle større
premissleverandører for spesifikasjoner. Prinsippet går ut på at navnet
på en komponent og entitet i denne er førende for navngiving og deretter
benyttes årstall og måned kontrakten ble generert:

http://www.altinn.no/services/&lt;MainComp&gt;\[/&lt;SubComp&gt;\]/&lt;Year&gt;/&lt;Month&gt;

Et eksempel på dette er:

http://www.altinn.no/services/ServiceEngine/ReporteeElementList/2009/01ReporteeElementList/2009/10

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

## Web services


Web service grensesnittene benyttes fortrinnsvis der det er behov for
raske enkeltvise datautvekslinger med Altinn.

Altinn tilbyr opptil 4 forskjellige internett-adresserbare endepunkter
for hver tjeneste (URI). Disse endepunktene støtter opp under
forskjellige spesifikasjoner innen web services slik at plattformen er
moderne, interoperabel og derfor kan benyttes av alle eksterne systemer
som støtter web services

-   Basic Http (SOAP 1.1) (Tjenestekontrakter navngitt med
    ExternalBasic)

    -   Basis bruk av web services uten særlig støtte for nyere og
        moderne WS-\* standarder. Dette er fortsatt regnet som den
        standarden flest tekniske plattformer har mulighet til å
        integrere mot, men mangler en del mekanismer som supporterer web
        servicen blant annet innen sikkerhet.

    -   Binære vedlegg benytter Base64 enkoding

-   WS Http (SOAP 1.2) (Tjenestekontrakter navngitt med External)

    -   Støtter mer avanserte mekanismer og nyere standarder innen web
        services. Altinn tilbyr dette for å støtte de plattformene som
        benytter WS-Security.

-   Støtte for nye web service standarder WS-\* og gjør det mulig for
    Altinn å følge denne utviklingen i takt med systemer som ønsker å
    bruke Altinn web services.

-   Binære vedlegg benytter Base64 enkoding

## Sertifikater

Altinn benytter for web services ikke spesifikke sertifikater for
signering eller kryptering av data før de avsendes fra klient side.
Krypteringssikkerhet for web services baserer seg på bruk av HTTPS.

Virksomhetssertifikater kan benyttes for autentisering av
virksomhetsbrukere. Virksomhetsbrukere vil benytte seg av brukernavn,
passord og virksomhetssertifikat for autentisering.

For formidlingstjenester vil bruk av sertifikater for signering og/eller
kryptering kunne benyttes. Dette må i så fall settes opp spesifikt for
en tjeneste og være avtalt mellom aktørene som inngår i
formidlingstjenesten.

## Andre web service standarder

Altinn tilbyr per i dag SOAP i forskjellige formater som standarder for
web services. Andre standarder for tjenester som for eksempel REST eller
XML/HTTP benyttes ikke.

## Kontrakter / formater

Formater på data som kan sendes til Altinn baserer seg på
spesifikasjoner forvaltet av eksterne metadatakilder som
Oppgaveregisteret eller SERES.

## Koding av meldinger

Altinn baserer seg på bruk av UTF-8 for innsending og uthenting av data
gjennom web services.

## Web service meldingseksempler

Her følger noen eksempler på hvordan en SOAP melding som kan benyttes
mot Altinn ser ut for de forskjellige standarder Altinn støtter.
Eksemplene viser èn variant, og i forhold til innhold og parametere
henvises det til kapittel som beskriver grensesnitt for hver web service
og operasjoner på disse.

### Basic

{{< figure src="/docs/images/guides/integrasjon/Figur2.png">}}

#### Basic med Base64 vedlegg

Vedlagte eksempel viser hele http meldingen som er sendt i dette
tilfellet (12 Kb)

### WS

{{< figure src="/docs/images/guides/integrasjon/Figur3.png">}}

#### WS med Base64 vedlegg

Vedlagte eksempel viser hele http meldingen som er sendt i dette
tilfellet.

## Filbasert integrasjon


Grensesnitt med filbasert integrasjon benyttes fortrinnsvis for større
datamengder, og/eller hvor det ikke er behov for umiddelbar
tilbakemelding på datautvekslingen. Det er *ingen absoluttgrense* i
Altinn for hvor store ”større datamengder” er, eller hvor store
datamengder som kan sendes via web service, men følgende
*tommelfingerregel* kan benyttes:

web service &gt; 30 MB/100 elementer &gt; batch

Ved filbasert integrasjon med Altinn benyttes FTP protokollen,
fortrinnsvis SFTP (FTP over SSH), og det finnes to fremgangsmåter:

-   Altinn kan hente data fra den eksterne parts system

-   Den eksterne parten kan levere data på et definert Altinn område,
    dvs. SFTP server må etableres av ekstern part.

Detaljer og tilpasning av den filbaserte overføringen avklares ved
etablering.

## Innpakking av data med CDATA mekanisme


Flere av Altinn sine tjenester baserer seg på at strukturert XML skal
transporteres i en konvoluttmelding som inneholder metadata om det som
transporteres. Et eksempel på dette er innsendingstjenester som leverer
et eller flere skjema som hver for seg er i henhold til en XML
spesifikasjon levert av en eller flere metadata leverandør som for
eksempel oppgaveregisteret.

For å gjøre dette må den strukturerte XML-delen pakkes inn i et
CDATA-element slik at ikke tjenesten betrakter dette som en pakke med
data og ikke som en tjenesteparameter i forhold til kontrakten for
operasjonen.

CDATA er en mekanisme for å overføre data hvor innholdet ikke skal
valideres sammen med de data som omslutter den, men håndteres som en
streng med data.

Et CDATA-element defineres inne i et vanlig XML element på følgende
måte:

&lt;Data&gt; &lt;!\[CDATA\[innenfor klammeparenteser angis en streng med
data\]\]&gt;&lt;/Data&gt;

### Kvitteringer


I Altinn finnes kvitteringer slik at eksterne systemer skal kunne ha
innsyn i prosessen med innsending i forhold til mottak, kontroll og
prosessering av data som sendes inn. Denne kvitteringsmekanismen er ment
å være en teknisk kvitteringsmekanisme som går på logistikk rundt
forsendelser og prosessering av data.

Det vil også være mulig for en integrasjonsaktør å kvittere på
kvitteringene som holdes i Altinn slik at en annen avsender kan se at
f.eks. en tjenesteeier har mottatt og validert data på sin side.

Kvitteringer brukes og oppdateres for integrasjoner hvor:

 - Meldinger / data mottas av Altinn for prosessering.
 - Når meldinger / data er validert og levert videre til prosessering.

Forøvrig henvises det til spesifikk informasjon om hvordan kvitteringer
benyttes i de enkelte integrasjonene i underliggende
implementasjonsguider.