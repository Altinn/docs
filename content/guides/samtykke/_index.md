---
title: Samtykke
description: Samtykkebasert deling av data med bruk av token
---

## 1. Innledning
Gjennom samtykkeløsningen i Altinn kan brukeren gi samtykke til at en tredjepart, en datakonsument, får midlertidig innsynsrett på et spesifikt sett
med opplysninger om brukeren. Dette kan for eksempel være ligningsdata fra Skatteetaten.
Med brukerens samtykke vil datakonsumenten bli tildelt en tidsbegrenset lese-rettighet for en eller flere definerte ressurser representert ved tjenester i Altinn.

Det finnes flere alternative løsninger til hvordan samtykkedelegeringer kan gjennomføres.
Her beskrives bruk av samtykkeløsningen med dataflyt direkte mellom datakilde og datakonsument med bruk av self-contained OAuth 2.0 token utstedt av Altinn.
Tokenet, som blir signert med Altinns sertifikat, inneholder all informasjon knyttet til de delegerte rettighetene og
benyttes av datakonsument mot datakilde for at datakilde kan verifisere  at innholdet er pålitelig.
  

### 1.1 Målgruppe
Målgruppen for denne dokumentasjonen er datakilder og datakonsumenter som skal ta i bruk samtykkeløsningen hvor selve dataflyten skal gå direkte
mellom partene og hvor Altinn benyttes til tilgangskontroll.

### 1.2 Dokumentasjonens oppbygging

 - Kapittel 2 gir en overordnet beskrivelse av prosessen ved bruk av samtykkeløsningen og vil være nyttig både for datakilde og datakonsument.
 - Kapittel 3 gir en beskrivelse av hvordan samtykkeløsningen oppleves for sluttbruker.
 - Kapittel 4 er for kun for datakilde/tjenesteeier og beskriver hva de må utføre på sin side
 - Kapittel 5 er kun for datakonsument og bekriver hva de må utføre på sin side
 - Kapittel 6 inneholder en beskrivelse av oppbyggingen og innholdet i token og vil være av størst interesse for datakilde  


## 2. Beskrivelse av samtykketjeneste med ”Self-contained OAuth 2.0 token”
Self-contained OAuth-token betyr at tokenet i seg selv inneholder all informasjon om rettigheten(e) som er blitt delegert fra sluttbruker til datakonsumenten.

Figuren under viser prosessen med bruk av self-contained OAuth token i et lånesøknads case hvor en bank er datakonsumenten og skatteetaten er datakilden:  

{{< figure src="/docs/images/guides/samtykke/figur1.jpg" title="Figur 1 - Prosess" >}}


 1. Lånesøker går inn på bankens nettside for å søke om lån.
 2. Lånesøker bekrefter i søknadsprosessen at han ønsker å gi banken samtykke til å innhente ligningsopplysninger og blir sendt til Altinn for å gi samtykke.
 3. Lånesøker logger inn i Altinn og gir samtykke. Altinn registrerer samtykket og delegerer rettighet.
 4. Rettighetsdelegering er utført og det sendes en autorisasjonskode tilbake.
 5. Lånesøker sendes tilbake til siden som er angitt av banken i redirect-Url. I Url sendes autorisasjonskoden samt en status som forteller om samtykke ble gitt.
 6. Autorisasjonskoden benyttes av banken mot Altinn for å få tak i Altinn-signert self-contained OAuth token.
 7. Altinn sender signert token til banken.
 8. Banken benytter signert token mot Skatteetaten
 9. Tokenet verifiseres av Skatteetaten for å sjekke at innhold stemmer med ønsket utført operasjon og data returneres til banken.


## 3. Samtykkefunksjonaliteten for den som samtykker

### 3.1 Innlogging
I vårt eksempel med et lånesøknadscase så vil en lånesøker typisk gå til
bankens hjemmeside for å søke om lån. I noen tilfeller må man logge seg
inn i nettbanken først, i andre tilfeller trenger man ikke det.
Underveis i søknaden blir man spurt om å gi samtykke til at
ligningsopplysninger kan innhentes. Dersom man godtar dette blir man
sendt til samtykkesiden i Altinn. For å kunne gi et samtykke i Altinn må
brukeren identifisere seg for det offentlige ved å logge inn via
ID-Porten. Innen føderert BankID mellom bankene og ID-Porten er mulig,
må brukere potensielt logge inn to ganger.  


{{< figure src="/docs/images/guides/samtykke/figur2.jpg" title="Figur 2 - Innlogging ID-porten" >}}


### 3.2 Samtykkesiden

Etter innlogging vil sluttbrukeren bli presentert for en egen samtykkeside.
Figurene under viser et eksempel på hvordan en samtykkeside kan se ut i et lånesøknadscase:  

{{< figure src="/docs/images/guides/samtykke/figur3.jpg" title="Figur 3 - Samtykkesiden" >}}


Når sluttbruker har gitt samtykke blir rettighetsdelegeringen til datakonsumenten utført og brukeren blir sendt tilbake til siden som er
angitt av datakonsument i redirect-URL. Sluttbruker kan også velge å ikke gi samtykke.


### 3.3 Oversikt over gitte samtykker
Sluttbruker kan i Altinn gå inn på siden «Profil, roller og rettigheter» for å
få oversikt over hvem man har samtykket til å gi midlertidige innsyn til.  


Figuren under viser hvordan dette presenteres for bruker:

{{< figure src="/docs/images/guides/samtykke/figur4.jpg" title="Figur 4 - Oversikt samtykker" >}}

Fra denne siden kan man gå og se nærmere på det enkelte samtykket.


### 3.4 Trekke samtykke
Det vil være mulig å trekke et avgitt samtykke så fremt man ikke har avgitt et engangssamtykke.
Etter at samtykke er trukket vil det ikke lenger være mulig for datakonsumenten å få tilgang til data som sluttbrukeren opprinnelig samtykket til å dele.
For å trekke samtykke velger man «Se/trekk samtykke».
Har man avgitt et engangssamtykke vil dette ikke kunne trekkes da informasjonen i de fleste tilfeller hentes umiddelbart etter at man har samtykket.

