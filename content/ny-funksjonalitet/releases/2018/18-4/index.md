---
title: 18.4
description: Varslingsadresser fra Enhetsregisteret i Altinn, mindre forbedringer i portal, flere endringer på eksterne API og div bugfiks.
weight: 90
type: releasenote
releasenote_info: Release 18.4, produksjonssatt 16. april 2018.
---

## Felles varslingsadresser for virksomheter i Altinn og Enhetsregisteret (KoFuVi)

Fra 1. januar ble det innført krav om at alle virksomheter i Enhetsregisteret skal ha registert varslingsadresse for digital kommunikasjon med det offentlige.
Dette kan være én eller flere registrerte epostadresser eller mobilnummer.
Dette vil være den adressen offentlige myndigheter forholder seg til når de skal sende varsel til virksomheten.
Som utgangpunkt så benyttes allerede registerte felles varslingsadresser for virksomheten i Altinn.
Varslingsadresse for virksomheten vil benyttes av Altinn til utsending av varsel. Varslingsadresse for allerede registrere virksomheter kan oppdateres via profil i Altinn.

![Oppdater varslingsinformasjon i profil](oppdater-varslingsinfo.png?width=600 "Oppdater varslingsinformasjon i profil")

Ettersom alle virksomheter **er pålagt å ha varslingsadresse** så vil de som mangler denne bli avkrevd en slik adresse når
personer med tilgangsstyring går inn på virksomheten i Altinn første gang etter release 18.4.

![Registrer varslingsinformarsjon](registrer-varslingsinfo.png?width=600 "Registrer varslingsinformarsjon")

Varslingsadresse registrert eller endret i Altinn vil umiddelbart sendes til enhetsregisteret.
Etter en kort tid så vil Altinn få tilbakemelding fra Enhetsregisteret. Merk at det i mellomtiden ikke vil være mulig å korrigere registrert varslingsadresse.

![Venter på tilbakemelding](venter-på-tilbakemelding.png?width=600 "Venter på tilbakemelding")



## Portal

### Forbedring av aktivitetslogg ved utsending av varsel
Endringen medfører mer korrekt logging av utsendt varsel fra Altinn.

### Bedre visning av lange navn i portalen
Vi har hatt utfordringer med å vise lange navn i portalen på en god måte. Dette er det nå gjort forbedringer på.

### Korrigert ledetekst på skjema i innboks
På skjema i innboks vises tidspunkt for når skjema er opprettet. Tidligere ble denne feilaktig benevnt som "mottatt", men er nå korrigert til "opprettet".

### Forenklet deling av meldinger
Prosess for å dele og gi tilgang til en melding du har mottatt er forenklet.

### Forbedringer i søk på tvers
Det er nå enklere å slette lagrede søk og vi har gjort det lettere å komme tilbake til søket etter å ha åpnet kvittering på arkivert skjema.
I tillegg er det nå lettere å se hvilke aktører du har valgt å søke på.

![Valgte aktører](valgte-aktører.png "Valgte aktører")

### Bedre tilbakemelding til bruker som signerer/sender inn på vegne av andre
Det er mulig å gi en bruker tilgang til bare et spesielt eksemplar av et skjema.
Når bruker signere og sender inn dette på vegne av noen andre, så vil ikke bruker lenger ha tilgang til å se på skjema som er sendt inn.
Det samme vil være tilfellet hvis man som siste person sender inn et skjema som har paralell signering.

Tilbakemelding om hva som har skjedd i slike tilfeller er forbedret slik at bruker ikke tror det har oppstått en feil.



## Endringer i eksterne grensesnitt

### Splittet warnings og errors på API/messageID/validate
Som tjenesteeier ønsker jeg at warnings og errors splittes i API/messageID/validate.  
Før ble warnings og errors vist i samme liste, men nå vises de i to separate lister: ValidationErrors og ValidationWarnings, der hver rad inneholder en FieldName, ErrorMessage og Xpath.
### Vaske XML for InfoPath elementer i REST API
Som tjenesteeier ønsker jeg at InfoPath elementer ikke skal eksponeres i REST API.  
Før inneholdt XML lagret i Altinn InfoPath elementer. Nå blir disse elementene fjernet fra XMLen når det hentes ut.

### Uthenting av elementer fra søppelbøtta via REST API
Som sluttbrukersystem ønsker jeg å kunne hente ut elementer som er lagt i søppelbøtta via REST grensesnitt.

Det er lagt til funksjonalitet for å kunne hente ut en liste over elementer eller enkeltelementer fra søppelbøtta.
Funksjonaliteten er tilgjengelig for både privatpersoner og bedrifter. Søppelbøtte er tilgjengelig ved å gå til `/api/{who}/messages/trashbin`

