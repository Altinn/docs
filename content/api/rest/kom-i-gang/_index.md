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

Dette gjøres litt ulikt avhengig om du representerer en tjenesteeier eller ikke.

### Er du tjenesteeier i Altinn?
Tjenesteeiere er typisk offentlige etater som er en del av Altinn-samarbeidet. Da bestiller du tilgang fra [tjenesteeier sitt dashboard](https://www.altinndigital.no/oversikt/) på Altinn/digitalisering (krever innlogging).
Her velger du "Support" >> "Ny sak" >> "Bestilling" >> "Tilganger" >> "REST API".
Har du ikke tilgang til dashboard kan du be om dette ved å sende en henvendelse til [tjenesteeier@altinn.no](tjenesteeier@altinn.no).
Er du innleid konsulent må tilganger bestilles av den etaten/kommunen du jobber for.

### Er du ikke tjenesteeier i Altinn?
Hvis du ikke er tjenesteeier, fyller du i stedet ut [denne bestillingen](https://digdir.apps.altinn.no/digdir/be-om-api-nokkel/) og sender inn (krever innlogging i Altinn)

Når vi har registrert informasjonen vil vi sende en API-nøkkel som du må benytte i din applikasjon.

## Autentisering

For å få tilgang til brukerens meldingsboks må du autentisere deg. Altinn API støtter flere ulike autentiseringsmekanismer, og enkelte API-er stiller spesifikke krav til autentisering.

Dersom du trenger tilgang til Altinns REST-api for tjenesteeiere må du bruke virksomhetsautentisering med Maskinporten, virksomhetssertifikat eller en virksomhetsbruker.

{{% children description="true" style="" movetoend="false" %}}


## Du er klar! 

Når du har fullført registrering og autentisering er du klar til å integrere systemet ditt med Altinn. Se menyen til venstre for mer informasjon om ulike API-er, og ta en kikk på [utviklingsguidene](../../../utviklingsguider).

Her er en [Postman collection](https://github.com/Altinn/postman-examples) som inneholder eksempler på REST-operasjonene som ligger under https://altinn.no/api/help og https://altinn.no/api/serviceowner/help.
