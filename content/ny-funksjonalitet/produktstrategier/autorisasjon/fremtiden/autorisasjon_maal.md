---
title: Fremtidens mål 
weight: 200

---
Altinn Autorisasjon er en av fem produkter som tilbys gjennom Altinn plattformen. Produktstrategien for Altinn Autorisasjon er delt i 3 deler: 
- [Hva er Altinn Autorisasjon?](/docs/ny-funksjonalitet/produktstrategier/autorisasjon/)
- [Hvilke behov skal Altinn Autorisasjon løse?](../autorisasjon_behov/)
- [Hvordan ser fremtidens Altinn Autorisasjon ut?](../autorisasjon_maal/#fremtidens-altinn-autorisasjon)



## Fremtidens Altinn Autorisasjon

Altinn autorisasjon ble opprinnelig laget for å utøve tilgangskontroll til tjenester i Altinn. For å sikre
tilgang til privatpersoner og virksomheter ble Folkeregisteret og Enhetsregisteret tatt i bruk som
autoritative kilder. Etterhvert har det vist seg å være et stort behov i offentlig forvaltning for å få
bruke Altinn som autorisasjons løsning også for tjenester som ikke utvikles i Altinn.

Som felles autorisasjonsløsning for hele offentlig og privat sektor ønsker Altinn å være et
informasjonspunkt hvor eksterne tjenester henter autorisasjonsinformasjon som danner grunnlag for
egen tilgangskontroll til tjenestene. Dette krever nye API-tjenester for bedre å tilby sømløs og
effektiv samspill mellom ulike applikasjoner. Det krever også at brukergrensesnittet i Altinn-profil (på
Altinn.no) tilpasses et mye større antall tjenester enn det som finnes i dag.

For å sikre at Altinn autorisasjon og brukere av autorisasjonsløsningen har tilgjengelig og oppdatert
autorisasjonsinformasjon til enhver tid skal det etableres en logg for autorisasjonshendelser som
tjenestetilbydere kan abonnere på og få tilgang til.

Med flere aktører som bruker Altinn som autorisasjonsløsning kreves videreutvikling av løsningen for
å sikre kapasitet og ytelse for ulike bruksmønster. I tillegg må Altinn tilby en ny løsning hvor det er
enkelt for tjenestetilbydere å definere eksterne tjenester som skal tilgangsstyres i Altinn. Denne vil
erstatte “lenketjenester” som i dag brukes som autorisasjonstjenester i Altinn. Det kreves også en
rikere og mer strukturert beskrivelse av tjenestene. Dette kan løses ved bedre samspill mellom Altinn
Autorisasjon og løsningen Felles Datakatalog hvor beskrivelser at data og tjenester knyttes opp mot
rettigheter som styrer tilgangen til de samme data og tjenestene. 

!["Behov og mål for Autorisasjon"](../behov_målsetninger.PNG)

Behovene er beskrevet under [Fremtidens behov](../autorisasjon_behov/)

### Altinn autorisasjon skal ha sanntidstilgang til komplette grunndataregister

Oppdatering av Altinn Autorisasjon sin kopi av Enhetsregisteret og det sentrale folkeregisteret (DSF)
skjer i dag hovedsakelig batchvis hver natt. Dette gjør at nyregistreringer og endringer får en
forsinkelse fra de blir oppdatert i registrene og til endringen er registrert i Altinn. Det er viktig at
endringer i Enhetsregisteret som kan påvirke brukeres tilganger til digitale tjenester, blir registrert så
raskt som mulig i Altinn for å unngå misbruk og potensiell feilautorisert tilgang til (sensitiv)
informasjon. I forbindelse med etableringen av det nye folkeregisteret er det naturlig at Altinn også
får sanntidstilgang til folkeregisteret. Spesielt er dette viktig dersom det nye folkeregisteret også vil
inneholde informasjon om vergemål, og andre fullmaktsforhold registrert i registeret som kan
utnyttes til autorisasjon for digitale tjenester.

Altinn autorisasjon har i dag ikke mulighet til å utnytte grunndata fra Arbeidsgiver og Ansattregisteret 
(AA-registeret) til autorisasjon og tilgangskontroll for digitale tjenester. Det er et stort
gevinstpotensial i det å kunne utnytte det forhold at en person er ansatt i en bedrift som grunnlag for
tilgangskontroll for digitale tjenester. F.eks. vil en ansatt-relasjon være tilstrekkelig til at den ansatte 
får tilgang til enkelte tjenester. Opplysninger fra AA-registeret om at ansatte har begynt eller sluttet
vil også lette tilgangsstyring for virksomhetene betydelig, f.eks. ved at tilgangstyrer får varsel fra
Altinn om at medarbeider som er meldt ut av AA-registeret fortsatt har rettigheter på vegne av
virksomheten i Altinn.

I tillegg vil f.eks. opplysninger om arvinger, fullmakter i eHelse fullmaktsdatabase og informasjon fra
Advokatregisteret kunne brukes til å lette arbeid med tilgangsstyring for innbygger og virksomheter.
Informasjon om arvinger er en forutsetning for å lage tjenester for oppgjør etter dødsfall, fullmakter
registrert hos eHelse kan brukes til å styre tilgang hos enkelte kommunale helsetjenester og med
kjennskap til hvem som er godkjente advokater kan disse lettere få rettmessig tilgang til tjenester på
vegne av sine klienter

### Altinn skal tilby en komplett autorisasjonsløsning som forenkler tilgangsstyring for virksomheter og privatpersoner og sikrer høy tillit 

Det er flere aspekter ved dagens autorisasjonsløsning som hindrer at ulike bruksscenarier kan utføres
i Altinn, og at behovene for autorisasjon, tilgangsstyring og tilgangskontroll ikke er dekket fullt ut.

Med økt bruk av Altinn som autorisasjonsløsning er det behov for å forenkle brukerdialogen samt
tilby rikere tilgangsstyringsfunskjonalitet. Det er behov for å kunne be om en rettighet, samtykke
eller fullmakt slik at det blir enklere å få tilgang til de tjenestene man trenger. Det bør også være
mulig å gi tilganger med begrenset varighet, f.eks. når noen som trenger en rettighet kun er ansatt på
midlertidig basis. I dagens løsning vil alle som har en nøkkelrolle i en virksomhet (f.eks. daglig leder
og styrets leder) få tilgang til alle tjenester og meldinger. For å kunne støtte tjenester med
taushetsbelagt innhold skal Altinn Autorisasjon tilby tilgangsstyring til denne typen tjenester uten at
nøkkelroller nødvendigvis får tilgang til informasjonen i tjenesten.

Økt bruk av Altinns autorisasjonsløsning krever også bedre oversikter over rettigheter slik at
tilgangsstyring blir enklere og mer presist. Det må være lettere å se hvem som kan utføre en gitt
tjeneste i kontekst av den tjenesten en bruker er i. Det er også et behov for å kunne se hvem som
kan representerer en organisasjon på tvers av dens tilknyttede virksomheter (underenheter).
Autorisasjonsloggen som viser historikk i tilgangsstyring bør gjøres søkbar og det må være mulig å
finne ut når en rettighet sist ble brukt.

Altinn API for autorisasjon og tilgangskontroll har på noen områder begrenset funksjonalitet for å
kunne dekke et bredt spekter brukerscenarioer i applikasjoner hos offentlige og private
virksomheter. Dette oppleves ofte som hinder for å gi best mulig brukeropplevelse hos eksterne
tjenester. For at Altinn autorisasjon fullt ut skal dekke behovene må API-ene videreutvikles slik at
bruk av funksjonalitet er mest mulig selvbetjent, forståelig og logisk for utviklere, og gir optimal
ytelse på den infrastruktur Altinn autorisasjon kjører på. 

### Tilgangsstyring i kunde- og leverandørforhold
I mange tilfeller benytter innbygger eller virksomhet en ekstern leverandør til å utføre tjenester som
krever rettigheter til digitale tjenester. Altinn tilbyr i dag en klientadministrasjonsløsning for
rettighetsstyring mellom revisor/regnskapsfører og deres kunder. Regnskapsfører- eller revisorfirma
får da rettighet på vegne av kunden og kan deretter administrere denne videre til sine ansatte som
faktisk utfører oppdraget. Når kundeforholdet opphører vil også alle rettigheter som leverandørens
ansatte har fått på vegne av kunden opphøre. Det er stort behov for å kunne lage en tilsvarende 
klientadministrasjonsløsning for alle mulige kunde- og leverandørforhold. Kunden må slev peke ut sin
leverandør og leverandøren kan deretter administrere denne rettigheten til egne ansatte. Når
kunden avslutter sitt forhold til leverandør ved å trekke tilbake rettighet så vil også ansatte hos
leverandøren miste sine tilganger.

### Videreutvikle samtykkeløsningen
Selv om samtykkefunksjonaliteten, slik den er realisert nå, gir grobunn for mange nye
tjenesteordninger som kan gi store gevinster og innsparinger, er det fortsatt en minimumsløsning
som er implementert. Gevinstpotensialet og nye samhandlingsmønstre kan økes ytterligere ved å
videreutvikle samtykkeløsningen.

Det er et tydelig behov for å gi bruker bedre oversikt hvilke data som finnes og hvilke samtykker som
er brukt til å hente hvilke data. Samtykkeløsningen skal tilby sluttbruker oversikt over hva som deles
og på hvilket grunnlag. Samtykkeløsningen skal tilby dette basert på en loggføring av samtykke. Dette
må sees i sammenheng med den eksterne løsningen Felles Datakatalog, som gir oversikt over de
begreper, data og API-er som det offentlige forvalter og som skal kunne gjenbrukes og deles, f.eks.
via samtykke.

### Altinn skal være en fullmaktsløsning for innbyggere
Det overordnede behovet er å kunne sørge for en digital, sikker og effektiv kommunikasjon og
mellom forvaltningen og innbygger som ivaretar nødvendig rettssikkerhet og personvern - både for
innbyggere som representerer seg selv og for dem som representeres av andre. F.eks. er arbeidet for
verger svært komplisert fordi offentlige tjenester digitaliseres uten at det tilbys en mulighet for disse
å opptre på vegne av de som de er verger for.

Funksjonaliteten som må utvikles for å tilby en fullmaktsløsning for innbyggere er:
- Hjemmelsbasert fullmakt - Tilgjengeliggjøre opplysninger om representasjonsforhold fra
autoritative registre til bruk i tjenester som skal være tilgjengelig for representant
(fullmaktshaver, eksempelvis verge). I første omgang vergemål, foreldreansvar fra
Folkeregisteret og godkjente advokater fra Advokatregisteret)
- Brukerstyrt fullmakt - La innbygger legge inn egne fullmakter, dvs. muliggjøre at andre
utfører tjenester på egne vegne.
- Integrasjon med andre samtykke- og fullmaktsregistre som f.eks. fullmaktsforhold hos eHelse
og NAV, slik Altinn kan være et fullmaktsnav for offentlig og privat sektor
- Fellesløsningen skal gi mulighet for bruker å få et totalbilde av representasjonsforhold.
- Tilby en forenklet brukerflate som gjør det enklere å styre tilganger gjennom mobile
brukerflater

