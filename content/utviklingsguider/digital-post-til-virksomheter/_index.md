---
title: Digital Post til Virksomheter
description: Beskrivelse av hvordan man kan ta i bruk Meldingstjeneste i Altinn for å sende digital post til virksomheter (DPV).
aliases:
 - /guides/dpv/
 - /guides/digital-post-til-virksomheter/
weight: 40
---

Altinns meldingstjenester kan benyttes i ulike sammenhenger, ofte i forbindelse med andre dialogtjenester i Altinn. DPV er således en påbygg for de avsendere som i utgangspunktet kun skal sende post til virksomheter uten behov for å knytte dette tett til en spesifikk innsendingstjeneste i Altinn, eller særskilte behov som ikke dekkes av DPV.

Tradisjonell bruk av Meldingstjenester i Altinn har Tjenesteeierne selv utviklet egne Meldingstjenester, der de selv kan stille krav til at kun brukere med spesielle roller skal få tilgang. I DPV introduseres derimot meldingstjenester som er generelle i krav om sluttbrukers rolle. Det vil være opp til virksomhetene som mottar post å styre tilgang til egen post, og formidle denne videre inn i sin organisasjon, enten via automatiske og maskinell integrasjon med Altinn eller tilgang i Altinn meldingsboks.

## Overordnet funksjonalitet

![DPV funksjonalitet](dpv-funksjonalitet.png?width=700)

Altinn har utviklet et ferdig sett med Meldingstjenester til bruk i DPV. Dette er fellestjenester som alle avsendere av DPV kan benytte uten noen form for tjenesteutvikling på forhånd. Det er foreløpig utviklet 10 ulike Meldingstjenester innenfor ulike tjenesteområder, inkludert en generell kategori:

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

## Funksjonalitet og grensesnitt
For mer utfyllende og generell dokumentasjon på de tekniske grensesnittene se [Tjenesteeier](../tjenesteeier/), som gir informasjon om alle Altinn Web Services grensesnitt samlet.

Det tilbys både grensesnitt på Batch og Web Services. Vi anbefaler å benytte Web Services fremfor Batch-grensesnitt. Man må uansett benytte Web Services grensenitt for å hente status på sendte meldinger.

### Aktuelle grensesnitt Web Service for avsendere

{{% notice note %}}Endepunktene for virksomhetssertifikat under er nye endepunkt ifm DPV, der avsender kun autentiseres med gyldig virksomhetssertifikat, som valideres mot gyldige tjenesteeiere i Altinn. Om man velger å benytte Soap 1.1 eller 1.2 har ingen praktiske forskjeller uten det rent tekniske. Det er utviklet en ny Status Web Service for de som ønsker å hente inn inntil 10.000 status basert på ExternalShipmentReference fra operasjonen InsertCorrespondence (send post).
{{% /notice %}}



#### Send post
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

#### Hent Status på Post (Alternativ 1 - anbefalt)

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

#### Hente Status på Post (Alternativ 2):

-   SOAP 1.1  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalBasic.svc  
Operasjon:GetCorrespondenceStatusDetailsBasicV3
-   SOAP 1.2  
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternal.svc  
Operasjon:GetCorrespondenceStatusDetailsV3
-   Virksomhetssertifikat   
https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalAEC.svc  
Operasjon:GetCorrespondenceStatusDetailsAECV3

#### Bruk av Web Services samt virksomhetssertifikat

For de Avsendere som ikke velger å benytte Virksomhetsertifikat må det utstedes brukernavn+passord som i dag på Tjenesteeier grensesnitt (WS). Dette gis ut ifb. avtaleinngåelse om bruk av DPV.

Når det gjelder bruk av Virksomhetssertifikat: På de nye Web Servicene til DPV, er disse satt opp slik at det holder å være registrert som brukere av DPV ("inngått avtale") med org.nr, som må matche virksomhetssertifikatet. Altinn trenger altså ikke noe annet fra Avsender enn en DPV avtale, og at Avsender er registrert i Altinn. Altinn trenger f.eks. ikke noe nøkkelinformasjon fra selve Virksomhetssertifikatet.

#### Behov for test og testmiljø

Altinns testmiljø https://tt02.altinn.no/ kan benyttes for Avsendere som har behov for dette. Testbrukere (sluttbrukere og sluttbruker-organisasjon i meldingsboksen) gis ut til de som trenger dette, slik at man kan sjekke mottak av post i dennes meldingsboks.

