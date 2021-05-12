---
title: 21.4
description: Forbedringer og feilrettinger
weight: 170
type: releasenote
releasenote_info: Release 21.4, produksjonssatt 19. april 2021
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**


## Endringer i Portal

### Brukere blir nå sendt til dyplenken i stedet for å få meldingsboksvalg etter pålogging

Det er sesjonsobjektet som frem til nå har blitt brukt til å ta vare på informasjon om hvilken del av løsningen brukeren forsøkte å nå. Relevante verdier er nå flyttet ut av sesjonsobjektet og inn i kryptert AltinnContext cookie med SameSite property satt til None. Dette skal gi bedre brukeropplevelse dersom bruker blir flyttet fra en portal server til en annen.

### Nytt løp for delegering av rettigheter til enkelttjenester

Delegering av rettigheter til enkelttjenester vil nå gå gjennom en ny flyt hvor det er mulig å delegere rettigheter til flere tjenester samtidig. Den nye flyten ligner på flyt for å be om tilgang til enkelttjenester. En velger først tjenester, dernest i neste trinn velges rettigheter man ønsker og delegere. I tidligere løsning har en måttet søke opp én tjeneste om gangen for å delegere rettigheter.

### Fjernet lenke til gammel meldingsboks fra søk på tvers

Under Søk på tvers har det tidligere vært en gul informasjonsboks med lenke til gammel meldingsboks. Denne er nå fjernet. Det er ikke lenger mulig å nå gammel meldingsboks.

## Endringer i sluttbrukerløsnigen

### Oppgradering av skjemapakker med Infopath 2010 kompatibilitet

Sharepoint 2019 støtter ikke skjemapakker (Infopath xsn-filer) med Infopath 2007 kompatibilitet. For at det skal være mulig å flytte skjemaene (xsn-filene) på eksisterende plattform over på Sharepoint 2019 plattform må xsn-filene oppgraderes.
Det er laget en komponent som automatiserer oppgradering av xsn-filer. Komponenten er integrert i to moduler:
- Import fra TUL til SBL
- Console app som oppdaterer en xsn-fil direkte. Denne appen vil benyttes ved eksport/import når man skal senere skal oppgradere til Sharepoint 2019
Komponenten sikrer at tjenesteeierne ikke trenger å gjøre en manuell konvertering fra Infopath 2007 til Infopat2010 i TUL før oppgradering til Sharepoint 2019. Tjenesteeierne oppfordres likevel til å oppgradere skjemaer til å bruke Infopath 2010 kompatibilitet når man likevel gjør endringer på en tjeneste.

I V21.4 er integrasjonen i “Import til SBL fra TUL” skrudd av. Fra versjon V21.5 skal denne integrasjonen (konverteringen fra Infopath 2007 til Infopath 2010) default være på.

### Oppdatering av DotNetZip

DotNetZip brukes for å håndtere zip filer i SBL og TUL. Dette biblioteket er oppdatert til siste versjon. DotNetZip refereres nå via nuget pakke. 

### Bootstrap er oppgradert

Bootstrap er et front-end produkt som anvendes til design og tilpasning av responsive sider. Bootstrap er oppgradert til 4.6.0 i de deler av Mvc portalen som ikke benytter Altinn designsystemet. 

## Endringer i Autorisasjon

### Database prosedyrer for å fjerne delegeringer og samtykker og logge til Aktivitetsloggen når et selskap slettes

Det er laget to prosedyrer som sletter delegeringer når et selskap slettes:
- Alle delegeringer som går på Samtykker, delegation scheme og enkeltelement delegeringer. (ServDev.AuthorizationRule)
- Alle delegeringer av Altinn og Lokale roller (Authz.Role)

## Endringer i REST API

### Nytt endepunkt for oppdatering av DelegationScheme i Maskinporten API
 
Implementert endepunkt for å oppdatere et eksisterende DelegationScheme i Maskinportens API. Tidligere har det bare vært mulig å oppdatere scopes på et DelegationScheme, men med denne oppdateringen vil man nå ha mulighet å oppdatere alle felter i et DelegationScheme.

### Oppdatere jquery i REST

jQuery er et JavaScript-bibliotek utviklet for å forenkle klientskripting av HTML. Dette biblioteket er oppdatert for hjelpesidene til REST.

### Masseinnsending av fødselsnummer og etternavn knyttet til skjema for Kompensasjonsordningen (KFI)

Det var behov for en bulk variant av GetPersonRegisterData i forbindelse med det nye skjemaet til Kompensasjonsordningen (KFI). Vi har derfor opprettet RegisterDSFInfoPathSF.

## Endringer i Tjenesteutviklingsløsningen (TUL)

### Ny samtykkemal for generisk samtykke

Det er lagt til en generisk samtykkemal med generell ordlyd som skal benyttes i DSB sin samtykketjeneste.

## Diverse feilrettinger

### Feil med tilgang til parallell signering når man har rollen PASIG for flere organisasjoner

Det er blitt rettet en feil som gjorde at hvis man hadde rollen PASIG for flere organisasjoner så fikk man kun “tilgang til” rollen for den første organisasjonen man hadde rollen for.

### Det er mulig å endre aktør mens man har åpnet en Altinn 3 instans

Det er rettet en feil som gjorde det mulig å endre aktør mens man hadde åpnet et enkelt Altinn 3 element i portalen. Når man nå åpner et Altinn 3 element fra “søk på tvers” vil eieren av elementet bli valgt aktør. Dette er samme logikk som om man åpner et Altinn 2 element.

### Søk på AR-referanse fungerer ikke hvis man har veldig gamle data i meldingsboksen

Det er rettet en feil som gjorde at AR-referanse som søkenøkkel kun ble benyttes ved søk blant data i de to siste år. Eldre data ble søkt uten noen begrensende søkekriterier.

### Feil ikon på Rettigheter virksomheten har hos andre panelet

Det er rettet en feil der ikonene ble speilvendt. 

### Håndtere teknisk feil ved avansert søk på dato større enn 31.12.9999 og mindre en 01.01.1753

Det ble gitt teknisk feil hvis dato i avansert søk på dato større enn 31.12.9999 og mindre en 01.01.1753. Dette er nå rettet.

### Trykking på Avbryt i "Fjern rettigheter" side feilet

Tilbake-knappen er fjernet i "skjema og tjenester du har rettigheter til".

### PUT av Message med complete=false kunne gi valideringsfeil

Oppdatering av et skjema gjennom PUT operasjonen på message med complete=false kunne gi valideringsfeil. Dette er nå rettet.

 
