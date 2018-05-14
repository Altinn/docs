---
title: Dokumentasjonsbevis
description: Veiledning for bruk av Nasjonal tjeneste for dokumentasjonsbevis - også kalt NADOBE
weight: 100
---

{{% notice info %}}
Dette er levende dokumentasjon (under arbeid) for NADOBE - Nasjonal Tjeneste for Dokumentasjonsbevis
{{% /notice %}}


## Innledning
NADOBE legger til rettet for at offentlige innkjøpere skal kunne få sanntids tilgang til kvalifikasjonsbevis for norske leverandører både før og etter kontraktsinngåelse. Ved hjelp av samtykkeløsningen i Altinn, samt en ny hjemmelskomponent, vil løsningen også kunne høste og avgi ikke-åpne data, f.eks. skatteattest. Løsningen vil tilby to grensesnitt - det ene eMeldings-basert via et PEPPOL aksesspunkt, samt et eOppslags-basert grensesnitt implementert som REST over HTTP.

Tjenesten etableres i Azure, og integrasjon mot eksisterende Altinn-funksjonalitet løses ved hjelp av eksisterende WCF/REST-APIer. I første omgang er det snakk om initiering og sjekk av samtykke, samt logging av samtykkebruk. På sikt vil det kunne bli aktuelt med ytterligere kall mot autorisasjons-komponentet, men dette er ikke i scope for løsningen per i dag.

## Beviskilder og beviskoder
Forespørsler om bevisinformasjon inneholder 1) hvem som spør 2) hvem forespørselen gjelder og 3) hvilke(n) beviskoder spørres det om.
Det er ikke anledning til å spørre på vegne av andre - det må være match mellom oppgitt virksomhetssertifiat og den som er oppgitt som spørrende part. Ett unntak finnes imidlertid; når forespørsler kommer inn via PEPPOL-kanalen er det mellomvaren som spør med et pre-autorisert virksomhetssertifikat. Via PEPPOL-kanalen skal forespørsler og svar sendes i formatene [EHF Get Evidence Request og EHF Get Evidence Response](https://github.com/difi/vefa-ehf-getevidence).

Beviskilder ("evidence sources" eller bare ES) implementeres som plugins tii NADOBE Core som kan legges til og fjernes ved behov uten redeploy. Hver ES eksponerer en eller flere **beviskoder**. Beviskodene er definert med en tilgangsmetode, samt ett eller flere felter som beskriver hvilke data beviskoden representerer. Dette er nøkkel/verdi-par (NVP) samt metadata som beskriver verdi-typen (f.eks. boolean, tall, streng, eller en binær blob som PDF). For beviskoder som krever samtykke, kreves også en Altinn tjenestekode og utgave til en lenketjeneste som er satt opp med samtykke.

ES-ene sørger for all kommunikasjon med de avgivende registerene, og besørger for at feltene for hver beviskode som etterspørres blir populert.

Konsumenter av NADOBE trenger ikke forholde seg til beviskildene, men vil via en metadata-tjeneste kunne hente ut alle registrerte beviskoder og hvordan de kan etterspørres.

For mer teknisk informasjon om hvordan ES-er implementeres, [se her](beviskoder/).

## Samtykke
Noen beviskoder vil referere bevistyper som krever samtykke fra leverandøren. Dette vil i første omgang dreie seg om skatteopplysninger, men vil på sikt kunne være beviser hentet fra f.eks. bøte- og strafferegisteret. Hvis det kommer en forespørsel på en slik beviskode, vil det ikke kunne utføres oppslag på dette før et aktivt samtykke foreligger. Oppdragsgiver kan oppgi at man ønsker å initiere en samtykkeforespørsel, og dette vil da instansiere en meldingstjeneste med varsling/re-varsling i Altinn, som inneholder samtykkelenke, samt en oversikt over hvilke beviskoderdet bes om, hvem som spør og hvor lenge samtykket skal vare. Det vil da være én samtykkeforespørsel per akkreditering, som da vil kunne spenne over en eller flere av de beviskodene det spørres om.

Påfølgende oppslag med GET /evidence/<akkreditering> vil da returnere en datastruktur som indikerer om beviskodene som krever samtykke har fått innvilget dét, eventuelt om det er blitt slettet eller utløpt. Det vil ikke lagres/caches informasjon om hvorvidt samtykke foreligger - dette må spørres hver gang i Altinn-APIet.

### Hjemmel / ESPD
Det legges opp til at man i enkelte sammenhenger kan i det initielle kallet legge ved dokumentasjon som indikerer at leverandøren gir samtykke og/eller at det foreligger hjemmel for å uthente dataene som uthentes.
ESPD er det tiltenkte dokumentet for dette, som er den elektroniske egenerklæringen som leverandøren allerede i dag må kunne levere til oppdragsgivere.
**Det finnes imidlertid ingen mekaniskmer i ESPD (XML-SIG el.l.) som lar oss foreta en verifisering om ESPD faktisk kommer uforandret fra leverandøren og ikke manipulert av oppdragsgiver.**
Det legges likevel opp til en generisk mekanisme for å kunne oppgi samtykke/hjemmelsgrunnlag slik at beviskoder som ikke er åpne allikevel vil kunne hentes umiddelbart uten at det gjennomføres en samtykkeprosess. Denne må gjøres generisk og parameterstyrt, slik at ulike implementasjoner for verifisering av dette grunnlaget kan utvikles utfra type.

### Samtykkelogging
Leverandøren skal når som helst kunne logge inn i portalen og se en oversikt over hvilke samtykker som foreligger, samt en logg som viser oversikt over bruk. Dette er eksisterende funksjonalitet i Altinn (men som er gjenstand for begrensninger per i dag, se neste delkapittell).

Alle forespørsler som medfører at samtykke-baserte data blir utlevert skal medføre innslag i samtykkeloggen til den avgivende virksomheten.

Logging skal foregå fra Nadobe-tjenesten til REST-APIet i Altinn, ikke ulikt hvordan bankene benytter "loguse" APIet i dag. **Ingen logging av bruk eller bevisdata skal logges i Azure/Nadobe.**

### Begrensninger i Altinn samtykkefunksjonaltet
Gjennomføring av en samtykkeprosess forutsetter at det er registrert en API-key i Altinn knyttet til en organisasjon som er den samme som samtykket er innvilget til. Dette innebærer at vi i dag ikke kan initiere en samtykkeprosess på vegne av en annen organisasjon - samtykket som innvilges vil derfor være til Brønnøysundregistrene. Det oppgis imidlertid i teksten i samtykke-dialogen hvilken offentlig instans vi spør på vegne av.

Dette gjelder også forespørsler til f.eks. Skatteetaten. I samtykkebasert lånesøknad gjøres dette av bankene selv med sitt eget virksomhetssertifikat, mens i NADOBE er det vi selv (altså Brønnøysund) som gjør denne forespørselen.