---
title: Delegere scopes til en leverandør
linktitle: Delegere scopes
description: Beskrivelse av hvordan tjenesteier kan delegere Maskinporten-scopes til en underleverandør.
toc: true
weight: 300
---

Enkelte tjenesteeiere ønsker at en underleverandør skal kunne agere på vegne av dem, f.eks. leverandører av fagsystemer, og benytte tjenesteeierscopes.

```js
altinn:serviceowner/instances.read
altinn:serviceowner/instances.write
```

For å få til det, så må disse tilgangene delegeres til leverandøren ved bruk av Altinn.

Se https://altinn.github.io/docs/utviklingsguider/api-delegering/

Dette skal nå være mulig å teste i TT02, men er enda ikke åpnet for i prod.
