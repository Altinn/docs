---
title: Endringslogg 
description: Beskrivelser av API innen domene Rettsstiftelse
weight: 160
---

## Bruksmønster

Se [siden for totalbestand]({{<ref "rettsstiftelse_totalbestand.md">}}) for en helhetlig oversikt av bruksmønsteret for endringslogg og totalbestand.

## Grensesnittbeskrivelse

| HTTP-metode   | URL                                                           | Beskrivelse                                                                   |
|:------------- |:--------------------------------------------------------------|:------------------------------------------------------------------------------|
| POST          | https://\{domene\}/api/v1/rettsstiftelse/endringslogg         | Hent opplysninger endringer på rettstiftelser fra et ønsket tidspunkt         |

**Domener**:

* For testmiljø (ppe) `https://losoreregisteret.ppe.brreg.no/registerinfo`
* For produksjon `https://losoreregisteret.brreg.no/registerinfo`

### Henting av endringslogg 

#### Beskrivelse

Endepunktet tar imot en forespørsel med felter *lowerCutoff* for tidspunkt-avgrensning og *lastSortValues* for paginering.

*Merk:* Kun rettsstiftelser nyere enn 30 dager vil inkluderes i responsen, uavhengig av om *lowerCutoff* settes før dette.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens organisasjonsnummer, og dette organisasjonsnummeret skal være gyldig samt ha en gyldig avtale for å kunne hente ut opplysninger i Løsøreregisteret.
* Det sjekkes at avtalepartens organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.

## Paginering

Grunnet store datamengder er det nødvendig å paginere requests og respons til tjenesten. Dette gjøres ved hjelp av feltet *"lastSortValues"*. 
For å få første page skal dette feltet være *null*, deretter skal man sette dette feltet til verdien av feltet *"sortValues"* fra forrige response.
Dette gjør at tjenesten er istand til å vite hvilken side av datasettet den skal returnere.

*Merk:* Siste side vil ha 0 rettsstiftelser, og vil ikke inneholde *"sortValues"*.
Dette vil gjelde første side hvis det ikke har vært endringer på rettsstiftelser etter tidspunktet angitt av *lowerCutoff*.

#### Request
Første request før paginering vil kunne se slik ut:
```json
{
    "lowerCutoff": "2020-11-04T10:00:00.000+02:00",
    "lastSortValues": null
}
```
Deretter vil man, basert på *"sortValues"* fra forrige [response](#eksempelrespons), utforme en request som dette:
```json
{
    "lowerCutoff": "2020-11-04T10:00:00.000+02:00",
    "lastSortValues": [
        1635417473003,
        "6e470485-b12d-4e49-864e-34a2c50c1f65"
    ]
}
```

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om rettsstiftelsene.

##### Eksempelrespons

```json
{
  "sistEndretSisteInnslag": "2022-03-31T12:00:02.359656Z",
  "sortValues": [
    1648728002359,
    "d9022f9f-efc0-4aa9-9eea-73fc8ea84898"
  ],
  "antallRettsstiftelser": 1000,
  "rettsstiftelser": [
    {
      "dokumentnummer": "2022001374",
      "type": "rettsstiftelsestype.sap",
      "typeBeskrivelse": "Salgspant",
      "innkomsttidspunkt": "2022-01-03T08:10:00Z",
      "utlopRettsvernstid": "2042-01-03",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.panthaver",
          "rolletypeBeskrivelse": "Panthaver",
          "identifikator": "310648876"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.pantsetter",
          "rolletypeBeskrivelse": "Pantsetter",
          "navn": "PLUTSELIG MORMOR",
          "identifikator": "13888998238"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "XY1012"
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
            "belop": 3214400.0,
            "valuta": "NOK"
          }
        ],
        "kravSalgspant": "kravsalgspant.lan.til.kjoper",
        "kravSalgspantBeskrivelse": "lån som tredjeperson har ydet kjøperen"
      }
    },
    {
      "dokumentnummer": "2022001829",
      "type": "rettsstiftelsestype.frh",
      "typeBeskrivelse": "Fratakelse av rettslig handleevne",
      "innkomsttidspunkt": "2022-02-05T08:10:00Z",
      "beslutningstidspunkt": "2022-02-04T23:00:00Z",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.vergemalsmyndighet",
          "rolletypeBeskrivelse": "Vergemålsmyndighet",
          "identifikator": "315524148"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.undervergemal",
          "rolletypeBeskrivelse": "Under vergemål",
          "navn": "AUTORISERT INNHEGNING",
          "identifikator": "06821349425"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.verge",
          "rolletypeBeskrivelse": "Verge",
          "navn": "OBSERVANT HERBARIUM",
          "identifikator": "06841848363"
        }
      ],
      "vergemaal": {
        "personligForhold": true,
        "okonomiskeForhold": true,
        "varighet": "varighet.midlertidig",
        "varighetBeskrivelse": "midlertidig"
      }
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
          "identifikator": "17071150380"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "AX10100"
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
      "dokumentnummer": "5020000011",
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
          "identifikator": "17071150380"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.vp.strukturert",
          "typeBeskrivelse": "Verdipapir strukturert særskilt identifisert",
          "identifiseringsmaateFormuesgode": {
            "organisasjonsnummer": "315524148",
            "antallAksjer": "62",
            "aksjeklasse": "aksjeklasse.b",
            "aksjeklasseBeskrivelse": "B-aksjer"
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
| 403         | Feil under autentisering av abonnent                                           |

##### Eksempelrespons feilmelding

```json
{
  "sokeparameter": null,
  "oppslagstidspunkt": null,
  "antallRettsstiftelser": null,
  "rettsstiftelser": null,
  "korrelasjonsid": "abd970cf-dae9-45cc-a9af-2011e512f96b",
  "tidspunkt": "2022-04-29 15:03:42",
  "feilmelding": "Feil under autentisering av abonnent"
}
```

---
