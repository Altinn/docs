---
title: "19.11"
description: Feilrettinger.
weight: 20
type: releasenote
releasenote_info: Release 19.11, produksjonssatt 18. november 2019.
---

## Feilrettinger

### Problemer oppstod når en virksomhetsbruker endret brukernavn

Når en virksomhetsbruker endret brukernavnet på profilsidene oppsto det en feil som nå er utbedret.

### Ytelsesforbedringer utført for Download Queue

[Downloadqueue](../../../../../docs/api/tjenesteeiere/soap/grensesnitt/downloadqueue) inneholder operasjoner der tjenesteeier kan hente ned elementer. Analyser viste at det tidvis var treghet og dårligere responstid enn ønsket. Det er derfor utført ytelsesforbedringer. Ytterligere optimalisering vil bli utført med neste release.

### Tjenesteeier APIet gav ut feilknytninger i organisasjonsstruktur for BEDR

Det ble avgitt feil i strukturen (enhetene ble stokket om)  når en bruker hadde tilgang til en bedrift (BEDR) som ikke hadde aktiv juridisk enhet. Dette er nå rettet.

### Brukeren ble utestengt etter at nytt sertifikat for virksomhetsbrukere var lagt inn

En feil gjorde at brukeren ikke fikk logget seg inn i løsningen etter å ha lastet inn nytt virksomhetssertifikat. Dette er nå rettet.

### Feil i tekst - din kontaktinformasjon for virksomheten

En feilmelding kom opp når man forsøkte å slette en varsling for en enkelttjeneste og samtidig hadde lagt inn et mobilnummer eller e-post på ugyldig format. Feilmelding med feil tekst kom opp når man trykket på "Lagre". Dette er rettet til at det ikke lenger er mulig å trykke på lenken for enkelttjenester med feil format i mobilnummer/e-post feltet.

### Stavefeil ved delegering når engelsk språk var valgt

Ved delegering av enkeltrettigheter for en meldingstjeneste til en annen bruker så var det en skrivefeil. I meldingen som ble vist til brukeren etter delegeringen sto det: “Messages can be read in the organization’s innbox”. Innbox er nå rettet til Inbox.

### Tekstforbedring ved delegering av meldingstjeneste fra person til person

Ved delegering av rettigheter fra en person til en annen så kom følgende tekst opp: “Meldingene vil kunne leses i virksomhetens innboks”. Dette er nå rettet til “Meldingene vil kunne leses i brukerens innboks”.
