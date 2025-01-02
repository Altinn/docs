---
title: Endringer i REST API for Formidlingstjenesten for sluttbrukersystem
linktitle: Formidlingstjenesten
description: Siden er under konstruksjon - Her finner du foreløpig plan for hva som skjer med API tjenester for Formidlingstjenester for Sluttbrukersystem i overgangen mellom Altinn 2 og Altinn 3. Planen vil bli endret underveis. 
toc: false
weight: 600
tags: [plan, migration]

---

# Siden er under konstruksjon

## BrokerService
API tilbyr operasjoner for å slå opp informasjon om brukers profil
![BROKERSERVICE REST-api for tjenesteeiere](brokerservice.jpg "BrokerService-tjenesten")

### Hva skjer med tjenesten?
Tjenesten benyttes for å opprette/hente/sende Brokerservice. 
Denne erstattes av nye REST api for Brokerservice i Altinn 3. 

*Funksjonalitet og API planlagt produksjonsatt Q1 2025 i Altinn 3. - Tilgjengelig i TT02 nå*
- Se beskrivelse av den nye tjenesten her: [Altinn Formidling dokumentasjon](https://docs.altinn.studio/broker/)
- se beskrivelse av de nye APIene her: [Altinn Broker API](https://docs.altinn.studio/api/broker/)

#### Hvilke konsekvenser har dette for konsumenter
Tjenesteeiere oppfordres til å opprette nye Broker-tjenester i Altinn 3 og migrere brukermassen over til nye tjenester.
Data og tjenestekonfigurasjon vil ikke migreres automatisk; man må sette opp ny konfigurasjon manuelt.

Det er laget en overgangsløsnning for de Tjenester der en slik "hard" migrering ikke lar seg gjøre.
Den lar i praksis Altinn 2 API gi tilgang til Altinn 3 Broker tjenester.
Det er beskrevet her i [ALtinn Formidling overgangsløsning](https://docs.altinn.studio/nb/broker/broker-transition/).

#### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste
Se dokumentasjonen her: [Altinn Formidling dokumentasjon](https://docs.altinn.studio/broker/)
