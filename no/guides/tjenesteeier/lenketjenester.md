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

![](https://altinn.github.io/docs/no/guides/tjenesteeier/img/Lenketjeneste1.jpg)

**Figur 1 – Flyt for lenketjeneste - autentisering**

Figur 1 viser IDPorten, Altinn, tjenesten og tjenesteeier i et standard «SAML-univers». Altinn er ikke Identity Provider og IDPorten utfører dermed all autentisering av sluttbrukere som deretter fødereres mot Altinn som er Service Provider. Altinn deltar i IDPortens Circle of trust sammen med tjenesteeiere for lenketjenester som også er Service Provider.
 

1.	**Punkt 1a og 1b**. Sluttbruker når lenketjenesten på to måter; via tjenestekatalogen i Altinn eller via dyplenke hos tjenenesteeier.
2.	**Punkt 2**. Når sluttbruker prøver å nå lenketjenesten i Altinn blir det sjekket om sluttbruker er pålogget Altinn. Dersom sluttbruker ikke er pålogget Altinn, blir brukeren ført til IDPorten for autentisering. Sluttbruker blir autentisert i IDPorten og IDPorten fødererer sluttbrukerens identitet til Altinn.

![](https://altinn.github.io/docs/no/guides/tjenesteeier/img/Lenketjeneste2.jpg)

**Figur 2 – Flyt for lenketjenesten – Valg av avgiver og tjenestekontroll**

Altinn har verifisert sluttbrukerens identitet og sluttbrukeren er innenfor Circle of Trust med IDPorten og Altinn. Circle of Trust er et begrept innenfor SAML som beskriver systemer med gjensidig tillitt.

3.	**Punkt 3. og Punkt 4**. Sluttbrukeren blir ført til valg av avgiver siden i Altinn. Avgiverkontroll og eventuelle tjenestekontroller som er satt på lenketjenesten i TUL blir utført.  
4.	**Punkt 5**. Dersom sluttbruker og valgt avgiver tilfredstiller kontrollene satt på tjenesten, blir brukeren videreført til den eksterne tjenesten med en temporær nøkkel lagt til URL.

![](https://altinn.github.io/docs/no/guides/tjenesteeier/img/Lenketjeneste3.jpg)

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
 
### 5.2	Integrasjon mot IDPorten
ID-Porten er Identity Provider for lenketjenester, og tjenesteeiere i Altinn som har lenketjenester må etablere en egen, standard, samarbeidsavtale med ID-porten. Dette fordi en slik tjenesteeier vil måtte ha en direkte integrasjon mot ID-porten.
DIFI har utarbeidet en tilslutningsguide som beskriver den jobben som må gjøres for å sette opp SAML-integrasjon mot IDPorten. Tilslutningsguiden finnes under ID-Porten > Dokumentasjon i [Samarbeidsportalen] (http://samarbeid.difi.no) til Difi.

### 5.3	Utvikle Lenketjenesten i TUL 
Lenketjenestene utvikles i TUL på samme måte som andre tjenestetyper, ved at man først oppretter en tjeneste med tjenestetype Lenketjeneste, og deretter har utgaver av tjenesten på nivået under. Det er utgavene som migreres til SBL og er tilgjengelig for sluttbruker. Når tjenesten opprettes blir det generert en ekstern tjenestekode, som er unik for hver enkelt tjeneste. Sammen med ekstern utgavekode, som man setter på Utgaveparametre, danner ekstern tjenestekode en unik identifikator til hver utgave. Ekstern tjenestekode og ekstern utgavekode brukes både i direktelenke til tjenesten i Altinn, samt i autorisasjonsforespørselen mot Altinn.

Det som skiller lenketjenestene fra andre tjenestetyper er at det på lenketjenestene legges inn en URL til tjenesten på tjenesteeiers side i utgavespesifikasjonen, og siden test-URL og prod-URL er forskjellig, må man derfor alltid opprette en test-utgave og en prod-utgave.


På utgaveparametre definerer man lenken som skal peke mot skjema:
-	Utgavenavn – dette er navnet som sluttbruker ser i SBL
-	Kortnavn – vises bare i TUL
-	Ekstern utgavekode – numerisk kode som må være unik innen hver tjeneste. Sammen med tjenestekoden utgjør tjenesteutgavekoden en unik identifikator av tjenesesteutgaven, og dyplenken til skjema vil bestå av disse to verdiene
-	Hovedspråk – angi hvilket hovedspråk tjenesten skal finnes på
-	Gyldighetsdatoer – angi gyldig fra-dato og gyldig til-dato
-	Instansierings-/serivcekontroller
-	Altinn verifiserer at valgt avgiver er over 18 år før brukeren gis tilgang til lenketjenesten. Er kun gyldig dersom avgiver er person.
-	Altinn verifiserer at innlogget bruker har registerert personlig epostadresse i profilen før brukeren gis tilgang til lenketjenesten.
-	Lenketjeneste detaljer – her legges url til tjenesten på tjenesteeiers skjemamotor inn
-	Logging og sporing – angi om loggings og sporingsinfo skal lagres i tredjeparts arkiv, og evt hvor lenge. Minimum 10 år hvis logging/sporing skal benyttes.
-	Avgiverkrav – angi hvike aktører/avgivere som skal kunne bruke tjenesten. 
Tilgjengelige valg er;
-	Privatperson
-	Juridisk enhet
-	Bedrift
-	Konkursbo
-	Bedrift eller juridisk enhet
-	Person eller juridisk enhet
-	Bedrift, juridisk enhet eller konkursbo
-	Alle aktører
-	Sikkerhetsnivå – lenketjenester i Altinn 2 må settes opp med sikkerhetsnivå 3 eller 4, fordi IDPorten benyttes til autentisering og de tilbyr nivå 3 og 4.
-	Virksomhetsbrukere – angi om sluttbrukere skal kunne bruke virksomhetssertifikat til å logge inn. Med virksomhetssertifikat er det ingen knytning til fødselsnummeret til vedkommende som bruker tjenesten.
-	Samhandlingstjeneste – lenketjenester kan defineres til å kunne inngå i en samhandlingstjeneste. Da settes det et kryss på utgaven her, og utgaven vil være valgbar som tilgjengelig tjeneste for samhandlingstjenester.

Altinn rolle
På samme måte som andre tjenestetyper, må lenketjenestene knyttes til en eller flere Altinn-roller slik at tjenestene blir tilgjengelig for sluttbrukerne. Altinn-rollene er knyttet til et sett med eksterne roller fra Enhetsregisteret (ER), og når tjenesteeier skal velge hvilke(n) Altinn-rolle(r) som skal gi tilgang til tjenesten, er det viktig å tenke over en del ting;
-	Hvem skal bruke tjenesten – det må velges en eller flere roller som sikrer at alle aktuelle avgivere har tilgang til tjenesten. Ulike organisasjonstyper registrerer ulike typer eksterne roller i ER, og tjenesteeier må velge en Altinn-rolle som dekker ulike organisasjonstyper. F.eks vil et enkeltpersonsforetak kanskje bare ha innehaver registrert, mens et AS har både daglig leder, styreleder og revisor. Hvis både ENK’et og AS’et skal kunne benytte tjenesten, må Altinn-rollen som knyttes til tjenesten være knyttet til både Innehaver og Daglig leder, Styreleder eller Revisor. Tilgjengelige roller finnes på [rolleadministrasjonssiden] (http://tul.altinn.basefarm.net/RoleAdministration/default.aspx) i TUL og i [portalhjelpen] (https://www.altinn.no/no/Portalhjelp/Administrere-rettigheter-og-prosessteg/Rolleoversikt) i SBL.

-	Skal ulike roller har tilgang til å utføre ulike operasjoner på tjenesten? Dette kan man skille på i rolletilknytningen. Vær i midlertid oppmerksom på at Altinn kun sjekker at man har lese-tilgang til tjenesten ved instansiering. Hvis man ønsker en mer detaljert autorisasjonssjekk, må dette implementeres i tjenesteeiers tjeneste-applikasjon.

### 5.4	Bruk av Altinns autorisasjonswebservice

Altinns webservice for autorisasjon kan benyttes av tjenesteiere til å foreta autorisasjonsbeslutninger basert på rolle og rettighetsregler og delegeringer som ligger i Altinns autorisasjonsdatabase. Dette gjør at eksterne tjenester som ikke benytter Altinns tjenestemotor likevel kan benytte Altinns autorisasjonsmodell på tjenesten. For lenketjenester, for eksempel en tjeneste hvor avgiver kan være en organisasjon, er dette sentralt.

Denne tabellen viser endepunktene og operasjonene for Altinns to webservices for autorisasjon som er aktuelle for lenketjenesten.

### Eksempel Request
 ```
<?xml version="1.0"?>
-<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.altinn.no/services/Authorization/Administration/2010/10">
<soap:Header/>
-<soap:Body>
-<ns:GetReporteeByTempKey>
<ns:tempKey>76d4afac-f228-4055-bde5-f4aae0c6af8f</ns:tempKey>
</ns:GetReporteeByTempKey>
</soap:Body>
</soap:Envelope>
 ```
[xml soap request](https://altinn.github.io/docs//request/getReporteeByTempKeyReq.xml) 

  ### Eksempel Response
   ```
  <s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
   <s:Header>
      <a:Action s:mustUnderstand="1">http://www.altinn.no/services/Authorization/Administration/2010/10/IAuthorizationAdministrationExternal/GetReporteeByTempKeyResponse</a:Action>
      <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
         <u:Timestamp u:Id="_0">
            <u:Created>2012-11-29T07:19:14.278Z</u:Created>
            <u:Expires>2012-11-29T07:24:14.278Z</u:Expires>
         </u:Timestamp>
      </o:Security>
   </s:Header>
   <s:Body>
      <GetReporteeByTempKeyResponse xmlns="http://www.altinn.no/services/Authorization/Administration/2010/10">
         <GetReporteeByTempKeyResult xmlns:b="http://schemas.altinn.no/services/Authorization/Administration/2012/11" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <b:Name>HÅKON TRANA</b:Name>
            <b:OrganizationNumber i:nil="true"/>
            <b:ReporteeType>Person</b:ReporteeType>
            <b:SSN>05116602352</b:SSN>
         </GetReporteeByTempKeyResult>
      </GetReporteeByTempKeyResponse>
   </s:Body>
</s:Envelope>
 ```
  
