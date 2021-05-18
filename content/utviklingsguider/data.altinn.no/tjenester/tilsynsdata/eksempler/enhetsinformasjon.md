---
title: Enhetsinformasjon
description: Datamodell og schema
weight: 1
---

### Eksempel

```json
{
  "tildaenhet": "123456789",
  "tildaenhetNavn": "Organisasjonen AS",
  "tildaenhetHovedenhet": "222222222",
  "besoeksadresse": {
    "lengdegrad": "59.913868",
    "breddegrad": "10.752245",
    "bygningsnummer": "2",
    "bruksenhetsnummer": "Enhetsnummer",
    "adressenavn": "Objektadresseveien 2",
    "adressenummer": "2",
    "postnummer": "Postnummer",
    "poststedsnavn": "Poststedsnavn",
    "kommunenummer": "0301",
    "bydel": "Dal",
    "fylkesnummer": "020"
  },
  "naeringskode": "47.110",
  "organisasjonsform": "AS",
  "aarligOmsetning": "1",
  "driftsstatus": "ok"
}
```

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
        }
      }
    }
  },
  "type": "object",
  "properties": {
    "tildaenhet": {
      "type": [
        "string",
        "null"
      ]
    },
    "tildaenhetNavn": {
      "type": [
        "string",
        "null"
      ]
    },
    "tildaenhetHovedenhet": {
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
        "ikkeAngitt",
        "konkurs",
        "underAvvikling",
        "underTvangsavviklingEllerTvangsopploesning",
        "ok"
      ]
    }
  }
}
```

### OAS
```json
{
  "additionalProperties": true,
  "definitions": {
    "tilsynsadresse": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "adressenavn": {
          "nullable": true,
          "type": "string"
        },
        "adressenummer": {
          "nullable": true,
          "type": "string"
        },
        "breddegrad": {
          "nullable": true,
          "type": "string"
        },
        "bruksenhetsnummer": {
          "nullable": true,
          "type": "string"
        },
        "bydel": {
          "nullable": true,
          "type": "string"
        },
        "bygningsnummer": {
          "nullable": true,
          "type": "string"
        },
        "fylkesnummer": {
          "nullable": true,
          "type": "string"
        },
        "kommunenummer": {
          "nullable": true,
          "type": "string"
        },
        "lengdegrad": {
          "nullable": true,
          "type": "string"
        },
        "postnummer": {
          "nullable": true,
          "type": "string"
        },
        "poststedsnavn": {
          "nullable": true,
          "type": "string"
        }
      },
      "type": "object"
    }
  },
  "nullable": false,
  "properties": {
    "aarligOmsetning": {
      "nullable": true,
      "type": "string"
    },
    "besoeksadresse": {
      "$ref": "tilsynsadresse"
    },
    "driftsstatus": {
      "enum": [
        "ikkeAngitt",
        "konkurs",
        "underAvvikling",
        "underTvangsavviklingEllerTvangsopploesning",
        "ok"
      ],
      "nullable": false,
      "type": "string"
    },
    "naeringskode": {
      "nullable": true,
      "type": "string"
    },
    "organisasjonsform": {
      "nullable": true,
      "type": "string"
    },
    "tildaenhet": {
      "nullable": true,
      "type": "string"
    },
    "tildaenhetHovedenhet": {
      "nullable": true,
      "type": "string"
    },
    "tildaenhetNavn": {
      "nullable": true,
      "type": "string"
    }
  },
  "title": "Tilda/enhetsinformasjon",
  "type": "object"
}
```


