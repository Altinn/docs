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

## Støtte for meldinger med taushetsbelagt informasjon
Medldingtjeneste støtter muligheten for å sende taushetsbelagt informasjon i meldingene. 
Tjenestene som støtter forsendelse av taushetsbelagt informasjon avviker noe fra «vanlige» Altinn-tjenester. Det spesielle med tjenestene er at rollen(e) som gir tilgang til tjenestene ikke er forhåndstildelt til roller fra Enhetsregisteret. Dette innebærer at det i utgangspunktet ikke er noen i virksomheten som har tilgang til tjenesten(e). 

Følgende roller kan knyttes til tjenester med taushetsbelagt informasjon:

- Taushetsbelagt post 
- Eksplisitt tjenestedelegering; ikke-delegerbar rolle for tjenester som kun skal delegeres enkeltvis

For tjenester med særlig sensitivt innhold anbefaler vi at man benytter rollen "Eksplisitt tjenestedelegering". 

### Hvordan gi tilgang til melding med taushetsbelagt informasjon
Her er beskrivelse av hvordan mottaker gir tilgang til taushetsbelagte meldinger; [Del tilgang til melding](https://altinn.github.io/docs/utviklingsguider/digital-post-til-virksomheter/overorndet-funksjonalitet/del-tilgang-til-melding/)

Vi anbefaler at man ikke tillater å videresende en melding med tausehtesbelagt informasjon på epost, selv om dette må vurderes opp mot innhold i meldingen og risiko knyttet til å sende dette som epost. Hvis melding ikke skal tillates vidreesendt på epost settes verdien på "AllowForwarding" settes til "false" i xml, se beskrivelse av [InsertCorrespondence](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/meldingstjeneste/#insertcorrespondencev2)

### Hvordan utforme melding med taushetsbelagt innhold
For å sikre at det er rette vedkommende i virksomheten som får tilgang til de taushetsbelagte meldingene, er det viktig at avsender tilpasser innholdet i meldingen slik at Hovedadministrator vet hvem det skal delegeres til. Dette kan f.eks gjøres ved å ha entydig tekst i MessageTitle – gjerne navngi mottaker dersom dette er kjent, evt benytt saksnummer eller annen informasjon som kan knytte meldingen til rett person i virksomheten. 
### Varsling er påkrevd for meldinger med taushetsbelagt informasjon
Instansiering av melding må også varsles med Notification for å sikre at virksomheten får beskjed om at det er sendt en melding i innboksen. Varslingen må inneholde informasjon om at meldingen er taushetsbelagt, samt beskrivelse av hva virksomheten må gjøre for å sikre at rette vedkommende får tilgang til meldingen (hva meldingen gjelder, hvem som skal ha meldingen, hvilken enkelttjeneste eller rolle som må delegeres for å gi tilgang o.l). 
