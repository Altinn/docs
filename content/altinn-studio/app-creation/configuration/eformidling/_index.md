---
title: eFormidling
description: Hvordan konfigurere eFormidling integrasjon for en app
toc: true
aliases:
 - /altinn-studio/app-creation/configuration/eformidling
weight: 400
---

## Aktivere integrasjon med eFormidling i applikasjonen din

{{%notice info%}}
For at applikasjonen din skal kunne sende instansdata videre til eFormidling må den referere til nugetversjon >= 4.2.0.
Se hvordan du oppdaterer nugetreferanser for applikasjonen din [her](../update/#nuget-pakker).
{{% /notice%}}

Dersom man har behov for integrasjon med eFormidling i applikasjonen må dette aktiveres.

I filen `appsettings.json` i mappen _App_ må følgende legges til i seksjonen _AppSettings_

```json
"EnableEFormidling":  true
```

I tillegg må det i samme fil opprettes en ny seksjon; _EFormidlingClientSettings_.
Innholdet i kodesnutten nedenfor kan kopieres i sin helhet. 
Denne setter opp url til integrasjonspunktet.
Lenken peker på mocken som kan kjøres opp lokalt.
Les mer om oppsettet av eFormidlings mocken [her](#-Kjøring-med-eFormidling-mock-lokalt).

Når en app deployes til test eller produksjon vil denne verdien overskrives
og peke mot integrasjonspunktet i Altinn Platform.


```json
"EFormidlingClientSettings": {
   "BaseUrl": "http://localhost:9093/api/"
 }
```

Dersom det ikke er ønskelig å teste integrasjonen med eFormidling når man kjører applikasjonen lokalt kan man overstyre
denne konfigurasjonen i `appsettings.Development.json`. 
Opprett _AppSettings_ seksjonen dersom den ikke finne og sett `EnableEFormidling` til false.

```json
"AppSettings": {
    "EnableEFormidling": false
}
```

## Konfigurere nøkkelverdier for eFormidling i applikasjonen din 

Det kreves en del metadata om eFormidlingsforsendelsen og denne defineres i `applicationmetadata.json`.
Filen finner du i repoet under mappen `App/config`.

Opprett en ny seksjon `eFormidling` og fyll ut verdier for følgende parametre.

| Id| Beskrivelse|
|-----|-------------|
| serviceId |  |
| process | prosessid som settes på scopet i StandardBusinessDocumentHeader|
| dataTypes | Liste id for data typer som skal legges ved forsendelsen. |
| sendAfterTaskId | Id på tasken som skal avsluttes før forsendelsen sendes|
| receiver | Organsisasjonsnummer til mottaker. Støtter kun norske virksomheter. Kan sløyfes og defineres i applogikken |
| standard | DocumentIdentification standard |
| type | DocumentIdentification type |
| typeVersion | DocumentIdentification type versjon |
| securityLevel | Sikkerhetsnivå som settes på StandardBusinessDocument |


Et eksempel for en konfguasjon i application metadata:

```json
"eFormidling": {
    "serviceId": "DPF",
    "process": "urn:no:difi:profile:arkivmelding:administrasjon:ver1.0",
    "dataTypes": [ "default" ],
    "sendAfterTaskId": "Task_2",
    "receiver": "910075918",
    "standard": "urn:no:difi:arkivmelding:xsd::arkivmelding",
    "type": "arkivmelding",
    "typeVersion": "2.0",
    "securityLevel":  3
  }
```

## Generering av metadata til forsendelsen i applikasjonen

I App.cs må man overstyre metoden som henter ut den standardrekkefølgen av sider som er definert i `Settings.json`
Dette gjøres ved å legge til funksjonen nedenfor i App.cs.
Forventet output fra denne metoden er en tuppel som inneholder navnet på metadatafilen som første element
og en stream med metadataen som andre element.

```cs
/// <inheritdoc />
public override async Task<(string, Stream)> GenerateEFormidlingMetadata(Instance instance)
{
    Altinn.Common.EFormidlingClient.Models.Arkivmelding arkivmelding = new Altinn.Common.EFormidlingClient.Models.Arkivmelding();  

    // bygg opp arkivmeldingen eller annet metadataobjekt her.
                  
    MemoryStream stream = new MemoryStream();
    XmlSerializer serializer = new XmlSerializer(typeof(Altinn.Common.EFormidlingClient.Models.Arkivmelding));
    serializer.Serialize(stream, arkivmelding);
    stream.Position = 0;
    StreamContent streamContent = new StreamContent(stream);
    streamContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/xml");
    return await Task.FromResult(("arkivmelding.xml", stream));
}
```

## Sette mottaker for forsendelse i applogikken

I App.cs kan man overstyre metoden som henter ut mottaker av forsendelsen fra `applicationmetadata.json`.
Denne funksjonaliteten kan benyttes dersom dataen skal sendes til ulike mottakere basert på input fra slutbruker i skjemaet. 

Det må tre steg til for å sette mottaker i applogikken, og alle endringer gjøres i `App.cs` finnes i repoet under `App/logic`

1. Øverst i filen må det legges til en referanse til eFormidlings biblioteket. 
  `using Altinn.Common.EFormidlingClient.Models.SBD;` 

2. Legg til funksjonen nedenfor i klassen. 
   Forventet output fra denne metoden er en lite som inneholder minst ett receiver-objekt.

    ```cs
    public override async Task<List<Receiver>> GetEFormidlingReceivers(Instance instance)
    {    
        Identifier identifier = new Identifier
        {
            Authority = "iso6523-actorid-upis"
        };

        // 0192 prefix for all Norwegian organisations.
        identifier.Value = "[INSERT ORGANISATION NUMBER HERE WITH PREFIX `0192:`]" ; 

        Receiver receiver = new Receiver { Identifier = identifier };
        return new List<Receiver> { receiver };
    }
    ```

3. Legg til egen logikk for å populere `identifier.Value` i fiksjonen.
   Merk at det kun er norske organisasjonsnummer som støttes som mottaker per April 2021, 
   og at prefiksen `0192:` er påkrevd før organisasjonsnummeret.


## Kjøring med eFormidling mock lokalt 

For å kjøre løsningen lokalt må man hente nødvendige filer fra 2 forskjellige repository
1. https://github.com/felleslosninger/efm-mocks.git (Selve mock løsningen for å kunne kjøre eFormidling lokalt)
2. https://github.com/Altinn/altinn-studio/tree/master/src/development (Konfigurasjon for å kunne kjøre hele løsningen enklere med docker compose)


Hent ned mockløsningen lokalt for å teste forsendelser med eFormidling:
```cmd
git clone --branch development https://github.com/felleslosninger/efm-mocks.git
```

Pr d.d. Mars 2021, så er det anbefalt å bruke development branch ettersom det foreligger feil i master branch.
For mer detaljert oppsett se README i repoet: 
https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Common/Altinn.EFormidlingClient/Altinn.EFormidlingClient/README.md

Det er 2 måter å kjøre mock løsningen med integrasjonspunktet lokalt: Integrasjonspunktet kjører seperat som en jar-fil eller så kjører hele løsningen i docker vha docker compose.

•	(Foretrukket metode) Kopier docker compose filen under src/development/EFormidlingMock i Altinn Studio repo (https://github.com/Altinn/altinn-studio/tree/master/src/development), og "integrationpoint" mappen som inneholder konfigurasjon for løsningen. 
Lim inn i roten av  mock-prosjektmappen, slik at det erstatter den gamle docker compose filen. Start docker compose filen ved å kjøre
 ```cmd
docker-compose up
```
•	Start docker compose og kjør integrasjonspunktet som en jar seperat. Integrasjonspunktet kan lastes ned her:https://docs.digdir.no/eformidling_download_ip.html.
Start integrasjonspunktet ved å kjøre:
 ```cmd
java -Dspring.profiles.active=mock -jar integrasjonspunkt-<VERSION>.jar
```
Pass på at denne kjører etter docker-compose up.



Ved å gå inn på http://localhost:8001/ så kan man se meldinger som er vellykket sent.
Ved å gå inn på  http://localhost:8002/ kan man se på meldingen fra mottaker siden, mao test fag/arkiv system. Denne kan brukes som ende til ende testing for DPO (Digital Post Offentlig) og DPE (Digital Post eInnsyn) for å verifisere forsendelsene.

For å teste at mock-løsningen og integrasjonspunktet fungerer som det skal, naviger til mappen "tests/next-move" og kjør med Node følgende kommando:
 ```cmd
node NextMove.js dpi dpiprint dpe dpf dpv dpo
``` 
Dette vil utføre en komplett test. Bekreft i dashbordet på localhost: 8001 at meldingen(e) ble sendt.
For mer informasjon, se README.md i mock-løsningen (https://github.com/felleslosninger/efm-mocks)
