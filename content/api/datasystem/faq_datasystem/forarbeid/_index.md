---
title: Forarbeid
description: Spørsmål og svar som gjelder forarbeidet før du starter implementering
weight: 100
toc: true
---


***
## _Hvilke testdata finnes i testmiljøene?_

**Svar:** I testmiljøene er det kun fiktive testdata. Dette gjelder både fødselsnummer og organisasjonsnummer. De tilfredsstiller alle kontroller (modulus kontroll, reelle datoer i fødselsnummer).
***
## _Hvordan melder jeg inn feil til support?_

**Svar:** Rapporter feilen til sluttbrukersystem@altinn.no  
Som et minimum bør alle feilemeldinger inneholde:
- Hvilket miljø du (forsøker) å benytte (PROD, TT02)
- Hvilken webservice endepunkt du benytter (hele URL-en må med)
- Hele SOAP-konvolutten (request) og response du får fra Altinn
- Nøyaktig tidspunkt/tidsrom feilen ble observert
- Beskrivelse av hvilke steg som førte til feilen. Dette inkluderer webservice kall før det som ble gjort da feilen oppsto
- Kort beskrivelse av hva som var forventet resultat dersom det ikke hadde feilet.
- Kontaktinformasjon (navn, e-post, telefon) til en person vi kan kontakte ved behov.

***

## _Spørsmål og behov for support – Hvor kan jeg henvende meg?_

**Svar:**

- Ved skjema-/tjenesterelaterte spørsmål:
Skjema- og tjenesterelaterte spørsmål (om feks. feltverdier etc.) skal sendes til tjenesteeier. Se primært kontaktinformasjon for hvert tjenesteområde her i sluttbrukersystemportalen. Alternativt må man se etter kontaktinformasjon for hver enkelt tjeneste.

- Generelle spørsmål:
Andre generelle spørsmål om integrasjon rettes til sluttbrukersystem@altinn.no

***

## _Hvordan logger jeg inn i testmiljøet?_

**Svar:**
1.	Gå til TT2 (https://tt02.altinn.no)
2.	Klikk på "Logg inn"
3.	Velg "Gå videre til flere innloggingsmetoder"
4.	Velg «Altinn kodebrev» og logg inn med engangskodene.
 
Når du er innlogget, kan du legge inn passord og mobiltelefonnummer under «profil», «avanserte innstillinger» og «innloggingsinformasjon», slik at du får tilsendt engangskoder på SMS.

***

## _Hvilke URL benyttes?_

**Svar:** Det er ulik URL for produksjons- og testmiljø:  
PROD: https://www.altinn.no/  
TT02: https://tt02.altinn.no/

***

## _Hvor finner jeg WSDL-filer?_

**Svar:** Disse er tilgjengelig på url endepunktene til den enkelte webtjeneste:
https://altinn.github.io/docs/api/soap/endepunkter-oversikt/
 
Merk at disse peker på feil endepunkt da de feilaktig angir http i steden for https, dette «overstyres» av sluttbrukersystemleverandør.
 
Under «endepunkter» finner du URI til alle Altinn tjenester/aliasoversikt for endepunkter i «Implementasjonsguide for Sluttbrukersysten»
https://altinn.github.io/docs/guides/integrasjon/sluttbrukere/webservice/

***

## _Hvordan får jeg tilgang til sluttbrukersystemportalen??_

**Svar:** Tidligere lå dette på en lukket SharePoint side. Nå ligger dette åpent tilgjengelig på https://www.altinndigital.no/datasystemer

***

## _Hvordan får jeg rettighet til å rapportere for en organisasjon i testmiljøene?_

**Svar:** Alle testbrukerne har en knytning mellom personnummer og organisasjonsnummeret til en eller flere organisasjoner.
***