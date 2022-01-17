---
title: "Sending av dokumenter: Formidlingstjenesten"
linktitle: Sending av dokumenter
description: Produktet kan brukes til å sende dokumenter eller store datamengder mellom offentlige virksomheter eller mellom offentlige og private virksomheter.
weight: 60
---

For å utvikle løsningen trenger du både å tilrettelegge egne systemer for sending av data, og utvikle selve tjenesten i Altinns tjenesteutviklingsløsning.
Tidlig i prosessen vil vi råde deg til å tenke på hvordan du skal sende ut dokumentene eller dataene til brukerne.
Du kan velge mellom å sende fra maskin til maskin eller fra maskin til portal, for eksempel ved at brukerne mottar dokumentene i innboksen på altinn.no.

Slik går du frem:

1. **Definere brukerbehov**
Tenk nøye gjennom hele prosessen fra et brukerperspektiv. Hvilke data eller dokumenter skal du sende til brukerne og hvordan skal de motta disse?
Lag gjerne en skisse til kommunikasjon med brukeren og test skissen på folk i målgruppen. God planlegging er nøkkelen til et godt resultat.
Sjekk Guide: [Hvordan jobbe brukerorientert?](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/hvordan-jobbe-brukerorientert/) for inspirasjon.
2. **Få tilgang til systemer**
Hvis du ikke har utviklet tjenester i Altinn før trenger du tilgang til våre løsninger. For å sende varsler trenger du tilgang for å benytte Altinn sine Web Servicer.
I [Kom i gang med utvikling](/docs/kom-i-gang-med-utvikling/) kan du lese om hvordan du får tilganger.
3. **Registrere virksomhetssertifikat**
Du trenger et [virksomhetssertifikat](https://www.altinn.no/hjelp/profil/avanserte-innstillinger/hva-er-virksomhetssertifikat/) for å ta i bruk Sending av dokumenter.
Hvis du ikke allerede har dette kan du bestille det via [Commfides](https://www.commfides.com/commfides-virksomhetssertifikat/)
eller [Buypass](https://www.buypass.no/produkter/virksomhetssertifikat-esegl).
4. **Tilrettelegge egne systemer for sending og mottak av data**
For å kunne sende og motta data trenger du å legge til rette for dette i de interne systemene.
Vi anbefaler alle nye bruker å benytte [REST](/api/rest/formidling/) for integrasjon mot Altinn. 
(Det finnes også et [SOAP](/docs/api/tjenesteeiere/soap/) grensesnitt med tjenesten [BrokerService](/docs/api/soap/endepunkter-oversikt/#brokerservice) som brukes av flere eksisternede brukere. [Batch](/docs/api/tjenesteeiere/batch/) er også mulig hvis det er snakk om store datamengder.)
5. **Oppsett av tjenesten i Altinn sin tjenesteutviklingsløsning**
Tjenesten må settes opp i Altinn sin tjenesteutviklingsløsning som en Formidlingstjeneste. Les mer om dette i [brukerveiledning for TUL](/docs/tul/).
Hvis du skal sende data/dokumenter fra maskin til maskin tar du i bruk et ferdig oppsatt grensesnitt i Altinn for oversendelse.
Hvis du ønsker at brukeren skal få tilgang til dokumentene via innboksen sin på altinn.no
må du også sette opp en meldingstjeneste for å kunne sende lenken i en melding til brukerne.
6. **Teste tjenestene**
Du tester tjenestene og grensesnitt i Altinn sitt testmiljø. Det benyttes fiktive testpersoner og organisasjoner i våre testmiljø.
7. **Produksjonssette tjenestene**
Når tjenester og tilhørende grensesnitt er testet ende til ende er dere klare for produksjonssetting.
Grensesnitt som er testet i testmiljø må reetableres i Altinn sitt produksjonsmiljø mot produksjonsmiljøet til ditt system.
Så må tjenestene settes i produksjon. Det gjør du ved å lage en bestilling til Altinn sin selvbetjeningsløsning.
Denne får du innlogging til i oppstartsmøtet med Altinn. Som regel kan tjenestene produksjonssettes samme dag som bestillingen sendes.
