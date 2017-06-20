---
draft: false
title: Samtykke
aliases:
menu:
  main:
    identifier: consent
    name: Samtykke
    parent: guides

weight: 100
---

## Samtykkebasert deling av data (med bruk av self-contained OAuth2.0 token)



## 1. Innledning
Gjennom samtykkeløsningen i Altinn kan brukeren gi samtykke til at en
tredjepart, en datakonsument, får midlertidig innsynsrett på et
spesifikt sett med opplysninger om brukeren som tidligere er innhentet.
Dette kan for eksempel være ligningsdata fra Skatteetaten. Med brukerens
samtykke vil datakonsumenten automatisk bli tildelt en tidsbegrenset
lese-rettighet for en eller flere definerte ressurser representert ved
tjenester i Altinn.

Det finnes flere alternative løsninger til hvordan samtykkedelegeringer
kan gjennomføres. Dette dokumentet beskriver bruk av samtykkeløsningen
med dataflyt direkte mellom datakilde og datakonsument med bruk av
self-contained OAuth 2.0 token utstedt av Altinn. Tokenet som blir
signert med Altinns sertifikat inneholder all informasjon knyttet til de
delegerte rettighetene og benyttes av datakonsument mot datakilde for at
datakilde kan verifisere at innholdet er pålitelig.

### 1.1 Målgruppe
Målgruppen for dette dokumentet er datakilder og datakonsumenter som
skal ta i bruk samtykkeløsningen hvor selve dataflyten skal gå direkte
mellom partene og hvor Altinn benyttes til tilgangskontroll .

### 1.2 Dokumentets oppbygging
-   Kapittel 2 gir en overordnet beskrivelse av prosessen ved bruk av
    samtykkeløsningen og vil være nyttig både for datakilde og
    datakonsument.
-   Kapittel 3 gir en beskrivelse av hvordan samtykkeløsningen oppleves
    for sluttbruker.
-   Kapittel 4 er for kun for datakilde/tjenesteeier og beskriver hva de
    må utføre på sin side
-   Kapittel 5 er kun for datakonsument og bekriver hva de må utføre på
    sin side
-   Kapittel 6 inneholder en beskrivelse av oppbyggingen og innholdet i
    token og vil være av størst interesse for datakilde


## 2. Beskrivelse av samtykketjeneste med ”Self-contained OAuth 2.0 token”
Self-contained OAuth-token betyr at tokenet i seg selv inneholder all
informasjon om rettigheten(e) som er blitt delegert fra sluttbruker til
datakonsumenten.

Figuren under viser prosessen med bruk av self-contained OAuth token i
et lånesøknads case hvor en bank er datakonsumenten og skatteetaten er
datakilden:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image2.png "Figur 1 - Prosess")


**Figur 1 - Prosess**

 1. Sluttbruker går inn på bankens nettside for å søke om lån.
 2. Låntaker bekrefter i søknadsprosessen at han ønsker å gi banken samtykke til å innhente ligningsopplysninger og blir sendt til Altinn for å gi samtykke.
 3. Sluttbruker logger inn i Altinn og gir samtykke og rettighetsdelegeringen blir utført.
 4. Når rettighetsdelegering er utført sendes det en autorisasjonskode tilbake.
 5. Sluttbruker sendes tilbake til siden som er angitt av banken i redirect-Url. I Url sendes autorisasjonskoden samt en status som forteller om samtykke ble gitt.
 6. Autorisasjonskoden benyttes av banken mot Altinn for å få tak i Altinn-signert self-contained OAuth token.
 7. Altinn sender signert token til banken.
 8. Banken benytter signert token mot Skatteetaten
 9. Tokenet verifiseres av Skatteetaten for å sjekke at innhold stemmer med ønsket utført operasjon og data returneres til banken.


## 3. Samtykkefunksjonaliteten for sluttbruker

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


![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image3.jpeg "Figur - Innlogging ID-porten")
**Figur 2 - Innlogging ID-porten**



### 3.2 Samtykkesiden

Etter innlogging vil sluttbrukeren bli presentert for en egen
samtykkeside. Figurene under viser et eksempel på hvordan en
samtykkeside kan se ut i et lånesøknadscase:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image5.jpg "Figur - Samtykkesiden")
**Figur 4 - Samtykkesiden**



Når sluttbruker har gitt samtykke blir rettighetsdelegeringen til
datakonsumenten utført og brukeren blir sendt tilbake til siden som er
angitt av datakonsument i redirect-URL. Sluttbruker kan også velge å
ikke gi samtykke.

### 3.3 Oversikt over midlertidige innsyn
Sluttbruker kan i Altinn gå inn på siden «Profil, roller og rettigheter»
for å få oversikt over hvem man har samtykket til å gi midlertidige
innsyn til.

Figuren under viser hvordan dette presenteres for bruker:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image7.png "Figur - Oversikt midlertidige innsyn")
**Figur 6 - Oversikt midlertidige innsyn**

Fra denne siden kan man gå og se nærmere på det enkelte samtykket.


