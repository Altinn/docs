---
title: Tilsynsrapporter
description: Datamodell og schema
weight: 3
---

### Eksempel
```json
{
  "tilsynsrapporter": [
    {
      "tildaenhet": "123456789",
      "tilsynutfoertav": "222222222",
      "ansvarligtilsynsmyndighet": "222222222",
      "tilsynsegenskaper": {
        "kommunalt": "ja",
        "storulykke": "nei",
        "uanmeldt": "ja",
        "internTilsynsid": "e1d1c5e4-bb40-40e3-97ad-8da7efc25105",
        "tilsynsutvelgelse": "Veldig suspekte folk",
        "tilsynsstatus": "aapen",
        "tilsynstema": "Fem tema om dagen gjør godt for magen",
        "tilsynsnoekkelord": "key, word",
        "nettrapport": "https://www.vg.no"
      },
      "kontrolladresse": [
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
      "tilsynsaktiviteter": [
        {
          "tilsynsaktivitetreferanse": 1,
          "lokalitetsreferanse": 1,
          "internKontrollid": "22645022-198f-4f01-a865-ddf3b6a0f776",
          "kontrollobjekt": "123456789",
          "dato": "2021-04-08T14:34:17.2190696+02:00",
          "varighet": 1,
          "aktivitet": "aktivitet",
          "aktivitetsutfoerelse": "fysisk",
          "observasjon": "Vi kikket på en god stund",
          "samtidigKontroll": [
            {
              "tilsynsmyndighet": "222222222",
              "tilsynstema": "tema",
              "aktivitetsutfoerelse": ""
            }
          ],
          "bekymringsmeldinger": [
            {
              "tilsynsmyndighet": "12345678",
              "melding": "VIKTIG BESKJED"
            },
            {
              "tilsynsmyndighet": "12345678",
              "melding": "VIKTIG BESKJED"
            }
          ]
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
      "tilsynsnotater": "Notater, notater, notater i lange baner",
      "bruddOgReaksjoner": [
        {
          "tilsynsaktivitetreferanse": 427760,
          "lokalitetsreferanse": 427760,
          "utredning": "Forklaring",
          "lovparagraf": "427760",
          "reaksjonsdato": "2017-07-14T00:00:00",
          "alvorsgrad": [
            {
              "reaksjonsverdi": 427760,
              "reaksjonstype": "Spesifisert type reaksjon",
              "reaksjonsklasse": 427760,
              "lavreaksjon": 427760,
              "hoeyreaksjon": 427760,
              "lavalvorsgrad": 427760,
              "hoeyalvorsgrad": 427760
            }
          ],
          "oppfoelgingspaaminnelser": 427760
        }
      ]
    }
  ]
}
```
