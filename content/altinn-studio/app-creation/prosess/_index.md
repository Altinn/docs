---
title: Definere applikasjonsprosess
linktitle: Prosess
description: Hvordan definere prosessen til en app.
weight: 150
---

En applikasjon har definert en prosess som styrer flyten.
Prosessen er definert som [BPMN 2.0](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation).

## Støttede prosess-task-typer

Nåværende applikasjonsmal støtter følgende tasks.

- Data (Data) (Tilsvarer utfyllingssteg i Altinn II)
- Bekreftelse (Confirmation)
- Feedback

## Fremtidige prosess-tasker (tentativ)

- Signering (Signing)
- Betaling (Payment)
- Parallellsignering (Paralell Signing)
- Brukerstyrt signering (User Controlled Signing)
- Ekstern validering (External Validation)

## Endre prosessen

For å endre på prosessen kan du manuelt redigere BPMN-filen med en valgfri XML- eller BPMN-editor.
Den ligger lagret i app-repoet som `App/config/process/process.bpmn`.


{{% children description="true" %}}