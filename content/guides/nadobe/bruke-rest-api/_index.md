---
title: Bruke gjennom REST-API
weight: 30
---

{{% notice info %}}
Dette er dokumentasjon under arbeid for NADOBE-tjenesten som per i dag ikke er produksjonssatt
{{% /notice %}}

## Innledning

HTTP REST-APIet kan benyttes av alle konsumenter som et alternativ til PEPPOL. Integrasjon mot REST krever ingen spesiell programvare eller infrastruktur, men forutsetter at det benyttes et virksomhetssertifikat for autentisering.

## Protokoll og formater

REST-APIet bygger på HTTP, og tilkoblinger sikres ved hjelp av TLS 1.1 kryptering. Dataene formateres i JSON.

## Versjonering

API-et har et versjonsprefiks som en del av URL-en. Gjeldende versjon er "v1", og eventuelt nye versjoner vil få "v2", "v3" etc. NADOBE vil så langt det lar seg gjøre unngå å introdusere nye versjoner, men for å sikre bakoverkompabilitet med alle konsumenter vil nødvendig forbedring og utvidelse av funksjonalitet kunne medføre at en ny versjon må introduseres.

Nye uavhengige actions og modeller vil kunne bli lagt til en eksisterende versjon, men ingen endringer (selv ikke rent additive) vil bli gjort på eksisterende actions og modeller i en gitt versjon.

Gamle versjoner vil bli støttet i minst XX måneder etter at en ny versjon tilgjengeliggjøres, og alle registrerte brukere i NADOBE-API-et vil bli underrettet i god til før utfasing av gamle versjoner finner sted for å sikre at alle får migrert til ny versjon.

Mer informasjon om versjoner, endringslogg og planlagte utfasinger finnes i API-portalen.

* [Gå til NADOBE API Portal](https://apim-nadobe.portal.azure-api.net/)

### Beviskoder

Datafeltene (navn, antall og verdityper) i beviskoder er å regne som ikke-muterbare, men beviskoder vil kunne endre påkrevd tilgangsnivå når som helst. Ved behov for nye datafelter i en gitt beviskode, vil en ny uavhengig beviskode introduseres.

Gamle beviskoder vil kunne utfases i takt med tilgjengeligheten av dataene i de underliggende registrene. Disse er eksterne for NADOBE, og følgelig utenfor vår kontroll - men så langt det lar seg gjøre vil beviskoder på samme måte som versjoner i API-et bli støttet i minst XX måneder før disse fases ut.

* [Vis liste over alle beviskoder (JSON)](https://apim-nadobe.azure-api.net/nadobe/v1/metadata/evidencecodes)

### Feil- og statuskoder

Feil- og statuskoder som beskrevet i metadata-API-et vil ikke kunne endres eller fjernes uten at ny versjon av API-et introduseres, men nye feil- og statuskoder vil kunne bli lagt til i en eksisterende versjon.

* [Vis liste over alle statuskoder (JSON)](https://apim-nadobe.azure-api.net/nadobe/v1/metadata/statuscodes)
* [Vis liste over alle feilkoder (JSON)](https://apim-nadobe.azure-api.net/nadobe/v1/metadata/errorcodes)

## Autentisering og autorisasjon

For å autentisere seg mot NADOBE REST-API trenger man et virksomhetssertifikat utstedt av en offentlig godkjent aktør. Begge tilbyr både produksjons- og test-sertifikater som kreves for bruk mot de respektive miljøene.

Dette sertifikatet må benyttes gjennom standard klientsertifikat autentisering, noe de fleste HTTP-klienter støtter.

Autorisasjon foregår gjennom registrering av en konto og bruk av API-nøkler. Organisasjonsnummeret oppgitt i virksomhetssertifikatet blir videre sjekket om er en offentlig virksomhet.

* [Les om virksomhetssertifikat fra Buypass](https://www.buypass.no/produkter-og-tjenester/virksomhetssertifikat)
* [Les om virksomhetssertifikat fra Commfides](https://www.commfides.com/commfides-virksomhetssertifikat/)
* [Les om bruk av klientsertifkat i Postman](https://www.getpostman.com/docs/v6/postman/sending_api_requests/certificates)

## Hvordan komme i gang med REST-API

Alle brukere av NADOBE må registrere en profil i [NADOBE API Portal](https://apim-nadobe.portal.azure-api.net/), hvor man kan registrere applikasjoner og få utdelt API-nøkler som må oppgis i alle requests til NADOBE. Kontaktopplysningene du oppgi vil bli benyttet for å sende informasjon om planlagte endringer og nedetid samt annen driftsrelatert informasjon. På profilsiden vil man også kunne hente ut detaljert bruksstatistikk.

* [Gå til NADOBE API Portal](https://apim-nadobe.portal.azure-api.net/)

## Hvordan innhente opplysninger om en virksomhet

For å hente ut informasjon, må man først sende en _autorisasjonsforespørsel_ til REST-APIet, som inneholder informasjon om hvilken virksomhet man spør om og hvilke beviskoder det gjelder. Hvis forespørselen blir autorisert, vil man som svar få en _akkrediterings-ID_ som representerer bevisforespørselen. For bevis som er åpne eller hjemmelsbaserte, vil ,am umiddelbart kunne høste disse bevisene med kall hvor denne akkrediterings-IDen oppgis. For bevis som krever samtykkesvar, vil man kunne sjekke status på dette (om svar er avgitt eller ikke), og så fort dette foreligger vil du kunne høste beviset på samme måte (så lenge samtykket er gyldig og ikke trukket tilbake).

* [Vis liste over alle beviskoder (JSON)](https://apim-nadobe.azure-api.net/nadobe/v1/metadata/evidencecodes)
* [Vis oversikt over metadata-tjenester](https://apim-nadobe.portal.azure-api.net/docs/services/5aa91ea0b10fe31114e260e1/operations/5aa91f0db10fe31114e260e2)

## Teknisk beskrivelse av API

På portalen finner du oppdatert teknisk dokumentasjon om actions, modeller og feilsituasjoner. Du kan også hente ned [Swagger/OpenAPI definisjoner](https://swagger.io/specification/).

Det er to miljøer - production og staging. Begge miljøene har et metadata-API, som ikke krever autentisering eller autorisasjon for bruk.

* [Oversikt over NADOBE API-er](https://apim-nadobe.portal.azure-api.net/docs/services/)

