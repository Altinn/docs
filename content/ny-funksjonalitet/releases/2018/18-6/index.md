---
title: 18.6
description: Videresending av skatteoppgjør til andre digitale postkasser, feilrettinger m.m.
weight: 70
type: releasenote
releasenote_info: Release 18.6, produksjonssatt 14. juni 2018.
---


## Endringer i portal

### For skjema med status "Venter på andre" skal knappen som tar deg videre til skjema ha teksten "Gå til skjema"
Vi har endret tekst på knapp fra "gå til ..." til "gå til skjema" for elementer som har status "venter på andre".

For alle skjema, der brukeren ikke har rettigheter til å utføre nåværende steg, vil teksten på knappen som tar deg videre til skjemaet være endret.
Knappen heter "Gå til skjema" i stedet for "Gå til ...". Dette gjelder for alle skjema som er prefikset med "Venter på andre" i element-overskriften. 


### Det skal for angitte meldingstjenester være mulig for bruker å videresende til egen digital postkasse
Som bruker skal jeg kunne videresende skatteoppgjøret for 2017 til min valgte digitale postkasse.

Det er lagt inn en konfigurasjonsverdi som gjør det mulig å oppgi hvilke meldingstjenester som skal videresendes til brukers digitale postkasse.
Hvis bruker ikke har digital postkasse, skal brukeren likevel få muligheten til å gjøre det,
ved å bli sendt videre til Difi sine sider for oppretting av digital postkasse.

Når brukeren har videresendt en melding vil dette være synlig i ekspandert visning og i aktivitetsloggen.


### Forhindre at daglig leder for enkeltpersonforetak har tilgang til eiers personlige innboks
Vi har endret løsningen slik at eier filtreres bort fra daglig leders tilgangsliste.  
I tillegg filtrerer vi bort daglig leders tilganger, knyttet til innehaver.


### Altinn 1-elementer skal kunne fjernes på forespørsel fra bruker
Arkiverte elementer fra den aller første Altinn-løsningen skal kunne fjernes på forespørsel fra bruker.  
Løsningen som kalles for "Altinn 1" ble innført i 2003 og faset ut i 2013.


### Fjerning av ekstra side med valgbokser for kontakt på e-post og sms for ansatte i en virksomhet
Som bruker skal jeg kunne be om varsler på SMS og/eller epost for en virksomhet jeg har tilgang til.

Denne endringen fjerner den ekstra siden under "Din kontaktinformasjon for virksomhet",
der man tidligere kunne velge om man skulle motta varsling på epost og/eller sms.  
Varsling for enkelttjenester er flyttet til første siden under "Din kontaktinformasjon for virksomhet".

Man vil nå alltid motta varsling om man har oppgitt epost og/eller SMS som kontaktinformasjon,
med mindre man har lagt til varsling for enkelttjenester.
Hvis man har lagt til tjenester under "Varsling kun for enkelttjenester" vil man kun motta varslinger for de enkelttjenestene man har valgt i denne listen.

## Endringer i Autorisasjon på tjenester
For sluttbruker av altinn vil disse endringene ha lite å bety. 
For tjenesteutvikler i Altinn vil dette bety nye rutiner når man ønsker å endre autorisasjonsregler på en tjeneste som allerede finnes i produksjon. 

### Autorisasjon basert på TUL roller skal benytte reglene fra siste versjon av tjenesten

Dette betyr i praksis at de rollebaserte reglene knyttet til en tjeneste definert i TUL vil ha tilbakevirkende kraft når de importeres til SBL. 
Dette gjør det mulig for tjenesteeier å endre på reglene på en tjenesteutgave uten at det må bestilles databaseskript for å få kopiert reglene over på eldre versjoner av tjenesteutgaven.

Det er derimot ikke lenger mulig endre rolleregler på en utgave uten at det påvirker eksisterende versjoner. For å få til det må det lages en ny utgave av tjenesten. 
Endringer i rolleregler som krever ny utgave er f.eks være at man bytter prosessflyt (et eller flere steg legges til eller fjernes) eller at man for en samhandlingstjeneste endrer antall rollestyrte sider.

### Autorisasjonsregler definert i en lokal rolle skal gjelde alle versjoner av en tjeneste
Denne endringen betyr at rettighetene knyttet til en lokal rolle som ble definert når Altinn hadde versjon 1 av en tjeneste også har effekt på versjon 2 av tjenesten selvom denne ble importert etter at rollen ble laget. I forrige versjon av Altinn ble slike autorisasjonsregler automatisk kopiert fra forrige versjon til ny versjon av en tjenesteutgave ved import av tjenesten. Denne kopieringen var en meget krevende prosess som skapte problemer med tjenesteimport.

### En enkelt delegering skal gjelde alle versjoner av en tjenesteutgave
Enkeltrettigheter mot en tjeneste vil med denne endringen også fungere på fremtidige versjoner av tjenesteutgaven som enkeltrettigheten ble definert for. Denne endringen er nærmest identisk med endringen vedrørende lokale roller.

