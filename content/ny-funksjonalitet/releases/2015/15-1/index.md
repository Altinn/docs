---
title: 15.1
description: Splitt av data, automatisert deploy, ny prosess-komponent, mastertjenester, ny startside i TUL, type-ahead i klientliste, +++
type: releasenote
releasenote_info: Release 15.1, produksjonssatt 13. januar, 2015.
weight: 300
---


Som vanlig inneholder februar-versjonen av Altinn endringer for selvangivelsen.
I tillegg kommer en rekke forbedringer og feilrettinger i øvrige deler av løsningen.  
Mange av endringene i den nye versjonen er ikke synlige for brukerne, men enkelte endringer vil være godt synlige.

## Meldingsboks

### Sortering av meldinger i arkiv (17349)
For å skape bedre oversikt i Min meldingsboks (MMB) ble det i juni 2014 innført en endring i «Til min
behandling» i MMB som sørget for at tjenester beholdt sin opprinnelige dato (opprettet eller
mottatt) og ikke bruke «sist endret»-dato til sortering i MMB. Nå vil denne endringen også gjelde for
skjema som arkiveres (i «Arkivert»). NB! Meldinger som allerede er arkivert vil fortsatt sorteres etter
datoen de ble arkivert.


## Tjenester

### Endring av design på knapper i tjenester (16427)
Designet på knapperaden moderniseres. Dette gjøres for å få knappene mer synlige, samt å rette en
rekke stylingfeil.

### Forbedring av brødsmulesti i tjenester (17180)
Vi gjør grafiske endringer for brødsmulesti i tjenester (stegene som vises på innsendingstjenester). Vi
retter opp i feil og endrer på det visuelle for å få en mer tydelig brødsmulesti.

### Knapp i "kontroller skjema"-pop-up (16405)
Mange brukere blir stående fast i et underskjema når de forsøker gå tilbake til hovedskjema og har
feil i det skjemaet de står i. Brukerne ser ikke lenken for å gå tilbake og rette feilene senere. Vi
innfører derfor en knapp med «Gå tilbake til hovedskjema og rett feilene senere» til venstre for
«Lukk»-knappen. På den måten blir det tydeligere for brukeren at man har to valg.

### Feilretting - Fjerning av tekst på kvitteringssida (15373)
Liten feilretting som går ut på å fjerne en overflødig tekst på kvitteringssiden for
innsendingstjenester. Teksten som fjernes er «Ingen signeringstekst».

### Håndtering av filvedlegg ved flere signeringssteg (17408)
Retting av en feil som fører til at filvedlegg i en del tilfeller ikke vises på signeringsside. Dette gjelder
fra og med signeringssteg to for vedlegg som er lagt til på tidligere signeringssteg. I tillegg vil det nå i
første signeringssteg inneholde sjekkboks-markør når det er mulig å legge til vedlegg ved signering

### Feilretting - IE 11-feil på siden oversikt skjema og vedlegg (16852)
Feilretting som sørger for at det ikke lenger skal være dobbelt opp med «Browse»-knapper under
«Legg til filvedlegg» på siden «Oversikt skjema og vedlegg» ved skjemautfylling i Internet Explorer 11.

### Fjerning av varsel til avgiver ved parallell signering (17482)
Ved parallell signering når avgiver også skal signere skal denne ikke motta melding eller varsel om at
signering skal utføres. Melding eller varsel ble tidligere sendt, men dette er nå blitt fjernet.

### Feilretting – Arkiverte meldinger i PSA-meny (17346)
En følgefeil fra 14.2 gjorde at arkiverte meldinger ikke ble vist i PSA-menyen. Dette er nå rettet slik at
arkiverte meldinger vises i PSA-menyen.

### Parallell signering og sluttbrukersystem (16350)
Ved parallell signering og innsending fra sluttbrukersystem ble det ikke sendt ut varsel for signering.
Dette er nå rettet slik at varsel sendes ut.


## Tilgangsstyring

### Feilretting – Deaktiverte på «Slett roller» (14186)
Feilretting som sørger for at knappene for å bla mellom sider i listen på «Slett roller» under
Tilgangsstyring ikke skal være deaktivert.

