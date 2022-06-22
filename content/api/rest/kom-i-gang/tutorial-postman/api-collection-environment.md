---
title: Hvordan importere Altinn API collection og environment
linktitle: Collection og Environment
description: "Denne leksjonen vil vise deg hvordan man importerer Altinns API Collection og Environment som er publisert som egne filer på Github."
toc: false
aliases:
weight: 8
categories: [Kom-i-gang veiledninger]
keywords: [Postman, API, REST]
tags: [REST, Postman]
---

## Importere Altinn Collection og TT02 Environment
Postman har to veldig nyttige konsepter, *Collections* og *Environments*, som vi skal bruke i denne introduksjonen.
*Collections* er et strukturert oppsett av REST endepunkter, operasjoner, parametere og andre verdier som er definert av et API.
*Enviornments* er verdier som brukes i REST forespørslene, men som ofte tilhører en spesifikk bruker eller et miljø.
Man kan referere til en verdi i et *Environment* ved å bruke `{{navn}}`.
Denne referansen kalles en variabel.
I de forhåndslagde [Altinn Postman Examples](https://github.com/Altinn/postman-examples) har vi benyttet noen flere variabler som må fylles ut, slik som API-nøkkel.

1. I Postman kan man importere Collection og Environments via *File -> Import...* eller snarveien *Ctrl+O*.
2. I *Import* vinduet - velg *Link* fanen - og hente Altinn Collection fra lenken https://raw.githubusercontent.com/Altinn/postman-examples/master/Collection/Altinn.postman_collection.json.
3. Bekreft importen.
    * Nå skal *Altinn* mappen i *Collections* være synlig. Her vil man finne både *user* (Sluttbruker) og *service owner* (Tjenesteeier) API.
4. De samme stegene kan utføres for å importere Environment filen for TT02 testmiljøet https://raw.githubusercontent.com/Altinn/postman-examples/master/Environments/TT02.postman_environment.json.

Nå skal man ha mulighet til å velge Altinn Collection og TT02 enviroment som det er vist på bildet 
![Postman etter Collection og Environment import](/docs/images/guides/postman/postman-collection-environment-setup.png "Postman etter Collection og Environment import")
For mer detaljert informasjon om import og eksport i Postman kan man lese https://learning.postman.com/docs/getting-started/importing-and-exporting-data/.

## Legge inn egne verdier i Environments
![Postman Environment variabler](/docs/images/guides/postman/postman-environment-fill.png "Postman Environment variabler")
1. Klikk på *Environments* fanen på høyre side. Her vil man finne TT02 i den nærmeste kolonnen. Det lille *hakeikonent* ved siden av TT02 indikerer at dette miljøet er valgt og er det aktive miljøet som brukes nå.
2. I *INITIAL VALUE* og *CURRENT VALUE* kolonnene kan man fylle inn verdier for de forskjellige variablene. Her er det *CURRENT VALUE* som styrer hva som blir brukt. For de fleste brukerne som leser denne guiden vil det være `ApiKey` eller `ApiKeyServiceOwner` som er mest relevant på dette tidspunktet.

For mer detaljert informasjon om bruk av *Environments* i Postman kan man lese https://learning.postman.com/docs/sending-requests/managing-environments/.