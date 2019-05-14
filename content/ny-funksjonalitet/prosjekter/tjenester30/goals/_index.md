---
title: Målsettinger
description: Overordnede målsettinger for 3.0.
aliases:
 - /no/altinncore/goals.html
weight: 10
---


En oppsummering av de overordnede hovedmålsettingene for tjenester 3.0.

## Brukervennlige og responsive tjenester

- Brukergrensesnitt som er brukervennlig, effektive og moderne (f.eks. som [vist på altinn-dagen](http://altinn.github.io/DesignSystem/versjon-altinndagen/patterns/04-sider-90-starte-enk-00-starte-enk-0/04-sider-90-starte-enk-00-starte-enk-0.html))
- Støtte for mobil og ulike skjermstørrelser er innebygd, såkalt [responsivt design](https://no.wikipedia.org/wiki/Responsiv_nettside). Dette gjelder også for utviklingsverktøy.
- Innebygd [universell utforming](http://wcag.difi.no/) med støtte for [WCAG 2](https://www.w3.org/Translations/WCAG20-no/)
- God ytelse og lav responstid

## Effektiv og selvbetjent tjenesteutvikling

- Man kan enkelt gjøre alt selv (inkl. prodsetting) når man ønsker det, uten behov for bestillinger, kursing, etc. Flaskehalser elimineres.
- Effektiv og reell testing, der enhetstest oppfører seg likt som testmiljøer og prod (alle miljøer baseres på samme plattform-kode)
- Støtte for å lage automatisert testing av tjenester
- Regler og logikk defineres kun en gang for alle kanaler (portal/WS/API), og på en mer robust måte enn i dag
- Datamodellering innebygd i det samme web-baserte verktøyet (og støtte for import fra [SERES](https://altinnett.brreg.no/no/SERES/), [OR](https://w2.brreg.no/oppgaveregisteret/spesifikasjon_etatsliste.jsp), etc. )
- Ikke nødvendig med Citrix for tilgang til utviklingsmiljø

## Enkelt for fagpersoner, fleksibelt for utviklere

- Fagpersoner har tilgang til nødvendig funksjonalitet [direkte i nettleser](../dev-in-browser)
- Man gjenbruker gode og ferdig-testede komponenter/widgets
- Enkelt å gjøre kall mot API'er i andre systemer (hente data, kjøre logikk som ligger i egne fagsystemer)
- Mer tekniske utviklere kan i tillegg tilpasse alle aspekter hvis man har behov for det ved bruk av [kode-editor](../dev-in-code), f.eks. lage gjenbrukbare widgets, stilark, etc.
- Gjenbruk av tekster og andre ressurser på det nivået som man ønsker (plattform, tjenesteeier, tjeneste), samt vilkårlig språkstøtte
- Git (versjonskontroll) benyttes for lagring av tjenestene som utvikles, både fra nettleser og kode-editor.

## Åpen kildekode, cross-platform

- Tjenester 3.0 skal baseres på [åpen kildekode](https://en.wikipedia.org/wiki/Free_and_open-source_software)
- Tjenester 3.0 skal også deles som åpen kildekode
- Dette betyr at alle kan bidra til å forbedre plattformen. Altinn-organisasjonen blir mao. ikke flaskehals for utvikling.
- Kan kjøres lokalt på egen maskin, på egne servere og på både Windows, macOS eller Linux
- Alt baseres på åpne [web-standarder](https://en.wikipedia.org/wiki/Web_standards) og vanlig utviklerkompetanse (ingen "sære" eller proprietære verktøy innføres)