{{< figure src="/docs/images/guides/samtykke/figur5.jpg" title="Figur 5 - Trekke samtykke" >}}


### 3.5 Aktivitetslogg
Sluttbruker får tilgang til en aktivitetslogg på sidene for «Profil, Roller og Rettigheter» som viser hvilke samtykker brukeren har gitt, når
de har utløpt osv. Loggen inneholder også alle andre rolle og rettighetsdelegeringer som er gjeldende for denne brukeren, for eksempel
rettigheter man har fått delegert på vegne av en virksomhet.  

{{< figure src="/docs/images/guides/samtykke/figur6.jpg" title="Figur 6 - Aktivitetslogg" >}}


## 4. Oppgaver som må utføres av datakilde/tjenesteeier
Her vil vi beskrive hvilke oppgaver datakilden må utføre for å få realisert en samtykketjeneste der autorisasjon skjer ved bruk av token.
Dette betyr at dataflyten går direkte mellom datakilden og data konsument og at tilgang til data autoriseres med innholdet i et token generert
av Altinn for datakonsumenten.
Siden dataflyten går utenom Altinn må datakilde/tjenesteeier tilby et tjenestegrensesnitt hvor datakonsumentene kan hente data fra.  


### 4.1 Opprettelse av lenketjeneste i tjenesteutviklingsløsningen (TUL)
Det må opprettes en tjeneste i TUL som benyttes til samtykke og tilgangskontroll. Til dette benyttes Altinn sin lenketjenestetype.

Kun tjenesteutviklere som har vært på kurs i regi av Altinn har tilgang til TUL og kan lage tjenesten.


#### 4.1.1 Definering av lenketjeneste 
Utgavenavnet vil vises for sluttbruker på samtykkesiden så det er viktig å velge et navn som også forteller hva slags data eller informasjon denne tjenesten tilbyr.
 
Feltet i Url er påkrevd men har ingen funksjon ved bruk av lenketjeneste i samtykkeøyemed.
 
Husk å angi at tjenesten skal bruke tjenesteeierstyrt rettighetsregister. Ved å angi dette vil man sikre at kun registrerte datakonsumenter
kan benytte samtykketjenesten. Vi vil senere beskrive hvordan man gir spesifikke organisasjoner eller personer lov til å spørre brukere
om samtykke ved å registrere disse i rettighetsregisteret for akkurat denne tjenesteutgaven.  

{{< figure src="/docs/images/guides/samtykke/figur7.jpg" title="Figur 7 - Utgaveparametre lenketjeneste" >}}


#### 4.1.2 Definere samtykketekst
Når man skal lage en lenketjeneste som skal benyttes i en samtykketjeneste må man gå inn på Samtykke-fanen i TUL å angi at utgaven
skal tillate samtykkebasert deling av data. Da blir det obligatorisk å fylle ut en samtykketekst som vil vises for sluttbruker under samtykkesiden.
Samtykketeksten skal forklare nærmere hva brukeren samtykker til. For at samtykke skal være gyldig må det være informert.
Det betyr at brukerne får informasjon som gjør at de forstår hva de samtykker til og hvilke konsekvenser det vil få for dem.
 
I vårt Lånesøknadscase så bør samtykketeksten si hvilke data banken henter fra Skatteetaten - om det er informasjon om lønn, gjeld eller andre forhold.
Samtykketeksten defineres av datakilden (tjenesteeier) men det er hensiktsmessig at datakilden og datakonsumenten blir enige om en tekst som er fornuftig å bruke.
For å kunne formatere tekst, legge inn lenker osv. må det benyttes html-kode. **NB! Det er kun tillatt med 1.000 tegn (eventuell html-kode regnes med).**

Det er i samtykketeksten mulig å benytte metadata-parametre dersom det er ønskelig å spesifisere hvilke del av data man ønsker tilgang til,
for eksempel dersom man ønsker tilgang til skattegrunnlaget for et gitt år.
Eksempel: «Opplysningene som utleveres gjelder for {intektsaar}.» Parameter for inntektsår må da være input i url som datakonsument sender sluttbruker
til samtykkesiden med. Dersom det er ønskelig at parameteret skal ha et bestemt format så må dette formidles til datakonsument. 

Når token genereres legges metadata med som en egen informasjon slik at datakilde kan verifisere at datakonsument spør om nødvendige data
(se kap. 6 for beskrivelse og validering av token). Metadata lagres sammen med samtykke-kontekst slik at dette vises historisk og i aktivitetslogg.

Hvis det kun skal være mulig for datakonsument å hente data èn gang for det avgitte samtykket så må dette angis ved å huke av for «Tillat bare engangssamtykker».

{{< figure src="/docs/images/guides/samtykke/figur8.jpg" title="Figur 8 - Utgaveparametre samtykketekst" >}}


Sett i forhold til samtykkesiden som sluttbruker får opp i Altinn så er utgavenavnet det som står i rød ramme og samtykketeksten det som ligger
i blå ramme i bildet av samtykkesiden nedenfor. Det som ligger i grønn ramme er metadata-parameter for `{inntektsaar}`:  


{{< figure src="/docs/images/guides/samtykke/figur9.jpg" title="Figur 9 - Sammenheng mellom TUL og samtykkesiden" >}}


#### 4.1.3 Registrere rolle på tjenesten
Før man migrerer tjenesten over til testmiljø og produksjon må det
registreres en rolle på den. Selve rollen man velger trenger ikke å være
delegerbar, men enkeltrettigheter på tjenesten må være delegerbare. Noen
roller er ikke delegerbare, for eksempel rollen «Privatperson», men
dersom man angir i TUL at den skal være delegerbar så betyr dette at det
ikke er mulig å delegere selve rollen videre men man kan delegere
enkeltrettigheter (når bruker gir samtykke så delegeres det en
enkeltrettighet til datakonsument). Som for alle typer tjenester i
Altinn så må man vurdere hvem som skal benytte tjenesten og sette rolle
ut fra dette. Er man i tvil om hvilken rolle som passer så kan man
kontakte Altinn for å få hjelp til å vurdere dette. Det er Altinn som
setter rolle på tjenesten så det må sendes en henvendelse via selvbetjeningsportalen eller til
[*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no) for å få dette utført.

