---
title: 20.1
description: Mindre forbedringer og feilrettinger
weight: 130
type: releasenote
releasenote_info: Release 20.1, produksjonssatt 20. januar 2020
---

## Endringer i Portal

### Visning av rettigheter via samtykke under "Andre med rettigheter til skjema og tjenester" er fjernet

Tidligere kunne man feilaktig se og slette rettigheter man hadde fått via samtykke ved å gå inn på "Andre med rettigheter til skjema og tjenester". Dette er nå fjernet.

### Virksomhetsbruker med ECKEYROLE fikk opp alle aktører som hadde gitt sammtykke til enheten

Aktører som hadde gitt samtykke kom opp under "Alle dine aktører" for virksomhetsbruker med ECKEYROLE. Dette trenger ikke å ligge i aktørlisten og er derfor tatt bort.

### Endret tekst på delegeringssøkefeltets nedtrekksfelt

Tidligere viste nedtrekksfeltet kun “X treff”, men teksten er nå “Mest brukte tjenester” når man ikke har skrevet noe i søkefeltet. Så snart man har skrevet noe i søkefeltet vil det stå “X treff” igjen.

![Slik så det ut før endringen](xtreff.png "Slik så det ut før endringen")

### Ved "be om tilgangs-forespørsler" der det mangler e-post i kontakt- og reservasjonsregisteret er det gjort endringer

Ved be om og gi tilgang og varslingsadresse ikke finnes i KRR kommer kommer det nå opp dialogboks for å legge inn e-postadresse.

### Støtte for meldinger og skjema med taushetsbelagt og sensitivt innhold 
I dag må alle tjenester knyttes til roller som daglig leder i virksomheten har. 
Dette resulterer i at daglig leder får automatisk innsyn i alle meldinger som sendes virksomheten. 
Det er nå mulig å sende meldinger/opprette skjema til virksomheter som ingen i utgangspunktet får innsyn i. 
Daglig leder eller hovedadministrator kan fortsatt gi tilgang til disse meldingene til utvalgt medarbeider eller seg selv.

Tjeneste med taushetsbelagt innhold må knyttes til en "sensitiv rolle". 
Utbredelse av funksjonaliteten forutsetter at tjenesteeiere utvikler tjenester som knyttes til sensitive roller. 
Intensjonen er at det ikke er mange i hver organisasjon som skal ha de sensitive tjenesterollene, men at det skal delegeres 
på enkelttjenester eller instanser ved behov til de som faktisk skal ha tilgang

## Feilrettinger

### Get reportee henter info med feil appid

 Tidligere ble personer lagt til i lista av avgivere uten å faktisk sjekke om vedkommende hadde tilganger. Dette er forandret slik at sjekk nå blir gjort.  I tillegg var det slik at hvis man satte en ugyldig tjenestekode fikk man denne lite informative feilmeldingen: "500- Object cannot be cast from DBNull to other types". Denne er nå endret til: "400 The ServiceCode … are either invalid or non-existing".

### Byttet ikon for virksomhetsbrukere i Profil siden

Det var feil ikon for virksomhetsbruker i "Andre med rettigheter" og “Gi og fjerne rettigheter”. Dette er nå utbedret ved å bytte fra det normale person/bruker ikonet til ai-server ikonet.

![Gammelt ikon](ikon.png "Gammelt ikon")
Gammelt ikon
&nbsp;
![Gammelt ikon](ikon3.png "Gammelt ikon")
Gammelt ikon
&nbsp;
![Nytt ikon](ikon2.png "Nytt ikon")
Nytt ikon

### Fjernet unødvendige null sjekker på autentiseringsparametere i eksterne SOAP kall til DeleteReporteeElement

Både DeleteReporteeElementExternal og DeleteReporteeElementBasic var satt opp med null/tom string sjekk for alle input parameterene: userSSN, userPinCode, userPassword og authMethod. Dette førte til at passord (som ikke er nødvendig å oppgi ved pin autentisering) likevel trigget feilmelding, og tvang konsumentene til å oppgi en verdi. Disse sjekkene er nå fjernet.

### Virksomhetssertifikat - melding om feil passord for virksomhetsbruker

Når man slettet et virksomhetssertifikat for å laste opp nytt fikk man "ugyldig brukernavn/passord" ved innlogging med virksomhetsbruker. Dette er nå rettet.

### Ytelsesforbedring i Maskinporten

Det er utført optimalisering og opprettet indeks for å forbedre ytelsen.

### CoveredBy og OfferedBy kan ikke være like på ConsentRequest via REST

Tidligere fikk man server error når disse var like. Nå får man en beskrivende feilmelding.



