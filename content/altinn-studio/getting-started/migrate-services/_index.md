---
title: Migrere tjenester
linktitle: Migrere tjenester
description: Reisen til Altinn Tjenester 3.0
toc: true
weight: 170
aliases:
- /altinn-studio/migrate-services
---

## Migrere en eksisterende tjeneste til Tjenester 3.0
Gjør deg kjent med [Tjenesteeier-funksjonalitet i Altinn 3](https://altinn.github.io/docs/ny-funksjonalitet/roadmap/altinn3/tjenesteeier/).
1. **Opprett [bruker](https://altinn.github.io/docs/altinn-studio/first-time-setup/) og [app](https://altinn.github.io/docs/altinn-studio/app-creation/create-app/) i [Altinn Studio](https://altinn.studio/).**</br>Når bruker er opprettet kan du be om å [bli en del av en organisasjon](https://altinn.github.io/docs/altinn-studio/getting-started/first-time-setup/#bli-del-av-en-organisasjon). Dette for å kunne samarbeide med andre i organisasjonen og ha tilgang til å kjøre deploy av apper.  
2. **Utvikle [app/tjeneste](https://altinn.github.io/docs/altinn-studio/app-creation/).**</br>Her finner du veiledninger som er nyttige når man utvikler en app i Tjenester 3.0.
2. **Laste opp [datamodell](https://altinn.github.io/docs/altinn-studio/app-creation/data-model/).**</br>Det er mulig å [gjenbruke datamodeller](https://altinn.github.io/docs/ny-funksjonalitet/prosjekter/tjenester30/faq/) som er basert på InfoPath uten for store endringer. Slik [importerer du datamodellen](https://altinn.github.io/docs/altinn-studio/app-creation/data/data-model/) i Altinn Studio.
2. **Kombiner [UI editor](https://altinn.github.io/docs/altinn-studio/app-creation/ux/ui-editor/) og [kodeverktøy](https://altinn.github.io/docs/altinn-studio/app-creation/navigation/#code)**</br>Altinn Studio UI editor gjør det enkelt å legge til og flytte skjema komponenter. Kodeverktøy er enklere å bruke når man skal redigere koden. 
4. **Test [lokalt](https://altinn.github.io/docs/altinn-studio/testing/local/).**</br>Lokalt test miljø er en effektiv måte å teste apper uten å måtte kjøre en delploy.
5. **Test app i [testmiljø](https://altinn.github.io/docs/altinn-studio/testing/deploy/).**</br>Under fanen Deploy i Altinn Studio kan du bygge og deploye app. Når Appen er klart kan du logge inn i test miljøet med en testbruker for å kjøre tjenesten.
7. **Sette opp App i  [produksjonsmiljø](https://altinn.github.io/docs/altinn-studio/deploy-maintain/) og [bestille om skjema-side](https://altinn.github.io/docs/altinn-studio/deploy-maintain/#bestille-om-skjema-side).**</br>Før man setter app i produksjon må man ha tilgang til et produksjonsmiljø. Nyttig informasjon på om skjema-side gjør bruker av tjenesten selvhjulpen og Altinn brukerservice i stand til å hjelpe brukere.
8. **Tilrettelegge system for mottak av data.**<br>Det finnes [standardiserte mønstre basert på REST-API](https://docs.altinn.studio/teknologi/altinnstudio/altinn-api/) for å sende og motta data fra/til dine interne systemer. Autentisering skjer med [Maskinporten](https://www.digdir.no/digitale-felleslosninger/maskinporten/869) og du laster ned data ved pull fra database, og laster opp data direkte mot API i den enkelte applikasjon. Vår referanseapplikasjon [Altinn CLI](https://github.com/Altinn/altinn-cli)​viser disse mønstrene og kan brukes for å komme i gang.

## Lag en skisse av skjema
For å migrere en utvalgt tjeneste kan det være nyttig å lage seg en skisse av tjenesten slik at man gjør seg kjent med designelementer i Altinn 3, og slik at man har en referanse å se til når man utvikler løsningen. Slik gjør du dette.

{{%expandlarge id="Figma" header="Lage en skisse av skjerma i Figma." %}}
- Gå inn på nettsiden [https://www.figma.com/](https://www.figma.com/) og lag deg en bruker.
- Figma kan installeres lokalt eller brukes i din nettleser.
- Altinn har et åpent design kit for eksterne og det finner du [her](https://www.figma.com/proto/wnBveAG2ikUspFsQwM3GNE/ADS---Prototyping-for-eksterne?node-id=47%3A4068&amp;viewport=326%2C2144%2C0.653957724571228&amp;scaling=min-zoom).
- Gå inn på [denne](https://docs.altinn.studio/design/figma/) siden for å få mer informasjon om hvordan du kan komme i gang med Figma.
{{% /expandlarge %}}