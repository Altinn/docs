---
title: Test av samtykke
description: Test av samtykketjeneste i Altinn sitt testmiljø
weight: 60
aliases:
 - /guides/samtykke/datakonsument/test-tjeneste/
---

Tjenesten må testes ut i Altinn sitt testmiljø TT02: [https://tt02.altinn.no](https://tt02.altinn.no)  
Før man kan teste må punktene under [komme i gang](../komme-i-gang/) være på plass.

## Teste samtykkesiden 
For å få brukt tjenesten og for å få opp samtykkesiden i Altinn kan man
benytte URL nedenfor. (Dette er også bare et eksempel så den må
tilpasses til den tjenesten, organisasjonen osv. som er aktuell for deres test.)

```markdown
https://tt02.altinn.no/ui/AccessConsent/?Resources=4629_2.4630_2&CoveredBy=910514458&RedirectUrl=https://www.altinn.no&ValidToDate=2019-09-30%2010:30:00&LanguageCode=nb-NO&DelegationContext=Ved%20%C3%A5%20samtykke,%20gir%20du%20Skatteetaten%20rett%20til%20%C3%A5%20utlevere%20opplysninger%20om%20deg%20direkte%20til%20Banken%20AS.%20Banken%20f%C3%A5r%20opplysningene%20for%20%C3%A5%20behandle%20s%C3%B8knaden%20din%20om%20finansiering.&ResponseType=code&4629_2_inntektsaar=2016&4630_2_fraOgMed=2017-06&4630_2_tilOgMed=2017-08
```

Nærmere beskrivelse av parametre i url finner [her](../be-om-samtykke/#url).

URL fører sluttbruker til innloggingen til ID-Porten. Man må ha tilgang til en fiktiv testbruker for å logge inn.

Når man har fått opp samtykkesiden og gitt samtykke vil testbruker
sendes tilbake til siden som er angitt i RedirectUrl. I denne url vil det sendes med autorisasjonskode og status.

Eksempel på url hvor status er OK:

```markdown
https://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK
```

Eksempel på url hvor sluttbruker har valgt å trykke på knappen for «Nei, jeg vil ikke gi samtykke»:

```markdown
https://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent
```

Autorisasjonskoden benyttes til å hente token signert av Altinn.
Se [Informasjon om token](../../datakilde/bruk-av-token/#bruk-av-self-contained-oauth-token).

### Teste å veksle inn autorisasjonskode i token
Altinn plattformen støtter at man kan veksle inn autorisasjonskoden via
REST med ApiKey. Det krever at man har ApiKey som er registrert på mottaker av samtykke eller tredjepart som kan behandle samtykker på vegne av mottaker.
En eventuell tredjepart må være registrert i tjenesteeierstyrt rettighetsregister (SRR).
Ingen annen form for autentisering er nødvendig. Som nevnt gjøres bestilling av nye
nøkler, eller oppdatering av eksisterende, ved henvendelse til
[servicedesk@altinn.no](mailto:servicedesk@altinn.no).

Tokenet som returneres vil være en streng bestående av et base64-encodet Json Web Token.

For å hente ut token ved hjelp av autorisasjonskode over REST gjør man
`GET` på [https://tt02.altinn.no/api/authorization/token?authcode={AuthorizationCode}](https://tt02.altinn.basefarm.net/api/authorization/token?authcode=%7bAuthorizationCode%7d)
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

Se [her](../../datakilde/bruk-av-token/#decoded-eksempel-1) for eksempel på decoded token.

REST-tjenesten returnerer `403` dersom authcode er ugyldig eller Apikeyen
ikke har tilgang til angitt autorisasjonskode:

```markdown
403 The API key is not authorized for this operation, or the supplied authorization code is either expired or invalid.
```

Man kan laste ned Postman for å teste henting av token: https://www.getpostman.com/apps

{{<figure src="hente-token.png" title="Hente token ved hjelp av Postman" >}}


Når man har mottatt Altinn-signert token benyttes dette i request mot
datakilden for å få tilgang til data. Formatet på hvordan denne informasjonen overføres må
avtales mellom datakilde og datakonsument, og styres ikke av Altinn.

Token har 30 sekunders varighet og datakonsument må be om nytt token når
det har gått ut (benytt samme autorisasjonskode om igjen).