I møtet på mandag kom vi fram til at istedenfor at alle som vil teste i TT02 må bestille sine egne test sertifikater så kjøpes det inn fem som vi eier og kan låne ut til de som trenger det. Avsender sertifikat kan deles så lenge de har egne mottakerbedrifter som de kan sende til og sjekke resultater.

Det er slik at hvis nye Avsendere skal teste DPV i TT02, og velger å benytte Virksomhetssertifikat, må de i dag benytte det settet Altinn har av test-virksomhetsertifikat. Avsender trenger altså ikke bestille egne testsertifikat. TT02 inneholder ikke reelle organisasjoner, og det er en forutsetning at en org (med Virk.sert) er registrert i ER og hos utsteder. Inntil dette er løst tverrsektorielt (det er pågående tiltak for samkjøring av testbrukere/testdata på tvers av offentlige fellesløsninger), kan Altinn låne ut Avsender-virksomhetsertifikat for TT02.

#### Varsel og Revarsel

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

### Ny og spesifikk funksjonalitet for DPV utover vanlig meldingsfunksjonalitet

DPV er bygget på den ordinære meldingsfunksjonalitet i Altinn, men med noen få tillegg. Informasjon om bruk av varsler, detaljer om parametere, etc er beskrevet i [Tjenesteeier dokumentasjon](../tjenesteeier/#innhold).

For operasjonen InsertCorrespondenceBasicV2[...], så er denne ikke versjonert til tross for ny DPV-funksjonalitet, siden det kun er en ny opsjonell parameter i request, og operasjonen er ellers kompatibel med eksisterende implementasjoner.

#### Sende på vegne av andre organisasjoner, ny parameter "OnBehalfOfOrgNr"

Denne benyttes hvis man skal sende på vegne av en annen organisasjon. Organisasjonsnummeret må være et valid orgnr, som er en ordinær tjenesteeier eller har DPV-avtale med Altinn (En automatisk validering på om orgnr i "OnBehalfOfOrgNr" faktisk er en Tjenesteeier gjøres ikke p.t.). "OnBehalfOfOrgNr" er også knyttet til parameter "MessageSender ", se mer om dette under. "MessageSender" er et fritekstfelt/parameter som kan benyttes for å angi en mer brukerorientert tekst for Sluttbruker hvem som er avsender av Post. F.eks. om det er behov for å angi at Post kommer fra et spesielt kontor/avd/bydel innenfor en organisasjon.

-   Man kan fortsatt benytte MessageSender som idag uten InsertOnBehalfOfOrgNr. Da vil oppførsel være som tidligere. MessageSender kan angi et mer fritekst- og brukerorientert navn på avsender innnenfor en organisasjon.
-   Når man benytter InsertOnBehalfOfOrgNr, så kan man utelate parameter MessageSender hvis ønskelig, da vil Altinn oppi navnet til OrgNr som MessageSender i portalen for brukeren.
-   Man kan benytte MessageSender OG InsertOnBehalfOfOrgNr, men da vil brukeren se det som er oppgitt i Messagesender. Altinn vil registrere hvem som er den faktiske avsender av Post i tillegg til den tekniske avsender.
-   OnBehalfOfOrgNr skal uansett benyttes hvis man sender på vegne av andre organisasjoner, slik at vi får registrert faktiske avsendere og bruken av DPV.

#### Hent Status på sendt Post

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


### Eksempelfiler

#### InsertCorrespondenceBasicV2

*Merk*: XML parametere som er kommentert bort er tatt med for informasjon om muligheter for funksjonalitet utover kun bruk av DPV.

For detaljert informasjon om de ulike parameterene, se [eget kapittel i integrasjonsguiden for tjenesteeiere] (/docs/guides/integrasjon/tjenesteeiere/webservice/#insertcorrespondencev2)

REQUEST:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.altinn.no/services/ServiceEngine/Correspondence/2009/10" xmlns:ns1="http://schemas.altinn.no/services/ServiceEngine/Correspondence/2010/10" xmlns:ns2="http://www.altinn.no/services/ServiceEngine/ReporteeElementList/2010/10" xmlns:ns3="http://schemas.altinn.no/services/ServiceEngine/Correspondence/2009/10" xmlns:ns4="http://schemas.altinn.no/services/ServiceEngine/Notification/2009/10" xmlns:ns5="http://schemas.altinn.no/services/ServiceEngine/Correspondence/2016/02">
   <soapenv:Header/>
   <soapenv:Body>
      <ns:InsertCorrespondenceBasicV2>
<!-- Brukernavn + passord hvis dette skal benyttes fremfor Virksomhetssertifikat -->
         <ns:systemUserName>...</ns:systemUserName>
         <ns:systemPassword>...</ns:systemPassword>

<!-- En unik egenreferanse til Meldingen. benyttes for asynkront Statusoppslag.
Datatypen er string, og må inneholde en unik identifikator for meldingen. Må tas vare på for senere asynkrone Statusoppslag for enkeltmeldinger.
Identifikatoren blir også returnert i synkron SOAP respons
 -->
        <ns:ExternalShipmentReference>EXT_REF${=(int)(Math.random()*100000)}</ns:ExternalShipmentReference>
        <ns:Correspondence>
<!-- Angir en av de standard Meldingstjeneste for DPV 4255 - 1-10 Felles meldingstjeneste (eid av ASF)-->        
            <ns1:ServiceCode>4255</ns1:ServiceCode>
            <ns1:ServiceEdition>10</ns1:ServiceEdition>
<!-- Orgnr til mottager -->
            <ns1:Reportee>910820605</ns1:Reportee>
            <ns1:Content>
               <ns1:LanguageCode>1044</ns1:LanguageCode>             
               <ns1:MessageTitle>Tittel på Melding</ns1:MessageTitle>
              <ns1:MessageSummary>MessageSummary legges inn her hvis ønskelig</ns1:MessageSummary>
              <ns1:MessageBody>Meldingsbrødtekst legges inn her</ns1:MessageBody>

<!-- Vedlegg til Post -->              
              <ns1:Attachments>
<ns1:BinaryAttachments>
				 <ns2:BinaryAttachmentV2>
				 <!-- PortalOnly | EndUserSystemOnly | Default  -->
  				 <ns2:DestinationType>Default</ns2:DestinationType>
 				 <ns2:FunctionType>Unspecified</ns2:FunctionType>
  				 <ns2:FileName>Test1-Hoved.pdf</ns2:FileName>
 				 <!-- Name er navn på vedlegg i portalvisningen: -->
 				 <ns2:Name>Test1-Hoved.pdf</ns2:Name>
 				 <ns2:Encrypted>false</ns2:Encrypted>
 				 <ns2:Data> ... Base64 encode ...</ns2:Data>
 				 <!-- Unik referanse for Vedlegget, ikke påkrevet  -->
 				 <ns2:SendersReference>SEND_REF${=(int)(Math.random()*100000)}</ns2:SendersReference>
 				 </ns2:BinaryAttachmentV2>
 			 </ns1:BinaryAttachments>  
               </ns1:Attachments>

<!--
Dette er data som kun kan leses via Integrasjonsgrensesnitt Sluttbrukere.
Benyttes ikke av noen avsendere i dag, men er et 'fritekst'-felt for avsender og som kan f.eks inneholde metadata for sluttbrukers IKT-løsninger, hvis behov for dette.
Opsjonelt.
-->
 	 <ns1:CustomMessageData>Dette er customMessagedata fra TTD<![CDATA[<para>check</para>]]></ns1:CustomMessageData>
            </ns1:Content>
<!-- Når skal Melding synliggjøres for Sluttbruker. Tid kan settes i fremtiden. Hvis man setter tidspunkt i fortid blir meldingen tilgjengelig øyeblikkelig   -->
            <ns1:VisibleDateTime>2011-07-01</ns1:VisibleDateTime>

<!--
Følgende er ikke parametere som benyttes i DPV, men for dialogtjenester i ordinære meldingstjenester
- angir når Altinn kan slette meldingen (blir ikke benyttet),
- frist for å lese Meldingen  
- referanse til et tidligere arkivert element i Altinn, f.eks et tidligere innsendt skjema
-->
<!--
            <ns1:AllowSystemDeleteDateTime>2011-12-30</ns1:AllowSystemDeleteDateTime>
            <ns1:DueDateTime>2015-12-30</ns1:DueDateTime>
            <ns1:ArchiveReference>ArcRef${=(int)(Math.random()*100000)}</ns1:ArchiveReference>

 <ns1:ReplyOptions>
               <ns3:ReplyOption>
                  <ns3:Service>
                     <ns3:ServiceCode>?</ns3:ServiceCode>
                     <ns3:ServiceEdition>?</ns3:ServiceEdition>
                  </ns3:Service>
                  <ns3:ArchiveReference>
                     <ns3:ArchiveRef>?</ns3:ArchiveRef>
                  </ns3:ArchiveReference>
                  <ns3:URL>
                     <ns3:LinkText>Sjekk denne URL lenken</ns3:LinkText>
                     <ns3:LinkURL>https://qaoffentlig.digipost.no</ns3:LinkURL>
                  </ns3:URL>
               </ns3:ReplyOption>
  </ns1:ReplyOptions>
-->


<!--- ***********  Varsel **************** -->
          <!--
               3 språkvalg:
               1044 NorwegianNO
               2068 NorwegianNN
               1033 English

               Maler som kan benyttes fritt i DPV:
               VarselDPVUtenRevarsel = 1 token
               VarselDPVMedRevarsel = 1 token, 7 dager
                -->


<ns1:Notifications>
               <ns4:Notification>
                  <ns4:FromAddress>TTD@brreg.no</ns4:FromAddress>
<!--  Når skal varsel sendes  -->
                  <ns4:ShipmentDateTime>2015-12-15</ns4:ShipmentDateTime>
<!-- Hvilken språkvariant av Varselsmal skal benyttes  -->
                  <ns4:LanguageCode>1044</ns4:LanguageCode>
<!--  Her angis hvilken mal som ønskes benyttes:  -->                  
                  <ns4:NotificationType>VarselDPVMedRevarsel</ns4:NotificationType>
<!-- Tekst token som skal erstatte Token i Varselsmal. -->
                  <ns4:TextTokens>
                     <ns4:TextToken>
                        <ns4:TokenNum>1</ns4:TokenNum>
                        <ns4:TokenValue>Varsel ang sak X er er klar</ns4:TokenValue>
                     </ns4:TextToken>
                  </ns4:TextTokens>
                  <ns4:ReceiverEndPoints>
                     <ns4:ReceiverEndPoint>
<!-- Angir hvilke varselskanaler som skal benyttes -->
                        <ns4:TransportType>Email</ns4:TransportType>
                        <!-- <ns4:ReceiverAddress>Hvis denne angis spesifikt vil ikke Altinn hente ut og benytte kontaktinformasjon som er registrert på Virksomheten</ns4:ReceiverAddress> -->
                     </ns4:ReceiverEndPoint>
  <ns4:ReceiverEndPoint>
                        <ns4:TransportType>SMS</ns4:TransportType>
                       <!-- <ns4:ReceiverAddress>Hvis denne angis spesifikt vil ikke Altinn hente ut og benytte kontaktinformasjon som er registrert på Virksomheten</ns4:ReceiverAddress> -->
                     </ns4:ReceiverEndPoint>
                  </ns4:ReceiverEndPoints>
               </ns4:Notification>
            </ns1:Notifications>

<!-- Mulig å videresende meldingen til en e-post adresse om angitt i valgfri parameter
AllowForwarding.
Er denne satt til true vil bruker kunne sende meldingen videre som en e-post fra portalen.
Om ikke satt settes den til standardverdi som er True  -->
            <ns1:AllowForwarding>true</ns1:AllowForwarding>

<!-- Brukes kun for tjenestetypen Samhandlingstjenester i Altinn <ns1:CaseID>?</ns1:CaseID> -->

<!--  
MessageSender parameter kan benyttes hvis behov for å overstyre overfor sluttbruker hvem som er avsender.
Hvis MessageSender ikke angis spesifikt, vil Altinn benytte avsenders orgnr som utgangspunkt og angi det orgnavn som er registrert i Enhetsregisteret overfor sluttbruker.
Se også parameter OnBehalfOfOrgNr, som benyttes som utgangspunkt overfor bruker hvis angitt.
Merk at MessageSender kun er et tekstfelt som benyttes overfor sluttbruker, den faktiske avsender og evt OnBehalfOfOrgNr registreres alltid i Altinn.
 -->
<ns1:MessageSender>Testdept avdeling for småsaker</ns1:MessageSender>


<!-- Benyttes kun for privatpersoner, og skal ikke benyttes for virksomheter
Kan benyttes hvis man benytter Altinn til å sende Post både til virksomheter og privatpersoner (Altinn kan videresende til DPI)
            <ns1:IsReservable>1</ns1:IsReservable>
-->

<!-- Benyttes kun til videresending til DPI, hvis man sender Post til privatpersoner og skal benytte Videresendingsfunksjonalitet i Altinn
SdpOptions:Hvis ikke denne angis gjelder default funksjonalitet i Altinn (ingen videresending til DPI)

Represents data that are used as input to insert correspondence,
to control how it will forward the correspondence to a secure digital mailbox.

* BackupAltinn [optional, nillable] type boolean
Gets or sets a value indicating whether the correspondence should be stored in Altinn instead, if the reportee do not have a digital mailbox. The default value is "true".

* PrimaryDocumentFileName [nillable] type string
Summary: Gets or sets the name of the file to be used as the primary document in the digital letter.
The file name must exist in the list of attachments in the binary attachments list in the insert correspondence request.

* SdpSetting: { 'ForwardOnly', 'CopyAltinn' }
Summary: Gets or sets a value that controls whether Altinn should have a copy of the correspondence.


Sum-scenario ved masseutsendelser:
c) => Ihht Digitaliseringsrundskrivet, Post mottas kun i SDP, men havner i Altinn hvis bruker ikke har valgt postkasse
d) Dobbellagring uansett om bruker har valgt postkasse eller ikke. Varsel kan da sendes sammen med Correspondence, slipper StandAlone varsling