### 3.4 Fjerning av samtykke
Det er mulig å fjerne et samtykke man har gitt. Etter at samtykke er
fjernet vil det ikke lenger være mulig for datakonsumenten å få tilgang
til data som sluttbrukeren opprinnelig samtykket til å dele. For å
fjerne samtykke velger man «Se og fjern samtykke» under midlertidig
innsyn

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image8.png "Figur 7 - Fjerning av samtykke")

**Figur 7 - Fjerning av samtykke**


### 3.5 Aktivitetslogg
Sluttbruker får tilgang til en aktivitetslogg på sidene for «Profil,
Roller og Rettigheter» som viser hvilke samtykker brukeren har gitt, når
de har utløpt osv. Loggen inneholder også alle andre rolle og
rettighetsdelegeringer som er gjeldende for denne brukeren, for eksempel
rettigheter man har fått delegert på vegne av en virksomhet.

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image9.png "Figur 8 - Aktivitetslogg")

**Figur 8 - Aktivitetslogg**


## 4. Oppgaver som må utføres av datakilde/tjenesteeier
I dette kapittelet vil vi beskrive hvilke oppgaver datakilden må utføre
for å få realisert en samtykketjeneste i Altinn der samtykkedelegeringen
skjer ved bruk av token, men hvor selve dataflyten går direkte mellom
datakilden og data konsument. Siden dataflyten går utenom Altinn må
datakilde/tjenesteeier tilby et tjenestegrensesnitt datakonsumentene kan
hente data fra.


### 4.1 Opprettelse av lenketjeneste i tjenesteutviklingsløsningen (TUL)
Det må opprettes en tjeneste i TUL som benyttes til samtykke og
tilgangskontroll. Til dette benyttes Altinn sin
lenketjenestetype.

Kun tjenesteutviklere som har vært på kurs i regi av Altinn har tilgang
til TUL og kan lage tjenesten.


#### 4.1.1 Definering av lenketjeneste 
Utgavenavnet vil vises for sluttbruker på samtykkesiden så det er viktig
å velge et navn som også forteller hva slags data eller informasjon
denne tjenesten tilbyr.

Feltet i Url er påkrevd men har ingen funksjon ved bruk av lenketjeneste
i samtykkeøyemed. Husk å angi at tjenesten skal bruke tjenesteeierstyrt
rettighetsregister. Ved å angi dette vil man sikre at kun registrerte
datakonsumenter kan benytte samtykketjenesten. Vi vil senere beskrive
hvordan man legger til organisasjoner eller personer som skal
registreres i rettighetsregisteret for akkurat denne tjenesteutgaven og
dermed får anledning til å be brukere samtykke i å dele sine data.

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image10.png "Figur 9 - Utgaveparametre lenketjeneste")
**Figur 9 - Utgaveparametre lenketjeneste**


#### 4.1.2 Definere samtykketekst
Når man skal lage en lenketjeneste som skal benyttes i en
samtykketjeneste må man gå inn på Samtykke-fanen i TUL å angi at utgaven
skal tillate samtykkebasert deling av data. Da blir det obligatorisk å
fylle ut en samtykketekst som vil vises for sluttbruker under
samtykkesiden. Samtykketeksten skal forklare nærmere hva brukeren
samtykker til. For at samtykke skal være gyldig må det være informert.
Det betyr at brukerne får informasjon som gjør at de forstår hva de
samtykker til og hvilke konsekvenser det vil få for dem.

I vårt Lånesøknadscase så bør samtykketeksten si hvilke data banken
henter fra Skatteetaten - om det er informasjon om lønn, gjeld eller
andre forhold. Samtykketeksten defineres av datakilden (tjenesteeier)
men det er hensiktsmessig at datakilden og datakonsumenten blir enige om
en tekst som er fornuftig å bruke. For å kunne formatere tekst, legge
inn lenker osv. må det benyttes html-kode. **NB! Det er kun tillatt med
600 tegn (eventuell html-kode regnes med).**

Det er i samtykketeksten mulig å benytte metadata-parametre dersom det
er ønskelig å spesifisere hvilke del av data man ønsker tilgang til, for
eksempel dersom man ønsker tilgang til skattegrunnlaget for et gitt år.
Eksempel: «Opplysningene som utleveres gjelder for {intektsaar}.»
Parameter for inntektsår må da være input i url som datakonsument sender
sluttbruker til samtykkesiden med. Dersom det er ønskelig at parameteret
skal ha et bestemt format så må dette formidles til datakonsument.

Når token genereres legges metadata med som en egen informasjon slik at
datakilde kan verifisere at datakonsument spør om nødvendige data (se
kap. 6 for beskrivelse og validering av token). Metadata lagres sammen
med samtykke-kontekst slik at dette vises historisk og i aktivitetslogg.

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image11.png "Figur 10 - Utgaveparametre samtykketekst")
** Figur 10 - Utgaveparametre samtykketekst**

Sett i forhold til samtykkesiden som sluttbruker får opp i Altinn så er
utgavenavnet det som står i rød ramme og samtykketeksten det som ligger
i blå ramme i bildet av samtykkesiden nedenfor. Det som ligger i grønn
ramme er metadata-parameter for `{inntektsaar}`:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image12.png "Figur 11 - Sammenheng mellom TUL og samtykkesiden")

