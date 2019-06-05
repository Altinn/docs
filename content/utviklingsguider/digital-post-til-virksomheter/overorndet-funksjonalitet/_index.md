---
title: Overordnet funksjonalitet
description: Altinn har utviklet et ferdig sett med Meldingstjenester til bruk i DPV. Dette er fellestjenester som alle avsendere av DPV kan benytte uten noen form for tjenesteutvikling på forhånd. 
weight: 1
---


![DPV funksjonalitet](dpv-funksjonalitet.png?width=700)

Det er foreløpig utviklet 10 ulike Meldingstjenester innenfor ulike tjenesteområder, inkludert en generell kategori:

|Kategori|ExternalServiceCode / ExternalServiceEditionCode|
|------------|--------------------------------------------|
|**Post fra det offentlige innenfor administrasjon**|4255/10|
|Post fra det offentlige innenfor plan, bygg og geodata|4255/1|
|Post fra det offentlige innenfor helse, sosial og omsorg| 4255/2|
|Post fra det offentlige innenfor oppvekst og utdanning|4255/3|
|Post fra det offentlige innenfor kultur, idrett og fritid|4255/4|
|Post fra det offentlige innenfor trafikk, reiser og samferdsel|4255/5|
|Post fra det offentlige innenfor natur og miljø|4255/6|
|Post fra det offentlige innenfor næringsutvikling|4255/7|
|Post fra det offentlige innenfor skatter og avgifter|4255/8|
|Post fra det offentlige innenfor tekniske tjenester|4255/9|

Alle disse Meldingstjenestene er knyttet opp til en ny Rolle i Altinn «Post/Arkiv».
Det anbefales at avsender benytter meldingstypen **"Generell: Post fra det offentlige innenfor administrasjon"**, hvis det ikke er særskilte behov for at posten skal prekategoriseres for sluttbruker.
{{% notice note %}}
Det er verdt å nevne at metadata på postmeldinger bør videreutvikles, men basert på en mer fleksibel og skalerbar modell som kan benyttes i ulike domene og fagområder.
{{% /notice %}}

![DPV bygger på standardfunksjonalitet i Altinn](meldingstjeneste-dpv.png?width=700)

Jfr figur over, basisfunksjonalitet for forsendelse av Meldinger i Altinn dekker fra før av behov for forsendelse, statusoppdatering, varslinger og revarsel. Men i tillegg til basis meldingsfunksjonalitet er det for DPV lagt inn mulighet for:

* Å sende post på vegne av annen virksomhet. En mottaker vil da kunne se hvem som er den faktiske avsender, ikke den tekniske avsender. Altinn loggfører både hvem som er teknisk og hvem som er faktisk avsender.
* Styrt brukertilgang til post via rollen «Post/Arkiv»
* Å hente status på inntil 10.000 meldinger ad gangen (ny Web Service) eller basert på søkekriterier
* Å benytte virksomhetsertifikat på Web Service operasjoner uten å måtte angi brukernavn+passord (altså en mer 'normal' bruk av virksomhetsertifikat).

#### Varsel og evt revarsel

Varsler og revarsel i DPV benytter generell funksjonalitet for dette i Altinn. I Altinn kan man utvikle egne varselsmaler til spesifikk bruk, med ulike forhåndsdesignet statiske tekster og bruk av "variabler" (tokens) for utfylling av evt avsenderstyrt varselstekst (i runtime). For DPV tilbys 2 varselsmaler, som bør benyttes der det er behov for varsel og evt revarsel:

1. VarselDPVUtenRevarsel  
For varsler der det ikke er behov for å sende revarsel  
2. VarselDPVMedRevarsel (7 dager)  
For varsler der det er behov for både å sende varsel og revarsel hvis ikke lest innen 7 dager

Altinn vil benytte den kontaktinformasjon som allerede er registrert i Altinn for forsendelse av varsler hvis ikke avsender angir dette spesifikt selv i postforsendelsen. Avsender må altså kun kjenne til org.nr til mottager hvis de ikke selv ønser å spesifisere dette.

Juridisk er det viktig å være klar over følgende: Krav om revarsling er knyttet til om forsendelsen gjelder enkeltvedtak og lignende, jf eForvaltningsforskriften § 8, 5.ledd og 6.ledd:

*«Informasjonssystemet skal registrere tidspunktet for når parten har skaffet seg tilgang til enkeltvedtaket, og data som bekrefter at vedkommende har rett til å gjøre seg kjent med vedtaket. Har parten ikke skaffet seg tilgang til enkeltvedtaket innen én uke fra det tidspunktet vedtaket ble gjort tilgjengelig, og varsel ble sendt, skal parten varsles en gang til i samsvar med tredje ledd. Første og annet punktum gjelder ikke dersom vedtaket er sendt en elektronisk adresse mottaker oppgir jf. annet ledd annet punktum.*

