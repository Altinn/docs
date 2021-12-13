---
title: Digital Post til Virksomheter
linktitle: Digital post
description: Digital Post til Virksomheter (DPV) er en fellestjeneste i Altinn som det offentlige kan bruke for å sende digital post til virksomhetens innboks i Altinn. 
aliases:
 - /guides/dpv/
 - /guides/digital-post-til-virksomheter/
weight: 20
---

Altinns meldingstjenester kan benyttes i ulike sammenhenger, ofte i forbindelse med andre dialogtjenester i Altinn. Med Digital post til virksomheter (DPV) har vi utviklet et ferdig sett med tjenester til dette formålet slik at du skal slippe å utvikle dem selv. DPV er således en påbygg for de avsendere som i utgangspunktet kun skal sende post til virksomheter uten behov for å knytte dette tett til en spesifikk innsendingstjeneste i Altinn, eller særskilte behov som ikke dekkes av DPV. Et eksempel på særskilte behov kan f eks være at tilgangsstyringsregler for DPV (dvs regler om hvem som får tilgang til tjenensten) ikke fungerer for den post dere sender ut. 

Med tradisjonell bruk av meldingstjenester i Altinn har Tjenesteeierne selv utviklet egne meldingstjenester, der de selv kan stille krav til at kun brukere med spesielle roller skal få tilgang. I DPV introduseres derimot meldingstjenester som er generelle i krav om sluttbrukers rolle. Det vil være opp til virksomhetene som mottar post å styre tilgang til egen post, og formidle denne videre inn i sin organisasjon, enten via automatiske og maskinell integrasjon med Altinn eller tilgang i Altinn meldingsboks.

Slik går du frem:

1. **Start med å definere brukerbehov**<br>Tenk nøye gjennom hele prosessen fra et brukerperspektiv. Hva er utfordringen og hvem skal den løses for? Hvem skal du sende post til? Skal du sende varsel på e-post og/eller sms? Lag gjerne en skisse til kommunikasjon med brukeren og test skissen på folk i målgruppen. God planlegging er nøkkelen til et godt resultat. Sjekk Guide: [Hvordan jobbe brukerorientert?](https://www.altinndigital.no/kom-i-gang/hvordan-jobbe-brukerorientert/) for inspirasjon.
2. **Signere bruksvilkår fra Digdir og få tilgang til systemer**<br>
Altinn har et samarbeid med eFormidling på Digital post til virksomheter. For å komme i gang starter du med å kontakte eFormidling: servicedesk@digdir.no. De bistår deg så du får signert bruksvilkår og gir deg også tilgangen du trenger for å ta i bruk våre tjenester.
3. **Tilrettelegge egne systemer for sending av meldinger**<br>For å kunne sende meldinger fra ditt fagsystem til Altinn må dine systemer tilrettelegges for dette. Det tilbys grensesnitt både på batch og web service. Vi anbefaler web service siden du uansett vil benytte dette for å hente status på sendte meldinger. Les i Guide for DPV for informasjon om grensesnittet mellom ditt system og Altinn
4. **Utvikle tjenesten**<br>Du er nå klar til å ta i bruk en av våre ferdigutviklede tjenester til digital post. Det er utviklet ti tjenester innenfor ulike tjenesteområder slik at du skal slippe å utvikle dem selv. Dette er fellestjenester alle som skal sende DPV kan benytte. Les Guide: Digital post til virksomheter om hvordan du kobler deg på tjenestene.

Det er en fordel om du på forhånd har jobbet med tekster i melding og varsling ut fra et brukerperspektiv, slik at du har klart for deg hva som skal utvikles.

{{% children description="true" %}}