**Figur 11 - Sammenheng mellom TUL og samtykkesiden**

#### 

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
setter rolle på tjenesten så det må sendes en henvendelse til
[*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no) for å få dette
utført.

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

### 

### 4.2 Registrere tjeneste i tjenesteeierstyrt rettighetsregister

Som tidligere nevnt må det på tjenesteutgaven som er opprettet i TUL
være angitt at tjenesten skal bruke tjenesteeierstyrt
rettighetsregister. Organisasjoner eller personer som skal få hente ut
data via tjenesten må registreres i rettighetsregisteret. Dette gjøres
ved å benytte webservice «RegisterSRRAgencyExternal»
([*https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc?wsdl*](https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc?wsdl))
og operasjonen «AddRights». En detaljert beskrivelse av dette finnes i
kapittel 4.4.1. (merk at beskrivelsen der er for testmiljø. Ovennevnte
url benyttes for produksjonsmiljøet). For å bruke Altinn sine
webservices må man ha en etatsbruker og passord. Har man ikke dette kan
det bestilles gjennom selvbetjeningsportalen til Altinn.

Det finnes også en operasjon for å liste ut gitte rettigheter samt
slette rettigheter.


### 4.3 Bruk av self-contained OAuth-token 
Self-contained Oauth 2.0 token er nøkkelen som datakonsumententen
benytter for å få tilgang til data som ligger hos datakilden. Altinn
utsteder et signert JSON web token (JWT). Tokenet inneholder all
informasjon knyttet til de delegerte rettighetene inkludert
tjenestekoder for lenketjenesten i Altinn, fødsels- eller
organisasjonsnummer som samtykket og tildelte rettigheter til
datakonsumenten, person- eller organisasjonsnummer for datakonsumenten
som fikk rettighetene, tidspunkt for når samtykke ble gitt og tidspunkt
for når rettigheten opphører. Det signerte tokenet må verifiseres av
datakilde ved å validere signaturen. Se kapittel 6 for informasjon om
oppbygging og verifikasjon av token.

Man kan også lese om JSON webtokens her: <https://jwt.io/introduction/>.

For å verifisere signert token må datakilden benytte Altinn sitt
offentlige sertifikat. Dette får man ved å henvende seg til
[*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no).


### 4.4 Test av tjeneste i Altinn sitt testmiljø
Tjenesten må testes ut i Altinn sitt testmiljø TT02:
[*https://tt02.altinn.no*](https://tt02.altinn.no)

Forutsetninger for å teste:

1.  Må være etablert en samtykketjeneste i TUL. Tjenesten må være
    migrert til TT02.
2.  For å teste henting av token via REST-tjeneste trenger man APIkey
    knyttet til organisasjonsnummeret man skal teste med
3.  Man må ha fiktive testpersoner som kan benyttes i testen. Dette har
    i de fleste tilfeller datakilde tilgang til men dersom man ikke har
    dette må man sende en henvendelse til
    [*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no) for å få
    tildelt testbrukere.
4.  For å verifisere det signerte tokenet må datakilden benytte Altinn
    sitt offentlige sertifikat. Dette får man ved å henvende seg til
    [*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no)


#### 4.4.1 Registrere en datakonsument i tjenesteeierstyrt rettighetsregister 
For å få testet samtykketjenesten (lenketjenesten) må man først
registrere en test-datakonsument i tjenesteeierstyrt rettighetsregister
(SRR). Dette gjøres ved å benytte webtjenesten
«RegisterSRRAgencyExternal»:

[*https://tt02.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc?wsdl*](https://tt02.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc?wsdl)

Denne har operasjonene AddRights, DeleteRights og GetRights.

Eksempel på en request for å legge til rettigheter (her testet ved bruk
av SoapUI):

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image13.png "Figur 12 – Legge til rettighet i tjenesteeierstyrt rettighetsregister")

**Figur 12 – Legge til rettighet i tjenesteeierstyrt rettighetsregister**

**NB! Under &lt;conditions&gt; skal det på samtykketjenester IKKE
benyttes «KeepSessionAlive».**

ServiceCode er tjenestekoden og ServiceEditionCode er
tjenesteutgavekoden for lenketjenesten. Disse hentes fra TUL. Reportee
angir hvilken organisasjon som skal få lov å hente ut data gjennom
tjenesten. I Lånesøknadscasen må organisasjonsnummeret til banken som
skal få lov til å hente data fra Skatteetaten legges inn. I test legger
man inn organisasjonsnummeret til en fiktiv organisasjon man kan teste
med. KeepSessionAlive-parameteren benyttes dersom sluttbruker ikke skal
logges ut av Altinn etter å ha gitt samtykke. Hvilket domene sluttbruker
kan sendes til etter at sluttbruker har godtatt samtykke eller ikke må
også registreres. Dette legges inn etter AllowedRedirectDomain og er en
sikkerhetsmekanisme som sørger for at Altinn ikke kan utnyttes til
redirects vilkårlig. Det er kun mulig å legge inn ett domene per org.nr.

Eksempel på å fjerne en gitt rettighet:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image14.png "Figur 13 - Fjerne rettighet fra tjenesteeierstyrt rettighetsregister")

