---
title: Testing
description: Beskrivelse av hvordan man tester mappere.
toc: true
weight: 500
---

Testene til en mapper skrives i prosjektet Tests. Her ligger filen `UnitTests.cs` som skal inneholde alle filene.  
Prosjektstrukturen er som vist under.

![Testprosjekt i Visual Studio](test-project-structure-vs.png?width=400 "Testprosjekt i Visual Studio")

Testene vil benyttes av Altinn for verifikasjon og kodegjennomgang før installasjon,
så det er viktig at testene er dekkende for funksjonaliteten.
De må også kunne kjøres i TUL slik at Altinn får verifisert at de kjører feilfritt.

## Koble seg til en mapper

Når man skal skrive tester mot en mapper må disse ha en tjenestereferanse til den mapperen som skal testes,
og derfor må [referansen settes opp](../teknologi/#service-reference).  
Eksempel på adressen som skal benyttes er vist her:

http://localhost:8888/mapperservices/ttd/

Port 8888 og mapperservices må benyttes på grunn av sikkerhetsrelaterte restriksjoner i Tjenesteutviklingsløsningen (TUL).

## Skrive tester

En enhetstest er en test som kun tester en liten del eller en metode i applikasjonen.
Man bør skrive så mange tester som mulig, for å sørge for at feil blir fanget opp.
Når man har tester som feiler er det enkelt å se hvor i koden feilen ligger.

Man bør teste:

- Input data. Test formatet på data som kommer fra brukere og at det er brukt riktige verdier (tall, string, spesialtegn, dato)
- Output data. Svar som blir sendt til brukeren, bør sjekkes.
- Null-verdier. Svar som blir sendt til brukeren bør ikke inneholde null verdier. Dette kan få koden til å feile.
  Dette gjelder spesielt for noder med undernoder i datastrukturen da utviklere ofte glemmer å håndtere nullverdier på slike steder.
- Sjekk om mapperen fanger opp "Exceptions", og at brukerne får en forståelig og oversiktlig feilmelding.
- Man skal skrive [positive](#positive-tester) og [negative](#negative-tester) tester

Se også [hvordan tester skrives](../teknologi/#testrammeverk) i .NET-rammeverket.

## Positive tester

Når man lager positive tester gir man systemet korrekte data å teste med.
Dette tester såkalt «happy-path» der systemet får forventede data og da skal returnere gyldige svar. 

Eksempel på en positiv test:

```csharp
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tests.SvcRef;
using System.Text;

namespace Tests
{
    [TestClass]
    public class UnitTests
    { 
        [TestMethod]        
        public void TestGetMidlertidigKjoeretillatelse()
        {
            using (var proxy = new MapperClient())
            {
                var forespoersel = new TillatelseForespoersel()
                {
                    Fnr = "16127378945"
                };
                var respons = proxy.GetMidlertidigKjoeretillatelse(forespoersel);

                if (respons != null)
                {
                    Assert.AreEqual("Harry Hole", respons.Tillatelse.Navn);
                    Assert.IsTrue(respons.Tillatelse.Klasser.Contains("A1 "));
                    Assert.IsTrue(respons.Tillatelse.Klasser.Contains("A "));
                    Assert.IsTrue(respons.Tillatelse.Klasser.Contains("B "));
                    Assert.AreEqual("Veiveien 5", 
                                    respons.Tillatelse.Adresse.Lokasjon);
                    Assert.AreEqual(9020, 
                                    respons.Tillatelse.Adresse.Postnummer);
                    Assert.AreEqual("Tromsdalen", 
                                    respons.Tillatelse.Adresse.Poststed);
                    Assert.AreEqual("Pb 202, 9000, Tromsø", 
                                    respons.Tillatelse.Adresse.AnnenAddresse);
                }
                else throw new AssertFailedException("Ingen midlertidig " + 
                        "kjøretillatelse funnet. Sjekk om ekstern web service er " + 
                        "tilgjengelig, eller om søknad er innlevert og godkjent");
            }
        }
    }
}
```

## Negative tester

Negative tester lages for å avsløre hvordan mapper opptrer når feil/ulovlige input parametre er anvendt.
Eksempler på slike parametere kan være tekst i datofelt, negative årstall og null-verdier.

Eksempel på en negativ test der det blir sendt inn feil fødselsnummer og det forventes at tjenesten setter statusen til noe annet enn OK:

```csharp
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tests.SvcRef;
using System.Text;
using System.Reflection; 
using System.IO;

namespace Tests
{
    [TestClass]
    public class UnitTests
    { 
        [TestMethod]        
        public void TestFeilmeldingGetMidlertidigKjoeretillatelse()
        {
            using (var proxy = new MapperClient())
            {
                var assemblyPath = Assembly.GetExecutingAssembly().Location;
                var relativePath = @"..\..\..\..\Tests\ElenaFjaer.xml";
                var combinedPath = Path.Combine(assemblyPath, relativePath);
                var xml = new StreamReader(combinedPath).ReadToEnd();

                var forespoersel = new TillatelseForespoersel()
                {
                    Fnr = "12126101528",
                    AltinnMapperContext = Convert.ToBase64String(
                        System.Text.Encoding.UTF8.GetBytes(xml))
                };
                var respons = proxy.GetMidlertidigKjoeretillatelse(forespoersel);

                if (respons != null)
                {
                    Assert.AreEqual("Systemet finner ikke kjøretillatelse for "
                        + "oppgitt fødselsnummer.", respons.Status);
                }
                else throw new AssertFailedException("Ingen midlertidig for "
                    + "kjøretillatelse funnet. Sjekk om ekstern web service er for "
                    + "tilgjengelig, eller om søknad er innlevert og godkjent");
            }
        }
    }
}
```

## Dokumentere testene

Det er viktig at testene blir dokumentert. Når testen er nøye dokumentert og det er beskrevet hva som forventes av testen.
Blir det enklere å vedlikeholde testene og mapperene senere.

Legg til kommentarer på hver av testmetodene. Kommentaren bør beskrive:

- Hvilken mappertjeneste testmetoden tester.
- Beskrive hva mappertjenesten gjør.
- Beskriv hva som er hensikten med testmetoden.