---
title: Samtykke
description: Med samtykke kan du be om lov til å hente data det offentlige har om en innbygger eller virksomhet. Du får da midlertidig innsynsrett på et spesifikt sett med opplysninger fra brukeren. Dette kan for eksempel være ligningsdata fra Skatteetaten. 
weight: 30
aliases:
- /guides/samtykke/
---

Dataene kan hentes i ulike formater og enten via Altinn eller utenom. Se et eksempel på dataflyt i [Samtykkebasert lånesøknad](/docs/utviklingsguider/samtykke/eksempel/).

Utvikling av en løsning for å ta i bruk samtykke involverer gjerne flere parter. Ønsker du å få tilgang til data du trenger i din saksbehandling må du gå i dialog med den etaten som har de dataene du trenger, slik at dere kan samarbeide om å lage en god løsning.

Ved bruk av samtykke i Altinn er det tre parter:

- **[Datakilde](/docs/utviklingsguider/samtykke/datakilde/):** I de fleste sammenhenger har tjenesteeier (eier av samtykketjenesten) dataene lagret hos seg.
- **[Datakonsument](/docs/utviklingsguider/samtykke/datakonsument/)**: Den som trenger tilgang til data for å bruke dem i sine egne prosesser.
- **[Sluttbruker](/docs/utviklingsguider/samtykke/sluttbruker/)**: Den som eier dataene og som kan gi samtykke til at datakilden kan dele data om dem med datakonsumenten.<br><br>

Slik går du frem:

1. **Start med å definere brukerbehov**<br>Det er viktig å tenke gjennom brukerbehovene løsningen skal dekke. Hvem skal bruke løsningen, hvilke data skal hentes og hvem skal bruke dem? Lag gjerne en skisse til kommunikasjon med brukeren og test skissen på folk i målgruppen. God planlegging er nøkkelen til et godt resultat. Sjekk Guide: [Hvordan jobbe brukerorientert?](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/hvordan-jobbe-brukerorientert/) for inspirasjon.
2. **Tilgang til systemer**<br>Hvis du ikke har utviklet tjenester i Altinn før trenger du tilgang til våre løsninger. Datakilde/tjenesteeier trenger tilgang til Altinn sin tjenesteutviklingsløsning for å lage samtykketjenesten. Les [Kom i gang med utvikling](/docs/kom-i-gang-med-utvikling/). Den som skal koble seg på og bruke dataene trenger en API-nøkkel. Les [Hvordan komme i gang som datakonsument](/docs/utviklingsguider/samtykke/datakonsument/).
3. **Lag samtykketjenesten i Altinn sin tjenesteutviklingsløsning**<br>Tjenesteeier, som har datakilden, lager tjenesten som benyttes for å gi samtykke. Les utviklerguide til [samtykke](/docs/utviklingsguider/samtykke/).
4. **Få tilgang til data**<br>Samtykkeløsningen er etablert slik at tjenesteeier har stor fleksibilitet i hvordan data de har skal tilbys til datakonsument. Data kan gå via Altinn eller utenom, og kan tilbys via forskjellige formater og grensesnitt. Dette må partene bli enige om. Datakonsument kan lese [utviklerguide til å koble seg på samtykketjeneste](/docs/utviklingsguider/samtykke/datakonsument/) for mer informasjon.
5. **Teste tjeneste**<br>Tjeneste og grensesnitt må testes i Altinn sitt testmiljø. Det benyttes fiktive testpersoner og -organisasjoner i våre testmiljø. Les i vår utviklingsguide hvordan du tester tjenesten som en [tjenesteeier](/docs/utviklingsguider/samtykke/datakilde/test-tjeneste/) og som en [datakonsument](/docs/utviklingsguider/samtykke/datakonsument/test-tjeneste/). Det er også viktig med brukertesting for å sikre en god opplevelse for de som skal bruke de ferdige tjenestene. Ved samtykke er det særdeles viktig at den som skal gi samtykke har fått tilstrekkelig informasjon til å vite hva det samtykkes til.
6. **Produksjonssette tjeneste**<br>Når tjenesten er testet ende til ende kan den produksjonssettes. Dette bestilles hos Altinn. Det bør tas høyde for å verifisere at tjenesten fungerer tilfredsstillende i produksjonsmiljøet før den publiseres for reelle brukere.

**Samtykkebasert lånesøknad**<br>
Hvis du jobber for en bank, forsikringsselskap eller lignende og ønsker å hente inn skattegrunnlag og inntektsdata hos Skatteetaten, kan du følge [BITS guide](https://www.bits.no/dsop-sbl/) til samtykkebasert lånesøknad.

{{% children description="true" %}}
