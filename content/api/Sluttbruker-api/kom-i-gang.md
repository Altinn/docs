---
title: Kom i gang!
description: Denne guiden vil hjelpe deg med å komme igang med bruk av Altinns REST API.
weight: 10
---

Denne guiden vil hjelpe deg med å komme igang med bruk av Altinns REST API.

### Registrer din løsning
Tilgang til å bruke Altinn API er i utgangspunktet åpent, men for at vi skal kunne hindre misbruk og feilbruk krever vi at alle som ønsker tilgang,
registrerer sin løsning. Informasjon om registrering finner du **[her](../registrering/)**.

### Autentisering med ID-porten
Selv om tilgang til Altinn API er åpent, kreves det at brukeren autentiserer seg for at tilgangen til innholdet i brukerens meldingsboks skal gis.
Informasjon om hvordan autentisering av brukerne kan utføres i en applikasjon og informasjon om føderering av brukere
finner du **[her](../autentisering/)**.
For å teste APIet i en nettleser kan du logge inn i Altinn på vanlig måte.

### Respons formater
Alle kall som brukes for å hente ut informasjon fra Altinn API bruker GET-metoden i HTTP. Formatet som returneres bestemmes av HTTP-headeren `Accept`.

Følgende kall returnerer innhold fra brukerens meldingsboks i JSON-format.
```HTTP
GET https://www.altinn.no/api/my/messages HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Mens følgende kall returnerer innhold på XML-format:
```HTTP
GET https://www.altinn.no/api/my/messages HTTP/1.1
Host: www.altinn.no
Accept: application/hal+xml
ApiKey: myKey
```
 
### Detaljert teknisk hjelpeside og testklient
Altinn API har egne selvdokumenterene hjelpesider (på engelsk) som du finner på https://www.altinn.no/api/help/.
Disse hjelpesidene inneholder detaljert teknisk informasjon om de ulike modellene som eksponeres og aksjonene som er mulig å utføre.
Hjelpesidene inneholder også en testklient som kan benyttes til å utføre spørringer direkte mot Altinn API fra din nettleser (krever at du er pålogget Altinn).

### Feilbehandling og utilgjengelighet
Informasjon kommer.

- Feil ved for lavt sikkerhetsnivå
- Feil ved autorisasjon
