---
title: eBevis
description: eBevis er en tjeneste som er laget for å kunne forenkle utveksling av informasjon mellom leverandører og det offentlige. Formålet er å gjenbruke informasjon som det offentlige allerede er i besittelse av. 
weight: 100
aliases:
    - /guides/nadobe/
    - /guides/dokumentasjonsbevis/
    - /guides/ebevis/
---


Ved hjelp av [samtykkeløsningen](/docs/guides/samtykke/) i Altinn eller via hjemmel, vil informasjonen kunne hentes direkte fra datakilden.

Tjenesten er utviklet som en skytjeneste og styrer oppdragsgiveres tilgang til offentlige registre. Det produseres en _bevispakke_, som er en sammenstilling av informasjon fra datakildene. Denne bevispakken sendes videre til oppdragsgivers fagsystem.

Tjenesten er generisk og vil kunne brukes på ulike forretningsområder, med nye tilknyttede registre og nye brukergrupper.
eBevis er en dataflytkomponent i Altinns "Platform of platforms"-konsept, og er dermed en løsning som ikke kjører på Altinn-plattformen.


## eBevisprodukter

- Nasjonal tjeneste for dokumentasjonsbevis: Generisk tjeneste; Lager eBevis-pakken som sendes til oppdragsgivers system
- Aksesspunkt / Grensesnitt for tjenesteleverandører
- Brukergrensesnitt i Altinn for leverandører: Holde oversikt over samtykker, se hvilke bevis som har blitt hentet inn av hvilken offentlig instans, og sjekke hvilke opplysninger som finnes om sin virksomhet
- EHF (elektronisk handelsformat) for dokumentasjonsbevis: Standardformat – for å sikre en sømløs digital informasjonsflyt mellom systemløsninger
- Selve beviset: Data innsamlet fra de ulike datakildene

{{< figure src="https://www.lucidchart.com/publicSegments/view/f3ce06b1-22a8-4b29-9af4-13dbeb258c83/image.png" title="eBevis Arkitektur" width="700" >}}


## Beviskilder og beviskoder

Løsningen baseres på at en oppdragsgiver kan sende forespørsler på én eller flere _beviskoder_. Beviskoder er en betegnelse for en informasjonspakke som kan inneholde ett eller flere felter med strukturert eller ustrukturert informasjon. Forespørsler inneholder 1) hvem som spør, 2) hvem forespørselen gjelder, og 3) hvilke beviskoder spørres det om.

Per april 2019 har løsningen to beviskilder, Brønnøysundregistrene og Skatteetaten, med følgende registre:
- Enhetsregisteret/foretaksregisteret (Brønnøysundregistrene)
- Konkursregisteret (Brønnøysundregistrene)
- Regnskapsregisteret (Brønnøysundregistrene)
- Skatt og merverdiavgift (Skatteetaten)
Her er det definerte datasett, med innhold som eksempelvis firmaattest, årsregnskap, restanser på skatt og merverdiavgift, og informasjon om eventuell konkurs. Flere datakilder er planlagt i tiden fremover.


## Hjemmel og samtykke

Det oppstår ofte juridiske spørsmål vedrørende innhenting av åpne og ikke-åpne data fra ulike datakilder. Ved hjelp av hjemmel eller Altinns samtykkeløsning vil løsningen også kunne høste og avgi ikke-åpne data.  

Beviskoder kan representere informasjon fra èn eller flere offentlige registre, som kan ha ulik grad av tilgjengelighet. Noen beviskoder kan være utelukkende hjemmelsbasert, og hjemmelsgrunnlag må da sannsynliggjøres. Det gjøres gjennom et vedlegg i forespørselen eller utfra identiteten til den som utfører forespørselen.
Hjemmelsgrunnlag vil for enkelte beviskoder være ulikt før og etter kontraktsinngåelse, så enkelte beviskoder vil kunne innhentes med hjemmel “pre-award”, men kreve samtykke for “post-award”.

Andre beviskoder vil kunne kreve et samtykke. eBevis vil da igangsette en samtykkeprosess i Altinn. En representant fra virksomheten, med tilstrekkelig tilgangsnivå, må logge seg inn i Altinn-portalen og innvilge et aktivt samtykke. Tilgangsnivået styres ut fra roller fra Enhetsregisteret, og eventuelt delegerte roller i Altinn.


## Autorisasjon

Altinns autorisasjonsløsning benyttes for tilgangskontroll. De oppdragsgiverne med tilstrekkelig tilgangsnivå får tilgang på løsningen via sitt virksomhetssertifikat og tildelte API-nøkler. Oppdragsgiver sender en autorisasjonsforespørsel til REST-APIet, med informasjon om hvilken virksomhet man spør om og hvilke beviskoder det gjelder.
Dersom eksempelvis organisasjonsnummer x, y og z skal ha tilgang, vil autorisasjonsløsningen sjekke om virksomheten som nå forespør bruk av løsningen har rettighet til å utføre den spesifiserte operasjonen.

Altinns autorisasjonsløsning benyttes også mot leverandørene. Dersom samtykke trengs og en forespørsel er sendt til virksomhetens innboks, vil kun personer med tilstrekkelig tilgangsnivå ha mulighet til å gi samtykke på vegne av virksomheten.
