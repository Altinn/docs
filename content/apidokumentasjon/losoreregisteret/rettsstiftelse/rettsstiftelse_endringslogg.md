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
        1605043177155,
        "ada79f89-8e02-4dd7-a94a-60a794ee808e"
    ]
}
```

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om rettsstiftelsene.

##### Eksempelrespons

```json
{
    "sistEndretForrigeRequest": "2020-11-05T00:00:00+02:00",
    "sortValues": [
        1605043177155,
        "ada79f89-8e02-4dd7-a94a-60a794ee808e"
    ],
    "antallRettsstiftelser": 1,
    "rettsstiftelser": [
        {
            "dokumentnummer": "2020000001",
            "type": "rettsstiftelsestype.utp",
            "innkomsttidspunkt": "2020-02-26T15:15:51Z",
            "status": "statusregistreringsobjekt.tl",
            "utlopRettsvernstid": "2030-02-26",
            "avgrensingRettsstiftelse": "JA",
            "roller": [
                {
                    "rolleinnehaverType": "BRPERSON",
                    "navn": "HENSIKTSMESSIG CAMPINGVOGN",
                    "identifikator": "04021850530"
                }
            ],
            "formuesgoder": [
                {
                    "type": "formuesgodetype.mv.e",
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
                ],
                "kravSalgspant": null,
                "kravFordringer": null
            },
            "gjeldsordning": {
                "type": "gjeldsordningstype.tvungen",
                "gjeldsordningsperiodeFraDato": "2020-04-02",
                "gjeldsordningsperiodeTilDato": "2020-08-17"
            },
            "vergemaal": {
                "personligForhold": true,
                "okonomiskeForhold": false,
                "varighet": "varighet.varig"
            },
            "skifteutlegg": {
                "type": "skifteutleggtype.gjeld"
            },
            "paategninger": [
                {
                    "paategning": "Påtegning"
                }
            ],
            "prioritetsvikelser": [
                {
                    "dokumentnummer": "2020000001",
                    "rettighetshaverFremtidig": "Rettighetshaver",
                    "belopFremtidig": {
                      "belop": 2.0,
                      "valuta": "NOK"
                    }
                }
            ]
        }
    ]
}
```

---

## Feilmeldinger

Dersom man ikke får HTTP-status 200, så får man en melding fra tjenesten i JSON-format.

| HTTP-kode   | Feilmelding                                                                                 |
|:----------- |:------------------------------------------------------------------------------------------- |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                            |

##### Eksempelrespons feilmelding

```json
{
    "korrelasjonsid": "cba2c68f-2f04-4104-9dbf-8e69c5e36c5c",
    "tidspunkt": "2020-10-28 13:23:35",
    "feilmelding": "Forespørsel inneholder ingen gyldig bearer token"
}
```

---
