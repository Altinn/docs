---
title: Betaling
description: Ved bruk av Altinns REST-api kan man videresende brukeren til betalingssteget i portal på altinn.no.
weight: 40
---

## Fremgangsmåte

 - GET på elementet som skal betales (f.eks. https://www.altinn.no/api/my/messages/aXXXXX)
 - Hente ut verdi fra link med navn `payment`
 - Redirecte brukeren til linken, alternativt med parameteret `returnurl` for å hente brukeren tilbake til samme side etter at betaling er utført. 
   - Domenet på `returnurl` må være registrert sammen med apikey for å ikke bli stoppet av CORS.
   - Når brukeren kommer tilbake vil URL-en ha en ny parameter, kalt `resource` som inneholder link til elementet (etter arkivering vil elementet få nytt navn - bXXXXX)
   - Hvis man ikke bruker `returnurl`vil siste respons i prosessen ha status 204 og location header inneholder URI til arkivert element.



