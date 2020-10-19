---
title: ITU/UTT for kredittopplysningsforetak
description: ITU/UTT API for kredittopplysningsforetak
weight: 100
---

## Innledning

Brønnøysundregistrene tilbyr en begrenset, standardisert maskin-til-maskin-tjeneste (API) som kan benyttes av eksterne partnere for innsyn i utleggsdata fra Løsøregisteret.

Denne dokumentasjonen viser hvordan eksterne systemer kan integrere seg mot APIet, og hvordan man benytter seg av tjenesten for å hente data.

## Syntetiske testdata

Vi har en [Excel-fil med syntetiske testdata](../Testdata%20ITU-UTT%20pr%2004.10.2019-PPE.xlsx) for personer/virksomheter som det er registrert saker på i tjenestens testmiljø. Alt er oppkonstruert, både personer, virksomheter og saker.
Merk at avvik mellom filen og respons fra tjenesten vil forekomme over tid, ettersom tjenesten oppdateres fortløpende.

## API-referanse

Denne tjenesten tilbyr opplysninger om:

* Intet til utlegg og utleggstrekk for fødselsnummer/d-nummer
* Endringslogg for utleggsdata
* Totalbestand for utleggsdata

Dokumentasjon er også i Swagger:

* [Testmiljø](https://losoreregisteret.ppe.brreg.no/swagger-ui.html)
* [Produksjonsmiljø](https://losoreregisteret.brreg.no/swagger-ui.html)

## Sikkerhetsmekanismer

Siden dette er begrensede API så skal kallende parter autentiseres gjennom [Maskinporten](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html).

For å kunne få tilgang til våre begrensede API er det tre forutsetninger.

1. Virksomhetssertifikat
2. Registrert klient hos Maskinporten.
3. JWT-token fra Maskinporten mot scopet `brreg:losore/utlegg`

Tokenet som hentes fra Maskinporten må bli sendt som autorisasjonstoken (Bearer token) når et kall mot Løsøreregisteret blir utført.

Se [veiledning for integrasjon mot Maskinporten]({{<ref "mp-integrasjonsveiledning.md">}}).

[Regelverk](https://lovdata.no/dokument/SF/forskrift/2015-12-11-1668/%C2%A76): Hjemler for tilgjengeliggjøring av data fra Brønnøysundregistrene.

## Grensesnittbeskrivelse

| HTTP-metode | URL                                                          | Beskrivelse                                                                                                                  |
|:----------- |:------------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------- |
| GET         | https://\{domene\}/utlegg/personer-utvidet/\{fnr/dnr\}       | Hent detaljerte opplysninger om intet til utlegg og utleggstrekk for et fødselsnummer/d-nummer.                              |
| GET         | https://\{domene\}/utlegg/endringslogg/\{timestamp\}         | Hent endringslogg (alle endringer i intet til utlegg og utleggstrekk) for alle fødselsnummer/d-nummer og organisasjonsnummer |
| GET         | https://\{domene\}/utlegg/endringslogg/enheter/\{timestamp\} | Hent endringslogg (alle endringer i intet til utlegg) for alle organisasjonsnummer etter timestamp.                          |
| GET         | https://\{domene\}/utlegg/totalbestand/\{timestamp\}         | Hent totalbestand (alle aktive intet til utlegg og utleggstrekk) for alle fødselsnummer/d-nummer og organisasjonsnummer      |
| GET         | https://\{domene\}/utlegg/totalbestand/enheter/\{timestamp\} | Hent totalbestand (alle aktive intet til utlegg) for alle organisasjonsnummer                                                |

**Domener**:

* For testmiljø (ppe): `https://losoreregisteret.ppe.brreg.no`
* For prod: `https://losoreregisteret.brreg.no`

### Oppslag på fødselsnummer eller d-nummer

#### Beskrivelse

Tjenesten tar imot en forespørsel om oppslag på et fødselsnummer eller d-nummer, forespørselen valideres før utførelsen og returnerer opplysninger om kun aktive intet til utlegg og utleggstrekk på fødselsnummer eller d-nummer.

#### Request

Tar i mot et fødselsnummer eller d-nummer som del av URL.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til sluttbrukers orgnummer og dette orgnummeret skal være gyldig, samt ha en gyldig avtale om å kunne hente ut utlegg.
* Forespørselen skal alltid inneholde fødselsnummer eller d-nummer på den det gjøres oppslag på.
* Dersom forespørselen inneholder et fødselsnummer eller d-nummer som ikke er lovlig oppbygd, returneres det en feilmelding.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om intet til utlegg og utleggstrekk.

<details><summary>**Vis eksempelrespons**</summary><p>

##### Eksempelrespons for oppslag på fødselsnummer eller d-nummer

```json
{
  "utleggResponseKredittforetak": {
    "antallITU": 1,
    "antallUTT": 3,
    "utlegg": [
      {
        "ubnr": 20181230000024,
        "ubmeldnr": 1,
        "utleggstype": "ITU",
        "avholdtForretning": "2017-08-01",
        "innfortILosoreregisteret": "2018-08-02",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810305002",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810305282"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810304642"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "01096501311"
          }
        ]
      },
      {
        "ubnr": 20181230000026,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2017-06-01",
        "innfortILosoreregisteret": "2018-08-02",
        "trekkbelop": 25000.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2017-07-13",
        "periodeSlutt": "2020-07-13",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810305002",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810305282"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810304642"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "01096501311"
          }
        ]
      },
      {
        "ubnr": 20181230000027,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2017-06-01",
        "innfortILosoreregisteret": "2018-08-02",
        "trekkbelop": 500.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2017-07-01",
        "periodeSlutt": "2020-07-01",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810305002",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810305282"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810304642"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "01096501311"
          }
        ]
      },
      {
        "ubnr": 20181230000028,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2017-06-01",
        "innfortILosoreregisteret": "2018-08-02",
        "trekkbelop": 500.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2017-07-01",
        "periodeSlutt": "2020-07-01",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810305002",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810305282"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810304642"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "01096501311"
          }
        ]
      }
    ],
    "meldinger": [
    ]
  }
}
```

---

</p></details>

---

### Endringslogg: Oppslag på endringer for alle fødselsnummer/d-nummer og organisasjonsnummer

#### Beskrivelse

Tjenesten tar imot en forespørsel hvor det er oppgitt et timestamp `(yyyy-MM-dd'T'HH:mm:ss.SSS)`, og returnerer alle endringer som er registrert kronologisk **etter** oppgitt timestamp.

Responsen er paginert, og inneholder metadata om bl.a. timestamp for siste element i responsen, slik at man kan bruke dette som input til å hente neste side med resultater
ved å bruke verdien fra feltet `datoSistEndret` fra forrige respons som spørreparameter.

Maksimalt antall meldinger som returneres per forespørsel er 1000, og dette regnes som én side med resultater.
Dette vil ofte ikke gi alle endringer på en dag, men lenke til neste side leveres i responsen så lenge det er flere sider.

Dersom timestamp i forespørselen er eldre enn 45 dager, returneres det en feilmelding.

#### Request

Tar i mot en forespørsel hvor det er oppgitt et timestamp som del av URL.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format. Tjenesten tilbyr to endepunkt som inneholder opplysninger om henholdsvis:

1. Intet til utlegg og utleggstrekk for fødselsnummer/d-nummer og organisasjonsnummer
2. Intet til utlegg for organisasjonsnummer.

Siste timestamp returneres som en del av responsen, slik at dette kan benyttes for å kontrollere om man har fått alt, samt som input i neste forespørsel.

<details><summary>**Vis eksempelrespons**</summary><p>

##### Eksempelrespons for Endringslogg: Oppslag på endringer for alle fødselsnummer/d-nummer og organisasjonsnummer

```json
{
  "endringsloggResponseKredittforetak": {
    "antallITU": 5,
    "antallUTT": 4,
    "datoSistEndret": "2020-03-23T21:02:40.004",
    "endringslogg": [
      {
        "ubnr": 20203000000001,
        "ubmeldnr": 1,
        "utleggstype": "ITU",
        "avholdtForretning": "2020-02-05",
        "innfortILosoreregisteret": "2020-03-17",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810843942",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810844442"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810843012",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "04021850530"
          }
        ]
      },
      {
        "ubnr": 20203000000001,
        "ubmeldnr": 3,
        "utleggstype": "ITU",
        "avholdtForretning": "2020-02-05",
        "innfortILosoreregisteret": "2020-03-17",
        "slettekode": "S",
        "slettedato": "2020-03-17",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810843942",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810844442"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810843012",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "04021850530"
          }
        ]
      },
      {
        "ubnr": 20203000000001,
        "ubmeldnr": 2,
        "utleggstype": "ITU",
        "avholdtForretning": "2020-02-07",
        "innfortILosoreregisteret": "2020-03-17",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810843942",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810844442"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810843012",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "04021850530"
          }
        ]
      },
      {
        "ubnr": 20203000000002,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2019-07-25",
        "innfortILosoreregisteret": "2020-03-17",
        "trekkbelop": 5000.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2019-08-13",
        "periodeSlutt": "2020-08-13",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810844582",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810844582"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810844582",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "07041750426"
          }
        ]
      },
      {
        "ubnr": 20203000000002,
        "ubmeldnr": 2,
        "utleggstype": "UTT",
        "avholdtForretning": "2019-07-25",
        "innfortILosoreregisteret": "2020-03-17",
        "trekkbelop": 1000.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2019-08-13",
        "periodeSlutt": "2020-08-13",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810844582",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810844582"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810844582",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "07041750426"
          }
        ]
      },
      {
        "ubnr": 20203000000002,
        "ubmeldnr": 3,
        "utleggstype": "UTT",
        "avholdtForretning": "2019-07-31",
        "innfortILosoreregisteret": "2020-03-17",
        "trekkbelop": 500.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2019-08-13",
        "periodeSlutt": "2020-08-13",
        "slettekode": "S",
        "slettedato": "2020-03-17",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810844582",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810844582"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810844582",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "07041750426"
          }
        ]
      },
      {
        "ubnr": 20203000000004,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2018-07-25",
        "innfortILosoreregisteret": "2020-03-17",
        "trekkbelop": 5000.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2018-08-13",
        "periodeSlutt": "2019-08-13",
        "slettekode": "AS",
        "slettedato": "2020-03-17",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810844582",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810844582"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810844582",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "07041750426"
          }
        ]
      },
      {
        "ubnr": 20203000000003,
        "ubmeldnr": 1,
        "utleggstype": "ITU",
        "avholdtForretning": "2016-02-05",
        "innfortILosoreregisteret": "2020-03-17",
        "slettekode": "AS",
        "slettedato": "2020-03-17",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810843942",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810844442"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810843012",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "04021850530"
          }
        ]
      },
      {
        "ubnr": 20208701005004,
        "ubmeldnr": 1,
        "utleggstype": "ITU",
        "avholdtForretning": "2018-09-02",
        "innfortILosoreregisteret": "2020-03-23",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810305002",
            "referansenummer": "13"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810305932"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810304642",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "24105100775"
          }
        ]
      }
    ],
    "meldinger": [],
    "_links": {
      "next": {
        "href": "https://losoreregisteret.ppe.brreg.no/utlegg/endringslogg/2020-03-23T21:02:40.004"
      }
    }
  }
}
```

---

</p></details>

---

### Totalbestand: Oppslag på alle aktive utlegg for fødselsnummer/d-nummer og organisasjonsnummer

#### Beskrivelse

Tjenesten tar imot en forespørsel hvor det er oppgitt et timestamp `(yyyy-MM-dd'T'HH:mm:ss.SSS)`, og returnerer alle **aktive utlegg** som er registrert kronologisk **etter** oppgitt timestamp, som er eldre enn to dager gamle.
Responsen er paginert, og inneholder metadata om bl.a. timestamp for siste element i responsen,
slik at man kan bruke dette som input til å hente neste side med resultater, eller ved overgang til å konsumere endringslogg-endepunktet for å få de nyeste elementene.

Maksimalt antall meldinger som returneres per forespørsel er 1000, og dette regnes som én side med resultater. Dette vil ikke være hele totalbestanden,
men lenke til neste side leveres i responsen så lenge det er flere sider.

#### Request

Tar i mot en forespørsel hvor det oppgis et timestamp som del av URL.

Tjenesten kalles initielt uten timestamp for å få de første 1000 elementene, og for å iterativt hente neste side med resultater bruker man verdien fra feltet `datoSistEndret` fra forrige respons som spørreparameter.
Alternativt kan man benytte lenken til neste side som returneres som eget felt.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format. Tjenesten tilbyr to endepunkt som inneholder opplysninger om henholdsvis:

1. Intet til utlegg og utleggstrekk for fødselsnummer/d-nummer og organisasjonsnummer,
2. Intet til utlegg for organisasjonsnummer.

Siste timestamp er en del av responsen.

<details><summary>**Vis eksempelrespons**</summary><p>

##### Eksempelrespons for Totalbestand: Oppslag på alle aktive utlegg for fødselsnummer/d-nummer og organisasjonsnummer

```json
{
  "totalbestandResponseKredittforetak": {
    "antallITU": 1,
    "antallUTT": 4,
    "datoSistEndret": "2020-03-16T19:43:12.023",
    "totalbestand": [
      {
        "ubnr": 20201000000159,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2019-07-25",
        "innfortILosoreregisteret": "2020-03-16",
        "trekkbelop": 5000.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2019-08-13",
        "periodeSlutt": "2020-08-13",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810005882",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810727322"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810005122",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "02030150417"
          }
        ]
      },
      {
        "ubnr": 20201000000160,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2019-07-25",
        "innfortILosoreregisteret": "2020-03-16",
        "trekkbelop": 5000.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2019-08-13",
        "periodeSlutt": "2020-08-13",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810005882",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810727322"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810005122",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "02030150417"
          }
        ]
      },
      {
        "ubnr": 20201000000161,
        "ubmeldnr": 1,
        "utleggstype": "ITU",
        "avholdtForretning": "2019-09-02",
        "innfortILosoreregisteret": "2020-03-16",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810728272",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810727632"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810756632",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "organisasjonsnummer": "810862742"
          }
        ]
      },
      {
        "ubnr": 20201000000162,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2019-07-25",
        "innfortILosoreregisteret": "2020-03-16",
        "trekkbelop": 5000.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2019-08-13",
        "periodeSlutt": "2020-08-13",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810005882",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810727322"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810005122",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "02030150417"
          }
        ]
      },
      {
        "ubnr": 20201000000163,
        "ubmeldnr": 1,
        "utleggstype": "UTT",
        "avholdtForretning": "2019-07-25",
        "innfortILosoreregisteret": "2020-03-16",
        "trekkbelop": 5000.00,
        "trekkvaluta": "NOK",
        "periodeStart": "2019-08-15",
        "periodeSlutt": "2020-10-13",
        "aktorer": [
          {
            "rolletype": "Prosessfullmektig",
            "organisasjonsnummer": "810005882",
            "referansenummer": "1"
          },
          {
            "rolletype": "Saksøker",
            "organisasjonsnummer": "810727322"
          },
          {
            "rolletype": "Namsmyndighet",
            "organisasjonsnummer": "810005122",
            "saksnummer": "1"
          },
          {
            "rolletype": "Saksøkt",
            "personidentifikator": "02019800655"
          }
        ]
      }
    ],
    "meldinger": [],
    "_links": {
      "next": {
        "href": "https://losoreregisteret.ppe.brreg.no/utlegg/totalbestand/2020-03-16T19:43:12.023"
      }
    }
  }
}
```

</p></details>

---

## Timestamp rundt sommer/vintertid

{{<image src="/docs/images/warning_sign.svg" alt="Warning Sign" style="width:3%">}}
Timestamps som lagres i databasen er omgjort fra tidssonen man er i når det lagres til UTC, og så omgjort tilbake til tidssonen man er i under uthenting på veien ut igjen.
Dette vil føre til noen gotchas rundt overgangen sommer\(UTC +2) og vinter\(UTC +1) tid, begge veier.

Dersom mulig vil vi anbefale å helt unngå uthenting av data rundt overgangen mellom sommer og vintertid, alt innen en time før.
Hvis det ikke er mulig må man sørge for at man takler overgangen.

F.eks:

Man gjør et oppslag rett før overgangen sommer til vintertid.
Dette gir f.eks. ut et resultset hvor neste page har timestamp 2020-03-16T02:59:00.000 \(Som er lagret som 2020-03-16T00:59:00.000 og så justert til sommertid på veien opp).
Så gjør man neste query rett etter overgangen til vintertid.
Da vil 2020-03-16T02:59:00.000 justeres til UTC basert på vintertid og man leter i databasen etter timestamp 2020-03-16T01:59:00.000
Dette vil derfor føre til at man mister alle innslag som er registrert mellom 2020-03-16T00:59:00.000 og 2020-03-16T01:59:00.000 i databasen.

Eksempler:

| Overgang          | Lagret i databasen \(UTC) | Det man får ut                    | Blir justert til i neste søk etter overgang \(UTC)           | Feil                                       | Timestamp-justering man må bruke |
|:------------------|:--------------------------|:----------------------------------|:-------------------------------------------------------------|:-------------------------------------------|:---------------------------------|
| Sommer til vinter | 2020-03-16T00:59:00.000   | 2020-03-16T02:59:00.000 \(UTC +2) | 2020-03-16T01:59:00.000 \(Trekker fra 1 time pga nå UTC +1)  | Hopper over en time med innslag            | 2020-03-16T01:59:00.000          |
| Vinter til sommer | 2020-03-16T00:59:00.000   | 2020-03-16T01:59:00.000 \(UTC +1) | 2020-03-15T23:59:00.000 \(Trekker fra 2 timer pga nå UTC +2) | Får med innslag man allerede har hentet ut | 2020-03-16T02:59:00.000          |

NB: Dette gjelder ikke kun i de tilfellene der man spør rett rundt overgangen \(minuttet før og så minuttet etter), men i alle tilfeller der man har hentet ut data før overgangen og neste query blir gjort etter overgangen.

---

## Feilmeldinger

Dersom det ikke finnes noen ITU/UTT, eller ved ugyldig input, vil det gis melding om dette i JSON-responsen. Dette ligger i form av en array `meldinger`. Eksempel nedenfor.

```json
{
  "antallITU": 0,
  "antallUTT": 0,
  "utlegg": [],
  "meldinger": [
    "Det er ikke registrert opplysninger om intet til utlegg på dette fødselsnummeret/d-nummeret",
    "Det er ikke registrert opplysninger om utleggstrekk på dette fødselsnummeret/d-nummeret"
  ]
}
```

Dersom man ikke får HTTP-status 200, så får man en melding fra tjenesten i JSON-format.

| HTTP-kode   | Feilmelding                                                                                 |
|:----------- |:------------------------------------------------------------------------------------------- |
| 400         | Ugyldig fødselsnummer/d-nummer                                                              |
| 400         | Ugyldig timestamp oppgitt                                                                   |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                            |
| 404         | Fødselsnummer/d-nummer mangler                                                              |
| 404         | Timestamp-parameter til Endringslogg er eldre enn 45 dager                                  |
| 404         | Fant ingen meldinger som er eldre enn oppgitt timestamp                                     |

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
| Organisasjonsnummer | Identifikasjonsnummer for organisasjon |
| Utlegg | Intet til utlegg og utleggstrekk |
| ITU | Intet til utlegg |
| UTT | Utleggstrekk |
| Aktive | Med aktive menes de utleggstrekkene eller intet til utlegg som har status GO (godkjent) |
| Endringslogg | Endringsinformasjon (nye/slettede/endrede) om intet til utlegg og utleggstrekk. Det er bare kredittopplysningsforetak som kan abonnere på endringslogg. De har hjemmel for abonnement i utleggsregisterforskriftens § 3, jf tinglysningslovens § 34 a. |
| Totalbestand | Alle aktive saker (utleggstrekkene/intet til utlegg som har status GO) om intet til utlegg og utleggstrekk. Det er bare kredittopplysningsforetak som kan be om å få hente totalbestand. De har hjemmel for abonnement i utleggsregisterforskriftens § 3, jf tinglysningslovens § 34 a. |

---
