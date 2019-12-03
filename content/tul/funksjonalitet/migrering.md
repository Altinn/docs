---
title: Migrering
description: En utgave av en tjeneste kan migreres til sluttbrukermiljø når tjenesten er tilstrekkelig definert og utviklet.
toc: true
---

I TUL finnes fire ulike statusikoner som skal illustrere statusen for hver enkelt parameter­seksjon.

Når en utgave av en tjeneste skal migreres til et sluttbrukermiljø, skal alle statusikoner vise ikonet
for status **komplett**, eventuelt **migrert**.

| Ikon                                                              | Status                               |
| ----------------------------------------------------------------- | ------------------------------------ |
| ![Ikon for ny/uendret](/docs/images/guides/tul/status-new.png)    | Ny, uendret                          |
| ![Ikon for endret](/docs/images/guides/tul/status-changed.png)    | Endret, ikke komplett                |
| ![Ikon for komplett](/docs/images/guides/tul/status-complete.png) | **Komplett**                         |
| ![Ikon for migrert](/docs/images/guides/tul/status-migrated.png)  | **Migrert**, uendret etter migrering |

Ett unntak er språk, hvor sekundærspråk ikke behøver å være komplette.

## Start migrering

Migrering skjer fra en egen side i TUL. Hit kommer man via lenken *Migrer utgave* under området for *Migrering og status* på utgavens
arbeidsflate.

Fra migreringssiden kan tjenesteutvikler velge sluttbrukermiljø, versjon, språk som skal migreres og sette gyldighetsdato for test.

Sluttbrukermiljø kan være miljø for systemtest, akseptansetest og opplæring. Sluttbruker-miljøene vil kunne variere fra et
tjenesteutviklingsmiljø til et annet. Tjenesteutvikler kan ikke migrere tjenester til produksjonsmiljø, da all migrering til produksjon skal
kvalitetssikres av applikasjonsforvalter i forkant av migreringen. Tjenesteutvikler kan imidlertid velge å sende en bestilling av
produksjonssetting fra migreringssiden. Sluttbrukermiljø velges fra en nedtrekksliste der alle miljø det er mulig å migrere til står listet,
i tillegg til et valg om å bestille produksjonssetting.

Versjon velges fra en nedtrekksliste med defaultvalg *Nyeste*. Det vil si at en lager en ny versjon bestående av de siste endringene som er
gjort på tjenesteutgaven.

Språk velges fra en liste med sjekkbokser. Her listes hovedspråk samt eventuelle oversettelser (sekundærspråk).

Alle tjenester har en gyldighetsperiode som er satt i utgaveparametrene. Utgavens ”Gyldig fra”-dato må overstyres for at man skal kunne
teste tjenesten før den skal være tilgjengelig for sluttbruker.

Når migrering igangsettes, starters en eksportjobb som pakker sammen tjeneste­komponentene til en pakke, versjonerer den og overfører den
til valgt sluttbrukermiljø. Eksport­jobben kjøres automatisk, og status for migreringen gjøres tilgjengelig for tjenesteutvikler på en egen
side for migreringsstatus. Velger man å migrere en tidligere versjon, hentes pakken fra denne versjonen fram igjen og migreres.

Det er mulig å starte en ny migrering mens en annen migrering pågår, men du kan ikke migrere til et miljø der migrering av samme utgave
allerede pågår. Hvis du prøver å starte ny migrering til samme miljø før foregående migrering er avsluttet, vil *OK*-knappen være grået ut.

Om utgaven du skal migrere er en innsendingstjeneste med skjemasett kan du velge mellom å utføre komplett migrering eller å kun migrere
enkeltskjema i skjemasettet. Migrering av enkeltskjema kan brukes for å spare tid om du har gjort endringer i enkelte skjema og ikke behøver
å migrere hele tjenesten. Når du krysser av for «Oppdater kun enkeltskjema i SBL» vil det dukke opp en nedtrekksmeny hvor du kan velge
hvilket enkeltskjema som skal migreres. Her kan du velge mellom alle skjema i skjemasettet, inkludert hovedskjema. Ved migrering av
enkeltskjema vil eksisterende «Gyldig fra»-dato fortsatt benyttes.

## Migreringsstatus

Hvis du nettopp har startet en migrering, vil du først komme til en visning som informerer om at tjenesten blir verifisert, pakket,
versjonert og oversendt til sluttbrukermiljø. Når pakken er sendt til sluttbrukermiljøet blir du tatt til en egen side for løpende status og
oversikt over alle gjennomførte migreringer. Øverst på siden vises resultatet av den pågående/gjennomførte migreringen. Først vises
eventuelle advarsler/feil etter innledende validering, deretter vises løpende status og eventuelle advarsler/feil under behandling av
skjema. Hvis migrering er vellykket, kommer melding om dette; i motsatt fall at migreringen feilet.