### Uthenting av FormData (XML) for innboks via WebService
Det er lagt til mulighet for å hente ut FormData for elementer i innboksen via WebSerivce. Kall til `ServiceEngineExternal/ReporteeElementListExternal/GetFormSetData` henter ut alle XML-skjemaer for et element. Skjemaene blir vasket for interne felter og namespaces på lik linje med REST.
### Som sluttbruker ønsker jeg å kunne se hvem mitt skjema ble instansiert på vegne av i REST API
MessageSender-feltet i Message-modellen vil nå inneholde navnet på organisasjonen om et skjema var sendt på vegne av en organisasjon. 
(`/api/{who}/messages/` og ``/api/{who}/messages/{messageId}`). Endringen populerer og MessageSender-feltet for bruk i Portalen.
### Bekrefte mottatt correspondence via REST API
Som bruker av REST API kan man nå arkivere mottatte meldinger.  
Se REST APIets hjelpesider for mer informasjon: `/api/Help/Api/PUT-who-Messages-messageId-Confirm_language`
### Få valideringsstatus på skjemasett via REST API
Som bruker av REST API kan man nå validere skjemasett på skjemaer som ligger til utfylling.  
Se REST APIets hjelpesider for mer informasjon: `/api/Help/Api/GET-who-Messages-messageId-Validate_language`
### Få ut virksomhets adresseinformasjon
Som bruker av REST API får man ut addresse informasjon for virksomhet som en del av profil data.  
Se REST APIets hjelpesider for mer informasjon: `/api/Help/`
### Inkludere filstørrelse på vedlegg i REST API
Som bruker av REST API får man nå ut filstørrelse (bytes) på vedlegg. Dersom REST API ikke kjenner til størrelsen på vedlegget settes verdien til -1.  
Se REST APIets hjelpesider for mer informasjon: `/api/Help/`
### Mer info i Metadata for Formtask i REST API
Som bruker av REST API får man nå ut mer informasjon om Formtasks. Det er lagt til en liste med prosess-steg (ProcessSteps),
som inneholder navn og sikkerhetsnivå som kreves for å fullføre hvert steg.
Det er lagt til to felter som indikerer om sluttbrukersystemer kan benyttes for Formtasken (EUSEnabled/EnterpriseUserEnabled).  
Se REST APIets hjelpesider for mer informasjon: `/api/Help/`
### Forbedret caching i Metadata REST-apiet
For å unngå bugs bør man bytte fra å benytte AltinnCache.Get og AltinnCache.Insert til å bare bruke AltinnCache.GetObjectFromCacheOrMethod.
Det forhindrer vi at to forskjellige cache keys kan bli brukt ved et uhell.  
Dette gjelder alle metodene i /api/metadata. Se REST APIets hjelpesider for mer informasjon: `/api/Help/`
### Informasjon om kodelister tilgjengelig via REST API
Det er laget en ny ressurs `/api/metadata/codelists` hvor en ekstern person/utvikler kan få listet opp alle kodelistene i Altinn.
Listen filtreres i utgangspunktet automatisk på norsk, men bruker kan endre denne filtreringen ved å sette språk selv.  
Se REST APIets hjelpesider for mer informasjon: `/api/Help/`

### Endre avsender på skjema man instansierer via prefill-webservices
Det er lagt til felt som skal inneholde organisasjonsnummer til den virksomheten man sender på vegne av.  
Se REST APIets hjelpesider for mer informasjon: `/api/Help/`

### Forbedret validering av skjemasett i REST API
Kun tillate ett hovedskjema per forsendelse over REST-apiet.
REST API hadde mangelfull validering rundt MainForm / SubForm, hvor det har vært mulig å sende inn flere eller ingen MainForms, samt oppgi SubForm på
DataFormat/DataVersion tilhørende MainForm i det logiske formsettet til tjenesten.

#### Endringer i REST API
`POST` og `PUT` til `/{who}/Messages` blir nå grundigere validert, og vil gi HTTP feilkode 400 hvis en eller flere av følgende inntreffer:

- Det oppgis mer eller mindre enn én `form` model hvor `Type` er satt til `MainForm`
- `DataFormatId` og/eller `DataFormatVersion` på MainForm matcher ikke det som er definert i `LogicalFormsInFormSet` på det oppgitt tjenestekoden/versjonen
- `DataFormatId` og/eller `DataFormatVersion` på evt. oppgitte SubForms matcher ikke noen av de subforms som er definert i `LogicalFormsInFormSet` på det oppgitt tjenestekoden/versjonen

### AttachmentType i REST
Tidligere har AttachmentType  (´GET {who}/messages/{messageId}/attachments´) for vedlegg blitt satt til det oversatte navnet til AttachmentRuleType. 
Dette har ikke vært ønskelig, så det er rettet til å returnere den ikke-oversatte Id'en til AttachmentRuleType. Det er lagt til et nytt felt; AttachmentTypeLocalized som inneholder det oversatte navnet.

### Lagt til støtte for å soft-delete elementer for organisasjoner via REST API
Det er nå mulig å legge elementer fra arkiv og serviceengine i søppelboksen via REST grensesnittet.
Det var tidligere ikke mulig å slette elementer for organisasjoner gjennom REST APIet.
Dette er endret slik at det foretas en soft-delete for elementer som eies av organisasjoner i stede.

### Org-nummer for signerende bruker i feltet SignedByUserSsn i GetArchivedFormTask
Som tjenesteeier ønsker jeg at informasjon om signerer skal ligge med i oversendelse når skjema er signert av virksomhetssertifikatbruker.

Om en virksomhetsbruker (bruker uten SSN) signerte et skjema, inneholdt signeringsinformasjonen i GetArchivedFormTask kun brukernavn og intern database-id for brukeren, mens SignedByUserSsn var blankt.
SignedByUserSsn blir i dette tilfellet nå satt til organisasjonsnummeret til virksomhetsbrukeren slik at man vet hva skjemaet tilhører.

### XPath i feilmeldinger fra validering i REST grensesnittet
Utvide /validate med xpath til felt som har hard/soft valideringsfeil 

Ved innsendelse av nytt skjema til REST grensesnittet, eller ved å etterspørre /validate på en melding får man nå opp XPath inkludert i de feilmeldingen for felter som feiler validering.
Informasjonen er lagt til i ValidationError objektene som blir returnert ved innsendelse eller ved validering. Se `/api/help`.

### Operasjon for å hente ut roller for en person/organisasjon via REST-apiet
Som tjenesteeier ønsker jeg å kunne se rollene en person/virksomhetsbruker/organisasjon har for en annen person/organisasjon via REST-apiet 

Det er lagt til en ny metode i REST-apiet for tjenesteeiere. GetRoles tar inn en person/organisasjon (subject) som holder roller, og en person/organisasjon (reportee) som rollene er delegert for. 
Metoden returnerer en liste med alle rollene `subject` har hos `reportee`. Dette fungerer på lik linje med GetRights-metoden.
Se `/api/serviceowner/Help/Api/GET-serviceowner-authorization-roles_subject_reportee_language`.



## Diverse bugfix

- Søkeboks på feilsiden fungerer ikke
- Videresend: Altinn logo på videresend-siden ser ikke lenger ut som den er klikkbar
- Meldinger som bekreftes flere ganger opptrer flere ganger i innboks. Dette er rettet.
- Gi og del tilgang: Bruker har ikke rettigheter til å se rettighetene til en annen bruker 
- Gi og del tilgang: Hvis en tjeneste er "ikke delegerbar" så ønsker jeg allikevel å kunne videresende en melding 
- Selvregistert bruker: Lagreknapp forblir aktiv etter at nytt passord blir fjernet (før lagring) 
- Avansert søk - ulogisk bruk av sluttdato - periode inkluderer framtid 
- Forbedret tekst knyttet til visning av virksomhetssertifikatbruker
- Avansert søk - kan ikke søke med blanke datofelter 
- Tidligere lagrede søk på tvers fungerer ikke lenger - siste 12 måneder oversettes til periode 
- Text when samtykke is given, punktum mangler
- Gi og del tilgang: Kan ikke gi tilgang for arkiverte, bekreftede meldinger fra arkiv 
- Hvis du trykker enter når du har fokus i feltet der du kan søke etter skjema eller tjenester under gi rettigheter så kommer du til en grønn kvitteringsmelding 
- Skrivefeil i Innboks 
- Teksten AltinnII.SBL.MVC.Payment.DescriptionPay mangler verdier 
- Incorrect file name after upload client delegation by file - rettet for bokmål og nynorsk. 
- Husker ikke språkvalg når bruker kommer kommer tilbake fra siden "You do not have safe enough login for this service" 
- Ikke åpenrom mellom punktum og neste bokstav i aktivitetsloggen når det delegeres enkeltrettigheter 
- Ikke mulig å videresende til eier av element når eier er en person  - finner ikke aktør (person) i liste over brukere med tilgang 
- Profil - får ikke åpnet Skjema og tjenester du har rettighet til pga for lavt sikkerhetsnivå
- Not able to use videresend functionality for invalid users 
- Exception when delegating same element twice to same recipient 
- Mistet tilgang til et sett eldre elementer via REST API
