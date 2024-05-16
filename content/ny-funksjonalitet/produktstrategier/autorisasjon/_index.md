---
title: Altinn Autorisasjon
titlesup: FASES UT
weight: 400

---
Altinn Autorisasjon er en av fem produkter som tilbys gjennom Altinn plattformen. På denne siden finner du gjeldende produktstrategi for Autorisasjonsproduktet.
- [Hva er Altinn Autorisasjon?](../autorisasjon/#produktområdet-autorisasjon)
- [Hvilke behov skal Altinn Autorisasjon løse?](../autorisasjon/fremtiden/autorisasjon_behov/)
- [Hvordan ser fremtidens Altinn Autorisasjon ut?](../autorisasjon/fremtiden/autorisasjon_maal/)


!["altinn autorisasjon"](../autorisasjon/logo.PNG)

Det er felles forståelse innen det offentlige at Altinn Autorisasjon er autorisasjonsnavet for offentlig
sektor. Potensialet for forenkling ved bruk av fremtidens autorisasjonfunksjonalitet som f. eks digital
fullmakt eller tidsbegrenset samtykke til å dele data er meget stort. Det er også en forutsetning for å
lykkes i forenklingsarbeidet. Altinn Autorisasjon vil derfor stå helt sentral i utviklingen av Altinn i de
kommende årene.

## Produktområdet Autorisasjon
Altinn Autorisasjon skal gi mulighet for å styre hvem som skal (kunne) gjøre hva og når med hvilke
data i det offentlige og i samspillet mellom offentlig og privat.

I Altinn opptrer bruker alltid på vegne av «noen eller noe» - enten seg selv, andre privatpersoner
eller andre virksomheter – f.eks. arbeidsgiveren din, lokalforeningen du er leder for eller en kunde du
er leverandør for. Det er avgiver som har en rett eller plikt til å utføre en tjeneste, benytte en ressurs
eller eier data som skal deles med andre.

Altinn Autorisasjon kan best illustreres med følgende figur:
!["Rollemodell"](../autorisasjon/autorisasjonsmodell.PNG)

En rettighet gir en identifisert og autentisert bruker tilgang til en definert ressurs eller tjeneste på
vegne av en identifisert avgiver, f.eks. å utføre en tjeneste eller tilgang til data om avgiver hos en
datakilde. Mellom bruker og avgiver foreligger det et representasjonsforhold som Altinn kjenner til.

En rettighet kan f.eks. være et samtykke til å dele data, en fullmakt til å utføre en handling eller en
tilgang til å utføre en tjeneste. En bruker kan få denne rettigheten ved at avgiver selv aktivt gir
denne til bruker, eller rettigheten kan hver hjemlet i lov, f.eks. daglig leders rett til å opptre på vegne
av et aksjeselskap.

Det er også mulig å beskrive vilkår for rettigheten i form av en avtaletekst som spesifiserer hva
rettigheten innebærer og vilkår for at denne trer i kraft. Dette kalles gjerne en samtykketekst eller
formålsbeskrivelse.

En rolle gir bruker en samling rettigheter som det er naturlig å knytte sammen. F eks gir rollen
“Regnskapsmedarbeider” rettigheter til tjenester som det er naturlig at en regnskapsmedarbeider
utfører. 

## Autorisasjonstjenesten har 4 hovedegenskaper:

Autorisasjon handler om å spesifisere rettigheter til å benytte en angitt ressurs (for eksempel en
nettside eller et API) eller tjeneste (for eksempel «Salgsmelding for motorvogn»), og formelt sett
betyr begrepet autorisere det å definere regler for tilgang.

Tilgangsstyring dreier seg om å gi videre rettigheter til å benytte en tjeneste til riktige personer eller
organisasjoner, for eksempel at daglig leder gir en ansatt rett til å sende inn A-meldingen på vegne av
sin virksomhet. Slike rettigheter er administrert av avgiver selv.

Tilgangskontroll gjør det mulig å kontrollere at en bruker har rettighet til å benytte angitt ressurs
eller tjeneste på vegne av en angitt avgiver.

Autoritative kilder Altinn har fra starten basert seg på grunndata for autorisasjon fra
Enhetsregisteret (registrert rolle i organisasjon) og Det Sentrale folkeregisteret (privatperson og
familietilknytning). Vi har som uttalt mål å utvide dette med tilgang til flere grunndataregistre. Slike
rettigheter er lovbestemt.

## Autorisasjonstjenester som tilbys brukerne

For statlig og kommunale virksomheter som leverer digitale tjenester tilbyr Altinn autorisasjon:
- En [samtykkeløsning](../samtykke/) for sikker deling av data 
- En [oppslagstjeneste](/docs/api/tjenesteeiere/rest/autorisasjon/hent_avgiver/) for å avklare om og hvilke representasjonsforhold som foreligger mellom
en bruker og en avgiver
- Støtte for hjemmelsbasert styring av tilgang til digitale tjenester gjennom tilgang til
autorative register (roller fra Enhetsregisteret)
- Støtte for å styre leverandørers tilgang til offentlige API

For innbyggere, frivillig sektor, næringsliv, statlige og kommunale virksomheter som bruker digitale
tjenester tilbyr Altinn Autorisasjon:
- En helhetlig oversikt over alle registrerte representasjonsforhold
- En mulighet til å administrere brukerstyrte representasjonsforhold mellom avgiver og bruker
(opprette, endre, slette)
- [API](/docs/api/) for næringslivet, som kan bygge verdiøkende tjenester for sine kunder
- [API-tjenester](/docs/api/rest/autorisasjon/) for å knytte virksomhetens brukeradministrasjonssystem mot Altinn for å lette
virksomhetens tilgangsstyringsarbeid
