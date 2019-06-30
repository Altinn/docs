---
title: Melding
description: Meldingstjenester definerer meldinger som kan sendes fra tjenesteeier til bruker.
toc: true
---

En meldingstjeneste fungerer forskjellig fra en innsendingstjeneste. Mens en innsendingstjeneste instansieres i SBL, dvs initialiseres som
et element tilhørende en gitt avgiver, er en meldingstjeneste en definisjon på en melding, men ikke selve meldingen. Det er ikke mulig å
åpne en melding uten av en tjenesteeier har sendt deg en. Ergo, meldings­tjenester kan bare instansieres av etat enten via webservice eller
batchgrensesnitt.

![Figur 56 – Arbeidsflaten til en nyopprettet utgave av en meldingstjeneste](/docs/images/guides/tul/arbeidsflate-melding.png?width=700 "Figur 56 – Arbeidsflaten til en nyopprettet utgave av en meldingstjeneste")

## Spesifikasjon - meldingstjeneste

En meldingstjeneste kan ha utgaver akkurat som en innsendingstjeneste, og har også utgaveparametere. Generelt er utgavespesifikasjonen
enklere for en meldingstjeneste, siden meldingsinnholdet i all hovedsak kommer fra tjenesteeier.

### Utgaveparametre

Enhver utgave må ha [utgaveparametre](../felles-funksjonalitet/#utgaveparametere).

### Overstyr rettigheter

Rettigheter trenger du bare å [overstyre](../felles-funksjonalitet/#overstyr-rettigheter) hvis den utgaven du utvikler har andre rettighetskrav enn de som allerede er satt på tjenestenivå.
Hver utgave vil arve disse rettighetene når den migreres til SBL, og få med seg overstyringene i tillegg.

## Innhold - meldingstjeneste

Innholdet i en melding kommer som sagt i all hovedsak fra tjenesteeier direkte til SBL.

### Innhold som sendes fra tjenesteeier

Følgende overordnet informasjon er påkrevet i data sendt fra tjenesteeier:

  - Mottaker.
  - Avsender (Avsender i TUL vil overskrive denne).
  - Meldingsinnhold.
  - Varsling.
  - Referanse til metadata (dvs. utgaven definert i TUL).

Når det gjelder meldingsinnhold, så kan dette i hovedsak bestå av to typer:

  - **Binært vedlegg**: Meldingsinnhold er en PDF-fil som er generert av etat. Dette er det mest benyttede i Altinn I.
  - **HTML:** Innholdet blir i sin helhet vist fram i meldingssiden i SBL. Dette er også benyttet i Altinn I.

Det mulig å sende med innhold som består av flere skjema/vedlegg.
