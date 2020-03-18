---
title: Rettsstiftelser knyttet til kjøretøy
description: Beskrivelser av API innen domene Rettsstiftelse
weight: 100
---

## UNDER ARBEID

Dette APIet er ikke tilgjengelig ennå, men dokumentasjon er påbegynt og vil oppdateres fortløpende under utviklingen av APIet.

## Innledning

Brønnøysundregistrene tilbyr en begrenset, standardisert maskin-til-maskin-tjeneste (API) som kan benyttes av eksterne partnere for innsyn i rettsstiftelser fra Løsøregisteret.

Denne dokumentasjonen viser hvordan eksterne systemer kan integrere seg mot APIet, og hvordan man benytter seg av tjenesten for å hente data.

## Syntetiske testdata

Når APIet gjøres tilgjengelig vil siden oppdaters med informasjon om syntetiske data i testmiljøet

## API-referanse

Denne tjenesten tilbyr opplysninger om:

* Rettsstiftelser på kjøretøy gitt kjøretøyets registreringsnummer (Merk at oppslag på personlig kjennemerke ikke er støttet)
* +++ (kommer senere)

Dokumentasjon er også i Swagger:

* [Testmiljø (kommer senere)](https://kommersenere.ppe.brreg.no/swagger-ui.html)
* [Produksjonsmiljø (kommer senere)](https://kommersenere.brreg.no/swagger-ui.html)


## Sikkerhetsmekanismer

Siden dette er begrensede API så skal kallende parter autentiseres gjennom [Maskinporten](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html).

For å kunne få tilgang til våre begrensede API er det tre forutsetninger.

1. Virksomhetssertifikat
2. Registrert klient hos Maskinporten.
3. JWT-token fra Maskinporten mot scopet `brreg:losore/tlg`

Tokenet som hentes fra Maskinporten må bli sendt som autorisasjonstoken (Bearer token) når et kall mot Løsøreregisteret blir utført.

Se [veiledning for integrasjon mot Maskinporten]({{<ref "mp-integrasjonsveiledning.md">}}).

[Regelverk](https://lovdata.no/dokument/SF/forskrift/2015-12-11-1668/%C2%A76): Hjemler for tilgjengeliggjøring av data fra Brønnøysundregistrene.

## Grensesnittbeskrivelse

| HTTP-metode   | URL                                                       | Beskrivelse                                                              |
|:------------- |:----------------------------------------------------------|:-------------------------------------------------------------------------|
| GET           | https://\{domene\}/api/v1/rettsstiftelse/regnr/\{regnr\}  | Hent opplysninger om rettstiftelser knyttet til et registreringsnummer.  |


**Domener**:

* For testmiljø (ppe) (kommer senere): `https://kommersenere.ppe.brreg.no`
* For prod (kommer senere): `https://kommersenere.brreg.no`

### Oppslag på registreringsnummer

#### Beskrivelse

Tjenesten tar imot en forespørsel om oppslag på et registreringsnummer, forespørselen valideres før utførelsen og returnerer opplysninger om kun aktive rettstiftelser på registreringsnummeret.

#### Request

Tar i mot et registreringsnummer (regnr) som del av URL.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens orgnummer, og dette orgnummeret skal være gyldig samt ha en gyldig avtale om å kunne hente ut utlegg.
* Forespørselen skal alltid inneholde regnr som det gjøres oppslag på.
* Dersom forespørselen inneholder et regnr som ikke er lovlig oppbygd, returneres det en feilmelding.
* Det sjekkes at sluttbrukers organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.

#### Response

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format, i form av et JSON-objekt som inneholder opplysninger om rettsstiftelsene.

Eksempelrespons:

```json
{
    "sokeparameter": "AB12345",
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
| 400         | Ugyldig regnr                                                              |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                            |
| 404         | Organisasjonsnummer mangler                                                                 |
| 404         | regnr mangler                                                              |

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
| Organisasjonsnummer | Identifikasjonsnummer for organisasjon |
| regnr | Registreringsnummer knyttet til et kjøretøy / tilhenger |

## Under arbeid

.