Det som gjelder enkeltvedtak i annet til femte ledd ovenfor, gjelder tilsvarende for;

1.  forhåndsvarsel etter forvaltningsloven § 16,
2.  for andre meldinger som har betydning for vedkommendes rettsstilling eller for behandlingen av saken, og
3.  for meldinger som det av andre grunner er av særlig betydning å sikre at vedkommende mottar.»

#### Integrasjon

Statlige virksomheter integrerer seg mot tjenesten DPV via Difis Integrasjonspunkt for eFormidling, eller direkte fra egne løsninger mot Altinns Webtjenestegrensesnitt. Ta kontakt med idporten@difi.no for å bestille tilgang til tjenesten DPV med eFormidling. Du kan lese mer om tjenesten her: (https://samarbeid.difi.no/felleslosninger/eformidling).

Kommuner kan benytte KS sin løsning (SvarUt), og kan henvende seg til KS (http://www.ks.no/fagomrader/utvikling/digitalisering/svarut/komme-i-gang-med-svarut/).

#### DPV for Sluttbruker:

Det blir enklere for alle mottakere av post når denne er knyttet til en generell rolle uansett hvem som er avsender. For en Sluttbruker vil man da kun delegere tilganger til en virksomhet sin post én gang for all post fra alle avsendere.

De som skal lese post for en virksomhet må ha rollen «Post/Arkiv». Alle som har en nøkkelrolle i en virksomhet får denne rollen automatisk. Rollen «Post/Arkiv» kan videre delegeres til:

-   Andre privatpersoner
-   Andre virksomheter
-   Virksomhetsbrukere (som benytter virksomhetssertifikat)

Det er kun de som har nøkkelrolle (daglig leder, styreleder o.l) eller har fått rollen «Tilgangsstyring» som kan delegere videre.

Sluttbrukere kan integrere sine IKT løsninger mot egen Meldingsboks i Altinn, slik mange allerede har gjort siden Altinns begynnelse. Altinn tilbyr Web Services enten i form av SOAP eller REST.

De standard Meldingstjenestene for DPV er alle satt opp på sikkerhetsnivå 3. Sikkerhetsnivå 4 er mulig i Altinn, men inntil videre er dette ikke satt opp for DPV meldingstjenestene. Det er i dag kun mulig å lese meldingstjenester med sikkerhetsnivå 4 ved ordinær innlogging via Idporten, men maskinintegrasjon er ikke mulig. Virksomhetsertifikat-autentisering gir kun sikkerhetsnivå 3, og Idporten støtter pr i dag ikke systemautentisering. Hvis det allikevel blir behov for at DPV støtter meldingstjenester på sikkerhetsnivå 4 vil Altinn generere og tilby meldingstjenester som krever dette nivået, men da med dagens begrensning at maskinintegrasjon ikke er mulig.

#### DPV for Avsender:

Alle som skal ta i bruk DPV, må i utgangspunktet benytte de felles meldingstjenestene som er utviklet. Avsender må selv vurdere om de ønsker å benytte 1 eller flere av de 10 felles meldingtjenestene som er utviklet.

Tanken med DPV er basert på dagens Meldingstjenester i Altinn med noen få valgfrie endringer. Teknisk kan dagens Tjenesteeiere fortsatt benytte eksisterende meldingstjenester, men bør vurdere overgang til de generelle og felles Meldingstjenestene som nå er ferdig utviklet i Altinn, der Altinn står som forvalter og tjenesteutvikler.

De etatene som benytter egenutviklete Meldingstjenester kan fortsette med dette hvis det er særskilte behov for å styre spesifikke rollekrav/tilganger til en melding og at den benyttes i en flerveis dialogtjeneste sammen med andre sluttbrukertjenester i Altinn.

Eksisterende avsendere må derfor konfigurere om sine løsninger slik at man benytter de korrekte tjenestekodene når de skal benytte de nye generelle DPV meldingstjenestene.

En avsender kan sende post ved å knytte seg til Altinns Web Service grensesnitt «InsertCorrespondence», eller på Batch (SFTP). Når en offentlig virksomhet er registrert i Altinn som Tjenesteeier eller gjort avtale for bruk av DPV kan man benytte DPV og de felles meldingstjenestene direkte ved enten:

-   Bestille brukernavn + passord
-   Benytte eget virksomhetssertifikat

For de som skal sende post på vegne av andre organisasjoner, så skal et nytt parameter benyttes i integrasjonsgrensesnittet, "OnBehalfOfOrgNr". Dette feltet skal da inneholde et orgnr for en offentlig virksomhet som har gyldig tjenesteeier-/DPV- avtale med Altinnn.

Ellers kan parameter "MessageSender" benyttes som før for de som har behov for å angi for sluttbruker et spesifikk avsendernavn innenfor egen organisasjon.
