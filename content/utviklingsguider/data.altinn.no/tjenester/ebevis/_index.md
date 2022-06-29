---
title: eBevis 
description: Informasjon om leverandører i offentlige anskaffelser
weight: 1
---

eBevis er et samarbeid Brønnøysundregistrene, Skatteetaten, Digitaliseringsdirektoratet og DFØ. Løsningen ble produksjonsatt 01.04.19.

eBevis er en løsning som er laget for å digitalisere anskaffelsesprosessen, og brukes samtidig som et verktøy for å kontrollere om leverandører er seriøse. eBevis lar offentlige oppdragsgivere/innkjøpere få tilgang til å hente inn definerte sanntidsdata om leverandører i forbindelse med offentlige anskaffelser. Det gjelder både før og etter kontraktinngåelse. 

Ved hjelp av samtykkeløsningen i Altinn eller hjemmel, vil løsningen kunne høste og avgi ikke-åpne data, for eksempel skatteopplysninger.

Tjenesten forvaltes av Brønnøysundregistrene.

## Les mer om anskaffelser 

Brønnøysundregistrene har ytterligere (ikke-teknisk) informasjon om eBevis-tjenesten, herunder kontaktinformasjon om hvordan man kan ta det i bruk.

* [eBevis-tjenesten hos Brønnøysundregistrene](https://www.brreg.no/offentlig-sektor/enklere-offentlige-innkjop-med-ebevis/)

## Bruk av utvidet skatteattest

Enkelte anskaffelser er knyttet til produkt- og tjenesteområder som er knyttet med særlig risiko. I disse tilfellene er det anledning for å kunne hente ut en utvidet skatteattest i form av ytterligere datasett utover skatte- og avgiftsrestanser som alltid er tilgjengelig. I alle tilfeller kreves samtykke fra leverandøren.

Det er da totalt fire datasett fra Skatteetaten. 

| Datasettnavn                                                       | Kun i utvidet skatteattest? |
|--------------------------------------------------------------------|-----------------------------|
| [RestanserV2](#RestanserV2)                                        | Nei                         | 
| [MvaMeldingsOpplysning](#MvaMeldingsOpplysning)                    | Ja                          | 
| [Arbeidsgiveravgift](#Arbeidsgiveravgift)                          | Ja                          | 
| [OppdragUtenlandskeVirksomheter](#OppdragUtenlandskeVirksomheter)  | Ja                          | 

Logikken som bestemmer om en gitt anskaffelse kvalifiserer for tilgang til utvidet skatteattest for leverandørene, bestemmes av hvilke [CPV-koder](https://www.regjeringen.no/no/tema/naringsliv/konkurransepolitikk/offentlige-anskaffelser-/forste-kolonne/regelverk-og-skjemaer-listeside/offentlige-anskaffelser-cpv-og-cpc/id2518876/) anskaffelsen er knyttet til. 

Gjennom funksjonalitet i data.altinn.no løses dette gjennom at systemet som foretar forspørselen oppgir at man ønsker alle disse datasettene, samtidig som man oppgir en "legal basis", som er en referanse til en annen datastruktur som inneholder en liste av en eller flere CPV-koder knyttet til den aktuelle anskaffelsen.

Et eksempel

```json
{
  "requestor": "{RequestorOrgNo}",
  "subject": "{SubjectOrgNo}",
  "evidenceRequests": [
    {
      "evidenceCodeName": "RestanserV2",
      "requestConsent" : true
    }, 
    {
      "evidenceCodeName": "MvaMeldingsOpplysning",
      "requestConsent" : true,
      "legalBasisId": "legalbasis-1"
    },
    {
      "evidenceCodeName": "Arbeidsgiveravgift",
      "requestConsent" : true,
      "legalBasisId": "legalbasis-1"
    }, 
    {
      "evidenceCodeName": "OppdragUtenlandskeVirksomheter",
      "requestConsent" : true,
      "legalBasisId": "legalbasis-1"
    }
  ],
  "legalBasisList": [
    {
      "Id": "legalbasis-1",
      "Type": "cpv",
      "Content": "45000000-7,45000000-8"
    }
  ],
  "consentReference": "reference_to_user",
  "languageCode": "no-nb"
}
```

I dette eksempelet gjøres det en forespørsel på alle datasettene som inngår i utvidet skatteattest. Kobling til hvilke CPV-koder som assosieres med forespørselen gjøres gjennom at det oppgis en `legalBasisId` som også finnes i `legalBasisList`. Her kan det oppgis vilkårlige strenger som identifikatorer for å koble disse sammen.

API-et i data.altinn.no støtter at det oppgis distinkte "legal basis" som kan kan refereres til av de forespurte datasettene, men for eBevis oppgis det kun én oppføring i `legalBasisList` med `Type` satt til `cpv` og `Content` med en kommadelt liste over de CPV-koder som den aktuelle anskaffelsen er knyttet til.

Utfra hvilke CPV-koder som oppgis vil eBevis-tjenesten vurdere om de oppgitt kodene kvalifiserer til utvidet skatteattest eller ikke. Returen som sendes fra data.altinn.no vil indikere dette gjennom hvilke `evidenceCodes` som returneres. Hvis den returnerte listen inneholder alle de forespurte datasettene, vil det kunne hentes ut utvidet skatteattest. Hvis ikke vil kun `RestanserV2` returneres, og utvidet skatteattest vil ikke kunne hentes ut.

Det anbefales derfor at integrasjoner alltid forespør alle datasettene, og overlater til eBevis å vurdere om det skal utstedes utvidet skatteattest eller ikke.

Under er en liste over alle datasett som er tilgjengelige i eBevis.


{{% evidencecodes eBevis %}}