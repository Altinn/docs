---
title: "REST-forespørsler med autentiserings-cookie"
linktitle: "Autentiserings-cookie"
description: "Hvordan bruke Postman til å sende REST-forespørsler med cookie-basert autorisasjon fra Altinns REST-API innlogging"
toc: false
aliases:
weight: 512
categories: [Kom-i-gang veiledninger]
keywords: [Postman, API, REST]
tags: [REST, Postman]
---

## Forarbeid
I forespørselen som får autentiserings-cookien som svar skal vi bruke Virksomhetssertifikat.
Det er derfor nødvendig å ha importert sertifikatet i Postman slik vist i [Virksomhetssertfikat-leksjonen](/docs/api/rest/kom-i-gang/tutorial-postman/virksomhetssertifikat-postman/).

Man må også ha brukernavn og passord til en virksomhetsbruker for den organisasjonen man representerer.
Etter å ha [opprettet virksomhetsbrukeren](/docs/api/rest/kom-i-gang/virksomhetsbrukere) så må man legge til to nye *environment*-variabler, `altinn-username` og `altinn-password`, med verdiene for denne brukeren.

## Hente autentiserings-cookie fra Altinn
1. Velg `POST /authentication/authenticatewithpassword`-forespørselen fra *Altinn/user/Authentication*-mappen i *Altinn*-collection.
2. I *Params*-panelet:
   * Slå på *ForceEIAuthentication* query-parameteret. 
3. I *Headers*-panelet:
   * Sørg for at *Content-Type* er satt til `application/hal+json` (eller `application/json`).
   * *ApiKey* og *Accept* er ikke nødvendig på denne forespørselen.
4. I *Body*-panelet:
   * Fyll inn brukernavn og passordet til virksomhetsbrukeren i følgende JSON-objekt:
    ```json
    {
        "UserName": "brukernavn her",
        "UserPassword": "passord her"
    }
    ``` 
5. Klikk på *Send*

Hvis svaret man mottar har status `200 OK` så skal svaret ha en spesiell header, kalt *Set-Cookie*.
Se bildet under.

![Set-Cookie header](/docs/images/guides/postman/Postman-set-cookie.png "Set-Cookie header")

Når Postman mottar denne headeren så vil Postman opprette en ny cookie med verdien som den mottok.
Denne cookien har navn *.ASPXAUTH*, og vil bli sendt sammen med fremtidige forespørsler.
Man kan se hvilke cookies som er aktive i Postman ved å klikke på *Cookies* under *Send* knappen.
Se bildet under.

![Manage Cookies](/docs/images/guides/postman/Postman-manage-cookies.png "Manage Cookies")

{{% panel %}}
Hvis man ønsker å bruke andre autentiserings- eller autorisasjonsmekanismer mot Altinns API, enn cookie-basert, så er det viktig å slette *.ASPXAUTH* cookien.
Bruk av flere slike mekanismer samtidig vil ofte føre til feil.
{{% /panel %}}

## Forespørsler med autentiserings-cookie
For å demonstrere *Cookie-basert autorisasjon* mot et endepunkt på Sluttbruker-API, skal vi bruke samme forespørsel som i de tidligere leksjonene.

1. Velg `GET my/profile`-forespørselen fra *Altinn/user/Profile*-mappen i *Altinn*-collection.
2. I *Authorization*-panelet:
   * Sett Type til *No Auth* eller *Inherit auth from parent*.
3. Sjekk at følgende er satt i *Headers*-panelet:
   1. *ApiKey*: `{{ApiKey}}`
   2. *Accept*: `application/hal+json`
4. Klikk på *Cookies* og sjekk at *.ASPXAUTH*-cookien ligger under *TT02*.
5. Klikk på *Send*

Hvis alt har gått bra skal man motta et svar med status `200 OK` som inneholder profilinformasjon til virksomhetsbrukeren.
Merk at denne forespørselen ikke krevde *virksomhetssertifikat* og *?ForceEIAuthentication*-parameter, selv om dette ble brukt til å autorisere *Authentication*-endepunktet for å hente cookien.