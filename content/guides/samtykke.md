### 1. Innledning

Gjennom samtykkeløsningen i Altinn kan brukeren gi samtykke til at en tredjepart, en datakonsument, får midlertidig innsynsrett på et spesifikt sett med opplysninger om brukeren som tidligere er innhentet. Dette kan for eksempel være ligningsdata fra Skatteetaten. Med brukerens samtykke vil datakonsumenten automatisk bli tildelt en tidsbegrenset lese-rettighet for en eller flere definerte ressurser representert ved tjenester i Altinn. Det finnes flere alternative løsninger til hvordan samtykkedelegeringer kan gjennomføres. Her beskrives bruk av samtykkeløsningen med dataflyt direkte mellom datakilde og datakonsument med bruk av self-contained OAuth 2.0 token utstedt av Altinn. Tokenet som blir signert med Altinns sertifikat inneholder all informasjon knyttet til de delegerte rettighetene og benyttes av datakonsument mot datakilde for at datakilde kan verifisere  at innholdet er pålitelig.


#### 1.1 Målgruppe

Målgruppen for denne dokumentasjonen er datakilder og datakonsumenter som skal ta i bruk samtykkeløsningen hvor selve dataflyten skal gå direkte mellom partene og hvor Altinn benyttes til tilgangskontroll.


#### 1.2 Dokumentasjonens oppbygging

* Kapittel 2 gir en overordnet beskrivelse av prosessen ved bruk av samtykkeløsningen og vil være nyttig både for datakilde og datakonsument 

* Kapittel 3 gir en beskrivelse av hvordan samtykkeløsningen oppleves for den som gir samtykke

* Kapittel 4 er kun for datakilde/tjenesteeier og beskriver hva de må utføre på sin side

* Kapittel 5 er kun for datakonsument og bekriver hva de må utføre på sin side

* Kapittel 6 inneholder en beskrivelse av oppbyggingen og innholdet i token og vil være av størst interesse for datakilde  



### 2. Beskrivelse av samtykketjeneste med ”Self-contained OAuth 2.0 token”

Self-contained OAuth-token betyr at tokenet i seg selv inneholder all informasjon om rettigheten(e) som er blitt delegert fra sluttbruker til datakonsumenten. Figuren under viser prosessen med bruk av self-contained OAuth token i et lånesøknads case hvor en bank er datakonsumenten og skatteetaten er datakilden:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/Figur1.jpg "Figur 1")
Figur 1

|Steg|Beskrivelse|
|--------|--------|
| 1. | Sluttbruker går inn på bankens nettside for å søke om lån.|
| 2. | Låntaker bekrefter i søknadsprosessen at han ønsker å gi banken samtykke til å innhente ligningsopplysninger og blir sendt til Altinn for å gi samtykke.|
| 3. | Sluttbruker logger inn i Altinn og gir samtykke og rettighetsdelegeringen blir utført.|
| 4. | Når rettighetsdelegering er utført sendes det en autorisasjonskode tilbake.|
| 5. | Sluttbruker sendes tilbake til siden som er angitt av banken i redirect-Url. I Url sendes autorisasjonskoden samt en status som forteller om samtykke ble gitt.|
| 6. | Autorisasjonskoden benyttes av banken mot Altinn for å få tak i Altinn-signert self-contained OAuth token.| 
| 7. | Altinn sender signert token til banken.| 
|8. | Banken benytter signert token mot Skatteetaten.|                                                                                                              
|9. | Tokenet verifiseres av Skatteetaten for å sjekke at innhold stemmer med ønsket utført operasjon og data returneres til banken.|    

### 3. Samtykkefunksjonaliteten for sluttbruker


I vårt eksempel med et lånesøknadscase så vil en lånesøker typisk gå til bankens hjemmeside for å søke om lån. I noen tilfeller må man logge seg inn i nettbanken først, i andre tilfeller trenger man ikke det. Underveis i søknaden blir man spurt om å gi samtykke til at ligningsopplysninger kan innhentes. Dersom man godtar dette blir man sendt til samtykkesiden i Altinn. For å kunne gi et samtykke i Altinn må brukeren identifisere seg for det offentlige ved å logge inn via ID-Porten. Innen føderert BankID mellom bankene og ID-Porten er mulig, må brukere potensielt logge inn to ganger. 


![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/Figur2.jpg "Figur 2")
Figur 2

#### 3.2 Samtykkesiden
Etter innlogging vil sluttbrukeren bli presentert for en egen samtykkeside.  Figurene under viser et eksempel på hvordan en samtykkeside kan se ut i et lånesøknadscase:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/Figur3.jpg "Figur 3")
Figur 3

Når sluttbruker har gitt samtykke blir rettighetsdelegeringen til datakonsumenten utført og brukeren blir sendt tilbake til siden som er angitt av datakonsument i redirect-URL. Sluttbruker kan også velge å ikke gi samtykke.

#### 3.3 Oversikt over midlertidige innsyn

Sluttbruker kan i Altinn gå inn på siden «Profil, roller og rettigheter» for å få oversikt over hvem man har samtykket til å gi midlertidige innsyn til. Figuren under viser hvordan dette presenteres for bruker:

![](https://github.com/elwal/docs/blob/master/content/guides/samtykkeBilder/Figur4.jpg "Figur 4")
Figur 4
