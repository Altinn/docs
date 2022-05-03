---
title: ITU/UTT for distributører
description: ITU/UTT API for distributører
weight: 100
---

## Innledning

Brønnøysundregistrene tilbyr en begrenset, standardisert maskin-til-maskin-tjeneste (API) som kan benyttes av eksterne partnere for innsyn i utleggsdata fra Løsøregisteret.

Denne dokumentasjonen viser hvordan eksterne systemer kan integrere seg mot APIet, og hvordan man benytter seg av tjenesten for å hente data.

## Syntetiske testdata

Vi har en [Excel-fil med syntetiske testdata](../Testdata%20ITU-UTT%20pr%2004.10.2019-PPE.xlsx) for personer/virksomheter som det er registrert saker på i tjenestens testmiljø. Alt er oppkonstruert, både personer, virksomheter og saker.
Merk at avvik mellom filen og respons fra tjenesten kan forekomme over tid, ettersom tjenesten oppdateres fortløpende.

## API-referanse

Denne tjenesten tilbyr opplysninger om:

* Intet til utlegg og utleggstrekk på fødselsnummer/d-nummer
* Intet til utlegg på organisasjonsnummer

[Swagger-dokumentasjon](https://raw.githubusercontent.com/brreg/openAPI/master/specs/itu-utt.json) (last ned [Swagger-UI](https://github.com/swagger-api/swagger-ui) og utforsk linken)

## Sikkerhetsmekanismer

Siden dette er begrensede API så skal kallende parter autentiseres gjennom [Maskinporten](https://docs.digdir.no/maskinporten_guide_apikonsument.html).

For å kunne få tilgang til våre begrensede API er det tre forutsetninger.

1. Virksomhetssertifikat
2. Registrert klient hos Maskinporten.
3. JWT-token fra Maskinporten mot scopet `brreg:losore/utlegg`

Tokenet som hentes fra Maskinporten må bli sendt som autorisasjonstoken (Bearer token) når et kall mot Løsøreregisteret blir utført.

Se [veiledning for integrasjon mot Maskinporten]({{<ref "mp-integrasjonsveiledning.md">}}).

[Regelverk](https://lovdata.no/dokument/SF/forskrift/2015-12-11-1668/%C2%A76): Hjemler for tilgjengeliggjøring av data fra Brønnøysundregistrene.

## Grensesnittbeskrivelse

| HTTP-metode   | URL                                                                       | Beskrivelse                                                                               |
|:------------- |:------------------------------------------------------------------------- |:----------------------------------------------------------------------------------------- |
| GET           | https://\{domene\}/utlegg/personer/\{fnr/dnr\}?sokers_orgnummer=\{orgnr\} | Hent opplysninger om intet til utlegg og utleggstrekk på et fødselsnummer eller d-nummer. |
| GET           | https://\{domene\}/utlegg/enheter/\{orgnr\}?sokers_orgnummer=\{orgnr\}    | Hent opplysninger om intet til utlegg på et organisasjonsnummer.                          |

**Domener**:

* For testmiljø (ppe): `https://losoreregisteret.ppe.brreg.no`
* For prod: `https://losoreregisteret.brreg.no`

### Oppslag på fødselsnummer/d-nummer

#### Beskrivelse

Tjenesten tar imot en forespørsel om oppslag på et fødselsnummer eller d-nummer, forespørselen valideres før utførelsen og returnerer opplysninger om kun aktive intet til utlegg og utleggstrekk på fødselsnummer eller d-nummer.

#### Request

Tar i mot et fødselsnummer eller d-nummer som del av URL, med obligatorisk path-parameter `sokers_orgnummer` som inneholder organisasjonsnummeret til sluttbruker som oppslaget gjøres på vegne av.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens orgnummer, og dette orgnummeret skal være gyldig samt ha en gyldig avtale om å kunne hente ut utlegg.
* Forespørselen skal alltid inneholde fødselsnummer eller d-nummer på den det gjøres oppslag på.
* Dersom forespørselen inneholder et fødselsnummer eller d-nummer som ikke er lovlig oppbygd, returneres det en feilmelding.
* Forespørselen skal alltid inneholde organisasjonsnummeret til sluttbruker/den som gjør oppslag.
* Det sjekkes at sluttbrukers organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om intet til utlegg og utleggstrekk.

<details><summary>**Vis eksempelrespons**</summary><p>

##### Eksempelrespons for oppslag på fødselsnummer/d-nummer

```json
{
    "utleggResponseDistributor": {
        "antallITU": 1,
        "antallUTT": 2,
        "utlegg": [
            {
                "utleggstype": "ITU",
                "avholdtForretning": "2018-09-04",
                "innfortILosoreregisteret": "2018-09-04"
            },
            {
                "utleggstype": "UTT",
                "avholdtForretning": "2018-07-30",
                "innfortILosoreregisteret": "2018-08-01",
                "trekkbelop": 500.00,
                "trekkvaluta": "NOK",
                "periodeStart": "2018-08-01",
                "periodeSlutt": "2020-08-10"
            },
            {
                "utleggstype": "UTT",
                "avholdtForretning": "2018-06-10",
                "innfortILosoreregisteret": "2018-08-08",
                "trekkprosent": 17.0,
                "periodeStart": "2018-07-13",
                "periodeSlutt": "2020-07-13"
            }
        ],
        "meldinger": [],
        "tilleggsinfo": ""
    }
}
```

---

</p></details>

---

### Oppslag på organisasjonsnummer

#### Beskrivelse

Tjenesten tar imot en forespørsel om oppslag på et organisasjonsnummer, forespørselen valideres før utførelsen og returnerer opplysninger om kun aktive intet til utlegg på organisasjonsnummeret.

#### Request

Tar i mot et organisasjonsnummer som del av URL, med obligatorisk path-parameter `sokers_orgnummer` som inneholder organisasjonsnummeret til sluttbruker som oppslaget gjøres på vegne av.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens orgnummer, skal være gyldig, samt ha en gyldig avtale om å kunne hente ut utlegg.
* Forespørselen skal alltid inneholde organisasjonsnummer på det foretaket det gjøres oppslag mot.
* Dersom forespørselen inneholder et organisasjonsnummer som ikke er lovlig oppbygd, returneres det en feilmelding.
* Forespørselen skal alltid inneholde organisasjonsnummeret til sluttbruker/den som gjør oppslag.
* Det sjekkes at sluttbrukers organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om intet til utlegg.

<details><summary>**Vis eksempelrespons**</summary><p>

##### Eksempelrespons for oppslag på organisasjonsnummer

```json
{
  "utleggResponseDistributor": {
    "antallITU": 1,
    "antallUTT": 1,
    "utlegg": [
      {
        "utleggstype": "ITU",
        "avholdtForretning": "2020-01-10",
        "innfortILosoreregisteret": "2020-01-16"
      },
      {
        "utleggstype": "UTT",
        "avholdtForretning": "2021-08-25",
        "innfortILosoreregisteret": "2021-08-31",
        "trekkbelop": 43022.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2021-08-25",
        "periodeSlutt": "2023-08-25"
      }
    ],
    "meldinger": [],
    "tilleggsinfo": ""
  }
}
```

##### Eksempelrespons for oppslag på slettet organisasjonsnummer

```json
{
  "utleggResponseDistributor": {
    "antallITU": 1,
    "antallUTT": 0,
    "utlegg": [
      {
        "utleggstype": "ITU",
        "avholdtForretning": "2019-09-02",
        "innfortILosoreregisteret": "2020-08-13"
      }
    ],
    "meldinger": [],
    "tilleggsinfo": "Organisasjonsnummer er slettet"
  }
}
```

---

</p></details>

---

## Feilmeldinger

Dersom det ikke finnes noen utlegg, eller ved ugyldig input, vil det gis melding om dette i JSON-responsen. Dette ligger i form av en array `meldinger`.

##### Eksempelrespons uten utlegg

```json
{
  "antallITU": 0,
  "antallUTT": 0,
  "utlegg": [],
  "meldinger": [
    "Det er ikke registrert opplysninger om intet til utlegg på dette fødselsnummeret/d-nummeret",
    "Det er ikke registrert opplysninger om utleggstrekk på dette fødselsnummeret/d-nummeret"
  ],
  "tilleggsinfo": ""
}
```

##### Eksempelrespons feilmelding

```json
{
    "feilId": "7d10f7d9-e2a3-4ab6-9ee2-90ccbf12eeef",
    "feilkode": "UAE_002",
    "feiltype": "VALIDERING",
    "beskrivelse": "Feil innhold i request",
    "detaljer": "Ugyldig fødselsnummer/d-nummer"
}
```

Dersom man ikke får HTTP-status 200, så får man en melding fra tjenesten i JSON-format.

| HTTP-kode   | Feilmelding                                                                                   |
|:----------- |:----------------------------------------------------------------------------------------------|
| 400         | Søkers organisasjonsnummer mangler                                                            |
| 400         | Søkers organisasjonsnummer er ugyldig                                                         |
| 400         | Ugyldig organisasjonsnummer                                                                   |
| 400         | Organisasjonsnummer er slettet                                                                |
| 400         | Ugyldig fødselsnummer/d-nummer                                                                |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                              |
| 404         | Organisasjonsnummer mangler                                                                   |
| 404         | Fødselsnummer/d-nummer mangler                                                                |

## HTTP-statuskoder

Oversikt over HTTP-statuskoder i APIet.

| HTTP-kode                 | Beskrivelse |
|:------------------------- |:----------- |
| 200 OK                    | Henting av data gikk bra |
| 400 Bad Request           | Feil i spørring. Applikasjonen vil gi en detaljert feilmelding for hva som er feil med spørring |
| 403 Forbidden             | Feil ved autentisering eller autorisering. Bearer tokenet som ble sendt inn er ikke gyldig eller har ikke en gyldig avtale om utlegg |
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
| D-nummer | Identifikasjonsnummer tildeles personer med midlertidig tilknytning til Norge, det vil si som ikke er bosatt i Norge. Består av en modifisert sekssifret fødselsdato og et femsifret personnummer. Fødselsdatoen modifiseres ved at det legges til 4 på det første sifferet. |
| Fødselsnummer	| Identifikasjonsnummer fra folkeregistret og består av 11 siffer |
| Personidentifikator | Fødselsnummer eller d-nummer |
| Organisasjonsnummer | Identifikasjonsnummer for virksomhet |
| Utlegg | Intet til utlegg og utleggstrekk |
| ITU | Intet til utlegg |
| UTT | Utleggstrekk |
| Aktive | Med aktive menes de utleggstrekkene eller intet til utlegg som har status GO (godkjent) |

---
