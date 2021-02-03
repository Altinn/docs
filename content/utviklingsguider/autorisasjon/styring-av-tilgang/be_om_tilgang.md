---
title: Be om tilgang
description: Ofte er det bruker/den ansatte som skal utføre en gitt tjeneste som selv oppdager at vedkommende mangler tilstrekkelig rettigheter til å gjøre dette. For å forenkle prosessen med å skaffe seg nødvendige rettigheter har vi utviklet funksjonaliteten "Be om tilgang".
weight: 10
---

Tilsvarende funksjonalitet finnes også for [be om samtykke eller fullmakt](/docs/utviklingsguider/samtykke/datakonsument/be-om-samtykke/). 

# Slik fungerer "Be om tilgang"

#### En typisk flyt for å skaffe seg tilgang man mangler

1) Ansatt/bruker logger inn i Altinn eller eksternt brukersted som bruker Altinn som autorisasjonsløsning
2) Ansatt/bruker velgre å representere en annen person ellre virksomhet og starter ønsket tjeneste
3) Ansatt/bruker får beskjed om at hun mangler rettighet og velger å be om rettighet
4) Altinn eller eksternt brukersted oppretter en forespørsel om rettighet. Eksternt brukersted oppretter [tilgangsforespørsel via REST ](/docs/api/tjenesteeiere/rest/autorisasjon/tilgangsforesporsler/)
5) Ansatt/bruker bekrefter at hun ønsker å oppretter en forespørsel om rettighet
6) Ansatt/bruker angir hvorfor rettighet ønskes, administrator som skal varsles og bekrefter forespørsel 
7) Administrator får varsel om at noen har bedt om rettighet
8) Administrator logger på Altinn og godkjenner forespørsel om rettighet
9) Ansatt/bruker får varsel om at hun har fått en rettighet

Bruker kan be om rettighet til en eller flere tjenster i gangen. 

![velg tjeneste](velg-tjeneste.PNG "Velg tjeneste som du ønsker tilgang til")

Bruker kan også legge til en beskjed for å forklare hvorfor man trenger denne rettigheten og evt velge hvilken tilgangsstyrer som skal ha epost-varsel om at hun har bedt om rettighet.

![be om rettighet](be-om-rettighet.png "Be om rettighet tjenester du trenger tilgang til.")

## Hvor kan man be om tilgang? 
#### I Altinn: 
Hvis bruker starter en tjeneste i Altinn som hun ikke har tilgang til så vil bruker få spørsmål om man ønsker å spørre om rettighet. '

![mangler tilgang](mangler-tilgang.PNG "Bruker mangler tilgang og kan be om å få det")

Bruker kan også be om nye rettigheter fra profilen sin i Altinn: 

![opprett forespørsel](opprett-foresporsel-fra-profil.PNG "Bruker kan be om tilgang fra profilen i Altinn")

For å unngå urettmessige forespørsler har Altinn lagt inn en begrensning slik at bruker bare kan be om rettighet fra virksomheter eller personer man allerede har en annen rettighet fra

#### Via REST: 

Her finnes en [detaljert beskrivelse](/docs/api/tjenesteeiere/rest/autorisasjon/tilgangsforesporsler/) av hvordan "be om tilgang" skal brukes for eksterne brukersteder som benytter
Atlinn for å styre tilgang til sine tjenester. 

## Hvem godkjenner forespørsel? 
For å godkjenne en forespørsel om tilgang så kreves det at bruker er hovedadministrator, er daglig-/styreleder eller er tilgangstyrer for de aktuelle tjenestene det bes om tilgang til. 
For å tiltrekke seg administrators oppmerksomhet så markeres profil med et rødt utropstegn når en forespørsel må behandles

![behandle forespørsel](behandle-foresporsel.PNG "Markør viser at forespørsler venter på behandling")


