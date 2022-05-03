---
title: Totalbestand 
description: Beskrivelser av API innen domene Rettsstiftelse
weight: 150
---

## Bruksmønster

Tjenestene for å hente alle rettsstiftelser, og abonnere på endringene er delt inn i totalbestand og endringslogg. Totalbestand er endepunktet man bruker for å hente hele den aktive bestanden opp til og med et bestemt tidspunkt.
Når man har hentet alt som var tilgjengelig fra totalbestanden skal man bruke endringslogg endepunktet for å lytte på endringer i datasettet. Av denne grunn er tjenesten avgrenset slik at man med endringsloggen kun kan hente rettsstiftelser
som ble prosessert iløpet av de siste 30 dagene.

## Stegvis fremgangsmåte for å hente og vedlikeholde bestanden:

1. Kall totalbestand endepunktet med *"upperCutoff"* med tidspunkt da hentingen ble påbegynt, paginer igjennom resultatene som vist nedenfor.
2. Når man mottar en tom page har man hele totalbestanden opp til tidspunktet, ta med tidspunktet brukt i *"upperCutOff"* til bruk i endringslogg.
3. Kall endringslogg med feltet *"lowerCutoff"* satt til dette tidspunktet, paginer igjennom på tilsvarende måte.
4. Når man når tom side har man endringsloggen frem til nå. Ta vare på feltet *sistEndretSisteInnslag* fra siste page.
5. Vent til man ønsker å hente endringslogg igjen, og gjenta fra steg 3.

## Grensesnittbeskrivelse

| HTTP-metode   | URL                                                       | Beskrivelse                                                                   |
|:------------- |:----------------------------------------------------------|:------------------------------------------------------------------------------|
| POST          | https://\{domene\}/api/v1/rettsstiftelse/totalbestand     | Hent alle opplysninger om aktive rettstiftelser opp til et ønsket tidspunkt   |

**Domener**:

* For testmiljø (ppe) `https://losoreregisteret.ppe.brreg.no/registerinfo`
* For produksjon `https://losoreregisteret.brreg.no/registerinfo`

### Henting av totalbestand 

#### Beskrivelse

Tjenesten tar imot en forespørsel med feltene *upperCutOff* for tidspunkt-avgrensning og *lastSortValues* for paginering.

#### Validering

* Maskinport-tokenet som blir sendt inn er knyttet til avtalepartens organisasjonsnummer, og dette organisasjonsnummeret skal være gyldig samt ha en gyldig avtale for å kunne hente ut opplysninger i Løsøreregisteret.
* Avgrensningsverdien *upperCutoff* i request-body er en timestamp med tidssone på formatet "YYYY-MM-DDTHH:MM:SS.mmm+HH:MM", det valideres at feltet ikke peker frem i tid. 
* Det sjekkes at avtalepartens organisasjonsnummer er registrert og ikke slettet i Enhetsregisteret. Dersom det ikke er registrert, eller er slettet, returneres det en feilmelding.

## Paginering

Grunnet store datamengder er det nødvendig å paginere requests og respons til tjenesten. Dette gjøres ved hjelp av feltet *"lastSortValues"*.
Ved første forespørsel skal dette feltet være *null*, deretter skal det settes til verdien til feltet *"sortValues"* i responsen fra forrige request.
Dette gjør at tjenesten er istand til å vite hvilken side av datasettet den skal returnere.

*Merk:* Siste side vil ha 0 rettsstiftelser, og vil ikke inneholde *"sortValues"*.

#### Request
Første request før paginering vil kunne se slik ut:
```json
{
    "upperCutoff": "2020-11-18T00:00:00.000+02:00",
    "lastSortValues": null
}
```
Deretter vil man, basert på *"sortValues"* fra forrige [response](#eksempelrespons), utforme en request som dette:
```json
{
    "upperCutoff": "2020-11-18T00:00:00.000+02:00",
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
  "upperCutoffForrigeRequest": "2022-05-01T22:00:00Z",
  "sortValues": [
    1646772480719,
    "35db4a03-2e2d-4fc3-ab01-178e8bc41bcc"
  ],
  "antallRettsstiftelser": 1000,
  "rettsstiftelser": [
    {
      "dokumentnummer": "2022905377",
      "type": "rettsstiftelsestype.plr",
      "typeBeskrivelse": "Pant i landbruksredskaper",
      "innkomsttidspunkt": "2016-09-22T15:49:58.023Z",
      "utlopRettsvernstid": "2036-09-22",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.panthaver",
          "rolletypeBeskrivelse": "Panthaver",
          "identifikator": "810844442"
        },
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.pantsetter",
          "rolletypeBeskrivelse": "Pantsetter",
          "identifikator": "810843942"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.pantsetter",
          "rolletypeBeskrivelse": "Pantsetter",
          "navn": "BESTEMT HALV GALOPPFJERNKONTROLL",
          "identifikator": "20088001134"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.lb.t",
          "typeBeskrivelse": "landbruksredskap",
          "identifiseringsmaateFormuesgode": {
            "avgrensingTingsinnbegrep": "avgrensingtingsinnbegrep.hel",
            "avgrensingTingsinnbegrepBeskrivelse": "i sin helhet, slik det er til enhver tid",
            "beskrivelseAvgrensing": ""
          },
          "eierandel": {}
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
      "dokumentnummer": "2022905378",
      "type": "rettsstiftelsestype.fac",
      "typeBeskrivelse": "Pant i fordringer (factoring)",
      "innkomsttidspunkt": "2016-09-22T15:49:58.023Z",
      "utlopRettsvernstid": "2036-09-22",
      "roller": [
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.pantsetter",
          "rolletypeBeskrivelse": "Pantsetter",
          "identifikator": "810843942"
        },
        {
          "rolleinnehaverType": "BRPERSON",
          "rolletype": "rolletype.pantsetter",
          "rolletypeBeskrivelse": "Pantsetter",
          "navn": "BESTEMT HALV GALOPPFJERNKONTROLL",
          "identifikator": "20088001134"
        },
        {
          "rolleinnehaverType": "VIRKSOMHET",
          "rolletype": "rolletype.panthaver",
          "rolletypeBeskrivelse": "Panthaver",
          "identifikator": "810844442"
        }
      ],
      "formuesgoder": [
        {
          "type": "formuesgodetype.fo.t",
          "typeBeskrivelse": "fordringer tingsinnbegrep",
          "identifiseringsmaateFormuesgode": {
            "avgrensingTingsinnbegrep": "avgrensingtingsinnbegrep.hel",
            "avgrensingTingsinnbegrepBeskrivelse": "i sin helhet, slik det er til enhver tid",
            "beskrivelseAvgrensing": "",
            "avtaletypeFordring": "avtaletypefordring.har",
            "avtaletypeFordringBeskrivelse": "har"
          },
          "eierandel": {}
        }
      ],
      "krav": {
        "belop": [
          {
            "belop": 65000.0,
            "valuta": "NOK"
          }
        ],
        "kravFordringer": "kravfordringer.avhend",
        "kravFordringerBeskrivelse": "avhendelse av enkle pengekrav i næringsvirksomheten"
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

| HTTP-kode   | Feilmelding                                                                                |
|:----------- |:-------------------------------------------------------------------------------------------|
| 400         | Totalbestand kan ikke hentes med upperCutoff frem i tid.                                                                                           |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                           |

##### Eksempelrespons feilmelding

```json
{
    "korrelasjonsid": "cba2c68f-2f04-4104-9dbf-8e69c5e36c5c",
    "tidspunkt": "2020-10-28 13:23:35",
    "feilmelding": "upperCutOff kan ikke peke frem i tid"
}
```

---
