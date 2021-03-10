---
title: Oppdatere avhengigheter i app
linktitle: Avhengigheter
description: Hvordan oppdatere avhengigheter i en app.
toc: true
weight: 130
---

Appen er avhengig av flere ressurser som ligger utenfor selve appen.
Dette inkluderer støttebiblioteker med felles funksjonalitet for alle apper og referanse til appen sin frontend.

Disse avhengighetene er definert noen forskjellige steder i appen, og hver avhengighet refereres til med en spesifikk _versjon_.
Når ressursene oppdateres, publiseres de på nytt som en ny _versjon_. En ny versjon kommer ofte med ny funksjonalitet eller forbedringer.
For at appen skal kunne ta dette i bruk, må man oppdatere hvilken versjon av ressutsene appen henter. 

## Nuget pakker
_Nuget er .NET sin package manager, hvor vi publiserer kodebibliotek som brukes av alle appene._

Appen bruker flere støttebiblioteker, som oppdateres fortløpende med forbedringer og ny funksjonalitet. En app refererer til konkrete versjoner av de forskjellige
bibliotekene, og disse referansene må oppdateres for å hente inn siste versjon. 

### Oppgradere til nyeste versjon

{{%panel info%}}
**Tips:** Installer [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)-utvidelsen for Visual Studio Code.  
Da kan du automatisk se hva som er nyeste versjon av alle pakker når du åpner App.csproj. Støtter også npm.
{{% /panel%}}

- Finn fram referansene til bibliotekene i appen. Referansene til biblioteker ligger i filen `App/App.csproj` i appens repo. 

F.eks.:

```xml
<ItemGroup>
  <PackageReference Include="Altinn.App.Api" Version="3.0.0" />
  <PackageReference Include="Altinn.App.Common" Version="3.0.0" />
  <PackageReference Include="Altinn.App.PlatformServices" Version="3.0.0" />
  <PackageReference Include="Microsoft.Extensions.Logging.Debug" Version="3.1.3" />
  <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="3.1.2" />
</ItemGroup>
```

- Sjekk om det har kommet en oppdatert versjon av bibliotekene:
    - [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api)
    - [Altinn.App.Common](https://www.nuget.org/packages/Altinn.App.Common)
    - [Altinn.App.PlatformServices](https://www.nuget.org/packages/Altinn.App.PlatformServices)
- Oppdater de aktuelle referansene til den siste versjonen og lagre filen.
- Sjekk om det er noen [breaking changes](https://docs.altinn.studio/teknologi/altinnstudio/known-issues/breaking-changes/) ifm endringer i bibliotekene,
  og gjør ev. endringer som beskrives for å løse ev. problemer.
- Bygg og deploy appen på nytt.


## App frontend

App frontend lastes inn av appen runtime, via en lenke til javascript-filen som er app frontend.
Denne javascript-filen versjoneres ihht. [Semantic Versioning](https://semver.org/):

> Given a version number MAJOR.MINOR.PATCH, increment the:
> 
> MAJOR version when you make incompatible API changes,<br/>
> MINOR version when you add functionality in a backwards compatible manner, and<br/>
> PATCH version when you make backwards compatible bug fixes.
> 
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

App'en refererer som standard til en _major_ versjon av app frontend, f.eks. versjon 1.x.y.
Med mindre det kommer en ny _major_ versjon vil alle oppdateringer med ny _minor_ eller _patch_ versjoner komme med automatisk.
Om det kommer en ny _major_ versjon må man eksplisitt oppdatere appen til å referere til denne.

Dersom man ønsker å refere til en spesifikk versjon av app frontend (f.eks. 1.2.3) så kan dette spesifiseres direkte i url'en som peker på app frontend.

### Oppgradere til nyeste versjon / spesifisere versjon
Referansen til app frontend ligger i `App/views/Home/Index.cshtml`.

Det er 2 referanser som må oppdateres:

- Referansen til altinn-app-frontend.**js**-filen som er app frontend koden.
  
```html
<script src="https://altinncdn.no/toolkits/altinn-app-frontend/<VERSJONSNUMMER>/altinn-app-frontend.js"></script>
```
- Referansen til altinn-app-frontend.**css** som inneholder styling for app frontend.

```html
<script src="https://altinncdn.no/toolkits/altinn-app-frontend/<VERSJONSNUMMER>/altinn-app-frontend.css"></script>
```

Søk etter filnavnet (`altinn-app-frontend.js` eller `altinn-app-frontend.css`) og erstatt versjonsnummeret (f.eks. 1) med ønsket versjonsnummer (f.eks. 2).

_Husk:_ Dersom man setter kun _major versjon_ (f.eks. 2), så vil alle oppdateringer innenfor denne major versjoner (bugfix, ny funksjonalitet som ikke er breaking) komme med automatisk. Dersom man setter en _spesifikk versjon_ (f.eks. 2.0.0) så vil appen hente akkurat denne versjonen, helt til referansen evt. oppdateres til å bruke en annen versjon.
