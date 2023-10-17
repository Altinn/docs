---
title: IntermediaryExternal
linktitle: Intermediary
description: Her beskrives migreringsløpet SOAPtjenestene som ligger under Intermediary-endepunktet
toc: true
weight: 
tags: [plan, migration]
---

# Skjematjeneste

## /IntermediaryExternal/IntermediaryInbound​
**Brukes av bare Sluttbrukersystem​**

Tjenesten benyttes til å sende inn skjema i Altinn 2 via SOAP. 

Skjema i Altinn fases nå ut og utvikles på nytt i Altinn 3. Det er den offentlige etaten som eier skjema som er ansvarlig for dette og bestemmer når dette skjer. 

Her finner dere informasjon om hvordan sluttbrukersystem kan [sende inn data via API](https://docs.altinn.studio/api/guides/endusersystems/submitdata/) når tjenesten er flyttet til Altinn 3. 

#### Operasjoner i A2
- GetAltinnSubmissionStatus​
- SubmitFormTask​
- CompleteAndSignShipment​
- GetAltinnSubmissionStatus​
- UpdateFormData​
- SubmitAttachmentStreamed​
  
*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

# Kvittering

## /IntermediaryExternal/ReceiptExternal​
**Brukes av Sluttbrukersystem​**

Tjenesten benyttes av sluttbrukersystem for å hente ut kvitteringer som angir status på en instans i Altinn 2. 

Etterhvert som skjema og meldingstjenester flyttes over til Altinn 3 løsningen må man benyttet API i Altinn 3 for å kontrollere status for disse. 
Her finner dere mer informasjon om [tilgjengelige AP](https://docs.altinn.studio/api/) knyttet til apper i Altinn 3. 

#### Operasjoner i A2

- GetReceipt​
- GetReceiptList​
- UpdateReceipt​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

## /IntermediaryExternal/ReceiptAgencyExternalnal​
**Brukes bare av Tjenesteeiere**

Tjenesten benyttes av tjenesteeiere for å hente ut kvitteringer som angir status på en instans i Altinn 2. 

Etterhvert som skjema og meldingstjenester flyttes over til Altinn 3 løsningen må man benyttet [API i Altinn 3](https://docs.altinn.studio/api/) for å kontrollere status for disse. 
​
#### Operasjoner i A2
- GetReceipt​
  
*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*





