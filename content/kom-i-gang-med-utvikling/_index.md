---
title: Kom i gang med utvikling
description: Som utvikler trenger du tilgang til våre løsninger. Hvilke tilganger som er nødvendige avhenger av hva du skal utvikle. Du vil også ha behov for å gjøre noen bestillinger til oss, før eller underveis i utviklingsprosessen, for å kunne sende/motta data til/fra ditt system til Altinn.
weight: 5
aliases:
- /guides/kom-i-gang-med-utvikling/
---

**Bestillinger til Altinn gjøres i vår [Selvbetjeningsportal](https://smssp-sso.brreg.no/)**. I portalen velger du hva du skal bestille og legger inn de opplysningene det spørres om. Har du ikke tilgang til portalen kan du be om dette ved å sende en henvendelse til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no). Er du innleid konsulent må tilganger bestilles av den etaten/kommunen du jobber for.

For utvikling av tjenester trenger du tilgang til:

- **Altinn tjenesteutviklingsløsning (TUL)**
For å utvikle tjenester trenger du skrivetilgang til tjenesteeier sitt område i TUL.
Det finnes to ulike nivå for brukertilgang:

 - Ordinær tjenesteutvikling
Gir tilgang til å utvikle meldingstjenester og innsendingstjenester (skjema) uten avansert funksjonalitet som ikke støttes av Infopath. Gir også tilgang til å sette opp en lenketjeneste (Styring av tilgang). For å få slik tilgang kreves deltakelse på tjenesteutviklingskurs eller tilsvarende opplæring av      andre ressurser som har deltatt på kurs
 - Avansert tjenesteutvikling
Gir ovennevnte tilganger samt tilgang til å utvikle innsynstjenester (Hente data fra register) og innsendingstjenester (skjema) med oppslag til ekstern web service. Du får tilgang til Team Foundation Server for versjonshåndtering og til utviklingsserver i TUL. Det er her nødvendig med egen lisens til Visual Studio

- **SERES domeneklient**
Skal du utvikle en innsynstjeneste eller en innsendingstjeneste/skjema er det også nødvendig med tilgang til tjenesteeier sitt domene i SERES domeneklient.  I domeneklienten lager du en meldingsmodell og generer en XSD som benyttes som datamodell i ditt skjema/din innsynstjeneste.

For at dine systemer skal kunne sende eller motta data til/fra Altinn vil noen av bestillingene nedenfor være relevante for deg - avhengig av hvordan ditt system skal kommunisere med oss:

- **Web servicer**
For å kunne sende/motta data til/fra Altinn må tjenesteeier registrere sitt system og få passord som skal benyttes i kall mot Altinn. Alle tjenesteeiere har ved opprettelse i Altinn fått tildelt brukernavn og passord, men det er mulig å bestille flere tilganger. Tilgangen er IP-styrt.

- **FTP/SFTP grensesnitt**
For oversendelse av data til/fra Altinn via FTP/SFTP bestilles det et grensesnitt for dette.

- **Åpning i brannmur**
Åpning i brannmurer er nødvendig for grensesnitt med Altinn hvor tjenesteeier skal legge/hente filer på Altinn sin filserver (være aktiv part). Tjenester som gjør oppslag mot eksterne tjenester (Web Services) vil også trenge åpning i brannmurer hos Altinn.

- **API-nøkkel**
Altinns REST-API for tjenesteeiere er bare tilgjengelig med bruk av virksomhetssertifikat og krever at man har en API-nøkkel.

- **Testbrukere**
I Altinn sine testmiljø benyttes fiktive testpersoner og –organisasjoner. Mange av våre eksisterende tjenesteeiere har fått tildelt et sett med testbrukere. Har du ikke tilgang til testbrukere må du bestille dette.

Når tjenester og grensesnitt mellom deg og Altinn er ferdig testet må du bestille produksjonssetting:

- **Produksjonssetting**
Bestillinger du har gjort for integrasjon mot Altinn (webservice, åpning i brannmur, grensesnitt over FTP/SFTP osv.) må også bestilles for kommunikasjon mellom ditt og vårt produksjonsmiljø.
Tjenester, og eventuelt tilhørende kodelister, må produksjonssettes. Du gjør tjenesten klar for produksjon i tjenesteutviklingsløsningen (TUL). I tillegg må det bestilles en produksjonssetting da det er vår driftsleverandør som legger ut tjenestene i Altinn sitt produksjonsmiljø.
For en helt ny tjeneste skal det lages en informasjonsside om tjenesten under "alle skjema" på altinn.no. Du finner også en bestilling for dette.
