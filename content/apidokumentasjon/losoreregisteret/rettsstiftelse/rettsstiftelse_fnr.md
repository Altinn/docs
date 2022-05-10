---
title: Henting av rettsstiftelser knyttet til person
description: Beskrivelser av API innen domene Rettsstiftelse
weight: 140
---

## Grensesnittbeskrivelse

| HTTP-metode   | URL                                                       | Beskrivelse                                                                      |
|:------------- |:----------------------------------------------------------|:---------------------------------------------------------------------------------|
| GET           | https://\{domene\}/api/v1/rettsstiftelse/fnr/\{fnr}\?sluttbrukerOrgNr={sluttbrukerOrgNr}      | Hent opplysninger om rettstiftelser knyttet til et fødselsnummer eller d-nummer. SluttbrukerOrgNr er valgfri |

**Domener**:

* For testmiljø (ppe) `https://losoreregisteret.ppe.brreg.no/registerinfo`
* For produksjon `https://losoreregisteret.brreg.no/registerinfo`

### Oppslag på fødselsnummer

#### Beskrajourivelse

Tjenesten tar imot en forespørsel om oppslag på et fødselsnummer eller d-nummer, forespørselen valideres før utførelsen og returnerer opplysninger om kun aktive rettstiftelser på fødselsnummeret eller d-nummeret.

#### Request

Tar i mot et fødselsnummer eller d-nummer (fnr) som del av URL.
Valgfri parameter "sluttbrukerOrgNr" muliggjør at konsumenten kan presisere at oppslaget gjøres på vegne av en tredjepart som har avtale med konsumenten om uthenting av data. Dette er mest aktuelt for avtaleparter som omtales som distributører. Parameteren forventes utformet som et standard organisasjonsnummer fra Enhetsregisteret.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens orgnummer, og dette orgnummeret skal være gyldig samt ha en gyldig avtale om å kunne hente ut opplysninger i Løsøreregisteret.
* Forespørselen skal alltid inneholde fnr som det gjøres oppslag på.
* Dersom forespørselen inneholder et fnr som ikke er lovlig oppbygd, returneres det en feilmelding.
* Det sjekkes at avtalepartens organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.
* Dersom forespørselen inneholder parameter "sluttbrukerOrgNr" som ikke er lovlig oppbygd, returneres det en feilmelding.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om rettsstiftelsene.

##### Eksempelrespons

