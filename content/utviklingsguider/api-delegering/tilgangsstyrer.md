---
title: For tilgangsstyrer
description: Hvordan du som tilgangsstyrer for en virksomhet som har fått tilgang til et API i Maskinporten delegerer denne videre til en leverandør.
toc: true
aliases: 
    - /utviklingsguider/sikkerhet-i-eoppslag/tilgangsstyrer/
---

## Introduksjon
Delegering av API-ressurser er flyttet fra Altinn 2 til Altinn 3, og gjøres nå fra et eget panel (Tilgang til programmeringsgrensesnitt - API) i virksomhetens profilside i Altinn.
For å administrere slike delegeringer gjort av virksomheten, klikker du på knappen "Gi eller fjern tilganger".

![Starte delegering API-resurser fra profilsiden](/docs/images/guides/eoppslag/delegate-ds-03.png "Starte delegering API-resurser fra profilsiden")

Du kommer da til en oversiktsside for alle API som virksomheten har delegert bort og hvem som har mottatt dem. Du kan trekke tilbake tilgang til APIene ved å trykke på "Endre tilganger" eller du kan legge til nye tilganger ved å trykke på "Deleger nytt API".

![Fjerne eller legge til ny delegering](/docs/images/guides/eoppslag/delegate-ds-04.png "Fjerne eller legge til ny delegering")

## Gi tilgang til nytt API

![Legge til ny delegering](/docs/images/guides/eoppslag/delegate-ds-05.png "Legge til ny delegering")

Når du skal delegere nye API velger du først hvilke APi-resurser som skal delegeres. Her kan du filtrere på tittel, beskrivelse og/eller eier av ressursen. Når du har lagt til alle API-ressursene du ønsker, trykker du på neste-knappen

![Legge til API-resurser](/docs/images/guides/eoppslag/delegate-ds-06.png "Legge til API-resurser")

På neste steg i delegeringsprosessen velger du mottaker. De virksomhetene som allerede har aktive delegeringer vil automatisk dukke opp som forslag og kan velges direkte. Dersom du vil delegere til en ny mottaker kan du gjøre dette ved å søke dem opp gjennom deres organisasjonsnummer og legge den til når virksomheten dukker opp som alternativ.

![Velge mottaker av API-ressurs](/docs/images/guides/eoppslag/delegate-ds-07.png "Velge mottaker av API-ressurs")

Når du har valgt alle mottakerne trykker du "neste"

![Velge mottaker av API-ressurs](/docs/images/guides/eoppslag/delegate-ds-08.png "Velge mottaker av API-ressurs")

Når du så trykker "Bekreft" vil delegeringen lagres.

![Bekreft delegering](/docs/images/guides/eoppslag/delegate-ds-09.png "Bekreft delegering")

Etter delegeringen er bekreftet får du en oppsumering av delegeringene som er fullført og mulighet til å gå tilbake til oversiktssiden. Delegeringer som er fullført vil da dukke opp her.

![Tilbake til oversiktsiden](/docs/images/guides/eoppslag/delegate-ds-10.png "Tilbake til oversiktsiden")

## Fjerne delegering til nytt API

Når du skal trekke tilbake tilganger til delegerte APIer trykker du på knappen "Redigere tilganger" på oversiktsiden

![Rediger tilgang](/docs/images/guides/eoppslag/delegate-ds-11.png "Rediger tilgang")

Du får da opp muligheten til å velge hvilke delegeringer du ønsker å fjerne enten ved å markere dem enkelte API under en eller flere mottakre eller ved å fjerne samtlige delegeringer gjort til en mottaker. Du kan angre alle slike endringer helt til du trykker på "Lagre". Delegeringer markert for sletting vil da fjernes fullstendig. 

![Slett tilgang](/docs/images/guides/eoppslag/delegate-ds-12.png "Slett tilgang")

![Slett tilgang](/docs/images/guides/eoppslag/delegate-ds-13.png "Slett tilgang")

## Hvem kan delegere - rollekrav

 Det er eieren av API-ressursen som bestemmer rollekrav og det kan derfor variere fra ressurs til ressurs. Den vanligste rollen for denne typen delegering er Programmeringsgrensesnitt (API) som da gis til
 [nøkkelroller fra Enhetsregisteret](https://www.altinn.no/nn/hjelp/skjema/alle-altinn-roller/hvem-har-forhandstildelte-roller-i-altinn/). 
 Dersom API-resursen også skal være tilgjengelig for Kontaktperson i NUF kan tjenesten også knyttes til rollen Programmeringsgrensesnitt for NUF (API). 
 Eieren av API-resursen står fritt til å knytte den til de rollene som de finner mest egnet til formålet.
 
**I likhet med delegering forøvrig i Altinn, må du være obs på hvordan delegering fungerer i forhold til rollene Tilgangsstyring og Hovedadministrator.** 

- Hovedadministrator i virksomheten (både de som har rollen gjennom rolle i Enhetsregisteret og de som har fått delegert rollen) har mulighet til å delegere tilgang til API-ressurser.

   - *Eksempel: Hvis du på vegne av organisasjon A gir rollen Hovedadministrator til organisasjon B, vil nøkkelrolle-innehavere (daglig leder etc) i organisasjon B kunne delegere tilgang til API-et på vegne av organisasjons A.*

   - *Eksempel: Hvis du på vegne av organisasjon A gir rollen Hovedadministrator til en person, vil denne personen kunne delegere API-ressurser på vegne av organisasjon A*

- Personer som har rollen Programmeringsgrensesnitt (API) eller Programmeringsgrensesnitt for NUF (API) på vegne av en virksomhet, har mulighet til å delegere tilgang til API-ressurser for virksomheten.

   - *Eksempel: Hvis du på vegne av organisasjon A delegerer rollen Programmeringsgrensesnitt (API) til en person C, vil denne person C kunne delegere API-ressurser på vegne av organisasjon A.*

   - *Eksempel: Hvis du på vegne av organisasjon A delegerer rollen Programmeringsgrensesnitt (API) til organisasjon B, vil personer med nøkkelrolle i organisasjon B kunne delegere API-ressurser på vegne av organisasjon A.*

- Personer med nøkkelroller i virksomheter som har enkeltrettighet til en API-ressurs, og i tillegg har Tilgangsstyring har mulighet til å delegere den/de API-ressursene vedkommende selv har tilgang til.

   - *Eksempel: Hvis du på vegne av organisasjon A gir tilgang til en API-ressurs til organisasjon B, og organisasjon B i tillegg er gitt rollen Tilgangsstyrer hos organisasjon A,
vil nøkkelrolle-innehavere (daglig leder etc) i organisasjon B kunne delegere tilgang til API-et på organisasjons A vegne.*



## Arv av tilganger til API-ressurser

Tilganger i Altinn blir vanligvis arvet - slik at en tilgang gitt til en overenhet også gjelder for eventuelle underenheter.
Dette gjelder imidlertid **ikke** for API-ressurser - her gis tilgangene kun en-til-en mellom virksomheter (organisasjonsnummer). 

Merk imidlertid at disse delegeringene av tekniske årsaker vil vises som arvet i
[de ordinære autorisasjons-APIene](../../../api/rest/autorisasjon/roller-og-rettigheter/),
men arvede rettigheter blir altså ikke hensyntatt av Maskinporten og har ingen praktisk effekt.

