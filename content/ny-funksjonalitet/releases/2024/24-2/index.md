---
title: 24.2
description: Mindre forbedringer og feilrettinger
weight: 110
type: releasenote
releasenote_info: Release 24.1. Produksjonssettes 19. februar
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i SBL
### Implementere støtte for Overgangs-API for Formidlingstjenesten i Altinn 2
Dette er en versjon av følgende issue https://github.com/Altinn/altinn-broker/issues/211

## Diverse bugfix
### Delegering av Altinn App med lowercase rollekoder i policy feiler å finne regler for delegering
Delegering av Altinn Apps med rollekoder i små bokstaver i policy i Altinn 3 feiler når man forsøker å delegere tilgang til denne i fra Altinn 2.

Delegeringen går tilsynelatende grønn/OK, men ingen regler blir faktisk forsøkt delegert mot Altinn 3 APIet da matching på rollekode feiler i oppbyggingen av regler som skal delegeres.

Årsak:
sammenligning av hvilke roller bruker som delegerer selv har mot rollene fra policy i Altinn 3 gjøres nå på en case-sensitiv måte

Fix:
case insensitiv sammenligning av rollekode
