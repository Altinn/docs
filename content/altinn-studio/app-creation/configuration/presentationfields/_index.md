---
title: Presentasjonsfelter i meldingsboksen
linktitle: Presentasjonsfelter
description: Konfigurasjon av presentasjonsfelter for app.
aliases:
 - /altinn-studio/app-creation/presentationfields
weight: 200
---

I noen tilfeller kan det være nyttig med presentasjonsfelter for å enklere kunne 
skille mellom flere instaner av samme applikasjon.

Ved å konfigurere presentasjonsfelter på en applikasjon vil man hente ut 
verdier fra skjemadataen og legge dette på instansobjektet. 
Disse verdiene benyttes i meldingsboksen i Altinn til å berrike tittelen til instansen med dataverdiene.

## Konfigurasjon 
Konfigurasjon av presentasjonsfelter gjøres i `applicationmetadata.json` som ligger i repoet under mappen `App/config`.

Legg til en ny seksjon med navn `presentationField` med følgende underfelter

 Navn     | Beskrivelse
----------|------------
id        | Id på presentasjonsfeltet. Benyttes til å identifisere presentasjonsteksten når den er lagret på instansen.
path      | Datamodell path til presentasjonsfeltet. Denne verdien er den samme som bindes til en komponent i layoutfilen til appen.
dataTypeId| Id på datamodellen som verdien skal hentes fra. 

Konfigurasjonen til en app med to definerte presentasjonsfelter vil se slik ut:

```cs
  "presentationFields": [
    {
      "id": "Ansettelse",
      "path": "OpplysningerOmArbeidstakeren-grp-8819.Arbeidsforhold-grp-8856.AnsattAar-datadef-33267.value",
      "dataTypeId": "default"
    },
    {
      "id": "Navn",
      "path": "OpplysningerOmArbeidstakeren-grp-8819.OpplysningerOmArbeidstakeren-grp-8855.AnsattNavn-datadef-1223.value",
      "dataTypeId": "default"
    }],
```

Resultatet i meldingsboksen vil være apptittel med påfølgende presentasjonstekster i en kommaseparert liste. 

![Instanser med presentasjonsfelter i meldingsboks](presentationtexts-msgbox.png "Instanser med presentasjonsfelter i meldingsboks")