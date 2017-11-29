---
title: "F: Bruk av Visual Studio"
description: Hjelp til å komme i gange med utvikling av mappere i Visual Studio.
weight: 6
---

For utvikling av Web Service-*mappere* til innsynstjenester, så er dette kode som tjenesteeier kan utvikle på egen hånd og som deretter
kvalitetsikres av ASF, eventuelt også applikasjonsleverandør før driftsleverandør produksjonssetter dette.

## Forutsetninger

Visual Studio (2015 anbefalt) er installert og C\# Development Setting valgt for installasjonen.

## Koble opp mot tjenesteeiers TFS prosjekt 

Velg *Team -\> Connect to Team Foundation Server…*

{{<figure src="/docs/images/guides/tul/connect-to-tfs.png" title="Koble til Team Foundation Server" >}}

Velg *Servers…*

{{<figure src="/docs/images/guides/tul/connect-to-team-project.png" title="Koble til Team Project" >}}

Velg *Add…*

{{<figure src="/docs/images/guides/tul/add-tfs-server.png" title="Legg til TFS Server" >}}

Angi url, path, portnummer og protokoll

{{<figure src="/docs/images/guides/tul/add-tfs-details.png" title="Angi TFS-detaljer" >}}

Oppgi `altinntest\<brukernavn>` (f.eks. altinntest\\ola.nordmann), passord og trykk *OK*.

{{<figure src="/docs/images/guides/tul/tfs-login.png" title="TFS login" >}}

Kryss av Common (inneholder bl.a. base klasser for mappere)  
og for den tjenesteier du skal utvikle for, for eksempel Testdepartementet (TTD).

Trykk *Connect*.

{{<figure src="/docs/images/guides/tul/choose-team-projects.png" title="Velg Team Projects" >}}

Under *Team Explorer*, ekspander (tjenesteeier) og dobbel-klikk *Source Control*.

{{<figure src="/docs/images/guides/tul/vs-team-explorer.png?width=700" title="Team Explorer" >}}

I *Source Control Explorer*, velg (tjenesteeier) og klikk så "Not mapped".

{{<figure src="/docs/images/guides/tul/source-control-explorer.png?width=700" title="Source Control Explorer" >}}

Angi plassering av lokal arbeidskatalog, for eksempel `c:\dev\TTD`. Velg *Map*.

{{<figure src="/docs/images/guides/tul/vs-map.png" title="Opprett workspace-mapping" >}}

Velg *Ja* for å hente ut kode:

{{<figure src="/docs/images/guides/tul/vs-map-get-code.png" title="Velg Ja for å hent koden" >}}

De fire siste stegene gjentas for å få sjekket ut *Common*.

Åpne
```
$/<tjenesteeierforkortelse>/Mappers/<tjenesteeierforkortelse>.sln
```
(for eksempel $/TTD/Mappers/TTD.sln) for å utvikle mapper.

Åpne
```
$/<tjenesteeierforkortelse>/Conditions/Altinn.SBL.Conditions.sln
```
(for eksempel $/TTD/Conditions/Altinn.SBL.Conditions.sln) for å utvikle conditions.

`<tjesteeierforkortelse>` kan i sin tur være delt opp i `<etat><avdeling><prosjekt>`.

Alt avhengig av hvordan tjenesteeier er organisert og hvor mange mappere de har.

For å referere til Altinn-tjenester må man linke inn proxy dll-er. Disse ligger ferdigkompilert på utviklingsmiljøet, i katalogen
`c:\dev\lib\<versjon>`, for eksempel "c:\\dev\\lib\\2.0.5".

**Viktig**:  
Selv om det er teknisk mulig å benytte vilkårlige proxies og
rammeverkmetoder fra dll-er under "c:\\dev\\lib", anbefales det å begrense seg til kun å benytte metoder i baseklassene
(`Altinn.SBL.ServiceEngine.Case.AltinnConditionsBase` for conditions og
`Altinn.SBL.ServiceEngine.Lookup.Mappers.Common.Services.AltinnMapperBase` for mappers), da disse er de eneste som garantert vil være
bakoverkompatible i fremtidige versjoner.

## Forvaltning av kildekode i TFS

I TFS vil tjenesteeiers utviklere ha skrivetilgang, og kunne forvalte kildekoden etter eget ønske. Leverandøren besørger drift av TFS
(inkludert backup), men vil ikke aktivt forvalte tjenesteeiers kildekode uten at det foreligger en eksplisitt bestilling på dette.

Hvis det ikke er laget mapper eller conditions prosjekt for en tjenesteeier som ønsker dette, så skal dette skallet settes opp av
Leverandør. Bruk av TFS og Visual Studio for å sjekke ut/inn er utenfor scope for denne brukerdokumentasjonen.

## Prosjektstruktur for mappere

{{<figure src="/docs/images/guides/tul/prosjektstruktur-mappers.png" title="Prosjektstruktur for mappers" >}}

