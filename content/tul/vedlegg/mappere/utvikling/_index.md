---
title: Utvikling
description: Beskrivelse av hvordan man utvikler en mapper.
toc: true
weight: 400
---

En mapper utvikles i prosjektet Services. Dette inneholder en WCF-tjeneste med tilhørende tjeneste- og datakontrakt. Det er støttet opptil .NET versjon 4.6 i både utviklings- og driftsmiljøet.

I tillegg er det noen støtteklasser som kan benyttes. Strukturen i prosjektet er vist under.

![Visual Studio-prosjekt](project-structure-vs.png?width=400 "Visual Studio-prosjekt")

## Kildekode og versjonskontroll

Altinn benytter Team Foundation Server med git til versjonskontroll.
De nødvendige verktøyene for å kunne sjekke inn og ut kode er tilgjengelig direkte i Visual Studio.
For å sjekke inn eller ut kode kan dette gjøres ved å høyreklikke på solution eller prosjektet og velge ulike handlinger der.

Hvordan man skal koble seg til Altinn sin Team Foundation Server er beskrevet [her](../../f/#koble-opp-mot-tjenesteeiers-tfs-prosjekt). 

En god oversikt over bruken av git i Visual Studio kan finnes [her](https://docs.microsoft.com/en-us/azure/devops/repos/git/share-your-code-in-git-vs?view=vsts) 
og dokumentasjon på git [her](https://git-scm.com/doc).



## Definere Service Contract

Det første man gjør når man skal utvikle en mapper er å definere tjenestekontrakten for mapperen.
Dette gjøres ved å opprette en Service Contract i filen `IMapper.cs`. Dette er et interface som beskriver hvilke operasjoner
som skal være tilgjengelig på tjenesten. For å angi at interfacet er en WCF-tjenestekontrakt må ServiceContract-attributtet angis.
Her må også mapperen sitt namespace angis.

Alle operasjonene som skal være tilgjengelig på tjenestekontrakten opprettes som metoder i interfacet og markeres med
attributtet OperationContract. Alle operasjoner må ta inn et forespørsel-objekt og returnere et respons-objekt.
Disse objektene må navngis med «Forespoersel» og «Respons» postfiks.

## Eksempel fra Testdepartementet

Under er det vist et eksempel på en slik tjenestekontrakt. Her defineres «GetMidlertidigKjoeretillatelse».
Denne tjenesten tar inn et forespørsel-objekt og returnerer et respons-objekt.

Eksempelkoden for testdepartementet finnes i TFS på stien `$/TTD/Mappers/Foererkort/`.

Eksempel på tjenestekontrakt:

```csharp
using System.ServiceModel;

namespace Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services
{
    [ServiceContract(Namespace = "http://www.altinn.no/mapperservices/ttd/2011/06")]
    public interface IMapper
    {
        [OperationContract]        
        TillatelseRespons GetMidlertidigKjoeretillatelse(
            TillatelseForespoersel forespoersel); 
    }
}
```

## Definere datakontrakter

All informasjon som skal overføres med WCF-tjenester må angis med datakontrakter.
Dette er vanlige kodeklasser som markeres med DataContract-attributter. Klassene skal ligge i filen `Transfer.cs`.
Variabler med DataMember-attributter angir data som skal overføres. Det er fullt mulig å angi komplekse datastrukturer
ved å opprette hierarkiske datakontrakter.
Forespørsler skal navngis med Forespoersel-postfiks og Respons-objekter med Respons-postfiks, og det er en begrensning
på maks 2MB overført data per kall.

## Eksempel fra Testdepartementet

Testdepartementet sin tjeneste mottar et TillatelseForespoersel-objekt som angir fødselsnummeret
for den brukeren som skal hamidlertidig kjøretillatelse. 

```csharp
using System.Runtime.Serialization;

namespace Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services
{
    [DataContract]
    public class TillatelseForespoersel
    {
        [DataMember]
        public string Fnr;
    }
}
```

Når forespørselen om midlertidig kjøretillatelse er behandlet returneres det et respons-objekt som vist under.
Dette inneholder et tillatelse-objekt og en tekststreng som viser statusen på tillatelsen. Tillatelse-objektet inneholder igjen en Adresse.
På denne måten kan dataene struktureres på en intuitiv måte slik at skjemautviklerene lett kan presentere informasjonen.

```csharp
using System.Runtime.Serialization;

namespace Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services
{
    [DataContract]
    public class TillatelseRespons
    {
        [DataMember] public Tillatelse Tillatelse;
        [DataMember] public string Status;
    }

    [DataContract]
    public class Tillatelse
    {
        [DataMember] public string Fnr;
        [DataMember] public string Navn;
        [DataMember] public string Godkjent;
        [DataMember] public string Utloper;
        [DataMember] public Adresse Adresse;
        [DataMember] public string Klasser;
    }

    [DataContract]
    public class Adresse
    {
        [DataMember] public string Lokasjon;
        [DataMember] public int Postnummer;
        [DataMember] public string Poststed;
        [DataMember] public string AnnenAddresse;
    }
}
```

## Koble til etat-systemet

Når man skal koble seg til et etatsystem fra en mapper må denne ha en tjenestereferanse til den tjenesten som skal benyttes.
Referansen settes opp ved å [følge oppskriften](../teknologi/#service-reference). Adressen avhenger av etatsystemet men kan for eksempel se slik ut:

https://altetat.brreg.no/ttd-war/PortalServices

Når man kobler seg til etatsystemet vil Visual Studio oppdatere app.config med en del konfigurasjon.
Denne konfigurasjonen må også legges til i de konfigurasjonsfilene som installeres på Altinn sine servere.

## Datakonvertering

En mapper er i sin enkleste form tilgjengeliggjøring av en etat-tjeneste som en tjeneste i Altinn.
For at informasjon skal kunne flyte gjennom mappere må det derfor konverteres mellom mapperens og etatsystemenes datakontrakter.

Konverteringen må settes opp fordi det ikke er ønskelig at tjenesteeier sine datakontrakter benyttes som datakontrakter for mapperen.
Ved å separere kontraktene på denne måten sikrer man at endringer i tjenesteeier sine kontrakter ikke påvirker mapperene sine kontrakter
og dermed også skjemaene i Altinn.

Det andre aspektet er at det å benytte etatens kontrakter som mapperenes kontrakter er uheldig og komplisert.
Noen etatsystem tilgjengeliggjør sine tjenester med svakt typet data.
Dette er i noen tilfeller nødvendig på grunn av etatsystemets funksjonalitet eller tekniske begrensninger eller krav.
Dette er noe som bør unngås dersom det ikke er spesielle årsaker for siden det da kan komplisere utvikling og testing av mapperen.

Konverteringen gjøres i filen Utility.cs. Her må det implementeres en klasse som heter `Converter`.
Denne klassen inneholder et sett med convert-metoder som konverterer mellom de ulike datakontraktene.

```csharp
using System;
using System.Text;

namespace Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services
{
    internal class Converter
    {
        public static Tillatelse Convert(tillatelseVO vo)
        {
            if (vo != null)
                return new Tillatelse()
                {
                    Fnr = vo.fnr,
                    Navn = vo.navn,
                    Godkjent = vo.godkjent,
                    Utloper = vo.utloeper,
                    Adresse = Convert(vo.adresseVO),
                    Klasser = Convert(vo.korttyper)
                };
            else return null;
        }

        public static Adresse Convert(adresseVO vo)
        {
            if (vo != null)
                return new Adresse()
                {
                    Lokasjon = vo.lokasjon,
                    Postnummer = vo.postnummer,
                    AnnenAddresse = vo.annenAdresse,
                    Poststed = vo.poststed
                };
            else return null;
        }
    }
}
```

## Implementere mappertjenesten

Selve implementasjonen av mappere gjøres i Mapper.cs. Her er klassen Mapper som implementerer tjenestekontrakten `IMapper`. 
Eksempelet under viser en enkel implementasjon av en mapper. Her er blant annet logging utelatt. 

```csharp
using System;
using System.ServiceModel;
using Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services.SvcRef;
using System.Configuration;
using System.Net;

namespace Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services
{
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall, 
        Namespace = "http://www.altinn.no/mapperservice/ttd/2011/06")]
    public class Mapper : IMapper
    {        
        public TillatelseRespons GetMidlertidigKjoeretillatelse(
            TillatelseForespoersel forespoersel) 
        {
            var respons = new TillatelseRespons();
            using (var proxy = new PortalServicesClient())
            {
                try
                {
                    var vo = proxy.getMidlertidigKjoeretillatelse(forespoersel.Fnr);
                    respons.Tillatelse = Converter.Convert(vo);
                    respons.Status = "OK";
                }
                catch (Exception ex)
                {
                    respons.Status = "Web Service call failed, " + 
                        "please contact administrator";
                }
            }
            return respons;
        }
    }
```

Over er det brukt noen syntaks-elementer som er særegent for .NET. Dette er typen `var` og block-statementet `using`.

Typen `var` er en uspesifisert variabeltype som kompilatoren bytter ut med korrekt type under kompilering.
Under er det vist to kodelinjer som resulterer i samme kompilerte kode. Linje nummer to benytter var-typen.
Som det vises av eksempelet gjør var at utvikleren ikke trenger å spesifisere type-informasjonen to ganger.
Var er altså kun syntaktisk sukker som gjør utviklingen enklere.

```csharp
// Eksplisitt angitt type
TillatelseRespons respons = new TillatelseRespons();

// Bruk av var.
var respons = new TillatelseRespons();
``` 

Blockstatementen using benyttes for å sikre at begrensede ressurser frigis etter bruk.
Dette er også kun syntaktisk sukker som sikrer at Dispose-metoden blir kalt etter at en ressurs er benyttet.
To ekvivalente eksempler er vist under.

```csharp
// Eksplisitt frigjøring av begrensede ressurser.
var proxy = new PortalServicesClient();
proxy.getMidlertidigKjoeretillatelse(forespoersel.Fnr);
proxy.Dispose();

// Frigjøring av begrensede ressurser ved bruk av using.
using (var proxy = new PortalServicesClient())
{
    proxy.getMidlertidigKjoeretillatelse(forespoersel.Fnr);
}
```

## Logging

For å kunne overvåke og feilsøke mapperen under utvikling og i produksjon er det viktig at den logger viktige hendelser.
Dette inkluderer tjenestekall og feilsituasjoner. Gode logger gjør det enklere å få innsikt i tilstand og ytelse,
samt identifisere feilen dersom det skulle oppstå problemer.

Logging gjøres ved bruk av klassen Trace som er standardfunksjonalitet i .NET-rammeverket.
Her kan man spesifisere ulike typer logginnslag gjennom bruk av metodene TraceInformation, TraceWarning og TraceError.
Metodene funger likt, men vil markere logginnslaget med ulik alvorlighetsgrad. Hver mapper har sin egen loggfil.

For å skru på at Trace skal logges må dette konfigureres i tjenestens config-fil. Dette gjøres som vist under.

```xml
<?xml version="1.0"?>
<configuration>
  <system.diagnostics>
    <trace autoflush="true">
      <listeners>
        <add name="MapperListener"
             type="System.Diagnostics.TextWriterTraceListener"
             initializeData="Trace.csv" />
      </listeners>
    </trace>
  </system.diagnostics>
</configuration>
```

Metoden TraceInformation kan brukes på ulike måter. Under er tre eksempler som bygger opp en formatert streng som viser dagens dato:

```csharp
var message = "Dagens dato er " + DateTime.Now.ToString();
Trace.TraceInformation(message);

var format = "Dagens dato er {0}";
Trace.TraceInformation(format,DateTime.Now);

var formattedMessage = string.Format(format, DateTime.Now)
Trace.Traceinformation(formattedMessage);
```

I mappere bør man benytte standard oppsett på logginnslagene slik at det er lett å lese loggene i etterkant.

Et forslag til slikt format er gitt i eksempelet. Her er det fire parametere som benyttes.

 - Det første angir tidspunktet for logginnslaget.
 - Det neste viser kilden i form av metodenavnet.
 - Deretter følger type innslag og verdien.
 
 Når man leser loggen kan man da velge å filtrere på ulike typer kilder, innslagstyper og dato.

```csharp
// Her hentes informasjon om starttidspunkt og metode som kalles.
// Dette gjøres tidlig i metoden.
DateTime start = DateTime.Now;
string methodName = MethodBase.GetCurrentMethod().Name;

// Her logges en feilmelding med Trace.TraceError. 
// Det som logges er: tidspunktet, metodenavn og feilmelding.
// Dette gjøres for alle feilmeldinger som kommer i metoden.
Trace.TraceError(string.Format(";{0};{1};{2};{3}", Clock.GetTimestamp(), methodName, "Exception", ex.Message));

// Her logges en fullført tjenestekall med Trace.TraceInformation. 
// Det som logges er: tidspunkt, metodenavn og varighet
// Dette gjøres på slutten av alle tjenester
Trace.TraceInformation(string.Format(";{0};{1};{2};{3}", Clock.GetTimestamp(), methodName, "Duration", (DateTime.Now - start).TotalMilliseconds));
```

I eksempelet er logging inkludert i mapperimplementasjonen.
Her logger man alle tjenestekall som gjøres, samt logger alle feilmeldinger som kastes dersom etatsystemet returnerer feil.

```csharp
using System;
using System.ServiceModel;
using Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services.SvcRef;
using System.Diagnostics;
using System.Configuration;
using System.Net;
using Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services.SvcSecRef;

namespace Altinn.SBL.ServiceEngine.LookUp.Mappers.TTD.Services
{
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall, 
        Namespace = "http://www.altinn.no/mapperservice/ttd/2011/06")]
    public class Mapper : IMapper
    {        
        public TillatelseRespons GetMidlertidigKjoeretillatelse(
            TillatelseForespoersel forespoersel) 
        {
            DateTime start = DateTime.Now;
            TillatelseRespons respons = new TillatelseRespons();
            string methodName = MethodBase.GetCurrentMethod().Name;

            using (var proxy = new PortalServicesClient())
            {
                try
                {
                    var vo = proxy.getMidlertidigKjoeretillatelse(forespoersel.Fnr);
                    respons.Tillatelse = Converter.Convert(vo);
                    respons.Status = "OK";
                }
                catch (Exception ex)
                {
                    Trace.TraceError(string.Format(";{0};{1};{2};{3}",        
                        Clock.GetTimestamp(), methodName, 
                        "Exception", ex.Message));
                    respons.Status = "Web Service call failed, " + 
                        "please contact administrator";
                    }
                }
            }
            else
            {
                respons.Status = "Context verification failed, " + 
                    "please contact administrator";
            }
            Trace.TraceInformation(string.Format(";{0};{1};{2};{3}",                
                Clock.GetTimestamp(), methodName, "Duration", 
                (DateTime.Now - start).TotalMilliseconds));
            return respons;
        }
    }    
```

I eksempelet over fanges alle feilmeldinger med den generelle try-catchen for Exception.
Dette vil sikre at det ikke lekker feil ut fra denne kodeblokken, men det vil samtidig skjule verdifull informasjon fra feilloggen.
Det kan derfor være lurt å skille på ulike feil slik at man får et mer differensiert bilde av hva som går feil hvis det skulle inntreffe.

En try-catch-sekvens fungerer slik at feilen vil fanges i den første catchen som dekker den aktuelle feilen.
Rekkefølgen må derfor være fra mest til minst spesifikk.
Et anbefalt minimum er sekvensen FaultException, CommunicationException, TimeoutException og til slutt Exception
for å fange alle overskytende feilmeldinger.

```csharp
try
{
  // Utfør kall til tjensteeier sine system.
}
catch (FaultException ex)
{
  Trace.TraceError(string.Format(";{0};{1};{2};{3}",        
    Clock.GetTimestamp(), methodName, 
    "FaultException", ex.Message));
}
catch (CommunicationException ex)
{
  Trace.TraceError(string.Format(";{0};{1};{2};{3}",        
    Clock.GetTimestamp(), methodName, 
    "CommunicationException", ex.Message));
}
catch (TimeoutException ex)
{
  Trace.TraceError(string.Format(";{0};{1};{2};{3}",        
    Clock.GetTimestamp(), methodName, 
    "Exception", ex.Message));
}
catch (Exception ex)
{
  Trace.TraceError(string.Format(";{0};{1};{2};{3}",        
    Clock.GetTimestamp(), methodName, 
    "Exception", ex.Message));
}
```

## Rammeverk for fellesfunksjonalitet

En mapper har tilgang til en del fellesfunksjonalitet. Dette er samlet i Altinn.Common.dll.
Denne må legges til i Services-prosjektet som en assembly-referanse.
Den samme prosessen må gjøres for to andre assemblys som Altinn.Common er avhengig av.
Assemblyene ligger på følgende plassering i versjonskontrollsystemet:

- $/Common/&lt;siste tilgjengelige versjon&gt;/lib/Altinn.Common.dll
- $/Common/Frameworks/entlib/4.1/bin/Microsoft.Practices.EnterpriseLibrary.Common.dll
- $/Common/Frameworks/entlib/4.1/bin/Microsoft.Practices.EnterpriseLibrary.Logging.dll

## Konfigurasjonsparametere

Dersom man har spesielle konfigurasjonsparametere man ikke ønsker å kode inn i en mapper, 
men heller tilgjengeliggjøre i konfigurasjonsfiler kan dette gjøres ved bruk av AppSettings-seksjonen i konfigurasjonsfilen. 
Dette er et enkelt «key-value» oppsett der man kan angi verdier som kan hentes ut basert på en oppslagsverdi i koden.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <appSettings>
    <add key="MyKey" value="MyValue"/>
  </appSettings>
</configuration>
```

For å hente ut igjen slike verdier benyttes ConfigurationManager:

```csharp
var value = ConfigurationSettings.AppSettings["MyKey"];
```







