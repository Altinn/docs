# Brønnøysundregistrene dokumentasjon

Vi er i gang med å forbedre [Brønnøysundregistrenes dokumentasjon](https://brreg.github.io/docs/) og gjøre den enkel å vedlikeholde.

# Getting started

- Skaff tilgang til en github bruker tilkoblet din brsys-mail og clone deretter dette docs-repoet
- Last ned hugo, se her: [Nedlasting av Hugo](https://gohugo.io/getting-started/installing/)
- Last ned og installer git-subtree ved `sudo yum install git-subtree`

## Ønsker du å bidra?

1. Pull eksisterende endringer.
2. Gjør endringene du ønsker på din lokale kopi, helst direkte på `master` branch.
3. Inspiser at resultatet er slik du ønsker, f.eks vha `hugo server`
4. Deploy endringene ved å kjøre deployscriptet `./Deploy.sh`, dette vil bygge, committe og pushe til både `master` og `gh-pages`.

Du kan også foreslå forbedringer eller påpeke bugs ved å [opprette en issue](https://github.com/brreg/docs/issues).

## Oppsettet av dokumentasjonsrepoet

Hugo genererer med kommandoen `hugo` et sett med statiske dokumentasjonsfiler i mappen `public`, vha `git subtree` er githistorikken som er koblet til de genererte filene separert fra master branch, og lagt i branchen som heter `gh-pages`. På github finnes det under [Deployments](https://github.com/brreg/docs/deployments) automatisk deploy av endringer pushet til [gh-pages](https://docs.github.com/en/github/working-with-github-pages/getting-started-with-github-pages).
