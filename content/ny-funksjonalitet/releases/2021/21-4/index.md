---
title: 21.4
description: Forbedringer og feilrettinger
weight: 170
type: releasenote
releasenote_info: Release 21.4, produksjonssettes 19. april 2021
---

**Dette er en kommende endring. Gjeldende endring ligger [her](../21-3).**

## Endringer i Portal

<<<<<<< HEAD
### Brukere får meldingsboksvalg etter pålogging i stedet for å bli sendt til dyplenken (blant annet samtykkesiden) de skulle til

Flytte lagring av redirect-url fra session til AltinnContext-cookie.
Problemstillingen har eksistert i løsningen lenge og har også vært forsøkt feilsøkt tilbake i 2018. Man har kommet frem til antagelsen om at det er foråsårsaket av tap av innlogget brukers MVC sesjonsobjekt. Det er sesjonsobjektet som frem til nå har blitt brukt til å ta vare på informasjon om hvilken del av løsningen brukeren forsøkte å nå, før brukeren ble omdirigert for å logge på løsningen. Relevante verdier er nå flyttet ut av sesjonsobjektet og inn i kryptert AltinnContext cookie, som nå også får satt SameSite property satt til None. Dette skal kunne løse de fleste scenario hvor disse verdiene i dag kan gå tapt, blant annet dersom bruker blir flyttet fra en portal server til en annen.

### Nytt løp for delegering av rettigheter til enkelttjenester

Det er nå blitt implementert to-kolonnevisning i enkelttjeneste-delegering. Delegering av rettigheter til enkelttjenester vil nå gå gjennom et nytt løp, hvor det er mulig å delegere rettigheter til flere tjenester samtidig. Løpet ligner på dagens løp for å be om tilgang til enkelttjenester, hvor man først velger tjenester, og i neste trinn velger hvilke rettigheter til hver og en av de valgte tjenestene man ønsker og delegere. I tidligere løsning har man søkt opp én tjeneste av gangen for å delegere rettigheter.

## Endringer i Gammel innboksvisning

Lenke til "Avansert søk" er fjernet i gammel innboks visning fra søk på tvers.

## Endringer i sluttbrukerløsnigen

### Oppgradering av skjemapakker med Infopath 2007 kompatibilitet

Sharepoint 2019 støtter ikke skjemapakker (Infopath xsn-filer) med Infopath 2007 kompatibilitet. For at det skal være mulig å flytte skjemaene (xsn-filene) på eksisterende plattform over på Sharepoint 2019 plattform må xsn-filene oppgraderes.
Det er laget en komponent som automatiserer oppgradering av xsn-filer. Komponenten er integrert i to moduler:
- Import til SBL fra TUL
- Console app som oppdaterer en xsn-fil direkte. Denne appen vil benyttes ved eksport/import når man skal oppgradere til Sharepoint 2019
Komponenten gjør altså at tjenesteeierne ikke trenger å gjøre en manuell konvertering i TUL før oppgradering til Sharepoint2019. Tjenesteeierne oppfordres likevel til å oppgradere skjemaer med Infopath 2007 kompatibilitet når man likevel gjør endringer på en tjeneste.
I V21.4 er integrasjonen i “Import til SBL fra TUL” skrudd av i altinn.config, men funksjonaliteten kan testes ved å endre i altinn.config. I V21.5 bør integrasjonen default være på med mindre man avdekker store problemer i V21.4.

### Oppdatering av DotNetZip

DotNetZip er oppdatert til siste versjon. DotNetZip refereres nå via nuget pakke.

### Etablere token med Shared secret

Det er nå innført autorisasjon med shared secret i grensesnittet mot SFS (fil server for binbærvedlegg).

### Bootstrap er oppgradert

Bootstrap er oppgradert til 4.6.0 i de deler av Mvc portalen som ikke benytter Altinn designsystemet

## Endringer i Autorisasjon

### Fjernet SkipOfferedByOnCoveredBysReporteeListCheck-flagg fra database og prosedyrer

For å ferdigstille fjerning av SkipOfferedByOnCoveredBysReporteeList-flagget er database-relaterte endringer gjennomført en release etter at dette ble fjernet fra kode.

