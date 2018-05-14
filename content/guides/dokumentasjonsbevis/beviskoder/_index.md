---
title: Beviskoder
description: Beskrivelse av beviskoder i dokumentasjonsbevis
weight: 100
---

{{% notice info %}}
Dette er levende dokumentasjon (under arbeid) for NADOBE - Nasjonal Tjeneste for Dokumentasjonsbevis
{{% /notice %}}

## Implementasjon av beviskoder
Må implementere grensesnittet `IEvidenceSourceMetadata` som har én funksjon: `List<EvidenceCode> GetEvidenceCodes();`. Dette må eksponeres i en azure-funksjon med http-trigger på `/evidencecodes`.

Alle beviskoder oppgitt i metadata må være tilgjengelige på samme navn, f.eks. `/minbeviskode`. Disse functionene må være satt opp til å ta en POST request som inneholder et instans av `EvidenceHarvesterRequest`.