Parametere:
a) BackupAltinn: false + SdpSetting: ForwardOnly :
b) BackupAltinn: false + SdpSetting: CopyAltinn :
c) BackupAltinn: true + SdpSetting: ForwardOnly  :
d) BackupAltinn: true + SdpSetting: CopyAltinn  :

-->
<!--
            <ns1:SdpOptions>
              <ns5:BackupAltinn>true</ns5:BackupAltinn>
               <ns5:PrimaryDocumentFileName>Test1-Hoved.pdf</ns5:PrimaryDocumentFileName>
               <ns5:SdpSetting>CopyAltinn</ns5:SdpSetting>
            </ns1:SdpOptions>
-->

<!--
Denne benyttes hvis man skal sende på vegne av en annen org.
Må være valid orgnr (tjenesteeieravtale eller DPV avtale) i Altinn.
Sluttbruker vil se org.navn til denne org som avsender, hvis den ikke er overstyrt av parameter MessageSender.

-->

<ns1:OnBehalfOfOrgNr>974760673</ns1:OnBehalfOfOrgNr>


         </ns:Correspondence>
      </ns:InsertCorrespondenceBasicV2>
   </soapenv:Body>
</soapenv:Envelope>
```

RESPONSE:

```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <InsertCorrespondenceBasicV2Response xmlns="http://www.altinn.no/services/ServiceEngine/Correspondence/2009/10">
         <InsertCorrespondenceBasicV2Result xmlns:a="http://schemas.altinn.no/services/Intermediary/Receipt/2009/10" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <a:LastChanged>2017-10-13T10:06:17.743</a:LastChanged>
            <a:ParentReceiptId>0</a:ParentReceiptId>
            <a:ReceiptHistory/>
            <a:ReceiptId>11653653</a:ReceiptId>
            <a:ReceiptStatusCode>OK</a:ReceiptStatusCode>
            <a:ReceiptText>Correspondence Saved Successfully</a:ReceiptText>
            <a:ReceiptTypeName>Correspondence</a:ReceiptTypeName>
            <a:References>
               <a:Reference>
                  <a:ReferenceTypeName>ExternalShipmentReference</a:ReferenceTypeName>
                  <a:ReferenceValue>EXT_REF76405</a:ReferenceValue>
               </a:Reference>
               <a:Reference>
                  <a:ReferenceTypeName>OwnerPartyReference</a:ReferenceTypeName>
                  <a:ReferenceValue>910646192</a:ReferenceValue>
               </a:Reference>
            </a:References>
            <a:SubReceipts i:nil="true"/>
         </InsertCorrespondenceBasicV2Result>
      </InsertCorrespondenceBasicV2Response>
   </s:Body>
