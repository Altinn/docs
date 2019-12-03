---
title: 18.8
description: Rediger lagrede søk, app uri scheme for samtykke, metadata på skjema, feilrettinger m.m.
weight: 50
type: releasenote
releasenote_info: Release 18.8, produksjonssatt 27. august 2018.
---


## Endringer i portal

### Tillatte app uri schemes i redirecturl for srr/samtykke

Tillatte app uri schemes i redirecturl for srr/samtykke
Det er lagt til støtte for å bruke egendefinerte schemas ved innleggelse av redirectUrls for tjenesteeier. Om schmea ikke er spesifisert tillates både HTTP og HTTPS.

### Rediger lagrede søk

Rediger lagrede søk og overskrive eller lagre som nytt søk
Når brukeren går inn på et lagret søk og deretter går til siden for å gjøre endringer Og der gjør en eller flere endringer i søkeparameterene, og deretter utfører søket og søkeresultatet vises. Det er lagt inn en ny modal hvor brukeren kan velge å oppdatere søket og beholde navnet eller bruker kan velge å lagre et nytt søk.

### Håndheve tjenestekrav til sikkerhetsnivå for samtykke delegering

Når tjenesteeier nå spesifiserer krav til sikkerhetsnivå for en tjeneste i TUL vil dette ikke bare påvirke krav til sikkerhetsnivå for bruk av tjenesten men også for å kunne gi samtykke til tjenesten, både gjennom samtykkesiden eller REST API. Det håndheves fortsatt minimumskrav satt til sikkerhetsnivå 2, tilsvarende som annen rettighetsdelegering i Altinn, selv for tjenester som spesifiserer lavere krav. Er bruker ikke logget inn med høyt nok sikkerhetsnivå vil bruker få samme feilmelding som ved bruk av tjenesten, med beskjed og mulighet til å gå til innlogging med korrekt nivå.

### Brukere kan se i profilen at de har reservert seg i KRR

Det er lagt til en advarsel-boks som informerer brukeren i tilfeller hvor de har reservert seg i KRR. Det er og lagt til en lagre-knapp for å oppdatere instillingen for kvittering på epost, slik at oppdatering av instillingene virker på lik linje med resten av løsningen (i stede for ajax request).

### I samtykkeprosessen er det sikret at brukere er innlogget i Altinn med rett fødselsnummer

Det er lagt til en ny parameter for å be om samtykke; UserToken. UserToken er valgfri. Om den er oppgitt må den inneholde en sha256-hash av personnummeret til brukeren. Hvis feil bruker er logget inn vil de bli omdirigert til innloggingssiden. Se https://altinn.github.io/docs/guides/samtykke/datakonsument/be-om-samtykke/

### Kan ikke lenger se fødselsnummer i lister over "mine aktører"

Ved utskrift av andre sitt personnummer enn ditt eget vil de 5 siste sifferene i personnummeret nå bli maskert av en “*“. Det vil si at f.eks. 121213 12345 vises som 121213 **.

### Klientroller for Revisor/Regnskapsfører er ikke lenger tilgjengelig for delegering under "Andre med rettigheter"

Alle klientrolle-typer blir nå filtrert bort fra oversikten på Andre med rettigheter i portalen.

### Delegeringssider tjenesteeiers arkiv er utvidet

Siden for rolleoverikt er utvidet med et nytt valg roller for en spesifisert mottaker. Dersom dette valget velges (Radioknapp) så kan brukeren fylle ut et tekstfelt med en fødselsnummer/organisasjonsnummer/brukernavn  det skal vises roller for.Etter tidligere fjerning av avkrysningsbokser for sms/epost-varsling i “din kontaktinformasjon for virksomheten”, ble ikke sjekken på om disse var aktive, fjernet, ved søk på kontaktinformasjon for virksomhet fra serviceowner-APIet. Denne sjekken er nå fjernet

## Endringer i TUL (tjenesteutvikling)

### Mulighet for å angi felter i xsd som skal legges ved forsendelsen som metadata

Tjenesteeier har mulighet til å definer metadatafelter som skal være mulig å trekke ut for å styre videre behandling av skjema, etter de er sendt fra Altinn.
Det er lagt inn en ny seksjon i innholdsreferanser, der tjenesteeier kan oppgi hvilke felter fra xsd’en som skal legges ved skjema som metadata.

## Endringer i eksterne grensesnitt

### Endring ER Batch/RegisterER Webservice

Konvertering fra flatfil til XML og innlesing av XML både internt og eksternt er utvidet med innlesing av flere felter.