### Type-ahead i klientliste (12192)
Hvis man har flere enn 10 klienter, gjøres nedtrekkslisten i enkeltvis klientdelegering om til et
tekstfelt der man må skrive inn org.nr til klienten. I dette feltet innfører vi type-ahead-funksjonalitet
slik at listen viser treff som stemmer med det man skriver inn.

### Oppdatere overstyring av rettigheter (13084)
Vi innfører mulighet til å oppdatere eksisterende overstyringer av rettigheter. Til nå har man først
måttet slette eksisterende overstyring og deretter gjøre ny overstyring.

### Feilretting - Delegering av enkeltrettigheter (17132)
Feilretting som sørger for at man ikke får opp feilmelding om at delegering allerede er utført annet
enn i tilfeller der delegering faktisk er utført.

### Delegerbar rolle for rettighet til parallell signering (17420)
Vi innfører en ny delegerbar rolle til bruk ved parallell signering. Ved parallell signering gis de som
angis i skjema som noen som skal signere rettighet til å signere aktuell instans av skjema. Når dette
er en virksomhet, kan det være behov for å delegere rettigheten videre, noe som nå kan gjøres via
den nye rollen (som vil gjelde alle parallelle signeringer virksomheten skal gjøre).



## Informasjonsportalen

### Tydeligere markering av punktlister (16403)
Feilretting som sørger for at unummererte lister hvor punktene ikke er lenker blir markert som
punktlister.

### Feilrettinger i EPiServers redigeringsmodus (16884)
Retting av to mindre feil for redaktører. Endringen fører til at sammenligning av versjoner av sider
skal fungere, samt at det blir enklere å legge til utheving av innhold.

### Kontaktskjema for ABS (17220)
Det lages et nytt kontaktskjema for å sende spørsmål til Altinn brukerservice. Dette vil sikre at ABS
får mer av informasjonen de trenger for å kunne yte god hjelp til brukerne.

### Ny knapp for å gå til tjeneste (14534)
Vi innfører en ny knapp for å gjøre det tydeligere hvor man skal klikke for å gå fra informasjonssiden
om en tjeneste til selve tjenesten.

### Korrekt innloggingsstatus (15701)
Feilretting for å unngå situasjoner der det ser ut som at man er innlogget (man ser hvem som er 
innlogget og hvem man representerer ved siden av logg ut-knappen), selv om man har fått en timeout.



## Eksterne grensesnitt

### Bedret caching ved migrering av enkeltskjema i skjemasett (16245)
Endring som forhindrer at man må vente en time før man kan teste nymigrerte enkeltskjema ved
innsending fra sluttbrukersystem på grunn av mellomlagrede data.

### Videreutvikling av REST API (17439)
Forbedringer av REST API med bakgrunn i tilbakemeldinger og forretningsmessige behov. Innhold i
endringen fastsettes fortløpende (smidig utvikling).

### SubmitAttachmentStreamed (16795)
Forbedringer og bedre robusthet i sluttbrukersystemoperasjonen SubmitAttachmentStreamed.

### Tjenesteeiers arkiv og trukket samtykke (16266)
Feilretting som sikrer tilgang for mottakende etat på elementer som er lagret i tjensteeiers arkiv, selv
om sluttbruker har trukket samtykke.



## Integrasjonsplattform og grensesnitt

### Orkestrering på CorrespondenceConfirmation outbound shipments (16957)
Etter at Download Queue (DQ) ble innført har det blitt opprettet flere meldingstjenester og
lenketjenester som feilaktig er blitt knyttet til DQ i stedet for et grensesnitt (ShipmentDefinitionID =0).
Når data ble generert til tjenesteeiere fra disse tjenestene ble det sendt melding til
PrepareShipmentPart-orkestreringen. Siden grensesnittet ikke eksisterer førte dette til at
orkestreringen feilet og meldingen ble suspendert.

