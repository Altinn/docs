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
    "sistEndretSisteInnslag": "2021-10-28T12:37:53.003478+02:00",
    "sortValues": [
        1635417473003,
        "6e470485-b12d-4e49-864e-34a2c50c1f65"
    ],
    "antallRettsstiftelser": 12,
    "rettsstiftelser": [
        {
            "dokumentnummer": "2021000417",
            "type": "rettsstiftelsestype.utp",
            "typeBeskrivelse": "Utleggspant",
            "innkomsttidspunkt": "2021-10-25T08:10:00Z",
            "beslutningstidspunkt": "2021-10-08T13:15:00Z",
            "status": "statusregistreringsobjekt.tl",
            "statusBeskrivelse": "tinglyst",
            "utlopRettsvernstid": "2026-10-25",
            "roller": [
                {
                    "rolleinnehaverType": "VIRKSOMHET",
                    "rolletype": "rolletype.namsmyndighet",
                    "rolletypeBeskrivelse": "Namsmyndighet",
                    "identifikator": "810843012"
                },
                {
                    "rolleinnehaverType": "VIRKSOMHET",
                    "rolletype": "rolletype.prosessfullmektig",
                    "rolletypeBeskrivelse": "Prosessfullmektig",
                    "identifikator": "810843012"
                },
                {
                    "rolleinnehaverType": "VIRKSOMHET",
                    "rolletype": "rolletype.saksoker",
                    "rolletypeBeskrivelse": "Saksøker",
                    "identifikator": "810843012"
                },
                {
                    "rolleinnehaverType": "BRPERSON",
                    "rolletype": "rolletype.saksokt",
                    "rolletypeBeskrivelse": "Saksøkt",
                    "navn": "Anne Tysk Ananas",
                    "identifikator": "01082621284"
                }
            ],
            "formuesgoder": [
                {
                    "type": "formuesgodetype.mv.e",
                    "typeBeskrivelse": "motorvogn registrert",
                    "identifiseringsmaateFormuesgode": {
                        "registreringsnummerMotorvogn": "XY1016"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 1
                    }
                },
                {
                    "type": "formuesgodetype.mv.e",
                    "typeBeskrivelse": "motorvogn registrert",
                    "identifiseringsmaateFormuesgode": {
                        "registreringsnummerMotorvogn": "XY1013"
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
                        "belop": 85000.0,
                        "valuta": "NOK"
                    }
                ],
                "kravSalgspant": null,
                "kravSalgspantBeskrivelse": null,
                "kravFordringer": null,
                "kravFordringerBeskrivelse": null
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