### Utvidet “Finn skjema eller tjeneste”/tjenestemetadata-visninger til å inkludere 3.0-apps

GetAvailableServices støtter fra før 3.0-apps i form av DelegationSchemes, men disse ble tidligere ikke mellom privatpersoner. Denne US handler om å endre på denne logikken slik at andre 3.0-apptyper foruten delegationSchemes også blir tilgjengelige for alle typer reportees i alle visninger som benytter GetAvailableServices.

### Database prosedyrer for å fjerne delegeringer og samtykker og logge til Aktivitetsloggen når et selskap slettes

Det er laget to prosedyrer som sletter delegeringer gjort til en enhet som får status slettet.
- Alle delegeringer som går på Samtykker, Delegation scheme og enkeltelement delegeringer. (ServDev.AuthorizationRule)
=======
### Brukere blir nå sendt til dyplenken i stedet for å få meldingsboksvalg etter pålogging

Det er sesjonsobjektet som frem til nå har blitt brukt til å ta vare på informasjon om hvilken del av løsningen brukeren forsøkte å nå. Relevante verdier er nå flyttet ut av sesjonsobjektet og inn i kryptert AltinnContext cookie med SameSite property satt til None. Dette skal gi bedre brukeropplevelse dersom bruker blir flyttet fra en portal server til en annen.

### Nytt løp for delegering av rettigheter til enkelttjenester

Delegering av rettigheter til enkelttjenester vil nå gå gjennom en ny flyt hvor det er mulig å delegere rettigheter til flere tjenester samtidig. Den nye flyten ligner på dagens flyt for å be om tilgang til enkelttjenester. En velger først tjenester, dernest i neste trinn velges rettigheter man ønsker og delegere. I tidligere løsning har en måttet søke opp én tjeneste om gangen for å delegere rettigheter.

### Fjernet lenke til gammel meldingsboks fra søk på tvers

Under Søk på tvers har det tidligere vært en gul informasjonsboks med lenke til gammel meldingsboks. Denne er nå fjernet. Det er ikke lenger mulig å nå gammel meldingsboks.

## Endringer i sluttbrukerløsnigen

### Oppgradering av skjemapakker med Infopath 2010 kompatibilitet

Sharepoint 2019 støtter ikke skjemapakker (Infopath xsn-filer) med Infopath 2007 kompatibilitet. For at det skal være mulig å flytte skjemaene (xsn-filene) på eksisterende plattform over på Sharepoint 2019 plattform må xsn-filene oppgraderes.
Det er laget en komponent som automatiserer oppgradering av xsn-filer. Komponenten er integrert i to moduler:
- Import fra TUL til SBL
- Console app som oppdaterer en xsn-fil direkte. Denne appen vil benyttes ved eksport/import når man skal senere skal oppgradere til Sharepoint 2019
Komponenten gjør altså at tjenesteeierne ikke trenger å gjøre en manuell konvertering fra Infopath 2007 til Infopat2010 i TUL før oppgradering til Sharepoint 2019. Tjenesteeierne oppfordres likevel til å oppgradere skjemaer til å bruke Infopath 2010 kompatibilitet når man likevel gjør endringer på en tjeneste.

I V21.4 er integrasjonen i “Import til SBL fra TUL” skrudd av. Fra versjon V21.5 skal denne integrasjonen (konverteringen fra Infopath 2007 til Infopath 2010) default være på.

### Oppdatering av DotNetZip

DotNetZip brukes for å håndtere zip filer i SBL og TUL. Dette biblioteket er oppdatert til siste versjon. DotNetZip refereres nå via nuget pakke. 

### Bootstrap er oppgradert

Bootstrap er et front-end produkt som anvendes til design og tilpasning av responsive sider. Bootstrap er oppgradert til 4.6.0 i de deler av Mvc portalen som ikke benytter Altinn designsystemet. 

## Endringer i Autorisasjon

### Database prosedyrer for å fjerne delegeringer og samtykker og logge til Aktivitetsloggen når et selskap slettes

Det er laget to prosedyrer som sletter delegeringer når et selskap slettes:
- Alle delegeringer som går på Samtykker, delegation scheme og enkeltelement delegeringer. (ServDev.AuthorizationRule)
>>>>>>> 9e61fcab14e0c76e4a952c5a7842fbad8551e367
- Alle delegeringer av Altinn og Lokale roller (Authz.Role)

