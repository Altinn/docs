---
title: Eksempler
description: Eksempler på request og respond.
toc: true
weight: 60
---

## InsertCorrespondenceBasicV2

*Merk*: XML parametere som er kommentert bort er tatt med for informasjon om muligheter for funksjonalitet utover kun bruk av DPV.

For detaljert informasjon om de ulike parameterene, se [eget kapittel i integrasjonsguiden for tjenesteeiere](/docs/guides/integrasjon/tjenesteeiere/webservice/#insertcorrespondencev2)

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
### CorrespondenceStatusHistory

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

## Presentasjon

{{%attachments title="Presentasjon DPV" pattern=".*(pptx|pdf)"/%}}
