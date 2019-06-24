---
title: Hente token
description: Hvordan veksle inn autorisasjonskode i token
weight: 30
aliases:
 - /guides/samtykke/datakonsument/hente-token/
---


## Veksle inn autorisasjonskode i token

Autorisasjonskoden som datakonsument mottar fra Altinn når sluttbruker har samtykket benyttes til å hente token. Altinn plattformen støtter at man kan veksle inn autorisasjonskoden via
REST med ApiKey. Det krever at man har ApiKey som er registrert på
organisasjonsnummer som enten matcher mottaker av samtykke eller registrert tredjepart som kan behandle samtykker på vegne av mottaker. Bestilling av nye nøkler, eller
oppdatering av eksisterende, gjøres ved henvendelse til [servicedesk@altinn.no](mailto:servicedesk@altinn.no).

Tokenet som returneres vil være en streng bestående av et base64-encodet Json Web Token.

For å hente ut token ved hjelp av autorisasjonskode over REST gjør man GET på

[*https://www.altinn.no/api/authorization/token?authcode={AuthorizationCode}*](https://www.altinn.no/api/authorization/token?authcode=%7bAuthorizationCode%7d)

med header ApiKey: `{apikey}`

Eksempel på response (encoded token):

```markdown
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9.eyJTZXJ2aWNlQ29kZXMiOi
I0NjI5LDEiLCJBdXRob3JpemF0aW9uQ29kZSI6ImY0NTQ5NDNlLTNiNTctNGI0YS1iYjRjLTNkZjY0YTgwMmQ4NyIsIk9mZmVyZWRCeSI6I
jA2MTE3NzAxNTQ3IiwiQ292ZXJlZEJ5IjoiOTEwNTE0MzE4IiwiRGVsZWdhdGVkRGF0ZSI6IjI3LjEwLjIwMTYgMjE6MTE6MTciLCJWYWxp
ZFRvRGF0ZSI6IjA1LjAxLjIwMTcgMTA6MzA6MDAiLCJpc3MiOiJhbHRpbm4ubm8iLCJleHAiOjE0Nzc1OTU1MTcsIm5iZiI6MTQ3NzU5NTQ
4N30.S9RBNazx2Ml0R93cSEf_LC5YP2UcYtFf7w6JH_OPy_MK1HhVIxA2e-5DQjPV53HmKBhlHmL3Wxz36KzIXddfz1olKLEK7Xqn61FJFL
TCiReKcySRcvDtRhLtFVH8zT-VcaEEXyA9_tTUumUVKTqy9vPMDOYAhmih55uT__Ghs5UQbxDZXLJ08f-SDUq-wlcbU8TFLfBnrQBxF53Sf
L3BvmjYTg_xm69mBRkGuW431fZnMiY_U3Omrd0gHniu8ri33lpEaL3ip1Lq65QC_jVzy2WHN1RdQCA5WiYGJ89GoSZL2eAtCS8d7qngsMUu
zBPpcn4hDiI7MkK4RWrAc2drTw
```
Hvis datakilde ønsker å verifisere hvilken verdi som ligger i "offeredBy" (fødsels- eller organisasjonsnummer til den som har gitt samtykke) så må token decodes. Se [her](../../datakilde/bruk-av-token/#bruk-av-self-contained-oauth-token) for eksempel på decoded token samt informasjon om sertifikat som må benyttes ved decoding. 

REST-tjenesten returnerer 403 dersom authcode er ugyldig eller Apikeyen
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
