---
title: Komme i gang med eBevis
linktitle: eBevis-tjenesten
toc: true
weight: 200
---

## Hvem kan bruke eBevis?

eBevis er tilgjengelig for alle offentlige innkjøpere og er i seg selv gratis i bruk, men eBevis har ikke noe eget brukergrensesnitt. Det vil si at for å bruke eBevis så må du ha en systemløsning som for eksempel et KGV (konkurransegjennomføringsverktøy, kontraktsoppfølgingsverktøy, kvalifikasjonsverktøy eller lignende) som har implementert funksjonalitet for eBevis. Etter innføring av nytt anskaffelsesregelverk i 2017 er det krav om bruk av systemløsninger for elektronisk tilbudsinnlevering. Offentlige innkjøpere bør ta kontakt med sin systemleverandør for å få mer informasjon om bruk av eBevis.

[Les mer om hvilke opplysninger som kan hentes via eBevis og hvordan disse skal vurderes](https://www.anskaffelser.no/anskaffelsesprosessen/anskaffelsesprosessen-steg-steg/konkurransegjennomforing/velge-tilbud-og-innga-avtale/vurdere-kvalifikasjoner/ebevis)
Denne veiledningen er hovedsaklig for leverandører av systemløsninger som vurderer eller planlegger implementasjon av eBevis i sin systemløsning.

## To kanaler

eBevis er tilgjengelig i to kanaler som muliggjør både et synkront (oppslagsbasert) og asynkront (meldingsbasert) mønster. Dette er implementert i henholdsvis et HTTP REST-grensesnitt og via den europeiske eDelivery-infrastrukturen OpenPEPPOL.

Avhengig av valgt kommunikasjonskanal kreves det enten et [virksomhetssertifikat](../bruke-rest-api/#autentisering-og-autorisasjon) eller en [tilkobling til PEPPOL-nettverket](../bruke-gjennom-peppol). Sistnevnte er som regel en del av tjenesten leverandører av KGV-er (konkurransegjennomføringsverktøy) og lignende tilbyr.

Foruten de iboende forskjellene mellom meldingsbaserte og oppslagsbaserte mønstre, er det ingen funksjonelle forskjeller mellom kanalene - alle beviskoder og dataene de representerer vil være tilgjengelige i begge kanaler. (PEPPOL-grensenittet benytter internt det samme REST-grensenittet gjennom en mellomvare).

* [Les mer om bruk av PEPPOL](../bruke-gjennom-peppol)
* [Les mer om bruk av REST-API](../bruke-rest-api)

## Hva passer for meg?

HTTP REST-grensesnittet er å regne som noe mer "low-level" og krever at konsumentene selv implementerer feilhåndteringslogikk og gjenforsøksmekanismer. REST-grensesnittet krever også at konsumenten autentiserer seg med et virksomhetssertifikat, som kan skaffes via tredjepartsleverandører som Buypass og Commfides. Fordelen er at man ikke behøver å ha medlemsskap i PEPPOL-samarbeidet eller være tilknyttet et PEPPOL aksesspunkt, og at HTTP-klienter er bredt tilgjengelig på ulike plattformer og teknologier.

For konsumenter med eksisterende verktøy som er tilsluttet PEPPOL-nettverket krever kommunikasjon med eBevis ikke annet enn å bygge støtte for dokumentetformatet EHF Get Evidence, og er således en potensielt raskere måte å komme i gang på.

## Miljøer

Begge kanalene har et test-miljø kalt "staging" som kan benyttes i forbindelse med utvikling og test av implementasjoner. Kun et fåtall beviskoder er implementert på test-miljøet, og disse benytter alle fiktive data. Samtykkeløsningen er integrert mot Altinns TT02 test-miljø.

* [Les mer om testing](../testing)
