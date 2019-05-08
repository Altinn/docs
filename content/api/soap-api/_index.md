---
title: SOAP API
description: Dokumentasjon for Altinns SOAP API
weight: 800
aliases:
- /guides/integrasjon/sluttbrukere/webservice/
---

Denne delen av SOAP-APIet kan benyttes når eksterne systemer skal integreres mot Altinn. 

Altinn tilbyr opptil 4 forskjellige internett-adresserbare endepunkter
for hver tjeneste (URI). 

-   Basic Http (SOAP 1.1) (Tjenestekontrakter navngitt med
    ExternalBasic)

    -   Basis bruk av web services uten særlig støtte for nyere og
        moderne WS-\* standarder. Dette er fortsatt regnet som den
        standarden flest tekniske plattformer har mulighet til å
        integrere mot, men mangler en del mekanismer som supporterer web
        servicen blant annet innen sikkerhet.

    -   Binære vedlegg benytter Base64 enkoding

-   WS Http (SOAP 1.2) (Tjenestekontrakter navngitt med External)

    -   Støtter mer avanserte mekanismer og nyere standarder innen web
        services. Altinn tilbyr dette for å støtte de plattformene som
        benytter WS-Security.

-   Støtte for nye web service standarder WS-\* og gjør det mulig for
    Altinn å følge denne utviklingen i takt med systemer som ønsker å
    bruke Altinn web services.

-   Binære vedlegg benytter Base64 enkoding

{{% children description="true" %}}
