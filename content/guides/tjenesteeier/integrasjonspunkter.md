---
title: Integrasjonspunkter 
description: Tilgjengelige integrasjonspunkter på Altinn plattformene
weight: 600
---

{{< figure src="/docs/images/guides/tjenesteeier/integrasjonspunkter.png" title="">}}


Her følger en oversikt over hvilke integrasjonspunkter som er tilgengelige på Altinn plattformene.

## Innsendingstjenester

|**Integrasjon**|**AltinnI** |**AltinnII**|**Kommentar**|
|--------|--------|--------|--------|
|Sende inn preutfyllingsdata – web service|X|X|Nytt web service format i AltinnII|
|Sende inn preutfyllingsdata - filbasert| X| X| Nytt filformat i AltinnII|
|Sende inn abonnementsdata – web service| X| X| Nytt web service format i AltinnII|
|Sende inn abonnementsdata – filbasert| X| X| Nytt filformat i AltinnII|
|Hente innsendte data fra tjenesteeiers arkiv – web service||X||

## Meldingstjenester/AltUt

|**Integrasjon**|**AltinnI** |**AltinnII**|**Kommentar**|
|--------|--------|--------|--------|
|Sende inn meldingstjenester – web service||X|Nye tjenesteformat i Altinn II men støtte for Altinn I tjenester med tilpasset innhold|
|Sende inn meldingstjenester – filbasert||X	|Nytt filformat i Altinn II men støtter tilpasset Altinn I format|
|Motta bekreftelser for åpnet / lest for meldinger – filbasert||X|	Nytt format Altinn II men støtte for Altinn I format|
|Hente melding i tjenesteeiers arkiv – web service||X|Nytt web service format i AltinnII|

## Formidlingstjenester

|**Integrasjon**|**AltinnI** |**AltinnII**|**Kommentar**|
|--------|--------|--------|--------|
|Teknisk formidling av data mellom eksterne aktører||X|	Nye tjeneste i Altinn II, Ikke tilgjengelig i Altinn I|

## Kvitteringer

|**Integrasjon**|**AltinnI** |**AltinnII**|**Kommentar**|
|--------|--------|--------|--------|
|Hente kvitteringer for innsendte data||X|Ny funksjonalitet i Altinn II|
|Kvittere for mottak av data|X|X|Ny funksjonalitet i Altinn II. Finnes også i Altinn I men ikke benyttet i særlig grad|
|Hente lister med kvitteringer||X|Ny funksjonalitet i Altinn II|

## Meldingstjenester på ny plattform

Det er definert nye grensesnitt for meldingstjenester i AltinnII. Allikevel vil den nye Altinn plattformen støtter AltinnI formatet for meldingstjenester, dvs. fortsatt bruk av Altut formatet. Dette fordi meldingstjenester i sin helhet flyttes til ny plattform, og vil ikke være tilgjengelig for eksisterende tjenesteeiere i AltinnI i overgangsfasen hvor begge plattformene kjører i parallell.

Det er imidlertid anbefalt å benytte det nye formatet også for eksisterende tjenesteeiere i stedet for Altut formatet.

Ved bruk av Altut formatet på ny plattform gjelder følgende regler:

- Alle meldinger som sendes på det gamle formatet ("Altut.xsd") må knyttes til en meldingstjeneste som er definert i TUL, og migrert til SBL.
- For å knytte meldinger til en meldingstjeneste benyttes tjenestekode (ServiceCode) og tjenesteutgavekode (ServiceEditionCode).
- Tjenesteeier må benytte feltet "shortName" (GovOrgan\AltUt\Message\shortName) i Altut formatet benyttes for å angi tjenestekode og tjenesteutgavekode på formen "xxxxxx yyyyyy" hvor xxxxxx er tjenestekode og yyyyyy er tjenesteutgavekode.
- Parametrene som angis i TUL vil overstyre innhold i meldinger sendt på gammelt format. Dersom disse er obligatoriske i Altut-formatet fra AltinnI må de imidlertid fortsatt oppgis.
- Ikke alle felter i Altut formatet benyttes på ny plattform.
- Ikke mulig å referere til AltinnI-tjenester i fra AltinnII (GovOrgan\AltUt\Message\ReplyMessages\ReplyMessage\Form elementet i Altut.xsd). I stedet for å angi AltinnI "formNumber og AltinnI "version" benyttes AltinnII "ServiceCode" og AltinnII "ServiceEditionCode".