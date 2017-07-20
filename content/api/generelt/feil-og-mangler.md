---
title: Kjente feil og begrensninger
description: Kjente feil og funksjonalitet som ikke ennå er implementert i REST-apiet
weight: 10
---



### Kjente feil
 
Ved uthenting av delegerte roller og rettigheter, vil man ikke kunne hente roller og rettigheter samlet ved hjelp av /api/{who}/authorization/delegations/{receiverid}
 for mer enn de første 50 innslagene i /api/{who}/authorization/delegations

 

### Mangler per 19.07.2017
-Det er ikke mulig å slette meldinger sendt til organisasjoner

### Kommende funksjonalitet
 - Separat POST, PUT og DELETE på forms (både hovedskjema og underskjema) (K4 2017)
 - Separat POST og DELETE på attachments-ressursen (K4 2017)
 - Logging av brukt samtykke (K4 2017)