### REST grensesnitt som tilbyr CRUD for KoFuVi

REST-grensesnittet for kontaktinformasjon er blitt oppdatert med POST for å legge inn ny kontaktinformasjon. Grensesnittet tar i mot samme modell som GET-requesten, men kun epos eller telefonnummer kan oppgis. REST-grensesnittet for kontaktinformasjons-endepunkter (/api/{orgNo}/profile/contactinformation/{id}) er blitt oppdatert med DELETE for å slette enkelte endepunkter. Se /api/help for mer.

### Lokal rolle opprettet på juridisk enhet skal også gjelde på underenheter

Endringen fører til at når det opprettes lokal rolle på juridisk enhet så gjelder dette også for underenheter.

## Andre endringer

### Implementering av nytt KoFuVi-grensesnitt

KoFuVi har satt opp et nytt grensesnitt for varslingsadresser.
Det gamle grensesnittet, /digitale_adresser, vil fortsatt være tilgjengelig både fra KoFuVi og i kodebasen.

### Virksomhetsbrukere skal få samme tilgang til underenheter som de har for hovedenhet

Virksomhetsbrukere har fått samme tilgang til underenheter som de har for hovedenhet.
Avgiverliste returnerer nå også underenheter når man henter avgivere for virksomhetsbruker.

### Mulighet for å lese inn felter som skal brukes til å anngi metadata ved uthenting av skjemaer

Det er lagt til mulighet for å lese inn felter som skal brukes til å anngi metadata ved uthenting av skjemaer.
Disse metadata-feltene spesifiseres per LogicalForm. XML-formatet i FormPresentationField.xml er utvidet med MetadataFields:

 ```xml
 <?xml version="1.0" encoding="utf-8"?>
 <ContentReferences>
  <PresentationFields formatVersion="1.0" xmlns:fpf="http://schemas.altinn.no/tul/2009/formpresentationfield">
    <PresentationField id="1" xPath="/Skjema/Skattyterinfor-grp-5801/info-grp-5802/EnhetOrganisasjonsnummer-datadef-18" pageName="view1.xsl" />
    <PresentationField id="2" xPath="/Skjema/Skattyterinfor-grp-5801/Kontakt-grp-5803/KontaktpersonNavn-datadef-2" pageName="view1.xsl" />
  </PresentationFields>
  <OverridableFields>
    <Field xPath="/Skjema/Skattyterinfor-grp-5801/Kontakt-grp-5803/KontaktpersonNavn-datadef-2" pageName="view1.xsl" />
  </OverridableFields>
  <MetadataFields>
    <Field xPath="/Skjema/Skattyterinfor-grp-5801/Kontakt-grp-5803/KontaktpersonNavn-datadef-2" pageName="view1.xsl"  key="kontaktpersonNavn" />
  </MetadataFields>
</ContentReferences>
```

## Diverse bugfix

### Duplikater i listen når man legger til epost adresser som allerede eksisterer i kontakt informasjon

Det var slik at om man la til to like eposter/telefonnummere ble det lagret og man fikk tilbake en liste som inneholdt duplikater. Når siden oppdateres blir duplikatene borte. Det er nå lagt til filtrering på duplikater slik at disse blir tatt bort før oppdateringen gjøres.

### Støtte for mellomrom og bindestrek i etternavn ved overføring fra selvregistrert (SI) bruker til fødselsnummer

Det ble ettet en feil i valideringsrutinen som gjorde at navn som “Van Helsing” eller “Bang-Hansen” ikke kunne oppgis, fordi mellomrom og bindestrek ikke var ansett som gyldige tegn.

### Din kontaktinformasjon under profil viste informasjon fra gammelt samtykke hvis det ikke fantes informasjon fra kontakt og reservasjonsregisteret

Dette er nå blitt fjernet. Kontaktinformasjon vil nå være blankt hvis Altinn ikke har informasjon fra kontakt og reservasjonsregisteret (KRR). Dette stemmer bedre med en tidligere endring hvor Altinn ikke lenger faller tilbake til informasjonen i samtykke profil hvis det ikke finnes noe i KRR.

### Det var ikke mulig å fjerne alle eksisterende varslingsadresser selv om man la til en ny

Administrasjon av varslingsadresser krever at det finnes minst en varslingsadresse. Logikken for dette hindret sletting av alle eksisterende adresser selvom det samtidig ble lagt til en ny. Dette er nå blitt justert slik at det er mulig å fjerne alle gamle adresser så lenge det legges til minst en ny adresse i samme operasjon.
