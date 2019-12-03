---
title: Diverse
description: Bruk av mappere med Altinn-kontekst, REST/WCF.
toc: true
weight: 700
---


## Avanserte konsepter

### Context

I tjenestene i Altinn har man tilgang til en del informasjon om den konteksten tjenesten kjører i. 
Dette inkluderer hvilken bruker som har åpnet tjenesten, språkinnstillinger og lignende. 
I mange tilfeller er dette nyttig informasjon å overføre til bakenforliggende systemer slik at informasjon kan
filtreres basert på pålogget bruker eller virksomhet. 

En måte å overføre denne informasjonen på er å hente den ut fra skjema og sende med felter som datakontrakten. 
Ulempen med denne fremgangsmåten er at mapperen ikke kan garantere at verdiene er korrekte da tjenesteutviklere selv kan manipulere disse verdiene. 
For å hente ut verifiserbare verdier må `AltinnContext` benyttes.
Dette er en base64-encoded tekststreng som kan verifiseres i mapperen slik at ulike context-verdier kan hentes ut sikkert.

For å benytte AltinnContext i mapperen må forespørseldatakontrakten inneholde et tekstfelt for AltinnMapperContexten som vist under.

```csharp
[DataMember]
public string AltinnMapperContext;
```

Når forespørselen mottas må AltinnMapperContext lastes inn og verifiseres. 
Dette gjøres ved kall til klassen Verificator som legges i Utility.cs.

```csharp
internal class Verificator  
{
  public static bool Verify(string altinnMapperContext, 
                            out AltinnMapperContext context)
  {
    var verified = false;
    var methodName = MethodBase.GetCurrentMethod().Name;

    AsymmetricAlgorithm key = XmlSignatureUtility.GetSPICertificatePublicKey();
    verified = XmlSignatureUtility.VerifySignaturewithRSAKeyAndExtractObject(
                 altinnMapperContext, 
                 key, 
                 out context);

    if (!verified) return false;

    if (context.CurrentService.ServiceOwnerCode!= "TTD") return false;

    return true;
  }
}
```

Deretter kan mapperen aksessere innholdet på følgende måte. 
Det er kun et utvalg av verdiene som er hentet ut i eksempelet under.
Skal noen felter sjekkes som en del av verifikasjonen av tjenestekallet skal dette gjøres i Verificator-klassen.

```csharp
AltinnMapperContext context = null;

var verified = Verificator.Verify(foresporsel.AltinnMapperContext, out context);
var serviceCode = context.CurrentService.ServiceCode;
var serviceEditionCode = context.CurrentService.ServiceEditionCode;
var serviceOwnerCode = context.CurrentService.ServiceOwnerCode;
var ssn =  context.UserEntity.SSN;
var reporteeName = context.ReporteeEntity.ReporteeName;
var language = context.UserEntity.Language;
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<AltinnMapperContext xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Timestamp>2012-05-28T13:01:49.8498603+02:00</Timestamp>
  <ContextOrigin>User.Current</ContextOrigin>
  <UserEntity>
    <UserID>55315</UserID>
    <UserType>SSNIdentified</UserType>
    <Username />
    <SSN>01025801659</SSN>
    <LastName>FJÆR</LastName>
    <FirstName>ELENA</FirstName>
    <MiddleName />
    <ReporteeNumber>910457055</ReporteeNumber>
    <AuthenticatedLevel>2</AuthenticatedLevel>
    <AuthenticatedMethod>AltinnPIN</AuthenticatedMethod>
    <Language>1044</Language>
  </UserEntity>
  <ReporteeEntity>
    <ReporteeID>50121508</ReporteeID>
    <ReporteeNumber>910457055</ReporteeNumber>
    <ReporteeType>Organization</ReporteeType>
    <ReporteeName>SKÅNEVIK OG HAMRESANDEN REGNSKAP</ReporteeName>
  </ReporteeEntity>
  <CurrentService>
    <ReporteeElementID>0</ReporteeElementID>
    <ServiceOwnerCode>TTD</ServiceOwnerCode>
    <ServiceCode>2794</ServiceCode>
    <ServiceEditionCode>987</ServiceEditionCode>
    <FormID>0</FormID>
  </CurrentService>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    <SignedInfo>
      <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />
      <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
      <Reference URI="">
        <Transforms>
          <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
        </Transforms>
        <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
        <DigestValue>uDzmSNfcC97AvgXtKV1G2STIEqQ=</DigestValue>
      </Reference>
    </SignedInfo>
    <SignatureValue>O515Ufngnm11VKUawo7U/mpdWrg8n9V0nGwObwatYfjO/jSDrUM2XForcZSkC/wbSa6Ko2N+p0+iQ+RwAq/0A7ltrhlP8yfNxHSFdSIy7zDyP+80pr3Vl4RQj9ujO1QnB6DPgg0Lfdo0fg9DNcKsVwOB/MHp6Uw77MmjTOxDYQo=</SignatureValue>
    <KeyInfo>
      <KeyValue>
        <RSAKeyValue>
     <Modulus>pnWPDVG3XHlo8N69T7uAG2dLoZb93/rey3XqQJ0hmeGQpBqtdrxVrgJRfZsGbhkgY8m3Gm3g5DclI+8CvKreXDOo2bDolYIrt4+yUNJyvv6sWlMqXiotujshrasWcwuPL8op1taXV1sx22wBsm5gVAHJs91RDOBM+XIrmKWrvK8=</Modulus>
          <Exponent>AQAB</Exponent>
        </RSAKeyValue>
      </KeyValue>
    </KeyInfo>
  </Signature>
</AltinnMapperContext>
```

