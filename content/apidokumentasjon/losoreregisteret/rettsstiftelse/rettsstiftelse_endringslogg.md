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
      "dokumentnummer": "2022947107",
      "type": "rettsstiftelsestype.bff",
      "typeBeskrivelse": "Beslutning om forvaltning av formue",
      "innkomsttidspunkt": "2022-03-15T20:00:00Z",
      "beslutningstidspunkt": "2021-05-18T22:00:00Z",
      "status": "statusregistreringsobjekt.tl",
      "statusBeskrivelse": "tinglyst",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.domstol",
          "rolletypeBeskrivelse": "Domstol",
          "identifikator": "811087602"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.domfelt",
          "rolletypeBeskrivelse": "Domfelt",
          "navn": "TAUS ORIDÉ",
          "identifikator": "10899799696"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "NF55303"
          },
          "eierandel": {
            "teller": 2,
            "nevner": 1
          }
        }
      ]
    },
    {
      "dokumentnummer": "2022947109",
      "type": "rettsstiftelsestype.bff",
      "typeBeskrivelse": "Beslutning om forvaltning av formue",
      "innkomsttidspunkt": "2022-03-17T20:00:00Z",
      "beslutningstidspunkt": "2021-05-18T22:00:00Z",
      "status": "statusregistreringsobjekt.tl",
      "statusBeskrivelse": "tinglyst",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.domstol",
          "rolletypeBeskrivelse": "Domstol",
          "identifikator": "811087602"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.domfelt",
          "rolletypeBeskrivelse": "Domfelt",
          "navn": "INNSIKTSFULL SPESIALIST",
          "identifikator": "13872747782"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "NF55303"
          },
          "eierandel": {
            "teller": 2,
            "nevner": 1
          }
        }
      ]
    },
    {
      "dokumentnummer": "2022947128",
      "type": "rettsstiftelsestype.bff",
      "typeBeskrivelse": "Beslutning om forvaltning av formue",
      "innkomsttidspunkt": "2021-05-20T19:00:00Z",
      "beslutningstidspunkt": "2021-05-18T22:00:00Z",
      "status": "statusregistreringsobjekt.tl",
      "statusBeskrivelse": "tinglyst",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.domstol",
          "rolletypeBeskrivelse": "Domstol",
          "identifikator": "811087602"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.domfelt",
          "rolletypeBeskrivelse": "Domfelt",
          "navn": "OBSERVANT HERBARIUM",
          "identifikator": "06841848363"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.siktet",
          "rolletypeBeskrivelse": "Siktet",
          "navn": "AUTORISERT INNHEGNING",
          "identifikator": "06821349425"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "NF55303"
          },
          "eierandel": {
            "teller": 2,
            "nevner": 1
          }
        }
      ]
    },
    {
      "dokumentnummer": "2022947129",
      "type": "rettsstiftelsestype.bff",
      "typeBeskrivelse": "Beslutning om forvaltning av formue",
      "innkomsttidspunkt": "2021-05-20T19:00:00Z",
      "beslutningstidspunkt": "2021-05-18T22:00:00Z",
      "status": "statusregistreringsobjekt.av",
      "statusBeskrivelse": "avvist",
      "roller": [
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.domfelt",
          "rolletypeBeskrivelse": "Domfelt",
          "navn": "OBSERVANT HERBARIUM",
          "identifikator": "06841848363"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.siktet",
          "rolletypeBeskrivelse": "Siktet",
          "navn": "AUTORISERT INNHEGNING",
          "identifikator": "06821349425"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.mv.e",
          "typeBeskrivelse": "motorvogn registrert",
          "identifiseringsmaateFormuesgode": {
            "registreringsnummerMotorvogn": "NF55303"
          },
          "eierandel": {
            "teller": 2,
            "nevner": 1
          }
        },
        {
          "dokumentnummer": "2022947761",
          "type": "rettsstiftelsestype.sff",
          "typeBeskrivelse": "Stadfestelse av fremtidsfullmakt",
          "innkomsttidspunkt": "2021-10-20T19:00:00Z",
          "beslutningstidspunkt": "2021-10-18T22:00:00Z",
          "status": "statusregistreringsobjekt.rg",
          "statusBeskrivelse": "registrert",
          "avgrensingRettsstiftelse": "",
          "roller": [
            {
              "rolleinnehaverType": "VIRKSOMHET",
              "rolletype": "rolletype.vergemalsmyndighet",
              "rolletypeBeskrivelse": "Vergemålsmyndighet",
              "identifikator": "811087602"
            },
            {
              "rolleinnehaverType": "BRPERSON",
              "rolletype": "rolletype.fullmektig",
              "rolletypeBeskrivelse": "Fullmektig",
              "navn": "PÅPASSELIG ARISTOKRAT",
              "identifikator": "12887197510"
            },
            {
              "rolleinnehaverType": "BRPERSON",
              "rolletype": "rolletype.fullmektig",
              "rolletypeBeskrivelse": "Fullmektig",
              "navn": "AUTORISERT INNHEGNING",
              "identifikator": "06821349425"
            },
            {
              "rolleinnehaverType": "BRPERSON",
              "rolletype": "rolletype.fullmaktsgiver",
              "rolletypeBeskrivelse": "Fullmaktsgiver",
              "navn": "MUNTER KLUT",
              "identifikator": "05910549881"
            }
          ],
          "vergemaal": {
            "personligForhold": true,
            "okonomiskeForhold": true
          }
        },
        {
          "dokumentnummer": "1899000012",
          "type": "rettsstiftelsestype.fac",
          "typeBeskrivelse": "Pant i fordringer (factoring)",
          "innkomsttidspunkt": "2022-03-30T07:48:17Z",
          "status": "statusregistreringsobjekt.tl",
          "statusBeskrivelse": "tinglyst",
          "utlopRettsvernstid": "2042-03-30",
          "roller": [
            {
              "rolleinnehaverType": "BRPERSON",
              "rolletype": "rolletype.panthaver",
              "rolletypeBeskrivelse": "Panthaver",
              "navn": "GRETE KASPERSEN"
            },
            {
              "rolleinnehaverType": "VIRKSOMHET",
              "rolletype": "rolletype.pantsetter",
              "rolletypeBeskrivelse": "Pantsetter",
              "identifikator": "810305002"
            }
          ],
          "formuesgoder": [
            {
              "type": "formuesgodetype.fo.t",
              "typeBeskrivelse": "fordringer tingsinnbegrep",
              "identifiseringsmaateFormuesgode": {
                "avgrensingTingsinnbegrep": "avgrensingtingsinnbegrep.hel",
                "avgrensingTingsinnbegrepBeskrivelse": "i sin helhet, slik det er til enhver tid",
                "avtaletypeFordring": "avtaletypefordring.har",
                "avtaletypeFordringBeskrivelse": "har"
              },
              "eierandel": {}
            }
          ],
          "krav": {
            "belop": [
              {
                "belop": 50000.0,
                "valuta": "NOK"
              }
            ],
            "kravFordringer": "kravfordringer.avhend",
            "kravFordringerBeskrivelse": "avhendelse av enkle pengekrav i næringsvirksomheten"
          },
          "prioritetsvikelser": [
            {
              "rettighetshaverFremtidig": "Fremtidig Rettighetshaver",
              "belopFremtidig": {
                "belop": 1000.0,
                "valuta": "NOK"
              }
            }
          ]
        }
      ]
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
          "identifikator": "811088102"
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
