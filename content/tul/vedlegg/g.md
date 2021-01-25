---
title: "G: Web Service-oppslag fra InfoPath"
linktitle: "G: Web Service-oppslag"
description: Dette vedlegget inneholder en beskrivelse av hvordan man kan gjøre web service-oppslag fra et InfoPath-skjema.
toc: true
weight: 7
---

Web service-oppslag vil være i kjernen i hvordan registeroppslag fungerer. Dette vil fungere på den måten at skjemaet vil kontakte registeret med predefinerte parametere
og deretter få et svar som man kan behandle i skjema. Denne veiledningen vil derfor beskrive en generell fremgangsmåte for hvordan gjøre et
web service-oppslag i InfoPath-skjema. Eksempeldataene benyttet i fremgangsmåten tilhører *Hent arkivreferanse.* P.t. er det ikke andre
skjemaspesifikke tjenester tilgjengelig.

## Hvordan kalle en WebService fra et InfoPath skjema

Legg til en datatilkobling ved å tab’en som heter Data i InfoPath. Velg deretter Datatilkoblinger og deretter Legg til…

Man må så velge å opprette en ny tilkobling for å motta data, og dette via en webtjeneste.

Adressen som angis for webtjenesten vil kunne variere iht hvilket oppslag som skal gjøres, for eksempel vil adressen for å hente
arkivreferanse være  
https://infopathservices.altinn.no:87/ServiceEngine/ReporteeElementListInfoPath.svc?WSDL

![Figur 204 – Hent arkivreferanse](/docs/images/guides/tul/ws-hent-arkivreferanse.png?width=700 "Figur 204 – Hent arkivreferanse")

Når denne adressen er angitt, vil InfoPath forsøke å kontakte tjensten for å hente en liste over operasjoner. Antall operasjoner og navn vil
variere med tjenesten. Velg deretter operasjonen du ønsker å benytte.

Husk å fjern avkryssning for om data skal hentes når skjema åpnes hvis data ikke skal hentes før man trykker på en knapp i skjemaet.

Akkurat samme måte benyttes for å koble innsynstjenester mot operasjoner i mappere.

Adressen for å koble seg mot en gitt mapper vil være:
```
http://mapperservices.altinn.no:87/ServiceEngine/Mappers/<tjenesteeierkode>/X.svc?WSDL
```
Der `<tjenesteeierkode>` er tjenesteeierkode (SKD/NAV/etc) og `X` styres av tjenesteeier selv.

Nå er datastrukturen fra oppslaget tilgjengelig som en sekundær datakilde og kan derfor benyttes i skjema. Det er verdt å merke seg at for
de fleste spesifikke Altinn registeroppslagene vil man måtte autentisere seg, og at enhetstest i InfoPath derfor vil være vanskelig. Se
neste kapittel for kode som må legges inn for spesifikke oppslag.

Resultatet fra oppslaget kan vises i skjemaet på mange måter. Et eksempel er en repeterende tabell som populeres på bakgrunn av klikk på
knappen *Hent arkivreferanser.*

![Figur 205 – Registeroppslag inn i repeterende tabell](/docs/images/guides/tul/ws-registeroppslag-repeterende.png?width=700 "Figur 205 – Registeroppslag inn i repeterende tabell")

For å angi registeroppslaget skal utføres eller den eksterne tjensten skal kalles ved trykk på knappen, må det lages en regel på knappen som
skal brukes til å kalle Web servicen. Dette gjøres ved å høyreklikke på knappen og velge *Egenskaper for knapp...* og deretter klikke på
*Regler...* og velge *Legg til...* Man må nå angi et navn på regelen. Dette navnet kan være selvvalgt. Velg *Legg til handling...* og velg
*Spørring ved hjelp av datatilkobling* i nedtrekkslisten for *Handling*. Nå må den sekundære tilkoblingen velges.

Nå vil oppslaget utføres ved klikk på knappen.

Som nevnt tidligere vil enkelte mapper/registeroppslag kreve ekstra informasjon fra skjemaet for å kunne autentisere seg, samt vite hvilke
brukerspesifikke data som skal hentes ut.

Neste kapittel vil vise dette for Altinn spesifikke oppslag.

## Sjekkpunkter for InfoPath skjemaer for innsynstjenester

### Forutsetninger for data hentes når skjema åpnes

Verdiene for alle sekundære datakilder som benyttes for Web/Utskrift/Signatur visninger, må kopieres til deres tilsvarende motparter i
skjemaets hoveddatakilden. Dette må og gjøres for egendefinerte felter som benyttes som presentasjonsfelt. Alternativt kan verdiene fra
felter i sekundære data kilder overføres til felter i skjemaet som allerede ligger i hoveddatakilden.

### Forutsetninger for at data hentes på forespørsel ved bruk av knapper

Disse må og følge forutsetnignene beskrevet ovenfor. Det et ønskelig at data hentes når knappen blir trykket på. Knappene som benyttes ha
følgende instillinger:

Handling settes til “Regler og egendefinert kode”:

![Figur 206 - Regler og egendefinert kode](/docs/images/guides/tul/regler-og-egendefinert-kode.png "Figur 206 - Regler og egendefinert kode")

Etter at “Handling” er satt, må du skrive inn koden som er beskrevet nedenfor:

![Figur 207 - Rediger skjemakode](/docs/images/guides/tul/rediger-skjemakode.png "Figur 207 - Rediger skjemakode")

Vi må legge til en linje i koden for at knappen skal kommunisere med hovedsiden. Følgende kode må da legges til i formcode.cs:

![Figur 208 - FormCode](/docs/images/guides/tul/form-code.png?width=700 "Figur 208 - FormCode")


## C\# kode for registeroppslag

Legg inn C\# kode i *Loading* eventen til skjema. Koden skal hente ut portal parametre som skal benyttes i kallet til web servicen. Dette er
data som hentes ut fra `FormState` under skjemautfylling i portalen.

