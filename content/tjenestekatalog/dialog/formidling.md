---
title: Formidling av data
description: Formidlingstjenesten er en maskin-til-maskin formidling av store datamengder mellom ulike offentlige og private virksomheter.
weight: 100
---

Formidlingstjenesten er en maskin-til-maskin formidling av store datamengder mellom ulike offentlige og private virksomheter.
Det blir ikke foretatt noe sjekk på innhold i dataene, men Altinn garanterer levering og sporbarhet for transport av data.


### Fordeler og muligheter
Formidlingstjenesten muliggjør trygg og sikker maskin-til-maskin formidling av datamengder på inntil 1 GB mellom ulike offentlige og private virksomheter.
Informasjon hentes fra virksomhetenes saksbehandlingsløsninger/registre og distribueres til en eller flere offentlige eller private mottakere gjennom Altinn.
Tjenestetypen kan også benyttes for større overføringer fra private aktører i tilfeller hvor det ikke er behov for funksjonaliteten i innrapporteringstjenestene.
Formidlingstjenesten har også en kvitteringsfunksjonalitet som gir kunden muligheten for å sende spørring om status for meldingen.

Bruk av en formidlingstjeneste styres av tjenesteeier selv gjennom tjenesteeierstyrt rettighetsregister.
Dette betyr at det er tjenesteeier selv som kan styre hvem som har rettighet til å benytte tjenesten.
Oppsett av formidlingstjeneste og administrasjon av brukere skal kunne gjøres på egen hånd av tjenesteeiere og brukere uten involvering fra AAS.

Formidlingstjenesten overføres fra avsender til mottaker, og tjenesteeiere benytter derfor ikke egne grensesnitt kun for tjenesteeiere for formidlingstjenesten,
men benytter i stedet de samme grensesnitt som er tilgjengelig for alle brukere av Altinn.

For å kunne ta i bruk formidlingstjenesten må tjenesteeier registrere et virksomhetssertifikat og påloggingen blir knyttet til organisasjonsnummer istedenfor fødselsnummer.

#### Fordeler
 - Håndterer stor datamengder
 - Sikker overføring
 - [Tjenesteeierstyrt rettighetsregister](https://altinnett.brreg.no/no/Tjenesteutvikling/Hvordan-utvikle-tjenester/Formidlingstjeneste/Tjenesteeierstyrt-rettighetsregister/)
 - Innloggingsmetode knyttet til organisasjonsnummer


### Funksjonalitet som tilbys
 - Kvittering
 - Virksomhetssertifikat


### Hvordan komme i gang
[Her kan du få informasjon om hvordan man kommer i gang med å lage en formidlingstjeneste.](https://altinnett.brreg.no/no/Tjenesteutvikling/Hvordan-utvikle-tjenester/Formidlingstjeneste/)

### Råd og tips
 - Før man starter med utforming av tjenester er det lurt å gjøre seg kjent med Altinn-plattformen og mulighetene som ligger der
 - For å få en god tjeneste kan det være hensiktsmessig å jobbe sammen med en eller flere kunder for at tjenestene skal dekke deres ønsker og behov
 - Sette av god til utforming av god kravspesifikasjon, sette opp tjenestefunksjonalitet, samt innhold i meldinger som skal formidles
 - Vær oppmerksom på at i tillegg til utvikling av tjenesten skal man ha på plass et mottakssystem og en integrasjon mellom tjenesteeier og Altinn. Erfaring viser at dette er mer tidkrevende enn man tror


### Kanaler
 - Web service

### Avhengigheter
Bruk av formidlingstjenester forutsetter bruk av Altinn autentisering og autorisasjon.

### Teknisk dokumentasjon
 - Implementasjonsguide for sluttbrukere
 - [Implementasjonsguide for tjenesteeier](/docs/guides/tjenesteeier/)