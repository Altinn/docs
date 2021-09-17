---
title: Generelt - Uthenting av rettsstiftelser
description: Beskrivelser av API innen domene Rettsstiftelse
weight: 110
---

## UNDER ARBEID

Dette APIet er ikke tilgjengelig ennå, men dokumentasjon er påbegynt og vil oppdateres fortløpende under utviklingen av APIet.

## Innledning

Brønnøysundregistrene tilbyr en begrenset, standardisert maskin-til-maskin-tjeneste (API) som kan benyttes av eksterne partnere for innsyn i rettsstiftelser fra Løsøregisteret.

Denne dokumentasjonen viser hvordan eksterne systemer kan integrere seg mot APIet, og hvordan man benytter seg av tjenesten for å hente data.

## Syntetiske testdata

Når APIet gjøres tilgjengelig vil siden oppdateres med informasjon om syntetiske data i testmiljøet

## API-referanse

Denne tjenesten tilbyr opplysninger om:

* Rettsstiftelser tilknyttet kjøretøy gitt kjøretøyets registreringsnummer (Merk at oppslag på personlig kjennemerke ikke er støttet)
* Rettsstiftelser tilknyttet organisasjon gitt tilhørende organisasjonsnummer
* Rettsstiftelser tilknyttet person gitt personens fødselsnummer eller d-nummer
* Totalbestand, alle aktive rettsstiftelser.
* Endringslogg, endringer på rettsstiftelser opp til og med 30 dager tilbake.

Dokumentasjon er også tilgjengelig i Swagger:

* [Testmiljø (kommer senere)](https://kommersenere.ppe.brreg.no/swagger-ui.html)
* [Produksjonsmiljø (kommer senere)](https://kommersenere.brreg.no/swagger-ui.html)

## Sikkerhetsmekanismer

Siden dette er begrensede API så skal kallende parter autentiseres gjennom [Maskinporten](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html).

For å kunne få tilgang til våre begrensede API er det tre forutsetninger:

1. Virksomhetssertifikat
2. Registrert klient hos Maskinporten.
3. JWT-token fra Maskinporten mot scopet `brreg:losore/tlg`

Tokenet som hentes fra Maskinporten må bli sendt som autorisasjonstoken (Bearer token) når et kall mot Løsøreregisteret blir utført.

Se [veiledning for integrasjon mot Maskinporten]({{<ref "mp-integrasjonsveiledning.md">}}).

[Regelverk](https://lovdata.no/dokument/SF/forskrift/2015-12-11-1668/%C2%A76): Hjemler for tilgjengeliggjøring av data fra Brønnøysundregistrene.

## HTTP-statuskoder

Oversikt over HTTP-statuskoder i APIet.

| HTTP-kode                 | Beskrivelse |
|:------------------------- |:----------- |
| 200 OK                    | Henting av data gikk bra |
| 400 Bad Request           | Feil i spørring. Applikasjonen vil gi en detaljert feilmelding for hva som er feil med spørring |
| 403 Forbidden             | Feil ved autentisering eller autorisering. Bearer tokenet som ble sendt inn er ikke gyldig eller har ikke en gyldig avtale om maskinelt oppslag på opplysninger i Løsøreregisteret |
| 404 Not Found             | Applikasjonen vil gi en detaljert feilmelding for hva som ikke ble funnet. Kan også bety at man bruker feil adresse for tjenesten (i så fall vil man få en standard "404 NOT FOUND" og ikke et svar fra applikasjonen) |
| 500 Internal Server Error | Feil på server side, for eksempel at en underliggende datakilde ikke svarer |

## Ordliste

Definisjoner på begrep som er brukt i denne dokumentasjonen.

| Begrep | Definisjon |
|:------ |:---------- |
| API | Programmeringsgrensesnitt |
| HTTP | Datakommunikasjonsstandard |
| HTTP-statuskoder | Statuskoder for datakommunikasjonsstandard |
| REST | Datakommunikasjonmønster |
| JSON | Åpen standard for dataformat |
| orgnr | Identifikasjonsnummer for virksomhet |
| regnr | Registreringsnummer knyttet til et kjøretøy / tilhenger |
| fnr | Fødselsnummer for person |
| d-nummer | Identifikasjonsnummer som tildeles personer med midlertidig tilknytning til Norge, det vil si som ikke er bosatt i Norge. Består av en modifisert sekssifret fødselsdato og et femsifret personnummer. Fødselsdatoen modifiseres ved at det legges til 4 på det første sifferet. |
| rettsstiftelse | Bestemmelse i et dokument som stifter, forandrer, overdrar, behefter, anerkjenner eller opphever en rettighet |

---
