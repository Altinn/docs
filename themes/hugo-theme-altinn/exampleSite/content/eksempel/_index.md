---
title: Eksempel på tittel
description: Eksempel på ingress
weight: 5
toc: true
aliases:
- /guides/kom-i-gang-med-utvikling/
---

Dette er en eksempelside med eksempelinnhold. For å vise en oversikt over innholdet på denne siden (klikkbare overskrifter) - legg til toc: true i frontmatter. 

## Eksempel på lister
Eksempelinnhold med en nummerliste: 

1. Nummer en
2. Nummer to
3. Nummer tre

Og en punktliste: 

- Et punkt
    - Et punkt på andre nivå
- Enda et punkt

## Eksempel på panel:

{{% panel %}}
**Develop digital services using our tools and APIs**<br>
Looking for technical guidance on how to build your own services with our products? Go to [Altinn Digital - Development](https://altinn.github.io/docs/")
{{% /panel %}}<br>

Eksempel på bilde:

![Overordnet integrasjonsskisse](integrasjonsskisse.png "Overordnet integrasjonsskisse")

## Eksempel på fil som kan lastes ned:

Filen må legges i en mappe som heter filnavn.files, f.eks: _index.files

{{%attachments pattern=".*(pdf|docx)"/%}}

## Eksempel på ekspanderbare overskrifter: 

{{%expandlarge id="autentisering1" header="Titel 1" %}}
Innhold 1
{{% /expandlarge%}}

{{%expandlarge id="autentisering2" header="Tittel 2" %}}
Innhold 2
{{% /expandlarge%}}

{{%expandlarge id="autentisering3" header="Tittel 3" %}}
Innhold 3
{{% /expandlarge%}}


