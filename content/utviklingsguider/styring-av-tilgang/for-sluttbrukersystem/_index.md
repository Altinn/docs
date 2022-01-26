---
title: Administrer dine rettigheter via REST-API
linktitle: For sluttbrukersystem
description: Gjennom autorisasjons-api kan virksomheten knytte egne systemer mot Altinns API slik at man får en helhetlig oversikt og administrasjon av rettigheter til de ansatte. 
weight: 90
---

 
Her følger en enkel oppskrift på hvordan datasystem kan ta i bruk API for å koble sammen bedriftens egne systemer med tilgangsstyrin gi Altinn. 

For en mer detaljert innføring kan man også lese vår [Veiledning API klient](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/).
Den viser hvordan man kan lage en enkel tilgangsstyringsklient i C# og .Net.

## Hvorfor bruke AutorisasjonsAPI for tilgangsstyring? 
Ved å koble bedriftens interne systemer opp mot Altinns AutorisasjonsAPI kan følgende oppnås: 
- mulig å forenkle arbeidsprodsesser for hovedadministrator 
- mulig å automatisere administrasjon av rettigheter for egne ansatte i altinn
- kan koble intern oversikt over ansatte med rettigheter gitt i Altinn
- enklere å sikre at nyansatte får nødvendige rettigheter og at de som slutter fratas rettigheter de ikke skal ha

## Tilgang til API og autorisering av bruker
For å få tilgang til API trengs en API-nøkkel. Her finner du lenke for å bestille dette: [lenke til bestillingsskjema](/docs/api/rest/kom-i-gang/#er-du-ikke-tjenesteeier-i-altinn)

AutorisasjonsAPI krever at systemet som integreres med Altinn autentiseres som en sluttbruker, som regel en person. 
Systemet vil da kunne opptre som sluttbrukeren, og utføre tjenester på vegne av sluttbrukeren selv og andre personer eller organisasjoner som sluttbrukeren har 
roller og rettigheter hos - f.eks. sende inn skjemaer, hente meldinger fra det offentlig, administrere tilganger i virksomheter etc. 
Autentisering av person skjer via [idporten](/docs/api/rest/kom-i-gang/person/#autentisering-med-id-porten)

For virksomheter som ønsker å benytte sluttbruker-API-er uten å autentisere en person, kan det brukes en virksomhetsinnlogging av en virksomhetsbruker, 
se [kom i gang med virksomhetsbruker](/docs/api/rest/kom-i-gang/virksomhetsbrukere/) for forklaring av hva virksomhetsbruker er.  

For å benytte virksomhetsbruker må virksomheten: 
1.	Opprette en virksomhetsbruker knyttet til sitt organisasjonsnummer 
2.	Delegerer rollen «Hovedadministrator» til virksomhetsbrukeren

Innlogging av virksomhetsbruker skjer via Maskinporten og er beskrevet her [autentisering med virksomhetsbruker og maskinporten](/docs/api/rest/kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-maskinporten)

## Relevante autorisasjonstjenester å benytte 
Se [ informasjon om hvordan REST-API-et kan benyttes for tilganggstyring](/docs/api/rest/autorisasjon/roller-og-rettigheter/)

## Kanaler for bistand
Det finnes en slack-kanal hvor utvikler hvor man kan lete gjennom tidligere stilte spørsmål - evt stille nye tekniske spørsmål [slack-invitasjon](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog)
For rapportering av feil, eller for spørsmål som inneholder data som ikke er egnet til en åpen kanal så sendes epost til sluttbrukersystem@altinn.no 
