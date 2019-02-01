---
title: Bruke gjennom PEPPOL
weight: 20
---

{{% notice info %}}
Dette er dokumentasjon under arbeid for eBevis-tjenesten som per i dag ikke er produksjonssatt
{{% /notice %}}

## Innledning

eBevis kan benyttes gjennom en spesiell dokumenttype tilgjengelig på PEPPOL-infrastrukturen. eBevis kjører sitt eget aksesspunkt (AP) som kan motta meldinger i et spesielt EHF (elektronisk handelsformat), som inneholder all informasjon knyttet til en forespørsel (hvem som spør, hvem det spørres om, hvilke data som etterspørres samt eventuelle vedlegg som danner hjemmelsgrunnlag). Alle forespørseler vil avstedkomme et svar i et tilsvarende EHF-format som inneholder de forespurte opplysningene (subsidiært feilmeldinger).

* [Les mer om EHF-infrastrukturen](https://www.anskaffelser.no/verktoykasse-systemleverandorer/ehf-infrastruktur-kontraktsoppfolging/generelt-om-ehf-infrastruktur)

## Leverandører

Mange leverandører av KGV-er (konkurransegjennomføringsverktøy) er i dag koblet til PEPPOL-infrastrukturer og kan tilby tilkobling til eBevis til alle sine brukere innen offentlig sektor. Under er en liste over ulike løsninger som allerede i dag tilbyr innhenting av dokumentasjonsbevis gjennom eBevis.

{{% notice info %}}
TODO! Legg inn tabell med leverandører, produkter, kontaktinformasjon
{{% /notice %}}

## Teknisk

Her følger informasjon av teknisk art til hjelp for systemleverandører.

### PEPPOL

Det er to ulike EHF-formater som brukes for å implementere eBevis. Alle request-meldinger vil bli besvart med én melding i formatet EHF Get Evidence Response. Alle konsumenter av eBevis må derfor være registrert i SMP ([ELMA](https://www.anskaffelser.no/verktoykasse-systemleverandorer/ehf-infrastruktur-kontraktsoppfolging/hva-er-elma)) som mulige mottakere av EHF Get Evidence Response. Forvaltning av ELMA gjøres av Difi.

* EHF Get Evidence Request-meldinger sendes til **0192:974760673** (Brønnøysundregistrene)
* Endepunktet støtter kun [AS4](http://docs.peppol.eu/edelivery/as4/specification/)-protokoll
* Meldingen _må_ være i en [SBD](https://vefa.difi.no/bb/standard/sbdh/)-konvolutt
* Meldingen kan valgfritt være i en signert (ikke kryptert) ASIC container

EHF Get Evidence Response-meldinger må sees i sammenheng med den korresponderende EHF Get Evidence Request-meldingen. EHF Get Evidence Response-meldinger fra andre avsendere enn eBevis, eller som ikke kan assosieres med en tidligere sendt EHF Get Evidence Request skal ignoreres.

* [Les mer om innmelding i ELMA](https://www.anskaffelser.no/ehf-infrastruktur-kontraktsoppfolging/hva-er-elma-smp/elma-inn-og-utmelding).

### EHF Get Evidence

EHF er basert på internasjonalt standardiseringsarbeid, nærmere bestemt; CEN BII Core data modellene og en syntaks implementering basert på Universal Business Language (UBL). EHF Get Evidence representerer to ulike formater (henholdsvis "Request" og "Response"). Formatet er utviklet og forvaltes av Difi.

* [Teknisk dokumetasjon om EHF Get Evidence](https://test-vefa.difi.no/ehf-egov/g1/get-evidence-1.0/)
* [Les mer om EHF-formatene generelt](https://www.anskaffelser.no/digitalisering/verktoykasse-systemleverandorer/formater-ehf-bis)

### ASIC-E

Alle EHF Get Evidence Response-meldinger som sendes fra eBevis legges i en ASIC-E container hvor selve dokumentet er signert med Brønnøysundregistrens virksomhetsertifikat. Konsumenter må besørge for utpakking og verifisering av innholdet før dette benyttes.

* [Les mer om ASIC](https://www.anskaffelser.no/verktoykasse-systemleverandorer/ehf-infrastruktur-kontraktsoppfolging/asic)