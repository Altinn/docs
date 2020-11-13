---
title: "20.11"
description: Be om tilgang på vegne av avgiver, mindre endringer og feilrettinger
weight: 30
type: releasenote
releasenote_info: Versjon 20.11, produksjonssettes 23. november 2020
---
**Dette er en kommende endring. Gjeldende endring ligger [her](../20-10).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i portal

### Sette meldinger som ulest

Det har lenge vært et ønske fra brukere som opptrer på vegne av
virksomheter at det skal være mulig å kunne markere en melding som ulest.
Dette er særlig et behov for virksomheter som har mange brukere og som
mottar mange meldinger. Det er lett at meldinger som åpnes "forsvinner"
i mengden av andre leste meldinger før virsomheten har fått fulgt opp meldingen
de har mottatt. Endringen griper inn i både sluttbrukerløsningen og REST APIet.
Hovedvekten av endringen er i meldingsboksen der man nå får en ny
"Sett til ulest" knapp på meldinger. Når denne velges og meldingsboksen lastes
på nytt så vil meldingen se ulest ut.

### Valget for å legge til virksomhetsbruker under "Andre med rettigheter" for en privatperson er fjernet

Det skal kun være mulig å legge til organisasjoner som virksomhetsbrukere. Det er bare virksomhetsbrukere som er knyttet til samme organisasjonsnummer som aktøren som kan legges til. Muligheten for å legge til en virksomhetsbruker for en privatperson er fjernet. Valget vil være "grået ut" og ikke lenger være klikkbar. Panelet for klientdelegering er også påvirket av denne endringen. Valget "Ekstern virksomhet" vil være synlig, men ikke klikkbar. Dette feltet var tidligere skjult.

### Mulighet for å laste ned alle vedlegg som ligger i en melding

Dersom en melding inneholder flere vedlegg har man frem til nå måtte laste ned alle vedlegg i meldingen individuelt ved å trykke på hvert vedlegg. Det er nå mulig å laste ned alle vedlegg samlet som en .zip-fil. Dersom meldingen inneholder mer enn ett vedlegg vil man i "flere valg" menyen ha en "Last ned alle" knapp for å "zippe” sammen alle filene og laste disse ned samlet.
Det er i arbeidet med denne endringen også gjort endringer i meldingsboksen slik at man får opp "Flere valg" menyen i alle tilfeller der det finnes flere enn 4 valg på en melding

### Støtte for å kunne be om tilgang på vegne av en avgiver (organisasjonsnummer og personnummer)

Be om tilgang løsningen er nå utvidet med mulighet til å kunne be om tilgang på vegne av en avgiver. Dette er implementert ved at "be om tilgang" siden nå godtar at man kan spesifisere hvem man ber om tilgang på vegne av.

### Endring av rekkefølge på knapper/handlinger på meldinger i meldingsboksen

Det begynner å bli mange valg på meldinger i meldingsboksen og "Flere valg" menyen vil vises oftere. Det er derfor utført en omprioritering av rekkefølgen av handlingsknappene.

## Endringer i Autorisasjon

### Lagt til støtte for å kunne bruke den nye Access operasjonen i autorisasjon i kombinasjon med SRR (Service Rights Register)

Endringen gjør det mulig å ta i bruk forenklet tjenestedelegering også for tjenester som skal SRR-styres.

### Fjerne utgåtte autorisasjonsregler fra eldre tjeneste versjoner

Det vil uføres en jobbb for å fjerne ER og Altinn roller fra utgåtte versjoner siden det er rollene på siste versjon som er gjeldende.

## Endringer i REST-API

### Implementert støtte for OData på /api/serviceowner/delegationrequests

I dagens løsning er det tungvint å skulle hente ut alle forespørsler for en gitt coveredBy, dvs. den person/virksomhet som ønsker å motta rettigheter fra en annen person/virksomhet. Det er derfor laget støtte for OData-filtrering på delegationRequest. Funksjonaliteten er relevant for tjenesteeiere som benytter Altinn som autorisasjonsløsning for sine tjenester.

### Støtte for ID-porten-token autentisering på sluttbruker-APIet

I dagens REST API for sluttbrukere har det til nå blitt benyttet brukernavn og passord og/eller cookie-capturing i klienten for autentisering. Dette har medført at sluttbruker på en eller annen måte må ha en aktiv sessjon i Altinn.

Gjennom endringen som er gjort i denne releasen vil det nå være mulig å benytte seg av et bearer token fra ID-porten. Det aktuelle tokenet fra ID-porten vil inneholde scopes som definerer hvilke operasjoner på REST APIet som det aktuelle tokenet gir tilgang til. Dette er en videreføring av endringer som ble gjort i endring 20.7 for innføring av Maskinporten autentisering på REST API.

Gjennom en samtykkedialog hos ID-porten hvor sluttbruker samtykker til at ulike operasjoner på REST APIet kan benyttes av sluttbrukersystemet, vil sluttbrukersystemer som er bygget på toppen av REST APIet på en enklere måte integrere seg mot Altinn. Dette gjør også prosessen for sluttbruker enklere da disse ikke lengre trenger å logge inn i Altinn hver gang, men heller nå kan benytte seg av avtalen om utlevering av informasjon gjennom APIet som ligger i ID-porten.

Endringen er 100% bakover kompatibel slik at eksisterende integrasjoner fortsatt vil fungere.

### Støtte for delegert tilgang til consentRequest/token-endepunkt

Tilgang til å hente ut et token og autentisere seg mot Altinn på vegne av en annen organisasjon er innført.

## Endringer i sluttbrukerløsningen

### Endring av submitformtask (og dermed også kvitteringer)

SubmitFormTask er endret slik at alt gjøres synkront og respons fra tjenesten får med ferdig kvittering. Man trenger derfor ikke gjøre egne kall for å hente kvittering.
Endringen bryter ikke eksisterende grensesnitt, men sluttbrukersystemene oppfordres til å fjerne kode for å lese kvittering når kvittering allerede foreligger fra SubmitFormtask.
Sluttbrukersystemene må fremdeles lese kvittering i de tilfellene de venter på korrelert meldingstjeneste - f.eks. kvittering fra Skatteetaten på A-melding.

## Diverse bugfix

### Odata kunne hoppe over samtykker

Continuation token for /api/serviceowner/consents blir nå generert etter OData. Dette gjør det mulig å paginere denne listen ved å bruke continuation token og $top.

### Sending av SMS gav feilmelding for tjenesteeiere/tjenestekoder med ÆØÅ

Dette er nå rettet

### Inkonsistens i bruk av navn på organisasjoner i REST API

Bruker nå alltid offisielt navn på virksomheter i alle sammenhenger i REST API og ikke redigert navn.

### Manglende innslag i aktivitetslogg når tjenesteeier modifiserte Altinn App instans

Dette er nå rettet.

### Bruker registrert uten fødselsnummer/D-nummer fikk ikke startet App instans

Dette er nå rettet.

### Manglende validering på innhold av Metadata verdier ved registrering av Samtykkeforespørsel gjennom REST

Dette er nå utbedret ved å kreve at det oppgis en verdi for metadata parameterne ved opprettelse i REST.

### "Kontroller oppgave/alle" validerer ikke riktig når skjema kun har myke feil som kommer fra Altinn regelmotor

Myke feil blir nå satt som "Med advarsler" istedenfor "Med feil" slik at man får sendt inn skjema fra "Oversikt - skjema og vedlegg" siden.
