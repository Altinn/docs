---
title: API release notes
description: Historikk om de ulike endringene som har blitt innført.
weight: 10
---

### Versjon 17.1 (februar 2017)

### Versjon 15.1 (13.02.2015)

Følgende  funksjonalitet er nå tilgjengelig:

1. Støtte for separat signering av innsendingstjenester.
2. Støtte for innsynstjenester.
3. Autorisasjonskontroll per API ressurs.
4. Mulig å hente meldinger/sende inn for andre personer brukeren har rettigheter til.
5. Filtrering på  slettede enheter og underenheter.
6. Støtte for sletting av meldinger og skjema.

### Versjon 14.2 (14.06.2014)

Følgende overordnet funksjonalitet er nå tilgjengelig:

#### 1. Metadata ressurs blir tilgjengelig i Altinn REST API
Metadata ressursen vil gi oversikt over alle tjenestene i Altinn, med tilhørende metadata om tjenestene.
Eksempler er tjenestetype, er innsending over REST api tillatt, lenke til XSD osv.
Ressursen krever ikke autentisering eller bruk av API nøkkel, og kan dermed  knyttes inn i andre nettsider/løsninger.

Message ressurser av typen ‘FormTask’ er også utvidet med lenke direkte til metadata informasjon om den aktuelle tjenesten.

#### 2. Profildata utvides med kontaktinformasjon brukt til varsel
Kontaktinformasjon registrert på brukere under "Min Profil" inkluderes nå i Profil ressursen.

#### 3. Kontaktinformasjon for Virksomheter er tilgjengelig i REST API
Det er nå mulig å lese kontaktinformasjon registrert på virksomheter brukeren har rettigheter på via REST API.

#### 4. POST av message til arbeidslisten i Altinn (mellomlagring)
Dette gjør det mulig opprette innsendinger via REST API som ikke sendes inn til tjenesteeier.
Ressursene kan så oppdateres i portalen, eller oppdateres via REST API (se punkt 5).

For å opprette ett nytt skjema under utfylling gjøres POST med url parameter `complete=false` slik: https://www.altinn.no/api/my/messages?complete=false

For å opprette ett nytt skjema til signering gjøres POST med url parameter `sign=false` slik: https://www.altinn.no/api/my/messages?sign=false

#### 5. PUT operasjoner blir tilgjengelig på mellomlagrede skjema
Det blir  mulig å oppdatere følgende på message-ressurser:

- Samlet skjemasett og vedlegg
- Arbeidsflyt (Utfylling, Innsending, Signering, Arkivering)

PUT operasjoner utføres direkte på den aktuelle message  og må inneholde alle skjema og vedlegg i hvert kall,
da tidligere lagret data vil overskrives ved ny PUT operasjon.

 

### Versjon 14.1 (24.02.2014)
Følgende overordnet funksjonalitet er nå tilgjengelig:

#### 1. Gjøre POST operasjoner på Message elementet i Altinn API
Man kan nå sende inn skjema med vedlegg. Gjelder for skjema som tjenesteeier (etat) selv har bestemt at kan sendes inn via REST API.
Skjemadata blir validert ihht valideringsreglene pr skjema og arkivert.

#### 2. Laste ned XML payload for skjema (Skjemadata)
Man kan nå laste ned (lese) XML-representasjon av Skjemadata. Skjemadata er representert i XML og vil være en egen ressurs som er lenket fra Form-ressursen. 

#### 3. Autentisering nivå 1 (Altinn autentisering med Altinn brukernavn og passord)
Man kan nå også autentiserer seg på sikkerhetsnivå 1 (som ikke støttes av ID-porten) ved å benytte Altinns egen autentisering.
Som registrerte Altinn bruker vil man kunne angi eget brukernavn og passord (Gjøres i Altinn portalen www.altinn.no).
Autentisering gjøres i en POST operasjon som logger inn brukeren. 

#### 4. Lese egne profildata (Privatperson)
Hente ut informasjon fra min brukerprofil i Altinn, gir oversikt over hvem som er logget inn (Navn,Adresse,  Personnr, ...).

#### 5. Lenker til Altinns portalvisning av gjeldende ressurs
Nye lenker ressurser som kan åpnes i nettleser:

 - Alle elementer av typen message har en PortalView lenke. Ved å følge lenken får brukeren opp Altinns presentasjon av elementet i [portalen](https://www.altinn.no). I portalen vil ressursen vises i den status den befinner seg i (Utfylling, Signering, Arkivert).
 - Lenke til Altinns portal-visning av `my/messages/`.
  

### Versjon 13.3 (25.11.2013)
Dette er Trinn 1 i leveranse av et Altinn API basert på REST-prinsipper. Følgende overordnet funksjonalitet er nå tilgjengelig:

#### 1. Autentisering via ID-porten
Dette er en SAML basert autentisering der innlogget bruker vil være føderert mot alle offentlige tjenester som benytter ID-porten. Føderte offentlige portaler og Applikasjoner utviklet av tredjepart kan dermed benytte ID-porten for tilgang til Altinn via Altinn API.

#### 2. GET operasjoner gir lesetilgang til følgende ressurser
 - Hent alle mine organisasjoner
 - Hent alle mine/min-organisasjons meldinger (støtte for OData-filtrering, f.eks. meldingstittel, avsender, dato, etc... )
 - Hent detaljer om enkeltmelding 
 - Hent utskriftsversjon av enkeltmelding 
 - Hent vedlegg til enkeltmelding 
