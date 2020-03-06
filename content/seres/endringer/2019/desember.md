---
title: Desember
description: Mindre feilretting samt noe ny funksjonalitet for systemadministrator. 
weight: 10
type: releasenote
releasenote_info: Produksjonssatt 18. desember 2019
---

### Retting av feil i «Glemt passord»

Rettet feil der brukere med brukernavn som inneholdt bokstavene «æ», «ø» eller «å» fikk
feilmeldingen «Nullstill passord feilet: Ukjent brukernavn» når de brukte «Glemt passord»-
funksjonen (UTF-8).

### Korrigert navnesjekk knyttet til opprettelse av nytt domene og Domenemal

Endret kode ved henting av Domenemal i forbindelse med at et nytt domene opprettes slik
at navnesjekken ikke lenger er case sensitive/versalsensitiv.

### Rettet skrivefeil

Rettet skrivefeil i knappen «Opprett ny katalog» i dialogvinduet «Opprett ny katalog».
*Dialogvinduet er kun tilgjengelig for Systemadministrator.*

### Eksport/import av kataloger

Det er lagt til funksjonalitet for å eksportere en eller flere kataloger med underliggende
domene(r) og modeller til en zip-fil. Filen kan importeres tilbake til Domeneklienten i samme
miljø eller annet et miljø. Den vil da overskrive gjeldende kataloger i Domeneklienten med
de som finnes i filen. Vær oppmerksom på at versjonsinformasjon ikke blir
eksportert/importert. *Funksjonaliteten er kun tilgjengelig for Systemadministrator*.

### Endre status fra «Historisk» til «Publisert»

Det er lagt til funksjonalitet for å endre status fra «Historisk» til «Publisert». *Funksjonaliteten
er kun tilgjengelig for Systemadministrator*.

### Slette katalog
Det er lagt til funksjonalitet for å kunne slette en katalog. *Funksjonaliteten er kun tilgjengelig
for Systemadministrator*.

### Slette domene

Det er lagt til funksjonalitet for å kunne slette et domene. *Funksjonaliteten er kun
tilgjengelig for Systemadministrator*.

### Slette modell

Det er lagt til funksjonalitet for å kunne slette en modell. *Funksjonaliteten er kun tilgjengelig
for Systemadministrator*.

### Slette modellversjon

Det er lagt til funksjonalitet for å kunne slette en modellversjon. *Funksjonaliteten er kun
tilgjengelig for Systemadministrator*.