En fullmaktsløsning for innbyggere skal utvikles basert på eksisterende funksjonalitet i Altinn
Autorisasjon.

### Altinn skal samspille godt med ID-porten og Maskinporten
ID-porten er den mest brukt løsningen i offentlig sektor for identifisering og autentisering av
personer. Altinn har i dag en integrasjon med ID-porten ved hjelp av den aldrende teknologien SAML.
I tillegg forvalter Altinn ulike proprietære mekanismer for autentisering av personer på lavere
sikkerhetsnivå. Altinn tilbyr også egenutviklede løsninger for autentisering av systemer hos både
sluttbrukere og tjenesteeiere. 

ID-porten tilbyr i dag tilsvarende tjenester gjennom de åpne standardene OpenID Connect (OIDC) og
OAuth 2.0. Disse rammeverkene har svært stor utbredelse over hele verden og er tatt i bruk i både
offentlig og privat sektor. Mens ID-porten tilbyr person-autentisering, tilbyr Maskinporten
autentisering av systemer eid av virksomheter, samt en OAuth2-basert løsning for API-sikring.

Altinn ønsker å utvide og styrke samspillet med ID-porten og Maskinporten i alle scenarioer hvor det
kreves en autentisert person, virksomhet eller når det er tilstrekkelig å autentisere systemet. Dette er
i tråd med ID-portens produktstrategi som tar sikte på å i større grad benytte seg av
autorisasjonsdata fra Altinn for å berike tilgangsforespørsler- og svar mellom tredjeparter.

