---
title: 16.1
description: Samtykkebasert datadeling, betalingsløsning, nytt design for roller og rettigheter, videresending av post til innbygger, +++
type: releasenote
releasenote_info: Release 16.1, produksjonssatt uke 7, 2016.
---

Denne versjonen inneholder flere store endringer,
blant annet [nytt design for roller og rettigheter](#nye-sider-for-roller-og-rettigheter-17593),
innføring av [samtykkebasert datadeling](#samtykkebasert-deling-av-data-18736) og [betalingsløsning](#betalingsløsning-i-altinn-16940).  
Som vanlig inneholder februar-versjonene av Altinn endringer for selvangivelsen. I år er det i tillegg en rekke endringer på andre områder.


## Tilgangsstyring

### Nye sider for roller og rettigheter (17593)
Vi gjør store endringer i design og oppbygging av hvordan brukerne delegerer tilganger i Altinn.
Styring av roller og rettigheter vil bli en utvidelse av dagens profil-side, og ha samme design som
denne. Det nye designet er laget for å gjøre det mer intuitivt hvordan man gir andre tilgang til en
tjeneste, og å gjøre det tydeligere hvem som har tilgang til hvilke tjenester på vegne av en person
eller virksomhet. Det gjøres ingen endringer i hvilke Altinn-roller som fins eller knytningen mot
tjenester.

https://altinn.no/no/Portalhjelp/Administrere-rettigheter-og-prosessteg/

### Samtykkebasert deling av data (18736)
Altinn har utviklet en løsning som gjør det mulig at [sluttbruker skal kunne samtykke](../../../guides/samtykke/sluttbruker) i at data om dem
kan deles mellom en [datakilde](../../../guides/samtykke/datakilde) (tjenesteeier) og en [datakonsument](../../../guides/samtykke/datakonsument) (den som trenger data). Bruker vil
kunne gi samtykke til at andre (for eksempel en bank) kan se data om seg i en tidsbegrenset periode.
Bruker vil kunne se hva de samtykker til å dele, hvem de deler data med, hvor lenge, og innenfor
hvilken kontekst dataene skal brukes.

I praksis innføres det mulighet for tidsbegrensning på rettigheter, en [samtykke-side](../../../guides/samtykke/sluttbruker/samtykkesiden) for å gi samtykke,
en [oversikt over aktive samtykker](../../../guides/samtykke/sluttbruker/oversikt-samtykker), en [aktivitetslogg](../../../guides/samtykke/sluttbruker/aktivitetslogg)
og ny funksjonalitet for kontrollert overføring av opplysninger.

{{< vimeo 230421728 >}}

### Ytelsesforbedring klientroller enkeltvis (19309)
Tilgangsstyringsmetoden "Klientroller enkeltvis" har blitt optimalisert ytelsesmessig. Denne har ved
en del anledninger hatt dårlig ytelse.


## Tjenester/meldingsboks

### Betalingsløsning i Altinn (16940)
[Betalingsløsning](/docs/guides/tul/tjenestetyper/innsending/betaling/) er innført som kan brukes som del av prosessflyt i Altinn.
Flere prosessflyt-maler er utarbeidt. Eksempelvis fyll ut skjema, gjør betaling og send inn basert på data i skjema.
Betalingsleverandører er mulig: Nets, Payex og DIBS. Funksjonalitet støttes også via Rest-API

### Revisorsignatur (18634)
Signering forenkles ved at brukergrensesnittet er tilpasset for mer effektiv og enklere signering av
flere skjemaer.

### Integrasjon av ELSA i selvangivelsen for næringsdrivende (18827)
Tilpassinger av Altinn for å støtte at SKDs ELSA-løsning skal kunne integreres i selvangivelsen for
næringsdrivende.

### Feilretting: Visning av &amp; for innsendingstjeneste (19309)
Tegnet `&` har blitt byttet ut med `&amp` i tittel i meldingsboksen på innsendingstjeneste i en del
tilfeller. Dette er nå rettet.

### Feilretting: Ikke mulig å fullstendig slette en Correspondence melding - fortsatt tilgjengelig i full URL (18829)
Vi gjør en feilretting i Altinn Meldingsboks slik at meldinger som er slettet ikke lengre kan nås med
direktelenken til den aktuelle meldingen, når meldingen er slettet. Dette vil ikke merkes av
sluttbrukere eller tjenesteeiere. Grunnen til at endringen utføres er at dette er en funksjonell feil.

### Plassering av skattyters navn i vedleggsskjemaer for PSA/PSAN (18970)
Visuell forbedring av hvor skattyters navn plasseres i vedleggsskjemaer.

### Feilretting: Skjema hvor det er både infopath- og regelmotor-kalkuleringer (18969)
Det gjøres en merge av de kalkulerte verdiene fra infopath, og de som ble kalkulert av regelmotor.
Når dette skjer blir verdiene som ble kalkulert av regelmotor overskrevet av verdiene i skjema som
kommer fra infopath. Dette rettes.


## Eksterne grensesnitt

### Videresending av Post til Innbyggers valgte postkasse via Altinn (18395)
Altinn vil kunne videresende Post som skal til innbyggers valgte postkasse. Altinns tjenesteeier kan da
sende både virksomhetspost og innbyggerpost via Altinn, så sørger Altinn for videre forsendelse der
dette er relevant. Det gjøres noen mindre endringer i integrasjonsgrensesnittet mellom tjenesteeier
og Altinn, slik at tjenesteeier kan angi om post skal videresendes eller ikke. Altinn har innebygget
støtte for å kontrollere mot Kontakt- og reservasjonsregisteret, slik at innbyggere som har valgt
postkasse og som ikke har reservert seg mot offentlig post vil få denne i Digipost eller e-Boks. Altinn
vil også i denne løsningen legge til rette for at innbyggere som ennå ikke har valgt postkasse skal
kunne motta denne i Altinns meldingsboks, i henhold til Digitaliseringsrundskrivet som beskriver
dette.

Tjenesteeier kan angi i sin forsendelse av innbyggerpost til Altinn om:

 - post kun skal videresendes til Digital postkasse til innbygger
 - post skal videresendes til Digital postkasse til innbygger, men hvis innbygger ikke har valgt postkasse så legges den i Altinn
 - post skal videresendes til Digital postkasse til innbygger, og det skal legges en kopi i Altinn

Altinn gir tilbakemelding og status for alle forsendelser. Hvis innbygger ikke har valgt postkasse eller
har reservert seg, vil dette gis som respons på postforsendelsene. For tjenesteeierne vil da Altinn
sørge for håndtere logikk for både virksomhetspost og innbyggerpost, og Tjenesteeiere slipper å
utvikle egen integrasjon mot Kontakt-og reservasjonsregisteret og mot innbyggerpostløsningen.

### Oppslagstjeneste til Kontaktinformasjon for næringslivet (17415)
Det innføres en ny oppslagstjeneste for «Kontaktinformasjon for virksomheter» i Altinn. Tjenesten vil
bli tilgjengelig gjort i et nytt REST API for tjenesteeiere. Oppslagstjenesten vil gi tilgang til registrert
kontaktinformasjon for alle aktive virksomheter i Altinn. Både offisiell felles kontaktinformasjon for
virksomheten og kontakt informasjon registrert på personer med roller og rettigheter for
virksomhetene vil være tilgjengelig, og det vil være mulig å søke på spesifikke telefonnummer og
epostadresser, for å se hvor disse er registrert. Informasjon om når kontaktinformasjonen sist er
oppdatert og bekreftet vil også være tilgjengelig. Årsaken til at denne tjenesten innføres er 
tjenesteeieres behov for å varsle virksomheter, og få informasjon om og hvilke adresser
virksomheten har registert.

For å ta i bruk tjenesten må tjenesteeieren bestille API-nøkkel. Autentisering gjøres med bruk av
virksomhetssertifikatet til tjenesteeieren og krever ingen bestilling mot ASF, annet enn at
tjenesteeieren er registrert i Altinn. Tekniske detaljer for bruk av den nye tjenesten vil bli tilgjengelig
her: https://tt02.altinn.no/api/serviceowner/help

### REST-støtte for innsending og signering på tjenester med flere signeringssteg (18149)
Tjenesteeiere kan nå tilby også tjenester som har flere signeringssteg via app/eksterne
portalløsninger. Endringen utføres blant annet for å legge til rette for ELSA.


## Integrasjonsplattform og grensesnitt

### Splitt av dataoverføringer til tjenesteeiere med mulighet for krypterte vedlegg (18260)
En innlevering i portal eller fra sluttbrukersystem vil normalt sett rutes av Altinn til eieren av
tjenesten sitt mottakssystem. Ved at tjenesteier setter opp tjenesten med splitt av data vil man
samtidig kunne sende disse dataene til en annen interessent/tjenesteier, noe som er med å
understøtte at data kun trenger å rapporteres en gang.

Tidligere har vi manglet muligheten for at denne splitten kunne inneholde krypterte vedlegg. Dette
er nå kommet på plass. Endringen er hovedsakelig tiltenkt å gi forskjellige tjenesteiere mulighet til å
foreta datauthenting fra allerede etablerte Altinn tjenester. For sluttbrukere vil bruk av splitt av data
føre til at de får enklere/færre innrapporteringer å forholde seg til.

### Automatisk rapportering på avvik ved batchinnlesing og instansiering (18487)
I 15.2 og 15.3 ([endring 17621](../../2015/15-2/#forbedret-håndtering-av-items-som-feiler-i-batchinnlesing-17621)) innførte vi mulighet for automatisk å sile ut elementer med feil som kom
med batch-filer fra tjenesteeiere på en langt bedre/enklere måte enn tidligere. Dette har betydelig
forbedret driftbarheten, med tanke på feilhåndtering, av innkommende batcher for vår
driftsleverandør. Denne endringen tar dette et steg videre.

Tidligere har uthenting av elementer som har feilet krevd betydelig involvering av driftsleverandør og
manuell overføring/tilbakeføring til tjenesteeiere. Nå skal tjenesteiere selv/alene kunne anvende et
sett med web service-operasjoner for å hente ut status om inngående batch-forsendelser/elementer
til Altinn som feilet under oppsatt kjøring.

### Feilretting: Krav om refusjon (18914)
Feilretting som kun påvirker overføring av SPKs skjema "Krav om refusjon".


## Driftsrutiner og registerintegrasjon

### Standardisert prosedyre for deaktivering og sanering av grensesnitt (17690)
Det blir mulig for driftsleverandør på bestilling fra tjenesteeier på en forutsigbar og effektiv måte å
kunne deaktivere et grensesnitt midlertidig eller sanere det permanent.

### Feilretting – Enhetsregisterinnlesing for enheter med lange navn
I enkelte tilfeller blir mellomrom fjernet i enhetsnavn som er lengre enn 35 tegn – rettes slik at de
leses inn korrekt.


## Autentisering/signering

### Standardisering av egenregistrerte brukere (16121)
Endringen går ut på å rute egenregistrerte brukere til den delen av løsningen som de andre brukerne
benytter. Dette medfører ingen funksjonelle endringer. Endringen utføres for å konsolidere løsningen
og det forventes forenklet vedlikehold og driftbarhet forbundet til disse brukerne

### Signering nivå 4 med BankID uten java (18633)
Dagens signering krever java for å signere på nivå 4 med BankID. For å unngå at sluttbrukere fortsatt
skal ha utfordringer med bruk av java, så vil vi støtte javafri signering på nivå 4 med BankID. Signering
med Buypass vil videreføres uten endring (det vil si at signering med og uten java for Buypass støttes).


## Annet

### Støtte for æ/ø/å i e-postadresser (17297)
Vi endrer i Altinn slik at æ, ø og å er gyldige tegn sluttbrukere kan registrere i sine e-postadresser.

### Støtte for ikke-numeriske tegn i dataFormatId (18985)**
Det blir mulig å benytte ikke-numeriske tegn i dataFormatId-attributt i meldingsformat (XSD) ifbm. tjenesteutvikling.

### EntLib-forbedringer (18370)
Fjerning av biblioteker som ikke lengre benyttes. Dette er en teknisk endring uten funksjonell
påvirkning som gjensto fra forrige release.

