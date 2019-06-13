---
title: Om dokumentasjonen
description: Beskrivelse av hva vi legger i API-dokumentasjon, og hva som kommer når
weight: 80
---

Utvikling av Brønnøysundregistrenes nye registerplattform (BRsys) vil ta for seg flere og flere av våre registre, og foregå i flere år fremover. 
Under prosjekttiden etter hvert som eksisterende løsninger erstattes og nye løsninger blir klare, vil virksomheter som har behov for registerdata til eget bruk, eller for videre distribusjon, finne relevant informasjon fortløpende publisert på disse sidene gjennom GitHub.

Den første API-dokumentasjonen som gjøres tilgjengelig vil være for data om beslutning om ["Intet til utlegg" (ITU) og utleggstrekk/lønnstrekk (UTT)](../../apidokumentasjon/losoreregisteret/itu-utt)
fra [Løsøreregisteret](../../apidokumentasjon/losoreregisteret), og API-dokumentasjonen beskriver hvordan kunder/avtaleparter kan koble seg opp mot våre registre via maskin-til-maskin grenesesnitt.

## Hva er API-dokumentasjon

Disse sidene vil være et område hvor vi publiserer generell informasjon, tjenestebeskrivelser, informasjonsmodeller,
testdata, osv. - som et supplement til den tekniske dokumentasjonen som vil publiseres som maskinlesbare [OpenAPI-spesifikasjoner](https://github.com/brreg/openAPI). I OpenAPI-spesifikasjonen vil det bl.a. ligge eksempler på request og respons, feltbeskrivelser,
og annet som gjør at f. eks. godt utbredte [Swagger](http://editor.swagger.io/) blir et godt verktøy for å utforske og forstå API-ene.

OpenAPI-spesifikasjonene vil også tilgjengeligjøres gjennom [Felles API-katalog](https://informasjonsforvaltning.github.io/felles-datakatalog/), 
som vil sørge for at API-ene enklere kan oppdages av de som måtte være interesserte, og inneholde en link tilbake til dokumentasjonen som ligger på disse sidene.

## Tilgangsstyring

Hvem som kan få tilgang til enkelte av API-ene vil være regulert gjennom lovverk, og detaljer som tar for seg det praktiske rundt tilgangsstyring vil komme på egne sider her etter hvert.

For begrensede API-er som [ITU/UTT](../../apidokumentasjon/losoreregisteret/itu-utt/) ser vi for oss at kallende parter autentiserer seg gjennom [Maskinporten](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_guide_maskinporten.html).

{{% children description="false" %}}