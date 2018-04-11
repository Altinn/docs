---
title: Beviskoder
description: Beskrivelse av beviskoder i dokumentasjonsbevis
weight: 100
---

{{% notice info %}}
Dette er levende dokumentasjon (under arbeid) for NADOBE - Nasjonal Tjeneste for Dokumentasjonsbevis
{{% /notice %}}

## Funksjon: evidencecodes
Må implementere grensesnittet _IEvidenceSourceMetadata_ som har én funksjon: `List<EvidenceCode> GetEvidenceCodes();`. Dette må eksponeres i en azure-funksjon med http-trigger på `evidencecodes`. [Se her for referanse/eksempel](www.google.com).


