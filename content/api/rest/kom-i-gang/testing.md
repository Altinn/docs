---
title: Testing av API
description: Informasjon om hvordan du kan teste REST-integrasjoner mot Altinn
weight: 40
toc: true
hidden: true
---

{{% expiring-notice 2021-12-31 %}}
Tokengeneratoren er foreløpig ikke tilgjengelig utover muligheten for å generere samtykketokens for banker/leverandører knyttet til SBL/DSOP/ODN. Ta kontakt med BITS for å få tilgang til dette.
{{% /expiring-notice %}}


## Introduksjon

Altinns testmiljø (https://tt02.altinn.no) er et miljø som funksjonelt speiler produksjonsmiljøet, men som kan brukes for testing og kun inneholder testdata. TT02-miljøet er også et pre-produksjonsmiljø, som inneholder endringer og funksjonalitet før det produksjonssettes. Se [release-oversikten](../../../../ny-funksjonalitet/prodsetting/) for mer informasjon om våre produksjonssettinger.

TT02 er tilgjengelig for alle som ønsker å teste integrasjoner. Siden dette er et helt frittstående miljø, kreves det egne API-nøkler og krever også tokens utstedt fra ID-portens/Maskinportens VER2-miljø. Virksomhetssertifikater som benyttes mot disse miljøene må være utstedt av Buypass eller Commfides sine test-CA-er.

## Token-generator

### Altinn-tokens (berikede Maskinporten- eller ID-porten-tokens)

Det er mulig å generere tokens med vilkårlige claims (innhold) som kan brukes mot Altinns TT02-miljø. På denne måten kan du enkelt generere token tilsvarende ID-porten og Maskinporten-token vekslet i Altinns Token Exchange-endepunkt, som da kan brukes for å agere en person, virksomhet eller virksomhetsbruker mot alle Altinns REST-API-er. 

Merk atdisse tokene kan ikke brukes mot endepunkter som krever vanlig Maskinporten-token. Se [PortenTokenGenerator](https://github.com/Altinn/MaskinportenTokenGenerator) for et verktøy som kan brukes for å automatisere uthenting av tokens fra Maskinporten.

### Samtykketokens

I tillegg kan dette verktøyet generere samtykketokens, som kan brukes for å generere tokens tilsvarende de som en får ut gitt et gyldig samtykke. Dette kan brukes for å teste endepunkter som validerer samtykketokens, f.eks. hos Skatteetatens testmiljø.

### Hvordan få tilgang?

For å bruke tokengeneratoren trenger du en Maskinporten-integrasjon mot VER2-miljøet av Maskinporten. [Les om hvordan du tar i bruk Maskinporten som konsument](https://samarbeid.digdir.no/maskinporten/konsument/119).

Det må opprettes en klient som er provisjonert med et eller flere av scopene som regulerer tilgang. Din organisasjon må bli gitt tilgang til dette scopet av Digitaliseringsdirektoratet. Ta kontakt med oss for å få dette:

* Hvis du er tjenesteeier i Altinn (offentlig etat), ta kontakt med tjenesteeier@altinn.no. 
* Hvis du er en privat virksomhet, ta kontakt med sluttbrukersystem@altinn.no. 

Scopene som er definert er som følger:

| Scope | Forklaring
|-------|-----------
| `altinn:testtools/tokengenerator/personal`  | Gir tilgang til å lage tokens for vilkårlige testpersoner (tilsvarende et vekslet ID-porten-token) |
| `altinn:testtools/tokengenerator/enterprise` | Gir tilgang til å lage tokens for vilkårlige organisasjoner (tilsvarende et vekslet Maskinporten-token) |
| `altinn:testtools/tokengenerator/enterpriseuser` | Gir tilgang til å lage tokens for vilkårlige virksomhetsbrukere (tilsvarende et vekslet Maskinporten-token beriket med virksomhetsbruker-informasjon) |
| `altinn:testtools/tokengenerator/consenttoken` | Gir tilgang til å opprette vilkårlige samtykketokens |

Merk at for å få tilgang til tokengeneratoren kreves det at du allerede har blitt [tildelt en API-nøkkel](../).

### Hvordan ta i bruk?

Instruksjoner for bruk er beskrevet i README på https://github.com/Altinn/AltinnTestTools. Access-token fra Maskinporten  oppgis på vanlig måte i en HTTP-header: `Authorization: Bearer <token>`

Merk at verktøyet er open source, og du står fritt til å benytte det selv til egne formål, men for å få ut tokens signert av et Altinn-kontrollert sertifikat (som kreves av Altinns API-er og andre digitale tjenester som krever Altinn samtykke-token) må du benytte endepunktene som er beskrevet i README i repoet.

## Tenor test-data

Altinn har et rikt testdatasett, som også inneholder felles syntetiske testdata som også er tilgjengelig hos andre tjenesteleverandærer i offentlig sektor. Les mer om [Tenor](https://www.digdir.no/digitale-felleslosninger/tenor-testdatasok/1284)

{{% expiring-notice 2021-12-31 %}}
Tilgjengeliggjøring av syntetisk folkeregister og Enhetsregisteret i Altinn, ID-porten og Maskinporten er under arbeid og vil ferdigstilles i løpet av 2021. Hvorvidt testdata eksisterer hos andre offentlige tjenesteleverandører vil variere.
{{% /expiring-notice %}}