Eksemplet under viser hvordan dette skal kodes, og legg merke til at det enkelte skjemaspesifikke verdier som må settes, bl.a. ekstern
tjenestekode og ekstern utgavekode.

```csharp
public void FormEvents_Loading(object sender, LoadingEventArgs e)
{
    string opensso = FormState["OpenSSOID"] as string;
    string userid = FormState["UserID"] as string;
    string reporteeElementID = FormState["ReporteeElementID"] as string;
    string reporteeID = FormState["ReporteeID"] as string;
    string language = FormState["Language"] as string;

    XPathNavigator secDS = this.DataSources["GetArchivedFormTaskList"].CreateNavigator();
    XPathNavigator node = secDS.SelectSingleNode( "/dfs:myFields/dfs:queryFields/tns:GetArchivedFormTaskList/tns:userID", NamespaceManager);

    if (node != null && userid != null)
    {
        node.SetValue(userid);
    }
    node = secDS.SelectSingleNode( "/dfs:myFields/dfs:queryFields/tns:GetArchivedFormTaskList/tns:reporteeID", NamespaceManager);

    if (node != null && reporteeID != null)
    {
        node.SetValue(reporteeID);
    }
    node = secDS.SelectSingleNode( "/dfs:myFields/dfs:queryFields/tns:GetArchivedFormTaskList/tns:serviceCode", NamespaceManager);

    if (node != null)
    {
        node.SetValue("132323"); //Legg inn serviceCode for det aktuelle skjemaet
    }
    node = secDS.SelectSingleNode( "/dfs:myFields/dfs:queryFields/tns:GetArchivedFormTaskList/tns:altinnIServiceCode", NamespaceManager);

    if (node != null)
    {
        node.SetValue("0"); //Legg inn altinnIServiceCode (OR form nummer) for det aktuelle skjemaet, 0 hvis ikke altinn1 skjema
    }
    node = secDS.SelectSingleNode( "/dfs:myFields/dfs:queryFields/tns:GetArchivedFormTaskList/tns:languageID", NamespaceManager);

    if (node != null && language != null)
    {
        node.SetValue(language);
    }
}

```


Dette er et kodeeksempel som er spesifikt for GetArchivedFormTaskList, for andre web service kall så vil navn på sekundær datakilde og Xpath
uttrykk endres. For kall til andre (ikke Altinn) tjenester vil det ikke være nødvendig å hente ut parametre fra *FormState*.

## Bruk av AltinnMapperContext

AltinnMapperContext er en kontekst XML som du kan bruke i InfoPath skjema og i mapper og som blant annet gir deg tilgang til UserID,
Username, Firstname, ReporteeNumber, ServiceOwnerCode etc. I figuren nedenfor ser du alle elementene vi kan hente ut fra AltinnMapperContext

![AltinnMapperContext](/docs/images/guides/tul/altinn-mapper-context.png "AltinnMapperContext")

Du kan få tilgang til alle parametrene fra AltinnMapperContext direkte i skjema ved å bruke InfoPath regler i motsetning til ved bruk av
FormState varibler der man må bruke C\# kode for å hente ut opplysninger om innlogget bruker og avgiver.

Mappere som utvikles og deployes til SBL kan rent teknisk kalles av alle InfoPath-skjema i løsningen, også på tvers av tjenesteiere. Dette
kan være en sikkerhetsrisiko. Ved å benytte seg av AltinnMapperContext i mapper kan man forsikre seg om at bare de som har authentisert seg
og valgt riktig avgiver skal få gjort kall mot gitte eksterne ressurser gjennom mapperen.

For å bruke AltinnMapperContext i InfoPath skjema må du legge til fila AltinnMapperContext.xml som en sekundær datakilde.
AltinnMapperContext ligger under TULShare her: `\\alt-tul-db-c02\tulshare\InfoPath\Etater`

For å legge til AltinnMapperContext som en sekundær datakilde i InfoPath skjema kan du gjøre følgende:

1. Åpne InfoPath skjema og gå inn på fanen Data
2. Gå inn på «Fra andre kilder» og velg «Fra XML fil»
3. Bla deg frem til AltinnMapperContext.xml på TULShare (se figur under) og trykk på neste
   ![Veiviser for datatilkobling](/docs/images/guides/tul/infopath-veiviser-datatilkobling.png "Veiviser for datatilkobling")
4. Det kommer da opp et vindu med en advarsel om at tilkoblinger til XML filer ikke søttes i en nettverksbane men denne meldingen kan man
   bare se bort fra og trykke på neste knappen. Dataen vil bli inkludert som en ressursfil i skjema.
5. Tilslutt kommer det opp at vindu der man kan endre navn på datatilkoblingen, vi anbefaler bare at navnet «AltinnMapperContext» bare står
6. Fjern haken for å hente data automatisk når skjemaet åpnes hvis man ikke har et absolutt behov for dette.
7. Åpner man vindu for datatilkoblingene til InfoPath skjema ser man nå at AltinnMapperContext er blitt lagt til som en sekundær datakilde i skjema.

For å teste ut at InfoPath skjema får tak i data fra AltinnMapperContext kan man bruke et felt i hoveddatakilden som skal vise verdien fra
et felt i AltinnMapperContext.

Hvis man har behov for å enhetsteste AltinnMapperContext fra InfoPath kan man fylle XML fila med testdata. Det er først når man har migrert
skjema til sluttbrukerløsningen at AltinnMapperContext blir fylt med reelle data.

For kommunikasjon med mappere så er det spesielt elementet AltinnMapperContext/ContextXml (en Base64 enkodet og signert representasjon av de
samme dataene) som er interessant. Denne skal sendes med i forespørselen til mapperen på lik linje med andre funksjonelle felter.»

## Tilgjengelige webtjenester og oppslag

Sluttbrukerløsningen tilbyr et sett med webtjenester og mapper-operasjoner som kan benyttes i InfoPath-skjema. Disse webtjenestene muliggjør
oppslag i sluttbrukerløsningens register over personer og enheter, men også andre komponenter som liste over arbeidselementer til den
enkelte avgiver.

