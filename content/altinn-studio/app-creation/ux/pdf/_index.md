---
title: PDF
description: Hvordan konfigurere generering av PDF.
aliases:
 - /altinn-studio/app-creation/pdf/exclude
 - /altinn-studio/app-creation/pdf
---

## Ekskludere sider

Det er mulig å konfigurere hvilke sider man vil ha med i den genererte pdf'en ved hjelp av `Settings.json` under `App/ui/`. Dette gjøres på følgende vis:

```json
{
  "pages": {
    "excludeFromPdf": ["side2"]
  }
}
```

Her vil sidene spesifisert i `pages.excludeFromPdf` bli ekskludert fra pdf. Om denne array'en ikke settes i repo så vil alle sidene bli med.

