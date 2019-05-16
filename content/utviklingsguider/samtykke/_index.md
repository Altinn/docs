---
title: Samtykke
description: Samtykkeløsningen i Altinn gjør det mulig at sluttbruker kan samtykke til at data om dem kan deles mellom en datakilde (tjenesteeier) og en datakonsument (den som trenger data).
weight: 30
aliases:
- /guides/samtykke/
---

Samtykke betyr i denne sammenhengen at brukeren gir en tredjepart midlertidig innsynsrett på et spesifikt datasett
om brukeren som ligger lagret i tjenesteeiers database.

Bruker vil kunne se hva de samtykker til å dele, hvem de deler data med, hvor lenge, og innenfor hvilken kontekst dataene skal brukes.

## Om samtykkeløsningen
Gjennom samtykkeløsningen i Altinn kan brukeren gi samtykke til at en tredjepart, en datakonsument, får midlertidig innsynsrett på et spesifikt sett
med opplysninger om brukeren. Dette kan for eksempel være
[ligningsdata fra Skatteetaten](http://www.skatteetaten.no/no/Om-skatteetaten/Presse/Nyhetsrommet/Pressemeldinger/pressemeldinger-2017/enklere-a-soke-boliglan/).
Med brukerens samtykke vil datakonsumenten bli tildelt en tidsbegrenset lese-rettighet for en eller flere
definerte ressurser representert ved tjenester i Altinn.

{{< vimeo 230421728 >}}

Samtykkeløsningen er etablert slik at datakilde (tjenesteier) har stor fleksibiltet i hvordan data skal tilbys til datakonsument.
Data kan gå via Altinn eller utenom Altinn slik at data kan tilbys via forskjellige formater og grensesnitt.
Felles for flytene er at sluttbruker blir presentert samtykkesiden i Altinn hvor sluttbruker kan velge å samtykke til tilgangen.

Her beskrives bruk av samtykkeløsningen med dataflyt direkte mellom datakilde og datakonsument med bruk av
self-contained [OAuth 2.0](https://oauth.net/2/) token utstedt av Altinn.
Tokenet, som blir signert med Altinns sertifikat, inneholder all informasjon knyttet til de delegerte rettighetene og
benyttes av datakonsument mot datakilde slik at datakilde kan verifisere  at innholdet er pålitelig.


## Målgruppe
Målgruppen for denne dokumentasjonen er datakilder og datakonsumenter som skal ta i bruk samtykkeløsningen hvor selve dataflyten skal gå direkte
mellom partene og hvor Altinn benyttes til tilgangskontroll.

## Bruk av "Self-contained OAuth 2.0 token"
Self-contained OAuth-token betyr at tokenet i seg selv inneholder all informasjon om rettigheten(e)
som er blitt delegertfra sluttbruker til datakonsumenten.

Figuren under viser prosessen med bruk av self-contained OAuth token i et lånesøknads case hvor en bank er datakonsumenten og Skatteetaten er datakilden:  

{{<figure src="prosess.png" title="Prosess" >}}

### Steg i prosessen

 1. Lånesøker går inn på bankens nettside for å søke om lån.
 2. Lånesøker bekrefter i søknadsprosessen at han ønsker å gi banken samtykke til å innhente ligningsopplysninger og [blir sendt til Altinn](datakonsument/be-om-samtykke/) for å gi samtykke.
 3. Lånesøker [logger inn](sluttbruker/innlogging/) i Altinn og [gir samtykke](sluttbruker/samtykkesiden). Altinn registrerer samtykket og delegerer rettighet.
 4. Rettighetsdelegering er utført og [det sendes en autorisasjonskode tilbake](datakonsument/be-om-samtykke/#autorisasjonskode).
 5. Lånesøker sendes tilbake til siden som er angitt av banken i redirect-Url. I Url sendes autorisasjonskoden samt en status som forteller om samtykke ble gitt.
 6. Autorisasjonskoden benyttes av banken mot Altinn for å [få tak i Altinn-signert self-contained OAuth token](datakonsument/hente-token/).
 7. Altinn sender [signert token](datakilde/bruk-av-token/#bruk-av-self-contained-oauth-token) til banken.
 8. Banken [benytter signert token](datakonsument/hente-token/#hente-data-fra-datakilden-ved-hjelp-av-altinn-signert-token) mot datakilden (f.eks. Skatteetaten).
 9. [Tokenet verifiseres](datakilde/bruk-av-token/#verifisere-jwt-token-signatur) av Skatteetaten for å sjekke at innhold stemmer med ønsket utført operasjon og data returneres til banken.

## Detaljerte guider
{{% children description="true" %}}
