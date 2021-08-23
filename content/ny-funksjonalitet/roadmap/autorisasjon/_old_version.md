---
title: Roadmap Altinn Autorisasjon - Utgått 
hidden: true
description: Overordnet roadmap for videreutvikling av Altinn Autorisasjon i 2021 og 2022
weight: 920
---

Dette er en utdatert versjon av roapmap for Autorisasjon. Den ble erstattet av [ny roadmap](_index.md) august 2021 


## Planlagte endringer for Altinn Autorisasjon

Altinn har sett på hvilke planlagte større endringen vi kommer til å på autorisasjonsløsningen i 2021. 
Endrinene retter seg mot to hovedprosjekter og er en del av leveranser planlagt for disse
- Fufinn - fullmaktsløsning for innbyggere
- HELT - Helhetlig tilgangsstyring for virksomheter 
- Altinn 3.0
  
I tillegg så har vi flere andre endringer relatert til autorisasjonsfunksjonalitet som ikke er prosjektspesifikk men som kan være spilt inn fra tjenesteeiere eller som er nødvendig videreutvikling 
for å sikre en effektiv drift, forvaltning og videreutvikling av Altinn autorisasjon fremover.

Endringene er listet opp i prioritert rekkefølge. 

Backlogg for Altinn Autorisasjon er stadig under revisjon og kan forandres når som helst i løpet av året. 
Generelt kan man si at jo lenger frem i tid leveranse er planlagt jo mer usikker er prioritet og angitt leveransetidspunkt. 

# 2021 Høyest prioritet

### 1 - Tilby tilgangsstrying på app-nivå for tjeneste 3.0 (Q3 - 2021) 

Altinn Autorisasjon skal utvikle støtte for tilgangsstyring og autorisering av applikasjoner i Tjenester 3.0. 
Dette inkluderer autorisering på operasjonsnivå (f eks les, skriv, signer) og skal støtte applikasjoner med egne 

