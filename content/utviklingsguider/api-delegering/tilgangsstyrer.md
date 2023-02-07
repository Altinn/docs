---
title: For tilgangsstyrer
description: Om hvordan du som tilgangsstyrer for en virksomhet som har fått tilgang til et API i Maskinporten delegerer denne videre til en leverandør.
toc: true
aliases: 
    - /utviklingsguider/sikkerhet-i-eoppslag/tilgangsstyrer/
---

## Introduksjon

Delegerbare API-ressurser delegeres på samme måte som vanlige Altinn-tjenester, og søkes opp på vanlig måte.

![Delegering av API-ressurs](/docs/images/guides/eoppslag/delegate-ds-01.png "Delegering av API-ressurs")

## Hvem kan delegere - rollekrav

 API-ressurser er ikke knyttet til noen vanlige Altinn-roller,
 kun [nøkkelroller fra Enhetsregisteret](https://www.altinn.no/nn/hjelp/skjema/alle-altinn-roller/hvem-har-forhandstildelte-roller-i-altinn/).
 Dette betyr at API-ressurser i utgangspunktet må delegeres via enkelttjenestedelegering - du kan altså ikke gi tilgang gjennom å delegere en rolle. 

**I likhet med delegering for øvrig i Altinn, må du være obs på hvordan delegering fungerer i forhold til rollen "Tilgangsstyring".** 

Eksempel: Hvis du på vegne av organisasjon A gir tilgang til en API-ressurs til organisasjon B, og organisasjon B i tillegg er gitt rollen "Tilgangsstyrer" hos organisasjon A,
vil nøkkelrolle-innehavere (daglig leder etc) i organisasjon B kunne delegere tilgang til API-et på organisasjons A vegne.

## Arv av tilganger til API-ressurser

Tilganger i Altinn blir vanligvis arvet - slik at en tilgang gitt til en overenhet også gjelder for eventuelle underenheter.
Dette gjelder imidlertid **ikke** for API-ressurser - her gis tilgangene kun en-til-en mellom virksomheter (organisasjonsnummer). 

Merk imidlertid at disse delegeringene vil av tekniske årsaker vil vises som arvet i
[de ordinære autorisasjons-APIene](../../../api/rest/autorisasjon/roller-og-rettigheter/),
men arvede rettigheter blir altså ikke hensyntatt av Maskinporten og har ingen praktisk effekt.

