---
title: Arkitektur
description: Hvordan Nadobe er realisert
weight: 40
---

{{% notice info %}}
Dette er levende dokumentasjon (under arbeid) for NADOBE - Nasjonal Tjeneste for Dokumentasjonsbevis
{{% /notice %}}

## Arkitekturskisse
Dette er arkitekturskissen slik den foreligger i Lucidchart for øyeblikket. Denne er sanntidsoppdatert.

<div style="width: 100%; height: 800px; margin: 10px 0; position: relative;"><iframe allowfullscreen frameborder="0" style="width:100%; height:800px" src="https://www.lucidchart.com/documents/embeddedchart/115d2e6f-9c41-496e-b22b-e7a39c58e168" id="9V591xyG_t7Q"></iframe></div>

## Sikkerhet
### Kryptering
All trafikk til Web-API grensesnittet foregår over TLS 1.2 med sterke ciphers (tilsvarende grade A eller høyere i SSL Labs' test)

### Autentisering
Autentisering av brukere foregår ved hjelp av [X.509](https://en.wikipedia.org/wiki/X.509) klientsertifkater (virksomhetssertifikater). Løsningen skal i denne versjonen kun være tilgjengelig for offentlige virksomheter, og følgelig vil autentisering kunne gjennomføres automatisk gjennom oppslag mot ER og sjekk av næringskode. På sikt vil andre mekanismer (f.eks. registrering av hvilke klientsertifkater som skal ha tilgang) være aktuelt, men dette er ikke i scope for denne løsningen.

WebAPI-grensesnittet vil kreve virksomhetssertifikatet oppgitt i TLS-sesjonen mot endepunktet, på samme måte som dette er implementert i Altinn i dag. (Ved terminering av TLS settes sertifikatet i en HTTP header som da vil være gjenstand for validering i applikasjonen)

For PEPPOL-kanalen vil den spørrende parts (altså den offentlige oppdragsgiveren) være autentisert av PEPPOL-nettverket. Aksessering mot WebAPI-et gjøres ved hjelp av et internt, pre-godkjent sertifikat som kun kan benyttes av mellomvaren.

Serveren vil være satt opp for håndtering av tilbaketrukne sertifkater via CRL / OCSP.

### Integritet
Svar fra APIet som inneholder bevisdata vil bli signert via JSON Web Signature (https://tools.ietf.org/html/rfc7515)

### Personvern / behandling av sensitive data
Løsningen etableres i Azure Cloud fysisk lokalisert i Irland (Azure-regionen "West-Europe"). Løsningen legger opp til at ingen sensitive data (bevisdata) vil bli skrevet til noe permanent lager, men bevisdata vil i korte tidsrom befinne seg i en meldingskø mot PEPPOL-aksesspunktet. I scenarioer hvor PEPPOL-aksesspunktet er nede, vil utgående sensitive data kunne befinne seg på køen inntil aksesspunktet kommer opp og får tømt køen.

## Azure serveroppsett og roller
Azure-komponenter som tilbyr PaaS-funksjonalitet er foretrukket for å i størst mulig grad forenkle forvaltning av tjenesten. Det legges opp til bruk av function apps og API-fasade implementert i [Azure API Management](https://docs.microsoft.com/en-us/azure/api-management/), som håndterer autentisering, throttling og routing til ulike støttede versjoner av APIet.

Et "tradisjonelt" Linux VM blir benyttet for Oxalis / Ringo.

{{% notice info %}}
Bruk av Azure App Services eller containers i stedet for et tradisjonelt VM er under utredning
{{% /notice %}}

## PEPPOL
Løsningen skal støtte et eMeldingsmønster via PEPPOL.

### Oxalis
Programvaren for PEPPOL aksesspunktet er [Oxalis](https://github.com/difi/oxalis), som er basert på Apache Tomcat (Java). I tillegg installeres [Ringo](https://github.com/difi/vefa-srest), som eksponerer et REST-API med bl.a. /outbox ressurser som kan benyttes for å sende utgående meldinger.

* [UML diagram som viser integrasjon mellom Ringo og Oxalis](https://www.planttext.com/plantuml/img/bLN1Zfim4Btp5IDERTNaiCTgXLQgjDrMbQecFVI673D9d0NZscOJrERVEpQ4U264B4983E_Ds3FlcGTZcRPLaKVHBs5pX0Mk6RUbnWmKQYECHSaHcCp0_Cd1y2qM38ojrckm9IYDBoWjSA5vbJCD6IgK6N44cYZ7jNKeBJPR2vdGoAqePHIPPo4Lqwm0NXQgb9HYQMigJokvY-XIZ3-p3KByuy1oOMAul_yYx5Er0esgJ1Bu6m5T7HlYqWDdGgxAIcOnC0DDA6r3b6AFAwOKlDip_Jv9HZ8m9K8slH9pn_GeWVeI4boRMaAxIhTj9ZUqlLYp_OnQRitim_p4erZgOwdXMYXBxENFxsshswhd5D-o5N_2d8P3kCyvCsO0MR3zalBHx0Gt2-gN4JJH-lVXSFXQgFojl4SlYDeLxj4z_qRMV9vCBUnQkcxnbARVCCyxHYFZsT4ArCmzmYcvQEg24yDjs3kPYG7R1IVOPMK7SZp59gWKAKffGcORweYUETZFVFul2SGRWavEk0cI18AEZe4b5q9koiQHrmof7MncKB-WRdJk0caJ69YneVVSGhkrsxnsAj2syqiRJRKFNp5DJzqUVbQKLro7k_JLQUrYiL1mhtOLTEtKrx7l9nbS1RKJlue9ZcbVz1WUdwsO0anxb6vfSelJv4Oa6B3wfsAlA5mQdxFiON0WT4OVDMnOTdiNNymTSutC8jcwC0JoshWzQr5xBKqczhWtvYPq9_h90cVmgofqZzknt_fFDD2ibgmG_2FeIbfH81dWWNx3z3Vz3m00)
* [UML diagram som viser sekvens mellom Ringo og Oxalis](https://www.planttext.com/plantuml/img/dLPDRnen4BtxLumufGU4H6ueq4G4zP8F2kaPcTq1BEtQMziBhPB-zuxtsylN9YVMrfkPzsRUMDmRoxLDuuWbz2i2aN1feQU5tAf-40cKjWVSG7QnoY_WxewYPCWZ9N4oEHLfKEzHDoBp2ueyu1homvd8AdCpkhfirmwvvMjk47e3bTgrIcMOnPK7mcz4XEQliHZxU25hUF5z0Srri1Fxd5JnVHuTe-NWZXdSdLRkH07BdqzjtUeFZuJfD-daLwkQrVckpMVp-UiJFCopm0IJH4KhdZ0s7iC20u74isf6ZCRmBHhOQ1K3qasY16KPZvatuFx47zi8vg_BDwXQp7XWnPvRz63CYw4SLTqH4TD667i4gNlJnfHUw_VRN3G6A18BDulPy_TlBCJJR5m7tZIN9XRMdEY1LL0rh-v0msg-0eqy18c7CW6JYYegHwaToNuPT4DqOwqoR9HcTeT0P5CUWSsP6IEKP6uIBjr93jLCYOJ1Mi4rmY56I0mleKiZZwglI-ZchD8av5boEWcvKQNVa9BKwrHao-tcDRiMvKZxTc_9hARhmrWhwYWF6OfhKqiwnZSAylsdWCLwNuIIEniodO-FT2x5Lc88Bui5t3miX_3y-EBvkQNOzNYQhuL6gzrkcwObJOT5_Z6ZFIuJTblZcczPrIlQOLzjgYMG4WjguyUUNTvFo1Yy5-bMKltxWYRUNgchKahuLzddhsbDtsmTzO6Zqf5_lRa7BUejXuEmkyoVcJtFg_OV1-3PlXLHbnxKodw_KpJqh9B9kvgkd7bJRpoOlWy_RhjEhV6wRT5cnQT3-83fxTN9EIpkHOWoG7PFxmlzv_aF)

Løsningen skal integreres med Oxalis ved hjelp av mellomvaren [Oxalis Ambassador](oxalis-ambassador).

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
Det benyttes ikke release-branching i noen deler av NADOBE; det legges opp til at master er branchen som til enhver tid skal kunne deployes til staging / prod. Endringer skal commites til feature-branches som publiseres som pull requests, som må godkjennes av minst én annen og ha grønne unit tests før det merges til master. Dette gjelder for repoene NADOBE Core, Oxalis Ambassador og de ulike ES-ene.

### Function Apps
NADOBE Core, Oxalis Ambassador og ES-ene er alle app services som har støtte for [deployment slots](https://docs.microsoft.com/en-us/azure/app-service/web-sites-staged-publishing) i Azure.
Dette lar en ha en parallell versjon av appen i et staging miljø som enkelt kan "swappes" med produksjons-versjonen uten nedetid, altså i et [blue-green mønster](https://martinfowler.com/bliki/BlueGreenDeployment.html). Deployment slots lar en bl.a. sette opp "slot-spesifikke" applikasjonsinnstillinger, slik at referanser til storage accounts og NoSQL-databaser kan være forskjellige for miljøene mens andre innstillinger følger med ved swap.

Det legges opp til at VSTS deployer umiddelbart til staging ved grønt bygg i master. Funksjonelle tester og integrasjonstester kjører da automatisk mot staging-miljøet, og varsel sendes til Slack el.l. ved fullført / feilet testrun. På dette tidspunktet er det mulig å automatisk gjennomføre en swap slik at kode blir produksjonssatt for "ekte" CD, men dette kan også enkelt gjøres manuelt i Azure Portal. I portalen kan man også swappe tilbake (rollback).

### Oxalis
Det legges opp til blue-green mønster også for Oxalis. Oxalis kjører som et eget VM i en egen ressursgruppe i Azure. En kopi av denne ressursgruppen opprettes som da fungerer som et staging-mijø.
I front av disse to ressursgruppene står en application gateway som terminerer TLS og håndterer routing av produksjonstrafikk til det "grønne" miljøet og  test-trafikk til stagingmiljøet.
Ved å swappe routingen i denne gatewayen vil en kunne deploye nye versjoner av Oxalis / Ringo uten nedetid. [Les mer om dette mønsteret](http://work.haufegroup.io/Blue-Green-Deployment-on-Azure/).

{{% notice info %}}
Bruk av Azure App Services eller containers i stedet for et tradisjonelt VM er under utredning. Bruk av App Services vil forenkle deploy uten nedetid betraktelig.
{{% /notice %}}