Med bakgrunn i dette endres det i SBL slik at det ikke genereres noen melding til
PrepareShipmentPart når ShipmentDefinitionID = 0. I tillegg endrer man i integrasjonsløsningen for å
gjøre orkestreringen mer robust, slik at denne ikke suspenderes selv om den skulle motta en ugyldig
melding om å sende et element tilknyttet en tjeneste som ikke er tilknyttet noe grensesnitt.

### Spesialbehandling av tegnene < > og & (17157).
Enkel endring for å unngå dobbel encoding av spesial tegn i data som overføres til etat. I dagens
løsning har det for eksempel vært firmanavn som har inneholdt '<' som har endt opp som '&lt;' hos etat.

### Reimplementasjon av «Splitt av data»-funksjonalitet (17152)
For noen innsendingstjenester skal deler av rapporteringen (hovedskjema/skjema i skjemasett)
sendes til flere tjenesteeiere. Selve splitten vil bli definert i TUL (splitt-siden). Ved bruk av denne
funksjonaliteten får man en mer fleksibel håndtering av informasjon.
Målet med denne endringen er å implementere splitt-data funksjonalitet på skjema nivå. I tillegg vil
det på skjemanivå være mulig å gjøre splitting uten bruk av XSLT, noe som vil gi god ytelse.
Kryptering på feltnivå, samt splitting på feltnivå vil ikke inngå i denne spesifikke aktiviteten, men
være mål for en framtidig release. 

### Brukernavn og passord på sendporter etter biztalk-deploy (17733)
Feilretting som sørger for bedre håndtering av brukernavn og passord ved biztalk-deploy.

### Refaktorering av sekvensnummerfunksjonalitet (17218)
Forbedring av ytelse og robusthet. Modellen for transportsekvens forenkles for å forhindre en del
kjente samtidighetsproblemer (deadlocks og timouts) i integrasjonsløsningen relatert til bruk av
sekvensnummerfunksjonalitet. I tillegg minimeres behov for låsing av sekvensnummer tabell, slik at
lese og skrive operasjoner kan gå uavhenging, unødige databasekall når et grensesnitt ikke har noen
sekvens fjernes.


## Teknisk arkitektur

### HTML som alternativ til PDF (17194)
Det innføres støtte for HTML som utskriftsformat i portalen. Om og når dette skal tilgjengeliggjøres
styres av tjenesteeier pr. tjenesteutgave. HTML som utskriftsformat vil føre til raskere
visning/nedlasting for brukerne og bedre kapasitet i løsningen.  
NB! Endringen blir ikke tilgjengelig umiddelbart etter produksjonssetting av ny versjon.


### Oppdatere prosess-komponent (13629)
Dagens prosessmotor som understøtter samhandlingstjenester fornyes og forbedres. Støtte for
eksisterende prosesser vil videreføres så lenge dette er nødvendig.

### Automatisert deploy (17274)
Deploy av plattform-komponenter automatiseres i systemtestmiljøene.

### Mer automatisert enhetstest (17273)
Dekningsgrad for automatisert enhetstest økes.

### Manglende indekser (15839)
Det innføres noen indekser i databasen for enda bedre ytelse.

### Endre datatype i tabell (16739)
For å understøtte fremtidig datavekst så må datatype i en tabell i databasen endres.



## Tjenesteutviklingsløsning

### Mastertjeneste som kan gjenbrukes (16684)
Vi implementerer nå en løsning som gjør at vi kan definere en innsendingstjeneste som en
mastertjeneste i tjenesteutviklingsløsningen. En slik tjeneste vil kunne gjenbrukes slik at man lager en
slavetjeneste. Denne slavetjenesten vil være en kopi av mastertjenesten, men ha sin unike ID. På
slavetjenesten kan man kun endre hvor dataen skal sendes og gyldighetsdatoen.

### Implementering av nytt visuelt design for startsiden i TUL (16953)
Vi gjør endringer på startsiden i TUL slik at den blir mer brukervennlig. Du vil nå få en oversikt over
dine sist brukte tjenester og utgaver. Kun de tjenesteeiere du har tilgang til vil vises på startsiden,
men det vil være en lenke for å åpne alle tjenesteeiere. Nederst på startsiden vil det være en
blog/wiki for kunnskapsdeling.
