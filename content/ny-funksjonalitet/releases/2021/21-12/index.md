---
title: "21.12"
description: Justering i visninger, mindre endringer og feilrettinger
weight: 90
type: releasenote
releasenote_info: Release 21.12. Produksjonssettes 13.12.2021 
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Justering av tokolonnevisningen i "Be om tilgang" og "Behandle forespørsel"
Alle modale vinduer som åpnes fra profilsiden og meldingsboksen er nå oppdatert så de fyller ut hele visnings-bredden (mellom Altinn logo og lite aktørvalg) når portalen vises i full skrivebord bredde.
I tillegg er det gjort noen mindre endringer i visningen for tjenestesøk i "Be om tilgang" prosessen. Her er "tjenestenavn" ikke lenger uthevet.
Tjenestene vil nå også alltid ha en ekspanderbar seksjon hvor tjenesteeier og eventuelt delegeringsbeskrivelse for tjenesten er vist.

### Tydeliggjort Aktivitetslogg i innboksen
Aktivitetslogg-knappen på elementer i meldingsboksen var ikke spesielt synlig som klikkbar knapp. Designet på denne er nå oppdatert med blå linje under teksten slik at den er som andre lenke-knapper.

### Visning av egne utgående forespørsler på profilsiden
Det er lagt til et nytt panel som heter "Mine Forespørsler" som inneholder alle sendte og mottatte tilgangsforespørsler. Mottatte forespørsler ble tidligere vist i "Andre med rettigheter"-panelet, men er nå flyttet hit.
Herfra skal man kunne opprette nye forespørsler, godkjenne eller avslå innkommende forespørsler og slette egne sendte forespørsler. Under de sendte forespørslene er det en egen liste over sendte forespørsler behandlet de siste 10 dagene.
Panelet er kun synlig for personer som representerer seg selv og er logget inn med sikkerhetsnivå 2.

### Nytt panel for å vise virksomhetens forespørsler på profilsiden
Det er laget et nytt panel som heter "Virksomhetens forespørsler". Panelet er kun synlig for brukere med rollen "RoleAdministrator" som er logget inn med sikkerhetsnivå 2.

### Brukere fikk meldingsboksvalg etter pålogging i stedet for å bli sendt til dyplenken de skulle til (blant annet samtykkesiden)
Dette er nå løst.

### Bedre tilbakemelding ved parallell signering
Det er gjort en endring i løsningen slik at brukere som har signert et skjema med parallell signering ikke lenger får vist en lenke til skjema i meldingen de opprinnelig fikk om at de skulle signere skjema.
Lenken vises heller ikke hvis skjema er ferdig signert og sendt inn.

## Endringer i SBL

### Håndtering av syntetiske testpersoner
Det er blitt identifisert to steder som feiler der man kalkulerer alder basert på fødselsnummer. Dette er nå rettet.

### Oppgradering av PDF representasjon
Komponenten som benyttes for å generere PDF-representasjon av et skjema eller et skjemasett (EO.Pdf) er oppgradert til siste versjon.
Det er forventet at de fleste skjemaer vil se ut som før, men i en ny versjon vil det alltid kunne forekomme enkelte grafiske forskjeller.

## Endringer i REST

