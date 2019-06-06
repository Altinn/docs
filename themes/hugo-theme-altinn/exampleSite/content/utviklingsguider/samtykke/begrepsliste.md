---
title: Begrepsliste
description: Begrepsliste samtykke
weight: 700
---


 Begrep                                    | Forklaring                                                                                                   
 ----------------------------------------- | ------------------------------------------------------------------------------------------------------------
 Altinn autorisering                       | <ul><li>Verifisere at man har lov til å be om samtykke på en gitt tjeneste <li>Opprette og vedlikeholde nødvendige autorisasjonstilganger <li>Videresende sluttbruker til datakonsument <li>Svare på autorisasjonsforespørsler </ul>
 APIkey                                    | Application programming interface key <ul><li>en unik identifikator som det er knyttet tilgangsrettigheter til <li>knyttes til datakonsument sitt organisasjonsnummer <li>benyttes av datakonsument i tokenforespørsler mot Altinn </ul>                                                                                                                
 Authorization code/ Autorisasjonskode     | Kode som brukes av datakonsumenten til å få tak i Oauth token. Identifiserer et spesifikt samtykke
 CoveredBy                                 | Mottaker av samtykket – Dersom dette er en person kreves også etternavn på person. (CoveredByName)
 Datakilde                                 | <ul><li>Enhet som teknisk har data for bruker eller organisasjon <li>Verifisere mot autorisasjon om datakonsument har nødvendige tilganger </ul>
 Datakonsument                             | <ul><li>Part som ønsker tilgang til data <li>Ansvaret for å sende sluttbruker til Altinn for delegering av rettigheter til tjenestene <li>Ansvarlig for å be om data fra datakilde </ul>                             
 DelegationContext                         | Beskrivelse fra datakonsument på hva som er formålet med samtykket.
 LanguageCode                              | Angir hvilket språk sluttbruker skal få opp samtykkesiden på. Kan velge mellom engelsk (`en`), bokmål (`nb-NO`) og nynorsk (`nn-NO`)
 Metadata                                  | For å gi ekstra metadata til samtykketeksten kan det defineres en eller flere samtykkeparameter som generelt er valgfri men kan påtvinges av utformingen av samtykketeksten som er definert av datakilde (eks. `4629_2_inntektsaar=2016`)
 Oauth token                               | OAuth er en åpen standard for autorisasjon, ofte brukt som en måte for Internett-brukere å logge på tredjeparts nettsteder ved hjelp av sine Microsoft, Google , Facebook eller Twitter-kontoer uten å oppgi passordet sitt.
 OfferedBy                                 | Hvem som gir samtykket
 RedirectUrl                               | Hvor bruker blir sendt når delegering er gjennomført
 Resources                                 | Tjenestekode og tjenesteutgavekode på tjenesten som datakilde har definert som samtykketjeneste. Kan også være flere tjenester dersom det skal samtykkes til å dele data fra flere datasett hos en eller flere datakilder.
 ResponseType                              | Vil alltid være `code`. Angir at man skal ha en autorisasjonskode i retur som skal benyttes for å hente token
 ServiceCodes                              | Representerer tjenestekodene for tjenesten(e) som er opprettet av datakilde
 Sluttbruker                               | Den som gir samtykke til utlevering av sine data eller en organisasjon sine data
 Tjenesteierstyrt rettighetsregister       | Tjenesteeier/datakilde kan kreve at tjenesten skal benytte Tjenestestyrt register: <br>Benyttes for å kontrollere <ul><li>Hvem som kan spør om tilgang til data gjennom deres samtykketjenester <li>Hvilket domene sluttbruker skal bli sendt videre til etter å ha gitt/ikke gitt samtykke </ul>
 ValidToDate                               | Gyldighetsperiode for samtykket