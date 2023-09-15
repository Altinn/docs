---
title: Autorisasjon
description: Operasjoner for Altinns autorisasjonskomponent.
weight: 800
toc: true;
---

{{% notice warning  %}}
Alle SOAPtjenester for Autorisasjon vil fases ut i forbindelse med overgang fra Altinn 2 til Altinn 3 plattform. 
Nye RESTAPI vil tilbys på Altinn 3 første halvdel av 2024. 
{{% /notice %}}

## AuthorizationAdministration

AuthorizationAdministration er tjenesten i Altinn for import av eksterne regler og ressurser brukt til å ta avgjørelser der Altinns autorisasjonskomponent benyttes.
Er tilknyttet tjenesten AuthorizationDecisionPointExternal som benytter importert informasjon.


### GetRoles
{{% notice warning  %}}
Alle SOAPtjenester for Autorisasjon vil fases ut i forbindelse med overgang fra Altinn 2 til Altinn 3 plattform. 
Nye RESTAPI vil tilbys på Altinn 3 første halvdel av 2024. 
{{% /notice %}}

Operasjon for å hente ut en liste over roller etter angitte søkekriterier

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**                       | **Beskrivelse**                                                  |
| ------------------------------- | ---------------------------------------------------------------- |
| systemUserName                  | Org.nummer for enheter, fødselsnummer for enkeltpersoner         |
| systemPassword                  | Passord                                                          |
| roleSearchBE                    | ExternalRoleSearchBE-objekt                                      |
| **Returverdi**                  | **Beskrivelse**                                                  |
| ExternalRoleBEList              | Liste med ExternalRoleBE-objekter                                |
| **Returverdi**                  | **Beskrivelse**                                                  |
|                                 | **ExternalRoleBE**                                               |
| RoleTypeSource                  |                                                                  |
| RoleCode                        | Rollekode                                                        |
| RoleName                        | Navn på rolle                                                    |
| OfferedBy                       | Enhet/bruker som rollen gjelder for                              |
| Enhet/bruker som innehar rollen | Enhet/bruker som innehar rollen                                  |
| DelegatedBy                     | Enhet/bruker som har delegert rollen                             |
|                                 | **ExternalRoleSearchBE**                                         |
| CoveredByParty                  | Enhet som innehar rollen                                         |
| CoveredByUser                   | Bruker som innehar rollen                                        |
| LanguageID                      | Språkid (English 1033, Bokmål 1044, Nynorsk 2068)                |
| OfferedByParty                  | Enhet som rollen gjelder for                                     |
| RoleCodeFilter                  | Filtrer med spesific rollekode. Støtte for kun 1 rolle om gangen |

Dersom man sender med verdi i søket (RoleSearch-objektet) for OfferedByParty, kan man ikke samtidig sende med verdier for  både CoveredByUser og CoveredByParty, og man kan heller ikke søke på OfferedParty uten å sende med verdi for enten CoveredByUser eller CoveredByParty.

**Eksempelkall:**

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.altinn.no/services/Authorization/Administration/2010/10" xmlns:ns1="http://schemas.altinn.no/services/Authorization/Administration/2009/10">
   <soap:Header/>
   <soap:Body>
      <ns:GetRoles>
         <ns:roleSearchBE>
            <ns1:CoveredByParty>orgnummer1</ns1:CoveredByParty>
            <ns1:CoveredByUser></ns1:CoveredByUser>
            <ns1:LanguageID>1044</ns1:LanguageID>
            <ns1:OfferedByParty>orgnummer2</ns1:OfferedByParty>
            <ns1:RoleCodeFilter></ns1:RoleCodeFilter>
         </ns:roleSearchBE>
      </ns:GetRoles>
   </soap:Body>
</soap:Envelope>
```

### GetReportees
{{% notice warning  %}}
Alle SOAPtjenester for Autorisasjon vil fases ut i forbindelse med overgang fra Altinn 2 til Altinn 3 plattform. 
Nye RESTAPI vil tilbys på Altinn 3 første halvdel av 2024. 
{{% /notice %}}

Operasjon for å hente ut en liste over mulige avgivere for et gitt fødselsnummer.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**                | **Beskrivelse**                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userSSN                  | Fødselsnummeret til brukeren det skal hentes avgivere for – pålagt parameter                                                                               |
| retrieveInActiveReportee | Flagg for å sette om også inaktive avgivere skal returneres, standard False – valgfri parameter                                                            |
| RetrieveSubEnitiy        | Flagg for å sette om også underenheter skal returneres, standard False – valgfri parameter                                                                 |
| maximumReporteeCount     | Verdi for maksimum antall avgivere som skal returneres, standard satt til alle – valgfri parameter                                                         |
| **Returverdi**           | **Beskrivelse**                                                                                                                                            |
| ExternalReporteeBEList   | Liste med ExternalReporteeBE-objekter                                                                                                                      |
| **Returverdi**           | **Beskrivelse**                                                                                                                                            |
| ExternalReporteeBEList   | Liste med ExternalReporteeBE-objekter                                                                                                                      |
| **Returverdi**           | **Beskrivelse**                                                                                                                                            |
|                          | **ExternalReporteeBE**                                                                                                                                     |
| Name                     | Avgivers navn                                                                                                                                              |
| OrganizationNumber       | Organisasjonsnummer for denne avgiveren hvis dette er en organisasjon                                                                                      |
| SSN                      | Fødselsnummer for denne avgiveren hvis dette er en person                                                                                                  |
| ReporteeType             | Typebeskrivelse for hvilken type avgiver dette er: None, Person, Organization, eller SelfIdentified (ikke et praktisk mulig scenario i denne sammenhengen) |

### GetReporteeByTempKey
{{% notice warning  %}}
Denne tjenesten med bruk av TempKey vil fases ut i forbindelse med overgang fra Altinn 2 til Altinn 3. Erstatning vil tilbys i Altinn 3 - men det vil kreve en del videreutvikling hos tjenesteeier for å benytte denne. Tjenesten fases ut senest første halvdel av 2025
{{% /notice %}}

Operasjon for å hente ut informasjon om avgiver basert på nøkkel opprettet for lenketjenesten.
Nøkkelen er kun gyldig i en tidsbegrenset periode, og kan kun benyttes en gang.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**          | **Beskrivelse**                                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tempKey            | Nøkkel som angitt i lenketjenestens request URL, vil utgå etter at informasjon er hentet ut – pålagt parameter                                             |
| **Returverdi**     | **Beskrivelse**                                                                                                                                            |
| ExternalReporteeBE | ExternalReporteeBE-objekt                                                                                                                                  |
| **Returverdi**     | **Beskrivelse**                                                                                                                                            |
|                    | **ExternalReporteeBE**                                                                                                                                     |
| Name               | Avgivers navn                                                                                                                                              |
| OrganizationNumber | Organisasjonsnummer for denne avgiveren hvis dette er en organisasjon.                                                                                     |
| SSN                | Fødselsnummer for denne avgiveren hvis dette er en person                                                                                                  |
| ReporteeType       | Typebeskrivelse for hvilken type avgiver dette er: None, Person, Organization, eller SelfIdentified (ikke et praktisk mulig scenario i denne sammenhengen) |

## AuthorizationDecisionPointExternal
{{% notice warning  %}}
Alle SOAPtjenester for Autorisasjon vil fases ut i forbindelse med overgang fra Altinn 2 til Altinn 3 plattform. 
Nye RESTAPI vil tilbys på Altinn 3 første halvdel av 2024. 
{{% /notice %}}

AuthorizationDecisionPointExternal er en tjeneste Altinn tilbyr til tjenesteeiere som ønsker å benytte Altinns autorisasjonskomponent.
Tjenesten kan benyttes til autorisasjon både for eksterne resurser og for tjenester.
Autorisasjons regler settes henholdsvis ved hjelp av AuthorizationAdministration tjenesten og i TUL.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

### AuthorizeAccessExternalV2
{{% notice warning  %}}
Alle SOAPtjenester for Autorisasjon vil fases ut i forbindelse med overgang fra Altinn 2 til Altinn 3 plattform. 
Nye RESTAPI vil tilbys på Altinn 3 første halvdel av 2024. 
{{% /notice %}}

Operasjon som benytter XACML standarden og regler lagret i Altinn til å returnere en autorisasjonsbeslutning.

Besluttningsgrunnlaget til autorisasjon for eksterne resurser er de regler som tjenesteeier selv setter ved hjelp av tjenesten AutorizationAdministration når resursen defineres. Besluttningsgrunnlaget til autorisasjon for tjenester er de regler som tjenesteeier har satt på tjenesten i TUL. 

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**      | **Beskrivelse**                 |
| -------------- | ------------------------------- |
| XACMLRequest   | XACML standardisert forespørsel |
| **Returverdi** | **Beskrivelse**                 |
| Resultat       | XACML standardisert svar        |
Tjenesten benytter en XSD til å validere input.

I tillegg er det en del regler relatert til utfylling som XSD ikke klarer fange opp. XACML-forespørselen skal inneholde en kombinasjon av følgende elementer:

| **Foreldrenode** | **AttributeId**                                                                                                              | **AttributeValue verdier**                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Subject          | urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn                                                                          | Utførende brukers fødselsnummer                                                                                                                 |
| Subject          | urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:orgno                                                                        | Utførende organisasjons organisasjonsnummer                                                                                                     |
| Subject          | urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:oauth-accesstoken                                                            | Referanse token for et spesifikk samtykke utførende bruker/org skal benytte. Må hentes fra AuthorizationExternal/TokenExternalEC.svc tjenesten. |
| Resource         | urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn                                                                | Avgivers fødselsnummer                                                                                                                          |
| Resource         | urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno                                                              | Avgivers organisasjonsnummer                                                                                                                    |
| Resource         | urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource                                                           | Ekstern ressursdefinisjon                                                                                                                       |
| Resource         | urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode                                                         | Eksterne tjenestekode                                                                                                                           |
| Resource         | urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode                                                  | Ekstern utgavekode (tilhørende overnevnte tjenestekode)                                                                                         |
| Resource         | urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reporteeelementid                                                           | Den unike id'en til et aktivt reportee element / correspondence                                                                                 |
| Resource         | urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:archivereporteeelementid                                                    | Den unike id'en til et arkivert reportee element / correspondence                                                                               |
| Action           | urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id                                                                     | Read, Write, Sign, ArchiveRead, ArchiveDelete, Access, ServiceOwnerArchiveRead, Delegate                                                                      |
| Environment      | urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment                                                                   | Angir miljø. Gyldige verdier er; DEV, ATxx, YTxx, TT2, PROD                                                                                                                          |

Mulige Subject kombinasjoner:

1.	Utførende brukers fødselsnummer (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn) eller utførende oranisasjons org.nummer (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:orgno)
2.	Utførende brukers fødselsnummer (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn) eller utførende oranisasjons org.nummer (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:orgno), og referanse token for relatert samtykke (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:oauth-accesstoken).

Mulige Resource kombinasjoner:

1. Ekstern tjenestekode og utgavekode:    
Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ekstern tjenestekode og utgavekode (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode og urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode)
2. Ekstern ressursdefinisjon:    
Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ekstern ressursdefinisjon (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource).
3. ReporteeElementId:    
Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ReporteeElementId (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reporteeelementid).
4. ArchiveReporteeElementId:    
Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ArchiveReporteeElementId (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:archivereporteeelementid).

Signeringsrettigheter oppfører seg noe annerledes enn de andre. Signering er en rettighet som kun kan gis på konkrete prosesssteg i livsløpet til et element. For å kunne gi helt korrekt svar på om en person har lov til å signere er Altinn derfor avhengig av å få oppgitt id til et reporteeelement.

Unntaket fra dette er om en tjeneste har kun ett signeringssteg. I et slikt tilfelle kan Altinn anta at når det endelig skal signeres så vil aktivt prosesssteg være dette ene steget. På slike tjenester er det derfor trygt å oppgi tjenestekoder istedenfor reporteeelementid.

Hvis en tjeneste har flere signeringssteg vil Altinn velge det første signeringssteget i prosessen. Dette kan i enkelte tilfeller føre til feil konklusjon. Hvis for eksempel en revisor skal signere et element i signeringssteg 2 (etter regnskapsfører), så kan Altinn svare negativt på spørsmål om revisor kan signere (benytter sign steg 1) selv om revisor vil få lov når elementet endelig kommer til revisors signeringssteg i prosessen.

Altinn selv har ikke mulighet til å sjekke signeringsrettighet uten å ha id til et reporteeelement. Sjekk av signeringsrettighet basert på tjenestekoder er logikk laget spesielt for AuthorizeAccessExternalV2.

Sjekk på arkiv operasjonene ArchiveRead og ArchiveDelete på element nivå kan gjøres både ved forespørsel på arkiv element id og på aktivt element eller correspondence id fra før elementet ble arkivert. Oppgir man aktivt element eller correspondence id vil Altinn selv forsøke å slå opp arkiv id og autorisere tilgang for denne, er elementet ikke arkivert enda får man besluttningen: Indeterminate.

Det må også angis hvilke miljø det gjelder (urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment). Gyldige verdier for tjenesteutvikling er DEV, TT2, PROD. For AT og YT miljø oppgis , AT+nr eller YT+nr, f eks AT20, eller YT1.

Nedenfor vises eksempler på gyldige forespørsler:

**AuthorizationRequest**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Request
    xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os 
      http://docs.oasis-open.org/xacml/access_control-xacml-2.0-context-schema-os.xsd">

  <!-- Altinn Sample Request.   -->
  <!-- This authorization request tries to verify if user 07037612345 is allowed to  -->
  <!-- perform read operation on external resource belonging to reportee 010203401944      -->
  <!-- there is a registered consent for the record.                  -->

  <Subject>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>07037512345</AttributeValue>
    </Attribute>
  </Subject>
  <Resource>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>010203401944</AttributeValue>
    </Attribute>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource"
            DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>RF1080NAV</AttributeValue>
    </Attribute>
  </Resource>
  <Action>
    <Attribute
          AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id"
          DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>Read</AttributeValue>
    </Attribute>
  </Action>
  <Environment>
    <Attribute 
        AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment" 
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>AT6</AttributeValue>
    </Attribute>
  </Environment>
</Request>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Request
    xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os 
      http://docs.oasis-open.org/xacml/access_control-xacml-2.0-context-schema-os.xsd">

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
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno"
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
  <Environment>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>TT02</AttributeValue>
    </Attribute>
  </Environment>
</Request>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Request
    xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os 
      http://docs.oasis-open.org/xacml/access_control-xacml-2.0-context-schema-os.xsd">

  <!-- Altinn Sample Request.   -->
  <!-- This authorization request tries to verify if user  -->
  <!-- 06069460079 is allowed to perform ArchiveRead operation on an Archived reportee element -->

  <Subject>
   <Attribute
       AttributeId="urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn"
       DataType="http://www.w3.org/2001/XMLSchema#string">
    <AttributeValue>06069460079</AttributeValue>
    </Attribute>
  </Subject>
  <Resource>
    <Attribute AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:archivereporteeelementid" DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>1053165</AttributeValue>
    </Attribute>
  </Resource>
  <Action>
    <Attribute AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id" DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>ArchiveRead</AttributeValue>
    </Attribute>
  </Action>
  <Environment>
    <Attribute AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment" DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>TT02</AttributeValue>
    </Attribute>
  </Environment>
</Request>
```

Operasjonen returnerer XML som også følger XACML standarden. Under vises et eksempel på en response.

**AuthorizationResponse**

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
