---
title: data.altinn.no
description: data.altinn.no (DAN) er laget for å kunne forenkle deling av data fra virksomheter, med formål om å gjenbruke informasjon direkte fra kilden.
weight: 100
toc: true
aliases: 
    - /guides/nadobe/
    - /guides/dokumentasjonsbevis/
    - /guides/ebevis
    - /utviklingsguider/data.altinn.no/ebevis
---

<script>
    window.location.href = 'https://docs.data.altinn.no'
</script>


## Innledning

data.altinn.no (DAN) gjør det enklere å komme i gang med datadeling både for datakilder og konsumenter. Gjennom et enkelt, generisk API kan ulike _datasett_ utveksles på en måte som sikrer konfedensialitet, integretitet og tilgjengelighet - selv for datakilder som mangler kapabilitetene som kreves for å kunne dele data med mange konsumenter.

Gjennom å sikre tilganger til ulike konsumentgrupper gjennom rike autorisasjonsregler, f.eks. ved bruk av [Altinns samtykkeløsning](/docs/guides/samtykke/), vil informasjonen kunne hentes direkte fra datakilden sikkert og effektivt. 

Løsningen er generisk og vil kunne brukes på ulike forretningsområder, med nye tilknyttede registre og nye brukergrupper.

<!-- TODO! Her skal det komme lenke til mer produktinformasjon på forretningsnivå -->

## Tjenester på data.altinn.no

All uthenting av datasett tilgjengeliggjort på data.altinn.no gjøres i kontekst av en _tjeneste_. Tjenestene forteller noe om hvilken sammenheng datauthentingen gjøres i, og regulerer bl.a. autorisasjon. Et eksempel på en slik tjeneste på data.altinn.no er eBevis, som forenkler kvalifisering av leverandører i forbindelse med offentlige anskaffelser. Ulike tjenester kan benytte de samme datasettene, men være underlagt andre regler for uthentingen av dataene. F.eks. vil det i noen _tjenestekontekster_ være nødvendig å innhente et samtykke, mens det i andre foreligger hjemmel til å kunne hente dataene direkte.

## Datakilder og datasett

Løsningen baseres på at en aktør kan sende forespørsler på én eller flere _datasett_ (tidligere kalt _beviskoder_). Datasettene er en informasjonspakke som kan inneholde ett eller flere felter med strukturert eller ustrukturert informasjon. Forespørsler inneholder 1) hvem som spør, 2) hvem forespørselen gjelder, og 3) hvilke datasett spørres det om.

## Sikring av data og tilgangskontroll

Løsningen er tilrettelagt for formidling også av ikke-åpne data og personopplysninger. Behandlingsgrunnlaget som kreves for å hente disse dataene oppstår gjennom at konsumenten har en hjemmel til å hente informasjonen, eller at det innhentes samtykke fra en bemyndiget representant for parten det innhentes opplysninger om. DAN tilbyr ulike mekanismer som gjør det mulig for konsumenten å dokumentere at behandlingsgrunnlag foreligger, f.eks. gjennom Altinns samtykkeløsning, gjennom et spesikt token fra Maskinporten, gjennom et strukturert verifiserbart vedlegg i forespørselen, gjennom å verfisere identiteten til den som utfører forespørselen - eller en kombinasjon av disse.

I de tilfellene hvor datakilder avgir personopplysninger eller andre data som er underlagt taushetsplikt eller andre restriksjoner, kreves det at Digitaliseringsdirektoratet inngår databehandleravtaler med de partene som har behandlingsansvar. 

## Bruk av samtykke

Datasettene som krever samtykke vil igangsette en samtykkeprosess i Altinn. I de tilfeller hvor det skal hentes ut informasjon om en juridisk person, må en representant fra virksomheten, med tilstrekkelig tilgangsnivå, logge seg inn i Altinn-portalen og aktivt samtykke til at dataene skal tilgjengeliggjøres. Varsel om samtykkeforespørsel sendes som en melding til den aktuelle innboksen i Altinn, og inneholder en lenke som lar representanten ta stilling til om samtykke skal gis eller ikke.

For å kunne se varsler om samtykkeforespørsler som sendes kreves det at representaten innehar Altinn-rollene "Begrenset signeringsrett" (innehas av bl.a. innehavere, daglig ledere og styreledere), eller er blitt delegert tilgang til tjenesten "Varsel om fullmaktsforespørsel" (tjenestekode 5615/1). Samme rollen gir tilgang til å besvare selve samtykkeforespørselen, men tjenestekodene som benyttes varierer.

* [Mer informasjon om samtykkeprosessen](/docs/utviklingsguider/data.altinn.no/samtykkeprosessen)
* [Rollekrav i Altinn for samtykketjenestene](/docs/utviklingsguider/data.altinn.no/rollekrav-i-altinn)

{{% children description="true" %}}