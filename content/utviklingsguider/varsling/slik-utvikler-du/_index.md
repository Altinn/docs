---
title: Slik går du frem
description: Varsling er til for å minne brukerne på at det er kommet viktige ting de må se eller handle på. Når du som avsender skal varsle, tilrettelegger du dine systemer for å sende ut varsler og benytter en varslingsmal.
weight: 30
---

Slik går du frem:

1. **Definere brukerbehov**<br>Hvilket behov skal tjenesten dekke? Er brukeren en person eller en organisasjon – eller kanskje begge deler? Hva skal formidles til bruker? Hvordan skal du varsle? Les Guide - [Hvordan jobbe brukerorientert](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/hvordan-jobbe-brukerorientert/)
2. **Få tilgang til systemer**<br>Hvis du ikke har utviklet tjenester i Altinn før trenger du tilgang til våre løsninger. For å sende varsler trenger du tilgang for å benytte Altinn sine Web Servicer. I [Kom i gang med utvikling](/docs/kom-i-gang-med-utvikling/) kan du lese om hvordan du får tilganger.
3. **Tilrettelegge egne systemer for sending og mottak av data**<br>For å kunne sende og motta data trenger du å legge til rette for dette i de interne systemene. Den mest brukte formen for integrasjon mot Altinn er ved bruk av [SOAP](/docs/api/tjenesteeiere/soap/), men [batch](/docs/api/tjenesteeiere/batch/) er også mulig hvis det er snakk om store datamengder.
4. **Ta i bruk en varslingsmal**<br>Varsler som sendes ut er basert på en varslingsmal. Altinn har predefinerte maler samt maler som er opprettet slik at du kan sende egendefinerte tekststrenger. Du velger selv hvilken mal du ønsker å bruke. Det er også mulig å få laget sin egen mal. Les mer om [Varslingsmaler](https://altinn.github.io/docs/api/tjenesteeiere/#varselsmaler).  
5. **Sende ut varsler**<br>Når dine systemer er satt opp og du har funnet ut hvilken varslingsmal du skal ta i bruk, er du klar for å sende ut varsler. Varslene kan sendes ut sammen med et skjema som legges klart for utfylling, sammen med en melding/brev som sendes ut, eller du kan sende et varsel som ikke er knyttet til en tjeneste.
6. **Teste tjenestene**<br>Tjenester og grensesnitt testes i Altinn sitt testmiljø. Det benyttes fiktive testpersoner og -organisasjoner i våre testmiljø. Når du har kommet så langt i utviklingen er det også viktig å ha brukerteste den endelige løsningen på reelle folk i målgruppen. Dette for å sikre at det ikke er noen showstoppere for de som skal bruke tjenestene.
7. **Produksjonssette tjenestene**<br>Når tjenesten og tilhørende grensesnitt er testet ende til ende kan de produksjonssettes. Grensesnitt som er testet i testmiljø må reetableres i Altinn sitt produksjonsmiljø mot produksjonsmiljøet til ditt system. Dette bestilles hos Altinn. Det bør tas høyde for å verifisere at tjeneste og tilhørende grensesnitt fungerer tilfredsstillende i produksjonsmiljø før tilgang til tjenesten publiseres for bruker.

