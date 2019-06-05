---
title: Logge bruk av samtykke
description: Hvordan logge at man har hentet data som sluttbruker har samtykket til deling av
weight: 50
aliases:
 - /guides/samtykke/datakonsument/logge-bruk/
---

Når man har hentet data som er omfattet av samtykket som sluttbruker har gitt, kan man logge at data er hentet. For å logge bruk av samtykke/henting av data, trenger man autorisasjonskoden som ble gitt når sluttbruker samtykket til deling av data, samt ApiKey som er registrert på enten organisasjonsnummer som matcher mottaker av samtykke eller tredjepart som kan behandle samtykker på vegne av mottaker.

Via REST benyttes POST på https://www.altinn.no/api/authorization/token/{AuthCode}/loguse 


#### Legg følgende inn i header:

ApiKey: `{apikey}`, 

Accept: application\hal+json, 

Content: application\hal+json




#### Legg følgende inn i body:
   
    {
        
    ServiceCode: "{SC}",

    ServiceEditionCode: {SEC},

    UsageDateTime: "yyyy-mm-dd hh:mm"
    }  

Responsen på denne requesten skal være 402 No content.

For engangssamtykker vil et loguse-kall føre til at samtykket opphører. For samtykker som kan benyttes flere ganger innen utløpsdato, vil henting av data registreres i samtykkeloggen hos sluttbruker.