### Tilby rolletyper på REST metadata
Nytt endepunkt som eksponerer [https://www.altinn.no/api/serviceowner/Help/Api/GET-serviceowner-roledefinitions_language](https://www.altinn.no/api/serviceowner/Help/Api/GET-serviceowner-roledefinitions_language) som et eget metadata endepunkt: /api/metadata/roledefinitions

### Administrering av tilgangsforespørsler (DelegationRequests) på REST API
Det har frem til nå vært mulighet for tjenesteeiere å opprette tilgangsforespørsler via REST API-et. Vi har nå videreutviklet denne funksjonaliteten hvor det nå vil være mulighet for virksomheter å administrere tilgangsforespørsler via REST.
Det er opprettet nye endepunkter for å opprette, hente og slette tilgangsforespørsler. Et generelt GET-endepunkt er også opprettet for at virksomheten skal kunne få oversikt over både utgående og innkommende forespørsler.
For utfyllende informasjon om bruk av dette endepunktet se [https://altinn.no/api/help](https://altinn.no/api/help) under DelegationRequest.

## Feilrettinger

### Diverse feil er rettet i henhold til universell utforming
Dette inkluderer tydeligere fokusindikator på knapper og radioknapper for tastaturnavigering. Pilene på brødsmulesti for mobil er nå klikkbare. Alle lenker som manglet hover underline har nå fått dette.
Eksterne ikoner for PDFer er fjernet og farger for focus/hover highlighting er korrigert.

### HandledBy ble ikke vist på "Benyttet samtykke" i Avtaleloggen
Etter en refaktorering av “Avtaleloggen” som ble gjort i Versjon 20.5, ble HandledBy borte fra denne visningen ved “Benyttet samtykke”. Dette medførte at det alltid ble opplyst om at det var CoveredBy som hadde hentet opplysninger om OfferedBy. 
Dette er nå korrigert, og avtaleloggen vil fra nå av også vise HandledBy dersom /loguse-operasjonen på REST API ble utført av HandledBy. Denne endringen vil også korrigere visningen for “Benyttet samtykke” bakover i tid.

### Lagt til maskering av SSN for RequiredDelegator
Ved innsending av ConsentRequest med en RequiredDelegator var fødselsnummeret synlig i responsen. Endringen medfører at dette nå blir maskert på lik linje med “OfferedBy”.

### Søk etter tilgangsstyrere på "Be om tilgangssiden"
I Release 20.11 ble det gjennomført en endring i flyten på "Be om tilgang" i Altinn. Dette medførte at søket etter tilgangsstyrere ved opprettelse av en tilgangsforespørsel ikke lenger fungerte.
Dette er rettet opp i.

### "Last ned alle vedlegg" fungerte ikke alltid
Etter implementasjon av "Last ned alle vedlegg" som ble levert i 20.11, ble det oppdaget en feil når filnavnet på en Correspondence inneholdt tegn i tittelen som ikke er gyldige i filnavn.
Dette medførte at enkelte brukere ikke fikk mulighet til å laste ned alle vedleggene samlet til en og samme fil. Dette er nå rettet med bedre håndtering av filnavn og tittel på en Correspondence.

### Ikke mulig å søke på brukernavn med 6 tegn i tjenesteeiers arkiv
Det var en begrensning på søk i tjenesteeiers arkiv som gjorde at man ikke kunne søke på brukernavn med mindre enn 7 tegn. Dette selv om det er lov å registrere brukernavn med kun 6 tegn.
Dette er nå utbedret.

### Feilhåndtering i policy agent ved manglende Soap parametre
Bruk av exceptions i service policy agent var feil når det gjelder manglende Soap parametre.
 Dette medførte at relevant informasjon ikke kom tilbake til SBS/tjenesteeiersystem. Dette er nå utbedret.

### Gul varselboks under behandling av tilgangsforespørsel forsvinner aldri
Denne feilen har eksistert siden versjon 20.9 hvor det ble innført visning for hvilke operasjoner på en gitt tjeneste en tilgangsstyrer har når vedkommende skal behandle en tilgangsforespørsel.
Dette medførte at dersom noen av operasjonene ble endret på fikk man opp en gul varselboks. Denne boksen ble aldri fjernet selv om den originale tilstanden på en tilgangsforespørsel ble gjenopprettet. Dette er nå utbedret.

### Informasjonskapsel (cookie) fornying på REST API
Fornying av informasjonskapsler på REST API fungerer ikke slik som før. Etter en betydelig omskrivning av Altinn sitt REST-API som ble gjort i 20.11 ble prosessen med å fornye informasjonskapsler endret.
Dette førte til at dersom det ble fornyet en informasjonskapsel, fikk man en 200-OK respons fra API-et med et tomt resultat. Dette førte til at man da måtte kjøre samme request to ganger for å få cookie fornying-prosessen til å fungere helt.
Dette er nå utbedret slik at man vil få tilbake en ny informasjonskapsel sammen med et eventuelt data-resultat som endepunktet returnerer.

### Søk etter tilgangsstyrer i "Be om tilgang"
Etter en endring i versjon 20.11 fungerte ikke søket etter tilgangsstyrere ved opprettelse av tilgangsforespørsel. Dette er nå utbedret og søket etter tilgangsstyrere fungerer som før.

#### Timeout ved SubmitFormTask
Det er justert på noen timeouts for å unngå problemer med ekstremt store, tunge og tidkrevende innsendinger med SubmitFormTask. En innsending kan nå ta inntil 15 minutter.

### Hengsituasjoner ved håndtering av timeout
Dette er nå rettet.

### Oppretting av BoT forespørsel for delegationScheme feilet
Dette er nå rettet

### Det var ikke mulig å godkjenne en BoT forespørsel med et delegationScheme
Dette er nå rettet

### Feil i filter av meldinger satt til ulest
Dette er rettet slik at dersom meldinger er lest men så markert som ulest nå filtreres som ulest.

### Mottak av foretrukket kontaktadresse feilet dersom den ikke inneholdt adresselinjer
Dersom vi mottok en person som har foretrukket kontaktadresse med tomme adresselinjer feilet mottaket. Dette er nå rettet.

### Sletting av prosedyre Correspondence_InsertAttachment_INSERT
Denne er nå slettet