---
title: Grensesnitt
description: Aktuelle grensesnitt
aliases:
 - /guides/dpv/
 - /guides/digital-post-til-virksomheter/
weight: 40
---

For mer utfyllende og generell dokumentasjon på de tekniske grensesnittene se [Tjenesteeier](../tjenesteeier/), som gir informasjon om alle Altinn Web Services grensesnitt samlet.

Det tilbys både grensesnitt på Batch og Web Services. Vi anbefaler å benytte Web Services fremfor Batch-grensesnitt. Man må uansett benytte Web Services grensenitt for å hente status på sendte meldinger.

## Aktuelle grensesnitt Web Service for avsendere

{{% notice note %}}Endepunktene for virksomhetssertifikat under er nye endepunkt ifm DPV, der avsender kun autentiseres med gyldig virksomhetssertifikat, som valideres mot gyldige tjenesteeiere i Altinn. Om man velger å benytte Soap 1.1 eller 1.2 har ingen praktiske forskjeller uten det rent tekniske. Det er utviklet en ny Status Web Service for de som ønsker å hente inn inntil 10.000 status basert på ExternalShipmentReference fra operasjonen InsertCorrespondence (send post).
{{% /notice %}}

### Send post
For innsending av melding til mottakers meldingsboks i Altinn. Denne kan benyttes både til privatpersoner og organisasjoner.

-   Basic SOAP 1.1  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalBasic.svc  
Operasjon: InsertCorrespondenceBasicV2
-   SOAP 1.2  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternal.svc  
Operasjon: InsertCorrespondenceV2
-   Virksomhetssertifikat  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalAEC.svc  
Operasjon: InsertCorrespondenceAEC

### Hent Status på Post (Alternativ 1 - anbefalt)

Ny operasjon, benyttes av en tjenesteeier/avsender for å sjekke status på et sett (inntil 10.000) av meldinger basert på ExternalShipmentReference fra operasjonen InsertCorrespondence (send post).

-   Basic SOAP 1.1  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalBasic.svc  
Operasjon:GetCorrespondenceStatusHistoryBasic
-   SOAP 1.2  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternal.svc)  
Operasjon:GetCorrespondenceStatusHistory
-   Virksomhetssertifikat  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalAEC.svc  
Operasjon:GetCorrespondenceStatusHistoryAEC

### Hente Status på Post (Alternativ 2):

-   SOAP 1.1  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalBasic.svc  
Operasjon:GetCorrespondenceStatusDetailsBasicV3
-   SOAP 1.2  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternal.svc  
Operasjon:GetCorrespondenceStatusDetailsV3
-   Virksomhetssertifikat   
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalAEC.svc  
Operasjon:GetCorrespondenceStatusDetailsAECV3

### Bruk av Web Services samt virksomhetssertifikat

For de Avsendere som ikke velger å benytte Virksomhetsertifikat må det utstedes brukernavn+passord som i dag på Tjenesteeier grensesnitt (WS). Dette gis ut ifb. avtaleinngåelse om bruk av DPV.

Når det gjelder bruk av Virksomhetssertifikat: På de nye Web Servicene til DPV, er disse satt opp slik at det holder å være registrert som brukere av DPV ("inngått avtale") med org.nr, som må matche virksomhetssertifikatet. Altinn trenger altså ikke noe annet fra Avsender enn en DPV avtale, og at Avsender er registrert i Altinn. Altinn trenger f.eks. ikke noe nøkkelinformasjon fra selve Virksomhetssertifikatet.

### Behov for test og testmiljø

Altinns testmiljø https://tt02.altinn.no/ kan benyttes for Avsendere som har behov for dette. Testbrukere (sluttbrukere og sluttbruker-organisasjon i meldingsboksen) gis ut til de som trenger dette, slik at man kan sjekke mottak av post i dennes meldingsboks.

I møtet på mandag kom vi fram til at istedenfor at alle som vil teste i TT02 må bestille sine egne test sertifikater så kjøpes det inn fem som vi eier og kan låne ut til de som trenger det. Avsender sertifikat kan deles så lenge de har egne mottakerbedrifter som de kan sende til og sjekke resultater.

Det er slik at hvis nye Avsendere skal teste DPV i TT02, og velger å benytte Virksomhetssertifikat, må de i dag benytte det settet Altinn har av test-virksomhetsertifikat. Avsender trenger altså ikke bestille egne testsertifikat. TT02 inneholder ikke reelle organisasjoner, og det er en forutsetning at en org (med Virk.sert) er registrert i ER og hos utsteder. Inntil dette er løst tverrsektorielt (det er pågående tiltak for samkjøring av testbrukere/testdata på tvers av offentlige fellesløsninger), kan Altinn låne ut Avsender-virksomhetsertifikat for TT02.

### Varsel og Revarsel

Eksempelfilene viser teknisk hvordan man benytter Altinns varselsmaler. De forhåndsdefinerte varselsmalene Altinn tilbyr Avsendere er:

1.  VarselDPVUtenRevarsel:  
For varsler der det ikke er behov for å sende revarsel. Varsel sendes kun 1 gang. Denne skal kun benyttes hvis Avsender har gjort en juridisk vurdering av revarsel ikke er påkrevd.
2.  VarselDPVMedRevarsel (7 dager):  
For varsler der det er behov for både å sende varsel og revarsel hvis ikke lest innen 7 dager. Varsel sendes minst 1 gang, revarsel hvis post ikke er åpnet. Denne skal benyttes i de fleste tilfeller.

Varselsmalene har 3 språkinnstillinger man kan velge blant:

*  1044 = NorwegianNO  
Epost emne satt til "Ny melding tilgjengelig i Altinn.no for $reporteeName$" *(Se info om makro under)* <br />
Epost tekst/SMS settes av Avsender i run-time.  
Revarsel er samme som over, men Altinn legger inn en statisk tekst "Påminnelse: " i forkant av selve varselsteksten satt av Avsender.
* 2068 = NorwegianNN  
Epost emne satt til "Ny melding tilgjengeleg i Altinn.no for $reporteeName$"
Epost tekst/SMS settes av Avsender i run-time.  
Revarsel er samme som over, men Altinn legger inn en statisk tekst "Påminning: " i forkant av selve varselsteksten satt av Avsender.
* 1033 = English  
Epost emne satt til "New message available at Altinn.no for $reporteeName$"  
Epost tekst/SMS settes av Avsender i run-time.  
Revarsel er samme som over, men Altinn legger inn en statisk tekst "Reminder: " i forkant av selve varselsteksten satt av Avsender.

Bruk av makroer i varsler:  
I varselsteksten kan Avsender benytte såkalte "makroer", som er variabler for å hente ulike data fra Altinn Register inn i varselsteksten som vises for sluttbruker. Registerdata hentes basert på angitt mottager.

Følgende makroer er tilgjengelig for bruk mot virksomheter:  
$reporteeName$ = Altinn legger inn navn på virksomhet som mottar post (basert på orgnr som er angitt som mottager).

## Ny og spesifikk funksjonalitet for DPV utover vanlig meldingsfunksjonalitet

DPV er bygget på den ordinære meldingsfunksjonalitet i Altinn, men med noen få tillegg. Informasjon om bruk av varsler, detaljer om parametere, etc er beskrevet i [Tjenesteeier dokumentasjon](../tjenesteeier/#innhold).

For operasjonen InsertCorrespondenceBasicV2[...], så er denne ikke versjonert til tross for ny DPV-funksjonalitet, siden det kun er en ny opsjonell parameter i request, og operasjonen er ellers kompatibel med eksisterende implementasjoner.

### Sende på vegne av andre organisasjoner, ny parameter "OnBehalfOfOrgNr"

Denne benyttes hvis man skal sende på vegne av en annen organisasjon. Organisasjonsnummeret må være et valid orgnr, som er en ordinær tjenesteeier eller har DPV-avtale med Altinn (En automatisk validering på om orgnr i "OnBehalfOfOrgNr" faktisk er en Tjenesteeier gjøres ikke p.t.). "OnBehalfOfOrgNr" er også knyttet til parameter "MessageSender ", se mer om dette under. "MessageSender" er et fritekstfelt/parameter som kan benyttes for å angi en mer brukerorientert tekst for Sluttbruker hvem som er avsender av Post. F.eks. om det er behov for å angi at Post kommer fra et spesielt kontor/avd/bydel innenfor en organisasjon.

-   Man kan fortsatt benytte MessageSender som idag uten InsertOnBehalfOfOrgNr. Da vil oppførsel være som tidligere. MessageSender kan angi et mer fritekst- og brukerorientert navn på avsender innnenfor en organisasjon.
-   Når man benytter InsertOnBehalfOfOrgNr, så kan man utelate parameter MessageSender hvis ønskelig, da vil Altinn oppi navnet til OrgNr som MessageSender i portalen for brukeren.
-   Man kan benytte MessageSender OG InsertOnBehalfOfOrgNr, men da vil brukeren se det som er oppgitt i Messagesender. Altinn vil registrere hvem som er den faktiske avsender av Post i tillegg til den tekniske avsender.
-   OnBehalfOfOrgNr skal uansett benyttes hvis man sender på vegne av andre organisasjoner, slik at vi får registrert faktiske avsendere og bruken av DPV.

### Hent Status på sendt Post

Jf. [Aktuelle grensesnitt Web Service for avsendere](#aktuelle-grensesnitt-web-service-for-avsendere), så kan man hente status på sendt post enten via den opprinnelige eller den nye operasjonen for dette. Den opprinnelige operasjonen "GetCorrespondenceStatusDetailsV3[...]" er egnet for enten å be om status for én kjent melding basert på meldingens unike referanse ("ExternalShipmentReference" fra operasjonen InsertCorrespondence), eller angi mer søkbaserte parametere som vil returnere et varierende antall status-er utifra søketreff.
Den nye operasjonen "GetCorrespondenceStatusHistory[...]" kan kun benytte verdier fra "ExternalShipmentReference" fra operasjonen InsertCorrespondence. Men her kan man be om inntil 10.000 status ad gangen, angitt i en array-lists i request på operasjonen. F.eks.
```xml
...
<ns:CorrespondenceSendersReferences>
<arr:string>EXT_REF7653</arr:string>
<arr:string>EXT_REF71875</arr:string>
<arr:string>EXT_REF78392</arr:string>
<arr:string>EXT_REF26628</arr:string>
</ns:CorrespondenceSendersReferences>
...
```
Det vil da være mulig å korrelere meldinger deterministisk og effektivt. Avsender må ta vare på identifikatorer pr sendt melding (verdien "ExternalShipmentReference" fra operasjonen InsertCorrespondence).

{{% notice note %}}
Denne operasjonen inkluderer som standard også status på post som blir videresendt fra Altinn til Difis løsning for Innbyggerpost, for de som skal benytte den funksjonaliteten.
{{% /notice %}}

## Eksempel på bruk og eksempelfiler
### Post sendt og mottatt i Altinn:

{{<icon name="tasks" size="x-large">}}Skal legge inn hvordan nettsidene ser ut for bruker – kommer ...