### 2 - Tilby alternativ til cookie-autentisering i REST (2.0) med OIDC/OAuth2-basert autentisering/delegering av tilgang til sluttbruker-API) (Q2 - 2021)
Ferdigstille funksjonalitet knyttet til [autentisering via REST API](/docs/api/rest/kom-i-gang/#autentisering) ved bruk av ID-porten. 
Dette inklurderer blandt annet å gi bruker oversikt over hvilke samtykker som er gitt til hvilke apper og nettsteder og vil gi en bedre oversikt over sammenhengen mellom IDporten og Altinn. 

### 3 - Oppgavebasert tilgangsstyring - erstatte roller med brukerorienterte oppgaver og tilgangsstruktur som begrenser innsyn (Q4 - 2021)
Dagens roller i Altinn er forholdsvis store og rommer tilgang til veldig mange tjenester. Det er derfor ønskelig å utforme brukerorienterte delegeringspakker/roller forenkler tilgangsstrying for de fleste. dette vil også sikre at man ikke får tilgang til mer enn man strengt tatt trenger. 


### 4 - Nødvendige endringer knyttet til KS svarut og behandling av meldinger med taushetsbelagt informasjon (Q1 - 2021)
For å sikre tilgang til meldinger med sensitiv innhold skal KS benytte Altinn Autorisasjon som informasjonspunkt for å gi tilgang til meldinger på instansnivå. Dette betyr at delegering av tilgang til instanser i innboksen må videreføres ved arkivering av melding. Endringen

### 5 - Integrasjon mot AA registeret  (Q2 - 2021)
AA-registeret (arbeidsgiver- og arbeidstakerregisteret) eies og forvaltes av NAV og er et grunndataregister som gir en oversikt over alle arbeidsforhold i Norge med noen få unntak. AA registeret skal tas i bruk som et hjelpemiddel og forenkling av tilgangsstyring i Altinn. 

### 6 - Omskriving av Autorisasjon-kapitlet i Docs (Q2 - 2021)
Beskrivelse av løsning for tilgangsstyring må oppdateres slik at den i større grad harmonerer med våre råd om hvordan bruke løsningen for å styre tilgang til andre tjenester.

### 7 - Vergemålsregister (Q2-2021)
Ta i bruk eksisterende vergemålsregister som autorisasjonskilde i Altinn

### 8 - Hente og videreformidle Advokat registeret (Q3 - 2021)
Hente informasjon fra advokatregisteret for å fornekle tilgangsstyring for advokater samt legge til rette for videreformidling av informasjon fra advokatregisteret til andre offentlig og private aktører

### 9 - Ferdigstille prioritert funksjonalitet knyttet til "be om tilgang" (Q1 - 2021)
Ferdigstille nødvendig funksjonalitet knyttet til [be om tilgang](/docs/utviklingsguider/autorisasjon/styring-av-tilgang/be-om-tilgang/)

### :heavy_check_mark:  10 - Tilby favoritter/alfabetisk visning ved valg av avgiver når man starter tjenste (Q1 - 2021)
Endringen gjelder 2.0 tjenester. Når bruker starter en 2.0 tjeneste i dag så må han velge hvilken aktør han skal utføre tjenesten for. Denne visningen skal forbedres og fornyes slik at aktørene viser valgte favoritter samt lister opp aktører alfabetisk, i tillegg til at aktør kan søkes opp. 

# 2021 - lavere prioritet

### 11 - Integrasjon mot eHelses fullmaktsdatabase (Q4 - 2021)
Gi innbygger oversikt i Altinn over hvilke fullmakter som er registert hos eHelse

### 12 - Tilgangsstyring i kunde-leverandør forhold (Q4 - 2021)
Ofte leier personer/virksomheter inn andre virksomheter til å utføre oppgaver for seg som innebærer bruk av tjenester i Altinn, f eks bistand på HR eller regnskapsføring.

I dagens Altinn delegerer en rettighet/rolle til Leverandørens organisasjonsnummer og nøkkelrolleinnehaver hos leverandør (eks daglig leder). Ofte er det andre ansatte enn daglig leder hos Leverandør som faktisk skal utføre oppgaven for kunden. Det er ingen enkel og oversiktlig måte å kunne delegere dette videre til egne ansatte for Leverandøren. I tillegg er det krevende å følge opp når ansatte hos leverandør skifter jobb.

Det skal etableres en løsning for tilgangstyring mellom Kunde og Leverandør som inkluderer en mer oversiktlig håndtering av tilganger på vegne av kunde. Løsningen vil gjøre det mulig for Leverandør å be Kunde om de tilganger de har behov for. I tillegg skal leverandør kunne administrere disse tilgangene for egne ansatte. 

### 13 - Økt sikkerhet ved delegering (Q4 - 2021)
Det skal innføres krav til ekstra pålogging på nivå 4 når en bruker delgerer såkalte "risky role types" til andre. En risky role type vil f eks være tilgangsstyrer og hovedadministrator. 

Når fullmakter gis på vegne av en person så skal det sendes et varsel til brukers kontaktinformajson registert hos KRR. Varselet vil informere om at en fullmakt er gitt på brukers vegne med beskjed om å kontakte Altinn hvis dette ikke er greit. 


### 14 - Mulighet til å delegere tidsbegrenset rettighet og rolle (Q2 - 2021)
Det skal innføres en mulighet for bruker å tidsbegrense en rettighet som gis med et utløpstidspunkt (utløpstidpunkt). Denne funksjonalitet finnes i dag for samtykke og fullmkater men ikke for roller og rettigheter til tjenester. 

### 15 - Forenkle og videreutvikle innbyggers oversikt over fullmakter (Q4 - 2021)
Altinn skal tilby biometrisk pålogging og pushvarsel som gir enkel tilgang til "mine fullmakter" og som gir beskjed når noen trenger en fullmakt. Denne appen vil også være tilgjengelige for brukere som opptrer på vegne av virskomheter, men vil være særlig tilpasset virksomheter med forholdvis få brukere. 
Det er også ønskelig å tilby pushvarsel som en alternativ varslingskanal til varsling på sms og epost

### 16 - Vise informasjon om rettigheter for altinn-tjenester i skjemakatalogen i altinn (Q4 - 2021)
For å gjøre det enklere for bruker å se hva vedkommende kan og ikke kan gjøre knyttet til en tjeneste ønsker vi å flytte autorisasjonsinformasjon i den kontekst hvor den trengs. 
Derfor ønsker vi å vise brukers rettigheter når hun slår opp et tjeneste i skjemakatalogen, se illustrasjon nedenfor. 

### 17 - Gjenstående arbeid etter første integrasjon mot FREG (Q2 - 2021)
For å reduesere risiko har Altinn i en periode hatt to løsnigner for å lese data fra folkeregisteret, gammel DSF-integrasjon og  integrasjon mot nytt FREG. 
For å sikre effektiv forvaltning og drift av autorisasjonsløsningen skal vi konsolidere og rydde opp i kode som ikke lenger er i bruk knyttet til gammel DSF-integrasjon. 

### 18 - Nedlastbar oversikt over alle delegeringer som er gjort for en virksomhet og alle dens underenheter (Q2 - 2021)
For å sikre tilgangsstyrer for virksomheter med flere underenheter en bedre oversikt på tvers tilbys en funksjonalitet for å laste ned oversikt over rettigheter som finnes. 
Det vil være mulig å hente ut oversikt for hovedenhet og tilhørende underenheter. 


{{%expandlarge id="autorisasjon3" header="2022" %}}

Listen er i prioritert rekkefølge for de 5 øverste oppgavene. 
###  - Oppgavebasert tilgangsstyring - erstatte roller med brukerorienterte oppgaver og tilgangsstruktur som begrenser innsyn (2022)
Dagens roller i Altinn er forholdsvis store og rommer tilgang til veldig mange tjenester. Det er derfor ønskelig å utforme brukerorienterte delegeringspakker/roller forenkler tilgangsstrying for de fleste. dette vil også sikre at man ikke får tilgang til mer enn man strengt tatt trenger. 


### 1 - Nytt vergemålsregister inn i Altinn
(beskrivelse av tiltaket kommer)
### 2 - Reimplementere BrokerService tjenester på REST
(beskrivelse av tiltaket kommer)
### 3 - Hendelsesdrevet løsning for publisering av formidlingshendelser
(beskrivelse av tiltaket kommer)
### 4 - Utvidelse av hendelsesfeed med standalone notification
(beskrivelse av tiltaket kommer)
### 5 - Vise informasjon om rettigheter for ekstern tjeneste i kontekst av tjenesten
(beskrivelse av tiltaket kommer)
### Integrasjon mot eHelse for å ta i bruk helsefullmakt for å styre tilgang til tjenester via Altinn Autorisasjon
(beskrivelse av tiltaket kommer)
### Ta i bruk API hos Finanstilsynet for å verifisere krav til autorisasjon (regn/revi/andre?)
(beskrivelse av tiltaket kommer)
### Tilby avgiverliste for virksomhet via SO-REST
(beskrivelse av tiltaket kommer)
### Forberede flytting av autorisasjon til sky (?) - analyse og muligheter
(beskrivelse av tiltaket kommer)
### Mulghet for å "si ifra seg" rettighet til tjeneste som man finner i innboksen
(beskrivelse av tiltaket kommer)
### Ta i bruk foreldreansvar som autorisasjonskilde i Altinn (FREG)
(beskrivelse av tiltaket kommer)

{{% /expandlarge%}}