## Sikkerhet

### Sertifikat

Kommunikasjonen mellom en mapper i Altinn og tjenesteeier må gå kryptert via SSL eller TSL (via https).
Dette krever et gyldig sertifikat. Dersom ikke serveren har et sertifikat utstedt av en godkjent sertifikatutsteder vil WCF
avbryte operasjonen på grunn av manglende verifikasjon av sertifikatet.

### To-veis sertifikat autentisering

For å sikre overføringen av informasjon mellom mapperen og etatsystemene kan to-veis-sertifikater benyttes.
Dette skrus på ved å legge til en endpointbehavior i config-filen som skrur på clientsertifikater i mapperen. 

```xml
<configuration>
  <system.serviceModel>
    <behaviors>
      <endpointBehaviors>
        <behavior name="ECBehavior">
          <clientCredentials>
            <clientCertificate storeLocation="CurrentUser"
                                storeName="My"
                                x509FindType="FindByThumbprint"
                                findValue="3636E9BD1B32A1DA1A43E34EB8DE637289C03345"/>
          </clientCredentials>
        </behavior>
      </endpointBehaviors>
    </behaviors>
  </system.serviceModel>
</configuration>

<!-- Legges til på bindingen til tjenesten -->
<security mode="Transport">
  <transport clientCredentialType="Certificate"
             proxyCredentialType="None"
             realm="" />
</security>

<!-- Legges til som parameter på endpointet til tjenesten-->
```

Dersom to-veis sertifikater skal benyttes vil mapperen kun være testbar i TUL og ikke på lokalt utviklermiljø.
Dette skyldes at Altinn sine sertifikater ikke vil bli distribuert til brukerene.

### Overstyre sertifikat under utvikling

 Dersom ikke serveren har et sertifikat utstedt av en godkjent sertifikatutsteder vil WCF avbryte operasjonen
 på grunn av manglende verifikasjon av sertifikatet. Dette kan unngås ved å legge inn en overstyring av denne funksjonaliteten.
 Det gjøres ved å legge inn en callback på ServerCertificateValidation-verifikasjonen på ServicePointManageren.
 Merk at man bør ha gyldige sertifikater også testservere også dette bare må gjøres unntaksvis og kun under utvikling.
 Overstyring av sertifikatsjekken må ikke være med i produksjonsklar kode.

```csharp
public Mapper() 
{
  // For development purposes
  // Remove before building .MSI
   ServicePointManager.ServerCertificateValidationCallback +=
     new System.Net.Security.RemoteCertificateValidationCallback(
       delegate(object sender, 
                X509Certificate cert, 
                X509Chain chain, 
                System.Net.Security.SslPolicyErrors error)
       { return true; });
}
```

For å unngå å måtte fjerne og legge til kode kan det være et parameter i config
som skrur av eller på denne mekanismenavhengig av hvilket miljø koden kjører i.
