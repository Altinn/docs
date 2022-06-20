---
title: Henting av rettstiftelser knyttet til kjøretøy
description: Beskrivelser av API innen domene Rettsstiftelse
weight: 120
---

## Grensesnittbeskrivelse

| HTTP-metode   | URL                                                       | Beskrivelse                                                              |
|:------------- |:----------------------------------------------------------|:-------------------------------------------------------------------------|
| GET           | https://\{domene\}/api/v1/rettsstiftelse/regnr/\{regnr\}  | Hent opplysninger om rettstiftelser knyttet til et registreringsnummer.  |

**Domener**:

* For testmiljø (ppe) `https://losoreregisteret.ppe.brreg.no/registerinfo`
* For produksjon `https://losoreregisteret.brreg.no/registerinfo`

### Oppslag på registreringsnummer

#### Beskrivelse

Tjenesten tar imot en forespørsel om oppslag på et registreringsnummer, forespørselen valideres før utførelsen og returnerer opplysninger om kun aktive rettstiftelser på registreringsnummeret.

#### Request

Tar i mot et registreringsnummer (regnr) som del av URL.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens orgnummer, og dette orgnummeret skal være gyldig samt ha en gyldig avtale om å kunne hente ut opplysninger i Løsøreregisteret.
* Forespørselen skal alltid inneholde regnr som det gjøres oppslag på.
* Dersom forespørselen inneholder et regnr som ikke er lovlig oppbygd, returneres det en feilmelding.
* Det sjekkes at avtalepartens organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om rettsstiftelsene.

##### Eksempelrespons

```json
{
  "sokeparameter": "CU10100",
  "oppslagstidspunkt": "2022-05-02T12:16:41.12885",
  "antallRettsstiftelser": 148,
  "rettsstiftelser": [
    {
      "dokumentnummer": "2020000003",
      "type": "rettsstiftelsestype.utp",
      "typeBeskrivelse": "Utleggspant",
      "innkomsttidspunkt": "2020-02-26T15:15:51Z",
      "utlopRettsvernstid": "2030-02-26",
      "avgrensingRettsstiftelse": "JA",
      "roller": [
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.saksoker",
          "rolletypeBeskrivelse": "Saksøker",
          "navn": "USTABIL FORNUFTIG FJERNKONTROLL",
          "identifikator": "17071150380",
          "rollegruppetype": "rollegruppe.rett",
          "rollegruppetypeBeskrivelse": "Rettighetshaver"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "CU10100"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        }
      ],
      "krav": {
        "belop": [
          {
            "belop": 2.12,
            "valuta": "NOK"
          }
        ]
      },
      "gjeldsordning": {
        "type": "gjeldsordningstype.tvungen",
        "typeBeskrivelse": "tvungen gjeldsordning",
        "gjeldsordningsperiodeFraDato": "2020-04-02",
        "gjeldsordningsperiodeTilDato": "2020-08-17",
        "gjeldsordningsperiodeAntallMaaneder": 10,
        "gjeldsordningsperiodeAntallAar": 2
      },
      "vergemaal": {
        "personligForhold": true,
        "okonomiskeForhold": false,
        "varighet": "varighet.varig",
        "varighetBeskrivelse": "varig"
      },
      "skifteutlegg": {
        "type": "skifteutleggtype.gjeld",
        "typeBeskrivelse": "Gjeld"
      },
      "paategninger": [
        {
          "paategning": "Påtegning"
        }
      ],
      "prioritetsvikelser": [
        {
          "dokumentnummer": "2020000001",
          "rettighetshaverFremtidig": "Pantehaver"
        }
      ]
    },
    {
      "dokumentnummer": "5120000004",
      "type": "rettsstiftelsestype.gjo",
      "typeBeskrivelse": "Gjeldsordning",
      "innkomsttidspunkt": "1991-02-26T15:15:51Z",
      "utlopRettsvernstid": "2030-02-26",
      "avgrensingRettsstiftelse": "JA",
      "roller": [
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.saksoker",
          "rolletypeBeskrivelse": "rolletype.saksoker",
          "navn": "USTABIL FORNUFTIG FJERNKONTROLL",
          "identifikator": "17071150380",
          "rollegruppetype": "rollegruppe.rett",
          "rollegruppetypeBeskrivelse": "Rettighetshaver"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "CU10100"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        }
      ],
      "krav": {
        "belop": [
          {
            "belop": 2.12,
            "valuta": "NOK"
          }
        ]
      },
      "gjeldsordning": {
        "type": "gjeldsordningstype.tvungen",
        "typeBeskrivelse": "tvungen gjeldsordning",
        "gjeldsordningsperiodeFraDato": "2020-04-02",
        "gjeldsordningsperiodeTilDato": "2020-08-17",
        "gjeldsordningsperiodeAntallMaaneder": 10,
        "gjeldsordningsperiodeAntallAar": 2
      },
      "vergemaal": {
        "personligForhold": true,
        "okonomiskeForhold": false,
        "varighet": "varighet.varig",
        "varighetBeskrivelse": "varig"
      },
      "skifteutlegg": {
        "type": "skifteutleggtype.gjeld",
        "typeBeskrivelse": "Gjeld"
      },
      "paategninger": [
        {
          "paategning": "Påtegning"
        }
      ],
      "prioritetsvikelser": [
        {
          "dokumentnummer": "2020000001",
          "rettighetshaverFremtidig": "Pantehaver"
        }
      ]
    },
    {
      "dokumentnummer": "2021000456",
      "type": "rettsstiftelsestype.sap",
      "typeBeskrivelse": "Salgspant",
      "innkomsttidspunkt": "2021-10-29T08:10:00Z",
      "utlopRettsvernstid": "2041-10-29",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.panthaver",
          "rolletypeBeskrivelse": "Panthaver",
          "identifikator": "215148742",
          "rollegruppetype": "rollegruppe.rett",
          "rollegruppetypeBeskrivelse": "Rettighetshaver"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.pantsetter",
          "rolletypeBeskrivelse": "Pantsetter",
          "navn": "FULLKOMMEN SEKK",
          "identifikator": "19810199639",
          "rollegruppetype": "rollegruppe.forp",
          "rollegruppetypeBeskrivelse": "Forpliktet"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "CU10100"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        }
      ],
      "krav": {
        "belop": [
          {
            "belop": 120000.0,
            "valuta": "NOK"
          }
        ],
        "kravSalgspant": "kravsalgspant.lan.til.kjoper",
        "kravSalgspantBeskrivelse": "lån som tredjeperson har ydet kjøperen"
      },
      "vergemaal": {
        "personligForhold": false,
        "okonomiskeForhold": true,
        "varighet": "varighet.midlertidig",
        "varighetBeskrivelse": "midlertidig",
        "tidsbegrensetTilDato": "2022-11-25"
      }
    }
  ]
}
```

---

## Feilmeldinger

Dersom man ikke får HTTP-status 200, så får man en melding fra tjenesten i JSON-format.

| HTTP-kode   | Feilmelding                                                                                 |
|:----------- |:------------------------------------------------------------------------------------------- |
| 400         | Ugyldig regnr                                                                               |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                            |
| 404         | regnr mangler                                                                               |

##### Eksempelrespons feilmelding

```json
{
    "korrelasjonsid": "cba2c68f-2f04-4104-9dbf-8e69c5e36c5c",
    "tidspunkt": "2020-10-28 13:23:35",
    "feilmelding": "Feil i registreringsnummer, vennligst prøv på nytt"
}
```

---
