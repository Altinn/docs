---
title: "F: Bruk av Visual Studio"
description: Hjelp til å komme i gange med utvikling av mappere i Visual Studio.
toc: true
weight: 6
---

For utvikling av Web Service-*mappere* til innsynstjenester, så er dette kode som tjenesteeier kan utvikle på egen hånd og som deretter
kvalitetsikres av ASF, eventuelt også applikasjonsleverandør før driftsleverandør produksjonssetter dette.

## Forutsetninger

Visual Studio (2015 anbefalt) er installert og C\# Development Setting valgt for installasjonen.

## Koble opp mot tjenesteeiers TFS prosjekt 

Velg *Team -\> Manage connections…*

![Koble til Team Foundation Server](/docs/images/guides/tul/connect-to-tfs.png "Koble til Team Foundation Server")

Velg *Team -\> Manage connections…Connect to team project*

![Koble til Team Foundation Server](/docs/images/guides/tul/team-manage-connections.png "Koble til Team Foundation Server")

Velg *Servers…*

![Koble til Team Project](/docs/images/guides/tul/connect-to-team-project.png "Koble til Team Project")

Velg *Add…*

![Legg til TFS Server](/docs/images/guides/tul/add-tfs-server.png "Legg til TFS Server")



Kryss av ServDev (inneholder repository for Mapperne )  


Trykk *Connect*.

![Velg Team Projects](/docs/images/guides/tul/git-clone-from-tfs.png "Velg Team Projects")

Velg Clone this repository for å hente kildekoden.

![Team Explorer](/docs/images/guides/tul/git-clone-from-tfs-steg-2.png?width=700 "Team Explorer")

Angi plassering av lokal arbeidskatalog, og velg Clone


![Opprett workspace-mapping](/docs/images/guides/tul/git-cloned-repository.png "Opprett workspace-mapping")


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

![Prosjektstruktur for mappers](/docs/images/guides/tul/prosjektstruktur-mappers.png "Prosjektstruktur for mappers")

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
driftsleverandør. Msi-filene kan deretter installeres i de ulike SBL-miljøene av Driftsleverandøren.
