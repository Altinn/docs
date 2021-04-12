---
title: Tilsynskoordineringer
description: Datamodell og schema
weight: 2
---

### Eksempel
```json
{{
  "tilsynskoordineringer": [
    {
      "tildaenhet": "974720760",
      "tilsynutfoertav": "222222222",
      "ansvarligtilsynsmyndighet": "223344556",
      "kontrolladresser": [
        {
          "lokalitetsreferanse": 427760,
          "lokalitetsbeskrivelse": "Enda ei rønne",
          "lokalitetsnoekkelord": "fairly fat dinosaur",
          "lengdegrad": "427760",
          "breddegrad": "427760",
          "bygningsnummer": "427760",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Gåssvingen 59, 0640 Oslo",
          "adressenummer": "427760",
          "postnummer": "Postnummer",
          "poststedsnavn": "fairly fat dinosaur",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020"
        },
        {
          "lokalitetsreferanse": 427760,
          "lokalitetsbeskrivelse": "Enda ei rønne",
          "lokalitetsnoekkelord": "fairly fat dinosaur",
          "lengdegrad": "427760",
          "breddegrad": "427760",
          "bygningsnummer": "427760",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Gåssvingen 59, 0640 Oslo",
          "adressenummer": "427760",
          "postnummer": "Postnummer",
          "poststedsnavn": "fairly fat dinosaur",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020"
        }
      ],
      "kontaktpunkt": [
        {
          "rapportansvarlig": "Ansvarligheten selv",
          "avdeling": "fairly fat dinosaur",
          "telefonnummer": "12345678",
          "epost": "fairlyfatdinosaur@fairlyfatdinosaurcom",
          "adresse": "Gåssvingen 59, 0640 Oslo"
        }
      ],
      "bekymringsmeldinger": [
        {
          "tilsynsmyndighet": "12345678",
          "lokalitetsreferanse": 1,
          "melding": "VIKTIG BESKJED NR 1",
          "bekymringsdato": "2017-07-14T00:00:00"
        },
        {
          "tilsynsmyndighet": "12345678",
          "lokalitetsreferanse": 1,
          "melding": "VIKTIG BESKJED NR 2",
          "bekymringsdato": "2017-07-14T00:00:00"
        }
      ],
      "aapnetilsyn": 12,
      "planlagteKontroller": [
        {
          "planlagtkontrolldato": "2021-04-30T14:34:17.2976235+02:00",
          "varighet": 1,
          "tilsynstema": "tema",
          "aktivitet": "aktivitet",
          "aktivitetsutfoerelse": "aktivitetsutførelsestype",
          "observasjon": "observasjoner",
          "samtidigKontroll": [
            {
              "tilsynsmyndighet": "123456788",
              "tilsynstema": "tema",
              "aktivitetsutfoerelse": "aktivitetseksekvering"
            }
          ]
        }
      ],
      "kampanjer": [
        {
          "kampanjenavn": "Laktosesjekk",
          "beskrivelse": "Tilsyn av iskremselgere",
          "startdato": "2021-04-28T14:34:17.2977116+02:00",
          "sluttdato": "2021-04-29T14:34:17.2977135+02:00"
        }
      ]
    }
  ]
}
```