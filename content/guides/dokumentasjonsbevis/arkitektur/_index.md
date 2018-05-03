---
title: Arkitektur
description: Hvordan Nadobe er realisert
weight: 40
---

{{% notice info %}}
Dette er levende dokumentasjon (under arbeid) for NADOBE - Nasjonal Tjeneste for Dokumentasjonsbevis
{{% /notice %}}

## Azure serveroppsett og roller
Azure-komponenter som tilbyr PaaS-funksjonalitet er foretrukket for å i størst mulig grad forenkle forvaltning av tjenesten. Det legges opp til bruk av function apps og API-fasade implementert via [function proxies](https://docs.microsoft.com/en-us/azure/azure-functions/functions-proxies). APIet skal wrappes med Azure API Management for å håndtere autentisering, throttling og routing til ulike støttede versjoner av APIet.

Et "tradisjonelt" Linux VM blir benyttet for Oxalis / Ringo.

## NADOBE Core
"Kjernen" av tjenesten eksponerer et offentlig REST API som er offentlig tilgjengeling (men fremdeles er gjenstand til autorisasjon). De ulike delene av APIet vil bli implementert av forskjellige C# functions som en microservice arkitektur. Dette legger til rette for løsere koblinger mellom kode, som gjør testing, endring og vedlikehold enklere, samt muliggjør mindre deploys på en mer fleksibel måte.

De ulike beviskodene implementeres også ved hjelp av separate functions som ligger i uavhengige repositories og som i teorien vil kunne utvikles av tredjeparter. Aksessering av selve datakildene abstraheres via en egen function, hvor URI, autentiseringsdata, og andre innstillinger (caching, retries, custom headers etc) oppgis som parametre. Ulike patterns for å håndtere ulik grad av forventet oppetid, f.eks. [circuit breaker](https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker), skal også kunne spesifiseres for å overstyre en fornuftig og defensiv default.

NADOBE Core vil bestå av følgende Azure komponenter:

<div style="width: 100%; height: 800px; margin: 10px 0; position: relative;"><iframe allowfullscreen frameborder="0" style="width:100%; height:800px" src="https://www.lucidchart.com/documents/embeddedchart/b2f665fe-1bae-4631-b099-d9be0db8cc80" id="ipBglfLMcFS5"></iframe></div>

### Azure API Management
* Autentisering av klient sertifikat
* Namespaces for ulike versjoner av APIet
* Router alle requests til RequestHandler

### Function Proxy: RequestHandler
* Fasade til API - alle kall vi gå gjennom denne
* Routing av URL til rett function

### Function: Accreditation
* Håndterer kall til /authorization og /accreditations
* Utfører validering av input, bl.a. sjekk av legal basis
* Oppretter og returnerer akkrediteringer

### Function: EvidenceStatus
* Håndterer kall til /evidence/{accreditationId}
* Henter oppgitt akkreditering, og sjekker status på alle beviskoder

### Function: EvidenceHarvester
* Håndterer kall til /evidence/{accreditationId}/{evidenceCode}
* Sjekker tilgangstatus for oppgitt beviskode
* Gjør oppslag i tilhørende function(s) for oppgitt beviskode

### Function: Metadata
* Håndterer kall til /evidence, /evidence/statuscodes, /errorcodes
* Utfører ikke autorisasjon
* Metadata-tjeneste til hjelp for konsumenter tjenesten

### Function: Authorization
* Støttefunksjon, kan kun kalles fra andre functions via HTTP grensesnitt
* Autorisasjon av orgnr i oppgitt virksomhetssertifikat
* Benyttes av alle functions foruten metadata

### Function: LegalBasisValidator
* Støttefunksjon, kan kun kalles fra andre functions via HTTP grensesnitt
* Tar en authorization request, og sjekker om evt. oppgitt legal basis er dekkende for de beviskoder som refererer dem

### Function: ConsentStatus
* Støttefunksjon, kan kun kalles fra andre functions via HTTP grensesnitt
* Sjekker status på samtykke for en gitt akkreditering

### Function: ConsentInitiator
* Støttefunksjon, kan kun kalles fra andre functions via HTTP grensesnitt
* Initierer en samtykkeforespørsel utfra en akkreditering (hvis en ikke allerede eksisterer)
* Instansierer en meldingstjeneste for å varsle om samtykkeforespørselen

### Function: ExternalSourceCaller
* Støttefunksjon, kan kun kalles fra andre functions via HTTP grensesnitt
* Wrapper kall til eksterne kilder
* Parameterstyres for URI, auth, headers etc
* Har fornuftige defaults for timeouts etc
* Implementerer et [circuit breaker pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker) (kan overstyres med parametre)

### CosmosDB
* Persistens av akkrediteringer og annen tilstand i en NoSQL-database

## PEPPOL
Løsningen skal støtte et eMeldingsmønster via PEPPOL.

### Oxalis
Programvaren for PEPPOL aksesspunktet er [Oxalis](https://github.com/difi/oxalis), som er basert på Apache Tomcat (Java), og kjører på en egen VM. I tillegg installeres [Ringo](https://github.com/difi/vefa-srest), som eksponerer et REST-API med bl.a. /inbox og /outbox ressurser som kan benyttes for å hende innkommende og sende utgående meldinger.

* [UML diagram som viser integrasjon mellom Ringo og Oxalis](https://www.planttext.com/plantuml/img/bLN1Zfim4Btp5IDERTNaiCTgXLQgjDrMbQecFVI673D9d0NZscOJrERVEpQ4U264B4983E_Ds3FlcGTZcRPLaKVHBs5pX0Mk6RUbnWmKQYECHSaHcCp0_Cd1y2qM38ojrckm9IYDBoWjSA5vbJCD6IgK6N44cYZ7jNKeBJPR2vdGoAqePHIPPo4Lqwm0NXQgb9HYQMigJokvY-XIZ3-p3KByuy1oOMAul_yYx5Er0esgJ1Bu6m5T7HlYqWDdGgxAIcOnC0DDA6r3b6AFAwOKlDip_Jv9HZ8m9K8slH9pn_GeWVeI4boRMaAxIhTj9ZUqlLYp_OnQRitim_p4erZgOwdXMYXBxENFxsshswhd5D-o5N_2d8P3kCyvCsO0MR3zalBHx0Gt2-gN4JJH-lVXSFXQgFojl4SlYDeLxj4z_qRMV9vCBUnQkcxnbARVCCyxHYFZsT4ArCmzmYcvQEg24yDjs3kPYG7R1IVOPMK7SZp59gWKAKffGcORweYUETZFVFul2SGRWavEk0cI18AEZe4b5q9koiQHrmof7MncKB-WRdJk0caJ69YneVVSGhkrsxnsAj2syqiRJRKFNp5DJzqUVbQKLro7k_JLQUrYiL1mhtOLTEtKrx7l9nbS1RKJlue9ZcbVz1WUdwsO0anxb6vfSelJv4Oa6B3wfsAlA5mQdxFiON0WT4OVDMnOTdiNNymTSutC8jcwC0JoshWzQr5xBKqczhWtvYPq9_h90cVmgofqZzknt_fFDD2ibgmG_2FeIbfH81dWWNx3z3Vz3m00)
* [UML diagram som viser sekvens mellom Ringo og Oxalis](https://www.planttext.com/plantuml/img/dLPDRnen4BtxLumufGU4H6ueq4G4zP8F2kaPcTq1BEtQMziBhPB-zuxtsylN9YVMrfkPzsRUMDmRoxLDuuWbz2i2aN1feQU5tAf-40cKjWVSG7QnoY_WxewYPCWZ9N4oEHLfKEzHDoBp2ueyu1homvd8AdCpkhfirmwvvMjk47e3bTgrIcMOnPK7mcz4XEQliHZxU25hUF5z0Srri1Fxd5JnVHuTe-NWZXdSdLRkH07BdqzjtUeFZuJfD-daLwkQrVckpMVp-UiJFCopm0IJH4KhdZ0s7iC20u74isf6ZCRmBHhOQ1K3qasY16KPZvatuFx47zi8vg_BDwXQp7XWnPvRz63CYw4SLTqH4TD667i4gNlJnfHUw_VRN3G6A18BDulPy_TlBCJJR5m7tZIN9XRMdEY1LL0rh-v0msg-0eqy18c7CW6JYYegHwaToNuPT4DqOwqoR9HcTeT0P5CUWSsP6IEKP6uIBjr93jLCYOJ1Mi4rmY56I0mleKiZZwglI-ZchD8av5boEWcvKQNVa9BKwrHao-tcDRiMvKZxTc_9hARhmrWhwYWF6OfhKqiwnZSAylsdWCLwNuIIEniodO-FT2x5Lc88Bui5t3miX_3y-EBvkQNOzNYQhuL6gzrkcwObJOT5_Z6ZFIuJTblZcczPrIlQOLzjgYMG4WjguyUUNTvFo1Yy5-bMKltxWYRUNgchKahuLzddhsbDtsmTzO6Zqf5_lRa7BUejXuEmkyoVcJtFg_OV1-3PlXLHbnxKodw_KpJqh9B9kvgkd7bJRpoOlWy_RhjEhV6wRT5cnQT3-83fxTN9EIpkHOWoG7PFxmlzv_aF)

### Mellomvare (Oxalis Ambassador)
Løsningen implementerer PEPPOL gjennom å wrappe REST-APIet til tjenesten. Mellomvaren har ansvaret for overgangen mellom asynkron og synkrone kall. 
Mellomvaren implementerer håndtering av innkommende meldinger fra PEPPOL-aksesspunktet gjennom polling. Denne prosesser innkommende meldinger av typen [EHF Get Evidence Request](https://github.com/difi/vefa-ehf-getevidence),
som (i utgangspunktet) vil være den eneste typen aksesspunktet er satt opp til å kunne motta den sentrale PEPPOL-katalogen (SMP), og det gjennomføres (potensielt gjentatte) oppslag i NADOBE Core REST-APIet for å initiere evt. samtykkeforespørsel og høste bevisdata. Bevis-svaret pakkes og sendes ut på PEPPOL-aksesspunktet via Ringo. Mellomvaren vil da ha følgende ansvarsområder:

* Håndtere innkommende meldinger fra PEPPOL-aksesspunktet gjennom å polle Ringo APIet for meldinger av typen EHF Get Evidence Request.
* Håndtere ASIC-pakketering
* Mappe EHF Get Evidence Request mot tilsvarende kall til REST-APIet
* Gjennomføre gjentatte forsøk hvis avgivere er utilgjengelige, eller for å sjekke at forespurt samtykke er blitt innvilget
* Mappe svar fra REST-APIet til EHF Get Evidence Response
* Asynkront sende utgående meldinger til Oxalis via Ringo APIet

Autentisering mot NADOBE CORE fungerer ved hjelp av Altinns eget virksomhetssertifikat. NADOBE Core vil inneholde kode som tillater at "Requestor" kan settes vilkårlig når dette virksomhetssertfikatet benyttes (ellers må requestor matche organisasjonsnummer i virksomhetssertifkatet som oppgis). Dette innebærer at autentisering i praksis er delegert til Peppol. noe som anses som tilstrekkelig.

**Her er en skisse som benytter Azure-komponenter (Functions, Azure Storage Queue, CosmosDB) i implementasjonen av mellomvaren**

<div style="width: 100%; height: 800px; margin: 10px 0; position: relative;"><iframe allowfullscreen frameborder="0" style="width:100%; height:800px" src="https://www.lucidchart.com/documents/embeddedchart/f1b6c410-fab4-40b2-a62f-f3d8fd916730" id="uv__UW_Ow0eV"></iframe></div>

## Applikasjonsmonitorering
Løsningen vil kreve en overvåkning for å gi innsikt i

* Bruk (og misbruk)
* Bruksmønstre
* Tjenestenivå
* Hvilke deler av løsningen som er kostnadsdrivende
* Hvilke deler av løsningen som har behov for re-skalering eller ytterligere elastisitet
* Siden løsningen i stor grad skal deles opp med separate Azure-byggesteiner (f.eks. functions) vil mye av dette bli dekket av dashboard-funksjonalitet som kommer "ut av boksen". Ytterligere ,onitorering gjøres ved hjelp av eksisterende Azure-mekanismer, som lar en logge metrikk og hendelser i med høy granularitet. Det skal i minst mulig grad utvikles egen kode for å møte behov for logging og monitorering (foruten samtykkelogging).

## Continuous Deployment
### Branching og CI
Det benyttes ikke release-branching i noen deler av NADOBE; det legges opp til at master er branchen som til enhver tid skal kunne deployes til staging / prod. Endringer skal commites til feature-branches som publiseres som pull requests, som må godkjennes av minst én annen og ha grønne unit tests før det merges til master. Dette gjelder for repoene NADOBE Core, Oxalis Ambassador og EvidenceSources.

### Function Apps
NADOBE Core, Oxalis Ambassador og EvidenceSources er alle app services som har støtte for [deployment slots](https://docs.microsoft.com/en-us/azure/app-service/web-sites-staged-publishing) i Azure. 
Dette lar en ha en parallell versjon av appen i et staging miljø som enkelt kan "swappes" med produksjons-versjonen uten nedetid, altså i et [blue-green mønster](https://martinfowler.com/bliki/BlueGreenDeployment.html). Deployment slots lar en bl.a. sette opp "slot-spesifikke" applikasjonsinnstillinger, slik at referanser til storage accounts og NoSQL-databaser kan være forskjellige for miljøene mens andre innstillinger følger med ved swap. 

Det legges opp til at VSTS deployer umiddelbart til staging ved grønt bygg i master. Funksjonelle tester og integrasjonstester kjører da automatisk mot staging-miljøet, og varsel sendes til Slack el.l. ved fullført / feilet testrun. På dette tidspunktet er det mulig å automatisk gjennomføre en swap slik at kode blir produksjonssatt for "ekte" CD, men dette kan også enkelt gjøres manuelt i Azure Portal. I portalen kan man også swappe tilbake (rollback).

### Oxalis
Det legges opp til blue-green mønster også for Oxalis. Oxalis kjører som et eget VM i en egen ressursgruppe i Azure. En kopi av denne ressursgruppen opprettes som da fungerer som et staging-mijø. 
I front av disse to ressursgruppene står en application gateway som terminerer TLS og håndterer routing av produksjonstrafikk til det "grønne" miljøet og  test-trafikk til stagingmiljøet.
Ved å swappe routingen i denne gatewayen vil en kunne deploye nye versjoner av Oxalis / Ringo uten nedetid. [Les mer om dette mønsteret](http://work.haufegroup.io/Blue-Green-Deployment-on-Azure/).
