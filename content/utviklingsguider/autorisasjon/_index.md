---
title: Autorisasjon
description: Implementasjonsguiden for autorisasjon gir en teknisk beskrivelse av hvordan en kan benytte Altinn til autorisasjon og tilgangskontroll for eksterne tjenester, altså tjenester på andre nettsteder.
weight: 50
aliases:
 - /guides/lenketjenester/
 - /guides/autorisasjon/
---

## Innledning
Implementasjonsguiden for autorisasjon gir en teknisk beskrivelse av hvordan autorisasjon og tilgangskontroll for eksterne tjenester skal implementeres. Dokumentasjonen er ment for utviklingsressurser hos tjenesteeiere som skal utnytte Altinn til autorisasjon og tilgangskontroll. For å beskytte sine tjenester er det også nødvendig at tjenesteeiere etablerer føderering av brukere fra ID-porten. Dette dokumentet inneholder ikke detaljert informasjon om oppsett av føderering mot ID-porten, men beskriver hvordan løsningen for autorisasjon i Altinn forholder seg til ID-porten, og hva dette innebærer for tjenesteeieren.

[Begrepsdefinisjoner](../definisjoner)

## Overordnet flyt for implementasjon av autorisasjon
Altinn kan benyttes av tjenesteeiere som ønsker å tilgjengeliggjøre informasjon og tjenester på egen plattform og nettsted, men ikke kan utføre en full autorisasjon av brukers tilganger. Roller og rettigheter kan være basert på mye informasjon som hver enkelt tjenesteeier ikke nødvedigvis har tilgang til. For å oppnå dette kan tjenesteeieren opprette en tjeneste av typen lenketjeneste i TUL. Tjenesten migreres til SBL på linje med andre tjeneste¬typer, slik at Altinn kan avgjøre om den aktuelle brukeren har nødvendig tilganger basert på de regler tjenesteeier har definert i TUL.

Altinn leverer autorisasjonstjenester mens ID-porten leverer tjenester for føderering av brukere (Single Sign On).

I forbindelse med autorisasjon i Altinn er det dermed tre aktører:

1. ID-porten, som er Identity Provider og foretar autentisering av sluttbruker
2. Altinn, som foretar autorisasjonskontroll, (og ved bruk av lenking - tjenestekontroller og videreføring av sluttbruker til tjeneste i ekstern portal).
3. Tjenesteeier for ekstern tjeneste som tilbyr tjenesten til sluttbruker.

### Flyt ved bruk av viderføring i Altinn

{{<figure src="autentisering.jpg" title="Figur 1 – Flyt for lenketjeneste - autentisering" >}}

Figur 1 viser ID-porten, Altinn, tjenesten og tjenesteeier i et standard «SAML-univers». Altinn er ikke Identity Provider og ID-porten utfører dermed all autentisering av sluttbrukere som deretter fødereres mot Altinn som er Service Provider. Altinn deltar i ID-portens Circle of trust sammen med tjenesteeiere for lenketjenester som også er Service Provider.

- **Punkt 1a og 1b**. Sluttbruker når lenketjenesten på to måter; via tjenestekatalogen i Altinn eller via dyplenke hos tjenenesteeier.
- **Punkt 2**. Når sluttbruker prøver å nå lenketjenesten i Altinn blir det sjekket om sluttbruker er pålogget Altinn. Dersom sluttbruker ikke er pålogget Altinn, blir brukeren ført til ID-porten for autentisering. Sluttbruker blir autentisert i ID-porten og ID-porten fødererer sluttbrukerens identitet til Altinn.

{{<figure src="valg-av-avgiver.jpg" title="Figur 2 – Flyt for lenketjenesten – Valg av avgiver og tjenestekontroll" >}}

Altinn har verifisert sluttbrukerens identitet og sluttbrukeren er innenfor Circle of Trust med ID-porten og Altinn. Circle of Trust er et begrept innenfor SAML som beskriver systemer med gjensidig tillitt.

 - **Punkt 3. og Punkt 4**. Sluttbrukeren blir ført til valg av avgiver siden i Altinn. Avgiverkontroll og eventuelle tjenestekontroller som er satt på lenketjenesten i TUL blir utført.  
 - **Punkt 5**. Dersom sluttbruker og valgt avgiver tilfredstiller kontrollene satt på tjenesten, blir brukeren videreført til den eksterne tjenesten med en temporær nøkkel lagt til URL.

