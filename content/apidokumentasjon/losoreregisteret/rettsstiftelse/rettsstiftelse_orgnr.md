---
title: Henting av rettsstiftelser knyttet til organisasjon
description: Beskrivelser av API innen domene Rettsstiftelse
weight: 100
---

## Grensesnittbeskrivelse

| HTTP-metode   | URL                                                       | Beskrivelse                                                              |
|:------------- |:----------------------------------------------------------|:-------------------------------------------------------------------------|
| GET           | https://\{domene\}/api/v1/rettsstiftelse/orgnr/\{orgnr\}  | Hent opplysninger om rettstiftelser knyttet til et organisasjonsnummer.  |

**Domener**:

* For testmiljø (ppe) (kommer senere): `https://kommersenere.ppe.brreg.no`
* For prod (kommer senere): `https://kommersenere.brreg.no`

### Oppslag på organisasjonsnummer

#### Beskrivelse

Tjenesten tar imot en forespørsel om oppslag på et organisasjonsnummer, forespørselen valideres før utførelsen og returnerer opplysninger om kun aktive rettstiftelser på organisasjonsnummer.

#### Request

Tar i mot et organisasjonsnummer (orgnr) som del av URL.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens orgnummer, og dette orgnummeret skal være gyldig samt ha en gyldig avtale om å kunne hente ut utlegg.
* Forespørselen skal alltid inneholde orgnr som det gjøres oppslag på.
* Dersom forespørselen inneholder et orgnr som ikke er lovlig oppbygd, returneres det en feilmelding.
* Det sjekkes at sluttbrukers organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om rettsstiftelsene.

Eksempelrespons:

```json
{
    "sokeparameter": "12345678910",
    "oppslagstidspunkt": "2020-03-17T14:45:01.044",
    "antallRettsstiftelser": 3,
    "rettsstiftelser": [
        {
            "dokumentnummer": "2",
            "type": "type",
            "innkomsttidspunkt": "1995-06-05T17:30:00",
            "ajourtidspunkt": "1997-06-05T17:30:00",
            "status": "status",
            "utlopRettsvernstid": "1997-06-05",
            "slettet": "2001-06-05",
            "slettetAarsak": "Følte for å slette",
            "besluttningstidspunkt": "1997-06-05T17:30:00",
            "avgrensingRettstiftelse": "2",
            "losorePrioritetsvikelse": [
                {
                    "dokumentnummer": "2",
                    "panthaverFremtidig": "pantehaver fremtidig",
                    "belopFremtidig": "beløp fremtidig"
                }
            ],
            "forpliktetList": [
                {
                    "navn": "UINTERESSERT null LEVERANDØR",
                    "adresse": "Postadresse(adressegradering=ugradert, vegadresse=null, postboksadresse=null, postadresseIFrittFormat=PostadresseIFrittFormat(adresselinje=[Åsvegen 358], postnummer=2030, poststed=NANNESTAD))"
                }
            ],
            "rettighetshaverList": [
                {
                    "navn": "BLANK TIGER AS",
                    "adresse": "0024"
                }
            ],
            "oppretter": null,
            "annenRolleList": [
                {
                    "navn": "navn",
                    "adresse": "Testgaten"
                }
            ],
            "formuesgodeList": [
                {
                    "type": "entydig",
                    "identifiseringsmaateFormuesgode": {
                        "registreringsnummerMotorvogn": "RM40321"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                },
                {
                    "type": "sarskilt",
                    "identifiseringsmaateFormuesgode": {
                        "uregistrertMotorvognMerke": "merke",
                        "uregistrertMotorvognAarsmodell": "2005",
                        "uregistrertMotorvognIdentifikasjonsnummer": "123",
                        "beskrivelse": "Beskrivelse saarskilt"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                },
                {
                    "type": "tingsinnbegrep",
                    "identifiseringsmaateFormuesgode": {
                        "avgrensingTingsinnbegrep": "Tingsinnbegrep",
                        "beskrivelseAvgrensing": "Beskrivelse avgrensning",
                        "avtaletypeFordring": "Avtaletypefordring"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                }
            ],
            "krav": {
                "belopListe": [
                    {
                        "belop": 3.0,
                        "valuta": "NOK"
                    }
                ],
                "kravSalgspant": "salgspant",
                "kravFordringer": "fordringer"
            },
            "gjeldsordning": {
                "type": "gjeldsorning type",
                "meldefristKrav": null,
                "gjeldsordningsperiodeFraDato": "1997-06-05",
                "gjeldsordningsperiodeTilDato": "1999-06-05"
            },
            "vergemaal": {
                "personligForhold": true,
                "okonomiskeForhold": false,
                "varighet": "1 år"
            },
            "pategningList": [
                {
                    "pategning": "paatengning"
                }
            ]
        },
        {
            "dokumentnummer": "2",
            "type": "type",
            "innkomsttidspunkt": "1997-06-05T17:30:00",
            "ajourtidspunkt": "1997-06-05T17:30:00",
            "status": "status",
            "utlopRettsvernstid": "1997-06-05",
            "slettet": "2001-06-05",
            "slettetAarsak": "Følte for å slette",
            "besluttningstidspunkt": "1997-06-05T17:30:00",
            "avgrensingRettstiftelse": "2",
            "losorePrioritetsvikelse": [
                {
                    "dokumentnummer": "2",
                    "panthaverFremtidig": "pantehaver fremtidig",
                    "belopFremtidig": "beløp fremtidig"
                }
            ],
            "forpliktetList": [
                {
                    "navn": "UINTERESSERT null LEVERANDØR",
                    "adresse": "Postadresse(adressegradering=ugradert, vegadresse=null, postboksadresse=null, postadresseIFrittFormat=PostadresseIFrittFormat(adresselinje=[Åsvegen 358], postnummer=2030, poststed=NANNESTAD))"
                }
            ],
            "rettighetshaverList": [
                {
                    "navn": "BLANK TIGER AS",
                    "adresse": "0024"
                }
            ],
            "oppretter": null,
            "annenRolleList": [
                {
                    "navn": "navn",
                    "adresse": "Testgaten"
                }
            ],
            "formuesgodeList": [
                {
                    "type": "entydig",
                    "identifiseringsmaateFormuesgode": {
                        "registreringsnummerMotorvogn": "RM40321"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                },
                {
                    "type": "sarskilt",
                    "identifiseringsmaateFormuesgode": {
                        "uregistrertMotorvognMerke": "merke",
                        "uregistrertMotorvognAarsmodell": "2005",
                        "uregistrertMotorvognIdentifikasjonsnummer": "123",
                        "beskrivelse": "Beskrivelse saarskilt"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                },
                {
                    "type": "tingsinnbegrep",
                    "identifiseringsmaateFormuesgode": {
                        "avgrensingTingsinnbegrep": "Tingsinnbegrep",
                        "beskrivelseAvgrensing": "Beskrivelse avgrensning",
                        "avtaletypeFordring": "Avtaletypefordring"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                }
            ],
            "krav": {
                "belopListe": [
                    {
                        "belop": 3.0,
                        "valuta": "NOK"
                    }
                ],
                "kravSalgspant": "salgspant",
                "kravFordringer": "fordringer"
            },
            "gjeldsordning": {
                "type": "gjeldsorning type",
                "meldefristKrav": null,
                "gjeldsordningsperiodeFraDato": "1997-06-05",
                "gjeldsordningsperiodeTilDato": "1999-06-05"
            },
            "vergemaal": {
                "personligForhold": true,
                "okonomiskeForhold": false,
                "varighet": "1 år"
            },
            "pategningList": [
                {
                    "pategning": "paatengning"
                }
            ]
        },
        {
            "dokumentnummer": "2",
            "type": "type",
            "innkomsttidspunkt": "1997-08-05T17:30:00",
            "ajourtidspunkt": "1997-06-05T17:30:00",
            "status": "status",
            "utlopRettsvernstid": "1997-06-05",
            "slettet": "2001-06-05",
            "slettetAarsak": "Følte for å slette",
            "besluttningstidspunkt": "1997-06-05T17:30:00",
            "avgrensingRettstiftelse": "2",
            "losorePrioritetsvikelse": [
                {
                    "dokumentnummer": "2",
                    "panthaverFremtidig": "pantehaver fremtidig",
                    "belopFremtidig": "beløp fremtidig"
                }
            ],
            "forpliktetList": [
                {
                    "navn": "BLANK TIGER AS",
                    "adresse": "0024"
                }
            ],
            "rettighetshaverList": [
                {
                    "navn": "UINTERESSERT null LEVERANDØR",
                    "adresse": "Postadresse(adressegradering=ugradert, vegadresse=null, postboksadresse=null, postadresseIFrittFormat=PostadresseIFrittFormat(adresselinje=[Åsvegen 358], postnummer=2030, poststed=NANNESTAD))"
                }
            ],
            "oppretter": null,
            "annenRolleList": [
                {
                    "navn": "navn",
                    "adresse": "Testgaten"
                }
            ],
            "formuesgodeList": [
                {
                    "type": "entydig",
                    "identifiseringsmaateFormuesgode": {
                        "registreringsnummerMotorvogn": "RM40321"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                },
                {
                    "type": "sarskilt",
                    "identifiseringsmaateFormuesgode": {
                        "uregistrertMotorvognMerke": "merke",
                        "uregistrertMotorvognAarsmodell": "2005",
                        "uregistrertMotorvognIdentifikasjonsnummer": "123",
                        "beskrivelse": "Beskrivelse saarskilt"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                },
                {
                    "type": "tingsinnbegrep",
                    "identifiseringsmaateFormuesgode": {
                        "avgrensingTingsinnbegrep": "Tingsinnbegrep",
                        "beskrivelseAvgrensing": "Beskrivelse avgrensning",
                        "avtaletypeFordring": "Avtaletypefordring"
                    },
                    "eierandel": {
                        "teller": 1,
                        "nevner": 2
                    }
                }
            ],
            "krav": {
                "belopListe": [
                    {
                        "belop": 3.0,
                        "valuta": "NOK"
                    }
                ],
                "kravSalgspant": "salgspant",
                "kravFordringer": "fordringer"
            },
            "gjeldsordning": {
                "type": "gjeldsorning type",
                "meldefristKrav": null,
                "gjeldsordningsperiodeFraDato": "1997-06-05",
                "gjeldsordningsperiodeTilDato": "1999-06-05"
            },
            "vergemaal": {
                "personligForhold": true,
                "okonomiskeForhold": false,
                "varighet": "1 år"
            },
            "pategningList": [
                {
                    "pategning": "paatengning"
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
| 400         | Ugyldig orgnr                                                              |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                            |
| 404         | Organisasjonsnummer mangler                                                                 |
| 404         | orgnr mangler                                                              |

## Under arbeid

.