I en tabell nederst på siden listes alle migreringsjobber som er utført. Listen inneholder et innslag per miljø som den enkelte versjonen er
migrert til. Listen inneholder også migreringsdato, navn på den som har kjørt migreringen og lenke til en migreringsrapport. Rapporten er i
excel-format og inneholder detaljer om hva som er inkludert i hver enkelt migrering. Denne informasjonen kan være nyttig hvis det blir
nødvendig å rulle tilbake.

Listen med migreringsjobber inneholder også lenker til språkversjoner av hovedskjema, som du kan åpne i InfoPath. Klikk eventuelt på
lenken *Vis underskjema* for å hente fram tilsvarende lenker til språkversjoner for resten av skjemasettet.

For å komme videre med testing kan du gå direkte til et portalmiljø fra listen over migreringer. Når du klikker på navnet til det aktuell
miljøet, tas du til utgaven i SBL via en *direktelenke.* Direktelenken er beskrevet nedenfor. Alternativt kan du klikke på *OK*-knappen for
å gå tilbake til utgavens arbeidsflate.

Det er mulig å gå ut av siden med *OK*-knappen selv om det pågår en migreringsprosess. Migreringen vil fortsette, og løpende
migreringsstatus vil vises på utgavens arbeidsflate. Det vil imidlertid ikke være mulig å returnere til denne siden som viser detaljer om
advarsler og status. Hvis du går inn på nytt fra utgavearbeidsflaten, vil siden kun inneholde oversikten over alle migreringsjobber som er
utført. Hvis du går inn på migreringsstatus-siden mens det pågår en migrering, må du oppdatere siden (refresh) for å få med den siste
migreringsjobben i listen når prosessen er ferdig.

En innsendingstjenestes utgave kan inngå som underskjema i et skjemasett for en annen innsendingstjeneste. Om utgaven er migrert som
underskjema i et skjemasett vil det dukke opp et område på arbeidsflaten for utgaven som lenker til en migreringsstatusside for skjemaet som
underskjema. På denne siden vil du finne referanser til alle skjemasett utgaven har blitt migrert som del av, hvor det har blitt migrert,
tidspunkt for migreringer, hvem som har migrert, og lenker til de aktuelle utgavene.

### Direktelenke

Direktelenken er konstruert på bakgrunn av utgavens eksterne tjenestekode og eksterne utgavekode:

```
https://<A>/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=<B>&ServiceCode=<C>
```

 - `<A>` er adressen til miljøet
 - `<B>` er den eksterne tjenesteutgavekoden
 - `<C>` er den eksterne tjenestekoden

F.eks.

https://tt02.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=635821&ServiceCode=854214

### Migreringsstatus på utgaven arbeidsflate

På utgavens arbeidsflate er det et område for *Migrering og status*. Her vises en oversikt over versjonens status. Herfra kan du også gå
direkte til siden med migreringsoversikt via en lenken *Migreringsstatus*.

Mulige statuser for
utgave:

| Tilstand                                                                                 | Siste versjon   | Siste migrering        | I produksjon                |
| ---------------------------------------------------------------------------------------- | --------------- | ---------------------- | --------------------------- |
| Tjenesteutgaven er opprettet, men ikke migrert noe sted.                                 | Under utvikling | Ikke migrert           | Nei                         |
| Tjenesteutgaven er migrert til et testmiljø                                              | Migrert         | Dato for migrering     | Nei                         |
| Tjenesteutgaven er migrert til et testmiljø, men forandret etterpå.                      | Under utvikling | Dato for migrering     | Nei                         |
| Tjenesteutgaven er migrert til produksjonsmiljø.                                         | Migrert         | Migrert til produksjon | Produksjons­setting bestilt |
| Tjenesteutgaven er aktivert i produksjon (ved at aktiverings­linken i TUL er klikket på) | Migrert         | Migrert til produksjon | Ja                          |
| Tjenesteutgaven er endret etter produksjons­setting er bestilt                           | Under utvikling | Migrert til produksjon | Produksjons­setting bestilt |
| Tjenesteutgaven er endret etter at den er aktivert i produksjon                          | Under utvikling | Migrert til produksjon | Ja                          |

**Migrerings­status**

 - Blank (hvis ingen migrering pågår)
 - Løpende status (hvis migrering pågår)


Statusverdiene oppdateres når siden lastes. For å sjekke utviklingen mens en migrering pågår, må du oppdatere siden (Refresh). Hvis flere
migreringer pågår i parallell, vil siden vise alle statusendringene fortløpende på tvers av migreringsprosesser. For å se status og
eventuelle advarsler og feilmeldinger per migrering, må du imidlertid bli stående på siden Migreringsstatus til migrering er gjennomført.

