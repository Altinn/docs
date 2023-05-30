---
title: For tilgangsstyrer
description: Om hvordan du som tilgangsstyrer for en virksomhet som har fått tilgang til et API i Maskinporten delegerer denne videre til en leverandør.
toc: true
aliases: 
    - /utviklingsguider/sikkerhet-i-eoppslag/tilgangsstyrer/
---

## Introduksjon

Delegerbare API-ressurser har fått en egen fane på profilsiden delegeres nå i Altinn Platform og vises ikke lenger blant andre Altinn tjenester.
Fra profilsiden velger man å legge til eller fjerne tilganger.

![Starte delegering API-resurser fra profilsiden](/docs/images/guides/eoppslag/delegate-ds-03.png "Starte delegering API-resurser fra profilsiden")

På neste side velger man enten å endre tilganger for å trekke tilbae en tilgan eller legge til ny tilgang

![Fjerne eller legge til ny delegering](/docs/images/guides/eoppslag/delegate-ds-04.png "Fjerne eller legge til ny delegering")

På neste steg i delegeingsprosessen velger man mottaker enten fra listen som allerede har motatt eller fyller inn en ny mottaker

![Velge mottaker av API-ressurs](/docs/images/guides/eoppslag/delegate-ds-05.png "Velge mottaker av API-ressurs")

Når man har valgt alle mottakere trykker man "neste"

![Velge mottaker av API-ressurs](/docs/images/guides/eoppslag/delegate-ds-06.png "Velge mottaker av API-ressurs")

Velger hvilke APi-resurser man skal delegere her kan man filtrere på tittel beskrivelse og eier av resursen. Legge til alle man ønsker og trykker neste

![Legge til API-resurser](/docs/images/guides/eoppslag/delegate-ds-07.png "Legge til API-resurser")

Bekrefte delegeringen så lagres den.

![Bekreft delegering](/docs/images/guides/eoppslag/delegate-ds-08.png "Bekreft delegering")


## Hvem kan delegere - rollekrav

 Det er eieren av API-ressursen som bestemmer rollekrav og det kan derfor variere fra resurs til resurs, Den vanligste rollen er nok Programmeringsgrensesnitt (API) som da gis til
 [nøkkelroller fra Enhetsregisteret](https://www.altinn.no/nn/hjelp/skjema/alle-altinn-roller/hvem-har-forhandstildelte-roller-i-altinn/). 
 Dersom API-resursen også skal være tilgjengelig for Kontaktperson i NUF kan tjenesten også knyttes til rollen Programmeringsgrensesnitt for NUF (API). 
 Eieren av API-resursen står egentlig fritt til å knytte den til de rollene som de finner mest egnet til formålet.
 
**I likhet med delegering for øvrig i Altinn, må du være obs på hvordan delegering fungerer i forhold til rollen "Tilgangsstyring" og "Hovedadministrator".** 

Eksempel 1: Hvis du på vegne av organisasjon A gir tilgang til en API-ressurs til organisasjon B, og organisasjon B i tillegg er gitt rollen "Tilgangsstyrer" hos organisasjon A,
vil nøkkelrolle-innehavere (daglig leder etc) i organisasjon B kunne delegere tilgang til API-et på organisasjons A vegne.

Eksempel 2: Hvis du på vegne av organisasjon A gir rollen "Hovedadministrator" til organisasjon B, 
vil nøkkelrolle-innehavere (daglig leder etc) i organisasjon B kunne delegere tilgang til API-et på organisasjons A vegne.

## Arv av tilganger til API-ressurser

Tilganger i Altinn blir vanligvis arvet - slik at en tilgang gitt til en overenhet også gjelder for eventuelle underenheter.
Dette gjelder imidlertid **ikke** for API-ressurser - her gis tilgangene kun en-til-en mellom virksomheter (organisasjonsnummer). 

Merk imidlertid at disse delegeringene vil av tekniske årsaker vil vises som arvet i
[de ordinære autorisasjons-APIene](../../../api/rest/autorisasjon/roller-og-rettigheter/),
men arvede rettigheter blir altså ikke hensyntatt av Maskinporten og har ingen praktisk effekt.

