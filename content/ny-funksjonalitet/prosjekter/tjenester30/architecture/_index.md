---
title: Arkitektur
description: Beskrivelse av arkitekturen til 3.0.
weight: 40
---

For flere detaljer, se https://docs.altinn.studio/architecture

## Git

Det distribuerte versjonskontrollsystemet [Git](https://en.wikipedia.org/wiki/Git) er nå det
[klart mest brukte](https://insights.stackoverflow.com/survey/2018/#work-version-control) versjonskontrollsystemet for utvikling av programvare.  
Det er derfor naturlig å benytte Git også for lagring og versjonering av tjenestene som utvikles.  

Hver tjeneste vil lagres i et eget Git-repository, og vil inneholde en eller flere utgaver.

Både tjenesteutvikling i nettleser og tjenesteutvikling i kode-editor vil jobbe mot de samme versjonskontrollerte filene, og ha fullt innsyn i de filene som en tjeneste består av.

![Både Studio og kode-editorer benytter Git som back-end](git-as-backend.png "Git som back-end")


## Dokumentasjon

Dokumentasjon av tjenester 3.0 vil ligge åpent tilgjengelig på GitHub slik at alle kan bidra og foreslå forbedringer.  
[Markdown](https://en.wikipedia.org/wiki/Markdown) vil benyttes som format både for dokumentasjon, men også for tekst-ressurser og dokumentasjon for den enkelte tjeneste som utvikles.


## Åpen kildekode, cross platform

Tjenester 3.0 skal være basert på fri og åpen programvare som kan kjøre på alle plattformer, og ikke benytte proprietær programvare.
Selve 3.0-løsningen vil i seg selv også deles som åpen kildekode. Se også [fjerde målsetting](../goals#åpen-kildekode-cross-platform).


## Programvare

3.0 vil benytte bl.a. følgende teknologier. Enkelte ting kan endre seg.

| Teknologi                                            | Beskrivelse                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Visual Studio Code](https://code.visualstudio.com/) | [Veldig populær](https://insights.stackoverflow.com/survey/2018/#technology-most-popular-development-environments) kodeeditor som bare blir [bedre hver enste måned](https://code.visualstudio.com/updates). Åpen kildekode og faktisk det prosjektet på GitHub med [flest bidragsytere](https://octoverse.github.com/#build). |
| [React](https://reactjs.org/)                        | Bibliotek som vil benyttes for å utvikle bl.a. gjenbrukbare UI-komponenter. Mye brukt, mange har kompetanse, og [veldig godt likt av utviklere](https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-frameworks-libraries-and-tools).                                                      |
| [TypeScript](https://www.typescriptlang.org/)        | Typet superset av JavaScript.                                                                                                                                                                                                                                                                                                  |
| [Git](https://en.wikipedia.org/wiki/Git)             | Distribuert versjonskontroll-system som benyttes for å lagre og versjonere tjenestene som utvikles. Git-baserte løsninger for versjonskontroll er [klart mest brukt i verden](https://insights.stackoverflow.com/survey/2018/#work-version-control), med innebygd støtte i mange verktøy.                                      |
| [.NET Core](https://dot.net)                         | Rask, modulær og åpen plattform for moderne applikasjoner og API'er.                                                                                                                                                                                                                                                           |
| [Bootstrap 4](https://getbootstrap.com/)             | Verdens mest poulære CSS/JS rammeverk for responsive web-applikasjoner. Benyttes også av [Altinn](https://www.altinn.no) og i [designsystemet](https://altinn.github.io/DesignSystem/).                                                                                                                                        |
| [Docker](https://www.docker.com/what-docker)         | Virtualiseringsteknologi for containers. Viktig muliggjører for DevOps, kontinuerlige leveranser og en arkitektur som understøtter microservices.                                                                                                                                                                              |
| [Kubernetes](https://kubernetes.io/)                 | Orkestrering, deploy og skalering av container-baserte løsninger.                                                                                                                                                                                                                                                              |
| [Linux](https://alpinelinux.org/about/)              | Selv om 3.0 er cross-plattform, og dermed kan kjøre på alle plattformer, så benyttes Linux-baserte containere. Linux er en åpen og en [ganske populær plattform](https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-platforms).                                                          |
