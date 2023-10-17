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

Det vil bli utviklet ny arbeidsflate for meldingsboks i Altinn. Dette arbeidet er i en oppstartsfase og fremdrift kan følges [her](https://github.com/orgs/digdir/projects/8/views/28). 

I forbindelse med modernisering av Altinn 2 så blir det også utviklet en ny tjeneste foreløpig kalt [Dialogporten](https://digdir.github.io/dialogporten/)". 
Dialogporten har som hensikt å bli en felles nasjonal arbeidsflate for både API- og GUI-konsumenter av offentlige tjenester.  

*Ny funksjonalitet og API blir utviklet i 2025 i Altinn 3.*
- Se beskrivelse av den nye tjenesten her: *lenke kommer*
- se beskrivelse av de nye APIene: *lenke kommer*

## /ArchiveExternal/ReporteeArchiveExternal​

**Brukes av bare Sluttbrukersystem.**

#### Operasjoner i A2
- GetArchivedCorrespondenceBasic​
- GetArchivedFormTask​
- GetAttachmentData​
- GetArchivedCorrespondence​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*


## /ArchiveExternal/ServiceOwnerArchiveExternal​

**Brukes av bare Tjenesteeiere.**

#### Operasjoner i A2
- GetArchivedFormTaskBasic​
- GetArchiveShipmentStatusExternalBasic​
- /ArchiveExternal/ServiceOwnerArchiveExternalStreamed​
- GetAttachmentDataStreamedBasic​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

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

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*



