---
title: NADOBE
description: Veiledning for bruk av Nasjonal tjeneste for dokumentasjonsbevis (NADOBE)
weight: 100
---

{{% notice info %}}
Dette er dokumentasjon under arbeid for NADOBE-tjenesten som per i dag ikke er produksjonssatt
{{% /notice %}}

## Innledning

NADOBE er en tjeneste som lar offentlige innkjøpere få tilgang til oppdaterte kvalifikasjonsbevis for norske leverandører både før og etter kontraktsinngåelse. Ved hjelp av [samtykkeløsningen](/docs/guides/samtykke/) i Altinn eller hjemmel vil løsningen også kunne høste og avgi ikke-åpne data, f.eks. skatteopplysninger.

{{< figure src="https://www.lucidchart.com/publicSegments/view/f3ce06b1-22a8-4b29-9af4-13dbeb258c83/image.png" title="NADOBE Arkitektur" width="700" >}}

## Beviskilder og beviskoder

Løsningen baseres på at en innkjøper kan sende forespørsler på en eller flere _beviskoder_, som er en betengelse for en informasjonspakke som kan inneholde et eller flere felter med strukturert eller ustrukturert informasjon. Forespørsler inneholder 1) hvem som spør 2) hvem forespørselen gjelder og 3) hvilke beviskoder spørres det om.

## Hjemmel og samtykke

Beviskoder kan representere informasjon fra en eller flere offentlige registre, som kan ha ulik grad av tilgjengelighet. Noen beviskoder kan være utelukkende hjemmelsbasert, og hjemmelsgrunnlag må da sannsynliggjøres enten gjennom et vedlegg i forespørselen eller utfra identiteten til den som utfører forespørselen. Andre beviskoder vil kunne kreve et samtykke, og NADOBE vil da igangsette en samtykkeprosess i Altinn hvor virksomheten det etterspørres informasjon, gjennom en representant med tilstrekkelig tilgangsnivå, må logge seg inn i Altinn-portalen og innvilge et aktivt samtykke.

Hjemmelsgrunnlag vil for enkelte beviskoder være ulikt før og etter kontraktsinngåelse, så enkelte beviskoder vil kunne innhentes med hjemmel "pre-award" men kreve samtykke "post-award".