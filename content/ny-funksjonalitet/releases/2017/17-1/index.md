---
title: 17.1
description: Digital post til virksomheter, dialog med egenregistrerte brukere, nye sider for pålogging, heving av sikkerhetsnivå for SMS, +++
type: releasenote
releasenote_info: Release 17.1, produksjonssatt uke 7, 2017.
weight: 400
---


Som vanlig inneholder februar-versjonene av Altinn endringer for selvangivelsen. I  tillegg er det en rekke endringer på andre områder.


## Autentisering

###  Heving av Altinn-SMS til nivå 3 (18726)
Dagens innlogging med SMS fra Altinn gir sikkerhetsnivå 2. Denne endringen gjør at den kan benyttes
til innlogging på nivå 3 etter at bruker bekrefter sine innloggingsopplysninger i profil. Endringen er
rettet i hovedsak mot brukere av sluttbrukersystemer, men tilgjengelig for alle brukere som vil
benytte [Altinn-SMS](https://www.altinn.no/ui/Authentication?page=Sms).

###  Nye autentiseringssider (19632)
Oppdatere til nytt visuelt design på [Altinn sine sider for autentisering](https://www.altinn.no/ui/Authentication/) (innlogging).  
De nye sidene skal være responsive og universelt utformet.

###  Støtte for HTTP POST-kall fra ID-porten (19991)
Teknisk endring i kommunikasjon med ID-Porten for å bedre ytelse. Ikke synlig for sluttbruker.

###  Videresending av Relaystate-parameter (19078)
Feilretting på autentiseringsmodulen for å gjøre korrekt videresending av mottatt parameter ved
SAML-autentisering.


## Brukskvalitet

###  Nye feilsider (19631)
I dag blir man sendt fra nye portalsider til feilsider i gammel portal. Vi oppdaterer designet for sidene
som viser følgende feilmeldinger:

 - Generiske feilmeldinger når en uventet teknisk feil oppstår
 - Feilmeldinger når bruker ikke er autorisert
 - Feilmeldinger ved Ajax-funksjonalitet skal gi bruker bedre respons.

De nye sidene skal være responsive og presentere feilmeldinger på riktig språk.


## Autorisasjon

###  Videreutvikling av Altinns autorisasjonskomponent (19781)
Autorisasjonskomponenten tilrettelegges for tilgangsstyring for tjenester som ikke er implementert
ved hjelp av TUL. Dette innebærer flere mindre endringer:

 - Tjenesteutvikler kan spesifisere egen delegeringstekst for en tjenesteutgave
 - Tjenesteeier kan enkelt sjekke hvilke avgivere en gitt bruker har rettigheter på vegne av, for å sjekke om vedkommende skal få tilgang til tjenesteeiers systemer
 - Tjenesteeier kan angi hvilke organisasjoner som skal kunne delegere rettigheter på en gitt tjeneste fra tjenesteeieren
 - Tjenesteeier kan sjekke hvilke rettigheter en gitt bruker har på vegne av en gitt avgiver
 - Rettigheter som er videredelegerte rettigheter fra organisasjon til ansatte skal automatisk slettes når rettighetene som er delegert til organisasjonen trekkes tilbake

###  Delegeringer som er gjort vises i liste etter at personen er død (18547)
Delegeringer vil slettes når den som har fått delegert rettigheter dør. Listen over hvem som har
tilgang blir ryddigere – brukere slipper å se navnet til personer som er døde.


## Eksterne grensesnitt

###  Forbedringer – egenregistrerte brukere (13275)
Vi muliggjør preutfylling, meldinger og varsling til [egenregistrerte brukere](https://www.altinn.no/ui/Authentication/SelfIdentified).  
Dette gjør at tjenesteeiere får bedre muligheter til dialog med denne brukergruppen.

###  Meldinger skal opprettes selv om varslingsadresse er ugyldig (19221)
I dag blir ikke meldinger opprettet om angitt varslingsadresse er ugyldig. Dette rettes. Det gir oss
bedre kontroll på innsendte meldinger fra tjenesteeiere, og tjenesteeierne får bedre tilbakemelding
på feilede varsler.

###  Svakhet i arkivreferanseknytningen på insertcorrespondence (19420)
Det vil nå gis bedre tilbakemelding til tjenesteeier på feilsituasjoner på innsending av meldinger med
feil arkiv-knytning.

###  My Fields i Download Queue (20398)
Vi endrer prosesseringen av skjema-xml som returneres over Download Queue slik at hjelpefelter
filtreres bort.

###  Forbedringer – Samtykkesiden (20401)
Vi forbedrer håndteringen av URL til [samtykkesiden](/docs/guides/samtykke/sluttbruker/samtykkesiden/)
fra eksterne sider, og innfører støtte for flere tokens i returnurl.

###  AltinnMapperContext for SBS/REST-innsendinger (20468)
Feilretting for å tilgjengeliggjøre kontekst om bl.a. autentisert bruker og tjeneste
(AltinnMapperContext) slik at denne informasjonen kan brukes til automatisk utfylling av felter i
skjemainnsendinger også fra REST og webservice.

###  Feilretting - logging skjer bare ved avvist instansiering ved innsending fra SBS (18451)
Vi innfører bedre logging av feilmeldinger i innsendinger fra [sluttbrukersystem](/docs/guides/sluttbrukersystem/).


## Tjenester

###  "Digital Post til Virksomheter" i Altinn (19319)
Altinn har rollen som postkasse for næringsliv og private virksomheter. Det utløser behov for
omgående endringer slik at flere enn kun dagens tjenesteeiere skal kunne ta dette i bruk. Altinn
oppretter flere felles meldingstjenester som kan benyttes til å sende post til virksomhetene.
Avsenderne har frihet til å definere navn på avsender, men det vil logges hvem som er avtalepart, og
hvem som står for transaksjonen.

https://altinnett.brreg.no/no/Veiledning/Digital-post-til-virksomheter/

###  Delegere rettigheter på enkeltinstanser til organisasjoner (20394)
I dagens løsning er det mulig å overstyre tilganger på enkeltelementer, men dette er begrenset til at
delegeringer kun kan gis til personer. Dette endres nå, slik at delegering på enkeltelementer i
meldingsboksen også kan gjøres til organisasjonsnummer.

###  Svakhet i regelmotor ved verdioverføringer (18971)
Ved oppdatering av underskjema som trigget verdioverføring til hovedskjema har det kunnet skje
duplisering eller sletting av verdi i hovedskjema. Dette blir nå rettet ved å endre en svakhet i hvordan
felter blir adressert.

###  Mangler i Altinn regelmotor for SERES skjema (18555)
All funksjonalitet i regelmotor er ikke støttet for SERES skjema. En del fungerer bare med OR skjema.
Dette blir nå rettet ved å sjekke spesifikt om det er angitt orid notasjon eller xpath.

###  Multiplisere og dividere i regelmotor (18958)
Det har vært behov for rikere funksjonalitet for å bruke matematiske funksjoner i regelmotor. Støtte
for bruk av multiplikasjon, divisjon, konstanter, flere typer avrunding samt utelukkelse av bruk av
bokstaver er nå implementert.

###  Flere e-post-adresser ved sending av kvittering (17784)
Sending av kvittering har så langt bare støttet sending til en mottaker. Kvittering kan nå sendes til
flere mottagere adskilt med semikolon.

###  Binære vedlegg uten filtype (16998)
Det har tidligere vært mulig å legge til vedlegg uten filtype. Dette er ikke lenger mulig. Bruker får en
feilmelding og kommer ikke videre dersom det blir forsøkt å legge ved filer uten filtype.

###  Sortering av vedleggstyper (20411)
Vedleggstyper har ikke vært vist i sortert alfabetisk rekkefølge. Vises nå sortert.

###  MVA-KID generator – Oversettelse til engelsk (20147)
Noen oversettelser til engelsk har manglet i MVA-KID generator. Termintekstene er nå oversatt og
med i løsningen.

###  RF-1030: Riktig melding hvis ikke kontonummer/utbetalingsmåte oppgis (20430)
Validering av kontonummerendring når kontonummer/utbetalingsmåte ikke er oppgitt gir uønsket
tekst i tilbakemelding til bruker for RF-1030. Dette er rettet slik at korrekt tekst vises.

###  Serverside kryptering (16188)
Endringen realiserer en løsning for å kryptere, lagre og dekryptere brukers tjenestedata serverside i Altinn.

###  BankID-logikk (18633)
Bugfix på logikk i BankID-signering, som ikke medfører synlige endringer for sluttbruker.


## Integrasjonsplattform

###  Fjerning av gammel PrepareShipmentPart-orkestrering (20400)
I [endring 17626](../../2015/15-2/#oppsplitting-av-prepareshipmentpart-orkestrering-basert-på-outbound-shipmenttype-17626)
ble det gjort endringer i forberedelsessteget for dataflyter.
Man beholdt likevel også gammel PrepareShipmentPart-orkestrering i en overgangsperiode. Nå er all
dataflyt flyttet til nye orkestreringer, og gammel orkestrering kan derfor fjernes.


## Driftsrutiner og registerintegrasjon

###  Feil håndtering ved innlesning av opplysninger fra Enhetsregisteret (17607)
Dagens batchoverføring av Enhetsregisterdata forskjellsbehandler ikke første gangs overføring fra 
andre overføringer. Dataene som overføres legges til. Data som ikke er med i en overføring blir
dermed liggende. Det er ønskelig å få denne oppførselen endret slik at utdaterte data blir fjernet.
Ved å utføre endringen vil det bli enklere å rette opp opplysningene på ER-kopien som ligger i Altinn.
Sluttbrukere med feil i opplysningene fra Enhetsregisteret vil få dette korrigert raskere enn tidligere.


## Teknisk arkitektur

###  Oppgradering av EO.PDF (20482)
Oppgradering av bibliotek som benyttes for å generere PDF for å oppnå økt skalerbarhet og bedre ytelse.

###  Timeout-håndtering (20483)
Forbedret håndtering av tekniske timouts for å oppnå økt robusthet.

###  Endre index (18986)
Endringer i indeksering for å redusere låsing i databasen.
