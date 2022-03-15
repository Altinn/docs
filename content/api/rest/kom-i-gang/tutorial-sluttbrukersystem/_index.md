---
title: Veiledning API klient
description: "Denne veiledningen vil forklare hvordan man lager en klient som integrerer seg med Altinns REST API.
Klienten vil utføre kall til Altinn Autorisasjon og representerer en enkel tilgangsstyringsklient."
toc: false
aliases:
categories: [Kom-i-gang veiledninger]
keywords: [virksomhetsbruker, autentisering, API, REST, integrasjon, Maskinporten, virksomhetssertifikat, ReporteeID, GitHub] 
tags: [REST, Autorisasjon, Maskinporten, Autentisering, GitHub]
---

Klienten vil gjøre følgende:
1. Hente et OAuth2 bearer token fra Maskinporten.
2. Hente et Altinn autentiseringstoken basert på Maskinporten tokenet.
3. Konvertere et fødselsnummer til et Altinn reportee id
4. Hente rettigheter som en person har for en virksomhet
5. Gi nye rettigheter fra en virksomhet til en person
6. Slette en rettighet en person har for en virksomhet
<!--more-->

Kodeeksemplene og det tilhørende Visual Studio Code prosjektet er skrevet i .Net Core 5 og C#, men innføringen forutsetter ikke kunnskap om .Net og C#.
Du må gjerne sjekke ut [Altinn 2 test apiklient på Github](https://github.com/Altinn/altinn2-test-apiclient).

{{% panel %}}
### Ansvarsfraskrivelse
Koden i testklienten er skrevet for å være forklarende og lett å lese, men den er ikke ment for å brukes uten modifikasjoner i ekte program som behandler sensitive personopplysninger.

For en mer robust API-klient mot Maskinporten laget for .Net Core 5+ kan man bruke [.NET client for Maskinporten APIs](https://github.com/Altinn/altinn-apiclient-maskinporten) som vi også har på Github.
{{% /panel %}}

{{% children description="true" sort="Weight" %}}
