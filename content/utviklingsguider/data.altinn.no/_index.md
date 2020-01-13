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

data.altinn.no er en tjeneste som er laget for å kunne forenkle utveksling av data mellom private aktører, næringsliv og det offentlige. 

Formålet er å gjenbruke informasjon som det offentlige allerede er i besittelse av. 
Ved hjelp av Altinn-rettigheter, [Altinns samtykkeløsning](/docs/guides/samtykke/) eller ved hjelp av hjemmel, vil informasjonen kunne hentes direkte fra datakilden. 

Løsningen er generisk og vil kunne brukes på ulike forretningsområder, med nye tilknyttede registre og nye brukergrupper.


## Bestanddeler

- Generisk tjeneste; Lage datasett som kan hentes ned
- Aksesspunkt / Grensesnitt for tjenesteleverandører over PEPPOL for anskaffelsesområdet
- Brukergrensesnitt i Altinn: Holde oversikt over samtykker, se hvilke datasett som har blitt hentet inn av hvilken offentlig instans, og sjekke hvilke opplysninger som finnes om sin virksomhet 
- EHF (elektronisk handelsformat): Standardformat – for å sikre en sømløs digital informasjonsflyt mellom systemløsninger 
- Datakildeintegrasjoner


## Datakilder og beviskoder

Løsningen baseres på at en aktør kan sende forespørsler på én eller flere _beviskoder_. Beviskoder er en betegnelse for en informasjonspakke som kan inneholde ett eller flere felter med strukturert eller ustrukturert informasjon. Forespørsler inneholder 1) hvem som spør, 2) hvem forespørselen gjelder, og 3) hvilke beviskoder spørres det om.

Per i dag har løsningen to beviskilder, Brønnøysundregistrene og Skatteetaten, med følgende registre:

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

Roller fra Enhetsregisteret som har tilgang til å gi samtykke kan være bla. Daglig leder, Styrets leder og Innehaver. For å lese melding om samtykke og avgi samtykke er kravet "begrenset signeringsrett" eller enkeltrettighet på de to tjenestene (tjenestekoder er 5132/1 for meldingstjenesten og 5299/1 for samtykket).
Dersom det er definert at nøkkelrollene skal kunne delegere tilgang videre til andre i organisasjonen, kan den spesifikke rettigheten delegeres videre via Altinn. 
[Ved å trykke her](/docs/utviklingsguider/data.altinn.no/samtykkeprosessen) finner du skjermbilder for samtykkeprosessen.

