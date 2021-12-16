---
title: Overordnet funksjonalitet
linktitle: Overordnet
description: Altinn har utviklet et ferdig sett med Meldingstjenester til bruk i DPV (Digital Post til Virksomheter). Dette er fellestjenester som alle avsendere av DPV kan benytte uten noen form for tjenesteutvikling på forhånd. 
toc: true
weight: 1
---

## Digital post sendt via DPV

![DPV funksjonalitet](dpv-funksjonalitet.png "Digital Post til Virksomheter")

DPV lar det offentlige sende meldinger til virksomheter og innbygger i Altinn med en enklere form for integrasjon mot Altinn enn når man tar vanlig meldingstjenester i bruk. 
DPV benyttes som en av kanalene når man sender melding via [eFormidling](https://samarbeid.digdir.no/eformidling/dette-er-eformidling/46)


![DPV bygger på standardfunksjonalitet i Altinn](meldingstjeneste-dpv.png "DPV bygger på standardfunksjonalitet i Altinn")

Jfr figur over, basisfunksjonalitet for forsendelse av Meldinger i Altinn dekker fra før av behov for forsendelse, statusoppdatering, varslinger og revarsel. Men i tillegg til basis meldingsfunksjonalitet er det for DPV lagt inn mulighet for:

* Å sende post på vegne av annen virksomhet. En mottaker vil da kunne se hvem som er den faktiske avsender, ikke den tekniske avsender. Altinn loggfører både hvem som er teknisk og hvem som er faktisk avsender.
* Styrt brukertilgang til post via rollen «Post/Arkiv»
* Å hente status på inntil 10.000 meldinger ad gangen (ny Web Service) eller basert på søkekriterier
* Å benytte virksomhetsertifikat på Web Service operasjoner uten å måtte angi brukernavn+passord (altså en mer 'normal' bruk av virksomhetsertifikat).

## Meldingskategorier for ordinær post

Det er foreløpig utviklet 10 ulike Meldingstjenester innenfor ulike tjenesteområder, inkludert en generell kategori:

| Kategori                                                       | ExternalServiceCode / ExternalServiceEditionCode |
| -------------------------------------------------------------- | ------------------------------------------------ |
| **Post fra det offentlige innenfor administrasjon**            | 4255/10                                          |
| Post fra det offentlige innenfor plan, bygg og geodata         | 4255/1                                           |
| Post fra det offentlige innenfor helse, sosial og omsorg       | 4255/2                                           |
| Post fra det offentlige innenfor oppvekst og utdanning         | 4255/3                                           |
| Post fra det offentlige innenfor kultur, idrett og fritid      | 4255/4                                           |
| Post fra det offentlige innenfor trafikk, reiser og samferdsel | 4255/5                                           |
| Post fra det offentlige innenfor natur og miljø                | 4255/6                                           |
| Post fra det offentlige innenfor næringsutvikling              | 4255/7                                           |
| Post fra det offentlige innenfor skatter og avgifter           | 4255/8                                           |
| Post fra det offentlige innenfor tekniske tjenester            | 4255/9                                           |

Alle disse Meldingstjenestene er knyttet opp til en ny Rolle i Altinn «Post/Arkiv».

{{% notice note %}}
Hvis post som sendes inneholder sensitive personopplysninger så vil bruk av de ordinære meldingskategorierer medfører en uønsket høy risiko for at personer uten tjenstlig behov får tilgang til data de ikke skal ha tilgang til . 
I slike tilfeller må man benytte meldingskategorier som støtter taushetsbelagt post - se eget avsnitt under.
{{% /notice %}}

## Støtte for taushetsbelagt post

Hvis man skal sende ut meldinger til en virksomhet som inneholder særlig sensitiv og taushetsbelagt informasjon (f eks informasjon om enkeltpersoner knyttet til straffesaker, barnevernssaker o.l.) 
så er det viktig å legge til rette for at innsyn i innholdet begrenses til de i virksomheten som har tjenstlig behov for å se dette. 
I slike tilfeller kan IKKE [meldingskategorier for ordinær post](../overorndet-funksjonalitet/#meldingskategorier-for-ordinær-post) benyttes. 

### Vurderingskriterier for når post er taushetsbelagt
I dag kan alle med tilgang til rollen Post/Arkiv lese post som sendes via [meldingskategorier for ordinær post](../overorndet-funksjonalitet/#meldingskategorier-for-ordinær-post). 

Post/Arkiv-rollen gir automatisk daglig leder, styreleder m flere denne tilgangen ([se Spørsmål og svar om DPV](../spørsmål-og-svar/) for fullstendig oversikt). Det er i dag ikke mulig å hindre at f eks styrest leder får en slik tilgang. 


[Meldingskategorier for ordinær post](../overorndet-funksjonalitet/#meldingskategorier-for-ordinær-post) skal  _ikke_ 
benyttes når virksomheten sender post som inneholder sensitive personopplysninger til virksomheter. 
[Sensitive personopplysninger](https://www.datatilsynet.no/rettigheter-og-plikter/personopplysninger/) kan være helseopplysninger, informasjon relater til barnevernssaker eller andre typer opplysninger som kun skal leses av enkelte personer i virksomheten. Dere bør altså vurdere om posten inneholder opplysninger som i henhold til regelverket ikke skal være tilgjengelig for alle med tilgang til rollen Post/Arkiv i Altinn.

Den som skal sende post via DPV, må ta stilling til følgende tre spørsmål før man beslutter hvilken kategori brevet tilhører:

1) Er mottaker av post en organisasjon?
2) Inneholder post sensitive personopplysninger som kun få/enkelte personer i virksomheten bør ha tilgang til?
3) Hvis melding sendes via eFormidling: Mottar organisasjonen posten i sin innboks i Altinn og ikke via DPO eller KS fiks [se forklaring på eFormidling](https://samarbeid.digdir.no/eformidling/dette-er-eformidling/46)?

Hvis svar på alle spørsmål overfor er ja, skal posten sendes til virksomheten som taushetsbelagt post.

### Meldingskategorier for taushetsbelagt post

Det finnes bare en kategori for taushetsbelagt post

| Kategori                                                                | ExternalServiceCode / ExternalServicceEditionCode |
|-------------------------------------------------------------------------|---------------------------------------------------|
| Taushetsbelagt post fra det offentlige                                  |		5504/1                                          |

Tjenestene som støtter forsendelse av taushetsbelagt informasjon avviker noe fra «vanlige» Altinn-tjenester. 
Det spesielle med tjenestene er at rollen(e) som gir tilgang til tjenestene ikke er forhåndstildelt til roller fra Enhetsregisteret. 
Dette innebærer at det i utgangspunktet er INGEN som ser meldingen som er send til virksomhetens innboks, heller ikke daglig leder eller styrets leder. 
Det er derfor viktig å sikre informajson om tilgangsstyring når tjenesten tas i bruk til nye målgrupper

### Tilgangsstyring til taushetsbelagt post
Tilgangsstyring hos virksomhet som mottar denne typen meldinger må sørge for at bare de som har tjenstlig behov for det får tilgang til innholdet. 
Her finner du vår [anbefaling](../overorndet-funksjonalitet/del-tilgang-til-melding/) på hvordan dette bør gjøres i virksomheten. 

### Krav til utforming av taushetsbelagt post
For å sikre at det er rette vedkommende i virksomheten som får tilgang til de taushetsbelagte meldingene, 
er det viktig at avsender tilpasser innholdet i meldingen slik at det er enkelt å se hva meldingen gjelder og hvem i egen organisasjonen som skal ha tilgang til meldingen. 
Dette kan f.eks gjøres ved å ha entydig tekst i MessageTitle – gjerne navngi mottaker dersom dette er kjent, evt benytt saksnummer eller annen informasjon 
som kan knytte meldingen til rett person i virksomheten. 

### Krav til varsling ved taushetsbelagt post
Når en meldingen med taushetsbelagt innhold opprettes SKAL det varsles med Notification for å sikre at virksomheten får beskjed om at det er sendt en melding i innboksen. 
Varslingen må inneholde informasjon om at meldingen er taushetsbelagt, samt beskrivelse av hva virksomheten må gjøre for å sikre at rette vedkommende får tilgang til meldingen, 
dvs hva meldingen gjelder, hvem som skal ha meldingen, hvilken enkelttjeneste eller rolle som må delegeres for å gi tilgang o.l. 

Vi anbefaler sterkt at teksten i varselet tilpasses innhold i forsendelsen hvis det er mulig. Hvis ikke anbefaler vi følgende standard/default varslingstekst: 
"<navn på mottaker>, har mottatt en taushetsbelagt melding fra <avsender>. For å få tilgang til meldingen, er det nødvendig at noen i <navn på mottaker> har tildelt fått rollen «Taushetsbelagt post fra det offentlige» i Altinn. Dersom dere er usikre på om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. Les mer om å gi tilgang til rollen «Taushetsbelagt post» på Altinns nettsider."

## Varsel og evt revarsel

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

## Integrasjon

Statlige virksomheter integrerer seg mot tjenesten DPV via Difis Integrasjonspunkt for eFormidling, eller direkte fra egne løsninger mot Altinns Webtjenestegrensesnitt. Ta kontakt med servicedesk@digdir.no for å bestille tilgang til tjenesten DPV med eFormidling. Du kan lese mer om tjenesten her: (https://samarbeid.difi.no/felleslosninger/eformidling).

Kommuner kan benytte KS sin løsning (SvarUt), og kan henvende seg til KS (https://www.ks.no/fagomrader/digitalisering/felleslosninger/svar-inn-og-svar-ut/komme-i-gang-med-svarut/).

## DPV for Sluttbruker

Det blir enklere for alle mottakere av post når denne er knyttet til en generell rolle uansett hvem som er avsender. For en Sluttbruker vil man da kun delegere tilganger til en virksomhet sin post én gang for all post fra alle avsendere.

De som skal lese ordinær post for en virksomhet må ha rollen «Post/Arkiv». Alle som har en nøkkelrolle i en virksomhet får denne rollen automatisk. Rollen «Post/Arkiv» kan videre delegeres til:

-   Andre privatpersoner
-   Andre virksomheter
-   Virksomhetsbrukere (som benytter virksomhetssertifikat)

Det er kun de som har nøkkelrolle (daglig leder, styreleder o.l) eller har fått rollen «Hovedadministrator» eller «Tilgangsstyring» som kan delegere videre.

Sluttbrukere kan integrere sine IKT løsninger mot egen Meldingsboks i Altinn, slik mange allerede har gjort siden Altinns begynnelse. Altinn tilbyr Web Services enten i form av SOAP eller REST.

De standard Meldingstjenestene for DPV er alle satt opp på sikkerhetsnivå 3. Sikkerhetsnivå 4 er mulig i Altinn, men inntil videre er dette ikke satt opp for DPV meldingstjenestene. Det er i dag kun mulig å lese meldingstjenester med sikkerhetsnivå 4 ved ordinær innlogging via Idporten, men maskinintegrasjon er ikke mulig. Virksomhetsertifikat-autentisering gir kun sikkerhetsnivå 3, og Idporten støtter pr i dag ikke systemautentisering. Hvis det allikevel blir behov for at DPV støtter meldingstjenester på sikkerhetsnivå 4 vil Altinn generere og tilby meldingstjenester som krever dette nivået, men da med dagens begrensning at maskinintegrasjon ikke er mulig.

## DPV for Avsender

Alle som skal ta i bruk DPV, må i utgangspunktet benytte de felles meldingstjenestene som er utviklet. Avsender må selv vurdere om de ønsker å benytte 1 eller flere av de 13 felles meldingtjenestene som er utviklet. Det er særlig viktig å vurdere om meldingene inneholder taushetsbelagt informasjon. I de tilfellene må tjenestene som støtter taushetsbekagt inforamsjon benyttes.

Tanken med DPV er basert på dagens Meldingstjenester i Altinn med noen få valgfrie endringer. Teknisk kan dagens Tjenesteeiere fortsatt benytte eksisterende meldingstjenester, men bør vurdere overgang til de generelle og felles Meldingstjenestene som nå er ferdig utviklet i Altinn, der Altinn står som forvalter og tjenesteutvikler.

De etatene som benytter egenutviklete Meldingstjenester kan fortsette med dette hvis det er særskilte behov for å styre spesifikke rollekrav/tilganger til en melding og at den benyttes i en flerveis dialogtjeneste sammen med andre sluttbrukertjenester i Altinn.

Eksisterende avsendere må derfor konfigurere om sine løsninger slik at man benytter de korrekte tjenestekodene når de skal benytte de nye generelle DPV meldingstjenestene.

En avsender kan sende post ved å knytte seg til Altinns Web Service grensesnitt «InsertCorrespondence», eller på Batch (SFTP). Når en offentlig virksomhet er registrert i Altinn som Tjenesteeier eller gjort avtale for bruk av DPV kan man benytte DPV og de felles meldingstjenestene direkte ved enten:

- Bestille brukernavn + passord
- Benytte eget virksomhetssertifikat

For de som skal sende post på vegne av andre organisasjoner, så skal et nytt parameter benyttes i integrasjonsgrensesnittet, "OnBehalfOfOrgNr". Dette feltet skal da inneholde et orgnr for en offentlig virksomhet som har gyldig tjenesteeier-/DPV- avtale med Altinnn.

Ellers kan parameter "MessageSender" benyttes som før for de som har behov for å angi for sluttbruker et spesifikk avsendernavn innenfor egen organisasjon.