**Figur 13 - Fjerne rettighet fra tjenesteeierstyrt rettighetsregister**

Eksempel på uthenting av gitte rettigheter:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image15.png "Figur 14 - Uthenting av gitte rettigheter")

**Figur 14 - Uthenting av gitte rettigheter**

Det kan hentes pr. tjeneste eller pr. organisasjonsnummer.


#### 4.4.2 Teste samtykketjenesten 
Etter å ha registrert en test-datakonsument (fiktivt
organisasjonsnummer) i tjenesteeierstyrt rettighetsregister kan man
teste ut samtykketjenesten. Dette krever at tjenesten er migrert til
TT02 i TUL. En beskrivelse av hvordan man kan opptre som datakonsument
for å få testet tjenesten finnes i kapittel 5.5.1., og hvordan man
tester å veksle inn autorisasjonskode i token finnes i kapittel 5.5.2.

Se kapittel 6 for informasjon om oppbygging og verifikasjon av token.

[]{#_Toc462869099 .anchor}

## 5. Oppgaver som må utføres av datakonsument


Siden selve flyten av data går utenom Altinn så må datakonsumenten
avtale kommunikasjonsform med datakilden. Datakilden og datakonsumenten
står fritt til å velge kommunikasjonsform og det kan for eksempel være
via webservice, REST eller FTP.

Supporthenvendelser og bestilling av ApiKey sendes til
[*servicedesk@altinn.no*](mailto:servicedesk@altinn.no).


### 5.1 Forutsetninger for å ta i bruk samtykketjenesten
Før man kan ta i bruk tjenesten må følgende være på plass:

1.  Aktuell datakilde må ha laget en samtykketjeneste som datakonsument
    kan benytte. Datakonsument trenger tjenestekode (serviceCode) og
    tjenesteutgavekode (serviceEditionCode) for gjeldende tjeneste(r)
    
2.  Aktuell datakilde må ha registrert organisasjonsnummeret til
    datakonsument i tjenesteeierstyrt rettighetsregister for
    ovennevnte tjeneste(r). I dette registeret må datakilden også
    registrere domene som sluttbruker skal returneres til etter å ha
    gitt sitt samtykke. Dette må utføres både for testmiljø og
    produksjonsmiljø
    
3.  For å hente token trenger man ApiKey som er knyttet til
    datakonsument sitt organisasjonsnummer. Dette kan bestilles hos
    Altinn ved å sende en hevendelse til servicedesk@altinn.no (inntil
    videre sett ewa@brreg.no på kopi). Det vil være en Apikey for test
    og en for å benytte i produksjonsmiljøet.
    
4.  Man må ha fiktive testpersoner som kan benyttes i test. Dette må man
    få hos datakilden da dette må være testbrukere som også er lest
    inn i deres systemer


### 5.2 Sende sluttbruker til samtykkesiden
Datakonsument må sende sluttbruker til samtykkesiden med en parameter
som sier at den ønsker en autorisasjonskode tilbake etter at samtykke er
gitt (i dokumentet benyttes betegnelsen autorisasjonskode, men i url’er,
REST-tjeneste og token benyttes engelsk betegnelse – authorizationCode)
. Når sluttbruker for eksempel underveis i en søknadsprosess har angitt
at han ønsker å gi samtykke til at opplysninger om han kan innhentes så
må datakonsumenten sende brukeren til samtykkesiden i Altinn.

Nedenfor er et eksempel på URL til samtykkeside i produksjonsmiljøet i
Altinn. Dette er bare et eksempel som viser oppbyggingen. URL må
tilpasses tjenesten som skal benyttes. Skal samtykkesiden vises på
f.eks. engelsk må parametre som «DelegationContext» og eventuelle
«Metadata» være på engelsk.

*https://www.altinn.no/ui/AccessConsent/?Resources=4629;2,4630;2&CoveredBy=910350293&RedirectUrl=http://vg.no&ValidToDate=2020-04-05%2010:30:00&LanguageCode=nb-NO&DelegationContext=Ved%20%C3%A5%20samtykke%20gir%20du%20Skatteetaten%20rett%20til%20%C3%A5%20utlevere%20opplysninger%20om%20deg%20til%20banken.%20Form%C3%A5let%20med%20utleveringen%20er%20%C3%A5%20gi%20banken%20n%C3%B8dvendig%20informasjon%20for%20%C3%A5%20behandle%20s%C3%B8knaden%20om%20finansiering.%20%C3%85%20avgi%20samtykke%20er%20frivillig.&ResponseType=code&Metadata=4629_2_inntektsaar;2015,4630_2_fraOgMed;2016-11,4630_2_tilOgMed;2017-01*

Forklaring til parameterne i url finnes i tabellen nedenfor.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Parameter        |Format                                             |Obligatorisk/valgfri| Beskrivelse                                                                                                                                                            
 ---------------- | ------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Resources        |xxxx;x                                             | Obligatorisk       | Tjenestekode og tjenesteutgavekode på tjenesten som datakilde har definert som samtykketjeneste. Kan også være flere tjenester dersom det skal samtykkes til å dele data fra flere datasett hos en eller flere datakilder. Tjenestekode og tjenesteutgavekode separeres med et semikolon og ved bruk av flere tjenester separeres disse med et enkelt komma (eks. Resources=4629;2,4630;1…) Kodene må man få hos datakilde
 CoveredBy        |organisasjonsnummer                                | Obligatorisk       | Organisasjonsnummeret til datakonsument.<br>På samtykkesiden er det navnet som er knyttet til organisasjonsnummeret som presenteres.
 RedirectUrl      |gyldig url                                         | Obligatorisk       | Url som sluttbruker blir sendt tilbake til etter å ha samtykket/ikke samtykket til innsyn i data
 ValidToDate      |YYYY-MM-DD hh:mm:ss                                | Obligatorisk       | Dato og tidspunkt for når samtykket opphører
 LanguageCode     |en<br>nb-NO<br>nn-NO                               | Valgfri            | Angir hvilket språk sluttbruker skal få opp samtykkesiden på. Kan velge mellom engelsk (en), bokmål (nb-NO) og nynorsk (nn-NO). Sendes ikke språkkode med kommer samtykkesiden opp på språket som er satt av bruker i profilen i Altinn                                                                               
 DelegationContext|tekst                                              | Obligatorisk       | Beskrivelse fra datakonsument på hva som er formålet med samtykket. *Det kan hende at det finnes føringer fra datakilde på utformingen av denne teksten. Sjekk med datakilde.*
 ResponseType     |code                                               |  Obligatorisk      | Vil alltid være «code». Angir at man skal ha en autorisasjonskode i retur som skal benyttes for å hente token
 Metadata         |tjenestekode_tjenesteutgavekode_parameternavn;verdi| Valgfri            | For å gi ekstra metadata kan det defineres en eller flere samtykkeparameter som generelt er valgfri men kan påtvinges av utformingen av samtykketeksten som er definert av datakilde (eks. 4629_2_inntektsaar; 2016)
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

I figur 15 nedenfor kan man se sammenhengen mellom det som ligger i url
og det som presenteres på samtykkesiden.

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image16.png "Figur 15 - Sammenheng mellom opplysninger i url og samtykkesiden")

