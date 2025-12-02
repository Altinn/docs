---
title: Kom i gang med REST API
linktitle: Kom i gang
description: Selv om tilgang til Altinns REST API er åpent, må du registrere din applikasjon og autentisere deg. Dette for at vi skal kunne stoppe misbruk og feilbruk. 
weight: 1
aliases:
- /api/rest-api/kom-i-gang/
categories: [Kom-i-gang veiledninger]
keywords: [forarbeid, autentisering, API-nøkkel]
tags: [REST]
---

## Registrer ditt system og få API-nøkkel

Dette gjøres litt ulikt avhengig av om du er tjenesteeier i Altinn eller ikke. Husk å presisere i skjemaet om du er tjenesteeier eller ikke (eget avkrysningsvalg).

### Er du tjenesteeier i Altinn?
Tjenesteeiere er typisk offentlige etater som er en del av Altinn-samarbeidet. Som tjenesteeier legger du inn bestillingen via skjema på [Samarbeidsportalen](https://samarbeid.digdir.no/) (krever innlogging).
Når du er innlogget, gå til Saker og deretter:

Velg “Ny sak” >> “Altinn” >> “Bestille” >> “Tilganger” >> “REST API” >> Gå til skjema.

### Er du ikke tjenesteeier i Altinn?
Hvis du ikke er tjenesteeier, benytter du samme skjema og fremgangsmåte i Samarbeidsportalen (krever innlogging). Velg alternativet for at du ikke er tjenesteeier i skjemaet.

Når vi har registrert informasjonen vil vi sende deg en API-nøkkel som skal brukes i applikasjonen din.

## Autentisering

For å få tilgang til brukerens meldingsboks må du autentisere deg. Altinn API støtter flere ulike autentiseringsmekanismer, og enkelte API-er stiller spesifikke krav til autentisering.

Dersom du trenger tilgang til Altinns REST-api for tjenesteeiere må du bruke virksomhetsautentisering med Maskinporten, virksomhetssertifikat eller en virksomhetsbruker.

## Du er klar! 

Når du har fullført registrering og autentisering er du klar til å integrere systemet ditt med Altinn. Se menyen til venstre for mer informasjon om ulike API-er, og ta en kikk på [utviklingsguidene](../../../utviklingsguider).

Her er en [Postman collection](https://github.com/Altinn/postman-examples) som inneholder eksempler på REST-operasjonene som ligger under https://altinn.no/api/help og https://altinn.no/api/serviceowner/help.


{{<children description="true" style="" movetoend="false" />}}
