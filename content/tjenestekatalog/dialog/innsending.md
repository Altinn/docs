---
title: Innsending
description: Er en tjeneste der bruker fyller ut, signerer og sender inn et skjema
weight: 100
---

Er en tjeneste der bruker fyller ut, signerer og sender inn et skjema på www.altinn.no.
Skjemaet kan også fylles ut og signeres/sendes inn via applikasjoner (med REST-API) eller sluttbrukersystem.
Med REST-API kan skjema integreres på tjenesteeier sine egne nettsider og sendes inn derfra.
Innsendingstjenesten kan bestå av et enkeltstående skjema eller et skjemasett med eller uten filvedlegg.


### Fordeler og muligheter
I innsendingstjenester kan informasjon fra Folkeregisteret, Enhetsregisteret og brukerens profil preutfylles i skjema.
Det er også mulig å hente inn informasjon fra eksterne systemer. Tjenesteeier kan legge skjema klart i sluttbrukerens meldingsboks
i Altinn (abonnement) og det er mulig for tjenesteeier å sende inn data som skal forhåndsutfylles i skjema (preutfylling).
Sluttbruker kan varsles på sms og/eller e-post om at det ligger et skjema klart til utfylling i Altinn.

Det kan legges inn omfattende valideringsregler i skjema med tilhørende feilmeldinger.
Det kan også legges inn Hjelp-knapper som gir tilgang til hjelpeinformasjon under utfyllingen dersom sluttbruker ønsker hjelp.

En innsendingstjeneste kan presenteres på flere språk. Altinn har foreløpig språkstøtte for bokmål, nynorsk og engelsk.

Tjenesteeier definerer hvilken flyt tjenesten skal følge i Altinn (prosessflyt).
Med dette menes at man velger hvilke steg skjema skal gjennom hos utfyller.
En prosessflyt kan bestå av utfylling, et gitt antall signeringer, betaling og innsending.

Data registrert av sluttbruker sendes til eller hentes av  tjenesteeier over valgt grensesnitt.
Det er også mulig å tilrettelegge for at alle eller deler av dataene skal distribueres til en eller flere andre tjenesteeiere.

Hvis det er ønskelig kan innsendingstjenester lagres i tjenesteeiers arkiv i Altinn.
I dette arkivet kan tjenesteeier søke opp innsendte tjenester gjennom et nettlesergrensesnitt.
Disse søkene tilbys også som webservices slik at tjenesteeier sitt system kan hente ut informasjon fra dette arkivet.

#### Fordeler ved bruk av tjenesten
 - Sikker identifikasjon av bruker
 - Sikker dialog med bruker
 - Elektronisk signering
 - Bruker får veiledning og hjelp til utfylling
 - Validering av data under utfylling gir tjenesteeier bedre data
 - Skjema kan preutfylles med informasjon om bruker både fra interne systemer og eksterne registre som Enhetsregisteret og Folkeregisteret
 - Skjema kan legges klart i meldingsboksen til aktuelle brukere og det kan sendes varsel på e-post og/eller sms om dette
 - Tjenesten kan benyttes sammen med andre tjenester i samspill for å realisere en dialog mellom sluttbruker og tjenesteeier
 - Språkstøtte
 - Generering av PDF for utskrift og arkivering
 - Håndtering av prosessflyter (mulig med flere signeringer, betaling)


### Produkter som tilbys
 - Preutfylling
 - Oppslag i egne register 
 - Abonnement
 - Varsel
 - Kryptering
 - Prosessflyt
 - Betaling
 - Splitt av data
 - Tjenesteeiers arkiv

### Hvordan komme i gang
[Informasjon om hvordan man kommer i gang med å lage en innsendingstjeneste](https://altinnett.brreg.no/no/Tjenesteutvikling/Hvordan-utvikle-tjenester/Innsendingstjeneste/)

### Råd og tips
 - Før man starter med utforming av tjenester er det lurt å gjøre seg kjent med Altinn-plattformen og mulighetene som ligger der
 - Sett av god tid til planlegging og design av tjenesten
 - Få avklart at Altinn har alt av funksjonalitet som tjenesten krever
 - Vær oppmerksom på at i tillegg til utvikling av tjenester skal man ha på plass et mottakssystem og en integrasjon mellom tjenesteeier og Altinn. Erfaring viser at dette er mer tidkrevende enn man tror
 - Planlegger man omfattende bruk av Altinn kan det være hensiktsmessig å starte med en enkel tjeneste for å gjøre seg kjent med og få kompetanse på løsningen
 - Preutfyll skjema med opplysninger fra Enhetsregisteret eller Folkeregisteret og også med opplysninger fra egne systemer. Ikke spør etter data dere allerede har tilgang til 
 - Se gjerne en innsendingstjeneste i kombinasjon med andre tjenestetyper, som for eksempel meldingstjeneste, for å oppnå toveis kommunikasjon og en mer helhetlig prosess for sluttbrukeren


### Kanaler
 - REST-Api
 - Altinn-portalen
 - Sluttbrukersystem


### Avhengigheter
Innsendingstjenesten er en frittstående tjenestetype som kan benyttes i kombinasjon med andre tjenestetyper,
som meldingstjenester og varsling, eller som et element i en samhandlingstjeneste.
Det kan hentes inn informasjon i tjenesten fra tjensteeiers interne registre ved hjelp av webservice oppslag.
Kall til eksterne webservices skal gå gjennom en mapper (proxy). 

### Teknisk dokumentasjon
 - Funksjonell spesifikasjon – Sluttbrukerløsningen
 - [Implementasjonsguide for tjenesteeier](/docs/guides/tjenesteeier/implementasjonsguide/)