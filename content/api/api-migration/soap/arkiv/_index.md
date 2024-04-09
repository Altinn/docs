---
title: ArchiveExternal
linktitle: Archive
description: Her beskrives migreringsløpet SOAPtjenestene som ligger under ArchiveExternal-endepunktet
toc: true
weight: 
tags: [plan, migration]
---

# Arkiv
Tjenesten benyttes for å hente ut arkiverte element i innboksen til bruker i Altinn 2. 

## /ArchiveExternal/ReporteeArchiveExternal​

**Brukes av bare Sluttbrukersystem.**

#### Operasjoner i A2
- GetArchivedCorrespondenceBasic​
- GetArchivedFormTask​
- GetAttachmentData​
- GetArchivedCorrespondence​

SOAP-API-ene vil ikke videreføres i Altinn 3. Se [informasjon om migrering av meldingsboks-APIer i REST](../../rest-sbs/meldingsboks/).

## /ArchiveExternal/ServiceOwnerArchiveExternal​

**Brukes av bare Tjenesteeiere.**

#### Operasjoner i A2
- GetArchivedFormTaskBasic​
- GetArchiveShipmentStatusExternalBasic​
- /ArchiveExternal/ServiceOwnerArchiveExternalStreamed​
- GetAttachmentDataStreamedBasic​

SOAP-API-ene vil ikke videreføres i Altinn 3. Se [informasjon om migrering av meldingsboks-APIer i REST](../../rest-sbs/meldingsboks/).

Dialogporten vil tilby tjenesteeier-API-er for å administrere dialoger. 

{{% notice warning %}}Teknisk dokumentasjon for intergrasjoner mot Dialogporten (både sluttbruker-API og tjenesteeier-API) er under utarbeidelse og vil bli tilgjengeliggjort på [Altinn Docs](https://docs.altinn.studio/api/){{% /notice %}}

* [Se OpenAPI for tjenesteeier-API-er i Dialogporten](https://altinn-dev-api.azure-api.net/dialogporten/swagger/index.html#/Serviceowner) 

# Mottak av skjema hos tjenesteeier
Tjenesten benyttes av tjenesteeier for å hente ned skjema de har mottat fra brukere i Altinn. 

Skjema i Altinn 2 fases nå ut og utvikles på nytt i Altinn 3. Det er den offentlige etaten som eier skjema som er ansvarlig for dette og bestemmer når dette skjer. 
Her finner dere informasjon om [APIene](https://docs.altinn.studio/api/apps/) for APPs som er flyttet til Altinn 3 og her er [veiledning](https://docs.altinn.studio/app/) for hvordan man utvikler APPs i Altinn3. 

## /ArchiveExternal/DownloadQueueExternal​

**Brukes av bare Tjenesteeiere.​**

#### Operasjoner i A2
- GetArchivedFormTaskBasicDQ.​
- GetDownloadQueueItems​
- GetFormSetPdfBasic​
- PurgeItem​

Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design. 

* [Les mer om tjenesteeier-API-er for å motta data fra apper i Altinn 3](https://docs.altinn.studio/api/guides/appownerintegration/receivingdata/)