Under følger en oversikt over webtjenestene. Mapper-implementasjonene utvikles av den enkelte tjenesteeier og listes derfor ikke her.  
Se eksempel i [C\# kode for registeroppslag](#c-kode-for-registeroppslag) for hvordan parameterne skal settes.

### GetArchivedFormTaskList

Henter en liste over arkiverte skjemasett/avgiverelementer basert på input parameterne.


| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int altinnIServiceCode       | Valgfri: Angir OrFormNumber for den tjenesten som skal hentes fra Altinn1 arkiv.
| string serviceCode           | Valgfri: Angir ServiceCode(ekstern tjenestekode) for den tjenesten som skal hentes fra Altinn2 arkiv.
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| int reporteeID               | Kan hentes med `FormState["ReporteeID"] as string`
| int languageID               | Kan hentes med `FormState["Language"] as string`

Begge de valgfri parameterne er teknisk sett valgfrie, men minst en av de to parameterne må angis.  

 - **Endepunkt**: [ServiceEngine.ReporteeElementList]
 - **Returverdi**: [ArchivedFormTaskIPBEList](#archived-form-task-ip-be-list)

### GetFormSetElements

Henter en liste som inneholder alle elementer i det gjeldende skjemasett/avgiverelement.
Listen inneholder tre typer elementer: hovedskjema, vedleggskjema og binære vedlegg.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| int reporteeElementID        | Kan hentes med `FormState["ReporteeElementID"] as string`
| int languageID               | Kan hentes med `FormState["Language"] as string`

 - **Endepunkt**: [ServiceEngine.ReporteeElementList]
 - **Returverdi**: [FormSetElementBEList](#formset-element-be-list)

### GetOrganizationRegisterData

Henter data om en organisasjon basert på organisasjonsnummer.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| int orgNO                    | Påkrevd: Angir organisasjonsnummer for den organisasjonen som skal hentes.

 - **Endepunkt**: [Register.RegisterER]
 - **Returverdi**: [OrganizationRegisterBE](#organization-register-be)

### GetOrganizationRegisterDataV2

Henter data om en organisasjon basert på organisasjonsnummer. Støtter enhetsnavn på mer en 35 tegn.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| int orgNO                    | Påkrevd: Angir organisasjonsnummer for den organisasjonen som skal hentes.

 - **Endepunkt**: [Register.RegisterER]
 - **Returverdi**: [OrganizationRegisterBE](#organization-register-be)

### GetOrganizationsOfferingRole

Henter liste som inneholder juridiske underenheter av en organisasjon basert på organisasjonsnummer.

| Input                              | Beskrivelse
| ---------------------------------- | ----------------------------------------------------------------------------------
| string coveredByOrganizationNumber | Påkrevd: Angir organisasjonsnummer for den organisasjonen som liste skal hentes fra.
| string role                        | Påkrevd: Angir rolle

 - **Endepunkt**: [Register.RegisterER]
 - **Returverdi**: [OrganizationBEList](#organization-be-list)

### ValidateEmailAddress

Validerer epostadresse.

| Input              | Beskrivelse
| ------------------ | -----------------------
| string verdi       | Epost

 - **Endepunkt**: [ServiceEngine.FormsEngineInfoPathCodeLibrary]
 - **Returverdi**: `bool` (true/false)

### ValidateModulus11OrgNumber

Validerer organisasjonsnummeret.

| Input              | Beskrivelse
| ------------------ | -----------------------
| string verdi       | Organisasjonsnummer

 - **Endepunkt**: [ServiceEngine.FormsEngineInfoPathCodeLibrary]
 - **Returverdi**: `bool` (true/false)

### ValidateModulus11Fnumber

Validerer fødselsnummeret.

| Input              | Beskrivelse
| ------------------ | -----------------------
| string verdi       | Fødselsnummer

 - **Endepunkt**: [ServiceEngine.FormsEngineInfoPathCodeLibrary]
 - **Returverdi**: `bool` (true/false)

### ValidateModulus11BankAccount

Validerer kontonummeret.

| Input              | Beskrivelse
| ------------------ | -----------------------
| string verdi       | Kontonummer

 - **Endepunkt**: [ServiceEngine.FormsEngineInfoPathCodeLibrary]
 - **Returverdi**: `bool` (true/false)

### GetPersonRegisterData

Henter data om en person, basert på både fødselsnummer og etternavn.
Begge parametere må stemme overens for at data skal returneres om en person.
Dette er en mekanisme som sørger for at man bare kan hente data for personer som man vet både fødselsnummer og navn på.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| string SSN                   | Påkrevd: Angir fødselsnummer for den personen som skal hentes.
| string lastName              | Påkrevd: Angir etternavn for den personen som skal hentes.

 - **Endepunkt**: [Register.RegisterDSF]
 - **Returverdi**: [PersonRegisterBE](#person-register-be)

### GetPersonRegisterDataV2

Henter data om en person, basert på både fødselsnummer og etternavn.
Begge parametere må stemme overens for at data skal returneres om en person.
Dette er en mekanisme som sørger for at man bare kan hente data for personer som man vet både fødselsnummer og navn på.

Denne metoden er utgått og vil bli fjernet fra fremtidige leveranser av SBL og må derfor omgående byttes ut med [GetPersonRegisterDataV3](#getpersonregisterdatav3).

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| string SSN                   | Påkrevd: Angir fødselsnummer for den personen som skal hentes.
| string lastName              | Påkrevd: Angir etternavn for den personen som skal hentes.

 - **Endepunkt**: [Register.RegisterDSF]
 - **Returverdi**: [PersonRegisterV2BE](#person-register-v2-be)

### GetPersonRegisterDataV3

Henter data om en person, basert på både fødselsnummer og etternavn.
Begge parametere må stemme overens for at data skal returneres om en person.
Dette er en mekanisme som sørger for at man bare kan hente data for personer som man vet både fødselsnummer og navn på.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| string SSN                   | Påkrevd: Angir fødselsnummer for den personen som skal hentes.
| string lastName              | Påkrevd: Angir etternavn for den personen som skal hentes.

 - **Endepunkt**: [Register.RegisterDSF]
 - **Returverdi**: [PersonRegisterV2BE](#person-register-v2-be)

### GetFamily

{{% notice warning  %}}
Merk at denne metoden kun kan benyttes av tjenesteeier med hjemmel til taushetsbelagt informasjon fra Folkeregisteret. Evt bruk av dette oppslaget må derfor avklares før tjenesten kan tas i bruk. Pr i dag kan tjenesten benyttes av Helsedirektoratet. 
{{% /notice %}}

Henter resten av familien basert på et fødselsnummer etter de prinsipper som gjelder i dagens flyttemelding:

 - Dersom et familioverhode(far eller mor) oppgis, hentes andre familioverhoder og deres barn.
 - Dersom et barn i en familie oppgis, så hentes bare dette barnet.
 - Døde familiemedlem returneres ikke.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| string fNumber               | Påkrevd: Angir fødselsnummer for den personen som familie skal hentes for.

 - **Endepunkt**: [Register.RegisterDSF]
 - **Returverdi**: [PersonRegisterBEList](#person-register-be-list)

### GetCompleteFamily
{{% notice warning  %}}
Merk at denne metoden kun kan benyttes av tjenesteeier med hjemmel til taushetsbelagt informasjon fra Folkeregisteret. Evt bruk av dette oppslaget må derfor avklares før tjenesten kan tas i bruk. Pr i dag kan tjenesten benyttes av Helsedirektoratet. 
{{% /notice %}}

Henter resten av familien basert på et fødselsnummer uavhengig av brukerens rolle i familien.
Døde familiemedlem returneres ikke.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| string fNumber               | Påkrevd: Angir fødselsnummer for den personen som familie skal hentes for.

 - **Endepunkt**: [Register.RegisterDSF]
 - **Returverdi**: [PersonRegisterBEList](#person-register-be-list)

### GetStreetNames

Henter en liste med gatenavn som passer med søkeparameterne.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| string municipalNumber       | Valgfri: Angir kommunen som skal søkes i.
| string streetName            | Valgfri: angir søkestreng for gatenavn.

 - **Endepunkt**: [Register.RegisterCommon]
 - **Returverdi**: [StreetBEList](#street-be-list)

### GetProperty

Henter en liste over eiendommer som passer med søkekriteriene som er angitt som innparametere.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| int userID                   | Kan hentes med `(int)FormState["UserID"]`
| string municipalNumber       | Påkrevd: Kommunenummer
| string landNumber            | Påkrevd: Gårdsnummer
| string titleNumber           | Påkrevd: Bruksnummer
| string leaseNumber           | Valgfri: Festenummer
| string subNumber             | Valgfri: Undernummer

 - **Endepunkt**: [Register.RegisterCommon]
 - **Returverdi**: [PropertyBEList](#property-be-list)

### GetApartmentNumbersForPropertyAddress

Henter en liste over bolignummer som er tilgjengelig på en addresse.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| string municipalNumber       | Påkrevd: Kommunenummer
| string landNumber            | Påkrevd: Gårdsnummer
| string titleNumber           | Påkrevd: Bruksnummer
| string leaseNumber           | Påkrevd: Festenummer
| string subNumber             | Påkrevd: Undernummer

 - **Endepunkt**: [Register.RegisterCommon]
 - **Returverdi**: [ApartmentNumberBEList](#apartment-number-be-list)

### GetApartmentNumbersForStreetAddress

Henter en liste over bolignummer som er tilgjengelig på en addresse.

| Input                        | Beskrivelse
| ---------------------------- | ----------------------------------------------------------------------------------
| string municipalNumber       | Påkrevd: Kommunenummer
| string streetCode            | Påkrevd: Gatekode
| string houseNumber           | Påkrevd: Husnummer
| string houseLetter           | Valgfri: Husbokstav returnerer bare den spesifiserte husbokstaven og dersom den er utelatt leter den bare etter bolignummer for adresser uten husbokstav.

 - **Endepunkt**: [Register.RegisterCommon]
 - **Returverdi**: [ApartmentNumberBEList](#apartment-number-be-list)


[ServiceEngine.ReporteeElementList]: http://infopathservices.altinn.no:87/ServiceEngine/ReporteeElementListInfoPath.svc?wsdl
[Register.RegisterER]: http://infopathservices.altinn.no:87/Register/RegisterERInfoPath.svc?wsdl
[Register.RegisterCommon]: http://infopathservices.altinn.no:87/Register/RegisterCommonInfoPath.svc?wsdl
[Register.RegisterDSF]: http://infopathservices.altinn.no:87/Register/RegisterDSFInfoPath.svc?wsdl
[ServiceEngine.FormsEngineInfoPathCodeLibrary]: http://infopathservices.altinn.no:87/ServiceEngine/FormsEngineInfoPathCodeLibrary.svc?wsdl


## Returverdier

<table>
<thead>
<tr>
    <th>Navn</th>
    <th>Datatype</th>
    <th>Beskrivelse</th>
    <th>Eksempel</th>
</tr>
</thead>
<tbody>
<tr>
    <td><strong>ArchivedFormTaskIPBEList</strong><a id="archived-form-task-ip-be-list"></a></td>
    <td></td>
    <td>Liste med ArchivedFormTaskIPBE</td>
    <td></td>
</tr>
<tr>
    <td><strong>ArchivedFormTaskIPBE</strong><a id="archived-form-task-ip-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>Title</td>
    <td>string</td>
    <td>Navn</td>
    <td></td>
</tr>
<tr>
    <td>ArchivedDate</td>
    <td>DateTime</td>
    <td>Dato og tidspunkt for når skjemasettet ble arkivert</td>
    <td>yyyy-MM-ddThh:mm:ss</td>
</tr>
<tr>
    <td>ArchiveReference</td>
    <td>string</td>
    <td>Unik referanse for melding i Altinn arkiv.</td>
    <td>AR94295 (Altinn2)<br>AM11111 (Altinn1)</td>
</tr>
<tr>
    <td><strong>FormSetElementBEList</strong><a id="formset-element-be-list"></a></td>
    <td></td>
    <td>Liste med FormSetElementBE</td>
    <td></td>
</tr>
<tr>
    <td><strong>FormSetElementBE</strong><a id="formset-element-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>IconFileName</td>
    <td>AttachmentType</td>
    <td>Filnavn for ikon</td>
    <td></td>
</tr>
<tr>
    <td>ItemID</td>
    <td>int</td>
    <td>ID-en til hovedskjema, underskjema eller binært vedlegg i dette skjemasettet</td>
    <td></td>
</tr>
<tr>
    <td>ItemName</td>
    <td>string</td>
    <td>Navn på hovedskjema, underskjema eller binært vedlegg.</td>
    <td></td>
</tr>
<tr>
    <td>ItemURL</td>
    <td></td>
    <td>URL for å åpne hovedskjema, uinderskjema eller binært vedlegg.</td>
    <td></td>
</tr>
<tr>
    <td>ItemType</td>
    <td>ItemTypeEnum</td>
    <td>Hovedskjema, underskjema eller vedlegg.</td>
    <td>1: Hovedskjema<br>2: Underskjema<br>3: Vedlegg</td>
</tr>
<tr>
    <td>ValidationStatusType</td>
    <td>FormValidationStatusType</td>
    <td>Valideringsstatus</td>
    <td>1: Gyldig<br>2: Ugyldig<br>3: Ikke validert</td>
</tr>
<tr>
    <td>IsSigningMandatory</td>
    <td>bool</td>
    <td>Indikerer om hoved- eller underskjemaet må signeres.</td>
    <td></td>
</tr>
<tr>
    <td>CreatedByUserID</td>
    <td>int</td>
    <td>ID-en til innlogget bruker.</td>
    <td></td>
</tr>
<tr>
    <td>CreatedDateTime</td>
    <td>DateTime</td>
    <td>Opprettelsesdato for vedlegg.</td>
    <td>yyyy-MM-ddThh:mm:ss</td>
</tr>
<tr>
    <td>IsAddedAfterFormFillin</td>
    <td>bool</td>
    <td>Indikerer om vedlegget er lagt til etter at skjema er utfylt.</td>
    <td></td>
</tr>
<tr>
    <td>DestinationType</td>
    <td>UserTypeRestriction</td>
    <td>Destination type for binære vedlegg</td>
    <td>0: Default<br>1: Bare i portal<br>2: Bare sluttbrukersystemer<br>3: Alle</td>
</tr>
<tr>
    <td>IsAssociatedToFormSet</td>
    <td>bool</td>
    <td>Indikerer om vedlegget er med i et skjemasett.</td>
    <td></td>
</tr>
<tr>
    <td><strong>OrganizationBEList</strong><a id="organization-be-list"></a></td>
    <td></td>
    <td>Liste av OrganizationBE elementer</td>
    <td></td>
</tr>
    <td><strong>OrganizationBE</strong><a id="organization-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>OrgNumber</td>
    <td>string</td>
    <td>Organisasjonsnummer</td>
    <td>010008433</td>
</tr>
<tr>
    <td>UnitName</td>
    <td>string</td>
    <td>Navn</td>
    <td></td>
</tr>
<tr>
    <td>EditedName</td>
    <td>String</td>
    <td>Endret navn</td>
    <td></td>
</tr>
<tr>
    <td>UnitDescription</td>
    <td>String</td>
    <td>Beskrivelse</td>
    <td></td>
</tr>
<tr>
    <td>Established</td>
    <td>DateTime</td>
    <td>Etablert</td>
    <td></td>
</tr>
<tr>
    <td>PartyID</td>
    <td>Int</td>
    <td>Id for å identifisere party-entitet i Altinn</td>
    <td></td>
</tr>
<tr>
    <td>AdressPostAddress</td>
    <td>string</td>
    <td>Postadresse</td>
    <td></td>
</tr>
<tr>
    <td>PostalCodeBusiness</td>
    <td>string</td>
    <td>Kontorpostnummer</td>
    <td></td>
</tr>
<tr>
    <td>PostalCityMail</td>
    <td>string</td>
    <td>Poststed</td>
    <td></td>
</tr>
<tr>
    <td>BusinessAddress</td>
    <td>string</td>
    <td>Kontoradresse</td>
    <td></td>
</tr>
<tr>
    <td>PostalCodeMail</td>
    <td>string</td>
    <td>Postnummer, postadresse</td>
    <td></td>
</tr>
<tr>
    <td>MailCountry</td>
    <td>String</td>
    <td>Land</td>
    <td></td>
</tr>
<tr>
    <td>BusinessCommunityNumber</td>
    <td>String</td>
    <td>Kontorets kommunenummer</td>
    <td></td>
</tr>
<tr>
    <td>PostCommunityNumber</td>
    <td>String</td>
    <td>Poststedets kommunenummer</td>
    <td></td>
</tr>
<tr>
    <td>PostalCityBusiness</td>
    <td>string</td>
    <td>Poststed, forretningsadresse</td>
    <td></td>
</tr>
<tr>
    <td>TelephoneNumber</td>
    <td>string</td>
    <td>Telefon</td>
    <td></td>
</tr>
<tr>
    <td>MobileNumber</td>
    <td>string</td>
    <td>Mobil</td>
    <td></td>
</tr>
<tr>
    <td>Fax</td>
    <td>string</td>
    <td>Fax</td>
    <td></td>
</tr>
<tr>
    <td>EMailAddress</td>
    <td>string</td>
    <td>E-post</td>
    <td></td>
</tr>
<tr>
    <td>InternetAddress</td>
    <td>string</td>
    <td>Hjemmeside</td>
    <td></td>
</tr>
<tr>
    <td>UnitStatus</td>
    <td>string</td>
    <td>Foretaksstatus</td>
    <td>N – Ny<br>E - endret<br>S - slettet<br>L - gjenåpnet</td>
</tr>
<tr>
    <td>UnitType</td>
    <td>string</td>
    <td>Type foretak</td>
    <td>ANNA</td>
</tr>
<tr>
    <td>UnitTypeFlag</td>
    <td>string</td>
    <td>Flagg for type foretak</td>
    <td>P - produksjon<br>T - test</td>
</tr>
<tr>
    <td>EstablishedDate</td>
    <td>DateTime</td>
    <td>Etableringsdato</td>
    <td>yyyy-MM-ddThh:mm:ss</td>
</tr>
<tr>
    <td>LastChangedDateTime</td>
    <td>DateTime</td>
    <td>Tidspunkt for når organisasjonen var sist endret</td>
    <td></td>
</tr>
<tr>
    <td>SubStatus</td>
    <td>string</td>
    <td>Understatus</td>
    <td>EBTC</td>
</tr>
<tr>
    <td>TrustedPartner</td>
    <td>Bool</td>
    <td>Forteller om organisasjonen er en tiltrodd samarbeidspartner.</td>
    <td></td>
</tr>
<tr>
    <td>LegalEntity</td>
    <td>Int</td>
    <td>Organisasjonsnummer for organisasjonens juridiske enhet, kan være det samme som OrgNumber</td>
    <td></td>
</tr>
<tr>
    <td><strong>OrganizationRegisterBE</strong><a id="organization-register-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>OrgNumber</td>
    <td>string</td>
    <td>Organisasjonsnummer</td>
    <td>010008433</td>
</tr>
<tr>
    <td>Name</td>
    <td>string</td>
    <td>Navn</td>
    <td></td>
</tr>
<tr>
    <td>PostAddress</td>
    <td>string</td>
    <td>Adresse</td>
    <td></td>
</tr>
<tr>
    <td>PostPostCode</td>
    <td>string</td>
    <td>Postnummer</td>
    <td></td>
</tr>
<tr>
    <td>PostPostCity</td>
    <td>string</td>
    <td>Poststed</td>
    <td></td>
</tr>
<tr>
    <td>BusinessAddress</td>
    <td>string</td>
    <td>Forretningsadresse</td>
    <td></td>
</tr>
<tr>
    <td>BusinessPostCode</td>
    <td>string</td>
    <td>Postnummer, forretningsadresse</td>
    <td></td>
</tr>
<tr>
    <td>BusinessPostCity</td>
    <td>string</td>
    <td>Poststed, forretningsadresse</td>
    <td></td>
</tr>
<tr>
    <td>TelephoneNumber</td>
    <td>string</td>
    <td>Telefon</td>
    <td></td>
</tr>
<tr>
    <td>MobileNumber</td>
    <td>string</td>
    <td>Mobil</td>
    <td></td>
</tr>
<tr>
    <td>FaxNumber</td>
    <td>string</td>
    <td>Fax</td>
    <td></td>
</tr>
<tr>
    <td>EMailAddress</td>
    <td>string</td>
    <td>E-post</td>
    <td></td>
</tr>
<tr>
    <td>InternetAddress</td>
    <td>string</td>
    <td>Hjemmeside</td>
    <td></td>
</tr>
<tr>
    <td>UnitStatus</td>
    <td>string</td>
    <td>Foretaksstatus</td>
    <td>N – Ny<br>E - endret<br>S - slettet<br>L - gjenåpnet</td>
</tr>
<tr>
    <td>UnitType</td>
    <td>string</td>
    <td>Type foretak</td>
    <td>ANNA</td>
</tr>
<tr>
    <td>EstablishedDate</td>
    <td>DateTime</td>
    <td>Etableringsdato</td>
    <td>yyyy-MM-ddThh:mm:ss</td>
</tr>
<tr>
    <td>MunicipalNumber</td>
    <td>string</td>
    <td>Kommunenummer</td>
    <td>0301</td>
</tr>
<tr>
    <td>SubStatus</td>
    <td>string</td>
    <td>Understatus</td>
    <td>EBTC</td>
</tr>
<tr>
    <td>CountryCode</td>
    <td>string</td>
    <td>Landkode</td>
    <td>NO, DE</td>
</tr>
<tr>
    <td><strong>PersonRegisterBEList</strong><a id="person-register-be-list"></a></td>
    <td></td>
    <td>Liste med PersonRegisterBE</td>
    <td></td>
    </tr>
<tr>
<tr>
    <td><strong>PersonRegisterBE</strong><a id="person-register-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
<tr>
    <td>SocialSecurityNumber</td>
    <td>string</td>
    <td>Fødselsnummer</td>
    <td>07037512345</td>
</tr>
<tr>
    <td>Name</td>
    <td>string</td>
    <td>Fullt navn</td>
    <td></td>
</tr>
<tr>
    <td>FirstName</td>
    <td>string</td>
    <td>Fornavn</td>
    <td></td>
</tr>
<tr>
    <td>LastName</td>
    <td>string</td>
    <td>Etternavn</td>
    <td></td>
</tr>
<tr>
    <td>CommunityNumber</td>
    <td>String</td>
    <td>Tilsvarer PropertyBE.MunicipalNumber</td>
    <td>0301</td>
</tr>
<tr>
    <td>HouseLetter</td>
    <td>string</td>
    <td>Husbokstav</td>
    <td>A</td>
</tr>
<tr>
    <td>HouseNumber</td>
    <td>string</td>
    <td>Husnummer</td>
    <td>0057, 17</td>
</tr>
<tr>
    <td>StreetName</td>
    <td>string</td>
    <td>Gatenavn</td>
    <td>MIDDELTHUNS GATE</td>
</tr>
<tr>
    <td>PostalCode</td>
    <td>string</td>
    <td>Postnummer</td>
    <td>186</td>
</tr>
<tr>
    <td>City</td>
    <td>string</td>
    <td>Poststed</td>
    <td>BERGEN</td>
</tr>
<tr>
<td>MaritalStatus</td>
    <td>MaritalStatus</td>
    <td>Sivilstatus</td>
    <td>0 Uoppgitt (D)<br>1 Ugift<br>2 Gift<br>3 Enke(mann)<br>4 Skilt<br>5 Separert<br>6 Partner<br>7 Separert partner<br>8 Skilt partner<br>9 Gjenlevende partner</td>
</tr>
<tr>
    <td>FamilieNumber</td>
    <td>string</td>
    <td>Fødselsnummer/fødselsnummer til referanseperson i familie for personer med familiekode 2 eller 3.</td>
    <td>07037512345</td>
</tr>
<tr>
    <td>FamilyPersonCodeDescription</td>
    <td>string</td>
    <td></td>
    <td>1- Referanseperson<br>2 - Gift kvinne/yngste partner som bor sammen med ekt<br>3 - Barn som bor sammen med foreldre</td>
</tr>
<tr>
    <td>CitizenshipCountry</td>
    <td>string</td>
    <td>Nasjonalitet</td>
    <td></td>
</tr>
<tr>
    <td>SpecialRegType</td>
    <td>int</td>
    <td></td>
    <td>0 Vanlig bosatt<br>1 Utenriks<br>2 Militær<br>3 Svalbard<br>4 Klientadresse<br>5 Uten fast bosted<br>6 Sperret adresse, strengt fortrolig<br>7 Sperret adresse, fortrolig<br>8 Pendlere</td>
</tr>
<tr>
    <td>IsUnderAge</td>
    <td>bool</td>
    <td>Under myndighetsalder</td>
    <td></td>
</tr>
<tr>
    <td>DateOfDeath</td>
    <td>DateTime</td>
    <td>Dødsdato</td>
    <td>yyyy-MM-ddThh:mm:ss</td>
</tr>
<tr>
    <td>LastChanged</td>
    <td>DateTime</td>
    <td>Dato for siste endring</td>
    <td>yyyy-MM-ddThh:mm:ss</td>
</tr>
<tr>
    <td>ApartmentNumber</td>
    <td>string</td>
    <td>Leilighetsnummer</td>
    <td></td>
</tr>
<tr>
    <td>PIDType</td>
    <td>string</td>
    <td>ID-type</td>
    <td>D – D-nummer<br>F - Fødselsnummer</td>
</tr>
<tr>
    <td>Property</td>
    <td>PropertyBE</td>
    <td>(se PropertyBE under)</td>
    <td></td>
</tr>
<tr>
    <td><strong>PersonRegisterV2BE</strong><a id="person-register-v2-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>SocialSecurityNumber</td>
    <td>string</td>
    <td>Fødselsnummer</td>
    <td>07037512345</td>
</tr>
<tr>
    <td>Name</td>
    <td>string</td>
    <td>Fullt navn</td>
    <td></td>
</tr>
<tr>
    <td>FirstName</td>
    <td>string</td>
    <td>Fornavn</td>
    <td></td>
</tr>
<tr>
    <td>MiddleName</td>
    <td>String</td>
    <td>Mellomnavn</td>
    <td></td>
</tr>
<tr>
    <td>LastName</td>
    <td>string</td>
    <td>Etternavn</td>
    <td></td>
</tr>
<tr>
    <td>MaritalStatus</td>
    <td>MaritalStatus</td>
    <td>Sivilstatus</td>
    <td>0 Uoppgitt (D)<br>1 Ugift<br>2 Gift<br>3 Enke(mann)<br>4 Skilt<br>5 Separert<br>6 Partner<br>7 Separert partner<br>8 Skilt partner<br>9 Gjenlevende partner</td>
</tr>
<tr>
    <td>FamilieNumber</td>
    <td>string</td>
    <td>Fødselsnummer/fødselsnummer til referanseperson i familie for personer med familiekode 2 eller 3.</td>
    <td>07037512345</td>
</tr>
<tr>
    <td>FamilyPersonCodeDescription</td>
    <td>string</td>
    <td></td>
    <td>1- Referanseperson<br>2 - Gift kvinne/yngste partner som bor sammen med ektefelle<br>3 - Barn som bor sammen med foreldre</td>
</tr>
<tr>
    <td>SpecialRegType</td>
    <td>int</td>
    <td></td>
    <td>0 Vanlig bosatt<br>1 Utenriks<br>2 Militær<br>3 Svalbard<br>4 Klientadresse<br>5 Uten fast bosted<br>6 Sperret adresse, strengt fortrolig<br>7 Sperret adresse, fortrolig<br>8 Pendlere</td>
</tr>
<tr>
    <td>IsUnderAge</td>
    <td>bool</td>
    <td>Under myndighetsalder</td>
    <td></td>
</tr>
<tr>
    <td>DateOfDeath</td>
    <td>DateTime</td>
    <td>Dødsdato</td>
    <td>yyyy-MM-ddThh:mm:ss</td>
</tr>
<tr>
    <td>LastChanged</td>
    <td>DateTime</td>
    <td>Dato for siste endring</td>
    <td>yyyy-MM-ddThh:mm:ss</td>
</tr>
<tr>
    <td>PIDType</td>
    <td>string</td>
    <td>ID-type</td>
    <td>D – D-nummer<br>F - Fødselsnummer</td>
</tr>
<tr>
    <td>PostalAddress</td>
    <td>PostalAddressBE</td>
    <td>(se PostalAddressBE under)</td>
    <td></td>
</tr>
<tr>
    <td>ResidentialAddress</td>
    <td>ResidentialAddressBE</td>
    <td>(se ResidentialAddressBE under)</td>
    <td></td>
</tr>
<tr>
    <td><strong>StreetBEList</strong><a id="street-be-list"></a></td>
    <td></td>
    <td>Liste med StreetBE</td>
    <td></td>
</tr>
<tr>
    <td><strong>StreetBE</strong><a id="street-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>StreetId</td>
    <td>int</td>
    <td>Gate-ID</td>
    <td>21644</td>
</tr>
<tr>
    <td>MunicipalId</td>
    <td>Int</td>
    <td>Kommune-ID</td>
    <td>220</td>
    </tr>
<tr>
    <td>MunicipalNumber</td>
    <td>string</td>
    <td>Kommunenummer</td>
    <td>0301</td>
</tr>
<tr>
    <td>StreetCode</td>
    <td>string</td>
    <td>Gatekode</td>
    <td>06740</td>
</tr>
<tr>
    <td>StreetName</td>
    <td>string</td>
    <td>Gatenavn</td>
    <td>ANDEDAMVEIEN</td>
</tr>
<tr>
    <td><strong>PropertyBEList</strong><a id="property-be-list"></a></td>
    <td></td>
    <td>Liste med PropertyBE</td>
    <td></td>
</tr>
<tr>
    <td><strong>PropertyBE</strong><a id="property-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>PropertyId</td>
    <td>int</td>
    <td>Unik identifikator for eiendom</td>
    <td></td>
</tr>
<tr>
    <td>MunicipalName</td>
    <td>string</td>
    <td>Kommunenavn</td>
    <td>HURDAL</td>
</tr>
<tr>
    <td>LandNumber</td>
    <td>string</td>
    <td>Landnummer</td>
    <td>Fra input</td>
</tr>
<tr>
    <td>MunicipalNumber</td>
    <td>string</td>
    <td>Kommunenummer</td>
    <td>Fra input</td>
</tr>
<tr>
    <td>TitleNumber</td>
    <td>string</td>
    <td></td>
    <td>Fra input</td>
</tr>
<tr>
    <td>LeaseNumber</td>
    <td>string</td>
    <td></td>
    <td>Fra input, fire tegn, venstrepadding med 0</td>
</tr>
<tr>
    <td>SubNumber</td>
    <td>string</td>
    <td></td>
    <td>Fra input, tre tegn, venstrepadding med 0</td>
</tr>
<tr>
    <td>AddressName</td>
    <td>string</td>
    <td>Adresse</td>
    <td>VINDALSVEGEN</td>
</tr>
<tr>
    <td><strong>ApartmentNumberBEList</strong><a id="apartment-number-be-list"></a></td>
    <td></td>
    <td>Liste med ApartmentNumberBE</td>
    <td></td>
</tr>
<tr>
    <td><strong>ApartmentNumberBE</strong><a id="apartment-number-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>ApartmentNumber</td>
    <td>string</td>
    <td>Bolignummer</td>
    <td>H0101</td>
</tr>
<tr>
    <td><strong>PostalAddressBE</strong><a id="postal-address-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>AddressLine1</td>
    <td>string</td>
    <td>Linje 1 av adresse</td>
    <td></td>
</tr>
<tr>
    <td>AddressLine2</td>
    <td>string</td>
    <td>Linje 2 av adresse</td>
    <td></td>
</tr>
<tr>
    <td>AddressLine3</td>
    <td>string</td>
    <td>Linje 3 av adresse</td>
    <td></td>
</tr>
<tr>
    <td>PostalCode</td>
    <td>string</td>
    <td>Postnummer</td>
    <td>186</td>
</tr>
<tr>
    <td>City</td>
    <td>string</td>
    <td>Poststed</td>
    <td>BERGEN</td>
</tr>
<tr>
    <td>CountryCode</td>
    <td>string</td>
    <td>Landkode tre siffer</td>
    <td>000</td>
</tr>
<tr>
    <td><strong>ResidentialAddressBE</strong><a id="resedential-address-be"></a></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>StreetCode</td>
    <td>string</td>
    <td>Femsifret gatekode</td>
    <td></td>
</tr>
<tr>
    <td>StreetName</td>
    <td>string</td>
    <td>Gatenavn</td>
    <td></td>
</tr>
<tr>
    <td>HouseNumber</td>
    <td>string</td>
    <td>Husnummer</td>
    <td></td>
</tr>
<tr>
    <td>HouseLetter</td>
    <td>string</td>
    <td>Husbokstav</td>
    <td></td>
</tr>
<tr>
    <td>LandNumber</td>
    <td>string</td>
    <td>Gårdsnummer</td>
    <td></td>
</tr>
<tr>
    <td>TitleNumber</td>
    <td>string</td>
    <td>Bruksnummer</td>
    <td></td>
</tr>
<tr>
    <td>LeaseNumber</td>
    <td>string</td>
    <td>Festenummer</td>
    <td></td>
</tr>
<tr>
    <td>SubNumber</td>
    <td>string</td>
    <td>Undernummer</td>
    <td></td>
</tr>
<tr>
    <td>AddressName</td>
    <td>string</td>
    <td>Adresse</td>
    <td></td>
</tr>
<tr>
    <td>ResidentialAddressLine1</td>
    <td>string</td>
    <td>Linje 1 av bostedsadresse</td>
    <td></td>
</tr>
<tr>
    <td>ResidentialAddressLine2</td>
    <td>string</td>
    <td>Linje 2 av bostedsadresse</td>
    <td></td>
</tr>
<tr>
    <td>PostalCode</td>
    <td>string</td>
    <td>Postnummer</td>
    <td></td>
</tr>
<tr>
    <td>City</td>
    <td>string</td>
    <td>Sted</td>
    <td></td>
</tr>
<tr>
    <td>ApartmentNumber</td>
    <td>string</td>
    <td>Leilighetsnummer</td>
    <td></td>
</tr>
<tr>
    <td>MunicipalNumber</td>
    <td>string</td>
    <td>Kommunenummer</td>
    <td></td>
</tr>
<tr>
    <td>MunicipalName</td>
    <td>string</td>
    <td>Kommunenavn</td>
    <td>HURDAL</td>
</tr>
</table>
