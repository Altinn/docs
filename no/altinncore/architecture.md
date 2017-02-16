# Arkitektur

Under arbeid...

## Git

Det distribuerte versjonskontrollsystemet [Git](https://en.wikipedia.org/wiki/Git) er nå det
[klart mest brukte](https://stackoverflow.com/research/developer-survey-2015#tech-sourcecontrol) versjonskontrollsystemet for utvikling av programvare.  
Det er derfor naturlig å benytte Git også for lagring og versjonering av tjenestene som utvikles.  

Hver tjeneste vil leve i et eget Git-repository, og vil inneholde en eller flere utgaver.
En målsetning er å kunne la tjenesteeier velge hvor de utviklede tjenestene skal lagres, f.eks. [GitHub](https://github.com/),
[Team Services](https://www.visualstudio.com/team-services/) eller en Git-server som Altinn drifter.

Både [tjenesteutvikling i nettleser](dev-in-browser.md) og [tjenesteutvikling i kode-editor](dev-in-code.md) vil jobbe mot de samme versjonskontrollerte filene, og ha fullt innsyn i de filene som en tjeneste består av.

![Git as backend](images/git-as-backend.png)


## Dokumentasjon

Dokumentasjon av tjenester 3.0 vil ligge åpent tilgjengelig på GitHub slik at alle kan bidra og foreslå forbedringer.  
[Markdown](https://en.wikipedia.org/wiki/Markdown) vil benyttes som format både for dokumentasjon, men også for tekst-ressurser og dokumentasjon for den enkelte tjeneste som utvikles.


## Åpen kildekode, cross platform

Tjenester 3.0 skal være basert på fri programvare og ikke benytte proprietær programvare.  
Se også [fjerde målsetning](goals.mk#Åpen-kildekode-cross-platform).


## Programvare

PoC'en som er utviklet er basert på følgende programvare:

Programvare                                                 | Beskrivelse
------------------------------------------------------------| ---------------------------
[.NET Core](https://github.com/dotnet/core)                 | Rask, modulær og åpen plattform for moderne applikasjoner. Neste generasjon .NET.
[ASP.NET Core MVC](https://github.com/aspnet/Mvc)           | Rammeverk for å utvikle web applikasjoner og API'er
[Bootstrap 4](http://v4-alpha.getbootstrap.com/)            | CSS/JS rammeverk for responsive web-applikasjoner. Benyttes også av [Altinn](https://www.altinn.no) og i [designsystemet](https://altinn.github.io/DesignSystem/).
[Monaco Editor](https://github.com/Microsoft/monaco-editor) | Nettleserbasert kodeeditor, den samme som også benyttes av [vs code](https://github.com/Microsoft/vscode).
[Markdig](https://github.com/lunet-io/markdig)              | Bibliotek for håndtering av markdown
[Roslyn](https://github.com/dotnet/roslyn)                  | Kompilatorer og API for avansert kodeanalyse
[Visual Studio Code](https://github.com/Microsoft/vscode)   | Fantastisk cross-platform kode-editor som bare blir [bedre for hver måned](https://code.visualstudio.com/updates).