De eksisterende proprietære mekanismene i Altinn for autentisering fases ut, til fordel for løsninger
basert på ID-porten og Maskinporten. I tillegg til å bruke disse løsningene for å sikre egne API-er, skal
det legges til rette for at ID-porten/Maskinporten skal kunne benytte Altinn Autorisasjon i
forbindelse med sikring og delegering av tilganger for tredjeparts API-er utenfor Altinn. Tiltak rundt
dette som allerede er igangsatt, videreføres og videreutvikles i tett samarbeid med IDporten/Maskinporten.

OIDC/OAuth2 tilbyr veletablerte, sikre og både bruker- og utviklervennlige mekanismer for sikker
identifikasjon av personer og virksomheter, og finkornet deling av tilganger og data. Dette vil
betraktelig forenkle utvikling av nye digitale tjenester både på og utenfor Altinn-plattformen for
tjenesteleverandører i både offentlig og privat sektor.

### Gevinster
Den rike og avanserte funksjonaliteten som tilbys for autorisasjon, tilgangsstyring og tilgangskontroll
kan benyttes uavhengig av hvilken plattform, løsning eller prosess den offentlige virksomheten tilbyr
sine tjenester i, og tilgangene kan basere seg på grunndata i flere ulike registre som Enhetsregisteret,
Folkeregisteret og AA-registeret. Tjenestene Altinn Autorisasjon tilbyr er veldokumenterte og
benytter standard grensesnitt og protokoller.

Privatpersoner, frivillig sektor og næringsliv bruker i dag mye tid på å oppgi den samme
informasjonen til det offentlige flere ganger, og i mange sammenhenger er det nødvendig med
manuelle registreringer. Dette unngås med forbedrede autorisasjons-, samtykke- og
informasjonsutvekslingsløsninger på tvers av offentlige registre.

Ved at brukerne får kun tilganger de skal ha, og fordi dette oppdateres automatisk økes sikkerheten i
offentlige tjenester.

Altinn Autorisasjon vil med sine egenskaper være en premiss for at digitalisering i forvaltningen skal
støtte sammenhengende tjenester og livshendelser overfor sluttbrukere. Produktet vil inngå i et
felles økosystem for nasjonal digital samhandling og tjenesteutvikling. 