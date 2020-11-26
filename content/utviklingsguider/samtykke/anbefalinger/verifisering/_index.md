---
title: "Verifisering av gitt samtykke"
linktitle: "Verifisering"
description: Informasjon og anbefalinger knyttet til innhenting og bruk av samtykketokens samt bruk av samtykkelister.
weight: 60
---

{{% notice info %}}
Les også grunnleggende informasjon om:
* [Hvordan konsumenter henter token]({{< ref "utviklingsguider/samtykke/datakonsument/hente-token/" >}})
* [Hvordan datakilder validerer token]({{< ref "utviklingsguider/samtykke/datakilde/bruk-av-token/" >}})
{{% /notice %}}

## Overordnet

En sentral del av en samtykketjeneste er å kunne verfisere at et samtykke er gitt og er gyldig på et gitt tidspunkt. Den mest brukte mekanismen for sjekke dette er gjennom bruk av et JSON Web Token (JWT) som inneholder all [informasjon knyttet til samtykket og samtidig inneholder en kryptografisk signatur fra Altinn](http://localhost:1313/docs/utviklingsguider/samtykke/datakilde/bruk-av-token/#bruk-av-self-contained-oauth-token). Dette lar en datakilde verifisere at samtykket er gyldig uten å måtte gjøre oppslag mot Altinn. **I de fleste samtykketjenester er det bruk av samtykketokens som anbefales**, men i noen sammenhenger kan det være upraktisk å forholde seg til ett og ett samtykke, f.eks. hvis det skal gjøres behandling av datasett / aggregeringen som spenner over mange personer/organisasjoner. For denne type tjenester tilby Altinn et feedbasert API for å hente ut [lister av samtykker]({{< ref "api/tjenesteeiere/rest/autorisasjon/samtykke-liste/" >}})

## Endepunkter for uthenting av token

Altinn-plattformen er skalert for høy belastning, og møter dagens allerede store behov knyttet til tokenutstedelse. Imidlertid forventes at dette behovet vil vokse ytterligere i sammenheng med at det utvikles flere tjenester som benytter seg av langlevde samtykker. Antall tokens som utstedes i forhold til hvert inngåtte samtykke vil derfor gå opp, og det er viktig for de digitale tjenestene som benytter seg av samtykker at det til enhver tid kan hentes samtykketokens raskt og effektivt for å sikre tilgjengelighet og en god brukeropplevelse.

For å understøtte dette vil Altinn i løpet av 2021 tilby et nytt og optimalisert endepunkt for utstedelse av token på Altinn 3-plattformen basert på skyteknologi. Kombinert med  en database og applikasjon skreddersydd for nettopp tokenutstedelse, vil dette sikre skalerbarheten som trengs for å håndtere ekstremt stor vedvarende trafikk, og samtidig gi elastisitet til å håndtere brå trafikkøkninger ("spikes").

Dagens endepunkt for utstedelse av tokens, https://www.altinn.no/api/token, vil fremdeles bestå, og fortsatt kunne brukes. Det nye endepunktet vil være funksjonelt likt, med det unntak at alle forespørsler må være autentiserte med Maskinporten-token. Alle konsumenter av samtykketokens anbefales å bruke det nye endepunktet når det tilgjengeliggjøres.

**Mer informasjon om det nye endepunktet vil komme ila første kvartal 2021.**

## Bruk av sertifikat for å verifisere token-signatur
 
Altinn tilgjengeliggjør sertifikatet for signering av tokens på et [JWK-endepunkt](http://localhost:1313/docs/utviklingsguider/samtykke/datakilde/bruk-av-token/#json-web-keys-jwk). Dette muliggjør automatisk rotering av sertifikater uten at datakilder trenger rekonfigurering. Alle datakilder anbefales å ta i bruk dette endepunktet for å hente sertifikater som brukes for signering.

Endepunktet eksponerer to sertifikater, som er primær og sekundær-sertifikater. Samtykketokens vil alltid signeres med det som til enhver tid er primærsertifikatet. Datakilder må se på e `kid`- eller `x5t`-feltet (de skal ha samme verdi) i headeren i tokenet til å matche listen med sertifikater på JWK-endepunktet. På denne måten vil Altinn kunne bytte primær/sekundær og på den måten kunne introdusere et nytt sertifikat for signering uten at noen eksisterende aktive tokens blir ugyldiggjorte. 

I god tid før primærsertifikatet utløper vil et nytt sertifikat introduseres som sekundærsertifikat, slik at alle datakilder vil rekke å hente oppdatert JWK-sett før rotering. Alle kall til JWK-endepunktet kan caches i inntil 1 døgn (86400 sekunder), jf. `Cache-Control`-header som returneres. Alle datakilder anbefales å cache JWK fra Altinn i henhold til enhver tid gjeldende `Cache-Control`-header.

{{% notice info %}}
Merk at sertifikatet som brukes for signering av tokens kan være self-signed, altså ikke signert av en sertifisert utsteder (CA). Tilliten er i stedet ankret i TLS-forbindelsen til JWK-endepunktet, som bruker et Extended Validation (EV)-sertifikat utstedt av Buypass.
{{% /notice %}}
