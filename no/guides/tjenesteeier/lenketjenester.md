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
