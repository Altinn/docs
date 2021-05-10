---
title: Datafelter på instansobjektet
linktitle: Datafelter
description: Konfigurasjon av datafelter for app.
aliases:
 - /altinn-studio/app-creation/datafields
weight: 200
---

I noen tilfeller kan det være nyttig å legge ekstra informasjon på instansobjektet f. eks. for å kunne basere ruting av instans til rett system i bakkant host tjenesteeier.

Dette kan gjøres på to måter, ved konfigurasjon eller manuelt. Ved konfigurasjon vil systemet ekstrahere datafelter fra skjemafeltene og legge disse på instansobjektet. Man er da begrenset til skjemafelter, men slipper å programmere dette selv. Hvis man velger å gjøre det manuelt har man frihet til å legge på de dataene man selv ønsker f. eks. fra eksterne apier, kalkuleringer, faste strenger etc., men man må da programmere dette selv vha api'ene i applikasjonen.

Det er også mulig å benyttes seg av begge metoder så lenge man benytter seg av forskjellige id'er på datafeltene. De konfigurerte verdiene vil da flettes sammen med de manuelle på instansen.

Datafelter er på mange måter tilsvarende [presentasjonsfelter](../presentationfields/_index.md). Men der hvor bruken av presentasjonsfelter er forhåndsbestemt (benyttes i meldingsboksen til Altinn), er bruken av datafelter opp til den enkelte applikasjonsutvikler.

## Konfigurasjon 
Konfigurasjon av datafelter gjøres i `applicationmetadata.json` som ligger i repoet under mappen `App/config`.

Legg til en ny seksjon med navn `dataFields` med følgende underfelter

 Navn     | Beskrivelse
----------|------------
id        | Id på datafeltet. Benyttes til å identifisere feltet når den er lagret på instansen.
path      | Datamodell path til skjemafeltet. Denne verdien er den samme som bindes til en komponent i layoutfilen til appen.
dataTypeId| Id på datamodellen som verdien skal hentes fra. 

Konfigurasjonen til en app med to definerte datafelter vil se slik ut:

  ```json
"dataFields": [
    {
    "id": "AnsettelseAntAar",
    "path": "OpplysningerOmArbeidstakeren-grp-8819.Arbeidsforhold-grp-8856.AnsattAar-datadef-33267.value",
    "dataTypeId": "default"
    },
    {
    "id": "Navn",
    "path": "OpplysningerOmArbeidstakeren-grp-8819.OpplysningerOmArbeidstakeren-grp-8855.AnsattNavn-datadef-1223.value",
    "dataTypeId": "default"
    }]
  ```

Resultatet vil være en liste på instansobjektet med verdier fra de konfigurerte feltete:
```json
"dataValues": {
    "AnsettelseAntAar": 10,
    "Navn": "Ola Nordmann"
}
```
Legg merke til at det på instansobjektet heter `dataValues` mens når det konfigureres heter `dataFields`, det er fordi 
`dataValues`er resultatet av konfigureringen som gjøres på `dataFields`.

## Manuelt
For å legge til dataverdier manuelt benyttes metoden `UpdateDataValues` fra IInstance interfacet. Det er den samme metoden som kalles når dataverdier populeres fra konfigurasjon og den sørger for å flette sammen verdiene til en liste. 

{{%notice warning%}}
Merk at det er applikasjonsutvikler sitt ansvar å sørge for unike id'er hvis man kombinerer dataverdier fra konfgiurasjon og manuelt.
Har man ikke unike id'er vil verdier overskrives, og man har ingen garanti for hvilken som blir lagret på instansen.
{{% /notice%}}

Eksemplet under viser hvordan man kan sette datavedier manuelt. I dette tilfellet gjøres det ved å gjøre legge inn kode 
i `RunProcessTaskEnd` i `App.cs` som kjører når en task avsluttes. 

```cs
public override async Task RunProcessTaskEnd(string taskId, Instance instance)
{
    var customDataValues = new DataValues() { Values = new Dictionary<string, string>() { { "customKey", "customValue" } } };
    var (instanceOwnerPartyId, instanceGuid) = InstanceHelper.DeconstructInstanceIdFromUrl(_httpContextAccessor.HttpContext.Request.Path.Value);

    await _instanceService.UpdateDataValues(instanceOwnerPartyId, instanceGuid, customDataValues);

    await Task.CompletedTask;
}
```

{{%notice warning%}}
Man bør også tenke gjennom når man trenger disse verdiene på instansobjektet slik at man ikke gjør unødvendige api kall og dermed oppdateringer av instansobjektet.
{{% /notice%}}
