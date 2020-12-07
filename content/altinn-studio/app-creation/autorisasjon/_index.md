---
title: Autorisasjon
linktitle: Autorisasjon
description: Hvordan definere autorisasjonsregler for en applikasjon.
---

Autorisasjonsregler for en applikasjon er definert i en XACML Policy-fil som ligger i applikasjonsrepoet.
XACML Policy-en inneholder en eller flere regler som definerer hvem som kan gjennomføre ulike aksjoner på ulike ressurser.

Beskrivelse av XACML-strukturen og definisjon av regler finnes [her](https://docs.altinn.studio/teknologi/altinnstudio/architecture/components/application/solution/altinn-studio/designer/pap/xacmlpolicy/)

XACML-filen kan endres i en valgfri teksteditor.

## Regler i applikasjonsmalen
Når det opprettes en app i Altinn Studio basert på den nåværende asp.net malen vil det følge med en autogenerert XACML policy-fil.
Reglene som er definert i denne filen er kort beskrevet nedenfor. 

Overnevnte regler kan endres i *policy.xml* som ligger i `App/config/authorization` i applikasjonsrepoet.
Detaljer om hvordan å konfigurere policy filen finnes [her](https://docs.altinn.studio/teknologi/altinnstudio/architecture/components/application/solution/altinn-studio/designer/pap/xacmlpolicy/)
I tillegg vil du finne en del eksempelregler [her](regelbibliotek/).

### Rettigheter for rolleinnhaver
I denne filen er det definert regler som gir innehaver av rollene daglig leder (DAGL) og/eller regnskapsmedarbeider (REGNA)
rettigheter til å instansiere, skrive, lese og slette instanser av applikasjonen.

### Rettigheter for applikasjonseier
Applikasjonseier (organisasjonen) har rettigheter til å instansiere, skrive og lese instanser av applikasjonen.
Til slutt har de rettigheter til å markere på en instans at de er ferdig med den.

### Påkrevd autentiseringsnivå
Påkrevd autentiseringsnivå er satt til 2 som default.

{{% children description="true" %}}
