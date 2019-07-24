---
title: Nye EC-endepunkter
description: Nye EC-endepunkter juli 2019
weight: 300
toc: true
aliases:
- /guides/integrasjon/sluttbrukere/webservice/grensesnitt/nye-ec-endepunkter/
---

## Informasjon om nye endepunkter og Apache CXF klienter (Oppdatert 24.7.2019)
De nye endepunktene er nå tilgjengelig i både test og produksjon. Tjenester som benytter endepunkter med navn som har suffiks "EC" (d.v.s. alle Enterprice Certificate endepunkter for SOAP), 
kan nå benytte de nye endepunktene som har suffiks "EC2".
F.eks. WSDL-filen for GetReceiptV2 er [ReceiptExternalEC2.svc?wsdl](https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC2.svc?wsdl).

Feilen i Apache CXF som påvirket "streamed" EC-grensesnitt er fikset av Apache. Den vil være tilgjengelig i neste release av Apache CXF (3.3.3).

## Utfordringer med webserviceoperasjoner som bruker sertifikat
På grunn av betydelig økning i antall kall til Altinns webservicer med sertifikatautentisering (EC)
og klienter som ikke terminerer forbindelsen, opplever vi at det flere ganger hver dag nås en maksgrense på antall samtidige connections.
Dette fører til treghet og utilgjengelighet både i test og produksjon.

For de webservicene som baserer seg på polling mot Altinn må man  ha et bevisst og fornuftig forhold til hvor ofte man sjekker status 
- på samme måte som man sjekker kvitteringer for innsendinger 
bør man heller ikke gå i for tette løkker når man sjekker tilgjengelige filer på formidlingstjeneste eller status på meldinger/DPV. 
En gang i timen kan ofte være tilstrekkelig. Altinn har tradisjonelt aldri hatt strenge restriksjoner på kall til tjenester, 
men om vi fortsetter å oppleve ekstremt frekvent polling eller manglende lukking av forbindelser vil vi potensielt bli nødt til å innføre tekniske begresninger på enkelte klienter eller hele systemer. 

En konfigurasjonsendring på endepunktene som gjør tokenet stateful ble forsøkt lagt ut i testmiljøet (tt02), 
men viste seg å føre til feilsituasjoner hos klienter som bruker java-rammeverket CXF 
når de skulle gjøre kall til operasjoner som bruker streaming (typisk vedlegg til skjema eller opplasting til formidlingstjeneste).

For å kunne gjennomføre flytting fra dagens konfigurasjon til ny uten å måtte vente på en fiks i CXF vil vi lage nye endepunkter for autentisering med virksomhetssertifikat.
Informasjon om adresser/wsdl vil komme her på denne siden.
De nye endepunktene vil bli tilgjengelig før 1.8.2019, både i test og produksjon og være så like de eksisterende som mulig, både teknisk og funksjonelt.
Vi anbefaler at alle som ikke bruker cxf og streaming tester de nye endepunktene fra 1.8.2019 og bytter over så snart som mulig. 
De eksisterende vil være tilgjengelig en stund fremover, men vil bli tatt bort etter en viss tid. Endelig dato for fjerning vil komme i løpet av høsten 2019.

### Den nye konfigurasjonen medfører følgende:
• Security token blir "stateful". 
  Dette betyr at den inkluderer en soap cookie som transporterer tilstand fram og tilbake mellom konsument og tjeneste.
  Dermed kan tjenesten bli «stateless» og unngå problemer med at «secure conversations» ikke blir lukket av konsumentene.

• Endringer i tjenestenes konfigurasjon på .NET WCF nivå: 
  Attributtene requireSecurityContextCancellation og requireDerivedKeys på elementet Security i tjenestens «binding» endres fra true til false.

• Operasjonen CancellationToken på tjenesten for å hente security tokens støttes ikke i denne konfigurasjonen

### Mulige konsekvenser for leverandører:
• .NET WCF klienter
Hvis man ikke lukker proxies eksplisitt (med close) trenger man ikke gjøre noen endringer. 
I motsatt fall må man endre attributtene requireSecurityContextCancellation og requireDerivedKeys på elementet Security i tjenestens «binding» fra true til false.

• Java Apache CXF klienter
Det er p.t. en bug i CXF som gjør at «streamed» EC-grensesnitt ikke fungerer. 
Jf [issue hos apache](https://issues.apache.org/jira/projects/CXF/issues/CXF-8051?filter=allopenissues). 
Vi kjenner ikke til behov for endringer for "ikke-streamed» grensesnitt. Det er kommet forslag til fiks for dette som vi jobber med å verifisere.

• Klienter uten arkitekturrammeverk
Hvis man kobler seg opp mot tjenestene på lavestene nivå – dvs med egne kall til tjenesten for å hente security token 
– må man gjøre tilpasninger i koden slik at security token som sendes til den reelle tjenesten inkluderer soap cookie returnert fra tjenesten for å hente security token.


## Ny operasjon for å hente arkiverte meldinger (correspondence)
ReporteeArchive.GetArchivedCorrespondence - [se dokumentasjon](/docs/api/soap/endepunkter-oversikt/#reporteearchiveexternal)
På grunn av sanering i database vil man ikke lenger kunne hente arkiverte meldinger med dagens operasjon (GetCorrespondenceForEndUserSystemV2). 
Saneringen er utsatt for å gi eksisterende integrasjoner tilstrekkelig med tid til å implementere den nye operasjonen, 
men vil gjenopptas i alle miljøer fra og med januar 2020.

Den nye operasjonen er tilgjengelig i alle miljøer og kan testes umiddelbart. 

Man kan altså enten ta i bruk den nye operasjonen eller benytte [REST-apiet](/docs/api/rest/meldinger).

Se [release notes](/docs/ny-funksjonalitet/releases/2019/19-7/#endringer-i-soap-api) for mer informasjon.

## Strengere validering på filnavn 
Våren 2019 innførte vi en strengere validering på filtyper under innsending av vedlegg til Altinn - se [release notes](/docs/ny-funksjonalitet/releases/2019/19-3/#endret-validering-av-filendelse-på-vedlegg-til-å-være-mer-presis-i-api) for mer informasjon. 
På grunn av kort varsel og en del problemer, ble denne endringen midlertidig rullet tilbake på de tjenestene som var mest berørt. 
I løpet av høsten 2019 (senest september) vil denne bli skrudd på igjen, 
så alle som sender vedlegg/filer til Altinn bør inkludere filendelse, ikke bare filnavn for å komme gjennom valideringsrutinene.

Ved eventuelle spørsmål eller avklaringer av teknisk natur, ber vi om at dere tar kontakt på [Altinns public slack](https://join.slack.com/t/altinn/shared_invite/enQtNTc1MTA2MTI5ODEwLTQ3ODgxZTE3NTQwMWIzZDQzNWRhMTRlOTNjMzAzYmNmNzc3NzQzZGRjODg5ZWYzN2M2ZTc5NThhZTViM2M1ODk)

Vanlig support og bistand til feilmeldinger må tas e-post, som vanlig.