## Endringer i eksterne grensesnitt

### Oppdatere XML (FormData) i en innsendingstjeneste via web service
Det er nå mulig å oppdatere XML (FormData) i en innsendingstjeneste i innboks ved bruk av web service.

Det er lagt til nye eksterne grensesnitt for å oppdatere FormData på elementer som er til utfylling.
Dette er lik funksjonaliteten som allerede er laget for REST (https://www.altinn.no/api/Help/Api/PUT-who-messages-messageId-forms-formId).

De nye grensesnittene ligger i IntermediaryInbound:

- IntermediaryInboundExternalBasic.UpdateFormDataBasic
- IntermediaryInboundExternalEC.UpdateFormDataBasic

### Som tjenesteeier ønsker jeg at henvisning til notification types ikke skal være case-sensitive
Vi har endret kode slik at søk på template type, som skal brukes ved notification sending, ikke er case-sensitive.


## Endringer i integrasjon

### ReceiveRegisterDSF
ReceiveRegisterDSF batch oppdateres til å kjøre "comparative update", hvor den sammenligner innkommende personer
med eksisterende person i database og kun skriver til database når person er oppdatert.
For å kjøre "comparative update", kjør ReceiveRegisterDSF batch med argument "ComparativeUpdate=true" .


## Diverse bugfix

### "Spør meg senere"-knapp virker ikke i automatiske påminnelser for Din Kontaktinformasjon (20021)
Når man tidligere fikk opp automatiske påminnelser om å oppdatere Din Kontaktinformasjon, kunne man trykke "Bekreft" eller "Oppdatere".
Når man trykket "Oppdatere" ble man tatt til et nytt vindu, for å oppdatere teksten.
URL'en man vanligvis blir tatt videre til fra denne siden falt bort. Videre, hvis man trykket på "Spør meg senere"
manglet knappen en adresse å videreføre brukeren til.

Dette er nå løst slik at adressen blir satt riktig. Det er i tillegg lagt til en validering av adressen,
så det ikke er mulig å legge inn f.eks. javascript-lenker.

### Feil på klientdelegering og henting av rettigheter på klienter når tegnet ' inngår i navnet (19759)
Når man legger til nye brukere under klientdelegering dirigeres man via en side der brukerens navn havner i URLen.
Denne ble ikke riktig kodet, slik at tegn som "'" (enkelt-fnutt) førte til feil tolkning av URLen.
Dette er rettet opp slik at navn med spesielle tegn blir riktig kodet. Dette er rettet opp andre steder i klientdelegering, der søketekster ikke blir riktig kodet.

### Optimalisering av lagrede prosedyrer (20164)
Flere lagrede prosedyrer er optimalisert basert på monitorering i produksjonsmiljøet.

### Ny tabell i Maintainance DB for lagring av statistikk for lagrede prosedyrer (20273)
Vi har innført en ny tabell for lagring av statistikk.

### Konfigurasjon av caching (20242)
Det er innført en attributt i cache.config der man skrur av/på caching for alle nøkler. Vil kun benyttes for test/analyse/feilsøk.

### RFT15013 - Slett enkeltrettighet - kunden får ikke gjort dette selv (20214)
Det oppstår duplikater under kjøring av lagret prosedyre. Løses ved å innføre unik primærnøkkel i temporærtabell.

### Slett-knapp mangler for elementer i signeringssteg (20339)
En endring i autorisering førte til at "Slett"-knappen ble fjernet ved ekspandering av enkelt element i signeringssteget.
Retted ved å endre parameter i kall til autentisering.

### Ved migrering av en ny tjenesteversjon henter skjemavalidering feil logiske id for gamle elementer (20316)
LogicalFormSchemaDefinition ble før hentet ved å finne nyeste ServiceEditionVersionId for en tjeneste.
Om det ikke var overenestemmelse mellom LogicalFormId for schema og det som var brukt på elementet var det ikke mulig å oppdatere elementet gjennom REST/SOAP.
Dette er nå rettet opp.

### Feil på varsel - Altinn sender to SMS (20316)
Feilen kommer som ett resultat av KoFuVi-integrasjonen, men har vært mulig tidligere også.
Etter KoFuVi har alle telefonnummer registrert i felles 'Varslingsadresser for virksomheten' fått med landskode også for norske telefonnummer.

Dersom samme telefonnummer er registrer i 'Din kontaktinformasjon for virksomheten' uten landskode +47,
eller evt. med 0047 så ble ikke dette oppdaget som duplikat tisligere. Det ble sendt ut dobbel SMS.  
Dette er nå rettet opp i, med at man eksplisitt stripper bort landskode når man gjør sammenligning for duplikater.

### Correspondence Batch feiler når mottaker er en person uten brukerprofil i Altinn (20496)
Feilen kommer som ett resultat av sammenslåingen av logikk for validering og sending av varsel for Prefill, Correspondence og StandAlone.  
Dette er nå rettet opp i.