**Figur 15 - Sammenheng mellom opplysninger i url og samtykkesiden**

Når sluttbruker har fått opp samtykkesiden og gitt samtykke vil han
sendes tilbake til siden som er angitt i RedirectUrl. I denne url vil
det sendes med autorisasjonskode og status.

Eksempel på url hvor status er OK:\
[*http://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK*](http://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK)

Eksempel på url hvor sluttbruker har valgt å trykke på knappen for «Nei,
jeg vil ikke gi samtykke»:\
[*http://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent*](http://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent)


### 5.3 Veksle inn autorisasjonskode i token
Altinn plattformen støtter at man kan veksle inn autorisasjonskoden via
REST med ApiKey. Det krever at man har ApiKey som er registrert på
organisasjonsnummer som matcher mottaker av samtykke. Ingen annen form
for autentisering er nødvendig. Bestilling av nye nøkler, eller
oppdatering av eksisterende, gjøres ved henvendelse til
servicedesk@altinn.no.

Tokenet som returneres vil være en streng bestående av et base64-encodet
Json Web Token.

For å hente ut token ved hjelp av autorisasjonskode over REST gjør man
GET på

[*https://www.altinn.no/api/authorization/token?authcode={AuthorizationCode}*](https://www.altinn.no/api/authorization/token?authcode=%7bAuthorizationCode%7d)

med header ApiKey: {apikey}

Eksempel på response (encoded token):
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9.eyJTZXJ2aWNlQ29kZXMiOiI0NjI5LDE
iLCJBdXRob3JpemF0aW9uQ29kZSI6ImY0NTQ5NDNlLTNiNTctNGI0YS1iYjRjLTNkZjY0YTgwMmQ4NyIsIk9mZmVyZWRCeSI6IjA2MTE3NzAxNTQ3Iiw
iQ292ZXJlZEJ5IjoiOTEwNTE0MzE4IiwiRGVsZWdhdGVkRGF0ZSI6IjI3LjEwLjIwMTYgMjE6MTE6MTciLCJWYWxpZFRvRGF0ZSI6IjA1LjAxLjIwMTc
gMTA6MzA6MDAiLCJpc3MiOiJhbHRpbm4ubm8iLCJleHAiOjE0Nzc1OTU1MTcsIm5iZiI6MTQ3NzU5NTQ4N30.S9RBNazx2Ml0R93cSEf_LC5YP2UcYtF
f7w6JH_OPy_MK1HhVIxA2e-5DQjPV53HmKBhlHmL3Wxz36KzIXddfz1olKLEK7Xqn61FJFLTCiReKcySRcvDtRhLtFVH8zT-VcaEEXyA9_tTUumUVKT
qy9vPMDOYAhmih55uT__Ghs5UQbxDZXLJ08f-SDUq-wlcbU8TFLfBnrQBxF53SfL3BvmjYTg_xm69mBRkGuW431fZnMiY_U3Omrd0gHniu8ri33lpEa
L3ip1Lq65QC_jVzy2WHN1RdQCA5WiYGJ89GoSZL2eAtCS8d7qngsMUuzBPpcn4hDiI7MkK4RWrAc2drTw

```
Se kap. 6.1 for eksempel på decoded token.

REST-tjenesten returnerer 403 dersom authcode er ugyldig eller Apikeyen
ikke har tilgang til angitt autorisasjonskode:

`403 The API key is not authorized for this operation, or the supplied authorization code is either expired or invalid.`

### 5.4 Hente data fra datakilden ved hjelp av Altinn-signert token 

Når datakonsument har mottatt Altinn-signert token benyttes dette i
request mot datakilden for å få tilgang til data. Denne må også
inneholde id til sluttbrukeren (fødsels- eller organisasjonsnummer) og
informasjon om hvilken tjeneste samtykket gjelder, angitt med
ServiceCode og ServiceEditionCode (tjenestekode og tjenesteutgavekode
som fås hos datakilden). Formatet på hvordan denne informasjonen
overføres må avtales mellom datakilde og datakonsument, og styres ikke
av Altinn.

Token har 30 sekunders varighet og datakonsument må be om nytt token når
det har gått ut (benytt samme autorisasjonskode om igjen).

### 5.5 Test av tjeneste i Altinn sitt testmiljø

Tjenesten må testes ut i Altinn sitt testmiljø TT02:
[*https://tt02.altinn.no*](https://tt02.altinn.no)

Før man kan teste må forutsetningene listet opp i 5.1 være på plass.

#### 5.5.1 Teste samtykkesiden 

For å få brukt tjenesten og for å få opp samtykkesiden i Altinn kan man
benytte URL nedenfor. (*Dette er også bare et eksempel så den må
tilpasses til den tjenesten, organisasjonen osv. som er aktuell for
deres test.)*

*https://tt02.altinn.no/ui/AccessConsent/?Resources=4629;2,4630;2&CoveredBy=910350293&RedirectUrl=http://vg.no&ValidToDate=2020-04-05%2010:30:00&LanguageCode=nb-NO&DelegationContext=Ved%20%C3%A5%20samtykke%20gir%20du%20Skatteetaten%20rett%20til%20%C3%A5%20utlevere%20opplysninger%20om%20deg%20til%20banken.%20Form%C3%A5let%20med%20utleveringen%20er%20%C3%A5%20gi%20banken%20n%C3%B8dvendig%20informasjon%20for%20%C3%A5%20behandle%20s%C3%B8knaden%20om%20finansiering.%20%C3%85%20avgi%20samtykke%20er%20frivillig.&ResponseType=code&Metadata=4629_2_inntektsaar;2015,4630_2_fraOgMed;2016-11,4630_2_tilOgMed;2017-01*

Se tabell i kap. 5.2 for en nærmere beskrivelse av parameterne i url’en.

URL fører sluttbruker til innloggingen til ID-Porten. Man må ha tilgang
til en fiktiv testbruker for å logge inn.

Når man har fått opp samtykkesiden og gitt samtykke vil testbruker
sendes tilbake til siden som er angitt i RedirectUrl. I denne url vil
det sendes med autorisasjonskode og status.

Eksempel på url hvor status er OK:\
[*http://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK*](http://www.altinn.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK)

Eksempel på url hvor sluttbruker har valgt å trykke på knappen for «Nei,
jeg vil ikke gi samtykke»:\
[*http://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent*](http://www.altinn.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent)

Autorisasjonskoden benyttes til å hente token signert av Altinn. Se
kapittel 5.5.2.

Man bør også logge inn med benyttet testbruker for å sjekke at
rettigheter til valgte organisasjon er gitt, eventuelt ikke gitt dersom
man ikke har samtykket. Gå også inn og slett et samtykke som tidligere
er gitt og sjekk i logg at dette er slettet. I kapittel 3 kan man se
hvordan man sjekker dette. Må også teste at dersom sluttbruker først har
samtykket og deretter gått inn og slettet samtykke så får man ikke
etterpå hentet data fra datakilden.

#### 5.5.2 Teste å veksle inn autorisasjonskode i token

Altinn plattformen støtter at man kan veksle inn autorisasjonskoden via
REST med ApiKey. Det krever at man har ApiKey som er registrert på
organisasjonsnummer som matcher mottaker av samtykke. Ingen annen form
for autentisering er nødvendig. Som nevnt gjøres bestilling av nye
nøkler, eller oppdatering av eksisterende, ved henvendelse til
[*servicedesk@altinn.no*](mailto:servicedesk@altinn.no).

Tokenet som returneres vil være en streng bestående av et base64-encodet
Json Web Token.

For å hente ut token ved hjelp av autorisasjonskode over REST gjør man
GET på [*https://*
*https://tt02.altinn.no/api/authorization/token?authcode={AuthorizationCode}*](https://tt02.altinn.basefarm.net/api/authorization/token?authcode=%7bAuthorizationCode%7d)
med header ApiKey: {apikey}

Eksempel på response (encoded token):
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9.eyJTZXJ2aWNlQ29kZXMiOiI0NjI5LDE
iLCJBdXRob3JpemF0aW9uQ29kZSI6ImY0NTQ5NDNlLTNiNTctNGI0YS1iYjRjLTNkZjY0YTgwMmQ4NyIsIk9mZmVyZWRCeSI6IjA2MTE3NzAxNTQ3Iiw
iQ292ZXJlZEJ5IjoiOTEwNTE0MzE4IiwiRGVsZWdhdGVkRGF0ZSI6IjI3LjEwLjIwMTYgMjE6MTE6MTciLCJWYWxpZFRvRGF0ZSI6IjA1LjAxLjIwMTc
gMTA6MzA6MDAiLCJpc3MiOiJhbHRpbm4ubm8iLCJleHAiOjE0Nzc1OTU1MTcsIm5iZiI6MTQ3NzU5NTQ4N30.S9RBNazx2Ml0R93cSEf_LC5YP2UcYtF
f7w6JH_OPy_MK1HhVIxA2e-5DQjPV53HmKBhlHmL3Wxz36KzIXddfz1olKLEK7Xqn61FJFLTCiReKcySRcvDtRhLtFVH8zT-VcaEEXyA9_tTUumUVKTq
y9vPMDOYAhmih55uT__Ghs5UQbxDZXLJ08f-SDUq-wlcbU8TFLfBnrQBxF53SfL3BvmjYTg_xm69mBRkGuW431fZnMiY_U3Omrd0gHniu8ri33lpEaL3
ip1Lq65QC_jVzy2WHN1RdQCA5WiYGJ89GoSZL2eAtCS8d7qngsMUuzBPpcn4hDiI7MkK4RWrAc2drTw
```

Se kap. 6.1 for eksempel på decoded token.

REST-tjenesten returnerer 403 dersom authcode er ugyldig eller Apikeyen
ikke har tilgang til angitt autorisasjonskode:

`403 The API key is not authorized for this operation, or the supplied authorization code is either expired or invalid.`

Man kan laste ned Postman for å teste henting av token:
[*https://www.getpostman.com/apps*](https://www.getpostman.com/apps)

![](/https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/image17.png)

Når man har mottatt Altinn-signert token benyttes dette i request mot
datakilden for å få tilgang til data. Denne må også inneholde id til
sluttbrukeren (fødsels- eller organisasjonsnummer) og informasjon om
hvilken tjeneste samtykket gjelder, angitt med ServiceCode og
ServiceEditionCode. Formatet på hvordan denne informasjonen overføres må
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

-   Header
-   Payload
-   Signature

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
  "x5t": "KaPli0RTuUTr_rQrVJhsBCWA-2k"
}
```

#### Payload
Payload inneholder påstandene (claims) i tokenet. Påstandene er den informasjonen som datakilden trenger
for å få bekreftet at datakonsumenten har fått et gyldig samtykke.

##### Encoded eksempel:
```
eyJTZXJ2aWNlcyI6WyI0NjI5LDIiLCI0NjI5LDIsaW5udGVrdHNhYXI9MjAxNSIsIjQ2MzAsMiIsIjQ2MzAsMixmcmFPZ01lZD1ub3ZlbWJlciAyMDE2L
HRpbE9nTWVkPWphbnVhciAyMDE3Il0sIkF1dGhvcml6YXRpb25Db2RlIjoiMDkzZDAwNzAtMjJhZC00YzQ5LTlkNzEtZjUzNjdjZjk5MWI4IiwiT2ZmZX
JlZEJ5IjoiMzAwNTAxMDEyMTEiLCJDb3ZlcmVkQnkiOiI5MTA1MTQ0NTgiLCJEZWxlZ2F0ZWREYXRlIjoiMjAxNy0wNC0xOCAwOTozMzoxMyIsIlZhbGl
kVG9EYXRlIjoiMjAxNy0wNi0zMCAxMDozMDowMCIsImlzcyI6ImFsdGlubi5ubyIsImV4cCI6MTQ5MjUwMDk0MiwibmJmIjoxNDkyNTAwOTEyfQ
```

##### Decoded eksempel: 
```JSON
{
  "Services": [
    "4629,2",
    "4629,2,inntektsaar=2015",
    "4630,2",
    "4630,2,fraOgMed=november 2016,tilOgMed=januar 2017"
  ],
  "AuthorizationCode": "093d0070-22ad-4c49-9d71-f5367cf991b8",
  "OfferedBy": "30050101211",
  "CoveredBy": "910514458",
  "DelegatedDate": "2017-04-18 09:33:13",
  "ValidToDate": "2017-06-30 10:30:00",
  "iss": "altinn.no",
  "exp": 1492500942,
  "nbf": 1492500912
}
```

#### Signature
Signature inneholder signert og encoded header og encoded payload.
Algoritmen som er benyttet er beskrevet i header.

##### Encoded eksempel:
```
pumdz9xtOYk_mojdKU1X_uQlT3DKr4IUxoOSJPiLZ3SB2oy-R4Q40jn8gxdnxBLrGD3W1osra_v3x15Nrx9jsWUIz9eQA3H04cxeehTQBbMMT7XZGU-
XnCE34AtQScaDQnyPObPZEQeSvl2nmxNdfjgrzFLsapthiKYNuhv3lzSheTs06Ko3jWHTUg19X_2QSbpOmBVORTai8XeYrm1Tzq_5CSxZo4pQEkxmBpSr
tXcC3MuaF7cM514Bt-
```

##### Decoded eksempel:  
For å verifisere signaturen må datakilden benytte Altinns offentlige sertifikat.
Se under for detaljer om hvordan signaturen verifiseres.


#### Innhold i Payload
 
##### ServiceCodes
Inneholder en string eller et array of strings som representerer tjenestekodene for tjenesten(e) som er omfattet av samtykket brukeren har gitt.
ServiceCodes strengen er inneholder to verdier; ServiceCode og ServiceEditionCode separert med et enkelt komma.

Ved bruk av metadata for {inntektsaar}, {fraOgMed} og {til og med} i samtykketekst:

Single Service:
```JSON
"ServiceCodes": "4629,2"
```

Multiple Services:
```JSON
"ServiceCodes": [
    "4629,2",
    "4630;2"
  ]

"Services": [
    "4629,2",
    "4629,2,inntektsaar=2015",
    "4630,2",
    "4630,2,fraOgMed=november 2016,tilOgMed=januar 2017"
  ],

```

##### OfferedBy
OfferedBy inneholder Personnummer eller Organisasjonsnummer for den som har gitt samtykke. 

Eksempel:  
SSN: `"OfferedBy": "30050101211"`

OrgNo: `"OfferedBy": "974760673"`


##### CoveredBy
CoveredBy inneholder Personnummer eller Organisasjonsnummer for den som har mottatt rettigheter igjennom brukeren samtykke.

Eksempel:  
SSN: `"CoveredBy": "02056260016"`

OrgNo: `"CoveredBy": "910514458"`

##### ValidToDate
Dato og tidspunkt for når samtykket utløper

Eksempel: `"ValidToDate": "2017-06-30 10:30:00"`

##### DelegatedDate
Dato og tidspunkt for når samtykket ble gitt.

Eksempel: `"DelegatedDate": "2017-04-18 09:33:13"`

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
![](/docs/images/guides/samtykke/image18.png "Figur 16 - Eksempel på decoding og verifisering av signature med jwt.io verktøyet.")
**Figur 16 - Eksempel på decoding og verifisering av signature med jwt.io verktøyet.**

For å bruke nettsiden:

1.  Lim inn komplett encodet JWT inkludert header, payload og signature.
2.  Velg algoritmen RS256 fra nedtrekksmenyen.
3.  Lim inn BASE64 encoded offentlig X-509 sertifikatet til Altinn under “Verify Signature”.

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
 Authorization code/ Autorisasjonskode     | Kode som brukes av datakonsumenten til å få tak i Oauth token
 CoveredBy                                 | Mottaker av samtykket – Dersom dette er en person kreves også etternavn på person. (CoveredByName)
 Datakilde                                 | <ul><li>Enhet som teknisk har data for bruker eller organisasjon <li>Verifisere mot autorisasjon om datakonsument har nødvendige tilganger </ul>
 Datakonsument                             | <ul><li>Part som ønsker tilgang til data <li>Ansvaret for å sende sluttbruker til Altinn for delegering av rettigheter til tjenestene <li>Ansvarlig for å be om data fra datakilde </ul>                             
 DelegationContext                         | Beskrivelse fra datakonsument på hva som er formålet med samtykket.
 LanguageCode                              | Angir hvilket språk sluttbruker skal få opp samtykkesiden på. Kan velge mellom engelsk (en), bokmål (nb-NO) og nynorsk (nn-NO)
 Metadata                                  | For å gi ekstra metadata til samtykketeksten kan det defineres en eller flere samtykkeparameter som generelt er valgfri men kan påtvinges av utformingen av samtykketeksten som er definert av datakilde (eks. 4629_2_inntektsaar; 2016)
 Oauth token                               | OAuth er en åpen standard for autorisasjon, ofte brukt som en måte for Internett-brukere å logge på tredjeparts nettsteder ved hjelp av sine Microsoft, Google , Facebook eller Twitter-kontoer uten å oppgi passordet sitt.
 OfferedBy                                 | Hvem som gir samtykket
 RedirectUrl                               | Hvor bruker blir sendt når delegering er gjennomført
 Resources                                 | Tjenestekode og tjenesteutgavekode på tjenesten som datakilde har definert som samtykketjeneste. Kan også være flere tjenester dersom det skal samtykkes til å dele data fra flere datasett hos en eller flere datakilder.
 ResponseType                              | Vil alltid være «code». Angir at man skal ha en autorisasjonskode i retur som skal benyttes for å hente token
 ServiceCodes                              | Representerer tjenestekodene for tjenesten(e) som er opprettet av datakilde
 Sluttbruker                               | Den som gir samtykke til utlevering av sine data eller en organisasjon sine data
 Tjenesteierstyrt rettighetsregister       | Tjenesteeier/datakilde kan kreve at tjenesten skal benytte Tjenestestyrt register: <br>Benyttes for å kontrollere <ul><li>Hvem som kan spør om tilgang til data gjennom deres samtykketjenester <li>Hvilket domene sluttbruker skal bli sendt videre til etter å ha gitt/ikke gitt samtykke </ul>
 ValidToDate                               | Gyldighetsperiode for samtykket

