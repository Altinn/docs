---
title: Ny tjeneste og utgave
description: Hvordan opprette nye tjenester og utgaver.
toc: true
weight: 10
---

En tjeneste i TUL SharePoint fungerer som en beholder for utgavene. Med dette menes at man ikke migrerer selve tjenestene til SBL, men
utgaver som tilhører tjenesten. Og hver gang den migreres med endret innhold, vil det opprettes en ny *versjon* av utgaven i SBL.

En tjeneste kan ha en eller flere utgaver, for eksempel en utgave per år. I TUL finner du en arbeidsflate for tjeneste og en for utgave. For
å identifisere en tjeneste og en utgave har TUL egne parametersider knyttet til tjenesten –
[tjenesteparametre](../felles-funksjonalitet/#tjenesteparametre) – og til utgaven –
[utgaveparametre](../felles-funksjonalitet/#utgaveparametere). Tjenesteparametrene er felles for alle utgaver av tjenesten.

På arbeidsflaten for tjeneste ligger det et dokumentbibliotek. Her kan man legge inn relevante dokumenter fra avklaringer før arbeidet
starter i TUL, og spesifikasjoner som utarbeides underveis. Det kan være hensiktsmessig å opprette selve tjenesten tidlig, slik at man kan
ta i bruk dette designbiblioteket for å dele dokumentasjon.

## Lage tjeneste

For å lage en ny tjeneste, klikk på *Ny* i menylinjen til listen over tjenester. Da kommer du først til siden
[tjenesteparametre](../felles-funksjonalitet/#tjenesteparametre), som vist i figur 18.

![Figur 18 - Lage tjeneste](/docs/images/guides/tul/lage-tjeneste.png "Figur 18 - Lage tjeneste")

Som vist i figuren over kan man angi fem forskjellige parametere:

  - **Tjenestenavn:** Dette er tjenestens fulle navn og brukes i SBL for avansert søk og i rettighetsvisninger i SBL. Spesialtegn støttes
    ikke.

  - **Kortnavn:** Dette er tjenestens identifikator i TUL og brukes ikke i SBL. Kortnavnet vil kunne finnes igjen i tjenestens URL.
    Kortnavnet må også være unikt innad i en tjenesteeier. Spesialtegn og nasjonale tegn (f.eks æ,ø,å) støttes ikke.

  - **Ekstern tjenestekode:** Identifiserer tjenesten i SBL og SBS. Vil være unikt på tvers av alle tjenesteeiere i TUL, og angis automatisk
    av TUL ved opprettelse av tjenesten.

  - **Tjenestetype:** Dette angir om alle utgavene som lages for denne tjenesten enten er en [innsendingstjeneste](../innsending/),
    [meldingstjeneste](../melding/), [innsynstjeneste](../innsyn/), [samhandlingstjeneste](../samhandling/),
    [lenketjeneste](../lenke/) eller [formidlingstjeneste](../formidling/). Merk at tjenestetype ikke må velges ved opprettelse av
    tjenesten, men velges før en utgave kan lages. Når en tjenestetype er valgt og man velger *OK* eller *Sjekk inn*, vil man ikke kunne
    endre tjenestetype i ettertid.

  - **Referanse:** Fritt valgt referanse, for eksempel til papirutgave av skjema.

Når du har skrevet inn og trykker *OK*, vil arbeidsflate for tjenesten opprettes.

## Lage utgave

En utgave kan opprettes på to forskjellige måter; ny tom eller kopi basert på en eksisterende utgave. Begge måter vil resultere at en utgave
blir opprettet under valgt tjeneste.

Ny tom lages ved å klikke på *Ny* i menylinjen i tjenestelisten på arbeidsflaten for tjeneste. Se figuren nedenfor.

![Figur 19 – Ny utgave](/docs/images/guides/tul/ny-utgave.png "Figur 19 – Ny utgave")


Vil man lage en ny utgave basert på en eksisterende velger man *Ny kopi basert på denne* i kontekstmenyen til utgaven man vil basere seg på.
Se figuren nedenfor.

![Figur 20 – Ny utgave, kopi](/docs/images/guides/tul/ny-utgave-kopi.png "Figur 20 – Ny utgave, kopi")

Begge valgene vil ta deg til samme [siden for utgaveparametre](../felles-funksjonalitet/#utgaveparametere), men det er noen forskjeller. Hvis du lager en ny uten å ta kopi av en eksisterende, vil alle
felter være tilgjengelig for utfylling. Velger du derimot å lage utgaven som en kopi av en eksisterende, vil kun utgavenavn, kortnavn,
tjenesteutgavekode og hovedspråk være mulig å fylle ut. Resten må endres etterpå. Dette fordi det kun er disse verdiene som ville måtte være
unike mellom utgavene. Disse parametrene er:

  - **Utgavenavn:** Brukes som beskrivende navn i SBL

  - **Kortnavn:** Brukes kun i TUL som sitenavn og i url

  - **Tjenesteutgavekode:** brukes som unik identifikator i SBL og SBS. Denne behøver kun å være unik innenfor tjenesten. En god regel er å
    enten gi utgavene kodene 1, 2, 3 osv. 2007, 2008, 2009 osv. Det som er viktig er at på [skjemasettsiden](../innsending#skjemasett)
    og for SBL vil utgaven med høyest kode ansees å være nyest.

  - **Hovedspråk** angir hvilken som blir grunnspråket for utgaven

Når du har skrevet inn og trykker *OK*, vil arbeidsflate for tjenesten opprettes.

Hvis du kopierer utgaven, vil InfoPath-skjema også kopieres. Om ønskelig kan du lage en ny kopi av tilhørende VSTA-kode. Ved endringer i
C\#-kode for den nye utgaven vil dette være hensiktsmessig. C\#-koden vil ligge på TULshare.

## Designbibliotek i TUL

Det er viktig for bruken av tjenesten at du lager en gjennomtenkt design også ut i fra sluttbrukerens ståsted. For innsendingstjenester gir
ELMER-retningslinjene føringer for utformingen. For innsynstjenester er det laget tre eksempeldokumenter, InfoPath-designs, som bør danne
mønster for utforming av brukerinteraksjon. Se [Vedlegg C: Utforming av brukervennlige tjenester](../../vedlegg/c/).

Design kan utføres i TUL, men også i egne dokument i forkant av at tjenesten opprettes. Fra tjenestens arbeidsflate i TUL kan du samle
relevant bakgrunnsinformasjon og eksisterende designdokumenter knyttet til tjenesten, i et dokumentbibliotek.

Dokumentbiblioteket har versjonskontroll, så du bør sjekke ut dokumentet for å hindre at andre gjør endringer samtidig.

Designdokumentasjonen vil være felles for alle utgavene av tjenesten. Hvis det etter hvert utvikles mange versjoner, kan det være praktisk å
lage en katalogstruktur i dokument-biblioteket. Dette gjøres ved å navigere til selve dokumentbiblioteket ved å klikke på overskriften
*Designdokumenter* fra arbeidsflaten for tjenesten*.* Det som skjer nå er at du ser selve dokumentbiblioteket i SharePoint kontekst/GUI. Her
ser du flere knapper som kan benyttes. Velg *Ny* og så *Ny mappe*, som vist i figuren nedenfor. Dette er standard og normal
SharePoint-oppførsel, og vil være samme for andre dokumentbiblioteker.

![Figur 21 – Lage mappe](/docs/images/guides/tul/lage-mappe.png "Figur 21 – Lage mappe")

På denne måten kan du lage en oversiktlig struktur.

## Skjemadesign i InfoPath

InfoPath kan også brukes som designverktøy. Måten dette gjøres på, er å lage skallet til skjemaet uten å basere dette på en datakilde (XSD).
Det man gjør da, er å lage en ny tom mal i InfoPath, som vist i figuren under. Skjemaet får da sin egen datakilde, som ikke er basert på en
eksisterende XSD.

![Figur 22 – Ny, tom mal i InfoPath](/docs/images/guides/tul/ny-tom-mal.png?width=700 "Figur 22 – Ny, tom mal i InfoPath")

Deretter er det bare å lage utkastet til hvordan skjemaet skal se ut. Dette gjøres ved å dra inn felter og grupper på vanlig måte.

Det interessante skjer når man vil bruke designet til utvikle selve skjemaet. Det man må gjøre nå, er å konvertere hoveddatakilden til å
bruke en ferdig datakilde (XSD), f.eks. meldingsbeskrivelsen fra oppgaveregisteret. Dette gjøres ved å velge *Data* fra InfoPath sin
menylinje, deretter velge *Oppdater felt...*, som vist i figuren under.

![Figur 23 – Oppdater felt](/docs/images/guides/tul/oppdater-felt.png "Figur 23 – Oppdater felt")

Man velger så den hoveddatakilden man vil at skjemaet skal bruke, samt at man ikke vil bruke flere datakilder. Nå har skjemaet den
datakilden det skal ha, og designet har blitt tatt i bruk. Det siste som må gjøres, er å endre binding på de brukergrensesnittelementene som
allerede er skjemaet. Dette gjøres ved å høyreklikke på valgt element og velge *Endre binding...* . Design utarbeidet i andre applikasjoner
enn InfoPath vil ikke kunne tas i bruk direkte som skjema eller en del av skjema.

**MERK:** Når man utvikler skjemaer hvor man ønsker en betinget formatering basert på en dynamisk verdi, må denne verdien først beregnes, så
settes i et hjelpefelt. Betingelsen settes deretter på hjelpefeltet. Et eksempel på dette er hvis man ønsker å sette en betinget formatering
på en verdi som er gjennomsnittet av to eller flere felter. Kan man ikke sette betingelsen rett på feltet som utfører denne beregningen.
Denne verdien må da først regnes ut, for så å settes i et hjelpefelt, hvor man deretter setter betingelsen på hjelpefeltet som inneholder
den ferdig behandlede verdien.