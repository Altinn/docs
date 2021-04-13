---
title: Npdidtilsynsrapporter
description: Datamodell og schema
weight: 10
---

{{% notice note %}}
Under arbeid!
{{% /notice %}}

### Eksempel
```json
{
  "tilsynsrapporter": [
    {
      "npdid": "452345",
      "tildaenhet": "974720760",
      "tilsynutfoertav": "222222222",
      "ansvarligtilsynsmyndighet": "222222222",
      "tilsynsegenskaper": {
        "kommunalt": "ja",
        "storulykke": "nei",
        "uanmeldt": "ja",
        "internTilsynsid": "3cf899fc-cee0-46bc-af4c-df7da404dd8b",
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
          "internKontrollid": "64287058-84fa-4a58-885a-06e7b0a5f5cd",
          "kontrollobjekt": "123456789",
          "dato": "2021-04-08T14:34:17.3417108+02:00",
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
          "bekymringsmelding": [
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