Over vises grunnleggende innhold i solution for en mapper åpnet i Visual Studio, og i listen under er forklaring.

 - **Config**
   - **env_variables.csv**  
     Inneholder substitueringsvariabler som kan ha forskjellige verdier avhengig av til hvilket miljø som mapperen deployes til.
     Denne definerer variabelnavn og tilhørende variabler ved hjelp av en kommaseparert liste, hvor hver av verdiene tilhører
     et spesifisert miljø (f.eks. AT/TT/Prod).
   - **internal/external.web.config**  
     Kan inneholde diverse konfigurasjonsnøkler og WCF-konfigurasjon (inkludert endepunkt mot tjenesteeiers web services).
     Setup-prosjektene omdøper internal/external.web.config til web.config for hhv interne og eksterne tjenester.

 - **Services**
   - **Service References**  
     Inneholder genererte proxier til tjenesteeiers Web Services. Proxiene anvendes i *Mapper.cs*
   - **IMapper.cs** er Web Services kontrakten for mapper.
   - **Mapper.cs** er implementasjonen av service kontrakten *IMapper.cs*. Denne filen har "hovedfokus" når man utvikler en mapper.
   - **Mapper.svc** er selve endepunktet, filen som man peker på fra InfoPath. Denne navngis av tjenesteeier.
   - **Transfer.cs** innholder datakontrakter brukt av mapper.
   - **Utility.cs** inneholder klasser for logging, objekt konvertering og konfigurasjons uthenting.

 - **Tests**
   - **Services References** inneholder proxier til mapper services. Proxiene anvendes i *MapperUnitTest.cs*.
   - **MapperUnitTest.cs** inneholder alle enhetstestene av mapper.

 - **Setup-prosjekter**  
   Disse benyttes til å generere en msi-fil som brukes for å installere mapperen i et miljø.
   Her adderes alt innhold som skal inngå i installasjonsfil. Den eksterne setup-en er kun nødvendig hvis mapperen
   skal eksponeres eksternt (mot sluttbrukersystemer).


## Hensiktsmessig Web Service API for Mappers

Da tjenesteutvikler i InfoPath kobler seg mot Web Service mapper er det hensiktsmessig at både input- og output-verdier fra denne Web
Servicen er atomiske elemeter som en i InfoPath kan koble direkte mot feltene i InfoPath. Dette bør utvikler ta hensyn til.

### Lagre signert kopi

TUL har en parameter som sier om det er mulig å lagre en signert kopi av innsynstjenesten. For å minimere vedlikehold kan utvikler velge å
gjøre et oppslag mot Service Metadata slik at en evt. endring på denne parameteren dynamisk tas hensyn til av mapperen
(*IsSigningAllowedForLookupService*).

### Hensynta sluttbrukersystemer

Kun innsynstjenester som kan returnere en ”komplett” xml vil det kunne være hensiktsmessig å tilgjengeliggjøre for sluttbrukersystem. For
sluttbrukersystemer må det lages en separat WebService (facade) som har postfix ”External” som er den som skal tilgjengeliggjøres for
eksterne systemer. Denne vil så kalle mapperen for å hente data. Dette er helt identisk med hvordan andre interne tjenester i Altinn II er
blitt gjort tilgjengelig eksternt.

### Kvittering på benyttet innsyn

TUL har en parameter som angir om det skal sendes bekreftelse på bruk av tjenesten til tjenesteeier. For å minimere vedlikehold kan utvikler
velge å gjøre et oppslag mot Service Metadata slik at en evt. endring på denne parameteren dynamisk tas hensyn til av proxy-tjenesten.

## Deploy av mappers og conditions

Mappere for innsynstjenester og conditions for samhandlingstjenester utvikles i Visual Studio og kompileres og pakkes til msi-filer (ved
hjelp av et setup-prosjekt i Visual Studio). Det anbefales å pakke generert msi og exe fil i et rar-arkiv før oversendelse til
driftsleverandør. Msi-filene kan deretter installeres i de ulike SBL-miljøene av Driftsleverandøren. For å forenkle testing av mappers og
conditions, vil det fra TT2-miljøet være delt ut share av driftsleverandør: Etter at tjenesteutvikler har lagt til sharet i Visual Studio
Server i TT2, kan han/hun kopiere ut oppdaterte dll’er og config. Denne “hurtig-deployen” kan først skje etter at Driftsleverandør har kjørt
førstegangs installering og opprettet share i miljøet.

Share-ene vil ha følgende navnestandard: `\\<miljø>\<tjenesteeier>_<tjenestetype>`,
f.eks `\\alt-tt-portal02\TTD_CONDITIONS` og `\\alt-tt-intweb02\TTD_MAPPERS`.

Mappere/conditions som skal nås fra portalen kopieres til alt-tt-portal02.

Mappere som skal nås fra sluttbrukersystem kopieres i tillegg til alt-tt-intweb02.

For conditions er det alltid kun én fil som er relevant å kopiere inn til sharet:

`<tjenesteeierkortnavn>.dll`, for eksempel TTD.dll.

For mappers er det større fleksibilitet i navngivning av endepunkt og assemblies, så hvilke filer som skal kopieres til sharet vil variere
noe. Ved å browse sharet slik det foreligger direkte etter MSI-installasjon av mapperen vil man få en idé om hvilke config-, svc og
dll-filer som skal kopieres hvor etter en endring.
