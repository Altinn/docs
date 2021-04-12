---
title: eFormidling
description: Hvordan konfigurere eFormidling integrasjon for en app.
toc: true
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

| Id              | Beskrivelse                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| serviceId       |                                                                                                            |
| process         | prosessid som settes på scopet i StandardBusinessDocumentHeader                                            |
| dataTypes       | Liste id for data typer som skal legges ved forsendelsenn                                                  |
| sendAfterTaskId | Id på tasken som skal avsluttes før forsendelsen sendes. Det er anbefalt at dette er et confirmation steg  |                                                    |
| receiver        | Organsisasjonsnummer til mottaker. Støtter kun norske virksomheter. Kan sløyfes og defineres i applogikken |
| standard        | DocumentIdentification standard                                                                            |
| type            | DocumentIdentification type                                                                                |
| typeVersion     | DocumentIdentification type versjon                                                                        |
| securityLevel   | Sikkerhetsnivå som settes på StandardBusinessDocument                                                      |


Et eksempel for en konfigurasjon i application metadata:

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
    var arkivmelding = new Altinn.Common.EFormidlingClient.Models.Arkivmelding();  

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

  ```cs
  using Altinn.Common.EFormidlingClient.Models.SBD;
  ``` 

2. Legg til funksjonen nedenfor i klassen. 
   Forventet output fra denne metoden er en liste som inneholder minst ett receiver-objekt.

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


## Lokal test av applikasjon med eFormidling 

Det er mulig å teste eFormidlingsintegrasjonen i applikasjonen lokalt på utviklingsmiljøet ditt. 
I tillegg til Altinn Localtest og applikasjonen er det to ting som må kjøre:
1. eFormidling integrasjonspunkt
2. mock av eFormidling

### Forberedelser

1. Installer siste verjson av Java. 

   Finn nedlastingslenke og beskrivelse av nødvendige steg [her](https://docs.oracle.com/cd/E19182-01/821-0917/inst_jdk_javahome_t/index.html)
2.  Det skal nå lastes ned en rekke filer. Finn en egnet plassering for eFormidling lokalt på maskinen din og navigér dit i en terminal.
3.  Klon repoet som inneholder eFormidling mocken med følgende commando 
    
    ```cmd
    git clone --branch development https://github.com/felleslosninger/efm-mocks.git
    ```

4. Last ned integrasjonspunktet [herfra](https://docs.digdir.no/eformidling_download_ip.html). Dette kan plasseres på samme nivå som mappen `efm-mocks`.
   
#### Kjøre eFormidling lokalt

1. Åpne en terminal og navigér til `efm-mocks` (Powershell )
2. Kjør `docker-compose up -d`
3. Navigér til mappen der integrasjonspunkt-filen ligger 
4. Kjør og kjører kommandoen `java -Xmx2g -Dspring.profiles.active=mock -jar integrasjonspunkt-2.2.0.jar`
    Dersom du har en nyere versjon av integrasjonspunktet enn `2.2.0`  må kommandoen siste ledd i siste linje justeres for dette. 

#### Verifiser at eFormidling er satt opp korrekt

Dette steget krever [node og npm](https://www.npmjs.com/get-npm) på maskinen din, men er ikke nødvendig for å bruke mocken. 

- Åpne en terminal og navigér til `efm-mocks/tests/`
- Kjør `npm i`
- Navigér inn i mappen `next-moves`
- Kjør `node NextMove.js dpi dpiprint dpe dpf dpv dpo`
- Verifiser i en broswer på [localhost:8001](http://localhost:8001/) at det er nye innslag i tabellen med de sendte meldingene.

Les mer om mockløsningen [her](https://github.com/felleslosninger/efm-mocks)