---
title: Preutfylling av data (prefill)
linktitle: Preutfylling
description: Hvordan konfigurere prefill for en app.
toc: true
weight: 60
---

Altinn tilbyr i dag tre fremgangsmåter for å preutfylle data i en app for en sluttbruker.
Disse metodene kan kombineres fritt for å oppnå ønsket resultat

## Prefill fra nasjonale register og brukerprofil

Altinn apps støtter prefill med data fra Enhetsregisteret, Folkeregisteret og brukerprofil i Altinn.

Ved å følge beskrivelsen nedenfor vil man under instansiering av et skjema preutfylle datamodellen med
de definerte verdiene hentet fra Altinns database.

### Oppsett av prefill i applikasjons repository

Opprett en ny json-fil i app repoet under `App/models`.
Navnet på filen skal inneholde navnet på datamodellen og ha postfix ".prefill.json".
Dersom datamodellen din heter _appModel_ skal du nå kunne finne disse tre filene i mappen:
_appModel.metadata.json_, _appModel.schema.json_, _appModel.prefill.json_

Lim inn innholdet nedenfor i filen.

```json
{
    "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
    "allowOverwrite": true,
    "ER": {
    },
    "DSF": {
    },
    "UserProfile": {
    }
}
```

### Konfigurering av _prefill.json_

- **$schema** peker på json schema definisjonen til filen. Nåværende versjon er v1.  
  Visual Studio Code vil pga. denne validere og tilby intellisense/autocomplete når du editerer filen lokalt.

- **allowOverwrite** avgjør om prefill definert i denne filen kan overskrive et felt i datamodellen dersom det allerede har en verdi.

- **ER** her legger man inn felter fra datamodellen som skal preutfylles med data fra enhetsregisteret.
Felt som preutfylles med ER-data vil kun få en verdi dersom man instansierer på vegne av en organisasjon.
Instansiering vil feile dersom man forsøker å preutfylle ER-data, men ikke har en organisasjon tilgjengelig.

Eksempelet nedenfor vil populere feltet _Datamodell.Organisasjon.Organisasjonsnummer_ med organisasjonsnummeret hentet fra enhetsregisteret.

```json
"ER": {
    "OrgNumber":"Datamodell.Organisasjon.Organisasjonsnummer"
}
```

- **DSF** her legger man inn felter fra datamodellen som skal preutfylles med data fra folkeregistret.
Feltet som preutfylles med DSF-data vil kun få en verdi dersom man instansierer på vegne av en person.
Instansiering vil feile dersom man forsøker å preutfylle DSF-data, men ikke har en person tilgjengelig.

Eksempelet nedenfor vil populere feltet _Datamodell.Person.Nummer_ med telefonnummer henter fra folkeregistret.

 ```json
"DSF": {
    "TelephoneNumber":"Datamodell.Person.Nummer"
}
```

- **UserProfile** her legger man inn telter fra datamodellen som skal preutfylles med data fra brukerens profil i Altinn.
Merk at det er den innloggede brukeren om instansierer man henter ut data for.

Eksempelet nedenfor vil populere feltet _Datamodell.Bruker.Epost med epost hentet fra brukerens profil i Altinn.

```json
"UserProfile": {
    "Email":"Datamodell.Bruker.Epost"
}
```

### Tilgjengelige prefill verdier

JSON-schema definisjonen av prefill-filen er også tilgjengelig [her](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json).  
Bruken av et schema gjør at editorer, [f.eks. Visual Studio Code](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-json),
kan validere og tilby intellisense for raskere editering.

#### Folkeregisteret

Personedataen som eksponeres er den tilknyttet personen som skjemaet instansieres på vegne av. Dersom Ola Nordman instansierer et skjema på vegne av 
Kari Nordmann vil det være Kari sin data som eksponeres.
Tilgjengelige verdier for prefill inkluderer:

- SSN
- Name
- FirstName
- MiddleName
- LastName
- TelephoneNumber
- MobileNumber
- MailingAddress
- MailingPostalCode
- MailingPostalCity
- AddressMunicipalNumber
- AddressMunicipalName
- AddressStreetName
- AddressHouseNumber
- AddressHouseLetter
- AddressPostalCode
- AddressCity

