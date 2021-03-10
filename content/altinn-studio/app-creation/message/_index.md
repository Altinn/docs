---
title: Melding
description: Hvordan sette opp en melding i Altinn Studio
toc: true
weight: 220
---

En melding i Altinn 3 er egentlig bare et data-steg, på samme måte som f.eks. skjemautfylling. Det settes opp med en datamodell for meldingen, og en 
layout for hva som skal vises på siden. Melding er dermed ikke en egen steg-type. Dette gjør at en melding i Altinn 3 er ekstremt fleksibel, og kan settes opp enten som eneste steg i en prosess, eller som en del av en større prosess.

Vi har lagd noen verktøy som skal gjøre det enkelt å komme i gang med å sette opp en melding i en app.

## Datamodell
Vi har lagd en standard datamodell for meldinger, for å gjøre det enkelt å komme i gang. Denne datamodellen kan man finne [her](https://altinncdn.no/schemas/xsd/message/message.schema.v1.xsd). Denne kan enten brukes som den er, brukes som et utgangspunkt, eller man kan bruke en helt annen datamodell. 

## Layout
Layout'en kan man definere helt selv, på samme måte som for skjema. Vi har allikevel opprettet en [meldings-widget](../ui-editor/widgets/#eksempel-meldings-widget), for å gjøre det enklere å komme i gang. Denne widget'en inneholder alle komponentene som trengs for å lage visningen under. Den inneholder også tekster som legges til i ressurs-filene automatisk, som har [variabler](../tekster/#variabler-i-tekster) med referanser til feltene `Title` og `Body` i standard datamodell. Dersom man ønsker andre tekster eller å bruke en annen datamodell, er det bare å redigere enten komponentene eller tekstene etter ønske etter at de er lagt inn i siden.

{{%notice warning%}}
Merk at om en ønsker å bruke _vedleggslisten_, som er med i standard meldings-widget, må man i tillegg manuelt legge inn hvilke _datatyper_ vedleggene som skal vises har i layout-filen. Det er lagt inn en placeholder for dette i komponenten når den legges til med widget'en. Funksjonalitet for å sette dette i Altinn Studio vil komme senere. Tilgjengelige datatyper ligger i `applicationMetadata.json`-filen til appen. Om dette ikke gjøres vil ikke generering av PDF fungere.
{{% /notice%}}

![Standard meldings-visning](message-app.png "Standard meldings-visning")