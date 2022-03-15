---
title: Nødvendig forarbeid
description: "Informasjon som er nødvendig for at klienten skal kunne autentisere seg og bruke Maskinportens og Altinns API."
toc: false
aliases:
weight: 1
categories: [Kom-i-gang veiledninger]
keywords: [virksomhetsbruker, autorisasjon, API, REST, integrasjon, Maskinporten, delegering, API-nøkkel, forarbeid, virksomhetssertifikat]
tags: [REST]
---

Følgende informasjon er nødvendig for å lage klienten, og bør skaffes før man kan teste klienten mot Maskinporten og Altinn:
1. Virksomhetssertifikat fra Buypass eller Commfides
2. Klient ID fra Maskinporten
3. API-nøkkel fra Altinn
4. Innlest virksomhet og testbrukere i Altinns testmiljø
5. Opprette virksomhetsbruker og gi den rettigheter

### Virksomhetssertifikat
For at klienten skal kunne autentisere seg mot Maskinporten og Altinn må man ha installert et virksomhetssertifkat fra Buypass eller Commfides.
Dette er digital sertifikater som bruker X.509 standarden.
De kan brukes til flere formål som autentisering, kryptering og signering, men for denne klienten er det autentisering som er formålet.

I det tilhørende kodeeksempelet forventer koden å finne et installert sertifikat under `LocalMachine\My`.
Fingeravtrykket er referansen til ditt sertifikat som må brukes når du kjører klient.
Man kan verifisere at sertifikatet er installert riktig og finne fingeravtrykket ved å kjøre PowerShell kommandoen under:

```terminal
PS C:\> dir Cert:\LocalMachine\My

   PSParentPath: Microsoft.PowerShell.Security\Certificate::LocalMachine\My

Thumbprint                  Subject        EnhancedKeyUsageList
----------                  -------        --------------------
84EB6237845CAA494AB3249..   CN=...         Client Authentication, ..
...
```

Se også [Sluttbrukerhjelp for virksomhetssertifikat](https://www.altinn.no/hjelp/innlogging/alternativ-innlogging-i-altinn/virksomhetssertifikat/).

### Klient ID fra Maskinporten
For å skaffe en Klient ID fra Maskinporten må du følge denne [Guide for API-konsumenter](https://docs.digdir.no/maskinporten_guide_apikonsument).
Klient ID er resultatet av å gjennomføre steget [Registrere klient som bruker virksomhetssertifikat](https://docs.digdir.no/maskinporten_guide_apikonsument#registrere-klient-som-bruker-virksomhetssertifikat).

### API-nøkkel fra Altinn
Se [hvordan registrere ditt system og få API-nøkkel for ikke-tjenesteeiere](https://altinn.github.io/docs/api/rest/kom-i-gang/#er-du-ikke-tjenesteeier-i-altinn).

### Testbrukere og virksomhet i TT02
Hvis dere ikke allerede har testbrukere og organisasjoner i TT02, så kan dette bestilles ved å sende en mail til servicedesk@altinn.no.
Merk at organisasjonen må ha samme organisasjonsnummer som virksomhetssertifkatet.

### Opprette og autorisere virksomhetsbruker
Dette steget krever at virksomheten er opprettet i TT02.
Se [hvordan opprette virksomhetsbruker i portal](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhetsbrukere/#opprette-virksomhetsbruker-i-portal).

Etter at virksomhetsbrukeren er laget må den gis tilstrekkelige tilganger.
Logg inn med daglig leder for organisasjonen og gi virksomhetsbrukeren *Hovedadministrator*.