Sikkerhetsnivå: En lenketjeneste må i utgangspunktet ha minimum
sikkerhetsnivå 3. Når det gjelder samtykkesiden så vil den alltid kunne
nås av sluttbruker fra sikkerhetsnivå 2 og høyere.

#### 4.1.4 Oversette tjeneste
Dersom tjenesten skal være tilgjengelig på flere språk må den
oversettes. Dette gjøres i TUL i seksjonen for oversetting. Språk som
det kan oversettes til/fra er bokmål, nynorsk og engelsk.

#### 4.1.5 Migrere tjeneste 
Før tjenesten kan testes må den migreres til testmiljø (TT02). Etter at
den er testet må den migreres til produksjonsmiljøet (PROD).


### 4.2 Registrere tjeneste i tjenesteeierstyrt rettighetsregister
Som tidligere nevnt må det på tjenesteutgaven som er opprettet i TUL
være angitt at tjenesten skal bruke tjenesteeierstyrt
rettighetsregister. Organisasjoner eller personer som skal få hente ut
data via tjenesten må registreres i rettighetsregisteret. Dette gjøres
ved å benytte webservice «RegisterSRRAgencyExternal» https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc?wsdl
og operasjonen «AddRights». En detaljert beskrivelse av dette finnes i
kapittel 4.4.1. (merk at beskrivelsen der er for testmiljø. Ovennevnte
url benyttes for produksjonsmiljøet). For å bruke Altinn sine
webservices må man ha en etatsbruker og passord. Har man ikke dette kan
det bestilles gjennom selvbetjeningsportalen til Altinn.

Det finnes også en operasjon for å liste ut gitte rettigheter samt slette rettigheter.  


### 4.3 Bruk av self-contained OAuth-token 
Self-contained Oauth 2.0 token er nøkkelen som datakonsumententen
benytter for å få tilgang til data som ligger hos datakilden. Altinn
utsteder et signert JSON web token (JWT). Tokenet inneholder all
informasjon knyttet til de delegerte rettighetene inkludert
tjenestekoder for lenketjenesten i Altinn, fødsels- eller
organisasjonsnummer som ga samtykke og rettigheter til
datakonsumenten, person- eller organisasjonsnummer for datakonsumenten
som fikk rettighetene, tidspunkt for når samtykke ble gitt og tidspunkt
for når rettigheten opphører. Det signerte tokenet må verifiseres av
datakilde ved å validere signaturen. Se kapittel 6 for informasjon om
oppbygging og verifikasjon av token.

Man kan også lese om JSON webtokens her: <https://jwt.io/introduction/>.

For å verifisere signert token må datakilden benytte Altinn sitt
offentlige sertifikat. Dette får man ved å henvende seg til
[*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no)/selvbetjeningsportalen.  


### 4.4 Test av tjeneste i Altinn sitt testmiljø
Tjenesten må testes ut i Altinn sitt testmiljø TT02: https://tt02.altinn.no

Forutsetninger for å teste:

1.  Må være etablert en samtykketjeneste i TUL. Tjenesten må være migrert til TT02.
2.  For å teste henting av token via REST-tjeneste trenger man APIkey knyttet til organisasjonsnummeret man skal teste med
3.  Man må ha fiktive testpersoner som kan benyttes i testen. Dette har
    i de fleste tilfeller datakilde tilgang til men dersom man ikke har
    dette må man sende en henvendelse til
    [*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no) eller benytte selvbetjeningsportalen for å få
    tildelt testbrukere.
4.  For å verifisere det signerte tokenet må datakilden benytte Altinn
    sitt offentlige sertifikat. Dette får man ved å henvende seg til
    [*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no) eller benytte selvbetjeningsportalen


#### 4.4.1 Registrere en datakonsument i tjenesteeierstyrt rettighetsregister 
For å få testet samtykketjenesten (lenketjenesten) må man først
registrere en test-datakonsument i tjenesteeierstyrt rettighetsregister
(SRR). Dette gjøres ved å benytte webtjenesten
«RegisterSRRAgencyExternal»:

https://tt02.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc?wsdl

Denne har operasjonene AddRights, DeleteRights og GetRights.

Eksempel på en request for å legge til rettigheter (her testet ved bruk av SoapUI):  

{{< figure src="/docs/images/guides/samtykke/figur10.jpg" title="Figur 10 – Legge til rettighet i tjenesteeierstyrt rettighetsregister" >}}

ServiceCode er tjenestekoden og ServiceEditionCode er tjenesteutgavekoden for lenketjenesten. Disse hentes fra TUL. Reportee angir hvilken organisasjon som skal få lov å hente ut data gjennom tjenesten. I Lånesøknadscasen må organisasjonsnummeret til banken som skal få lov til å hente data fra Skatteetaten legges inn. I test legger man inn organisasjonsnummeret til en fiktiv organisasjon man kan teste med. Hvilket domene sluttbruker kan sendes til etter at sluttbruker har godtatt samtykke eller ikke må også registreres. Dette legges inn etter AllowedRedirectDomain og er en sikkerhetsmekanisme som sørger for at Altinn ikke kan utnyttes til redirects vilkårlig. Angi kun domene/host (ikke path) og bruk wildcard (*) for å støtte flere sub-domener. Wildcard skal kun brukes på subdomene eller lavere nivå. Det er mulig å legge inn flere domener per org.nr. ved å skille de med semikolon. 

Eksempel på å fjerne en gitt rettighet:  

{{< figure src="/docs/images/guides/samtykke/figur11.jpg" title="Figur 11 - Fjerne rettighet fra tjenesteeierstyrt rettighetsregister" >}}

