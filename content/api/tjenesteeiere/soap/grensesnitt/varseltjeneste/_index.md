---
title: Varseltjeneste 
description: Varseltjenesten gjør det mulig for tjenesteeiere å opprette varsel uavhengig av andre elementer i meldingsboksen til avgiver.
toc: true
weight: 800
---

## Tjenesteoperasjoner
Denne tjenesten har 3 versjoner av samme operasjon. Input og funksjonalitet for de ulike versjonene er den samme. Det som varierer er returen.
Versjon 1 og 2 er betraktet som utgått, men fungerer fint for eksisterende klienter.
Nye klienter bør benytte versjon 3 av operasjonen. Kun versjon 3 er dokumentert.

### SendStandaloneNotificationV3
Denne operasjonen kan benyttes til å sende frittstående varsel. Det vil si varsel som ikke nødvendigvis er tilknyttet noe element i meldingsboksen til avgiver.
Operasjonen støtter en liste med varsel som også kan være helt uavhengig av hverandre. Det vil si ulike tema og avgivere.

#### Inputparameter
Tabell med oversikt over operasjonens inputparameter.

| **Navn**                | **Beskrivelse**                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------- |
| standaloneNotifications | Liste med varseldefinisjoner. [Se StandaloneNotification](#standalonenotification) |

#### Retur
Beskrivelse av hva operasjonen returnerer.

| **Datakontrakt**           | **Beskrivelse**                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| SendNotificationResultList | Liste med oversikt over hvilke varsel som faktisk ble generert. [Se SendNotificationResultList](#sendnotificationresultlist) |

#### Feilsituasjoner
Tabell med oversikt over mulige feilkoder for operasjonen.

| **Feilkode** | **Beskrivelse**                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1            | Et av elementene: `FromAddress`, `ShipmentDateTime`, eller `NotificationType` mangler data. Teksten i meldingen angir hvilke felt som har mangler. |
| 30009        | Gis hvis man har oppgitt en adresse i `ReceiverAddress` når `TransportType` er `Both`, `SMSPreferred` eller `EmailPreferred`.                      |
| 30010        | Ugyldig epostadresse angitt på et `ReceiverEndPoint`.                                                                                              |
| 30301        | Altinn har ikke klart å finne noe mobiltelefonnummer å sende varsel til. Brukes når transporttypen bør medføre varsel på SMS.                      |
| 30302        | Ugyldig/ukjent landkode i et mobiltelefonnummer.                                                                                                   |
| 30303        | Ugyldig norsk mobiltelefonnummer.                                                                                                                  |
| 30304        | Avgiver av typen organisasjon har ikke registrert noen varslingsadresse som kan benyttes i varsel på angitt kanal.                                 |
| 30306        | Avgiver har ingen varslingsadresse som kan benyttes til å sende varsel på angitt kanal.                                                            |
| 30307        | Feil opplevd under generering av EMailPreferred mottaker endepunkt, klarte ikke generere Email eller SMS endepunkt                                 |
| 30308        | Feil opplevd under generering av SMSPreferred endepunkt, klarte ikke generere Email eller SMS endepunkt                                            |
| 30309        | Avgiver har ikke varslingsadresse for både epost og SMS. Denne feilen kan oppstå for transporttype `Both`.                                         |
| 30312        | Feil opplevd under generering av PriorityEmailSMSReminder endepunkt, klarte ikke generere Email eller SMS endepunkt                                |
| 40001        | Ugyldig angitt språkkode.                                                                                                                          |
| 40014        | Angitt antall varsler overstiger konfigurert grense.                                                                                               |
| 40015        | TransportType må være enten SMS eller Email.                                                                                                       |
| 40016        | Angitt fødselsnummer er ikke gyldig.                                                                                                               |
| 40020        | Parameter FromAddress må være en gyldig e-post adresse.                                                                                            |
| 60012        | Ugyldig avgiver. Altinn klarer ikke identifisere noen avgiver basert på angitt `ReporteeNumber`.                                                   |

## Datakontrakter

### StandaloneNotification

| **Property**                          | **Beskrivelse**                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FromAddress                           | Kan brukes til å angi hva som skal være avsender når varsel sendes på epost. Dette må derfor være en gyldig epostadresse. Feltet er valgfritt, men hvis det er blankt gis det feilmelding.                                                                                                                                                                                                                                                       |
| IsReservable                          | I sammenheng med KRR (Kontakt og reservasjons registeret) kan en sluttbruker reservere seg mot å motta digital kommunikasjon fra norske myndigheter. IsReservable verdien kan brukes til å indikere om det er mulig å reservere seg mot meldingen eller ikke. Det er valgfritt å angi en verdi og standard (default) verdi er `False`. Denne verdien må derfor aktivt settes til `True` om tjenesteeier ønsker å respektere slike reservasjoner. |
| LanguageID                            | Språket varselet skal være på. Her brukes det språkkoder: <ul><li>1033 - English</li><li>1044 - Bokmål</li><li>2068 - Nynorsk</li></ul>                                                                                                                                                                                                                                                                                                          |
| NotificationType                      | Et unikt navn som refererer til predefinerte varslingstekster.                                                                                                                                                                                                                                                                                                                                                                                   |
| ReceiverEndPoints                     | Liste med varsel mottakere. [Se ReceiverEndPoint](#receiverendpoint)                                                                                                                                                                                                                                                                                                                                                                             |
| ReporteeNumber                        | Fødselsnummer, organisasjonsnummer eller brukernavnet til de det skal sendes varsel til. Hvis input er et brukernavn antas det at varselet sendes til en egenregistrert bruker. Altså en Altinnbruker med ukjent identitet.                                                                                                                                                                                                                      |
| *Roles*                               | *Dette feltet er ikke knyttet til noe logikk i tjenesten. Input blir altså ikke benyttet og er derfor unødvendig.*                                                                                                                                                                                                                                                                                                                               |
| Service                               | Tjenestekoder kan benyttes til å begrense hvem som får varsel når avgiver er en organisasjon. [Mer informasjon](#filtrering-av-varselmottakere)                                                                                                                                                                                                                                                                                                  |
| ShipmentDateTime                      | Dato for når varselet ønskes sent (yyyy-MM-dd / yyy-MM-ddThh:mm:ss).                                                                                                                                                                                                                                                                                                                                                                             |
| TextTokens                            | Liste med TextTokens objekter som angir substitusjoner i varslingsteksten. [Se TextTokens](#texttokens)                                                                                                                                                                                                                                                                                                                                          |
| UseServiceOwnerShortNameAsSenderOfSms | I sammenheng med sending av SMS varsel, kan tjenesteeier velge om tjenesteeier selv skal stå som avsender i stedet for Altinn. Det er valgfritt å angi en verdi og standard (default) verdi er `False`.                                                                                                                                                                                                                                          |

#### Filtrering av varselmottakere
Når det sendes varsel til organisasjoner så har Altinn to kilder til kontaktinformasjon. Den første og viktigste er offisielle varslingsadresser fra Kontakt- og fullmaktsregisteret for virksomheter (KoFuVi). Her har Altinn ingen filtrering på hvilke adresser som får varsel. Den andre kilden er det som kalles *Din kontaktinformasjon for virksomheten*. Dette er en Altinn funksjon som gir brukere i Altinn mulighet til å registrere sin personlige kontaktinformasjon mot en virksomhet. I denne sammenheng er det store forkjeller på hva slags tilganger de ulike personene har. Det kan være daglig leder, en regnskapsfører eller mer eller mindre tilfeldige personer som har tilgang til et eller annet på vegne av organisasjonen. Hvis oppgitt organisasjon er en underenhet uten noen registrerte kontaktpunkter vil hovedenhetens varslingsadresser bli benyttet isteden.

Ved å angi tjenestekoder vil Altinn sikre at personene med registrert kontaktinformasjon faktisk har nok tilganger til å kunne representere organisasjonen i kontekst av tjenesten. Det kjøres i praksis en autorisasjon hvor det sjekkes at personen har leserettigheter på tjenesten som er angitt. Hvis det ikke er angitt noe tjenestekoder vil Altinn ikke sende varsel til denne typen kontaktinformasjon overhodet.

### ReceiverEndPoint

| **Property**    | **Beskrivelse**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TransportType   | Angir om varsel skal sendes som epost eller SMS. Lovlige verdier er: <ul><li>**SMS** - Altinn vil sende varsel som SMS hvis det er oppgitt et mobilnummer i ReceiverAddress eller avgiver har registrert et eller flere mobilnummer. Max antall tegn på sms er 700. Hvis avgiver er en organisasjon vil det sendes varsel til alle registrerte mobilnummer.</li><li>**Email** - Fungerer på samme måte som *SMS*, men med epost som kanal.</li><li>**Both** - Altinn vil sende varsel både som epost og SMS. Denne transport typen krever at avgiver har registrert minst en epostadresse og et telefonnummer. Hvis en av disse mangler vil tjenesten returnere en feilmelding. En organisasjon vil få varsel på alle registrerte varslingsadresser.</li><li>**SMSPreferred** - Altinn vil sende varsel som SMS hvis avgiver har registrert et mobilnummer. Hvis avgiver ikke har registrert dette vil det isteden bli sendt varsel som epost, forutsatt at det finnes en registrert epostadresse. En organisasjon vil bli sendt varsel på alle varslingsadresser av riktig type.</li><li>**EmailPreferred** - Fungerer på samme måte som *SMSPreferred*, men med epost som hovedkanal.</li><li>**PriorityEmailSMSReminder** - Brukes for varslingsmaler med reminders (revarslings mal). Første varsel vil behandles som EmailPreferred, Andre varsel vil behandles som SMSPreferred.</li></ul> |
| ReceiverAddress | Mobilnummeret eller epostadressen til mottaker av varsel. Dette må passe med TransportType Email eller SMS. Feltet er valgfritt og hvis feltet er tomt vil Altinn forsøke identifisere riktige mottakere basert på avgiver og TransportType. Feltet må være tomt for TransportType Both, SMSPreferred og EmailPreferred. En annen ting det er viktig å merke seg er at Altinn ikke vil søke opp andre mulige varslingsadresser fra for eksempel KoFuVi. Det antas altså at tjenesteeieren har angitt den best egnede mottakeren av varsel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

### TextTokens

| **Property** | **Beskrivelse**                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| *TokenNum*   | *Ikke i bruk, kan utelates.*                                                                                                                       |
| TokenValue   | Tekst som skal ersatte maltekst. Substitusajonen gjøres i samme rekkefølge som parameterene er angitt. Varselmal må bestilles og lages på forhånd. |

### SendNotificationResultList
Dette er en liste med informasjon om hvilke varsel som ble laget. [Se NotificationResult](#notificationresult).

| **Property** | **Beskrivelse**                    |
| ------------ | ---------------------------------- |
| *Message*    | *Dette feltet blir ikke benyttet.* |

### NotificationResult

| **Property**     | **Beskrivelse**                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| EndPoints        | Liste med EndPoint resultater for Notification. [Se EndPointResult](#endpointresult)                             |
| NotificationType | NotificationType for notification. Brukes for å kunne se hvilken Notification resultatet gjelder                 |
| ReporteeNumber   | Avgiver som ble brukt til å generere mottakere. Brukes for å kunne se hvilken avgiver varsel resultatet gjelder. |

### EndPointResult

| **Property**        | **Beskrivelse**                                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name                | Navn på person som har mottatt melding. Dette blir hentet enten fra Organisasjonens mottaker-liste, eller fra brukerens innslag i Register databasen |
| ReceiverAddress     | Hvilken addresse meldingen er sendt til.                                                                                                             |
| RetrieveFromProfile | Satt til true dersom informasjonen er hentet fra en Organisasjons eller brukers profil                                                               |
| TransportType       | Type endepunkt varsel er sendt til.                                                                                                                  |
