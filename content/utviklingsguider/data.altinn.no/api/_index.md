---
title: Kom i gang med API
description: Her finnes informasjon om hvordan du kommer i gang med å integrere ditt system med data.altinn.no (DAN).
linktitle: API
toc: true
weight: 3
aliases: 
    - /utviklingsguider/data.altinn.no/bruke-rest-api/
---


## Innledning

Integrasjon mot data.altinn.no krever ingen spesiell programvare eller infrastruktur, men de fleste API-ene krever autentisering enten gjennom bruk av virksomhetssertifkat eller token fra Maskinporten. Sistnevnte anbefales, og er også påkrevd for autorisasjon på enkelte datasett.

Videre kreves en API-nøkkel ("subscription key") for den eller de tjenestene som skal benyttes. Disse kan man be om gjennom utviklerportalen på https://data.altinn.no.

## Kom i gang - overordnede steg

For å ta bruk data.altinn.no må du:

1. [Identifisere hvilke datasett du ønsker å bruke](/docs/utviklingsguider/data.altinn.no/datasett/), og dermed hvilken tjeneste som er aktuell for deg.
2. Registrere deg på [utviklerportalen](https://data.altinn.no) (du kan også velge [preproduksjonsmiljøet](https://test.data.altinn.no) hvor du kan bruke [syntetiske data](../testing)) og få tildelt en API-nøkkel ("subscription key").
3. [Ta i bruk Maskinporten](/docs/utviklingsguider/data.altinn.no/api/#autentisering-og-autorisasjon) slik at du kan autentisere deg for tjenesten. For tilgang i produksjon til eventuelle scopes som kreves for tjenesten du ønsker å benytte må du [kontakte oss](mailto:dan@altinn.no).
4. Se [listen over datasett](/docs/utviklingsguider/data.altinn.no/datasett/) og ta utgangspunkt i eksemplene for å lage din integrasjon. Hvis du benytter .NET5 eller nyere anbefaler vi bruk av [DAN SDK](https://github.com/Altinn/altinn-apiclient-dan)

## Protokoll og formater

REST-APIet bygger på HTTP, og tilkoblinger sikres ved hjelp av TLS 1.2 kryptering. Dataene formateres i JSON, og pakkes inn i en konvolutt (kan utelates) som er lik på tvers av alle datasett. Noen datasett er enkle nøkkel/verdi-par, mens andre har rike strukturer som er beskrevet av et eget [JSON schema](https://json-schema.org/). 

## Versjonering

API-et har et versjonsprefiks som en del av URL-en. Gjeldende versjon er "v1", og eventuelt nye versjoner vil få "v2", "v3" etc. data.altinn.no vil så langt det lar seg gjøre unngå å introdusere nye versjoner, men for å sikre bakoverkompabilitet med alle konsumenter vil nødvendig forbedring og utvidelse av funksjonalitet kunne medføre at en ny versjon må introduseres.

Nye uavhengige actions og modeller vil kunne bli lagt til en eksisterende versjon, og tillegg av nye felter vil kunne bli gjort på eksisterende actions og modeller i en gitt versjon.

Gamle versjoner vil bli støttet i minst 12 måneder etter at en ny versjon tilgjengeliggjøres, og alle registrerte brukere i vil bli underrettet i god til før utfasing av gamle versjoner finner sted for å sikre at alle får migrert til ny versjon.

* [Gå til data.altinn.no API Portal](https://data.altinn.no/)
* [OpenAPI 3.0 (swagger) for v1](https://api.data.altinn.no/v1/public/metadata/oas/json)

### Datasett

Feltene (navn, antall og verdityper) i datasett er å regne som ikke-muterbare, men datasett vil kunne endre hvilke autorisasjonsregler som ligger til grunn. Ved behov for nye felter i et gitt datasett, vil et nytt uavhengig datasett introduseres.

Gamle datasett vil kunne utfases i takt med tilgjengeligheten av dataene i de underliggende registrene. Disse er  eksterne for data.altinn.no, og følgelig utenfor vår kontroll - men så langt det lar seg gjøre vil datasett på samme måte som versjoner i API-et bli støttet i minst 12 måneder før disse fases ut.

* [Vis liste over alle datasett](/docs/utviklingsguider/data.altinn.no/beviskoder/)

### Feil- og statuskoder

Feil- og statuskoder som beskrevet i metadata-API-et vil ikke kunne endres eller fjernes uten at ny versjon av API-et introduseres, men nye feil- og statuskoder vil kunne bli lagt til i en eksisterende versjon.

* [Vis liste over alle statuskoder (JSON)](https://api.data.altinn.no/v1/public/metadata/statuscodes)
* [Vis liste over alle feilkoder (JSON)](https://api.data.altinn.no/v1/public/metadata/errorcodes)

## Autentisering og autorisasjon

For å autentisere seg mot REST-API anbefales bruk av Maskinporten. Man kan også benytte et virksomhetssertifikat (to-veis TLS) utstedt av en offentlig godkjent aktør. 

Buypass og Commfides tilbyr både produksjons- og test-sertifikater som kreves for bruk mot de respektive miljøene. Dette sertifikatet må benyttes gjennom standard klientsertifikat autentisering, noe de fleste HTTP-klienter støtter.

Autorisasjon foregår gjennom registrering av en konto og bruk av API-nøkler (subscription key) for den eller de tjenestene som skal benyttes. Dette gjøres i [utviklerportalen](https://data.altinn.no/).

* [Ta i bruk Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97)
* [Les om virksomhetssertifikat fra Buypass](https://www.buypass.no/produkter-og-tjenester/virksomhetssertifikat)
* [Les om virksomhetssertifikat fra Commfides](https://www.commfides.com/commfides-virksomhetssertifikat/)
* [Les om bruk av klientsertifkat i Postman](https://www.getpostman.com/docs/v6/postman/sending_api_requests/certificates)

## Miljøer og base-URL-er

Det er ulike base-URL-er som skal benyttes avhengig av miljø eller om det benyttes virksomhetssertifikat (to-veis TLS) eller Maskinporten-token.

| Miljø | Endepunkt for Maskinporten-token | Endepunkt for virksomhetssertifikat         | Utviklerportal              |
| ----- | -------------------------------- | ------------------------------------------- | ---------------------------- |
| Prod  | https://api.data.altinn.no       | https://apim-nadobe-prod.azure-api.net      | https://data.altinn.no       |
| Test  | https://test.api.data.altinn.no  | https://apim-nadobe-staging.azure-api.net   | https://test.data.altinn.no  |

For å finne endepunkt-URL-ene til de ulike operasjonene som støttes, som inkluderer versjonen av API-et som skal benyttes, se utviklerportalen.

## Registrere konto og skaffe API-nøkkel

Alle brukere av må registrere en profil i [utviklerportalen](https://data.altinn.no/) eller i testmiljøet https://test.data.altinn,no hvor man kan registrere applikasjoner og få utdelt API-nøkler som må oppgis i alle requests til data.altinn.no. Kontaktopplysningene du oppgi vil bli benyttet for å sende informasjon om planlagte endringer og nedetid samt annen driftsrelatert informasjon. På profilsiden vil man også kunne hente ut detaljert bruksstatistikk.

* [Gå til utviklerportalen](https://data.altinn.no/)

## Hvordan innhente opplysninger

Datasett kan hentes på to forskjellige måter; direkte eller gjennom en autorisasjonsforespørsel.

De fleste datasett kan hentes direkte med ett kall til data.altinn.no-API-et. Datasett som krever at det innhentes samtykke, eller er på annen måte konfigurerert som asynkront (fordi uthentingen av dataene fra kilden er en asynkron prosess) kreves at man først sender en _autorisasjonsforespørsel_ til REST-APIet, som inneholder informasjon om hvilken virksomhet man spør om og hvilke datasett en ønsker å hente. Hvis forespørselen blir autorisert, vil man som svar få en _akkrediterings-ID_ som representerer forespørselen. For datasett som er åpne eller hjemmelsbaserte, vil man umiddelbart kunne høste de datasettene med kall hvor denne akkrediterings-IDen oppgis. For datasett som krever samtykkesvar, vil man kunne sjekke status på dette (om svar er avgitt eller ikke), og så fort dette foreligger vil du kunne høste datasettet på samme måte (så lenge samtykket er gyldig og ikke trukket tilbake).

* [Vis liste over alle datasett](/docs/utviklingsguider/data.altinn.no/beviskoder/)
* [Vis liste over alle beviskoder (JSON)](https://api.data.altinn.no/v1/public/metadata/evidencecodes)
* [Vis oversikt over metadata-tjenester](https://data.altinn.no/api-details#api=publicmetadata-prod)

## Teknisk beskrivelse av API

På portalen finner du oppdatert teknisk dokumentasjon om actions, modeller og feilsituasjoner. Du kan også hente ned [Swagger/OpenAPI definisjoner](https://swagger.io/specification/).

Det er to miljøer som er tilgjengelig utenfra- prod og staging. Begge miljøene har et metadata-API, som ikke krever autentisering eller autorisasjon for bruk.

* [Oversikt over eBevis API-er](https://data.altinn.no/apis)

<!--
TODO! Oppdatere postman-repo

## Bruke Postman for testing

Det er utarbeidet en colection med forespørsler i [Postman](https://www.getpostman.com/) som fritt kan lastes ned og benyttes for testing mot eBevis REST API. Se Github-lenken under for mer informasjon.

* [Postman-collection på Github ](https://github.com/Altinn/eBevis)
* [Last ned Postman](https://www.getpostman.com/)
-->