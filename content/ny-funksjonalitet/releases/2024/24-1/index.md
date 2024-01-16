---
title: 24.1
description: Mindre forbedringer og feilrettinger
weight: 120
type: releasenote
releasenote_info: Release 24.1. Produksjonssettes 22. januar
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i SBL Bridge API
### GET/sblbridge/authorization/api/parties returnerer null verdi for PartyUUID

Request : 
GET/{{EnvUrl}}/sblbridge/authorization/api/parties?userId=20000029

The mapping between ReporteeBE and Party was not updated to map PartyUUID


### SBL Bridge rights delegation API should use AttributeMatch model for Action

Delegation model from access-management backend expected SBL bridge delegation API to use internal model with AttributeMatch as input for Action property.

As the change to only use Action as string value, only affect access-management external model and BFF.

## Diverse bugfix
### Timeout ved skriving til request log

Det har vært to hendelser med timeout mot request loggen. Det er ønskelig at dette kallet skal være synkront, men hvis konsekvensen er at man får mange feil fordi det er for høy samtidighet mot request logg, er det bedre at kallet er asynkront og potensielt kan feile uten å logge requesten.

Oppdatering: Nærmere gjennomgang av koden viser at det ikke er noen åpenbare forbedringspunkter. Loggingen er asykron. Feilene som ble logget fra produksjon medførte ikke at requestene i seg selv feilet.

  
