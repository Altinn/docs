---
draft: false
title: Melding
description: "Er en tjeneste som lar tjenesteeier sende informasjon i form av en melding som brukerne kan lese i Altinn-portalen eller laste ned til sitt datasystem."
aliases:
menu:
  main:
    identifier: correspondence
    name: Melding
    parent: dialog

weight: 100
---

Er en tjeneste som lar tjenesteeier sende informasjon i form av en melding som brukerne kan lese i Altinn-portalen eller laste ned til sitt datasystem.
Meldingen kan også leses på etatens eget nettsted ved hjelp av Altinn sitt REST-API.
Det er støtte i Altinn for at meldinger til privatpersoner kan videresendes til Digital postkasse for innbygger istedenfor eller i tillegg til at den legges i Altinn.
Det kan sendes varsel på e-post og/eller sms til sluttbruker om at informasjon er gjort tilgjengelig.

### Fordeler og muligheter
Hvilke muligheter gir den

Meldinger kan typisk være brev, vedtak, kvitteringer eller annen informasjon tjenesteeier ønsker å formidle til sine sluttbrukere.
Meldingene støtter HTML og vedlegg og en melding kan:

 - Være HTML basert (formatert visning i nettleser)
 - Være XML basert med referanse til tilhørende visningsskjema (sende inn skjemadata som rendres med et InfoPath-skjema)
 - Inneholde et eller flere binære vedlegg
 - Være en kombinasjon av de over

Maks størrelse pr vedlegg for opplastning i portalen er 10 MB pr vedlegg.

Meldinger kan sendes til en gitt person eller virksomhet basert på fødsels- eller organisasjonsnummer,
og bruker(e) kan varsles med e-post og/eller sms om at informasjon er gjort tilgjengelig.
Hvis ikke mottakeradresse/telefonnummer spesifiseres vil dette hentes hos Difi sitt Kontakt- og reservasjonsregister hvis meldingen er til en privatperson,
og i Altinn sitt kontaktregister for virksomheter dersom meldingen er til en virksomhet.
Hvis man ønsker så kan det sendes ut et påfølgende varsel (purring) dersom meldingen ikke er åpnet innen et gitt tidspunkt som er bestemt av tjenesteeier.

Tjenesteeier kan få informasjon om hvilke utsendte meldinger som er åpnet og kan eventuelt kreve at brukeren bekrefter mottaket innen en fastsatt frist. 

En meldingstjeneste kan presenteres på flere språk. Altinn har foreløpig språkstøtte for bokmål, nynorsk og engelsk. 

Hvis det er ønskelig kan meldingstjenester lagres i tjenesteeiers arkiv i Altinn.
I dette arkivet kan tjenesteeier søke opp utsendte meldinger gjennom et nettlesergrensesnitt.
Disse søkene tilbys også som webservices slik at tjenesteeier sitt system kan hente ut informasjon fra dette arkivet.

#### Fordeler
 - Sikker identifikasjon av mottaker
 - Sikker dialog med bruker
 - Bruker kan varsles på e-post og/eller sms om meldingen
 - Altinn har oversikt over hvem som skal varsles - hvis ønskelig
 - En og samme meldingstjeneste kan benyttes i flere sammenhenger
 - Kan gi stor økonomisk gevinst sammenlignet med andre transportkanaler
 - Tjenesteeier kan be om bekreftelse på at meldingen er lest
 - Tjenesteeier kan få tilbakemelding på om meldinger er åpnet eller ikke
 - Tjenesten kan benyttes sammen med andre tjenester i samspill for å realisere en dialog mellom sluttbruker og tjenesteeier
 - Språkstøtte


### Produkter som tilbys
 - Vedlegg
 - Varsling
 - Tjenesteeiers arkiv

### Hvordan komme i gang
[Informasjon om hvordan man kommer i gang med å lage en meldingstjeneste](https://altinnett.brreg.no/no/Tjenesteutvikling/Hvordan-utvikle-tjenester/Meldingstjeneste/)

### Råd og tips
Under utvikling

### Kanaler
 - REST API
 - Sluttbrukersystem

### Avhengigheter
Meldingstjenesten er en frittstående tjenestetype som kan benyttes i kombinasjon med andre tjenestetyper som innsendingstjenester eller som et element i en samhandlingstjeneste.
Kan inneholde ulike typer vedlegg og kan kombineres med varslingsfunksjonalitet. 

### Teknisk dokumentasjon
 - Funksjonell spesifikasjon – Sluttbrukerløsningen
 - [Implementasjonsguide for tjenesteeier](/docs/guides/tjenesteeier/implementasjonsguide/)