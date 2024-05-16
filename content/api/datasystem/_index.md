---
title: API for datasystem
description: Altinn har helt siden oppstarten jobbet for å gjøre Altinn-tjenestene tilgjengelige for ekstern programvare. Ekstern programvare vil si datasystemer/sluttbrukersystemer som brukes av næringslivet, for eksempel regnskaps- eller lønnssystemer. Ønsker du å integrere et datasystem mot tjenester i Altinn har du oppskriften på det her.
weight: 700
---

{{% panel %}}
#### Modernisering av Altinn
Altinn skal moderniseres for å sikre brukervennlige, sikre og kostnadseffektive tjenester til innbyggere og næringsliv.

*Det betyr at mange av dagens API i Altinn 2 innen juni 2025 vil erstattes av nye tjenester.
Før du tar i bruk dagens Altinn 2 API bør du undersøke hvilke konsekvenser moderniseringsløpet har for deg.*

Les mer om dette på samarbeidsportalen under [Modernisering av Altinn](https://samarbeid.digdir.no/eformidling/modernisering-av-altinn/1799)
{{% /panel %}}

{{% panel theme="warning" %}} **Er det noe du lurer på?**  
Se først om du finner svaret på vår [FAQ-side](/docs/api/datasystem/faq_datasystem). Hvis ikke du finner svar der kan du sende spørsmålet til sluttbrukersystem@altinn.no{{% /panel %}}

Slik går du frem for å integrere et datasystem mot tjenester i Altinn: 

1. **Registrere datasystem og signere egenerklæring**<br>For å ivareta sikkerheten i Altinn trenger du å registrere systemet hos oss, samt fylle ut en egenerklæring, før du går i gang. Send en e-post til sluttbrukersystem@altinn.no med navn på datasystemet i emnefeltet, og skriv at du ønsker å registrere et nytt datasystem. I tillegg kan du laste ned dokumentene under, fylle ut og legge ved disse i samme e-post. <br><br>Vi fikser registreringen for deg så kjapt som mulig og gir deg beskjed når det er gjort. <br>[Bestilling - nytt datasystem](https://www.altinndigital.no/contentassets/80fbef9b10314955a0aa90802e321edc/1.05-bestilling---nytt-sluttbrukersystem.doc) <br>[Egenerklæring datasystem](https://www.altinndigital.no/contentassets/80fbef9b10314955a0aa90802e321edc/1.05b-sluttbrukersystemerklaring-signering-preutfylling.doc) <br>Se eksempel på utfylt egenerklæringsskjema (Lenke kommer...)
2. **Integrasjon via SOAP eller REST**<br>De fleste av Altinns tjenester er tilgjengelig via SOAP. Foreløpig er det kun få tjenester som er tilgjengelig via REST API. For å lage selve integrasjonen mot tjenester via SOAP kan du lese om hvordan det gjøres i [dokumentasjon for SOAP](/docs/api/soap/). Skal du integrere tjenester via REST kan du lese det i [dokumentasjon for REST](/docs/api/rest/). Legg merke til at du trenger en API nøkkel fra altinn for å få tilgang til REST-api. Dette bestilles [her (krever innlogging)](https://digdir.apps.altinn.no/digdir/be-om-api-nokkel/)
3. **Implementering**<br>Før du kobler systemet på tjenestene i Altinn trenger du å implementere innlogging og koble deg opp mot Altinns grensesnitt. <br><br>**Implementering av autentiserings- og autoriseringsmekanismer**<br> Det finnes flere måter å håndtere autentisering (innlogging) og autorisering (styring av tilgang) av datasystemer på. For SOAP kan dette være brukernavn og passord eller bruk av [virksomhetssertifikater](https://www.altinn.no/hjelp/profil/avanserte-innstillinger/hva-er-virksomhetssertifikat/), mens REST støtter [flere ulike autentiseringsmekanismer](https://altinn.github.io/docs/api/rest/kom-i-gang/#autentisering). <br><br>**Oppsett mot Altinns grensesnitt**<br> Før du kobler deg på tjenestene i Altinn trenger du å sette opp integrasjon mot Altinns grensesnitt, se [dokumentasjon for SOAP](/docs/api/soap/).
4. **Koble systemet ditt på tjenestene**<br>Se hvilke [tjenester som er tilgjengelig for eksterne systemer og få veiledning til hvordan du kobler systemet til tjenestene](https://www.altinndigital.no/datasystemer).
5. **Teste tjenestene**<br>Test av tjenestene gjøres i Altinn sitt testmiljø. Du må teste mot de tjenestene du har valgt å utarbeide en løsning for. Det benyttes fiktive testpersoner og organisasjoner i våre testmiljø. Du kan bestille testbrukere ved å sende en henvendelse til sluttbrukersystem@altinn.no.
6. **For at brukerne skal kunne ta i bruk systemet ditt**<br>Husk å sikre deg at du har registrert systemet ditt slik at det blir tilgjengelig for brukerne som beskrevet i trinn 1. Det første brukerne dine må gjøre når de skal ta i bruk systemet ditt er å gå inn på altinn.no, velge Profil og Avanserte innstillinger hvor de under Datasystem kan velge systemet ditt.
