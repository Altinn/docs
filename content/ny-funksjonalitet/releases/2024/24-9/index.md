---
title: "24.9"
description: Leveransenotater for leveransen i August 2024
type: releasenote
weight: 50
---
## Generelt om Releasen
Nok en liten release med for de meste interne fikser som ikke påvirker eksterne brukere eller ekstern funksjonalitet. 

## Endringer i SBL
To nye tjenesteeiere lagt inn:
TRAFIKKFORSIKRINGSFORENINGEN
Sunnfjord Miljøverk IKS

## Endringer i Autorisasjon

### API for visning av antal delegeringer for lenketjenester i A2

Teller opp antall delegeringer for lenketjenester i Altinn 2 for presentasjon i Altinn Studio når man skal migrere lenketjenester over i Altinn 3.

## Endringer i SBL Bridge API

### Register change event

There is added export from SBL Bridge for Party Connections and Roles from ER and extended the Party model so it holdes last changed in Altinn and in ER/DSF And added two API on SBL Bridge to handle all Changes from ER/FReg on Parties and Roles and Connection on ER Changes

## Diverse bugfix

### Error in XmlSignUtil because reference to Altinn code has moved

Open the Framework/Internal/App/XMLDSigUtility/XMLDSigUtility solution and try to build it you will get a reference to XmlDSigUtility is not resolved. Change the path to XmlDSigUtility as it is moved i tha ALtinn solution

### Changes needed for migration of reporting services to Altinn 3
Added more values to InstanceEventType
