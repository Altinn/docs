---
title: Innledning
description: Oversikt og struktur, forutsetninger, beskrivelse av aktører samt overordnet prosess for Tjenesteutviklingsløsningen (TUL) i Altinn.
toc: true
weight: 5
---

Dette er en brukerveiledning for de som ønsker å utvikle tjenester i Altinns Tjenesteutviklingsløsning (TUL).
[Målgruppen](#aktører) for dokumentet er fagpersoner, kommunikasjons­medarbeidere og IKT-medarbeidere hos tjenesteeier som benytter verktøyene i TUL gjennom
tjenesteutviklingsprosessen.

Brukerveiledningen dekker også [løsnings­administrators arbeidsoppgaver](../diverse/administrators-oppgaver/) blant annet knyttet til å tildele/kontrollere brukertilgang i TUL på
vegne av tjenesteeier. Informasjon rettet mot den mer tekniske målgruppen som er fortrolig med Visual Studio som arbeidsverktøy, er plassert
i [vedlegg](../vedlegg/).

Følgende [tjenestetyper](../tjenestetyper/) er beskrevet i denne brukerveiledningen;
[innsending](../tjenestetyper/innsending/), [melding](../tjenestetyper/melding/),
[innsyn](../tjenestetyper/innsyn/), [samhandling](../tjenestetyper/samhandling/),
[lenke](../tjenestetyper/lenke/) og [formidling](../tjenestetyper/formidling/).

Denne guiden har som målsetning å gi tilstrekkelig beskrivelse av alle arbeidsoppgaver knyttet til tjenesteutvikling i Altinn.
Hvis du oppdager mangler eller har innspill om forbedringer kan du enten opprette en pull request med endringer
eller [opprette en issue på GitHub](https://github.com/altinn/docs/issues).

*Viktige forkortelser:*

 - **TUL** – Tjenesteutviklingsløsningen
 - **SBL** – Sluttbrukerløsningen
 - **SBS** – Sluttbrukersystem
 - **XSN** – Filtypen til InfoPath-skjema

Utover disse finnes flere ord som er verdt å merke seg i [begrepslisten](../diverse/begrepsliste/).

Denne guiden tar for seg den delen av tjenesteutviklingsprosessen som foregår i Tjenesteutviklingsløsningen, heretter kalt **TUL**. I
forkant av dette må tjenesteutvikler gjennomføre en jobb knyttet til spesifisering av krav og design for tjenesten. Dette bør resultere i en
skisse som beskriver hvordan tjenesten skal se ut i Altinn og sjekkliste for ønskede egenskaper som tjenesten skal ha. Likedan så finnes
rutiner for varsling og bestillinger knyttet til testing og produksjonssetting som tjenesteutvikler må forholde seg til. Slik informasjon
vil til en hver tid finnes på https://altinn.brreg.no.

Produktet av TUL kan sies å være en utgave som migreres til Sluttbrukerløsningen, heretter kalt **SBL**.

## Bestanddeler

TUL består av en samling flere utviklingsverktøy hvor ulike deler benyttes til å utvikle ulik funksjonalitet i tjenesten i Altinn. Av disse
så er følgende relevant for tjenesteutvikler i TUL:

1.  SharePoint
2.  [InfoPath](../vedlegg/a/) (utvikling av skjema)
3.  Microsoft Visual Studio Tools for Applications (utvikling av avanserte kontroller og kalkyler)
4.  Active Directory Users and Computers
5.  [Andre hjelpeverktøy](../kom-i-gang/#citrix-arbeidsflate) som Windows utforsker og andre standardprodukter
6.  [Visual Studio](../vedlegg/f/) og utviklingsimage (utvikling av [mappere](../vedlegg/mappere/) for [innsynstjenester](../tjenestetyper/innsyn/))

## Forutsetninger

Denne brukerveiledningen forutsetter grunnleggende kunnskap om standardproduktene SharePoint og InfoPath, og er ikke en komplett
brukermanual for disse verktøyene. Dette gjelder også områdene der Visual Studio må benyttes som verktøy.
Det forutsettes også at tjenesteutvikler i TUL har gjennomført tilstrekkelig opplæring/kursing i regi av
Altinn Sentralforvaltning før tilgang til TUL gis.

## Oversikt og struktur

TUL er som nevnt en helhetlig løsning for utvikling av tjenester i Altinn.
Her gir vi en enkel beskrivelse av struktur og prinsipper.

### Struktur

TUL er designet slik at man har et hierarki mellom tjenesteeier, tjeneste og utgave, som vist i figur 1 under.

TUL kan brukes av et udefinert antall tjenesteeiere som hver har [sin arbeidsflate](../kom-i-gang/#tjenesteeiers-arbeidsflate).
En arbeidsflate er en side som viser og gir tilgang til all relevant informasjon for gitt nivå.
Hver tjenesteeier kan ha en eller flere tjenester og hver tjeneste er representert ved sin egen arbeidsflate.
En tjeneste kan igjen ha en eller flere utgaver og hver utgave er representert ved sin egen arbeidsflate.

![Figur 1 – Struktur i TUL](/docs/images/guides/tul/struktur.png "Figur 1 – Struktur i TUL") 

I figuren over representerer hver boks en arbeidsflate. Det er verdt å merke seg at en tjenesteutgave kan kun tilhøre en tjeneste, og en
tjeneste kan kun tilhøre en tjenesteeier.

- Eksempel på tjenesteeier: *Skatteetaten / SKD*
- Eksempel på tjeneste: *Alminnelig omsetningsoppgave*
- Eksempel på utgave: *2009*

I eksempelet over vil man i år 2010 kun opprette en ny utgave under eksisterende tjeneste. På denne måten får man det man ønsker.

## Tjenestetyper

En tjeneste i Altinn (som også kalles et element, en forekomst eller en instans) er alltid knyttet til én aktør (avgiver). Den oppstår
(opprettes eller instansieres) på et bestemt tidspunkt og kan i de aller fleste tilfelle arkiveres i aktørens arkiv.

I Altinn har vi disse tjenestetypene:

  - [Innsendingstjeneste](../tjenestetyper/innsending/): Et skjema eller skjemasett som sendes fra sluttbruker på vegne av en aktør, til en tjenesteeier. Innsendingen
    kan opprettes av sluttbruker eller tjenesteeier, og det er mulig med forhåndsutfylling med sluttbrukerens data (prefill). Skjemasettet
    kan følge en prosessflyt som omfatter utfylling, et antall signeringer og innsending.

  - [Innsynstjeneste](../tjenestetyper/innsyn/): Et skjema som kan åpnes av sluttbruker, og som enten automatisk eller på brukers initiativ gjør oppslag i eksterne
    systemer og viser informasjon til sluttbruker. Det er mulig med lagring og signering av framhentet informasjon i aktørens arkiv.

  - [Meldingstjeneste](../tjenestetyper/melding/): Informasjon som sendes fra tjenesteeier til en aktør og presenteres i form av HTML, binære vedlegg og/eller
    skjema. Det er mulig å sende ut varsel om mottatt melding og be om bekreftelse på mottak. Meldinger kan arkiveres i aktørens arkiv.

  - [Samhandlingstjeneste](../tjenestetyper/samhandling/): En gruppering av underliggende tjenester som inngår i en sammenheng, supplert med støtteinformasjon og
    statusmerknader som kommuniseres til sluttbruker. Underliggende tjenester kan eies av forskjellige tjenesteeiere. Også sluttbruker selv
    kan definere grupperinger av tjenester. Samhandlingstjenester følger samme prinsipper for øvrige tjenestetyper for opprettelse og
    arkivering.

  - [Lenketjeneste](../tjenestetyper/lenke/): En lenketjeneste er en lenke fra Altinn til en tjeneste som ligger hos tjenesteeieren. For å få tilgang til tjenesten
    må sluttbruker være logget inn hos ID-Porten gjennom Altinn. Altinn har lenken til tjenesteeierens tjeneste i sin tjenestekatalog.

  - [Formidlingstjeneste](../tjenestetyper/formidling/): Dette er en tjeneste som brukes til å overføre filer fra en avsender til en eller flere mottakere. Tjenesten
    kan bare brukes via web service eller SFTP.

## Aktører

Det er ønskelig at man innenfor den enkelte tjenesteeier skal kunne utføre betydelige deler av arbeidet knyttet til å etablere og
vedlikeholde tjenester i Altinn. Dog er det samtidig enkelte kompliserte oppgaver som krever til dels dyp teknisk kompetanse. De involverte
brukerne kan derfor grupperes basert på kompetanse og arbeidsfordeling i tjenesteutviklingen. Dette er ikke en kategorisering uten nyanser,
da en og samme person vil kunne falle inn i flere grupper.

Tabellen under viser de ulike brukerne og deres typiske oppgaver.

<table>
<thead>
<tr>
  <th></th>
  <th><strong>Bruker og egenskaper</strong></th>
  <th><strong>Typiske oppgaver</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>
  <img src="/docs/images/guides/tul/aktør-fagperson.png" alt="" />
</td>
<td>
  <p><strong>Fagperson</strong> som forstår kommunikasjonsbehov knyttet til aktuelle offentlig tjenester basert på faglig kompetanse.</p>
  <p>Er opptatt av at tjenester skal være effektive, feilfrie og av høy brukskvalitet; er nøyaktig og ønsker å levere god kvalitet.</p>
  <p>Har et fagområde utenom IKT; bruker IKT-verktøy, men er ingen systemutvikler.</p>
  <p>Har fått grunnopplæring i TUL og evt. InfoPath.</p>
  <p>Arbeider med tjenestedefinisjon og vedlikehold generelt, eller er spesialisert inn mot bestemte oppgaver.</p>
</td>
<td>
  <ul>
    <li>Opprette tjeneste/tjeneste­utgave
    <li>Utarbeide design
    <li>Definere tjeneste inkludert evt. prosessflyt og skjemasett
    <li>Utvikle tjenesteinnhold inkludert layout, tekster, kalkyler og regler
    <li>Enhetsteste tjeneste
    <li>Starte migrering til portalmiljø
    <li>Systemteste/akseptanseteste tjeneste
    <li>Publisere informasjon om tjeneste
    <li>Vedlikeholde og migrere kodeliste
  </ul>
</td>
</tr>
<tr>
<td>
  <img src="/docs/images/guides/tul/aktør-oversetter.png" alt="" />
</td>
<td>
  <p><strong>Oversetter</strong> som har kompetanse på de aktuelle språkene.</p>
  <p>Er grundig og ønsker å bidra til enkel og forståelig kommunikasjon.</p>
  <p>Har fått grunnopplæring i TUL vinklet mot språkmodulen.</p>
</td>
<td>
  <ul>
    <li>Oversette tjeneste
    <li>Oversette rolle
  </ul>
</td>
</tr>
<tr>
<td>
  <img src="/docs/images/guides/tul/aktør-ikt.png" alt="" />
</td>
<td>
  <p><strong>IKT-person</strong> som har erfaring med systemutvikling.</p>
  <p>Behersker InfoPath (inkludert Xpath og C# i Visual Studio for Application) og SharePoint.</p>
  <p>Har fått grunnopplæring i TUL.</p>
</td>
<td>
  <ul>
    <li>Utarbeide prosessflytmal
    <li>Utarbeide komplekse regler/kontroller
  </ul>
</td>
</tr>
<tr>
<td>
  <img src="/docs/images/guides/tul/aktør-teknisk.png" alt="" />
</td>
<td>
  <p><strong>Teknisk</strong> utvikler med god forståelse av Altinn-løsningen.</p>
  <p>Har spesialisert kompetanse knyttet til verktøyene i Altinn, for eksempel Workflow Foundation eller BizTalk.</p>
  <p>Enkelte har tilgang til å iverksette endringer i produksjonsmiljøet.</p>
  <p>For øvrig som IKT.</p>
</td>
<td>
  <ul>
    <li>Utvikle ny kjøretids­komponent, for eksempel prosessflyt­komponent og tilstandsmodell
    <li>Produksjonssette komponent
    <li>Produksjonssette tjeneste
    <li>Opprette arbeidsområde og database for etat/ny tjenesteeier
    <li>Opprette nytt integrasjonspunkt mot etat
  </ul>
</td>
</tr>
<tr>
<td>
  <img src="/docs/images/guides/tul/aktør-admin.png" alt="" />
  <p>Løsnings­admin</p>
</td>
<td>
  <p><strong>Løsningsadministrator (tjenesteeier­administrator)</strong> med god forståelse av Altinn-løsningen, spesielt TUL.</p>
  <p>Gir støtte til tjenesteeiere i tjenesteutviklings­arbeidet. Kan være administrator på vegne av en enkelt tjenesteeier eller for hele løsningen.</p>
  <p>Bruker IKT-verktøy, men er ingen systemutvikler.</p>
  <p>Har fått opplæring i Active Directory og i SharePoint, vinklet mot bruker­administrasjon og/eller tilpasning av samhandlings­områder i SharePoint.</p>
</td>
<td>
  <ul>
    <li>Administrere roller og rettigheter for TUL-brukere
    <li>Laste opp nyttig og nødvendig informasjon for de som skal jobbe i TUL, for eksempel dokumentmaler, dokumenter og kunngjøringer
  </ul>
</td>
</tr>
</tbody>
</table>

### Prosess

  - **Opprette overordnet design for tjeneste**: Kan gjøres i Tjenesteutviklingsløsningen, men også i egne dokument i forkant av opprettelse av tjeneste.
  - **Opprette detaljert design for tjeneste**: Opprettelse av tjeneste. Man får da tilgang til arbeidsflaten, dokumentbibliotek,
    tjenestedefinering og tjenesteutvikling (skjemautvikling).
  - **Definere tjeneste**: Konfigurering av tjeneste, ved parametersetting.
  - **Utvikle tjeneste**: Utvikling av skjema/dialogsider, samt:
      - Konfigurering av innhold
      - Oversette tjeneste.
      - Utvikle og migrere kodeliste.
      - Utvikle og migrere prosessflytmal og komponenter.
  - **Enhetstest** **tjeneste**: Enhetstesting av skjema og kodegjennomgang. Utføres i forkant av systemtest, men kan også utføres iterativt i utviklingsprosessen.
  - **Migrere tjeneste til portalmiljø**.
  - **Systemteste** **tjeneste**: Test av tjeneste i Sluttbrukerløsningen og sluttbrukersystemer.
  - **Akseptanseteste** **tjeneste**: Test av tjeneste i Sluttbrukerløsningen og sluttbrukersystemer.
  - **Produksjonssette** **tjeneste**: Migrering til Sluttbrukerløsningen.
  - **Publisering av tjeneste**: Publisering på InfoPortalen


![Figur 2 - Prosess for tjenesteutvikling](/docs/images/guides/tul/prosess.png "Figur 2 - Prosess for tjenesteutvikling")