{{<figure src="autorisasjonskontroll.jpg" title="Figur 3 - Flyt for lenketjenesten - Autorisasjonskontroll" >}}

Tjenesteeier har verifisert at sluttbrukeren er autentisert og sluttbruker er innenfor Circle of Trust med ID-porten, Altinn og Tjenesteeier.

 - **Punkt 6**. Når sluttbruker kommer til den beskyttede tjenesten hos tjenesteeier, må tjenesteeier sjekke om sluttbrukeren er pålogget i tjenesteeiers løsning. Dersom sluttbrukeren ikke er pålogget i tjenesteeiers løsning, verifiseres det at brukeren er pålogget i ID-porten og ID-porten fødererer sluttbrukerens identitet til tjenesteeier.
 - **Punkt 7**. Tjenesteeier bruker den temporære nøkkelen lagt på URL (tempkey) i webservicekall mot Altinn og henter avgiver valgt av sluttbruker i Altinn.
 - **Punkt 8**. Tjenesteeier sender XACML request i webservicekall til Altinn for å få bekreftet at sluttbruker har rettigheter til å utføre spesifisert operasjon på lenketjenesten til tjenesteeieren for valgt avgiver.
 - **Punkt 9**. Brukeren kan nå lenketjenesten.

## Implementasjon av lenketjenesten.

De påfølgende kapitlene vil gi en teknisk detaljert beskriveles av hvordan tjenesteiere bør implementere lenketjenesten i tjenesteeieres applikasjon.

### Utvikling av tjenesteiers eksterne tjeneste

Hvordan tjenesten skal fungere i ekstern portal har Altinn ikke et forhold til, og tjenesteier har selv ansvaret for utviklingen av applikasjonen som driver den eksterne tjenesten.
Men, i forhold til lenketjenesten i Altinn er det tre hovedfunksjoner tjenesteier må implementere i sin løsning.

#### Føderering av identitet fra ID-porten
Ressursene som inngår i tjenesten, og dermed er tilgjengelige for sluttbrukere, må beskyttes ved bruk av SAML for føderering av brukerindentiet fra ID-porten. Hvordan dette løses kan tjenesteier selv avgjøre innen for de kravene som stilles av ID-porten. Det som er viktig for lenketjenesten er at sluttbrukers identitet blir verifisert og mottatt i applikasjonen.

#### Hente avgiver med tempkey fra Altinn.
Når sluttbrukeren overføres fra Altinn til den eksterne tjenesten i en http GET request blir en temporær nøkkel (tempkey) lagt til URL. Denne temporære nøkkelen skal benyttes i webservicekall til Altinn for å hente avgiveren brukeren har valgt i portalen. Det er altså viktig at den temporære nøkkelen kan videreføres igjennom fødereringen mot ID-porten, og dermed kan det være hensiktsmessig at applikasjonen mellomlagrer den temporære nøkkelen før sluttbrukeren blir «redirected» til ID-porten i forbindelse med føderering.

#### Sjekke sluttbrukers autorisasjon ved bruk av webservice
Når identiteten til sluttbrukeren er fastslått etter fødereringen fra ID-porten, og avgiver er mottatt i responsen fra Altinns webservice, må applikasjonen benytte Altinns autorisasjonswebservice for å få bekreftet at sluttbruker har rettigheter til å utføre spesifisert operasjon på lenketjenesten til tjenesteeieren for valgt avgiver.