</s:Envelope>
```
#### CorrespondenceStatusHistory
REQUEST:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.altinn.no/services/ServiceEngine/Correspondence/2009/10" xmlns:arr="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
   <soapenv:Header>
      <ns:SystemUserName>...</ns:SystemUserName>
      <ns:SystemPassword>...</ns:SystemPassword>
   </soapenv:Header>
   <soapenv:Body>
      <ns:CorrespondenceStatusHistoryRequest>
         <ns:CorrespondenceSendersReferences>
            <!--Liste med inntil 10000 identifikatorer melding (ExternalShipmentReference):-->
<arr:string>EXT_REF76405</arr:string>

<!--
            <arr:string>...</arr:string>
            <arr:string>...</arr:string>
            ...
-->

         </ns:CorrespondenceSendersReferences>
      </ns:CorrespondenceStatusHistoryRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

RESPONSE:

Merk: i tilfellet under er det benyttet en Varselmal som gir revarsel hvis ikke lest innen 7 dager, samt det er knyttet 2 varslingsadresser til virksomheten i kontaktregisteret for virksomheten i Altinn. Status angir hvem det er sendt varsel til samt om det er fremtidig varsel på vent (rvarsel). Videre gir denne informasjon at Melding er "Created" og evt faktisk lest "Read".
```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <CorrespondenceStatusHistoryResult xmlns="http://www.altinn.no/services/ServiceEngine/Correspondence/2009/10">
         <CorrespondenceStatusInformation xmlns:a="http://schemas.altinn.no/services/ServiceEngine/Correspondence/2016/02" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <a:CorrespondenceStatusDetailsList xmlns:b="http://schemas.altinn.no/services/ServiceEngine/Correspondence/2014/10">
               <b:StatusV2>
                  <b:CorrespondenceID>4981636</b:CorrespondenceID>
                  <b:CreatedDate>2017-10-16T12:55:30.96</b:CreatedDate>
                  <b:Notifications xmlns:c="http://schemas.altinn.no/services/ServiceEngine/Correspondence/2013/11">
                     <c:Notification>
                        <c:Recipient>Mortens+felles_kon@gmail.com</c:Recipient>
                        <c:SentDate>2017-10-16T12:55:30.983</c:SentDate>
                        <c:TransportType>Email</c:TransportType>
                     </c:Notification>
                     <c:Notification>
                        <c:Recipient>Mortens+DinKIFVirksomheten@gmail.com</c:Recipient>
                        <c:SentDate>2017-10-16T12:55:31</c:SentDate>
                        <c:TransportType>Email</c:TransportType>
                     </c:Notification>
                     <c:Notification>
                        <c:Recipient>91929394</c:Recipient>
                        <c:SentDate>2017-10-16T12:55:31.02</c:SentDate>
                        <c:TransportType>SMS</c:TransportType>
                     </c:Notification>
                     <c:Notification>
                        <c:Recipient>Mortens+felles_kon@gmail.com</c:Recipient>
                        <c:SentDate i:nil="true"/>
                        <c:TransportType>Email</c:TransportType>
                     </c:Notification>
                     <c:Notification>
                        <c:Recipient>Mortens+DinKIFVirksomheten@gmail.com</c:Recipient>
                        <c:SentDate i:nil="true"/>
                        <c:TransportType>Email</c:TransportType>
                     </c:Notification>
                     <c:Notification>
                        <c:Recipient>91929394</c:Recipient>
                        <c:SentDate i:nil="true"/>
                        <c:TransportType>SMS</c:TransportType>
                     </c:Notification>
                  </b:Notifications>
                  <b:Reportee>910820605</b:Reportee>
                  <b:SendersReference>EXT_REF76405</b:SendersReference>
                  <b:StatusChanges>
                     <b:StatusChangeV2>
                        <b:StatusDate>2017-10-16T12:55:30.943</b:StatusDate>
                        <b:StatusType>Created</b:StatusType>
                     </b:StatusChangeV2>
                     <b:StatusChangeV2>
                        <b:StatusDate>2017-10-16T13:28:38.86</b:StatusDate>
                        <b:StatusType>Read</b:StatusType>
                     </b:StatusChangeV2>
                  </b:StatusChanges>
               </b:StatusV2>
            </a:CorrespondenceStatusDetailsList>
            <a:LimitReached>false</a:LimitReached>
         </CorrespondenceStatusInformation>
         <SdpStatusInformation xmlns:a="http://schemas.altinn.no/services/ServiceEngine/Correspondence/2016/02" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <a:LimitReached>false</a:LimitReached>
            <a:SdpStatusDetailsList/>
         </SdpStatusInformation>
      </CorrespondenceStatusHistoryResult>
   </s:Body>
</s:Envelope>
```

[Tilbake til toppen](#innledning)

---
#### Vedlegg - Presentasjoner
{{%attachments title="Presentasjon DPV" pattern=".*(pptx|pdf)"/%}}

{{% children description="true" %}}