Eksempel på uthenting av gitte rettigheter:

{{< figure src="/docs/images/guides/samtykke/figur12.jpg" title="Figur 12 - Uthenting av gitte rettigheter" >}}


Det kan hentes pr. tjeneste eller pr. organisasjonsnummer.


#### 4.4.2 Teste samtykketjenesten 
Etter å ha registrert en test-datakonsument (fiktivt
organisasjonsnummer) i tjenesteeierstyrt rettighetsregister kan man
teste ut samtykketjenesten. Dette krever at tjenesten er migrert til
TT02 i TUL. En beskrivelse av hvordan man kan opptre som datakonsument
for å få testet tjenesten finnes i kapittel 5.5.1., og hvordan man
tester å veksle inn autorisasjonskode i token finnes i kapittel 5.5.2.

Se kapittel 6 for informasjon om oppbygging og verifikasjon av token.


## 5. Oppgaver som må utføres av datakonsument

Siden selve flyten av data går utenom Altinn så må datakonsumenten
avtale kommunikasjonsform med datakilden. Datakilden og datakonsumenten
står fritt til å velge kommunikasjonsform og det kan for eksempel være
via webservice, REST eller FTP.

Supporthenvendelser og bestilling av ApiKey sendes til [*servicedesk@altinn.no*](mailto:servicedesk@altinn.no).


### 5.1 Forutsetninger for å ta i bruk samtykketjenesten
Før man kan ta i bruk tjenesten må følgende være på plass:

1.  Aktuell datakilde må ha laget en samtykketjeneste som datakonsument
    kan benytte. Datakonsument trenger tjenestekode (serviceCode) og
    tjenesteutgavekode (serviceEditionCode) for gjeldende tjeneste(r)
    
2.	Aktuell datakilde må ha registrert organisasjonsnummeret til datakonsument i tjenesteeierstyrt rettighetsregister for ovennevnte tjeneste(r). I dette registeret må datakilden også registrere domene som sluttbruker skal returneres til etter å ha gitt sitt samtykke. Det er kun domene/host (ikke path) som legges inn og wildcard (*) benyttes for å støtte flere sub-domener. Dette må utføres både for testmiljø og produksjonsmiljø.   
    
