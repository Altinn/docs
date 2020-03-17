---
title: Definere applikasjonsprosess
linktitle: Prosess
description: Hvordan definere applikasjonsprosess
weight: 200
---
En applikasjon vil ha en prosess som brukeren av applikasjonen vil følge. 
Prosessen er definert in en BMPM 2.0 fil.

## Støttede prosess task typer

Nåværende applikasjonsmal støtter følgende tasks.

- Data (Data)
- Bekreftelse (Confirmation)

## Fremtidige prosess tasker (tentativ)

- Signering (Signing)
- Betaling (Payment)
- Parallellsignering (Paralell Signing)
- Brukerkontrollert signering (User Controlled Signing)
- Ekstern validering (External Validation)

## Endre prosessen

For å endre proess kan du manuelt regigere
[BPMN filen](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/config/process/process.bpmn)
i malen med en valgri test eller BPMN editor.