## Endringer i REST API

### Nytt endepunkt for oppdatering av DelegationScheme i Maskinporten API
 
Implementert endepunkt for å oppdatere et eksisterende DelegationScheme i Maskinportens API. Tidligere har det bare vært mulig å oppdatere scopes på et DelegationScheme, men med denne oppdateringen vil man nå ha mulighet å oppdatere alle felter i et DelegationScheme.

### Oppdatere jquery i REST

<<<<<<< HEAD
Dette berører hjelpesidene til REST.
=======
jQuery er et JavaScript-bibliotek utviklet for å forenkle klientskripting av HTML. Dette biblioteket er oppdatert for hjelpesidene til REST.
>>>>>>> 9e61fcab14e0c76e4a952c5a7842fbad8551e367

## Endringer i Tjenesteutviklingsløsningen (TUL)

### Ny samtykkemal for generisk samtykke

Det er lagt til en generisk samtykkemal med generell ordlyd som skal benyttes i DSB sin samtykketjeneste.

## Diverse feilrettinger

### Feil med tilgang til parallell signering når man har rollen PASIG for flere organisasjoner

Det er blitt rettet en feil som gjorde at hvis man hadde rollen PASIG for flere organisasjoner så fikk man kun “tilgang til” rollen for den første organisasjonen man hadde rollen for.
<<<<<<< HEAD
Aktørvelgeren kan brukes under visning av Altinn 3 instans

### Det er mulig å endre aktør mens man har åpnet en Altinn 3 instans.
=======

### Det er mulig å endre aktør mens man har åpnet en Altinn 3 instans
>>>>>>> 9e61fcab14e0c76e4a952c5a7842fbad8551e367

Det er rettet en feil som gjorde det mulig å endre aktør mens man hadde åpnet et enkelt Altinn 3 element i portalen. Når man nå åpner et Altinn 3 element fra “søk på tvers” vil eieren av elementet bli valgt aktør. Dette er samme logikk som om man åpner et Altinn 2 element.

### Søk på AR-referanse fungerer ikke hvis man har veldig gamle data i meldingsboksen

Det er rettet en feil som gjorde at AR-referanse som søkenøkkel kun ble benyttes ved søk blant data i de to siste år. Eldre data ble søkt uten noen begrensende søkekriterier.

### Feil ikon på Rettigheter virksomheten har hos andre panelet

<<<<<<< HEAD
Ikonene var speilvendt. Nye versjoner av dem ble lagt inn i designsystemet, og en ny npm-pakke ble publisert med de nye ikonene. Package.json ble oppdatert så den nye pakka brukes, så ikonene skal se riktig ut nå.

### Håndtere teknisk feil ved avansert søk på dato større enn 31.12.9999 og mindre en 01.01.1753

Det ble gitt teknisk feil hvis dato i avansert søk er etter år 9999. Dette er rettet.

### Dårlig kjøreplan for lagret prosedyre [AuthZ].[DelegationEvent_GetDelegationEvents_SELECT]

Dette er utbedret ved å etablere nye indekser i RuleDelegation og RoleDelegation.

### Tilbakerulling av feilretting 51247 (Flaskehals i GetFormFieldXpathForReporteeElementId)

Feilretting nummer 51247 er midlertidig rullet tilbake ved å deaktivere en cache nøkkel. Denne feilen dekker en full tilbakerulling.

### Kø-løsningen skapte problemer for automatiserte tester

Kø-løsningen skaper problemer for automatiserte tester Det er innført en white-listing av ip-adresser som ikke skal rutes til den nye køløsningen. Listen vedlikeholdes i altinn.config.
=======
Det er rettet en feil der ikonene ble speilvendt. 

### Håndtere teknisk feil ved avansert søk på dato større enn 31.12.9999 og mindre en 01.01.1753

Det ble gitt teknisk feil hvis dato i avansert søk på dato større enn 31.12.9999 og mindre en 01.01.1753. Dette er nå rettet.
>>>>>>> 9e61fcab14e0c76e4a952c5a7842fbad8551e367
