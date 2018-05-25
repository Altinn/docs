---
title: Bruke gjennom PEPPOL
weight: 20
---

{{% notice info %}}
Dette er dokumentasjon under arbeid for NADOBE-tjenesten som per i dag ikke er produksjonssatt
{{% /notice %}}

## Innledning

NADOBE kan benyttes gjennom en spesiell dokumenttype tilgjengelig på PEPPOL-infrastrukturen. NADOBE kjører sitt eget aksesspunkt (AP) som kan motta meldinger i et spesielt EHF (elektronisk handelsformat), som inneholder all informasjon knyttet til en forespørsel (hvem som spør, hvem det spørres om, hvilke data som etterspørres samt eventuelle vedlegg som danner hjemmelsgrunnlag). Alle forespørseler vil avstedkomme et svar i et tilsvarende EHF-format som inneholder de forespurte opplysningene (subsidiært feilmeldinger).

* [Les mer om EHF-infrastrukturen](https://www.anskaffelser.no/verktoykasse-systemleverandorer/ehf-infrastruktur-kontraktsoppfolging/generelt-om-ehf-infrastruktur)

## Leverandører

Mange leverandører av KGV-er (konkurransegjennomføringsverktøy) er i dag koblet til PEPPOL-infrastrukturer og kan tilby tilkobling til NADOBE til alle sine brukere innen offentlig sektor. Under er en liste over ulike løsninger som allerede i dag tilbyr innhenting av dokumentasjonsbevis gjennom NADOBE.

{{% notice info %}}
TODO! Legg inn tabell med leverandører, produkter, kontaktinformasjon
{{% /notice %}}

## Teknisk

Her følger informasjon av teknisk art til hjelp for systemleverandører.

### PEPPOL

Det er to ulike EHF-formater som brukes for å implementere NADOBE. Forespørsler sendes til 990X:XXXXX i formatet EHF Get Evidence Request, pakketert i en signert ASIC-E container. Alle request-meldinger vil bli besvart med én melding i formatet EHF Get Evidence Response. Alle konsumenter av NADOBE må derfor være registrert i SMP ([ELMA](https://www.anskaffelser.no/verktoykasse-systemleverandorer/ehf-infrastruktur-kontraktsoppfolging/hva-er-elma)) som mulige mottakere av EHF Get Evidence Response. Forvaltning av ELMA gjøres av Difi.

EHF Get Evidence Response-meldinger må sees i sammenheng med den korresponderende EHF Get Evidence Request-meldingen. EHF Get Evidence Response-meldinger fra andre avsendere enn NADOBE, eller som ikke kan assosieres med en tidligere sendt EHF Get Evidence Request skal ignoreres.

* [Les mer om innmelding i ELMA](https://www.anskaffelser.no/ehf-infrastruktur-kontraktsoppfolging/hva-er-elma-smp/elma-inn-og-utmelding).

### EHF Get Evidence

EHF er basert på internasjonalt standardiseringsarbeid, nærmere bestemt; CEN BII Core data modellene og en syntaks implementering basert på Universal Business Language (UBL). EHF Get Evidence representerer to ulike formater (henholdsvis "Request" og "Response"). Formatet er utviklet og forvaltes av Difi.

* [Teknisk dokumetasjon om EHF Get Evidence](https://test-vefa.difi.no/ehf-pre/guide/getevidence/1.0/)
* [Les mer om EHF-formatene generelt](https://www.anskaffelser.no/digitalisering/verktoykasse-systemleverandorer/formater-ehf-bis)

### ASIC-E

Alle EHF Get Evidence Response-meldinger som sendes fra NADOBE legges i en ASIC-E container hvor selve dokumentet er signert med NADOBEs virksomhetsertifikat. Konsumenter må besørge for utpakking og verifisering av innholdet før dette benytes.

* [Les mer om ASIC](https://www.anskaffelser.no/verktoykasse-systemleverandorer/ehf-infrastruktur-kontraktsoppfolging/asic)