### Integrasjon mot ID-porten
ID-Porten er Identity Provider for lenketjenester, og tjenesteeiere i Altinn som har lenketjenester må etablere en egen, standard, samarbeidsavtale med ID-porten. Dette fordi en slik tjenesteeier vil måtte ha en direkte integrasjon mot ID-porten.
DIFI har utarbeidet en tilslutningsguide som beskriver den jobben som må gjøres for å sette opp SAML-integrasjon mot ID-porten. Tilslutningsguiden finnes under ID-Porten > Dokumentasjon i [Samarbeidsportalen] (http://samarbeid.difi.no) til Difi.

### Utvikle Lenketjenesten i TUL
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

Tilgjengelige valg er:

-	Privatperson
-	Juridisk enhet
-	Bedrift
-	Konkursbo
-	Bedrift eller juridisk enhet
-	Person eller juridisk enhet
-	Bedrift, juridisk enhet eller konkursbo
-	Alle aktører
-	Sikkerhetsnivå – lenketjenester i Altinn 2 må settes opp med sikkerhetsnivå 3 eller 4, fordi ID-porten benyttes til autentisering og de tilbyr nivå 3 og 4.
-	Virksomhetsbrukere – angi om sluttbrukere skal kunne bruke virksomhetssertifikat til å logge inn. Med virksomhetssertifikat er det ingen knytning til fødselsnummeret til vedkommende som bruker tjenesten.
-	Samhandlingstjeneste – lenketjenester kan defineres til å kunne inngå i en samhandlingstjeneste. Da settes det et kryss på utgaven her, og utgaven vil være valgbar som tilgjengelig tjeneste for samhandlingstjenester.

#### Altinn rolle
På samme måte som andre tjenestetyper, må lenketjenestene knyttes til en eller flere Altinn-roller slik at tjenestene blir tilgjengelig for sluttbrukerne.
Altinn-rollene er knyttet til et sett med eksterne roller fra Enhetsregisteret (ER), og når tjenesteeier skal velge
hvilke(n) Altinn-rolle(r) som skal gi tilgang til tjenesten,er det viktig å tenke over en del ting:

-	Hvem skal bruke tjenesten – det må velges en eller flere roller som sikrer at alle aktuelle avgivere har tilgang til tjenesten. Ulike organisasjonstyper registrerer ulike typer eksterne roller i ER, og tjenesteeier må velge en Altinn-rolle som dekker ulike organisasjonstyper. F.eks vil et enkeltpersonsforetak kanskje bare ha innehaver registrert, mens et AS har både daglig leder, styreleder og revisor. Hvis både ENK’et og AS’et skal kunne benytte tjenesten, må Altinn-rollen som knyttes til tjenesten være knyttet til både Innehaver og Daglig leder, Styreleder eller Revisor. Tilgjengelige roller finnes på "rolleadministrasjonssiden" i TUL og i [portalhjelpen](https://www.altinn.no/no/Portalhjelp/Administrere-rettigheter-og-prosessteg/Rolleoversikt) i SBL.
-	Skal ulike roller har tilgang til å utføre ulike operasjoner på tjenesten? Dette kan man skille på i rolletilknytningen. Vær i midlertid oppmerksom på at Altinn kun sjekker at man har lese-tilgang til tjenesten ved instansiering. Hvis man ønsker en mer detaljert autorisasjonssjekk, må dette implementeres i tjenesteeiers tjeneste-applikasjon.

### Bruk av Altinns autorisasjonswebservice

Altinns webservice for autorisasjon kan benyttes av tjenesteiere til å foreta autorisasjonsbeslutninger basert på rolle og rettighetsregler og delegeringer som ligger i Altinns autorisasjonsdatabase. Dette gjør at eksterne tjenester som ikke benytter Altinns tjenestemotor likevel kan benytte Altinns autorisasjonsmodell på tjenesten. For lenketjenester, for eksempel en tjeneste hvor avgiver kan være en organisasjon, er dette sentralt.

Disse tabellene viser endepunktene og operasjonene for Altinns to webservices for autorisasjon som er aktuelle for lenketjenesten.

 **AuthorizationAdministration** [https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc?wsdl](https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc?wsdl)

| Input | Beskrivelse | Endepukt operasjon |
|--------|--------|--------|
| GetReporteeByTempKey | https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc | GetReporteeByTempKey |
| GetReportees | https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc | GetReportees |

**AuthorizationDecisionPointExternal** [https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc?wsdl] (https://www.altinn.no/AuthorizationExternal/AuthorizationDecisionPointExternal.svc?wsdl)

| Basis operasjon | URI/endepunkt | Endepukt operasjon |
|--------|--------|--------|
| ExternalReporteeBE | https://www.altinn.no/AuthorizationExternal/AuthorizationDecisionPointExternal.svc | AuthorizeAccessExternal |

| Input | Beskrivelse |
|--------|--------|
| tempKey | Nøkkel som angitt i lenketjenestens request URL, vil utgå etter at informasjon er hentet ut – pålagt parameter. |
| **Returverdi** | **Beskrivelse** |
| ExternalReporteeBE |ExternalReporteeBE-objekt. |

| Returverdi | Beskrivelse |
|--------|--------|
| Name | Avgivers navn|
| OrganizationNumber | Organisasjonsnummer for denne avgiveren hvis dette er en organisasjon. |
| SSN | Fødselsnummer for denne avgiveren hvis dette er en person. |
| Reportee Type | Typebeskrivelse for hvilken type avgiver dette er: None, Person, Organization, eller SelfIdentified (ikke et praktisk mulig scenario i denne sammenhengen). |

#### Eksempel Request

```xml
<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.altinn.no/services/Authorization/Administration/2010/10">
  <soap:Header/>
  <soap:Body>
    <ns:GetReporteeByTempKey>
      <ns:tempKey>76d4afac-f228-4055-bde5-f4aae0c6af8f</ns:tempKey>
    </ns:GetReporteeByTempKey>
  </soap:Body>
</soap:Envelope>
 ```

{{%attachments title="XML SOAP request" pattern="getReporteeByTempKeyReq.xml"/%}}

#### Eksempel Response

```xml
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

#### Feilsituasjoner
Dersom nøkkelen er ugyldig (for eksempel, på grunn av timeout, eller tidligere bruk) vil operasjonen returnere en Altinnfault. Den eksterne tjenesten bør da presentere en feilmelding for sluttbruker, og gi sluttbruker mulighet til å gå tilbake til Altinn (dyplenken til tjenesten) for å starte tjenesten på ny.


### AuthorizationDecisionPointExternal.AuthorizeAccessExternal

Når applikasjonen som driver den eksterne tjenesten har verifisert identiten til brukeren med føderering fra ID-porten, og mottatt avgiver (valgt av sluttbruker) ved kall til GetReporteeByTempKey, må det verifiseres at sluttbruker har rettighet til å benytte tjenesten for valgt avgiver. Dette gjøres med kall til AuthorizationDecisionPointExternal.AuthorizeAccesExternal.

AuthorizeAccessExternal operasjonen benytter XACML standarden og regler lagret i Altinn til å returnere en autorisasjonsbeslutning. Besluttningsgrunnlaget til autorisasjon for tjenester er de regler (rolleknytninger) som tjenesteeier har satt på lenketjenesten i TUL.

Det kreves en XACMLRrquest som gir et XACML standardisert svar

XACML-forespørselen skal inneholde en kombinasjon av følgende elementer:

| Foreldre-node	| AttributeId | Gyldige verdier i AttributeValue | Eksempel |
|--------|--------|--------|--------|
| Subject | urn:oasis:names:tc:xacml:2.0:subject: urn:altinn:ssn | Utførende brukers fødselsnummer |`<Attribute AttributeId="urn:oasis:names:tc:xacml: 2.0:subject:urn:altinn:ssn" DataType="http://www.w3.org/2001/XMLSchema#string">      <AttributeValue>07037512345</AttributeValue> </Attribute>`|
|Resource |urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn|Avgivers fødselsnummer|`<AttributeAttributeId="urn:oasis:names:tc:xacml:2.0: resource:urn:altinn:reportee-ssn"         DataType="http://www.w3.org/2001/XMLSchema#string">      <AttributeValue>010203401944</AttributeValue></Attribute>`|
|Resource|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno|Avgivers organisasjonsnnummer|`<Attribute AttributeId="urn:oasis:names:tc:xacml:2.0: resource:urn:altinn:reportee-orgno"            DataType="http://www.w3.org/2001/XMLSchema#string"> <AttributeValue>910453777</AttributeValue>      </Attribute>`|
|Resource|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode|Eksterne tjenestekoder|`<Attribute AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode"                   DataType="http://www.w3.org/2001/XMLSchema#string"> <AttributeValue>2298</AttributeValue> </Attribute>`|
|Resource|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode|Ekstern utgavekode (tilhørende overnevnte tjenestekode)|`</Attribute> <Attribute AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode"            DataType="http://www.w3.org/2001/XMLSchema#string"> <AttributeValue>60804</AttributeValue> </Attribute>`|
|Action|urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id|Read Write Sign ArchiveRead ArchiveDelete ServiceOwnerArchiveRead Delegate <br /> Hvilke operasjoner som kan benyttes for den aktuelle lenketjenesten defineres i TUL.|`<Attribute AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id"        DataType="http://www.w3.org/2001/XMLSchema#string"> <AttributeValue>Sign</AttributeValue> </Attribute>`|
|Environment|urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment|YT2 YT AT8 AT3 AT4 AT5 TT1 TT2 Prod|`<Attribute AttributeId="urn:oasis:names:tc:xacml:2.0: action:urn:altinn:environment"DataType="http://www.w3.org/2001/XMLSchema#string"> <AttributeValue>PROD</AttributeValue> </Attribute>`|

XACML-forespørselen skal inneholde **kun et Resource element** med kombinasjon av enten avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), samt ekstern tjenestekode og utgavekode (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode og urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode). Det må angis hvilket miljø requesten gjelder i Environment elementet (urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment). Altinn spesifikke elementer XACML-respons:

| Foreldre-node	| AttributeId | Gyldige verdier i AttributeValue | Eksempel |
|--------|--------|--------|--------|
|Obligation|urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:authenticationlevel|Autentiseringsnivå 0, 1, 2, 3, 4 Hvilke nivå som skal kreves for en resurs.|`<tns:Obligation FulfillOn="Permit" ObligationId=""> <tns:AttributeAssignment AttributeId="urn:oasis:names:tc:xacml:2.0:obligation:urn:altinn:authenticationlevel" DataType="http://www.w3.org/2001/XMLSchema#string">	<tns:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">3</tns:AttributeValue> </tns:AttributeAssignment> </tns:Obligation>`|

Nedenfor vises eksempler på gyldig forespørsler:

#### AuthorizationRequest:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Request
    xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os
   http://docs.oasis-open.org/xacml/access_control-xacml-2.0-context schemaos.xsd">
  <!-- Altinn Sample Request.   -->
  <!-- This authorization request tries to verify if user  -->
  <!-- 06069460079 is allowed to perform sign operation -->
  <!-- on behalf of reportee 910453777 -->
  <!-- on service 2298, edition 60804 -->
  <Subject>
   <Attribute
       AttributeId="urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn"
       DataType="http://www.w3.org/2001/XMLSchema#string">
    <AttributeValue>06069460079</AttributeValue>
    </Attribute>
  </Subject>
  <Resource>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reporte-orgno"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>910453777</AttributeValue>
    </Attribute>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>2298</AttributeValue>
    </Attribute>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>60804</AttributeValue>
    </Attribute>
  </Resource>
  <Action>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>Sign</AttributeValue>
    </Attribute>
  </Action>
</Request>
```
Operasjonen returnerer XML som også følger XACML standarden. Under vises et eksempel på en response.
#### AuthorizationResponse:
```xml
<xacml:Response xmlns:tns="urn:oasis:names:tc:xacml:2.0:policy:schema:os" xmlns:xacml="urn:oasis:names:tc:xacml:2.0:context:schema:os" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os http://docs.oasis-open.org/xacml/2.0/access_control-xacml-2.0-context-schema-os.xsd">
  <xacml:Result ResourceId="">
    <xacml:Decision>Permit</xacml:Decision>
    <xacml:Status>
      <xacml:StatusCode Value="urn:oasis:names:tc:xacml:2.0:response:urn:altinn:ok" />
	<xacml:StatusMessage></xacml:StatusMessage>
   </xacml:Status>
	<tns:Obligations>
		<tns:Obligation FulfillOn="Permit" ObligationId="">
			<tns:AttributeAssignment AttributeId="urn:oasis:names:tc:xacml:2.0:obligation:urn:altinn:authenticationlevel" DataType="http://www.w3.org/2001/XMLSchema#string">
				<tns:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">3</tns:AttributeValue>
        	 </tns:AttributeAssignment>
		</tns:Obligation>
	</tns:Obligations>
  </xacml:Result>
</xacml:Response>
```
Det er opprettet en Altinn-tilpasset XACML context XSD som kan brukes til å validere XACML request fra tjenesteeier. Denne inneholder de gyldige attributtene for XACML requester som sendes til Altinn.
Altinn XACML context XSD ligger på Altinnnett under systemdokumentasjon.

**Autorisasjonsbeslutning**
Dersom XACML responsen fra Altinn (<xacml:Decision>Permit</xacml:Decision>) indikerer at brukeren har rettighet til å utføre spesifisert operasjon for spesifisert avgiver på spesifisert tjenesteutgave, kan brukeren gis adgang til den eksterne tjenesten.

Men, dersom XACML responsen fra Altinn (<xacml:Decision>Deny</xacml:Decision>) indikerer at brukeren IKKE har rettighet til å utføre operasjoen, må applikasjonen nekte sluttbruker adgang til den eksterne tjenesten. Da bør sluttbruker gis mulighet til å velge avgiver på ny, og dette kan gjøres på flere måter:

1.	Sluttbruker kan sendes tilbake til Altinn (via dyplenke til tjenesten) for å velge avgiver på ny.
2.	Applikasjonen for eksterne tjenesten kan hente liste over sluttbrukers mulige avgivere ved kall til AuthorizationAdministration.GetReportees (se kapittel ) og gi sluttbruker mulighet til å velge avgiver på nytt i den eksterne tjenesten.

Uavhengig av valgt metode for å velge avgiver på nytt, må det gjøre et påfølgende kall til AuthorizeAccessExternal metoden.

**Feilsituasjoner**
Dersom Altinn ikke klarte å gjøre en korrekt beslutning for parameterne spesifisert i requesten, vil XACML responsen fra Altinn indikerere dette (<xacml:Decision>Indeterminate</xacml:Decision>). Ved annen teknisk feil vil operasjonen returnere en Altinnfault. Den eksterne tjenesten bør da presentere en feilmelding for sluttbruker, og gi sluttbruker mulighet til å gå tilbake til Altinn (dyplenken til tjenesten) for å starte tjenesten på ny.

#### AuthorizationAdministrationExternal.GetReportees

Metoden GetReportees returnerer alle mulige avgivere for en person (identifisert med fødselsnummer) uavhengig av hvilke roller/rettigheter denne personen har for avgiveren. Dermed må det også ved bruk av denne tjenesten utføres en påfølgende autorisasjonssjekk med XACML webservice mot en lenketjeneste som rollekravene for den eksterne tjenesten kan knyttes til.

Dersom tjenesteier ønker å la sluttbrukeren velge avgiver i egen tjeneste som standard, kan applikasjonen som driver ekstern tjeneste oppnå dette ved å bruke denne metoden.

Da må tjenesteeier gjøre følgende:

1. Opprette lenketjeneste i Altinn og knytte den til en Altinn rolle.  Dette gjør at roller/rettigheter for tjenesten kan delegeres i Altinns rolledelegeringside.
2. Implementere valg av avgiver i egen portal og bruke GetReportees til å få liste over mulige avgivere fra Altinn.
3. Implementere bruk av AuthorizeAccessExternal til å sjekke at brukeren har rettighet på tjenesten til til tjenesteier for valgt avgiver.

Da trenger ikke sluttbrukerne å gå innom Altinn for å bruke tjenesten. Men delegering av roller og rettigheter til tjenesten må fremdeles gjøres i Altinn.

Dersom tjenesteeier ikke ønsker å benytte valg av avgiver i Altinn kan de heller ikke benytte følgende servicekontroller på tjenesten:

1.	Kontroll av korrekt avgivertype (person, bedrift, juridisk enhet etc)
2. Kontroll av at avgiver er 18. år
3. Kontroll av at pålogget bruker har registrert epost i sin profil.

Tabellen under beskriver datakontrakten for operasjonen:

|Input|Beskrivelse|
|-----|-----|
|userSSN|Fødselsnummeret til brukeren det skal hentes avgivere for – pålagt parameter.|
|retrieveInActiveReportee|Flagg for å sette om også inaktive avgivere skal returneres, standard False – valgfri parameter.|
|RetrieveSubEnitiy|Flagg for å sette om også underenheter skal returneres, standard False – valgfri parameter.|
|maximumReporteeCount|Verdi for maksimum antall avgivere som skal returneres, standard satt til alle – valgfri parameter.|
|**Returverdi**||
|ExternalReporteeBEList|Liste med ExternalReporteeBE-objekter|
|Name|Avgivers navn|
|OrganizationNumber|Organisasjonsnummer for denne avgiveren hvis dette er en organisasjon|
|SSN|Fødselsnummer for denne avgiveren hvis dette er en person|
|ReporteeType|Typebeskrivelse for hvilken type avgiver dette er: None, Person, Organization, eller SelfIdentified (ikke et praktisk mulig scenario i denne sammenhengen)|

**Eksempel Request/Response**
GetReportees Request
```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.altinn.no/services/Authorization/Administration/2010/10">
   <soap:Header/>
   <soap:Body>
      <ns:GetReportees>
         <ns:userSSN>05116602352</ns:userSSN>
         <!--Optional:-->
         <ns:retrieveInActiveReportee>false</ns:retrieveInActiveReportee>
         <!--Optional:-->
         <ns:retrieveSubEnitiy>true</ns:retrieveSubEnitiy>
         <!--Optional:-->
         <ns:maximumReporteeCount>10</ns:maximumReporteeCount>
      </ns:GetReportees>
   </soap:Body>
</soap:Envelope>
```
GetReportees Response
```xml
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
   <s:Header>
      <a:Action s:mustUnderstand="1">http://www.altinn.no/services/Authorization/Administration/2010/10/IAuthorizationAdministrationExternal/GetReporteesResponse</a:Action>
      <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
         <u:Timestamp u:Id="_0">
            <u:Created>2012-11-29T09:06:49.796Z</u:Created>
            <u:Expires>2012-11-29T09:11:49.796Z</u:Expires>
         </u:Timestamp>
      </o:Security>
   </s:Header>
   <s:Body>
      <GetReporteesResponse xmlns="http://www.altinn.no/services/Authorization/Administration/2010/10">
         <GetReporteesResult xmlns:b="http://schemas.altinn.no/services/Authorization/Administration/2012/11" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <b:ExternalReporteeBE>
               <b:Name>Otta Transport AS Konkursbo</b:Name>
               <b:OrganizationNumber>910453092</b:OrganizationNumber>
               <b:ReporteeType>Organization</b:ReporteeType>
               <b:SSN i:nil="true"/>
            </b:ExternalReporteeBE>
            <b:ExternalReporteeBE>
               <b:Name>MJOSUNDET OG RYPEFJORD</b:Name>
               <b:OrganizationNumber>910059106</b:OrganizationNumber>
               <b:ReporteeType>Organization</b:ReporteeType>
               <b:SSN i:nil="true"/>
            </b:ExternalReporteeBE>
            <b:ExternalReporteeBE>
               <b:Name>HÅKON TRANA</b:Name>
               <b:OrganizationNumber i:nil="true"/>
               <b:ReporteeType>Person</b:ReporteeType>
               <b:SSN>05116602352</b:SSN>
            </b:ExternalReporteeBE>
         </GetReporteesResult>
      </GetReporteesResponse>
   </s:Body>
</s:Envelope>
```
**Feilsituasjoner**
Dersom sluttbrukeren (spesifisert med fødselsnummer) ikke har gitt samtykke til bruk av Altinn som privatperson eller for andre, vil GetReportees returnere en tom liste.

Dersom sluttbruker (spesifisert med fødselsnummer) ikke har gitt samtykke til å rapportere på vegne av organisasjoner eller andre personer, vil GetReportees kun returnere sluttbruker selv som mulig avgiver.

Dersom sluttbrukeren (spesifisert med fødselsnummer) ikke har gitt personlig samtykke i Altinn, vil GetReportees kun returnere organisasjoner eller andre personer som gyldige avgivere for sluttbrukeren.

I disse tilfellene må sluttbruker informeres om dette, og gis mulighet til å logge inn i Altinn for å gi sitt samtykke.

Dersom det fødselsnummeret spesifisert er ugyldig vil Altinn returnere en Altinnfault

## Feilsituasjoner i produksjon

Dersom det oppdages feil ved bruk av lenketjenesten, er det viktig at det indentifiseres hvor feilen ligger.
Feil i forbindelse med føderering fra ID-porten skal meldes til ID-porten og ikke til Altinn.

Dersom lenken til den eksterne tjenesten i Altinn er korrekt, det ikke er feil i forbindelse med føderering fra ID-porten, og tjenesteeier er sikker på at feilen ikke ligger i egen applikasjon bør tjenesteeier kontakte ASF. Feilmelding kan da sendes til tjenesteeier@altinn.no

Feilmeldingen må inneholde informasjon om tjenesten, tidspunkt for feilen og hvilke brukere og avgivere feilen dreier seg om. SOAP request og response for kall til Altinns autorisasjonswebservices må også vedlegges feilmeldingen.
