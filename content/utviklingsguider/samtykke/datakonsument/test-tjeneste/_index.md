---
title: Test av samtykke
description: Test av samtykketjeneste i Altinn sitt testmiljø
weight: 60
aliases:
 - /guides/samtykke/datakonsument/test-tjeneste/
 - /api/rest/kom-i-gang/tokengenerator/
---

## Introduksjon

Altinns testmiljø (https://tt02.altinn.no) er et miljø som funksjonelt speiler produksjonsmiljøet, men som kan brukes for testing og kun inneholder testdata. Dette skal benyttes for å teste samtykke-implementasjoner, og samtykketokens som fåes fra dette miljøet kan benyttes mot f.eks. Skatteetatens test-API-er.

## Samtykketoken-generator

Altinn tilbyr et verktøy for å generere samtykketokens, som er tilsvarende de som en får ut gitt et gyldig samtykke. Dette kan brukes for å teste endepunkter som validerer samtykketokens, f.eks. hos Skatteetatens testmiljø.

### Hvordan få tilgang?

For å bruke tokengeneratoren trenger du en Maskinporten-integrasjon mot VER2-miljøet av Maskinporten. [Les om hvordan du tar i bruk Maskinporten som konsument](https://samarbeid.digdir.no/maskinporten/konsument/119).

Det må opprettes en klient som er provisjonert med scopet `altinn:testtools/tokengenerator/consent`. Din organisasjon må bli gitt tilgang til dette scopet av Digitaliseringsdirektoratet. Ta kontakt med oss for å få dette:

* Hvis du er tjenesteeier i Altinn (offentlig etat), ta kontakt med tjenesteeier@altinn.no. 
* Hvis du er en privat virksomhet, ta kontakt med sluttbrukersystem@altinn.no. 

Merk at for å få tilgang til tokengeneratoren kreves det at du allerede har blitt [tildelt en API-nøkkel](../).

### Hvordan ta i bruk?

Instruksjoner for bruk er beskrevet i README på https://github.com/Altinn/AltinnTestTools. Access-token fra Maskinporten  oppgis på vanlig måte i en HTTP-header: `Authorization: Bearer <token>`

Merk at verktøyet er open source, og du står fritt til å benytte det selv til egne formål, men for å få ut tokens signert av et Altinn-kontrollert sertifikat (som kreves av Altinns API-er og andre digitale tjenester som krever Altinn samtykke-token) må du benytte endepunktene som er beskrevet i README i repoet. Merk at for tiden er det kun anledning for eksterne å få tilgang til å generere samtykketokens.
