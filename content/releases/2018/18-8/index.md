---
title: 18.8
description: Mindre forbedringer, filopplasting i Safari, feilrettinger m.m.
weight: 50
type: releasenote
releasenote_info: Release 18.8, produksjonssettes 27. august 2018.
---

{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [18.7](../18-7) for siste versjon i produksjon.
{{% /notice %}}

***
## Endringer i portal

### Ekspanderende landkode for mobilnummer i Profil - Varslingsadresser for virksomheten
Felt for landkode for mobilnummer ekspanderer nå opptil 3 sifre med "+" foran.
Det har tidligere vært mulig å legge inn tre sifre, men teksten har havnet utenfor feltet.

### Klientdelegering på fil - delegering til brukernavn gir feilmelding "Feil: E-postadresse"
Det har tidligere vært litt uklart hvordan delegering på fil virker ved delegering til brukernavn.
Det har vært støtte for dette, der man har krevd at man ved delegering til brukernavn ikke skal oppgi etternavn/orgnr,
og dette førte til at man hadde en kolonne mindre for den relevante raden.

Om man ikke var klar over dette kunne man fort mistolke feilmeldingen man fikk, der etternavn ble tolket som rolle, og rolle ble tolket som epost.  
Dette er nå rettet opp i, ved at man kan spesifisere en tom kolonne etter brukernavnet,
slik at kolonne-strukturen blir den samme for alle typer rader.

Beskrivelse om hvordan man bruker formatet i opplastings-dialogen er oppdatert for å reflektere dette.

### Klientadministrasjon - kunne slette roller for flere ansatte uten å måtte lukke siden mellom hver gang
I visse tilfeller har ikke "Ferdig"-knappen blitt synlig ved bruk av av "Fjern alle"-knappen ved gjentatt bruk.  
Dette er nå rettet opp, slik at "Fjern alle"-knappene skal fungere som forventet.

### Bedre formatering i kvitteringsepost ved klientdelegering fra fil
Det var en forskjell på formatering i mailene vi sender ut for klientdelegering, avhengig av metode (enkeltdelegering / fildelegering).  
Formatet på epost ved fildelegering er forbedret og tilsvarer nå den som sendes ut når du får tildelt rolle/rettighet gjennom enkeltdelegering.

Det er også gjort en forbedring slik at alle får eposten på det språket de har valgt i portalen.

### Endringer i rolledelegering i etatsportalen
Det er lagt til to endringer på delegeringssiden og rettet en bug:

- På siden for å slette delegerte roller så er det lagt til et felt der man kan legge in id til bruker
  eller enhet slik at listen over roller som kan slettes filtreres.
- E-post som sendes ifbm. delegering eller sletting av delegering bytter ut navnet på den som delegerer med en tekst om at saksbehandler har delegert.
- I tillegg er en bug i e-posten dersom man delegerer til en enhet på tjenesteeier siden så ble både mottaker og avgiver av rollen satt til den privatpersonen som utførte delegeringen.
  Dette er endret til å sette etaten som avgiver og enheten som mottar som motaker.
  Det ville ikke gitt mening å skjule hvem som utfører delegeringen for så å oppgi dette navnet på et annet sted i e-posten.


## Endringer i eksterne grensesnitt

### Endring ER Batch/RegisterER Webservice
Konvertering fra flatfil til XML og innlesing av XML både internt og eksternt er utvidet med innlesing av flere felter.

### REST grensesnitt for oppdatering av data i KoFuVi
REST-grensesnittet for kontaktinformasjon (/api/{orgNo}/profile/contactinformation) er blitt oppdatert med POST
for å legge inn ny kontaktinformasjon. Grensesnittet tar i mot samme modell som GET-requesten, men kun epost eller telefonnummer kan oppgis.
REST-grensesnittet for kontaktinformasjons-endepunkter (/api/{orgNo}/profile/contactinformation/{id}) er blitt oppdatert med DELETE.
Se /api/help for mer.

### Lokal rolle opprettet på juridisk enhet skal også gjelde på underenheter 
Endringen fører til at når det opprettes lokal rolle på juridisk enhet så gjelder dette også for underenheter

### Fjerne sjekk på gamle varsel-flagg ved søk på “din kontaktinformasjon for virksomheten” fra serviceowner-APIet 
Etter tidligere fjerning av avkrysningsbokser for sms/epost-varsling i “din kontaktinformasjon for virksomheten”, ble ikke sjekken på om disse var aktive, fjernet, ved søk på kontaktinformasjon for virksomhet fra serviceowner-APIet. Denne sjekken er nå fjernet


## Endringer i TUL (tjenesteutvikling)

### Mulighet for å angi felter i xsd som skal legges ved forsendelsen som metadata
Tjenesteeier har mulighet til å definer metadatafelter som skal være mulig å trekke ut for å styre videre behandling av skjema, etter de er sendt fra Altinn.
Det er lagt inn en ny seksjon i innholdsreferanser, der tjenesteeier kan oppgi hvilke felter fra xsd’en som skal legges ved skjema som metadata.

## Andre endringer

### Implementering av nytt KoFuVi-grensesnitt
KoFuVi har satt opp et nytt grensesnitt for varslingsaddresser.
Det gamle grensesnitt, /digitale_adresser, vil fortsatt være tilgjengelig både fra KoFuVi og i kodebasen.

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

### Filopplasting i Safari på Mac
Brukere av Safari på Mac kunne ikke laste opp filvedlegg i et skjema. Denne feilen er rettet.

### Duplikater i listen når man legger til epost-adresser som allerede eksisterer i kontakt informasjon
Om man legger til to like eposter/telefonnummere, lagres dette og man får tilbake en liste som inneholder duplikater.
Når siden oppdateres blir duplikatene borte. Det er nå lagt til filtrering på duplikater slik at disse "tas bort" før oppdateringen gjøres.

### Rettet "søk på flere aktører" for konkursbehandling tjeneste
"Søk på flere aktører" og søker etter "konkursbehandling" (i innboks) får treff, men får feilmelding når man aksesserer elementene fra trefflista til søk.
Dette er nå rettet.
