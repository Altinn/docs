---
title: Planer for modernisering og migrering av API i Altinn
linktitle: Overgang A2 til A3
description: Her finner du foreløpig plan for hva som skjer med API i forbindelse med modernisering av Altinn som skjer i perioden 2021 - 2025. Planen vil bli endret underveis. 
toc: true
weight: 2000
tags: [plan, migration]

---
# Disse sidene er under konstruksjon

### Innledning
På disse sidene vil du finne oversikt over alle API-tjenestene som er i bruk i Altinn 2 i dag og som påvirkes av [overgangen mellom Altinn 2 (dagens løsning) og Altinn 3 (ny løsning)](https://samarbeid.digdir.no/eformidling/modernisering-av-altinn/1799). 
Vi har delt API opp i to ulike brukergrupper og du finner migreringsstrategi for de ulike API-enedpunktene der: 
- API-Tjenester for sluttbrukersystem
- API-Tjenester for tjenesteeiere i Altinn
## Ulike migrerings strategier for ulike API
Som en hovedregel så vil alle eksisterende API i Altinn 2 fortsette å fungere så lenge Altinn 2 plattformen er i drift. Altinn 2 plattformen slås av senest juni 2026. 

Disse APIene vil som en hovedregel kun ha tilgang til informasjon fra Altinn 2 plattformen. Etterhvert som tjenesteeier flytter sine [ulike tjenester](/docs/api/api-migration/servicemigration/) ut fra Altinn 2, så vil det være begrenset om man 
får ut nødvendig informasjon fra APIene ettersom tjenestene forsvinner fra Altinn 2. 

For API finnes 2 hovedstrategier i overgang mellom Altinn 2 og Altinn 3:

1. API tjenesten videreføres ikke i den form den er og nye API  må tas i bruk når tjenester som systemet er avhengig av flyttes fra Altinn 2 til Altinn 3
2. Det tilbys overgangsløsning for Altinn 2 APIer som igjen henter/endrer nødvendig informasjon fra/i Altinn 3. Disse vil være tilgjengelig i en overgangsfase og slås av på senere tidspunkt. 
Disse APIene vil som en hovedregel kunne hente ut informasjon om tjenester fra både Altinn 2 eller Altinn 3 plattformen. Overgangsløsninger kan f eks kreve at konsument må åpne brannmurer eller endrer adresse for kall som gjøres mot API.


{{% notice warning %}}Noen nye API vil være forholdsvis enkelt å ta i bruk og vil kreve lite endring i systemer som bruker APIene. 
Men det vil også være tilfeller hvor nye API-tjenester endres mye og hvor det kreves større tilpasninger i systemer som konsumerer API.
I disse tilfellene vil vil beskrive hva endringene går ut på under beskrivelse av strategi for de ulike API-tjenestene.{{% /notice %}}

## SOAP tjenester videreføres ikke
Altinn 2 tilbyr i dag API på både SOAP og REST. Det er besluttet at man ikke vil videreføre SOAP grensesnitt på Altinn 3 plattformen. 
Alle som i dag benytter SOAP må derfor forberede seg på at de er nødt til å gå over til REST. 

{{% notice warning %}}Vi anbefaler de som i dag benytter SOAP i Altinn 2 til å vente med å ta i bruk REST til nye REST-API er tilgjengelig i Altinn 3.{{% /notice %}}

## Autentisering via Maskinporten blir innført for alle API i Altinn 3
Alle REST-api i Altinn 3 vil benytte Maskinporten som autentiseringsmekanisme. Det vil ikke være mulig å benytte virksomhetssertifikatpålogging direkte mot Altinn 3 REST-api, slik man har mulighet til i Altinn 2.

## Hva skjer med API for Sluttbrukersystem?
Disse APIene kan benyttes for å integrere fagsystemer mot Altinn som benyttes hos sluttbrukere.
Disse fagsysteme kan typisk være regnskapssystem, HR system, landbrukssystem, post/arkiv system eller lignende. 

For å benytte disse APIene trengs en pålogget bruker som gir fagsystemet tilgang til å hente data på deres vegene i Altinn.
- Her finner du migreringsplaner for [REST-api for sluttbrukersystem](/docs/api/api-migration/rest-sbs/). 
- Her finner du migreringsplaner for [SOAP-api for sluttbrukersystem](/docs/api/api-migration/soap/)

## Hva skjer med API for Tjenesteeier?
Disse APIene kan kun benyttes av offentlige virksomheter som har avtale om bruk av Altinn. 

Det er tjenesteeier som autentiseres i kall mot API og kan hente ut informasjon om en oppgitt bruker. 
Tjenesteeier kan kun hente ut informasjon om bruker som er nødvendig for å kunne utføre offentlig myndighetsutøvelse/tjenesteyting. 

- Her finner du migreringsplaner for [REST-api for tjenesteeeier](/docs/api/api-migration/rest-te/). 
- Her finner du migreringsplaner for [SOAP-api for tjenesteeier](/docs/api/api-migration/soap/)
  



