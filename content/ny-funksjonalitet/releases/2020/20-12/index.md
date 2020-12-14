---
title: "20.12"
description: Justeringer i brukergrensesnitt, mindre endringer og feilrettinger
weight: 20
type: releasenote
releasenote_info: Versjon 20.12, produksjonssatt 14. desember 2020
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i portal

### Justeringer i brukergrensesnitt

- Justering av kolonnevisningen i "Be om tilgang" og "Behandle forespørsel". Alle modale vinduer som åpnes fra profilsiden og meldingsboksen er nå oppdatert. De vil fylle ut hele visningsbredden (mellom Altinn logoen og lite aktørvalg) når portalen vises i full skrivebordsbredde.
- Det er gjort noen mindre endringer i visningen for tjenestesøk i "Be om tilgang" prosessen. Her er tjenestenavn ikke lenger i fet skrift. Tjenestene vil alltid ha en seksjon som kan utvides til å vise tjenesteeier og eventuelt delegeringsbeskrivelse for tjenesten.
- Aktivitetslogg knappen på elementer i meldingsboksen er i dag ikke spesielt synlig. Designet på denne er nå oppdatert og lik andre lenke-knapper.
- Det ble lagt til et nytt panel som heter “Mine Forespørsler” som inneholder alle sendte og mottatte tilgangsforespørsler. Mottatte forespørsler ble tidligere vist i “Andre med rettigheter” panelet, men er nå flyttet hit. En skal kunne opprette nye forespørsler, godkjenne, avslå innkommende forespørsler og slette egne forespørsler. Under de sendte forespørslene er det en egen liste over sendte forespørsler som ble behandlet i de siste 10 dagene. Panelet er kun synlig for personer som representerer seg selv og er logget inn med sikkerhetsnivå 2.
- Det er laget et nytt panel som heter “Virksomhetens forespørsler”. Panelet er kun synlig for brukere med RoleAdministrator rollen som er logget inn med sikkerhetsnivå 2.
  
### Brukere får nå et meldingsboksvalg etter pålogging i stedet for å bli sendt til dyplenken (blant annet samtykkesiden) de egentlig skulle til

Dette er nå rettet.

### Bedre tilbakemelding ved parallell signering

Det er gjort en endring i Altinn slik at brukere som har signert et skjema med parallell signering ikke lenger får vist en lenke til skjemaet i meldingen. Lenken vises heller ikke hvis skjemaet er ferdig signert og sendt inn.

### Endringer i sluttbrukerløsningen (SBL)

### Håndtering av syntetiske testpersoner

Det er identifisert to steder med feil der man kalkulerer alder basert på fødselsnummer. Dette er endret slik at riktig alder kalkuleres også for disse personene.

### Oppgradering av EO.Pdf

Komponenten som benyttes for å generere en PDF-representasjon av et skjema eller et skjemasett EO.Pdf er oppgradert til siste versjon. Det er forventet at de fleste skjemaer vil se ut som før, men i en ny versjon vil det alltid kunne forekomme enkelte grafiske forskjeller.

## Endringer i REST-API

### Vi tilbyr nå rolletyper på REST metadata

Det er blitt lagt til et nytt endepunkt som eksponerer https://www.altinn.no/api/serviceowner/Help/Api/GET-serviceowner-roledefinitions_language som et eget metadata endepunkt: “/api/metadata/roledefinitions”.

### Administrering av tilgangsforespørsler på REST

Det er nå implementert støtte for å administrere DelegationRequests via REST “virksomhetssluttbruker”-API. Det har frem til nå vært mulig for tjenesteeiere å opprette tilgangsforespørsler via REST API-et. Dette er en videreutvikling av denne funksjonaliteten hvor det nå vil være mulighet for virksomheter å administrere tilgangsforespørsler via REST API-et. Det er opprettet nye endepunkter for å opprette, hente og slette tilgangsforespørsler. Et generelt GET-endepunkt er også opprettet for at virksomheten skal kunne få oversikt over både utgående og innkommende forespørsler. For utfyllende informasjon om bruk av dette endepunktet se https://altinn.no/api/help under DelegationRequest.

## Diverse feilrettinger

### HandledBy ble ikke vist på “Benyttet samtykke” i Avtaleloggen

