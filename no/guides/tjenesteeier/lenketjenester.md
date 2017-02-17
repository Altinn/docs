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

**Figur 1 – Flyt for lenketjeneste - autentisering**

Figur 1 viser IDPorten, Altinn, tjenesten og tjenesteeier i et standard «SAML-univers». Altinn er ikke Identity Provider og IDPorten utfører dermed all autentisering av sluttbrukere som deretter fødereres mot Altinn som er Service Provider. Altinn deltar i IDPortens Circle of trust sammen med tjenesteeiere for lenketjenester som også er Service Provider.
 

1.	**Punkt 1a og 1b**. Sluttbruker når lenketjenesten på to måter; via tjenestekatalogen i Altinn eller via dyplenke hos tjenenesteeier.
2.	**Punkt 2**. Når sluttbruker prøver å nå lenketjenesten i Altinn blir det sjekket om sluttbruker er pålogget Altinn. Dersom sluttbruker ikke er pålogget Altinn, blir brukeren ført til IDPorten for autentisering. Sluttbruker blir autentisert i IDPorten og IDPorten fødererer sluttbrukerens identitet til Altinn.

![](https://altinn.github.io/docs/no/guides/tjenesteeier/Lenketjeneste2.jpg)

**Figur 2 – Flyt for lenketjenesten – Valg av avgiver og tjenestekontroll**

Altinn har verifisert sluttbrukerens identitet og sluttbrukeren er innenfor Circle of Trust med IDPorten og Altinn. Circle of Trust er et begrept innenfor SAML som beskriver systemer med gjensidig tillitt.

3.	**Punkt 3. og Punkt 4**. Sluttbrukeren blir ført til valg av avgiver siden i Altinn. Avgiverkontroll og eventuelle tjenestekontroller som er satt på lenketjenesten i TUL blir utført.  
4.	**Punkt 5**. Dersom sluttbruker og valgt avgiver tilfredstiller kontrollene satt på tjenesten, blir brukeren videreført til den eksterne tjenesten med en temporær nøkkel lagt til URL.

![](https://altinn.github.io/docs/no/guides/tjenesteeier/Lenketjeneste3.jpg)

**Figur 3 - Flyt for lenketjenesten - Autorisasjonskontroll**
Tjenesteeier har verifisert at sluttbrukeren er autentisert og sluttbruker er innenfor Circle of Trust med IDPorten, Altinn og Tjenesteeier.

5.	**Punkt 6**. Når sluttbruker kommer til den beskyttede tjenesten hos tjenesteeier, må tjenesteeier sjekke om sluttbrukeren er pålogget i tjenesteeiers løsning. Dersom sluttbrukeren ikke er pålogget i tjenesteeiers løsning, verifiseres det at brukeren er pålogget i IDPorten og IDPorten fødererer sluttbrukerens identitet til tjenesteeier.
6.	**Punkt 7**. Tjenesteeier bruker den temporære nøkkelen lagt på URL (tempkey) i webservicekall mot Altinn og henter avgiver valgt av sluttbruker i Altinn.
7.	**Punkt 8**. Tjenesteeier sender XACML request i webservicekall til Altinn for å få bekreftet at sluttbruker har rettigheter til å utføre spesifisert operasjon på lenketjenesten til tjenesteeieren for valgt avgiver.
8.	**Punkt 9**. Brukeren kan nå lenketjenesten. 

### 5	Implementasjon av lenketjenesten.

De påfølgende kapitlene vil gi en teknisk detaljert beskriveles av hvordan tjenesteiere bør implementere lenketjenesten i tjenesteeieres applikasjon.

### 5.1	Utvikling av tjenesteiers eksterne tjeneste

Hvordan tjenesten skal fungere i ekstern portal har Altinn ikke et forhold til, og tjenesteier har selv ansvaret for utviklingen av applikasjonen som driver den eksterne tjenesten.
Men, i forhold til lenketjenesten i Altinn er det tre hovedfunksjoner tjenesteier må implementere i sin løsning.

#### 1.	Føderering av identitet fra IDPorten
Ressursene som inngår i tjenesten, og dermed er tilgjengelige for sluttbrukere, må beskyttes ved bruk av SAML for føderering av brukerindentiet fra IDPorten. Hvordan dette løses kan tjenesteier selv avgjøre innen for de kravene som stilles av IDPorten. Det som er viktig for lenketjenesten er at sluttbrukers identitet blir verifisert og mottatt i applikasjonen.

#### 2.	Hente avgiver med tempkey fra Altinn.
Når sluttbrukeren overføres fra Altinn til den eksterne tjenesten i en http GET request blir en temporær nøkkel (tempkey) lagt til URL. Denne temporære nøkkelen skal benyttes i webservicekall til Altinn for å hente avgiveren brukeren har valgt i portalen. Det er altså viktig at den temporære nøkkelen kan videreføres igjennom fødereringen mot IDPorten, og dermed kan det være hensiktsmessig at applikasjonen mellomlagrer den temporære nøkkelen før sluttbrukeren blir «redirected» til IDPorten i forbindelse med føderering.

#### 3.	Sjekke sluttbrukers autorisasjon ved bruk av webservice
Når identiteten til sluttbrukeren er fastslått etter fødereringen fra IDporten, og avgiver er mottatt i responsen fra Altinns webservice, må applikasjonen benytte Altinns autorisasjonswebservice for å få bekreftet at sluttbruker har rettigheter til å utføre spesifisert operasjon på lenketjenesten til tjenesteeieren for valgt avgiver. 
 


