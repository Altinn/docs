### 1. Innledning

Gjennom samtykkeløsningen i Altinn kan brukeren gi samtykke til at en tredjepart, en datakonsument, får midlertidig innsynsrett på et spesifikt sett med opplysninger om brukeren som tidligere er innhentet. Dette kan for eksempel være ligningsdata fra Skatteetaten. Med brukerens samtykke vil datakonsumenten automatisk bli tildelt en tidsbegrenset lese-rettighet for en eller flere definerte ressurser representert ved tjenester i Altinn. Det finnes flere alternative løsninger til hvordan samtykkedelegeringer kan gjennomføres. Her beskrives bruk av samtykkeløsningen med dataflyt direkte mellom datakilde og datakonsument med bruk av self-contained OAuth 2.0 token utstedt av Altinn. Tokenet som blir signert med Altinns sertifikat inneholder all informasjon knyttet til de delegerte rettighetene og benyttes av datakonsument mot datakilde for at datakilde kan verifisere  at innholdet er pålitelig.

### 1.1 Målgruppe

Målgruppen for denne dokumentasjonen er datakilder og datakonsumenter som skal ta i bruk samtykkeløsningen hvor selve dataflyten skal gå direkte mellom partene og hvor Altinn benyttes til tilgangskontroll.

### 1.2 Dokumentasjonens oppbygging

* Kapittel 2 gir en overordnet beskrivelse av prosessen ved bruk av samtykkeløsningen og vil være nyttig både for datakilde og datakonsument 

* Kapittel 3 gir en beskrivelse av hvordan samtykkeløsningen oppleves for den som gir samtykke

* Kapittel 4 er kun for datakilde/tjenesteeier og beskriver hva de må utføre på sin side

* Kapittel 5 er kun for datakonsument og bekriver hva de må utføre på sin side

* Kapittel 6 inneholder en beskrivelse av oppbyggingen og innholdet i token og vil være av størst interesse for datakilde  


### 2. Beskrivelse av samtykketjeneste med ”Self-contained OAuth 2.0 token”

Self-contained OAuth-token betyr at tokenet i seg selv inneholder all informasjon om rettigheten(e) som er blitt delegert fra sluttbruker til datakonsumenten. Figuren under viser prosessen med bruk av self-contained OAuth token i et lånesøknads case hvor en bank er datakonsumenten og skatteetaten er datakilden:


