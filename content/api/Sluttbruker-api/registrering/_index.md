---
title: Registrering
description: Hvordan registrere din applikasjon.
weight: 1
---

### Registrer din applikasjon hos Altinn

For at vi skal kunne stoppe misbruk og feilbruk må du registrere deg for å kunne bruke Altinn API-et.

Før du skal bruke APIet må du ta stilling til hvilke ressurser i APIet du skal benytte og på hvilken måte (Read=lesetilgang, Write=skrivetilgang).
API-nøkkelen du blir tildelt vil kun være gyldig for de ressursene du har bedt om tilgang til.

 - **Read på Message** gir tilgang til å hente meldinger og skjema. Write gir tilgang til å sende inn skjema, samt slette meldinger og skjema.
 - **Read på Profile** gir tilgang til å hente brukerens Navn, adresse og kontaktinformasjon, samt kontaktinformasjon for virksomheter brukeren kan representere
 - **Read på Organizations** gir tilgang til å hente ut virksomhetene pålogget bruker kan representere.
 - **Read på Reportee** gir tilgang til å hente ut alle avgivere (privatpersoner og virksomheter) pålogget bruker kan representere.
 - **Read på Lookup** gir tilgang til å aksessere eksponerte innsynstjenester i REST API.
 - **Read/Write på Authorization** gir tilgang til å se på eller endre delegerte roller og rettigheter på vegne av innlogget bruker eller virksomheter som brukere kan representere. 

Send følgende to skjemaer ferdig utfylt i en e-post til [api@altinn.no](mailto:api@altinn.no)

1. [Bestillingsskjema](https://altinnett.brreg.no/PageFiles/11047/Bestillingskjema_API_v2.doc)
2. [Egenerklæringsskjema](https://altinnett.brreg.no/Global/Altinn%20API/Egenerkl%c3%a6ring-API_v2.doc)

Når vi har registrert informasjonen vil vi sende en API-nøkkel som du må benytte i din applikasjon.
