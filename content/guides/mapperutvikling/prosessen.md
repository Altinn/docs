---
title: Prosessen
description: Beskrivelse av hva man må gjøre for å utvikle, teste og produksjonssette en mapper
weight: 100
---

## Generelt

Dette dokumentet beskriver prosessene rundt utvikling og forvaltning av mapper.

### Om mapper

En mapper er en komponent som muliggjør integrasjon mellom Altinn og tjenesteeiersystemer.  Denne integrasjonen vil la en skjemautvikler kunne benytte seg av et rikt etatsspesifikt datasett. Dette muliggjør dermed en stor variasjon av tjenester som ellers ikke ville kunne utvikles på Altinn-plattformen.

### Forutsetninger

For å kunne utvikle en mapper er det en del forutsetninger som ligger til grunn.

1. Brukernavn og passord for tilgang til selvbetjeningsportal ( [https://selvbetjening.brreg.no](https://selvbetjening.brreg.no)) for bestilling av brannmuråpninger, produksjonssetting av mapper og andre tilganger.
Dersom du ikke har brukernavn på selvbetjeningsportal, så kan dette bestilles ved å sende e-post til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no)

2. Tilgang til utviklingsserver for mapper.
Utviklere som har gjennomført Tjenesteutviklings- eller mapperkurs kan bestille tilgang til utviklingsserver for mappere.   
Bestilling gjøres i selvbetjeningsportal via bestillingsskjema
-> **"Ny henvendelse"** -> **"Tilganger"** -> **«Tilgang til TUL og/eller SERES»**. 
I skjemaet må det avkrysses for «Ønskes det tilgang til avanserte tjenesteutviklingsverktøy (Visual studio og Team Foundation Server)?»

3. Tilgang til TFS
All mapperkode skal sjekkes inn og vedlikeholdes i TFS. Dette betinger at utvikler også har en brukerkonto i Altinns utviklingsmiljø AI-DEV. Bestilling av brukerkonto  gjøres i selvbetjeningsportal via bestillingsskjema **«Tilgang til Altinns utviklingsmiljø AI-DEV»**.
I feltet «beskrivelse spesielle behov» så må det angis hvilke tjenesteeier(e) man skal utføre utviklingsoppdrag for.

1. Åpning i brannmur hos altinn og tjenesteeier.
For å kunne teste og bruke mapper, så må tjenesteeier åpne for trafikk inn fra mapper- og utviklingsserver. Informasjon om hvilke IP-adresser som trafikken vil komme fra, er distribuert til de respektive tjenesteeiere.
I tillegg må det bestilles åpning for utgående trafikk fra Altinn til tjenesteeier.
Bestilling av åpninger gjøres i selvbetjeningsportal via bestillingsskjema **«Åpning i brannmur»**.
I feltet Miljø anbefaler vi at det velges annet, og at man legger inn «Produksjon, TT02 og TUL» i feltet Spesifisér miljø. Man sikrer da at man får alle nødvendige åpninger på plass i en bestilling. For Tjenesteeiere som skal teste mappere i AT-Miljø, så må man også legge til dette.
I feltet «Hva gjelder brannmuråpningen?», velges Mapper/ekstern tjeneste.
For å sikre at man også får åpnet fra utviklingsserver bør man spesifisere i Andre opplysninger, at det også skal åpnes for trafikk fra utviklingsserver «VDEV»



## Prosesser

### Utvikling

Når nødvendige forutsetninger er oppfylt logger man på utviklingsserver via [TUL](https://tul.altinn.no) og starter «Visual Studio Server». Du får da opp en RDP sesjon mot utviklingsserver.
På utviklingsserver startes så opp Visual Studio, og man kan så koble seg til TFS på adressen https://tfs.ai-dev.brreg.no.

Man har også tilgang tfs over internett uten å gå veien om TUL.

### Testing

Forutsatt at nødvendige brannmuråpninger er på plass hos altinn og tjenesteeier, så skal man kunne kjøre mapper på utviklingsserver, og utføre eventuelle enhetstester.

### Produksjonssetting

Når mapper er ferdig testet bestilles produksjonssetting via selvbetjeningsportal.

Her benyttes skjema **«Produksjonsetting av tjenester, kodelister og mappere».**

I bestilling er det viktig at man angir navn på mapper, hvilket miljø man vil ha mapperen instalert i, teknisk kontaktperson med telefonnummer og hvor det er sjekket inn master/ branch, vi henter fra master om ikke annet er angitt.

Mapper blir sjekket ut og bygget, og installasjonsprosjektet blir testkjørt av oss før det oversendes leverandør for installasjon i respektive miljøer. Dette for å unngå åpenbare feilkilder i prodsettingen.