Etter en refaktorering av “Avtaleloggen” som ble gjort i Altinn versjon 20.5 ble HandledBy borte fra denne visningen ved “Benyttet samtykke”. Dette medførte at det alltid ble opplyst om at det var CoveredBy som hadde hentet opplysninger om OfferedBy. Dette er nå utbedret, og avtaleloggen vil fra nå av også vise HandledBy dersom /loguse-operasjonen på REST API ble utført av HandledBy. Denne endringen vil også korrigere visningen for “Benyttet samtykke” bakover i tid da Altinn allerede har denne informasjonen, men dessverre ikke har vist denne korrekt siden re-faktoreringen i versjon 20.5.

### Lagt til maskering av fødselsnummer (SSN) for RequiredDelegator

Ved innsending av ConsentRequest med en RequiredDelegator var fødselsnummeret fullt synlig i responsen. Endringen medfører at dette nå blir maskert på lik linje med “OfferedBy”.

### Søk etter tilgangsstyrere på “Be om tilgangssiden”

I Altinn versjon 20.11 ble det gjennomført en endring i flyten på “Be om tilgang”. Dette medførte at søket etter tilgangsstyrere ved opprettelse av en tilgangsforespørsel ikke fungerte lengre. Dette er nå rettet opp i, og søket vil nå fungere som før.

### "Last ned alle vedlegg " der tittel inneholder ugyldige tegn

Etter implementasjon av "Last ned alle vedlegg" som ble levert i Altinn versjon 20.11, ble det oppdaget en feil når filnavnet på en melding inneholdt tegn i tittelen som ikke er gyldige filnavn. Dette medførte at enkelte brukere ikke fikk mulighet til å laste ned alle vedleggene samlet til en og samme fil. Dette er nå endret med en bedre håndtering av filnavn og tittel på en melding.

### Ikke mulig å søke på brukernavn med 6 tegn i "tjenesteeiers arkiv"

Det var en begrensning på søk i "tjenesteeiers arkiv" som gjorde at man ikke kunne søke på brukernavn med mindre enn 7 tegn, selv om det er lov å registrere brukernavn med kun 6 tegn. Dette er nå rettet slik at man kan søke på brukernavn med 6 tegn.

### Feilhåndtering i policy agent ved manglende Soap parametere

Det viste seg at bruk av exceptions i service policy agent var feil når det gjelder manglende Soap- parametre. Dette medførte at relevant informasjon ikke kom tilbake til SBS/tjenesteeiersystem. Dette er nå utbedret.

### Gul varsel-boks under behandling av tilgangsforespørsel forsvinner ikke

Denne feilen har eksistert siden Altinn versjon 20.9 hvor det ble innført visning for hvilke operasjoner på en gitt tjeneste en tilgangsstyrer har når vedkommende skal behandle en tilgangsforespørsel. Dette medførte at dersom noen av operasjonene ble endret på fikk man opp en gul varsel-boks. Denne boksen ble aldri fjernet selv om den originale tilstanden på en tilgangsforespørsel ble gjenopprettet. Dette er nå rettet.

### Informasjonskapsel oppdatering (Cookie renewal) på REST API

Etter en betydelig omskrivning av Altinn sitt REST-API som ble gjort i 20.11 ble prosessen med å fornye informasjonskapsler endret. Dette førte til at dersom det ble fornyet en informasjonskapsel, fikk man en 200-OK respons fra API-et med et tomt resultat. Dette førte til at man da måtte kjøre samme request to ganger for å få informasjonskapsel oppdaterings-prosessen til å fungere. Dette er nå utbedret slik at man vil få tilbake en ny informasjonskapsel sammen med et eventuelt data-resultat som endepunktet returnerer.

### Søk etter tilgangsstyrer i "Be om tilgang"

Etter en re-fakturering som ble gjort i versjon 20.11 av Altinn fungerte ikke søket etter tilgangsstyrere ved opprettelse av en tilgangsforespørsel. Dette er nå utbedret og søket etter tilgangsstyrere fungerer som før.

### Timeout ved innsending av store skjema (SubmitFormTask)

Det er justert på noen timeouts for å unngå timeout ved ekstremt store, tunge og tidkrevende innsendinger med SubmitFormTask. Det skal nå være mulig å ha en innsending som tar 15 minutter.

### Hengsituasjon ved håndtering av timeout

Det ble observert situasjoner i produksjonsmiljøet der alt hang på grunn av en låsing som skedde ved  oppdatering av en tabell (dictionary) som holder orden på timeout informasjon. Dette er nå rettet.
