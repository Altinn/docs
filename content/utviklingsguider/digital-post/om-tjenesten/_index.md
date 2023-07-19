---
title: Om meldingstjenesten
linktitle: Om tjenesten
toc: true
description: Ved å bruke en meldingstjeneste kan en offentlig aktør enkelt sende digital post og meldinger til virksomheter og innbyggere. 
weight: 20
---


## Hvor finner mottaker meldingen sin? 
Bruker finner mottatte meldinger i sin innboks i Altinn. Det er bare brukere som har rettighet til meldingstjenesten som ser mottatte meldinger i Altinn.
Veiledning i hvordan man styrer tilgang til tjenester i Altinn finnes [her](https://www.altinn.no/hjelp/sok/?q=tildele+rettighet).

## Hvem kan motta digital post og hvilke krav er det til varsling?
Ved utsending av digital post skal mottaker alltid varsles via sms eller epost. Meldingstjenesten tilbyr støtte for å sende varsel til mottaker via Altinn i forbindelse med at meldingen opprettes. 

### Post til innbyggere 
Det er kun lov å sende meldinger til innbyggere som ikke har reservert seg mot digital post i [Kontakt og reservasjonsregisteret](https://eid.difi.no/nb/kontakt-og-reservasjonsregisteret). 

Varsel sendes til kontaktinformasjon registrert i Kontakt og reservasjonsregisteret. 

### Post til virksomheter
Virksomheter har ingen reservasjonsrett og er forpliktet til å motta post fra det offentlige digitalt i Altinn. 

Varsel sendes til kontaktpunkt for virksomheten registert i [Kontaktregister for virksomheter](https://www.altinn.no/hjelp/profil/kontaktinformasjon/) som registereres i 
[Enhetsregisteret](https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/) og oppdateres via [Altinn.no](https://www.altinn.no). 
I tillegg kan alle brukere som har tilgang til meldingen på vegne av virksomheten motta varsel hvis de har reistert sin kontaktinformasjon for virksomheten og har bedt om å få slike varsel. 


## Tjenesteeier må informere mottaker når man tar tjenesten i bruk

Å digitalisere utsending av post medfører at mottaker må endre sine rutiner for mottak av post. Dette innebærer at de må: 
- sørge for at ansatte/andre som skal lese meldingen får rettighet til å lese denne på Altinn.no.
- sikre at innboksen i Altinn blir fulgt opp jevnlig slik at man oppdager meldinger man har mottatt. 
- evt utvikle integrasjon mot API for innboksen slik at meldinger kan importeres til riktige fagsystem eller post/arkivsystem hos mottakende virksomhet.

Når en tjenesteeier bestemmer seg for å starte med utsending av meldinger digitalt er det derfor viktig å gjøre en god jobb med å informere mottaker om endringene som innføres. 

I tillegg bør tjenesteeier følge opp at meldinger som sendes digitalt faktisk blir lest av mottakerne og evt iverksetter ytterligere informasjonstiltak hvis så ikke skjer.  


## Hva med meldinger som inneholder taushetsbelagt og personsensitiv informasjon? 
I dag er det vanlig at man gir rollen Post/Arkiv tilgang til å lese all post som sendes ut. 
Post/Arkiv-rollen gis automatisk til følgende nøkkelroller i en virksomhet: 
- Daglig leder/administrerende direktør
- Styrets leder
- Deltaker i ANS/DA (kun fødselsnummer)
- Innehaver i ENK
- Kontaktperson i kommune
- Kontaktperson administrativ enhet i offentlig sektor (ADOS)
- Komplementar (kun fødselsnummer)
- Norsk representant for utenlandsk enhet,
- Sameiere (registrert hos Skatteetaten),
- Bestyrende reder,

Det er i dag ikke mulig å hindre at f eks styrets leder får tilgang til en slik melding. 

### Hvorfor må disse meldinger med taushetbelagt innhold behandles spesielt?

Det er ikke naturlig at f eks daglig leder eller styrets leder automatisk får tilgang til meldinger som inneholder [sensitive personopplysninger](https://www.datatilsynet.no/rettigheter-og-plikter/personopplysninger/) 
(f eks informasjon om enkeltpersoner knyttet til straffesaker, barnevernssaker o.l.). 

For denne typen meldinger er det derfor er det viktig at den som sender meldingen legger til rette for at innsyn i innholdet hos mottaker kan begrenses til de i virksomheten som har tjenstlig behov for å se dette. 
Dere bør altså vurdere om posten inneholder opplysninger som i henhold til regelverket ikke skal være tilgjengelig for alle med tilgang til rollen Post/Arkiv i Altinn.

I slike tilfeller skal man utforme meldingestjenesten med spesielle roller for [taushetbelagt post](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/taushetsbelagte-roller/)
som sikrer at informasjon kun blir tilgjengelig for de som trenger det.  
 
### Tilgangsstyring til taushetsbelagt post
Det vil fortsatt være mulig for en [hovedadministrator](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/hovedadministrator/) å sikre at riktige ansatte får tilgang til denne posten, 
men vedkommende får ikke automatisk selv ha tilgang til meldingene hvis de ikke trenger det. 

Tilgangsstyrer hos virksomheten som mottar denne typen meldinger må sørge for at bare de som har tjenstlig behov for det får tilgang til innholdet. 
Her finner du vår [anbefaling](/docs/utviklingsguider/digital-post-til-virksomheter/overorndet-funksjonalitet/del-tilgang-til-melding/) på hvordan dette bør gjøres i virksomheten. 

### Krav til utforming av taushetsbelagt post
For å sikre at det er rette vedkommende i virksomheten som får tilgang til de taushetsbelagte meldingene, 
er det viktig at avsender tilpasser innholdet i meldingen slik at det er enkelt å se hva meldingen gjelder og hvem i egen organisasjonen som skal ha tilgang til meldingen. 
Dette kan f.eks gjøres ved å ha entydig tekst i MessageTitle – gjerne navngi mottaker dersom dette er kjent, evt benytt saksnummer eller annen informasjon 
som kan knytte meldingen til rett person i virksomheten. 

### Krav til varsling ved taushetsbelagt post
Når en meldingen med taushetsbelagt innhold opprettes **SKAL** det varsles med Notification for å sikre at virksomheten får beskjed om at det er sendt en melding i innboksen. 
Varslingen må inneholde informasjon om at meldingen er taushetsbelagt, samt beskrivelse av hva virksomheten må gjøre for å sikre at rette vedkommende får tilgang til meldingen, 
dvs hva meldingen gjelder, hvem som skal ha meldingen, hvilken enkelttjeneste eller rolle som må delegeres for å gi tilgang o.l. 

Vi anbefaler sterkt at teksten i varselet tilpasses innhold i forsendelsen hvis det er mulig. Hvis ikke anbefaler vi følgende standard varslingstekst: 
"<navn på mottaker>, har mottatt en taushetsbelagt melding fra <navn på avsender>. For å få tilgang til meldingen, er det nødvendig at noen i <navn på mottaker> 
har fått tildelt rettighet til tjenesten <tjenestenavn> eller rollen «Taushetsbelagt post» i Altinn. Dersom dere er usikre på om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. 
Les mer om å gi tilgang til rollen «Taushetsbelagt post» på Altinns nettsider."


## Hvordan lager man en meldingstjeneste? 
Meldingstjenesten lages i TUL og du finner oppkrift på hvordan du går frem [her](/docs/tul/tjenestetyper/melding/). 

Når tjenesten er laget må Tjenesteeier sette opp integrasjon mot Altinn for å: 
1. validere om mottaker kan motta melding og varsel før meldingen sendes, les mer [her](/docs/api/tjenesteeiere/rest/validering-av-mottaker/)
2. sende melding til mottaker, les mer [her](/docs/api/tjenesteeiere/funksjonelle-scenario/#meldingstjenester)
3. sjekke status på meldingen, les mer [her](/docs/api/tjenesteeiere/funksjonelle-scenario/#sjekke-status-på-meldingstjenester)


## Huskeliste når man lager en ny meldingstjeneste:
- informer mottakende organisasjoner om at man starter å sende ut denne typen post digitalt.
- varsel skal sendes mottaker når melding opprettes.
- vurder om post som sendes ut inneholder taushetsbelagt og personsensitiv informasjon. Hvis så er tilfellet må tjenesteeier gjøre en [personverkonsekvensvurdering](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/vurdere-personvernkonsekvenser/vurdering-av-personvernkonsekvenser/) før tjenesten tas i bruk. 
- vurder å lage oppfølgingssystem for mottakere som ikke åpner sin post, f eks ved bruk av revarsel etter noen dager, å sende ulest melding via tradisjonell postgang etter en gitt tid eller ved å kontakte mottaker.