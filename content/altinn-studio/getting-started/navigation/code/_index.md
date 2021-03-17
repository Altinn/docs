---
title: Code
description: Slik navigerer du i Altinn Studio Code.
toc: true
weight: 300
---

Selv om vi har støtte for å redigere kode og konfigurasjonsfiler direkte i Altinn Studio Repos, er det ofte mer behagelig å gjøre det lokalt på din maskin.

For å gjøre dette må du laste ned og installere et koderedigeringsverktøy.  
Vi anbefaler [Visual Studio Code](https://code.visualstudio.com/Download), men det er fritt fram hvilket verktøy du velger.

## Finne adressen til et repo

URL-en til et gitt app repository er strukturert slik, så bytt ut owner og repo-navn:  
`https://altinn.studio/repos/owner/repo.git`.

Du kan finne URL-en ved å navigere til repositoryet. Klikk ikonet til høyre for å kopiere.

![Klone URL i Repos](clone-url-in-repos.png "Klone URL i Altinn Studio Repos")

Du kan også finne samme URL i en popup i Designer hvis du klikker på "Clone"-knappen.

![Klone URL i Designer](clone-url-in-designer.png "Klone URL i Altinn Studio Designer")

## Klone koden
Etter at du har åpnet Visual Studio Code, åpne den [integrerte terminalen](https://code.visualstudio.com/docs/editor/integrated-terminal) (ctrl + ø) og skriv klone-kommandoen.
Husk å få med riktig organisasjon og repo-navn.

```sh
git clone https://altinn.studio/repos/owner/repo
```

Om du ikke er kjent med Visual Studio Code eller Git arbeidsflyt, er det god dokumentasjon her:

https://code.visualstudio.com/docs/getstarted/introvideos
https://code.visualstudio.com/docs/editor/versioncontrol#_git-support
