---
title: Test app i testmiljø
linktitle: I testmiljø
description: Beskrivelse av hvordan test i testmiljø kan utføres.
toc: true
weight: 200
---

Klargjøring av app og deploy til testmiljø gjøres fra _Deploy_-fanen i Altinn Studio.

## Bygge app 
Før en app kan deployes til testmiljø, må alle nødvendige filer samles sammen i en pakke som kan deplpoyes. Dette gjøres ved å _bygge_ appen. 

{{%notice info%}}
Merk at det er filene fra app-repoet som benyttes i bygget. Dersom en har gjort endringer på en app i Altinn Studio så må disse sendes til repoet for at endringene skal bli med i bygg-pakken.
Dette gjøres ved å velge _Push_ fra _Lage_-fanen i Altinn Studio.
{{% /notice%}}

Når en app er klar til test, kan den bygges ved å gå til *Deploy*-fanen i Altinn Studio (inne på den appen som skal deployes).

På høyre side vises et panel for å bygge appen.

{{%notice info%}}
Merk at det kun er mulig å bygge ny versjon av appen dersom det faktisk er gjort endringer i appen. Dersom det er gjort endringer og det ikke er mulig å bygge ny versjon, pass på at endringene har 
blitt sendt til app repoet.
{{% /notice%}}

1. Skriv inn versjonsnummer for den versjonen av appen som skal bygges. Må være unikt (altså ikke brukt tidligere for denne appen).
2. Skriv inn beskrivelse for denne versjonen av app'en.
3. Trykk på _Bygg versjon_ for å starte bygget.

Status for bygget vises under _Tidligere bygg av applikasjonen_. Når status er grønn, er denne versjonen av app'en klar til å bli deployet til testmiljø.

![Bygge app](build-app.gif?width=700 "Bygge app")

## Deploy av app til testmiljø
Når en app er bygget ferdig kan den deployes til testmiljø. Dette gjøres fra _Deploy_-fanen. Der vises en oversikt over tilgjengelige miljø, i tilegg til en oversikt over hvilke versjoner av appen
som er i de forskjellige miljøene.

1. Velg versjonen av appen som skal deployes fra nedtrekkslisten som ligger under det aktuelle miljøet.
2. Trykk på _Deploy ny versjon_.

Valgt versjon vil da deployes til valgt miljø. Her er det mulig å deploye ny versjon, eller rulle tilbake til en eldre versjon om det er ønsket.

![Deploye app](deploy-app.gif?width?=700 "Deploye app")

## Teste app i testmiljø
Logg inn i testmiljø med testbruker. Bruk lenken som vises over hvert miljø i _Deploy_-fanen for å komme til ønsket testmiljø og starte ny instans av appen.

Alle instanser vil være synlig i meldingsboks/arkiv til valgt aktør, på samme måte som dagens tjenester (som er basert på Altinn II).