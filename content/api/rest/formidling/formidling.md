---
title: Formidling
description: Utgått REST-funksjonalitet for formidlingstjenester
weight: 5
tags: [DEPRECATED]
---

En mer utfyllende beskrivelse av formidlingstjenesten i Altinn kommer etter hvert under [Guider](/docs/guides/).

## Laste ned filer fra formidlingstjeneste
Dette er en deprekert tjeneste som ikke lenger skal brukes. Se [Outbox](outbox.md) og [Inbox](inbox.md) for beskrivelse av REST api for formidlingstjeneste.

```HTTP
GET https://www.altinn.no/api/{who]/brokerservice/files/{filereference}
ApiKey: myKey
Accept: application/hal+json
```