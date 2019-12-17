---
title: data.altinn.no
description: Beskrivelse av Altinns datadelingskomponent
weight: 100
toc: true
aliases: 
    - /guides/nadobe/
    - /guides/dokumentasjonsbevis/
    - /guides/ebevis
---


## Innledning

data.altinn.no er en tjeneste som er laget for å kunne forenkle utveksling av informasjon mellom private aktører og det offentlige. Formålet er å gjenbruke informasjon som det offentlige allerede er i besittelse av. Ved hjelp av [samtykkeløsningen](/docs/guides/samtykke/) i Altinn eller via hjemmel, vil informasjonen kunne hentes direkte fra datakilden. 

Tjenesten er generisk og vil kunne brukes på ulike forretningsområder, med nye tilknyttede registre og nye brukergrupper.

## Tjenester

- eBevis: Generisk tjeneste; Lager eBevis-pakken som sendes til oppdragsgivers system 
- Aksesspunkt / Grensesnitt for tjenesteleverandører
- Brukergrensesnitt i Altinn for leverandører: Holde oversikt over samtykker, se hvilke bevis som har blitt hentet inn av hvilken offentlig instans, og sjekke hvilke opplysninger som finnes om sin virksomhet 
- EHF (elektronisk handelsformat) for eBev: Standardformat – for å sikre en sømløs digital informasjonsflyt mellom systemløsninger 
- Data hentet fra de ulike datakildene 

{{< figure src="https://www.lucidchart.com/publicSegments/view/f3ce06b1-22a8-4b29-9af4-13dbeb258c83/image.png" title="eBevis Arkitektur" width="700" >}}


## Beviskilder og beviskoder

Løsningen baseres på at en aktør kan sende forespørsler på én eller flere _beviskoder_. Beviskoder er en betegnelse for en informasjonspakke som kan inneholde ett eller flere felter med strukturert eller ustrukturert informasjon. Forespørsler inneholder 1) hvem som spør, 2) hvem forespørselen gjelder, og 3) hvilke beviskoder spørres det om.

Per april 2019 har løsningen to beviskilder, Brønnøysundregistrene og Skatteetaten, med følgende registre:
- Enhetsregisteret/foretaksregisteret (Brønnøysundregistrene)
- Konkursregisteret (Brønnøysundregistrene)
- Regnskapsregisteret (Brønnøysundregistrene)
- Skatt og merverdiavgift (Skatteetaten)
Her er det definerte datasett, med innhold som eksempelvis firmaattest, årsregnskap, restanser på skatt og merverdiavgift, og informasjon om eventuell konkurs. Flere datakilder er planlagt i tiden fremover. 


## Autorisasjon

Det oppstår ofte juridiske spørsmål vedrørende innhenting av åpne og ikke-åpne data fra ulike datakilder. Ved hjelp av hjemmel eller Altinns samtykkeløsning vil løsningen også kunne høste og avgi ikke-åpne data.  

Beviskoder kan representere informasjon fra èn eller flere offentlige registre, som kan ha ulik grad av tilgjengelighet. Noen beviskoder kan være utelukkende hjemmelsbasert, og hjemmelsgrunnlag må da sannsynliggjøres. Det gjøres gjennom et vedlegg i forespørselen eller utfra identiteten til den som utfører forespørselen. 
Hjemmelsgrunnlag vil f.eks. for enkelte beviskoder være ulikt før og etter kontraktsinngåelse, så enkelte beviskoder vil kunne innhentes med hjemmel i ett tilfelle, men kreve samtykke i et annet.

Andre beviskoder vil kunne kreve et samtykke. data.altinn.no vil da igangsette en samtykkeprosess i Altinn. En representant fra virksomheten, med tilstrekkelig tilgangsnivå, må logge seg inn i Altinn-portalen og aktivt samtykke til at dataene skal tilgjengeliggjøres.
Tilgangsnivået styres ut fra roller fra Enhetsregisteret, og eventuelt delegerte roller i Altinn.

Roller fra Enhetsregisteret som har tilgang til å gi samtykke kan være bla. Daglig leder, Styrets leder, og Innehaver. For å lese melding om samtykke og avgi samtykke er kravet "begrenset signeringsrett" eller enkeltrettighet på de to tjenestene (tjenestekoder er 5132/1 for meldingstjenesten og 5299/1 for samtykket).
Dersom det er definert at nøkkelrollene skal kunne delegere tilgang videre til andre i organisasjonen, kan den spesifikke rettigheten delegeres videre via Altinn. 
[Ved å trykke her](/docs/utviklingsguider/data.altinn.no/samtykkeprosessen) finner du skjermbilder for samtykkeprosessen.