#### Enhetsregisteret

Enheten som eksponeres er den tilknyttet organisasjons som et skjema blir instansiert på vegne av. 
Tilgjengelige verdier for prefill inkluderer:

- OrgNumber
- Name
- UnitType
- TelephoneNumber
- MobileNumber
- FaxNumber
- EMailAddress
- InternetAddress
- MailingAddress
- MailingPostalCode
- MailingPostalCity
- BusinessAddress
- BusinessPostalCode
- BusinessPostalCity

#### Brukerprofil

Brukerprofilen som eksponeres er profilen til den som instansierer tjenesten. Dersom Ola Nordmann instansierer et skjema på vegne av Kari Nordmann 
vil dataen som hentes ut herfra være knyttet til Ola.
Tilgjengelige verdier for prefill inkluderer:

- UserId
- UserName
- PhoneNumber
- Email
- PartyId
- UserType
- ProfileSettingPreference.Language
- ProfileSettingPreference.PreSelectedPartyId
- ProfileSettingsPreference.DoNotPromptForParty

## Egendefinert prefill

Altinn apps muliggjør prefill av en instans med egendefinert data,
det være seg resultet fra et API-kall, beregninger gjort under instansiering, eller annen logikk.
Dette implementeres i metoden _DataCreation_ i filen _InstansiationHandler.cs_ som finnes i applikasjonsrepoet under `App/logic`.

Eksempelet nedenfor populerer feltet _Bruker.FulltNavn_ i modellen _Datamodell_ med verdien "Test Testesen".  

```C# {hl_lines=[6]}
public async Task DataCreation(Instance instance, object data)
{
    if (data.GetType() == typeof(Datamodell))
    {
        Datamodell model = (Datamodell)data;
        model.Bruker.FulltNavn = "Test Testesen";
    }
}
```

Bytt ut _Datamodell_ med navnet på C# klassen som er blitt generert basert på xsd-en som
ble lastet opp i Altinn Studio. Dersom du bruker en egnet kodeeditor vil du kunne definere felter
som skal populeres ved bruk av intellisense.

Vær oppmerksom på at dersom du har komplekse typer i modellen din, må disse instansieres før man kan
tilegne en verdi til ett av typens underelementer. Se eksempel nedenfor der vi legger til grunn at 'Bruker'
og 'Name' er egne C# klasser.

```C#
public async Task DataCreation(Instance instance, object data)
{
    if (data.GetType() == typeof(Datamodell))
    {
        Datamodell model = (Datamodell)data;
        Bruker b = new Bruker();
        b.Navn = new Name();
        b.Navn.FulltNavn = "Test Testesen";
    }
}
```

### Instansiering med prefill

Altinn apper støtter instansiering med prefill.
Skjemadataen legges ved i en multipart i instansieringsrequesten som sendes til appen.
Nedenfor ser du et eksempel på en request for å instansiere en app med prefill for partyId 12345.

```http {hl_lines=[10]}
Content-Type: multipart/form-data; boundary="abcdefg"
Body:

--abcdefg
Content-Type: application/json; charset=utf-8
Content-Disposition: form-data; name="instance"

{
    "instanceOwner": {
        "PartyId" : "12345"
    }
}

--abcdefg
Content-Type: application/xml
Content-Disposition: form-data; name="Endring-av-navn"

<?xml version="1.0"?>
<Skjema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" skjemanummer="1533" spesifikasjonsnummer="11172" blankettnummer="RF-1453" tittel="Endring av navn" gruppeid="9308">
<Innledning-grp-9309 gruppeid="9309">
    <NavneendringenGjelderFor-grp-9310 gruppeid="9310">
    <SubjektFornavnFolkeregistrert-datadef-34730 orid="34730">Ola Nordmann</SubjektFornavnFolkeregistrert-datadef-34730>
    </NavneendringenGjelderFor-grp-9310>
    <Kontaktinformasjon-grp-9311 gruppeid="9311">
    <MelderFultnavn orid="34735">LANGØY MADS</MelderFultnavn>
    </Kontaktinformasjon-grp-9311>
</Innledning-grp-9309>
</Skjema>

--abcdefg--
```
