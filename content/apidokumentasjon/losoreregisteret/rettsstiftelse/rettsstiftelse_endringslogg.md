---
title: Henting av endringslogg for rettsstiftelser 
description: Beskrivelser av API innen domene Rettsstiftelse
weight: 100
---

## Bruksmønster

Se siden for totalbestand for en mer helhetlig oversikt av bruksmønsteret for endringslogg og totalbestand.

## Grensesnittbeskrivelse

| HTTP-metode   | URL                                                           | Beskrivelse                                                                   |
|:------------- |:--------------------------------------------------------------|:------------------------------------------------------------------------------|
| POST          | https://\{domene\}/api/v1/rettsstiftelse/endringslogg/eldst   | Hent opplysninger endringer på rettstiftelser fra et ønsket tidspunkt         |

**Domener**:

* For testmiljø (ppe) (kommer senere): `https://kommersenere.ppe.brreg.no`
* For prod (kommer senere): `https://kommersenere.brreg.no`

### Henting av endringslogg 

#### Beskrivelse

Tjenesten tar imot en forespørsel med verdier for *sistEndret* for tidspunkt-avgrensning og *lastSortValues* for paginering.

**merk** sistEndret referer til en timestamp ved lagring av rettsstiftelsen, men det ikke er denne timestampen tidsbegrensningen på 30 dager gjøres på grunnlag av. Om man kaller tjenesten med *"sistEndret": null* vil tjenesten returnere den eldste tilgjengelige endringsloggen.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens orgnummer, og dette orgnummeret skal være gyldig samt ha en gyldig avtale for å kunne hente ut opplysninger i Løsøreregisteret.
* avgrensningsverdien *sistEndret* i request-body er en timestamp med tidszone på formatet "YYYY-MM-DDTHH:MM:SS.mmm+HH:MM", det valideres at tidspunktet ikke er mer enn 30 dager tilbake i tid. 
* Det sjekkes at sluttbrukers organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.

## Paginering

Grunnet store datamengder er det nødvendig å paginere requests og respons til tjenesten. Dette gjøres ved hjelp av feltet *"sortValues"*. Ved første forespørsel skal dette feltet være en *null*, deretter skal man sette dette feltet til verdien til feltet *"sortValues"* i responsen. Dette gjør at tjenesten er istand til å vite hvilke side av datasettet den skal returnere.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om rettsstiftelsene.


#### Request
Første request før paginering vil kunne se slik ut:
```json
{
    "sistEndret": "2020-10-19T22:00:00Z",
    "sortValues": null
}
```
Deretter vil man fra rsponsen utforme en request som dette:
```json
{
    "sistEndret": "2020-10-19T22:00:00Z",
    "sortValues": [
        1605043177234,
        "3a47508e-8db1-4d54-8d6d-86f894798b8f"
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
                    "panthaverFremtidig": "Pantehaver",
                    "belopFremtidig": "2"
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
| 400         | upperCutOff kan ikke peke frem i tid                                                        |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                            |

##### Eksempelrespons feilmelding

```json
{
    "korrelasjonsid": "cba2c68f-2f04-4104-9dbf-8e69c5e36c5c",
    "tidspunkt": "2020-10-28 13:23:35",
    "feilmelding": "sistEndret tidspunkt kan ikke referere til en lagret rettsstiftelse som er mer enn 30 dager gammel."
}
```

---
