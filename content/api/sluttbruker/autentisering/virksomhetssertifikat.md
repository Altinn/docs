---
title: Virksomhetssertifikat
description: "Dersom brukeren skal representere en virksomhet som har et virksomhetssertifikat,
              kan dette benyttes sammen med en virksomhetsbruker opprettet på Altinn.no til å autentisere seg mot Altinns REST-api."
weight: 10
---


For å kunne tilby en autentiseringsmekanisme uten personlig bruker/pin-koder, tilbyr Altinns REST-api støtte for bruk av virksomhetssertifikat.
Autentiseringen gir sikkerhetsnivå 3 og kan brukes mot alle API-ets ressurser på vegne av organisasjonen sertifikatet tilhører
og andre som organisasjonen har rettigheter på vegne av.

Dersom man utvikler en ekstern portalløsning der brukerne er innlogget med f.eks. ID-porten, kan IKKE sertifikatet brukes til å sende inn på vegne av disse.
Virksomhetssertifikatet er en maskin-til-maskin-integrasjon på vegne av innehaverorganisasjon og andre den har rettigheter for, og må ikke forveksles med en mulighet til backend-integrasjon mot Altinn på vegne av brukere på ekstern portal.

### 1. Sette opp virksomhetsbruker
Etter at man har installert sertifikat fra utsteder, må man registrere sertifikatet i Altinn og opprette en såkalt virksomhetsbruker.
Dette er beskrevet [her](https://www.altinn.no/no/Portalhjelp/Innlogging/Virksomhetssertifikat/).

### 2. Tildele roller og rettigheter
Når man logger inn med en virksomhetsbruker første gang, har ikke denne tilstrekkelig med roller og rettigheter for en organisasjon til
å kunne verken se aktive skjema eller sende inn nye før roller/rettigheter har blitt delegert.

### 3. Autentisere seg mot Altinn API
Send følgende POST-request mot APIet med brukernavn/passord for virksomhetsbruker opprettet i 1.

```HTTP
POST https://www.altinn.no/api/authentication/authenticatewithpassword?ForceEIAuthentication HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
ApiKey: myKey
{
    "UserName": "MyUsername",
    "UserPassword": "MyPassword"
}
```


Dersom requesten genereres fra ekstern webside, vil brukeren få beskjed om å velge sertifikat av nettleser (trigges av parameteren `?ForceEIAuthentication`).

Ved programmatisk bruk fra f.eks. Java eller .NET legger man ved sertifikatet i `HttpRequest.ClientCertificates`.  
Eksempelkode ligger [her](https://github.com/Altinn/ec-client-dotnet).

Når man autentiserer seg mot REST-apiet ved hjelp av sertifikat, bruker man hele sertifikatet (eks .p12) - ikke .cer som man eksporterer
for å opprette virksomhetsbruker i portal.
