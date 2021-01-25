---
title: Enhetsinformasjon
description: Datamodell og schema
weight: 1
---

### Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "enhetsinformasjon",
  "title": "Tilda/enhetsinformasjon",
  "definitions": {
    "tilsynsadresse": {
      "$id": "tilsynsadresse",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "lokalitetsreferanse": {
          "type": [
            "string",
            "null"
          ]
        },
        "bygningsnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "bruksenhetsnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "adressenavn": {
          "type": [
            "string",
            "null"
          ]
        },
        "adressenummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "postnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "poststedsnavn": {
          "type": [
            "string",
            "null"
          ]
        },
        "kommunenummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "bydel": {
          "type": [
            "string",
            "null"
          ]
        },
        "fylkesnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "lengdegrad": {
          "type": [
            "string",
            "null"
          ]
        },
        "breddegrad": {
          "type": [
            "string",
            "null"
          ]
        },
        "stedstype": {
          "type": [
            "string",
            "null"
          ]
        },
        "stedbeskrivelse": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "lokalitetsreferanse",
        "bygningsnummer",
        "bruksenhetsnummer",
        "adressenavn",
        "adressenummer",
        "postnummer",
        "poststedsnavn",
        "kommunenummer",
        "bydel",
        "fylkesnummer",
        "lengdegrad",
        "breddegrad",
        "stedstype",
        "stedbeskrivelse"
      ]
    }
  },
  "type": "object",
  "properties": {
    "navn": {
      "type": [
        "string",
        "null"
      ]
    },
    "tilsynsobjektHovedenhet": {
      "type": [
        "string",
        "null"
      ]
    },
    "tilsynsobjekt": {
      "type": [
        "string",
        "null"
      ]
    },
    "besoeksadresse": {
      "$ref": "tilsynsadresse"
    },
    "naeringskode": {
      "type": [
        "string",
        "null"
      ]
    },
    "organisasjonsform": {
      "type": [
        "string",
        "null"
      ]
    },
    "aarligOmsetning": {
      "type": [
        "string",
        "null"
      ]
    },
    "driftsstatus": {
      "type": "string",
      "enum": [
        "konkurs",
        "underAvvikling",
        "underTvangsavviklingEllerTvangsopploesning",
        "ok"
      ]
    }
  }
}
```
### Eksempel

```json
{
  "navn": "Organisasjonen AS",
  "tilsynsobjekt": "123456789",
  "besoeksadresse": {
    "lokalitetsreferanse": null,
    "bygningsnummer": null,
    "bruksenhetsnummer": null,
    "adressenavn": "Adresseveien 9000",
    "adressenummer": null,
    "postnummer": "1415",
    "poststedsnavn": "OPPEGÅRD",
    "kommunenummer": "0021",
    "bydel": null,
    "fylkesnummer": "0301",
    "lengdegrad": null,
    "breddegrad": null,
    "stedstype": null,
    "stedbeskrivelse": null
  },
  "naeringskode": "47.110",
  "organisasjonsform": "AS",
  "aarligOmsetning": "1mnok",
  "driftsstatus": "ok"
}
```