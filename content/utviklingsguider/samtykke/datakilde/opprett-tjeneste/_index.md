---
title: Opprette tjeneste
description: Opprettelse av samtykketjeneste i tjenesteutviklingsløsningen (TUL)
weight: 310
aliases:
 - /guides/samtykke/datakilde/opprett-tjeneste/
---

## Opprettelse av samtykketjeneste i tjenesteutviklingsløsningen (TUL) 

Det må opprettes en tjeneste i TUL som benyttes til samtykke og tilgangskontroll.
Til dette benyttes Altinn sin lenketjenestetype.
Kun tjenesteutviklere som har vært på kurs i regi av Altinn har tilgang til TUL og kan lage tjenesten.


## Definering av lenketjeneste 
Utgavenavnet vil vises for sluttbruker på samtykkesiden så det er viktig å velge et navn som også forteller hva slags
data eller informasjon denne tjenesten tilbyr.
 
Feltet i URL er påkrevd men har ingen funksjon ved bruk av lenketjeneste i samtykkeøyemed.
 
Husk å angi at tjenesten skal bruke tjenesteeierstyrt rettighetsregister. Ved å angi dette vil man sikre at kun registrerte datakonsumenter
kan benytte samtykketjenesten. Vi vil senere beskrive hvordan man gir spesifikke organisasjoner eller personer lov til å spørre brukere
om samtykke ved å registrere disse i rettighetsregisteret for akkurat denne tjenesteutgaven.  

{{<figure src="utgaveparametre.png" title="Utgaveparametre lenketjeneste" >}}


## Definere samtykketekst
Når man skal lage en lenketjeneste som skal benyttes i en samtykketjeneste må man gå inn på Samtykke-fanen i TUL å angi at utgaven
skal tillate samtykkebasert deling av data. Da blir det obligatorisk å fylle ut en samtykketekst som vil vises for sluttbruker under samtykkesiden.
Samtykketeksten skal forklare nærmere hva brukeren samtykker til. For at samtykke skal være gyldig må det være informert.
Det betyr at brukerne får informasjon som gjør at de forstår hva de samtykker til og hvilke konsekvenser det vil få for dem.
 
I vårt Lånesøknadscase så bør samtykketeksten si hvilke data banken henter fra Skatteetaten - om det er informasjon om lønn,
gjeld eller andre forhold.
Samtykketeksten defineres av datakilden (tjenesteeier) men det er hensiktsmessig at datakilden og datakonsumenten
blir enige om en tekst som er fornuftig å bruke.
For å kunne formatere tekst, legge inn lenker osv. må det benyttes html-kode.

{{% alert theme="danger" %}}**NB! Det er kun tillatt med 1.000 tegn (eventuell html-kode regnes med).**{{% /alert %}}


Det er i samtykketeksten mulig å benytte metadata-parametre dersom det er ønskelig å spesifisere hvilke del av data man ønsker tilgang til,
for eksempel dersom man ønsker tilgang til skattegrunnlaget for et gitt år.
Eksempel: "Opplysningene som utleveres gjelder for {intektsaar}." Parameter for inntektsår må da være input i url som datakonsument sender sluttbruker
til samtykkesiden med. Dersom det er ønskelig at parameteret skal ha et bestemt format så må dette formidles til datakonsument. 

Når token genereres legges metadata med som en egen informasjon slik at datakilde kan verifisere at datakonsument spør om nødvendige data
(se [her](../bruk-av-token/#bruk-av-self-contained-oauth-token) for beskrivelse og validering av token).
Metadata lagres sammen med samtykke-kontekst slik at dette vises historisk og i aktivitetslogg.

Hvis det kun skal være mulig for datakonsument å hente data èn gang for det avgitte samtykket
så må dette angis ved å huke av for "Tillat bare engangssamtykker".

{{<figure src="samtykketekst-tul.png" title="Utgaveparametre samtykketekst" >}}


Sett i forhold til [samtykkesiden](../../sluttbruker/samtykkesiden) som sluttbruker får opp i Altinn så er utgavenavnet det som står i rød ramme og samtykketeksten det som ligger
i blå ramme i bildet av samtykkesiden nedenfor. Det som ligger i grønn ramme er metadata-parameter for `{inntektsaar}`:  


{{<figure src="sammenheng-tul-sbl.png" title="Sammenheng mellom TUL og samtykkesiden" >}}

Det er mulig å innhente samtykke for flere tjenester (flere datasett) i samme operasjon.

## Registrere rolle på tjenesten
Før man migrerer tjenesten over til testmiljø og produksjon må det
registreres en rolle på den. Selve rollen man velger trenger ikke å være
delegerbar, men enkeltrettigheter på tjenesten må være delegerbare. Noen
roller er ikke delegerbare, for eksempel rollen "Privatperson", men
dersom man angir i TUL at den skal være delegerbar så betyr dette at det
ikke er mulig å delegere selve rollen videre men man kan delegere
enkeltrettigheter (når bruker gir samtykke så delegeres det en
enkeltrettighet til datakonsument). Som for alle typer tjenester i
Altinn så må man vurdere hvem som skal benytte tjenesten og sette rolle
ut fra dette. Er man i tvil om hvilken rolle som passer så kan man
kontakte Altinn for å få hjelp til å vurdere dette. Det er Altinn som
setter rolle på tjenesten så det må sendes en henvendelse via selvbetjeningsportalen eller til
[*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no) for å få dette utført.

Sikkerhetsnivå: Valgt sikkerhetsnivå for samtykketjenester vil både sette krav til sikkerhetsnivå for bruk av tjenesten og for å kunne gi samtykke til tjenesten gjennom samtykkesiden eller REST API. 
En lenketjeneste må i utgangspunktet ha minimum sikkerhetsnivå 3. I tillegg til dette håndheves det ett minimumskrav av sikkerhetsnivå 2 for å gi samtykke, selv for tjenester som spesifiserer lavere krav, dette er tilsvarende som annen rettighetsdelegering i Altinn.
Er bruker ikke logget inn med høyt nok sikkerhetsnivå vil bruker få samme feilmelding som ved bruk av tjenesten, med beskjed og mulighet til å gå til innlogging med korrekt nivå.

## Oversette tjeneste
Dersom tjenesten skal være tilgjengelig på flere språk må den
oversettes. Dette gjøres i TUL i seksjonen for oversetting. Språk som
det kan oversettes til/fra er bokmål, nynorsk og engelsk.

## Migrere tjeneste 
Før tjenesten kan testes må den migreres til testmiljø (TT02). Etter at
den er testet må den migreres til produksjonsmiljøet (PROD).