En innsendingstjenestes utgave kan inngå som underskjema i et skjemasett for en annen innsendingstjeneste. Om utgaven er migrert som
underskjema i et skjemasett vil det dukke opp et nytt område på arbeidsflaten med status over siste migrering som underskjema. I motsetning
til migreringsstatusen for utgaven som hovedskjema vil ikke denne statusen oppdateres i sanntid

### Kjente feilmeldinger

Ved migrering til Sluttbrukerløsningen gjennomføres et sett med kontroller som kan resultere i advarsler eller feilmeldinger til
tjenesteutvikler. Til tross for mange eksplisitte kontroller av metadata og skjema kan det oppstå plutselige og uhåndterte feil som følge av
kommunikasjons­problemer, problemer med skjema o.l. Det er vanskelig for løsningen å ”oversette” alle feil i og med at de stammer fra et
standardprodukt. Her vil vi derfor forsøke å beskrive noen av de vanligere feilmeldingene som kan oppstå ved uhåndterte feil.

**"An unexpected error occured that prevented the migration of the service edition. Migration failed"**

> Denne tyder i de fleste tilfeller på at noe er feil med skjemaet, som gjør at TUL ikke klarer å migrere skjemaet på hovedspråket. Åpne
> skjemaet i InfoPath og påse at Design checker ikke melder noen feil. Rett evt. feil og sjekk inn skjema på nytt.

**"A communication error occured that prevented communicating with SBL. Unable to migrate"**

> Denne antyder i 9 av 10 tilfeller at TUL ikke får kontakt med importeringstjenesten i SBL. Det kan også bety at skjemaserverene i SBL ikke
> klarer å laste opp skjema og kaster et unntak. Vent noen minutter og prøv igjen, hvis du har mistanke om at det er skjema, kjør design
> checker.

**"The request channel timeout while waiting for a reply...Timeout"**

> Dette indikerer at SBL bruker for lang tid på å svare. Dette kan enten skyldes en feil i SBL, eller at trykket på løsningen er veldig
> stort. Vent noen minutter og forsøk igjen.

**"SBL was unable to import the service editon package sent. All the changes have been rolled back. Migration failed. SBL returned the message: An error occurred: The XSN cannot be used on the server"**

> Dette indikerer at det er noe feil med skjemaet som forsøkes lastet opp. Påse at skjemaet er ”Browser enabled”, og at design checker ikke
> rapporterer noen feil.
> 
> Denne vil også vises hvis et eller flere felter er ubundet, ved f.eks. at det er fjernet en datakilde e.l. Typisk hvis en felles datakilde
> er fjernet.

**"An error occured"**

> Dette er en standard SharePoint feilmelding som i de fleste tilfeller skyldes en feil med løsningen eller serverproblemer, og ikke utgaven
> som er forsøkt migrert.

**"SBL was unable to import the service edition package sent. All the changes have been rolled back. Migration failed. SBL returned the message: An error occurred: Object reference not set to an instance of an object"**

> Dette indikerer at det er noe feil med skjemaet som forsøkes lastet opp. Påse at design checker ikke rapporterer noen feil. Forsøk å rull
> tilbake skjema til en tidligere versjon og forsøk igjen. I de fleste tilfeller kommer denne feilen hvis det finnes felter i skjemaet som
> ikke er bundet mot datakilden, eller at en datakilde som hadde felter bundet mot seg, er fjernet.

## Rulle tilbake

For å rulle tilbake til en tidligere migrert versjon av utgaven i portalmiljø må du på migreringssiden velge den versjonen du ønsker å rulle
tilbake til, i nedtrekkslisten der du kan velge miljø (*2 Velg miljø*). Denne lister alle versjoner av utgaven.

Vil du rulle tilbake arbeidsflaten i TUL, må dette gjøres manuelt ved hjelpe av migreringsrapporten for gitt versjon. Du benytter da
migreringsrapporten for versjonen du vil gjenskape, og går inn i hver enkel metadataseksjon og oppdaterer slik at det blir likt
migreringsrapportens verdier.

Merk at det kan være lurt å rulle tilbake InfoPath-skjemaet først. Dette gjøres ved å velge versjonslogg for gitt skjema. Du blir da
presentert med liste over alle versjoner:

![Figur 102 – Rulle tilbake skjema](/docs/images/guides/tul/rulle-tilbake.png "Figur 102 – Rulle tilbake skjema")

Ved å klikke på pilen til høyre for versjonen du vil hente fram igjen, får du frem en kontekstmeny med valget ”Gjenopprett”. Ved å velge
dette blir gjeldende versjon av skjema på arbeidsflaten erstattet med det du valgte å gjenopprette.