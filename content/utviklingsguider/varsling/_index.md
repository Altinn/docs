---
title: Om Tjenesten
Linktitle: Varsling
description: Varsling er til for å minne brukerne på at det er kommet viktige ting de må se eller handle på. Når du som avsender skal varsle, tilrettelegger du dine systemer for å sende ut varsler og benytter en varslingsmal.
weight: 30
---

Varsel kan sendes ut i forbindelse med opprettelse av melding eller skjema i brukers innboks. Det kan også sendes som et frittstående varsel. 
[Her](/docs/api/tjenesteeiere/funksjonelle-scenario/#frittstående-varsel) kan du lese mer detaljert beskrivelse av tjenesten "frittstående varsel". 

[Slik går du frem](/docs/utviklingsguider/varsling/slik-utvikler-du/) for å utvikle varsling

## Hvordan ser et varsel ut?

Sluttbrukerne kan få varsel på SMS, e-post eller begge deler. Dette bestemmes av hva slags adresseinformasjon sluttbrukerne har registrert i sin profil i Altinn, men tjenesteeier har også mulighet til overstyre dette. I forbindelse med testning viser varselet tydelig hvilket testmiljø det kommer fra. 

{{% notice warning  %}}### Varselet bør inneholde: 
- beskrivelse av oppgaven, 
- konkret hva den gjelder, 
- hvem som er ansvarlig/kan løse oppgaven
- informer gjerne også om frist for oppgaven {{% /notice %}}

## Hva skal et varsel ikke inneholde? 
Phishing utgjør en stadig større trussel mot IT-sikkerhet. I retningslinjene fra myndighetene for å unngå svindel står følgende: *Vær obs på lenker i SMS som ber deg logge på med BankID. Banken din eller andre seriøse aktører sender aldri ut påloggingslenker til BankID i SMS.* 

Vær derfor spesielt oppmerksom på at varslinger som sendes ut via Altinns varslingstjeneste **IKKE skal inneholde lenke eller formuleringer som skal minne om en lenke,** f eks altinn.no eller minetat.no. I slike tilfeller vil "Altinns nettside», «våre nettsider» eller lignende være riktig formumeling å bruke. 

## Varslingsvindu for SMS

Vi sender ut SMS-varsler mellom 09:00 og 17:15 alle dager. De fleste tjenesteeierne har systemer som automatisk sender meldinger/skjema til Altinn. Dette skjer gjerne på kveldstid eller midt på natten, men vi holder altså igjen tilhørende SMS til neste morgen. E-post sendes ut hele døgnet.

## Hvilke adresser sendes varsel til?
Den som ønsker å sende ut varsel kan selv legge ved kontaktinformsjon for mottaker (epostadresse eller sms). I tillegg så benytter Altinn følgende register for å hente kontaktinformasjon hvis Tjenesteeier selv ikke sender med dette: 

***Kontakt og reservasjonsregisteret***
Altinn benytter registert epost eller mobilnummer som innbyger selv har registert. Kontaktinformasjon må være bekreftet i løpet av de siste 18 måneder for å benyttes. Hvis innbygger mangler kontaktinformasjon registert i KRR så vil tjenesteeier få informasjon om dette i respons fra Altinn på sitt kall for å opprette varsel. Hvis innbygger har registert en epost-adresse eller et mobilnummer som ikke er i bruk (ugyldig) så er det ikke mulig for tjenesteeier å få tilbakemelding på at utsending feilet pga dette fra Altinn.  
Her finner du mer informajson om [Kontakt og reservasjonsregisteret](http://eid.difi.no/nb/personvernerklaering/kontakt-og-reservasjonsregisteret-krr).  

***Varslingsadresser for Enheter***
Altinn benytter varslingsadresser som enheten selv har selv har registert i henhold til krav i eForvaltningsforskriften . 
Her finner du mer informajson om [Varslingsadresser for Enheter](https://www.brreg.no/produkter-og-tjenester/bestille-produkter/maskinlesbare-data-enhetsregisteret/varslingsadresser-til-bruk-for-offentlig-forvaltning/).  
De aller fleste enheter har registert en varslingsadress og enheten er selv ansvarlig for å oppdatere sin varslingsadresse. I Altinn får eneheten påminnelser om å kontrollere varslingsadresse med jevne mellomrom.  Hvis enheten mangler varslingsadresse så vil tjenesteeier få informasjon om dette i respons fra Altinn på sitt kall for å opprette varsel. Hvis enheten har registert en epost-adresse eller et mobilnummer som ikke er i bruk (ugyldig)  så er det ikke mulig for tjenesteeier å få tilbakemelding på at utsending feilet pga dette fra Altinn.  

***Varsel til brukere som kan opptre på vegne av Enheter***
Når tjenesteeier sender varsel til Enhet så *kan* det også sendes varsel til brukere som har tilgang til tjenesten. Dette skjer under følgende forutsetningene: 
1) bruker har registrert "min kontaktinformasjon for virksomheten" knyttet til enheten som skal motta varsel
2) bruker har IKKE har reservert seg mot å få varslinger knyttet til denne tjenesten



