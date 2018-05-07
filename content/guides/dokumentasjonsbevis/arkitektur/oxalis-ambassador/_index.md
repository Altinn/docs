---
title: Oxalis Ambassador
description: Oxalis Ambassador
weight: 10
---

Løsningen implementerer PEPPOL gjennom å wrappe REST-APIet til tjenesten. Mellomvaren har ansvaret for overgangen mellom asynkron og synkrone kall.
En egen persistensmodul i Oxalis besørger for å tilgjengliggjøre innkommende meldinger til mellomvaren. Denne prosesserer innkommende meldinger av typen [EHF Get Evidence Request](https://github.com/difi/vefa-ehf-getevidence),
som (i utgangspunktet) vil være den eneste typen aksesspunktet er satt opp til å kunne motta den sentrale PEPPOL-katalogen (SMP), og det gjennomføres (potensielt gjentatte) oppslag i NADOBE Core REST-APIet for å initiere evt. samtykkeforespørsel og høste bevisdata. Bevis-svaret pakkes og sendes ut på PEPPOL-aksesspunktet via Ringo. Mellomvaren vil da ha følgende ansvarsområder:

* Håndtere innkommende meldinger fra PEPPOL-aksesspunktet
* Håndtere ASIC-pakketering
* Mappe EHF Get Evidence Request mot tilsvarende authorization-kall til REST-APIet
* Gjennomføre gjentatte forsøk hvis avgivere er utilgjengelige, eller for å sjekke at forespurt samtykke er blitt innvilget
* Mappe svar fra REST-APIet til EHF Get Evidence Response
* Asynkront sende utgående meldinger til Oxalis via Ringo APIet

Autentisering mot NADOBE CORE fungerer ved hjelp av Altinns eget virksomhetssertifikat. NADOBE Core vil inneholde kode som tillater at "Requestor" kan settes vilkårlig når dette virksomhetssertfikatet benyttes (ellers må requestor matche organisasjonsnummer i virksomhetssertifkatet som oppgis). Dette innebærer at autentisering i praksis er delegert til Peppol.

**Her er en skisse som benytter Azure-komponenter (Functions, Azure Storage Queue, CosmosDB) i implementasjonen av mellomvaren**

<div style="width: 100%; height: 800px; margin: 10px 0; position: relative;"><iframe allowfullscreen frameborder="0" style="width:100%; height:800px" src="https://www.lucidchart.com/documents/embeddedchart/f1b6c410-fab4-40b2-a62f-f3d8fd916730" id="uv__UW_Ow0eV"></iframe></div>