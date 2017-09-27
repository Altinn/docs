---
title: Samtykke
description: Altinns REST-funksjonalitet for samtykke
weight: 20
---

En mer utfyllende beskrivelse av samtykke kommer etter hvert under [Guider](/docs/guides/).

### Utveksle authorization code '{authcode}' i Json Web Token
Denne ressursen krever ikke noen sesjon i Altinn, men apikey og authcode må være utstedt til samme organisasjonsnummer. 
Authorization code er en guid som sendes med som URL-parameter når brukeren returnerer til nettsiden der man ba om samtykke.

```HTTP
GET https://www.altinn.no/api/authorization/token?authCode={authCode}
ApiKey: myKey
Accept: application/hal+json
```

Eksempelrespons:
```STRING
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9.eyJTZXJ2aWNlQ29kZXMiOiI0NjI5LDEiLCJBdX
Rob3JpemF0aW9uQ29kZSI6IjQ2N2M3MGRhLWY3MDMtNGM5My1hODY0LTYwNDVkMzNjNWEwYSIsIk9mZmVyZWRCeSI6IjA2MTE3NzAxNTQ3Iiw
iQ292ZXJlZEJ5IjoiOTEwNTE0NDU4IiwiRGVsZWdhdGVkRGF0ZSI6IjI0LjExLjIwMTYgMTM6MjM6NTYiLCJWYWxpZFRvRGF0ZSI6IjA1LjAxLjIwMTcg
MTA6MzA6MDAiLCJpc3MiOiJhbHRpbm4ubm8iLCJleHAiOjE0Nzk5OTAzMTYsIm5iZiI6MTQ3OTk5MDI4Nn0.OygB9BmEzo2WPF3qUYUcAka0Nm339VW
f94MAGPZ8u1bjNAaDAs2dsw0qruA-BJuPxeuHtASmyuBTTdCPGV_tL17LlmcMvlJ1lS1-CWjuw6a_dHlMCFx8oI3Vsu1gahlFxoCNQNUIuYD5ZLYZa8wwmD
OpI2kwlZcz5tiLkOr6L0Sw3HPzlYS8wF03yPngYysf82OemqMa9OFXoHgKNszA756fqGzg5wHm9qOTUYVCf3I89CAfOUIv8D2YBiNGA5wgAeYW3YetatHiK
SrvRqh9_D7Q2XHIYA397tiSYKeqq0KPNpIAXYBqkLNkg6216tdzRMNMpQK7208BfPRkzG45hg
```

Les mer om json web tokens [her](https://jwt.io). 

### Logge at samtykke er brukt til å hente data (kommer k4 2017)
Denne operasjonen kalles etter man har hentet data fra datakilde ved hjelp av samtykke. Dersom samtykket er definert som "engangs" vil samtykkedelegeringen bli slettet i Altinn.
Informasjonen fra loggeoperasjonen blir synlig for brukeren på altinn.no.


```HTTP
GET 
ApiKey: myKey
Accept: application/hal+json
```

Eksempelrespons:
```JSON
```
