---
title: Instans
linktitle: Instans
description: Hvordan gjøre endringer på applikasjonsinstanser
toc: true
weight: 140
---

Denne siden er foreløpig ikke fullstendig, mer informasjon vil komme på et senere tidspunkt.

En instansiert applikasjon vil ha et tilhørende instans-objekt. Dette objektet inneholder metadata om den spesifikke instansen.
Om du ønsker å lære mer om instans og api'et rundt så kan du lese teknisk dokumentasjon om dette [her.](https://docs.altinn.studio/teknologi/altinnstudio/altinn-api/#query-instances).  

## Substatus

Som app-eier kan man sette en substatus på instansen, dette for å kunne gi sluttbruker ytterligere informasjon om hvilken tilstand instansen befinner seg i.
Substatus vil vises frem både i meldingsboksen i Altinn og på kvitteringssiden.

Substatusen er et objekt som kan settes på instansobjektet. Hvordan dette gjøres står beskrevet [her.](https://docs.altinn.studio/teknologi/altinnstudio/altinn-api/#instance-substatus).
Substatus er et enkelt objekt som inneholder `label` og `description`. Disse feltene kan enten inneholde ren tekst, eller en tekstnøkkel som referer til applikasjonstekstene. Verdt å merke seg at vi ikke støtter variabler i tekst for disse tekstene.
I meldingsboksen er det satt en begrensning på 25 tegn på `label`, og inneholder label mer enn 25 tegn vil bare de 22 første tegnene bli brukt og "..." lagt til på slutten.

Eksempel på et substatus-objekt:
```json
{
    "label": "some.label",
    "description": "Beskrivelse i klarteskst"
}
```

Under ser du du eksempler på hvordan substatus ser ut i meldingsboksen og i kvitteringen hvor substatusen er satt opp på følgende måte:
```json
{
    "label": "Godkjent",
    "description": "Din søknad er godkjent av kongen."
}
```

![Substatus i meldingsboks](meldingsboks.png "Substatus i meldingsboks")

![Substatus i kvitteringen](app.png "Substatus i kvitteringen")

## Automatisert sletting av utkast

Som applikasjonseier kan man i noen tilfeller ønske å slette sluttbrukerens utkast av en tjeneste dersom det har gått en viss tid siden instansiering. 
For å oppnå dette er det tre steg som må tas.

1. Applikasjonen må konfigureres slik at tjenesteeier har lov til å slette instanser
2. Identifiser hvilke instanser som ikke er fullført v.h.a. spørring mot storage
3. Slette instans via endepunkt eksponert i applikasjonen

### Steg 1: Konfigurasjon av applikasjon

Standarden for en applikasjon er at tjenesteeier ikke har lov til å slette instanser.
For å få lov til dette må det legges til en ny regel i `policy.xml` den finnes i `App/config/authorization`.
Regelen kan kopieres fra [regelbiblioteket](../autorisasjon/regelbibliotek/#org-can-delete-an-instance-of-orgapp-in-any-task-or-event).

### Steg 2: Identifiser hvilke instanser som ikke er fullført v.h.a. spørring mot storage

Storage eksponerer et sett med queryparametre som kan brukes når man skal hente ut et sett med instanser. 
i eksempelet nedenfor får man ut alle instanser som av en gitt applikasjon som er instansiert 30. september 2020 eller tidligere, 
og som enda står i utfyllingssteget.

Her kan man prøve seg litt fram for å finne de rette queryparameterene for akkurat deres tjeneste. 

`HTTP GET https://platform.altinn.no/storage/api/v1/instances?appId={org}/{app}&created=lte:2020-09-30&process.currentTask=Task_1`

### Steg 3: Slette instans via endepunkt eksponert i applikasjone

Når man har identifisert instansene som skal slettes er det en smal sak å sende et kall
til applikasjonen for å få slettet disse. Da må id på instansen (instanceOwner.partyId/instanceGuid) oppgis.

`HTTP DELETE https://ttd.apps.altinn.no/ttd/apps-test/instances/{instanceOwner.partyId}/{instanceGuid}`
