---
title: Samtykkesiden
description: Presentasjon av samtykkesiden
weight: 220
aliases:
 - /guides/samtykke/sluttbruker/samtykkesiden/
---

Etter innlogging vil sluttbrukeren bli presentert for en egen samtykkeside.  
Figurene under viser et eksempel på hvordan en samtykkeside kan se ut i et lånesøknadscase:

![Samtykkesiden](samtykkeside.png "Samtykkesiden")

Tjenesteeier har fleksibilitet i hvordan denne siden utformes [gjennom bruk av maler]({{< ref "utviklingsguider/samtykke/datakilde/opprett-tjeneste/maler/">}}). 

Når sluttbruker har gitt samtykke blir rettighetsdelegeringen til datakonsumenten utført, vil brukeren kunne bli sendt tilbake til siden som er
angitt av datakonsument i redirect-URL. Sluttbruker kan også velge å ikke gi samtykke.
