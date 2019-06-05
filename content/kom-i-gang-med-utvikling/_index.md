---
title: Kom i gang med utvikling
description: Som utvikler trenger du tilgang til våre løsninger. Hvilke tilganger som er nødvendige avhenger av hva du skal utvikle. Du vil også ha behov for å gjøre noen bestillinger til oss, før eller underveis i utviklingsprosessen, for å kunne sende/motta data til/fra ditt system til Altinn.
weight: 5
aliases:
- /guides/kom-i-gang-med-utvikling/
---

Med våre [åpne API-er](/docs/api/) kan du integrere dine eksterne system mot eksisterende tjenester i Altinn. Du trenger ikke være tjenesteeier for å gjøre dette. For bruk av produktet “[Digital post til virksomheter](/docs/utviklingsguider/digital-post-til-virksomheter/)” trenger du heller ikke skrive under på en avtale, men må signere bruksvilkår.

Resten av våre produkter krever at din organisasjon er [tjenesteeier](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/) i Altinn. Du kan sjekke [her](https://www.altinn.no/om-altinn/om-altinn-samarbeidet/) om din etat eller kommune allerede bruker oss. Som tjenesteeier får du tilgang til en [ekstra del av Altinns API-er](/docs/api/tjenesteeiere/), og du kan produksjonssette tjenester gjennom våre verktøy TUL og Altinn Studio. Statlige etater, direktorater, tilsyn eller fylkeskommuner og kommuner kan bli tjenesteeiere i Altinn.

## Kom i gang som tjenesteeier
Dersom organisasjonen din er tjenesteeier i Altinn kan du utvikle digitale tjenester ved hjelp av våre verktøy og API-er. 

### Skal du bruke TUL eller Altinn Studio?
Fra høsten 2019 kan [Altinn Studio](/docs/altinn-studio), Altinns nye utviklingsløsning og sky-baserte infrastruktur, tas i bruk.
I første omgang vil du kunne lage enkle applikasjoner, og de funksjonelle behovene til de som er piloter vil ha fokus.

Skal du utvikle en kompleks tjeneste med avansert logikk, og planlegger produksjonssetting før 2020, anbefaler vi å utvikle den med [TUL](/docs/tul/) (tjenesteutviklingsløsningen).

{{% children description="true" %}}

### Tilgang til systemer
Når du er ny som tjeneseeier får du tilgang til et eget område/oversikt for på Altinn digitalisering. Den som er serviceleder hos din etat eller kommune kan selv gi tilgang til kolleger som skal jobbe med Altinn. 

Ut over det trengs det tilgang til verktøyer og webløsninger for intregrasjon.

**Bestillinger til Altinn gjøres i vår [Selvbetjeningsportal](https://smssp-sso.brreg.no/)**. I portalen velger du hva du skal bestille og legger inn de opplysningene det spørres om. Har du ikke tilgang til portalen kan du be om dette ved å sende en henvendelse til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no). Er du innleid konsulent må tilganger bestilles av den etaten/kommunen du jobber for.

For utvikling av tjenester trenger du tilgang til:

- **Altinn tjenesteutviklingsløsning (TUL)**
Dersom du skal utvikle tjenester med TUL trenger du skrivetilgang til tjenesteeier sitt område i TUL.
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


### Hva nå? 
Når du har fått tilgangene du trenger, kan du følge [brukerveiledningene under TUL](/docs/tul/) eller en av våre [utviklingsguider](/docs/utviklingsguider) for å sette opp og produksjonssette din tjeneste. Du velger om du vil ta i bruk produktene som de er eller integrere dem i ditt eget grensesnitt ved hjelp av API.
