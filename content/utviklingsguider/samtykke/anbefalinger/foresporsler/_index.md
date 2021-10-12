---
title: "Bruk av samtykkeforespørsler"
linktitle: Samtykkeforespørsler
description: Informasjon om samtykkeforespørsler og anbefalinger om hvordan de kan benyttes i ulike sammenhenger og tjenester.
weight: 40
---

## Overordnet

Samtykkeforespørsler gir datakonsumenten mer kontroll over hvordan samtykker kan innhentes og følges opp, og er den anbefalte mekanismen for å implementere samtykketjenester. 

Hovedforskjellen mellom samtykkeforespørsler og lenkebaserte samtykker, er at konsumenten umiddelbart etter opprettelse får `AuthorizationCode` (samtykke-id), og kan bruke [ConsentRequest-API-et](#ConsentRequest-API) for å hente ut samtykkeforespørsler både i listeform og enkeltvis.

## ConsentRequest-modellen

Datamodellen inneholder en rekke ulike felter som brukes for ulike formål. Her er en detaljert gjennomgang av alle feltene og hva de kan brukes til.

Modellen brukes både som inndata som konsumenten oppgir i forbindelse med opprettelse av forespørselen, og som retur (utdata) på i de fleste operasjoner på ConsentRequest-APIet. I tabellen under indikeres det i den andre kolonnen om feltet kun brukes i retur, eller om det er påkrevd eller ikke påkrevd inndata.

| Feltnavn                  | Må oppgis / kun i retur     | Beskrivelse
|---------------------------|-----------------------------|------------------------------------------------------------------------
| AuthorizationCode         | Kun i retur                 | Også kalt samtykke-ID. Identifikator for forespørselen, og identifkator brukt for å hente ut samtykketoken.
| RequestStatus             | Kun i retur                 | [Hvilken status forespørselen har](#requeststatus).
| Created                   | Kun i retur                 | Når forespørselen ble opprettet.
| LastChanged               | Kun i retur                 | Når forespørselem sist hadde en statusendring. 
| CoveredBy                 | Ja                          | Organisasjonsnummer eller fødselsnummer til den som skal motta samtykket (konsument)
| OfferedBy                 | Ja                          | Organisasjonsnummer eller fødselsnummer til den som skal gi samtykke (avgiver)
| OfferedByName             | Ja                          | Navn på organisasjon eller etternavn til den som skal gi samtykke
| HandledBy                 | Nei                         | [Organisasjonsnummer for leverandør, hvis aktuelt.](#handledby)
| RequiredDelegator         | Nei                         | [Oppgis hvis en ønsker at en spesifikk fysisk person skal gi samtykket, og ikke hvem som helst som har tilstrekkelig med rettigheter på vegne av avgiver](#requireddelegator)
| RequiredDelegatorName     | Nei                         | Etternavn på den spesifikke personen som skal gi samtykke
| ValidTo                   | Ja                          | Hvor lenge samtykket skal vare hvis innfridd. Må være i ISO8601-format.
| RedirectUrl               | Ja                          | [URL som sluttbruker blir sendt til etter innfridd samtykke](#redirecturl)
<!-- | ServerNotificationUrl     | Nei                         | [URL som brukes for push-notifikasjon etter innfridd samtykke](#servernotificationurl) -->
| RequestResources          | Ja                          | [Liste over tjenester/ressurser samtykket som omfatte](#requestresources)
| RequestMessage            | Ja                          | [Melding som vises til sluttbruker på ulike språk](#requestmessage)
| PortalViewMode            | Nei                         | [Bestemmer hvorvidt en forespørsel er synlig i innboksen til sluttbruker](#portalviewmode)
| Errors                    | Kun i retur                 | [Eventuelle feilmeldinger som hindrer at en gitt forespørsel kan innfris](#errors)

## ConsentRequest-API

ConsentRequest-API-et har fire endepunkter som kan benyttes. Klikk på disse for mer teknisk informasjon.

| Operasjon                                     | Beskrivelse                                                      |
|-----------------------------------------------|------------------------------------------------------------------|
| [GET consentRequests/{authCode}](https://www.altinn.no/api/Help/Api/GET-consentRequests-authCode)                | Henter en spesifikk samtykkeforespørsel                          |
| [DELETE consentRequests/{authCode}](https://www.altinn.no/api/Help/Api/DELETE-consentRequests-authCode)             | Sletter (trekker) en samtykkeforespørsel. Kan bare gjøres for ubehandlede forespørsler.
| [GET consentRequests?serviceCode=...](https://www.altinn.no/api/Help/Api/GET-consentRequests_serviceCode_serviceEditionCode_direction_status[0]_status[1]_continuation) | Feed-API som lar en hente ut lister med samtykkeforespørsler filtrert på ulike parametre. Kan hente både sendte og mottatte forespørsler. Inkluderer også forespørsler hvor autentisert virksomhet står som `HandledBy` (altså forespørsler leverandøren har opprettet)
| [POST consentRequests](https://www.altinn.no/api/Help/Api/POST-consentRequests) 	                        | Oppretter en ny samtykkeforespørsel |

## Forklaring på enkeltfelter

### RequestStatus

Feltet `RequestStatus` oppgir hvilken tilstand en samtykkeforespørsel er i. Følgende statuser finnes:

| Verdi    | Betydning                 |
|----------|---------------------------|  
| Unopened | Forespørselen er ikke åpnet, altså ikke sett av noen med tilgang til å besvare den.
| Opened   | Forespørselen er åpnet av noen med tilgang til å besvare den, men ikke behandlet.
| Accepted | Forespørselen er godkjent. Merk at selve samtykket kan være senere trukket eller utløpt.
| Rejected | Forespørselen ble avvist.

Når er forespørsel opprettes vil den innledningsvis har status `Unopened`. Status vil deretter maksimalt endres to ganger, fra uåpnet til åpnet, og fra åpnet til en godkjent/avvist.

### HandledBy

Oppgir hvem som skal være leverandør for denne forespørselen, altså opptre på konsument/CoveredBys vegne. Dette forutsetter at:

* Autentisert virksomhet er HandledBy
* Oppgitt API-nøkkel er tilknyttet samme organisasjonsnummer som HandledBy

For å verifisere koblingen til konsument/CoveredBy gjøres ulike autorisasjonssjekker avhengig av autentiseringsmetode som forutsetter ulik onboarding. Les mer om dette i [kapitlet om bruk av leverandører]({{< ref "utviklingsguider/samtykke/datakonsument/leverandor" >}}).

### RequiredDelegator

Oppgir at samtykkeforespørselen skal besvares av en bestemt person. I utgangspunktet vil alle som har rollen "Tilgangsstyring" samt til tilgang til de aktuelle tjenestene som forespørselen omfatter, kunne besvare en samtykkeforespørsel på vegne av en avgiver. Hvis dette feltet oppgis, spesifiserer konsumenten hvem som skal kunne besvare forespørselen, og gjør den utilgjengelig for alle - selv om de måtte inneha de nødvendige tilgangene hos avgiver. 

{{% notice warning  %}}
Det gjøres ikke noe verifikasjon på at oppgitt `RequiredDelegator` faktisk har rettigheter til å innfri samtykket på vegne av oppgitt `OfferedBy` i det forespørselen opprettes. Feil informasjon her vil kunne gjøre en samtykkeforespørsel umulig å innfri uten at ytterligere delegeringer utføres av tilgangsstyrer hos `OfferedBy`.
{{% /notice %}}

Samtykkedialogen vil oppføre seg noe annerledes i de tilfeller hvor innlogget bruker ikke er autorisert til å behandle forespørselen. Hvis `RequiredDelegator` er oppgitt, blir brukeren oppfordret til å logge inn med rett bruker (hvem som er `RequiredDelegator` blir av sikkerhetshensyn ikke indikert). Hvis `RequiredDelegator` ikke er oppgitt, vil brukeren få en feilmelding om manglende tilgang.

I praksis brukes dette for å sikre at personen som er oppgitt som avgiver (`OfferedBy`) også er den samme som gir samtykket. Vi anbefaler bruk av `RequiredDelegator` når det skal innehentes samtykke fra privatpersoner som opptrer på vegne av seg selv. Hvis samtykke skal innhentes fra en organisasjon, anbefales i utgangspunktet ikke bruk av `RequiredDelegator`, med mindre konsumenten er sikker på at vedkommende har tilstrekkelige rettigheter hos `OfferedBy` og har gode grunner til å skulle innsnevre rollekravene som tjenesteeierene har satt på de aktuelle tjenestene/ressursene som forespørselen omfatter.

### RedirectUrl

Dette oppgir hvor brukeren skal sendes til etter å ha besvart samtykkeforespørselen. Dette må være en URL som enten

* Er assosiert med API-nøkkelen som benyttes, eller
* Er oppgitt som en av de lovlige URL-ene for konsumenten (`CoveredBy`) i [tjenesteeierstyrt rettighetsregister]({{< ref "utviklingsguider/samtykke/datakilde/test-tjeneste/#registrere-en-datakonsument-i-tjenesteeierstyrt-rettighetsregister">}}) av tjenesteeieren(e).

Hvis restriksjoner på URL er oppgitt av tjenesteeier i SRR, vil dette overstyre URL-er som er assosiert med API-nøkkelen.

{{% notice warning  %}}
Merk at sluttbruker vil ikke bli sendt til `RedirectUrl` etter besvart samtykkeforespørsel hvis forespørselen er åpnet fra avgivers profilside i Altinn. For å kontrollere hvorvidt en samtykkeforespørsel blir vist i Altinn, se feltet [PortalViewMode](#PortalViewMode). Se også [ServerNotificationUrl](#ServerNotificationUrl) og [RequestStatus](#RequestStatus).
{{% /notice %}}

<!--
### ServerNotificationUrl

{{% notice warning %}}
Dette er funksjonalitet som foreløpig ikke er lansert
{{% /notice %}}

Dette feltet lar konsumeten oppgi en URL som Altinn vil forsøke å sende informasjon (pushet eNotifikasjon) om hendelser knyttet til samtykkeforespørsler og samtykker. For eksempel vil det sendes informasjon om hendelsene:

* Samtykke innfridd
* Samtykke nektet
* Samtykke trukket

Hendelsen vil bli sendt i form av en [CloudEvent](https://cloudevents.io/) i en POST-request til URL-en som oppgis. URL-en må være tilgjengelig for HTTPS-trafikk fra Altinns systemer, og besvare forespørselen med en `200 OK` respons. Hvis andre koder returneres, eller endepunktet ikke kan nås innen et tidsavbrudd, vil Altinn forsøke på nytt flere ganger i en periode. *Mer informasjon om dette kommer.*
-->

### RequestResources

Dette feltet er en rik modell som inneholder en liste over de ressurser/tjenester samtykkeforespørselen skal omfatte. En `RequestResource` inneholder 

* Hvilken ressurs det gjelder i form av en Altinn tjenesteidentifikator (`ServiceCode` og `ServiceEditionCode`)
* Eventuelle metadata som den aktuelle ressursen krever

Hvilke metadata som kreves er avhengig av hva tjenesteeier har spesifisert. Alle metadata må oppgis ellers gis feilmelding. Metadata som ikke er spesifisert av tjenesteeier blir ignorert. Det gjøres ingen validering på metadata, så se til at disse oppgis i tråd med hva tjenesteeier har spesifisert.

### RequestMessage

Dette er en melding som vises til sluttbruker øverst i samtykkeforespørselen. Merk at enkelte samtykketjenester ikke tillater bruk av `RequestMessage`, og vil gi en feilmelding hvis oppgitt. For å sikre at sluttbrukeren får se samtykkeforespørselen i valgt språk i Altinn, må meldingen oppgis på både norsk, nynorsk og engelsk.

### PortalViewMode

Dette feltet indikerer om en gitt samtykkeforespørsel skal gjøres synlig i avgiver (`OfferedBy`) sin innboks i Altinn. Feltet har to verdier:

| Verdi    | Beskrivelse                  |
|----------|------------------------------|
| Show     | Forespørselen blir vist      |
| Hide     | Forespørselen blir ikke vist |

Hvis feltet ikke oppgis, benyttes "Hide".

{{% notice warning  %}}
Merk at sluttbruker vil ikke bli sendt til `RedirectUrl` etter besvart samtykkeforespørsel hvis forespørselen er åpnet fra avgivers profilside i Altinn. Se også [ServerNotificationUrl](#servernotificationUrl) og [RequestStatus](#requeststatus) for alternative måter å sjekke om en forespørsel er besvart eller ikke.
{{% /notice %}}

### Errors

TODO
