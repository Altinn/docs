---
title: Tjenesteeier webservice
description: Webservice-grensesnitt mellom tjenesteeiers systemer og Altinn for å sende og motta data.
weight: 150
---

Tjenesteeier må etablere et grensesnitt mellom sine etatssystemer og Altinn for å sende og motta data.
Altinn tilbyr to forskjellige grensesnitt for de fleste funksjonelle integrasjonpunkter.

Via webservice hvor tjenestekontrakter beskriver format for data og via batch på definerte standardformater.
I tillegg er det mulig å velge at data fra en innsendingstjeneste legges i en DownloadQueue som tjenesteeier kan hente ut ved å sende en forespørsel til Altinn.


### Fordeler og muligheter
Integrasjon via webservice muliggjør umiddelbar kommunikasjon og tilbakemelding på forespørsler.
Formater for integrasjon i Altinn er nesten utelukkende basert på bruk av XML.
Ved bruk av webservicer blir tjenesteeier sitt system autentisert og autorisert før det kan utføre operasjoner mot Altinn.
Tjenesteeiers system må være registrert i Altinn og passord mottatt før tjenestene kan benyttes.

Ved bruk av batch grensesnitt/filbasert integrasjon med Altinn benyttes FTP protokollen, fortrinnsvis SFTP (FTP over SSH), og det finnes to fremgangsmåter.
Altinn kan hente data fra tjenesteeier sitt system eller tjenesteeier kan levere data på et definert Altinn område, dvs. SFTP server må etableres av ekstern part.
Detaljer og tilpasning av den filbaserte overføringen avklares ved etablering.

Som en tommelfingerregel kan man si at skal man overføre færre enn 100 elementer (alternativt mindre enn 30 MB) kan man benytte web service grensesnitt,
men for store datamengder bør batch-grensesnitt benyttes. Tommelfingerregelen er scenarioavhengig og ingen absoluttgrense.
For overføring av store datamengder er det vel så viktig at eksterne systemer er optimalt konfigurert iht. ønsket grensesnitt.

Ved bruk av DownloadQueue tar tjenesteeier initiativet og henter data fra en innsendingstjeneste fra Altinn.
En slik løsning stiller mindre krav til tjenesteeier sitt system. DownloadQueue anbefales for mindre tjenesteordninger uten stort trykk ved innsendingsfrister.
Dersom det er ønskelig å bruke DownloadQueue på større tjenesteordninger må dette avklares med Altinn først.


### Funksjonalitet som tilbys

#### Innsendingstjenester
 - innsending av prefilldata
 - innsending av abonnementsdata
 - mottak av ferdig utfylte innsendinger fra Altinn
 - uthenting av innsendte data fra tjenesteeiers eget arkiv
 - uthenting av kvittering for status på innsending

#### Meldingstjenester
 - sende inn meldingstjenester
 - motta meldingsbekreftelse
 - sjekke status på meldingstjenester

#### Lenketjeneste
 - identifisere avgiver
 - etterspørre informasjon om hvilke avgivere en bruker kan representere

#### Formidlingstjeneste
 - transportere data via web service eller SFTP kanal, både for opp- og nedlasting
 - benytte tjenesteeierstyrt rettighetsregister for å begrense hvem som har tilgang til opp- og nedlasting av spesifikke tjenester
 - kvittering for status på overførte data

#### Innsynstjenester
 - motta informasjon om brukere som har aktivert en innsynstjeneste

#### Samhandlingstjeneste 
 - instansier en samhandlingstjeneste 
 - hente ut kjørende instanser av samhandlingstjenester 
 - knytte innsendingstjeneste til sak 
 - knytte meldingstjeneste til sak 
 - sett merknad på sak eller underliggende tjeneste 
 - sende hendelse til sak

#### Kvitteringer
 - hente kvitteringer for innsendte data 
 - kvittere for mottak av data 
 - hente lister med kvitteringer

#### Frittstående varsel
 - sende varsel til fødselsnummer eller organisasjonsnummer uten at varselet trenger å være tilknyttet en tjeneste

#### Autorisasjon
 - importere eksterne ressurser og regler for å avgjøre tilgang ved hjelp av tilgangsmekanismen i Altinn
 - etter å ha importert eksterne regler kan det gjøres kall mot Altinn for å benytte Altinns autorisasjonskomponent 
 - hente roller

#### Uthenting av tiltrodd tredjeparts logg 
 - tjenesteeiere vil ha muligheten til å hente ut logg over alle hendelser for innsendte innsendingstjenester


### Hvordan komme i gang
Under utvikling

### Råd og tips
Under utvikling

### Kanaler
 - **Webservices**: Overføring av data i sanntid. Tjenesteeier må etablere dedikert webservice angitt av Altinn på egen plattform, og motta innsendinger automatisk etter hvert som de arkiveres.
 - **Batch**: Satsvis overføring av data. Kan leveres til en tjenesteeiers mottakssystem dersom det er etablert, eller tjenesteeier kan hente data på et definert Altinn område.
 - **DownloadQueue**: Tjenesteeier henter data fra en kø ved bruk av webservice.


### Avhengigheter
Under utvikling

### Teknisk dokumentasjon
 - [Implementasjonsguide for tjenesteeier](/docs/guides/tjenesteeier/)

