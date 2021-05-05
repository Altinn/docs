---
title: Digital dialog
description: Med digital dialog kan du lage alt fra enkle til avanserte skjemaer.
weight: 1
---

Prosessen for å lage skjemaer og meldinger vil være forskjellig alt etter som hvor stor eller liten målgruppen er,
hvor mye data som skal behandles eller hvor mye jobb det er å legge til rette for at egne systemer kan snakke med Altinn.

Slik går du frem: 

1. **Start alltid med å definere brukerbehov**  
   Tenk nøye gjennom hele prosessen fra et brukerperspektiv. Hva er utfordringen og hvem skal den løses for? Hva er databehovet?
   Lag gjerne en skisse til kommunikasjon med brukeren og test skissen på folk i målgruppen. God planlegging er nøkkelen til et godt resultat.
   Sjekk Guide: [Hvordan jobbe brukerorientert?](https://www.altinndigital.no/kom-i-gang/hvordan-jobbe-brukerorientert/) for inspirasjon.
2. **Få tilgang til systemer**  
   Hvis du ikke har utviklet tjenester i Altinn før trenger du tilgang til Altinn tjenesteutviklingsløsning og domeneklient.
   I tillegg trenger du tilgang for å benytte Altinn sine webservicer.
   I [Kom i gang med utvikling](/docs/kom-i-gang-med-utvikling/) kan du lese om hvordan du får tilganger.
3. **Tilrettelegge egne systemer for sending og mottak av data**  
   For å kunne sende og motta data trenger du å legge til rette for dette i de interne systemene.
   Den mest brukte formen for integrasjon mot Altinn er ved bruk av [SOAP](/docs/api/tjenesteeiere/soap/),
   men [batch](/docs/api/tjenesteeiere/batch/) er også mulig hvis det er snakk om store datamengder.
4. **Utvikle tjenestene**
   En digital dialog består gjerne av et skjema og en melding som du lager i Altinns tjenesteutviklingsløsning og domeneklient.
   I domeneklienten definerer du felter i skjema for å kunne gjøre oversendinger til ditt system.
   Her er det en god idé hvis du på forhånd har jobbet med flyt og tekster i skjemaet ut fra et brukerperspektiv, slik at du har klart for deg hva som skal utvikles.
   Under [brukerveiledning for TUL](/docs/tul/) kan du lese mer om hvordan du går frem.
   For å lage mer moderne og fremtidsrettede tjenester så bør du bruke det nye verktøyet [Altinn Studio](/docs/altinn-studio)
5. **Teste tjenestene**  
   Altinn har et eget testmiljø hvor du kan teste om tjenester og grensesnitt virker som det skal. I testmiljøet bruker du fiktive testpersoner og organisasjoner.
   Når du har kommet så langt i utviklingen er det også viktig å brukerteste den endelige løsningen på reelle folk i målgruppen.
   Dette for å sikre at det ikke er noen hinder for de som skal bruke tjenestene.
6. **Produksjonssette tjenestene**  
   Produksjonssetting av tjenestene gjøres ved å lage en bestilling til Altinn sin selvbetjeningsløsning.
   Denne får du innlogging til i oppstartsmøtet med Altinn. Som regel kan tjenestene produksjonssettes samme dag som bestillingen sendes.
   Husk å sjekke at tjeneste og tilhørende grensesnitt fungerer i produksjonsmiljø før produksjonssetting.

