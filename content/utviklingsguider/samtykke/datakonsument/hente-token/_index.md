---
title: Hente token
description: Hvordan veksle inn autorisasjonskode i token
toc: true
weight: 30
aliases:
 - /guides/samtykke/datakonsument/hente-token/
---

{{% notice info %}}
Se også våre [anbefalinger knyttet til verifisering av gitt samtykke]({{< ref "utviklingsguider/samtykke/anbefalinger/verifisering/" >}}).
{{% /notice %}}

## Veksle inn autorisasjonskode i token

Autorisasjonskoden som datakonsument mottar fra Altinn når sluttbruker har samtykket benyttes til å hente token. 

Av hensyn til bakoverkompabilitet støttes det token-uthenting med kun API-nøkkel uten øvrige autentiseringsmekanismer. Dette krever at man oppgir en API-nøkkel som er registrert på
organisasjonsnummer som tilsvarer mottaker (CoveredBy) av samtykke. Leverandører som kan behandle samtykker på vegne av mottaker (HandledBy) kan også hente token med sin egen API-nøkkel uten autentisering, men det kreves da at tjenesteeier har lagt inn leverandøren som godkjent HandledBy i tjenesteeierstyrt rettighetsregister (SRR).

For leverandør-integrasjoner som baserer seg på Maskinporten og delegert tilgang til API-et brukes som regel ikke SRR, og dermed må access token oppgis ved uthenting av token på samme måte som ved opprettelse av samtykkeforespørselen.

Tokenet som returneres vil være en JSON-streng bestående av et Json Web Token (JWT).

For å hente ut token ved hjelp av autorisasjonskode over REST gjør man følgende HTTPS-request til Altinn:
```HTTP
GET /api/authorization/token/{AuthorizationCode} HTTP/1.1
Host: www.altinn.no
ApiKey: {ApiKey}
Accept: application/json
```

<!--
{{% notice info %}}
Altinn vil i 2021 tilby et alternativt endepunkt for utstedelse av tokens, les mer på [anbefalinger knyttet til verifisering av gitte samtykker]({{< ref "utviklingsguider/samtykke/anbefalinger/verifisering/" >}}).
{{% /notice %}}
-->

{AuthorizationCode} og {ApiKey} erstattes med reelle verdier.
Dette gir en respons tilsvarende dette

```markdown
"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9.eyJTZXJ2aWNlQ29kZXMiOi
I0NjI5LDEiLCJBdXRob3JpemF0aW9uQ29kZSI6ImY0NTQ5NDNlLTNiNTctNGI0YS1iYjRjLTNkZjY0YTgwMmQ4NyIsIk9mZmVyZWRCeSI6I
jA2MTE3NzAxNTQ3IiwiQ292ZXJlZEJ5IjoiOTEwNTE0MzE4IiwiRGVsZWdhdGVkRGF0ZSI6IjI3LjEwLjIwMTYgMjE6MTE6MTciLCJWYWxp
ZFRvRGF0ZSI6IjA1LjAxLjIwMTcgMTA6MzA6MDAiLCJpc3MiOiJhbHRpbm4ubm8iLCJleHAiOjE0Nzc1OTU1MTcsIm5iZiI6MTQ3NzU5NTQ
4N30.S9RBNazx2Ml0R93cSEf_LC5YP2UcYtFf7w6JH_OPy_MK1HhVIxA2e-5DQjPV53HmKBhlHmL3Wxz36KzIXddfz1olKLEK7Xqn61FJFL
TCiReKcySRcvDtRhLtFVH8zT-VcaEEXyA9_tTUumUVKTqy9vPMDOYAhmih55uT__Ghs5UQbxDZXLJ08f-SDUq-wlcbU8TFLfBnrQBxF53Sf
L3BvmjYTg_xm69mBRkGuW431fZnMiY_U3Omrd0gHniu8ri33lpEaL3ip1Lq65QC_jVzy2WHN1RdQCA5WiYGJ89GoSZL2eAtCS8d7qngsMUu
zBPpcn4hDiI7MkK4RWrAc2drTw"
```

{{% notice warning %}}
Merk at responsen som standard kommer i form av en JSON-streng, som altså er omsluttet av `"`. Hvis `Accept: application/xml` benyttes, vil tokenet bli omsluttet i en `<string>`-tag.
{{% /notice %}}

Hvis datakilde ønsker å verifisere verdier i tokenet, må det dekodes. Se [her](../../datakilde/bruk-av-token/#bruk-av-self-contained-oauth-token) for eksempel på dekodet token samt informasjon om sertifikat som må benyttes ved dekoding. 

REST-tjenesten returnerer 403 dersom oppgit AuthorizationCode er ugyldig eller API-nøkkelen
ikke har tilgang til angitt autorisasjonskode:

```HTTP
403 The API key is not authorized for this operation, or the supplied authorization code is either expired or invalid.
```

## Hente data fra datakilden ved hjelp av Altinn-signert token 
Når datakonsument har mottatt Altinn-signert token benyttes dette i
request mot datakilden for å få tilgang til data. Formatet på hvordan denne informasjonen
overføres må avtales mellom datakilde og datakonsument, og styres ikke av Altinn.

Token har 30 sekunders varighet og datakonsument må be om nytt token når
det har gått ut (benytt samme autorisasjonskode om igjen).