```json
{
  "sokeparameter": "08029969222",
  "oppslagstidspunkt": "2022-04-29T14:49:37.079388",
  "antallRettsstiftelser": 148,
  "rettsstiftelser": [
    {
      "dokumentnummer": "2022909674",
      "type": "rettsstiftelsestype.utp",
      "typeBeskrivelse": "Utleggspant",
      "innkomsttidspunkt": "2021-01-10T15:49:58.023Z",
      "beslutningstidspunkt": "2021-01-09T09:02:00Z",
      "status": "statusregistreringsobjekt.tl",
      "statusBeskrivelse": "tinglyst",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.namsmyndighet",
          "rolletypeBeskrivelse": "Namsmyndighet",
          "navn": "ENGSTELIG TIGER AS",
          "identifikator": "311243187",
          "forretningsadresse": {
            "land": "Norge",
            "landkode": "NO",
            "kommune": "STJØRDAL",
            "kommunenummer": "5035",
            "postnummer": "7504",
            "poststed": "STJØRDAL",
            "adresse": [
              "Stokmovn 39"
            ]
          }
        },
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.prosessfullmektig",
          "rolletypeBeskrivelse": "Prosessfullmektig",
          "navn": "ENORM TIGER AS",
          "identifikator": "311168991",
          "forretningsadresse": {
            "land": "Norge",
            "landkode": "NO",
            "kommune": "STJØRDAL",
            "kommunenummer": "5035",
            "postnummer": "7504",
            "poststed": "STJØRDAL",
            "adresse": [
              "Stokmovn 39"
            ]
          }
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.prosessfullmektig",
          "rolletypeBeskrivelse": "Prosessfullmektig",
          "navn": "Annie Andersson",
          "vegadresse": {
            "bruksenhetsnummer": "H0102",
            "adressenavn": "Bakken",
            "nummer": 48,
            "poststed": "SANNIDAL",
            "postnummer": "3766",
            "kommunenummer": "0815"
          }
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.saksoker",
          "rolletypeBeskrivelse": "Saksøker",
          "navn": "MINKENDE BRUKSRETT",
          "matrikkeladresse": {
            "matrikkelnummer": {
              "kommunenummer": "0301",
              "gaardsnummer": 0,
              "bruksnummer": 3,
              "festenummer": 0
            },
            "undernummer": 0,
            "poststed": "OSLO",
            "postnummer": "0962"
          }
        },
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.saksoker",
          "rolletypeBeskrivelse": "Saksøker",
          "navn": "ENSOM TIGER AS",
          "identifikator": "313184293",
          "forretningsadresse": {
            "land": "Norge",
            "landkode": "NO",
            "kommune": "STJØRDAL",
            "kommunenummer": "5035",
            "postnummer": "7504",
            "poststed": "STJØRDAL",
            "adresse": [
              "Stokmovn 39"
            ]
          }
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.saksokt",
          "rolletypeBeskrivelse": "Saksøkt",
          "navn": "HENSIKTSMESSIG CAMPINGVOGN",
          "matrikkeladresse": {
            "matrikkelnummer": {
              "kommunenummer": "0301",
              "gaardsnummer": 0,
              "bruksnummer": 34,
              "festenummer": 0
            },
            "undernummer": 0,
            "poststed": "OSLO",
            "postnummer": "0561"
          }
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
        },
        {
          "type": "formuesgodetype.pe.s",
          "typeBeskrivelse": "penger",
          "identifiseringsmaateFormuesgode": {
            "identifikator": "Innestående på konto",
            "identifiseringstype": "identifiseringstype.konto",
            "identifiseringstypeBeskrivelse": "Innestående på konto"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        },
        {
          "type": "formuesgodetype.fo.s",
          "typeBeskrivelse": "fordringer særskilt identifisert",
          "identifiseringsmaateFormuesgode": {
            "identifikator": "Tilgodehavende hos Statens Landbruksforvaltning - 2021",
            "identifiseringstype": "identifiseringstype.generellBeskrivelse",
            "identifiseringstypeBeskrivelse": "Beskrivelse av formuesgode"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        },
        {
          "type": "formuesgodetype.fo.s",
          "typeBeskrivelse": "fordringer særskilt identifisert",
          "identifiseringsmaateFormuesgode": {
            "identifikator": "Tilgodehavende hos TONO",
            "identifiseringstype": "identifiseringstype.generellBeskrivelse",
            "identifiseringstypeBeskrivelse": "Beskrivelse av formuesgode"
          },
          "eierandel": {}
        },
        {
          "type": "formuesgodetype.fo.s",
          "typeBeskrivelse": "fordringer særskilt identifisert",
          "identifiseringsmaateFormuesgode": {
            "identifikator": "Tilgodehavende hos GRAMO",
            "identifiseringstype": "identifiseringstype.generellBeskrivelse",
            "identifiseringstypeBeskrivelse": "Beskrivelse av formuesgode"
          },
          "eierandel": {}
        },
        {
          "type": "formuesgodetype.pe.s",
          "typeBeskrivelse": "penger",
          "identifiseringsmaateFormuesgode": {
            "identifikator": "Innestående på konto",
            "identifiseringstype": "identifiseringstype.konto",
            "identifiseringstypeBeskrivelse": "Innestående på konto"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        },
        {
          "type": "formuesgodetype.pe.s",
          "typeBeskrivelse": "penger",
          "identifiseringsmaateFormuesgode": {
            "identifikator": "Innestående på verdipapirkonto",
            "identifiseringstype": "identifiseringstype.verdipapirkonto",
            "identifiseringstypeBeskrivelse": "Innestående på verdipapirkonto"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        },
        {
          "type": "formuesgodetype.pe.s",
          "typeBeskrivelse": "penger",
          "identifiseringsmaateFormuesgode": {
            "identifikator": "Beslag gjort av Politiet",
            "identifiseringstype": "identifiseringstype.generellBeskrivelse",
            "identifiseringstypeBeskrivelse": "Beskrivelse av formuesgode"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        },
        {
          "type": "formuesgodetype.pe.s",
          "typeBeskrivelse": "penger",
          "identifiseringsmaateFormuesgode": {
            "identifikator": "Innestående på konto",
            "identifiseringstype": "identifiseringstype.konto",
            "identifiseringstypeBeskrivelse": "Innestående på konto"
          },
          "eierandel": {
            "teller": 1,
            "nevner": 1
          }
        },
        {
          "type": "formuesgodetype.vp.strukturert",
          "typeBeskrivelse": "Verdipapir strukturert særskilt identifisert",
          "identifiseringsmaateFormuesgode": {
            "organisasjonsnummer": "313665704"
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
            "belop": 65000.0,
            "valuta": "NOK"
          }
        ]
      }
    },
    {
      "dokumentnummer": "1000000184",
      "type": "rettsstiftelsestype.frh",
      "typeBeskrivelse": "Fratakelse av rettslig handleevne",
      "innkomsttidspunkt": "2022-04-30T19:00:00Z",
      "beslutningstidspunkt": "2022-04-28T22:00:00Z",
      "status": "statusregistreringsobjekt.rg",
      "statusBeskrivelse": "registrert",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.vergemalsmyndighet",
          "rolletypeBeskrivelse": "Vergemålsmyndighet",
          "identifikator": "313184293"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.undervergemal",
          "rolletypeBeskrivelse": "Under vergemål",
          "navn": "REDELIG STASJON",
          "vegadresse": {
            "bruksenhetsnummer": "H0101",
            "adressenavn": "Kjøkkelvikbrekkene",
            "nummer": 158,
            "bokstav": "S",
            "poststed": "LODDEFJORD",
            "postnummer": "5178",
            "kommunenummer": "4601"
          }
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.verge",
          "rolletypeBeskrivelse": "Verge",
          "navn": "OBSERVANT HERBARIUM",
          "vegadresse": {
            "bruksenhetsnummer": "H0101",
            "adressenavn": "Austmannsvegen",
            "nummer": 1,
            "poststed": "SAND",
            "postnummer": "4230",
            "kommunenummer": "1134"
          }
        }
      ],
      "vergemaal": {
        "personligForhold": false,
        "okonomiskeForhold": true,
        "varighet": "varighet.midlertidig",
        "varighetBeskrivelse": "midlertidig",
        "tidsbegrensetTilDato": "2022-11-25"
      }
    },
    {
      "dokumentnummer": "2022001344",
      "type": "rettsstiftelsestype.gjo",
      "typeBeskrivelse": "Gjeldsordning",
      "innkomsttidspunkt": "2022-01-05T08:10:00Z",
      "beslutningstidspunkt": "2022-01-04T23:00:00Z",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.namsmann",
          "rolletypeBeskrivelse": "Namsmann",
          "identifikator": "310774375"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.skyldner",
          "rolletypeBeskrivelse": "Skyldner",
          "navn": "HEMMELIGHETSFULL FIL",
          "identifikator": "08899899548"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "BA67891"
          },
          "eierandel": {}
        },
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "NF78945"
          },
          "eierandel": {}
        }
      ],
      "gjeldsordning": {
        "type": "gjeldsordningstype.forhandling",
        "typeBeskrivelse": "åpning av gjeldsforhandling",
        "meldefristKrav": "3",
        "kravMeldesTil": "UNGARSK TIGER AS"
      }
    },
    {
      "dokumentnummer": "2022001356",
      "type": "rettsstiftelsestype.sap",
      "typeBeskrivelse": "Salgspant",
      "innkomsttidspunkt": "2022-01-03T08:10:00Z",
      "utlopRettsvernstid": "2042-01-03",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.panthaver",
          "rolletypeBeskrivelse": "Panthaver",
          "identifikator": "313665704"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.pantsetter",
          "rolletypeBeskrivelse": "Pantsetter",
          "navn": "USYMMETRISK SOLSIKKE ABAKUS",
          "identifikator": "14865095369"
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
            "belop": 985200.0,
            "valuta": "NOK"
          }
        ],
        "kravSalgspant": "kravsalgspant.lan.til.kjoper",
        "kravSalgspantBeskrivelse": "lån som tredjeperson har ydet kjøperen"
      }
    }
  ]
}
```

---

## Feilmeldinger

Dersom man ikke får HTTP-status 200, så får man en melding fra tjenesten i JSON-format.

| HTTP-kode | Feilmelding                                                      |
|:----------|:-----------------------------------------------------------------|
| 400       | Feil i fødselsnummer/organisasjonsnummer, vennligst prøv på nytt |
| 403       | Feil under autentisering av abonnent                             |
| 404       | fnr mangler                                                      |

##### Eksempelrespons feilmelding

```json
{
    "korrelasjonsid": "5d217325-fa5a-47a1-8069-781fa5e1dedc",
    "tidspunkt": "2020-10-28 13:21:45",
    "feilmelding": "Feil i fødselsnummer/organisasjonsnummer, vennligst prøv på nytt"
}
```

---