3.  For å hente token trenger man ApiKey som er knyttet til
    datakonsument sitt organisasjonsnummer. Dette kan bestilles hos
    Altinn ved å sende en hevendelse til servicedesk@altinn.no. Det vil være en Apikey for test
    og en for å benytte i produksjonsmiljøet. ( **NB!** For Samtykkebasert lånesøknad er det Bits som administrerer dette på vegne av bankene. Se https://www.bits.no/project/sbl.)
    
4.  Man må ha fiktive testpersoner som kan benyttes i test. Dette må man
    få hos datakilden da dette må være testbrukere som også er lest
    inn i deres systemer
    
Hvis en har en policy på å stenge for utgående trafikk i brannmur  må en i så fall åpne opp for trafikk mot miljøene listet under.  

 Miljø | IP-adresse    | Navn           | Port 
------ | ------------- | -------------- | -----
 PROD  | 89.250.123.0  | www.altinn.no  | 443
 TT02  | 89.250.123.40 | tt02.altinn.no | 443 


DNS må sjekkes. Hvis en hardkoder IP adresser i DNS må en legge inn IP adressene listet over i DNS
(en vil typisk få Network error. Connection refused o.l hvis DNS ikke er oppdatert).



### 5.2 Sende sluttbruker til samtykkesiden
Datakonsument må sende sluttbruker til samtykkesiden med en parameter
som sier at den ønsker en autorisasjonskode tilbake etter at samtykke er
gitt (i dokumentet benyttes betegnelsen autorisasjonskode, men i url’er,
REST-tjeneste og token benyttes engelsk betegnelse – authorizationCode). Når låntaker for eksempel underveis i en søknadsprosess har angitt
at han ønsker å gi samtykke til at opplysninger om han kan innhentes så
må datakonsumenten sende brukeren til samtykkesiden i Altinn.

Nedenfor er et eksempel på URL til samtykkeside i produksjonsmiljøet i
Altinn. *Dette er bare et eksempel som viser oppbyggingen. URL må
tilpasses tjenesten som skal benyttes.* Skal samtykkesiden vises på
f.eks. engelsk må parametre som «DelegationContext» og eventuelle
metadata være på engelsk og verdi for engelsk må legges i "LanguageCode".

<https://www.altinn.no/ui/AccessConsent/?Resources=4629_2.4630_2&CoveredBy=910514458&RedirectUrl=https://www.altinn.no&ValidToDate=2019-09-30%2010:30:00&LanguageCode=nb-NO&DelegationContext=Ved%20%C3%A5%20samtykke,%20gir%20du%20Skatteetaten%20rett%20til%20%C3%A5%20utlevere%20opplysninger%20om%20deg%20direkte%20til%20Banken%20AS.%20Banken%20f%C3%A5r%20opplysningene%20for%20%C3%A5%20behandle%20s%C3%B8knaden%20din%20om%20finansiering.&ResponseType=code&4629_2_inntektsaar=2016&4630_2_fraOgMed=2017-06&4630_2_tilOgMed=2017-08>

Forklaring til parameterne i url finnes i tabellen nedenfor.  

 Parameter         | Format                                                  | Obligatorisk/valgfri | Beskrivelse                                                                                                                                                            
 ----------------- | ------------------------------------------------------- | -------------------- | -------------------------------------------
 Resources         | xxxx_x                                                  | Obligatorisk         | Tjenestekode og tjenesteutgavekode        på tjenesten som datakilde har definert som samtykketjeneste. Kan også være flere tjenester dersom det skal samtykkes til å dele data fra flere datasett hos en eller flere datakilder. Tjenestekode og tjenesteutgavekode separeres med underscore og ved bruk av flere tjenester separeres disse med punktum (eks. Resources=4629_2.4630_1) Kodene må man få hos datakilde
 CoveredBy         | organisasjonsnummer                                     | Obligatorisk         | Organisasjonsnummeret til datakonsument.<br>På samtykkesiden er det navnet som er knyttet til organisasjonsnummeret som presenteres.
 RedirectUrl       | gyldig url                                              | Obligatorisk         | Url som sluttbruker blir sendt tilbake til etter å ha samtykket/ikke samtykket til innsyn i data
 ValidToDate       | YYYY-MM-DD hh:mm:ss                                     | Obligatorisk         | Dato og tidspunkt for når samtykket opphører
 LanguageCode      | en<br>nb-NO<br>nn-NO                                    | Valgfri              | Angir hvilket språk sluttbruker skal få opp samtykkesiden på. Kan velge mellom engelsk (en), bokmål (nb-NO) og nynorsk (nn-NO). Sendes ikke språkkode med kommer samtykkesiden opp på språket som er satt av bruker i profilen i Altinn                                                                               
 DelegationContext | tekst                                                   | Obligatorisk         | Beskrivelse fra datakonsument på hva som er formålet med samtykket. *Det kan hende at det finnes føringer fra datakilde på utformingen av denne teksten. Sjekk med datakilde.*
 ResponseType      | code                                                    |  Obligatorisk        | Vil alltid være «code». Angir at man skal ha en autorisasjonskode i retur som skal benyttes for å hente token
 Metadata          | tjenestekode_tjenesteutgavekode<br>_parameternavn=verdi | Valgfri              | For å gi ekstra metadata kan det defineres en eller flere samtykkeparameter som generelt er valgfri men kan påtvinges av utformingen av samtykketeksten som er definert av datakilde (eks. 4629_2_inntektsaar=2016)


I figur 13 nedenfor kan man se sammenhengen mellom det som ligger i url og det som presenteres på samtykkesiden.  

{{< figure src="/docs/images/guides/samtykke/figur13.jpg" title="Figur 13 - Sammenheng mellom opplysninger i url og samtykkesiden" >}}


Når sluttbruker har fått opp samtykkesiden og gitt samtykke vil han
sendes tilbake til siden som er angitt i RedirectUrl. I denne url vil
det sendes med autorisasjonskode og status.

Eksempel på url hvor status er OK:

[*http://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK*](http://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK)

Eksempel på url hvor sluttbruker har valgt å trykke på knappen for «Nei, jeg vil ikke gi samtykke»:

[*http://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent*](http://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent)


### 5.3 Veksle inn autorisasjonskode i token
Altinn plattformen støtter at man kan veksle inn autorisasjonskoden via
REST med ApiKey. Det krever at man har ApiKey som er registrert på
organisasjonsnummer som matcher mottaker av samtykke. Ingen annen form
for autentisering er nødvendig. Bestilling av nye nøkler, eller
oppdatering av eksisterende, gjøres ved henvendelse til
servicedesk@altinn.no.

Tokenet som returneres vil være en streng bestående av et base64-encodet Json Web Token.

For å hente ut token ved hjelp av autorisasjonskode over REST gjør man GET på

[*https://www.altinn.no/api/authorization/token?authcode={AuthorizationCode}*](https://www.altinn.no/api/authorization/token?authcode=%7bAuthorizationCode%7d)

med header ApiKey: {apikey}

Eksempel på response (encoded token):
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9.eyJTZXJ2aWNlQ29kZXMiOi
I0NjI5LDEiLCJBdXRob3JpemF0aW9uQ29kZSI6ImY0NTQ5NDNlLTNiNTctNGI0YS1iYjRjLTNkZjY0YTgwMmQ4NyIsIk9mZmVyZWRCeSI6I
jA2MTE3NzAxNTQ3IiwiQ292ZXJlZEJ5IjoiOTEwNTE0MzE4IiwiRGVsZWdhdGVkRGF0ZSI6IjI3LjEwLjIwMTYgMjE6MTE6MTciLCJWYWxp
ZFRvRGF0ZSI6IjA1LjAxLjIwMTcgMTA6MzA6MDAiLCJpc3MiOiJhbHRpbm4ubm8iLCJleHAiOjE0Nzc1OTU1MTcsIm5iZiI6MTQ3NzU5NTQ
4N30.S9RBNazx2Ml0R93cSEf_LC5YP2UcYtFf7w6JH_OPy_MK1HhVIxA2e-5DQjPV53HmKBhlHmL3Wxz36KzIXddfz1olKLEK7Xqn61FJFL
TCiReKcySRcvDtRhLtFVH8zT-VcaEEXyA9_tTUumUVKTqy9vPMDOYAhmih55uT__Ghs5UQbxDZXLJ08f-SDUq-wlcbU8TFLfBnrQBxF53Sf
L3BvmjYTg_xm69mBRkGuW431fZnMiY_U3Omrd0gHniu8ri33lpEaL3ip1Lq65QC_jVzy2WHN1RdQCA5WiYGJ89GoSZL2eAtCS8d7qngsMUu
zBPpcn4hDiI7MkK4RWrAc2drTw

```
Se kap. 6.1 for eksempel på decoded token.

REST-tjenesten returnerer 403 dersom authcode er ugyldig eller Apikeyen
ikke har tilgang til angitt autorisasjonskode:

`403 The API key is not authorized for this operation, or the supplied authorization code is either expired or invalid.`

### 5.4 Hente data fra datakilden ved hjelp av Altinn-signert token 
Når datakonsument har mottatt Altinn-signert token benyttes dette i
request mot datakilden for å få tilgang til data. Formatet på hvordan denne informasjonen
overføres må avtales mellom datakilde og datakonsument, og styres ikke av Altinn.

Token har 30 sekunders varighet og datakonsument må be om nytt token når
det har gått ut (benytt samme autorisasjonskode om igjen).

### 5.5 Test av tjeneste i Altinn sitt testmiljø
Tjenesten må testes ut i Altinn sitt testmiljø TT02: [*https://tt02.altinn.no*](https://tt02.altinn.no)

Før man kan teste må forutsetningene listet opp i 5.1 være på plass.

#### 5.5.1 Teste samtykkesiden 
For å få brukt tjenesten og for å få opp samtykkesiden i Altinn kan man
benytte URL nedenfor. (*Dette er også bare et eksempel så den må
tilpasses til den tjenesten, organisasjonen osv. som er aktuell for
deres test.)*

<https://tt02.altinn.no/ui/AccessConsent/?Resources=4629_2.4630_2&CoveredBy=910514458&RedirectUrl=https://www.altinn.no&ValidToDate=2019-09-30%2010:30:00&LanguageCode=nb-NO&DelegationContext=Ved%20%C3%A5%20samtykke,%20gir%20du%20Skatteetaten%20rett%20til%20%C3%A5%20utlevere%20opplysninger%20om%20deg%20direkte%20til%20Banken%20AS.%20Banken%20f%C3%A5r%20opplysningene%20for%20%C3%A5%20behandle%20s%C3%B8knaden%20din%20om%20finansiering.&ResponseType=code&4629_2_inntektsaar=2016&4630_2_fraOgMed=2017-06&4630_2_tilOgMed=2017-08>

Se tabell i kap. 5.2 for en nærmere beskrivelse av parameterne i url’en.

URL fører sluttbruker til innloggingen til ID-Porten. Man må ha tilgang
til en fiktiv testbruker for å logge inn.

Når man har fått opp samtykkesiden og gitt samtykke vil testbruker
sendes tilbake til siden som er angitt i RedirectUrl. I denne url vil
det sendes med autorisasjonskode og status.

Eksempel på url hvor status er OK:

[*http://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK*](http://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK)

Eksempel på url hvor sluttbruker har valgt å trykke på knappen for «Nei, jeg vil ikke gi samtykke»:

[*http://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent*](http://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent)

Autorisasjonskoden benyttes til å hente token signert av Altinn. Se kapittel 5.5.2.

#### 5.5.2 Teste å veksle inn autorisasjonskode i token
Altinn plattformen støtter at man kan veksle inn autorisasjonskoden via
REST med ApiKey. Det krever at man har ApiKey som er registrert på
organisasjonsnummer som matcher mottaker av samtykke. Ingen annen form
for autentisering er nødvendig. Som nevnt gjøres bestilling av nye
nøkler, eller oppdatering av eksisterende, ved henvendelse til
[*servicedesk@altinn.no*](mailto:servicedesk@altinn.no).

Tokenet som returneres vil være en streng bestående av et base64-encodet Json Web Token.

For å hente ut token ved hjelp av autorisasjonskode over REST gjør man
GET på [*https://*
*https://tt02.altinn.no/api/authorization/token?authcode={AuthorizationCode}*](https://tt02.altinn.basefarm.net/api/authorization/token?authcode=%7bAuthorizationCode%7d)
med header ApiKey: {apikey}

Eksempel på response (encoded token):
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9.eyJTZXJ2aWNlQ29kZXMiOi
I0NjI5LDEiLCJBdXRob3JpemF0aW9uQ29kZSI6ImY0NTQ5NDNlLTNiNTctNGI0YS1iYjRjLTNkZjY0YTgwMmQ4NyIsIk9mZmVyZWRCeSI6I
jA2MTE3NzAxNTQ3IiwiQ292ZXJlZEJ5IjoiOTEwNTE0MzE4IiwiRGVsZWdhdGVkRGF0ZSI6IjI3LjEwLjIwMTYgMjE6MTE6MTciLCJWYWxp
ZFRvRGF0ZSI6IjA1LjAxLjIwMTcgMTA6MzA6MDAiLCJpc3MiOiJhbHRpbm4ubm8iLCJleHAiOjE0Nzc1OTU1MTcsIm5iZiI6MTQ3NzU5NTQ
4N30.S9RBNazx2Ml0R93cSEf_LC5YP2UcYtFf7w6JH_OPy_MK1HhVIxA2e-5DQjPV53HmKBhlHmL3Wxz36KzIXddfz1olKLEK7Xqn61FJFL
TCiReKcySRcvDtRhLtFVH8zT-VcaEEXyA9_tTUumUVKTqy9vPMDOYAhmih55uT__Ghs5UQbxDZXLJ08f-SDUq-wlcbU8TFLfBnrQBxF53Sf
L3BvmjYTg_xm69mBRkGuW431fZnMiY_U3Omrd0gHniu8ri33lpEaL3ip1Lq65QC_jVzy2WHN1RdQCA5WiYGJ89GoSZL2eAtCS8d7qngsMUu
zBPpcn4hDiI7MkK4RWrAc2drTw
```

Se kap. 6.1 for eksempel på decoded token.

REST-tjenesten returnerer 403 dersom authcode er ugyldig eller Apikeyen
ikke har tilgang til angitt autorisasjonskode:

`403 The API key is not authorized for this operation, or the supplied authorization code is either expired or invalid.`

Man kan laste ned Postman for å teste henting av token:
[*https://www.getpostman.com/apps*](https://www.getpostman.com/apps)  

{{< figure src="/docs/images/guides/samtykke/figur14.jpg" title="Figur 14 - Hente token ved hjelp av Postman" >}}


Når man har mottatt Altinn-signert token benyttes dette i request mot
datakilden for å få tilgang til data. Formatet på hvordan denne informasjonen overføres må
avtales mellom datakilde og datakonsument, og styres ikke av Altinn.

Token har 30 sekunders varighet og datakonsument må be om nytt token når
det har gått ut (benytt samme autorisasjonskode om igjen).


## 6. Beskrivelse og validering av Altinn Self-contained OAuth Token
Nedenfor er det en beskrivelse av oppbygningen og innholdet i Altinns
Selfcontained OAuth Token for samtykke, samt hvordan datakilde kan
validere et gyldig token. Self-contained Oauth 2.0 token er nøkkelen som
datakonsumententen benytter for å få tilgang til data som ligger hos
datakilden. Altinn utsteder et signert JSON web token (JWT). Tokenet
inneholder all informasjon knyttet til de delegerte rettighetene
inkludert tjenestekoder for lenketjenesten i Altinn, fødsels- eller
organisasjonsnummer som samtykket og tildelte rettigheter til
datakonsumenten, person- eller organisasjonsnummer for datakonsumenten
som fikk rettighetene, tidspunkt for når samtykke ble gitt og tidspunkt
for når rettigheten opphører

Ytterligere informasjon om JSON webtokens:
<https://jwt.io/introduction/>

### 6.1 JSON Web Token

Et JSON Web Token består av tre punktumseparerte deler:

 - Header
 - Payload
 - Signature

Under viser et eksempel på et signert og Base64-encodet self-contained JSON Web Token.

#### Header
Header inneholder informasjon om token typen og hvilken hash algoritme som er brukt.

##### Encoded eksempel:
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9
```

##### Decoded eksempel:
```JSON
{
  "typ": "JWT",
  "alg": "RS256",   
  "x5t":"mXGy2XES9W3b9beWTKff5XcQf1Q"
}

```

#### Payload
Payload inneholder påstandene (claims) i tokenet. Påstandene er den informasjonen som datakilden trenger
for å få bekreftet at datakonsumenten har fått et gyldig samtykke.

##### Encoded eksempel:
```
eyJTZXJ2aWNlcyI6WyI0NjI5LDIiLCI0NjI5LDIsaW5udGVrdHNhYXI9MjAxNSIsIjQ2MzAsMiIsIjQ2MzAsMixmcmFPZ01lZD1ub3ZlbWJl
ciAyMDE2LHRpbE9nTWVkPWphbnVhciAyMDE3Il0sIkF1dGhvcml6YXRpb25Db2RlIjoiMDkzZDAwNzAtMjJhZC00YzQ5LTlkNzEtZjUzNjdj
Zjk5MWI4IiwiT2ZmZXJlZEJ5IjoiMzAwNTAxMDEyMTEiLCJDb3ZlcmVkQnkiOiI5MTA1MTQ0NTgiLCJEZWxlZ2F0ZWREYXRlIjoiMjAxNy0w
NC0xOCAwOTozMzoxMyIsIlZhbGlkVG9EYXRlIjoiMjAxNy0wNi0zMCAxMDozMDowMCIsImlzcyI6ImFsdGlubi5ubyIsImV4cCI6MTQ5MjUw
MDk0MiwibmJmIjoxNDkyNTAwOTEyfQ
```

##### Decoded eksempel: 
```JSON
{
  "Services": [
    "4629_2",
    "4629_2_inntektsaar=2016",
    "4630_2",
    "4630_2_fraOgMed=2017-06",
    "4630_2_tilOgMed=2017-08"
  ],
  "AuthorizationCode": "c7dbe642-0fc1-4c3b-8959-8a92e3e1f17d",
  "OfferedBy": "11025802170",
  "CoveredBy": "910514458",
  "DelegatedDate": 1503855661,
  "ValidToDate": 1506760200,
  "iss": "altinn.no",
  "exp": 1503860347,
  "nbf": 1503860317
}
```

#### Signature
Signature inneholder signert og encoded header og encoded payload.
Algoritmen som er benyttet er beskrevet i header.

##### Encoded eksempel:
```
pumdz9xtOYk_mojdKU1X_uQlT3DKr4IUxoOSJPiLZ3SB2oy-R4Q40jn8gxdnxBLrGD3W1osra_v3x15Nrx9jsWUIz9eQA3H04cxeehTQBbM
MT7XZGU-XnCE34AtQScaDQnyPObPZEQeSvl2nmxNdfjgrzFLsapthiKYNuhv3lzSheTs06Ko3jWHTUg19X_2QSbpOmBVORTai8XeYrm1Tzq
_5CSxZo4pQEkxmBpSrtXcC3MuaF7cM514Bt-
```

##### Decoded eksempel:  
For å verifisere signaturen må datakilden benytte Altinns offentlige sertifikat.
Se under for detaljer om hvordan signaturen verifiseres.


#### Innhold i Payload
 
##### ServiceCodes
Inneholder en string eller et array of strings som representerer tjenestekodene for tjenesten(e) som er omfattet av samtykket brukeren har gitt.
ServiceCodes strengen er inneholder to verdier; ServiceCode og ServiceEditionCode separert med underscore.

Ved bruk av metadata for {inntektsaar}, {fraOgMed} og {tilOgMed} i samtykketekst:

Single Service:
```JSON
"ServiceCodes": "4629_2"
```

Multiple Services:
```JSON
"ServiceCodes": [
    "4629_2",
    "4630_2"
  ]

"Services": [
    "4629_2",
    "4629_2,inntektsaar=2016",
    "4630_2",
    "4630_2_fraOgMed=2017_06",
    "4630_2_tilOgMed=2017_08"
  ],

```

##### OfferedBy
OfferedBy inneholder Personnummer eller Organisasjonsnummer for den som har gitt samtykke. 

Eksempel:  
SSN: `"OfferedBy": "11025802170"`

OrgNo: `"OfferedBy": "999999999"`


##### CoveredBy
CoveredBy inneholder Personnummer eller Organisasjonsnummer for den som har mottatt rettigheter igjennom brukeren samtykke.

Eksempel:  
SSN: `"CoveredBy": "02056260016"`

OrgNo: `"CoveredBy": "910514458"`

##### ValidToDate
Dato og tidspunkt for når samtykket utløper

Eksempel: `"ValidToDate": 1506760200`

##### DelegatedDate
Dato og tidspunkt for når samtykket ble gitt.

Eksempel: `"DelegatedDate": 1503855661`

##### AuthorizationCode / Autorisasjonskode
Autorisasjonskoden som er benyttet for å hente det gitte tokenet.
Kan brukes av datakilde til å logge bruk av tokene og dermed informere brukeren om at datakonsumenten har hentet data. 

##### Iss
`iis` spesifiserer hvem som har utstedt tokened, som skal verfiseres mot signaturen.

Eksempel: `"iss": "altinn.no"`

##### Exp
Unikt tidsstempel som spesifiserer utløpstidspunket for det gitte tokenet. 

Eksempel: `"exp": 1474526471`

##### Nbf
Unikt tidsstempel som spesifiserer første gang det gitte tokenet kan brukes

Eksempel: `"nbf": 1492500912`

### 6.2 Verifisere JWT Token signatur
En enkel måte å teste og verifisere JWT token er [*jwt.io*](https://jwt.io/) webpage tool:  

{{< figure src="/docs/images/guides/samtykke/figur15.jpg" title="Figur 15 - Eksempel på decoding og verifisering av signature med jwt.io verktøyet" >}}

For å bruke nettsiden:

1. Lim inn komplett encodet JWT inkludert header, payload og signature.
2. Velg algoritmen RS256 fra nedtrekksmenyen.
3. Lim inn BASE64 encoded offentlig X-509 sertifikatet til Altinn under “Verify Signature”.

### 6.3 Eksempel på C\# decode og verifisering av signatur

Under vises et eksempel på en hjelpemetode som tar inn det offentlige
sertifikatet til Altinn og et encoded JWT token som en string. Metoden
benytter JwtSecurityTokenHandler Class (System.IdentityModel.Tokens) for
å gjøre den faktiske decodingen og verifikasjonen av signaturen, basert
på de spesifiserte TokenValidationParameters. Dersom valideringen er en
suksess inneholder SecurityToken informasjonselementer som SecurityKeys,
ValidFrom and ValidTo, og decodet JSON object som inneholder Header og
Payload.

MSDN links:

-   [*JwtSecurityTokenHandler*](https://msdn.microsoft.com/en-us/library/system.identitymodel.tokens.jwtsecuritytokenhandler)
-   [*SecurityToken*](https://msdn.microsoft.com/en-us/library/system.identitymodel.tokens.securitytoken(v=vs.110).aspx)

```csharp
private SecurityToken ValidateToken(X509Certificate2 publicCertificate, string tokenString)
{
    var tokenHandler = new JwtSecurityTokenHandler();

    // Token Validation Parameters
    var validationParameters = new TokenValidationParameters()
    {
        IssuerSigningKey = new X509SecurityKey(publicCertificate),
        ValidateAudience = false,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidIssuer = "altinn.no"
    };

    SecurityToken securityToken;
    tokenHandler.ValidateToken(tokenString, validationParameters, outsecurityToken);

    return securityToken;
}
```

## 7. Begrepsliste

 Begrep                                    | Forklaring                                                                                                   
 ----------------------------------------- | ------------------------------------------------------------------------------------------------------------
 Altinn autorisering                       | <ul><li>Verifisere at man har lov til å be om samtykke på en gitt tjeneste <li>Opprette og vedlikeholde nødvendige autorisasjonstilganger <li>Videresende sluttbruker til datakonsument <li>Svare på autorisasjonsforespørsler </ul>
 APIkey                                    | Application programming interface key <ul><li>en unik identifikator som det er knyttet tilgangsrettigheter til <li>knyttes til datakonsument sitt organisasjonsnummer <li>benyttes av datakonsument i tokenforespørsler mot Altinn </ul>                                                                                                                
 Authorization code/ Autorisasjonskode     | Kode som brukes av datakonsumenten til å få tak i Oauth token. Identifiserer et spesifikt samtykke
 CoveredBy                                 | Mottaker av samtykket – Dersom dette er en person kreves også etternavn på person. (CoveredByName)
 Datakilde                                 | <ul><li>Enhet som teknisk har data for bruker eller organisasjon <li>Verifisere mot autorisasjon om datakonsument har nødvendige tilganger </ul>
 Datakonsument                             | <ul><li>Part som ønsker tilgang til data <li>Ansvaret for å sende sluttbruker til Altinn for delegering av rettigheter til tjenestene <li>Ansvarlig for å be om data fra datakilde </ul>                             
 DelegationContext                         | Beskrivelse fra datakonsument på hva som er formålet med samtykket.
 LanguageCode                              | Angir hvilket språk sluttbruker skal få opp samtykkesiden på. Kan velge mellom engelsk (en), bokmål (nb-NO) og nynorsk (nn-NO)
 Metadata                                  | For å gi ekstra metadata til samtykketeksten kan det defineres en eller flere samtykkeparameter som generelt er valgfri men kan påtvinges av utformingen av samtykketeksten som er definert av datakilde (eks. 4629_2_inntektsaar= 2016)
 Oauth token                               | OAuth er en åpen standard for autorisasjon, ofte brukt som en måte for Internett-brukere å logge på tredjeparts nettsteder ved hjelp av sine Microsoft, Google , Facebook eller Twitter-kontoer uten å oppgi passordet sitt.
 OfferedBy                                 | Hvem som gir samtykket
 RedirectUrl                               | Hvor bruker blir sendt når delegering er gjennomført
 Resources                                 | Tjenestekode og tjenesteutgavekode på tjenesten som datakilde har definert som samtykketjeneste. Kan også være flere tjenester dersom det skal samtykkes til å dele data fra flere datasett hos en eller flere datakilder.
 ResponseType                              | Vil alltid være «code». Angir at man skal ha en autorisasjonskode i retur som skal benyttes for å hente token
 ServiceCodes                              | Representerer tjenestekodene for tjenesten(e) som er opprettet av datakilde
 Sluttbruker                               | Den som gir samtykke til utlevering av sine data eller en organisasjon sine data
 Tjenesteierstyrt rettighetsregister       | Tjenesteeier/datakilde kan kreve at tjenesten skal benytte Tjenestestyrt register: <br>Benyttes for å kontrollere <ul><li>Hvem som kan spør om tilgang til data gjennom deres samtykketjenester <li>Hvilket domene sluttbruker skal bli sendt videre til etter å ha gitt/ikke gitt samtykke </ul>
 ValidToDate                               | Gyldighetsperiode for samtykket