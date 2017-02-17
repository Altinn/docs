# Altinns Implementasjonsguide for lenketjenester

### 1 Innledning

Implementasjonsguiden for lenketjenester gir en teknisk beskrivelse av hvordan lenketjenester i Altinn skal implementeres.  Dokumentet er ment for utviklingsressurser hos tjenesteeiere som skal utvikle lenketjenester.
Implementasjon av lenketjenesten i Altinn krever at tjenesteeiere også oppretter føderering av brukere fra IDPorten mot sin tjeneste. Dette dokumentet inneholder ikke detaljert informasjon om oppsett av føderering mot IDPorten, men beskriver hvordan løsningen for lenketjenester forholder seg til IDPorten, og hva dette innebærer for tjenesteeieren.

### 1.1 Lesehenvisning

Denne dokumentasjonen bør leses i sammenheng med dokumentene:

1. «**Implementasjonsguide for integrasjon mot Altinn»,** som er den overordnede guiden for alle som skal integrere seg mot Altinn

2. «**Implementasjonsguide for tjenesteeier»** som beskriver tjenester i Altinn som er tilgjengelige for tjenesteeiere.

3. «**Brukerveiledning TUL**» som beskriver hvordan tjenester i Altinn utvikles.

4. «**Tilslutningsguide mot IDPorten»**.

### 2 Definisjoner

| Betegnelse | Beskrivelse |
|--------|--------|
| Autentisering   | En betegnelse på det å verifisere en bruker eller et systems identitet. Dette vil typisk skje ved en sjekk av brukernavn og passord og/eller pin kode stemmer overens med registrert informasjon.|
|Autorisasjon|En betegnelse på å verifisere at en gitt identifisert bruker eller system identitet har rettigheter til å utføre en handling eller har rettigheter til spesifikke data.|
|E-dialog|En tjenesteeierdefinert samhandlingstjeneste.|
|Lenketjeneste|Formålet med en lenketjeneste er å overføre en bruker i Altinn til en annen nettside. En lenketjeneste er alltid assosiert med en URL.|
|SBL|Sluttbrukerløsningen. Applikasjon som privatpersoner eller næringslivet benytter for å kommunisere med tjenesteeiere.|
|SOAP|Uavhengig protokoll spesifikasjon for utveksling av strukturert informasjon gjennom web services.|
|TUL|Tjenesteutviklingsløsningen. Applikasjon hvor tjenesteeiere bl.a. kan opprette tjenester for bruk i Altinn, for eksempel innsendingstjenester.|
|Web service|Tjeneste på Internet aksessert vha. HTTP/HTTPS som utfører en bestemt oppgave, eller en bestemt type oppgaver.|
|WSDL|Språk (xml) som beskriver en web service, dvs. informasjon om tjenester, protokoller og formater. Hensikten er å ha en velkjent måte for å etablere dialog mellom brukere og tilbydere av elektroniske tjenester.|
|XACML|EXtended Markup Language - XML er en språkdefinisjon for strukturering og beskrivelse av data.|
|XML|EXtended Markup Language - XML er en språkdefinisjon for strukturering og beskrivelse av data.|
|XSD|XML Schema. Metabeskrivelse for XML data. Beskrivelse av hvordan XML dataene skal være strukturert og beskrivelse av alle dataelementene. Blir også brukt til å validere XML data.|

### 3 Refererte dokumenter og linker

| Dokument | Beskrivelse |
|--------|--------|
| Implementasjonsguide for integrasjon mot Altinn.doc | Dette dokumentet beskriver den overordnede arkitekturen for integrasjon mot Altinn, samt sikkerhetsmekanismer som benyttes for kommunikasjon mellom Altinn og eksterne systemer. |
| Altinns selvbetjeningsportal |https://selvbetjening.brreg.no/src/secure/main.jsp#services/home |

### 4	Overordnet flyt for lenketjenesten 
Lenketjenester i Altinn kan benyttes av tjenesteeiere som ønsker å tilgjengeliggjøre sine tjenester via Altinn, og ta i bruk Altinns autorisasjonsmodell, men ønsker å beholde egen tjenestemotor. Lenketjenester defineres i TUL og migreres til SBL på linje med andre tjeneste¬typer, slik at avgiver- og rettighetskrav kan konfigureres i TUL og lenketjenester kan knyttes inn i samhandlingstjenester. 

Til forskjell fra lenketjenesten på Altinn I plattformen er det ikke lenger Altinn som leverer autentiseringsinformasjon til tjenesteeieren, derimot må tjenesteiere integrere seg med IDPorten for føderering av brukere (Single Sign On).  

Lenketjenesten har dermed tre aktører:

1.	IDPorten, som er Identity Provider og foretar autentisering av sluttbruker
2.	Altinn, som har lenketjenensten og foretar autorisasjonskontroll, tjenestekontroller og viderefører sluttbruker til tjeneste i ekstern portal.
3.	Tjenesteeier for ekstern tjeneste som tilbyr tjenesten til sluttbruker.   

Normalflyten for en lenketjeneste og hvordan de tre aktørene spiller sammen vil nå beskrives nærmere.

![](https://altinn.github.io/docs/no/guides/tjenesteeier/Lenketjeneste1.jpg)

** Figur 1 – Flyt for lenketjeneste - autentisering
**
Figur 1 viser IDPorten, Altinn, tjenesten og tjenesteeier i et standard «SAML-univers». Altinn er ikke Identity Provider og IDPorten utfører dermed all autentisering av sluttbrukere som deretter fødereres mot Altinn som er Service Provider. Altinn deltar i IDPortens Circle of trust sammen med tjenesteeiere for lenketjenester som også er Service Provider.
 

1.	**Punkt 1a og 1b**. Sluttbruker når lenketjenesten på to måter; via tjenestekatalogen i Altinn eller via dyplenke hos tjenenesteeier.
2.	**Punkt 2**. Når sluttbruker prøver å nå lenketjenesten i Altinn blir det sjekket om sluttbruker er pålogget Altinn. Dersom sluttbruker ikke er pålogget Altinn, blir brukeren ført til IDPorten for autentisering. Sluttbruker blir autentisert i IDPorten og IDPorten fødererer sluttbrukerens identitet til Altinn.
