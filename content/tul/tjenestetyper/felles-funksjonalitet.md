---
title: Felles
description: Funksjonalitet som er felles for alle eller flere av tjenestetypene.
toc: true
---

Her beskrives funksjonalitet som er **felles** for alle eller flere av tjenestetypene, innenfor hhv.
tjenestespesifikasjon, utgavespesifikasjon og tjenesteinnhold.

Tjenestedefinering utføres fra tjenestens arbeidsflate, mens definering av utgave gjøres fra utgavens arbeidsflate.

Å definere tjenesten består i å utarbeide [tjenestespesifikasjonen](#tjenestespesifikasjon), som omfatter kun tjenesteparametere.
Å definere utgaven består i å utarbeide [utgavespesifikasjonen](#utgavespesifikasjon), som består av alle parametre som ikke er
knyttet til eventuelt tjenesteinnhold. Eksempel på [tjenesteinnhold](#tjenesteutgavens-innhold) er skjema som utvikles i InfoPath.

Tjenestespesifikasjonen vil være den samme for alle utgaver i gitt tjeneste, mens hver enkelt utgave kan ha forskjellige spesifikasjoner.

## Tjenestespesifikasjon

Tjenestespesifikasjonen initieres allerede idet du velger å opprette en ny tjeneste, ved at siden *Tjenesteparametre* åpnes.

### Tjenesteparametre

Når tjenesteparametrene er fylt ut, er tjenesten ferdig definert. Du kan senere komme til denne siden ved å klikke på *Tjenesteparametere*
på arbeidsflaten for tjenesten. Et utsnitt fra skjermbildet av siden vises under.

![Figur 24 – Tjenesteparametere](/docs/images/guides/tul/tjenesteparametre.png "Figur 24 – Tjenesteparametere")

Det som er verdt å merke seg, er at ekstern *tjenestekode* og *tjenestetype* ikke kan endres etter at det er valgt og lagret.

Følgende parametre kan defineres på
tjenesteparametersiden:

| Parameter            | Beskrivelse                                                                                                                                              | Obligatorisk | Type     | Språk­støtte
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | -----------
| Tjenestenavn         | Dette er tjenestens fulle navn og brukes i SBL for avansert søk og i rettighetsvisninger i SBL.                                                          | Ja           | Tekst    | Ja
| Kortnavn             | Tjenestens kortnavn er navnet på tjenestens arbeidsflate i TUL, og brukes i URL. Denne støtter ikke spesialtegn.                                         | Ja           | Tekst    | 
| Ekstern tjenestekode | Ekstern tjenestekode brukes til å identifisere en tjeneste i Altinn, for eksempel ved dyplenking. Denne genereres automatisk.                            | Ja           | Tekst    |
| Tjenestetype         | Tjenestetype brukes til å definere type tjeneste. Tjenestetype må settes før man kan opprette en utgave av tjenesten.                                    | Nei          | Liste    |
| Referanse            | Referanse kan for eksempel brukes som referanse til papirutgaven av tjenesten eller skjemanavn. Maksimalt 10 tegn (bokstaver, siffer eller spesialtegn). | Nei          | Tekst    |

## Utgavespesifikasjon

Fra tjenestens arbeidsflate kan du [opprette en utgave under tjenesten](../ny#lage-utgave). Du kan senere komme til denne siden ved å
klikke på *Utgaveparametere* på arbeidsflaten for tjenesteutgaven. Hvilke parametre som må angis for en tjenesteutgave, kommer an på hva
slags tjenestetype som ble valgt for tjenesten. Oversikt over alle parametere gis i neste avsnitt.

I tillegg til utgaveparametrene kan du fra utgavearbeidsflaten navigere deg inn på andre parametersider for å definere utgaven. For alle
tjenestetyper kan du i tillegg til utgaveparametrene velge å overstyre rettighetene til tjenesteutgaven. For å definere dette må du velge
*Overstyr rettigheter* under området for *Utgavespesifikasjon.*

De andre parametrene som definerer utgaven, vil avhenge av type tjeneste.

[Utgaveparametere](#utgaveparametere) og [overstyr rettigheter](#overstyr-rettigheter) er beskrevet i dette kapitlet, mens de parametersidene som er spesifikke for en gitt utgavetype,
er beskrevet i kapitlet som omhandler den aktuelle typen.

### Utgaveparametere

Utgaveparametrene brukes for å identifisere og konfigurere egenskaper ved utgaven. Parametrene er tilpasset den aktuelle tjenestetypen.
Selve parametrene er listet midt på siden. Parametrene er gruppert etter type parameter og til venstre på siden fins en forklaring til
parametrene.

<img src="/docs/images/guides/tul/utgaveparametre-1.png?width=800" style="margin-bottom: 0" alt="">
<img src="/docs/images/guides/tul/utgaveparametre-2.png?width=800" style="margin: 0 auto" alt="">
<img src="/docs/images/guides/tul/utgaveparametre-3.png?width=800" style="margin: 0 auto" alt="">
<img src="/docs/images/guides/tul/utgaveparametre-4.png?width=800" style="margin: 0 auto" alt="">
<img src="/docs/images/guides/tul/utgaveparametre-5.png?width=800" style="margin: 0 auto" alt="">

**Figur 25 – Utgaveparametere, innsendingstjeneste**

Følgende parametre kan definers på utgaveparametersiden:

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Beskrivelse</th>
<th>Tjeneste­type</th>
<th>Obl.</th>
<th>Type</th>
<th>Språk­støtte</th>
</tr>
</thead>
<tbody>
<tr>
<td>Utgavenavn</td>
<td>Utgavens navn vises på utgavens arbeidsflate i TUL.</td>
<td>Alle</td>
<td>Ja</td>
<td>Tekst</td>
<td>Ja</td>
</tr>
<tr>
<td>Kortnavn</td>
<td>Utgavens kortnavn er navnet på utgavens arbeidsflate i TUL. Kan maksimalt inneholde 30 bokstaver eller siffer. Kan ikke inneholde spesialtegn, dog ‘–‘ og ‘_’.</td>
<td></td>
<td>Ja</td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Tjenesteutgave­­­kode</td>
<td>Tjenesteutgavekode brukes sammen med ekstern tjenestekode til å identifisere en utgave i Altinn, for eksempel ved dyplenking. Tjenesteutgavekoden må være unik innenfor en tjeneste. Maksimalt 6 siffer. Dette feltet kan ikke endres i etterkant og vil være “read only” etter at utgaven er lagret første gang.</td>
<td>Alle</td>
<td>Ja</td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Hovedspråk</td>
<td>Angir utgavens hovedspråk. Brukes som oversett-fra-språk ved oversetting.</td>
<td>Alle</td>
<td>Ja</td>
<td>Liste</td>
<td></td>
</tr>
<tr>
<td>Gyldig fra</td>
<td>Angir når utgaven er tilgjengelig i SBL. Gjelder i utg.punkt produksjonsmiljø, men også testmiljø hvis ”Gyldig fra-dato” overstyres ved migrering.</td>
<td>Alle</td>
<td></td>
<td>Dato + Tid</td>
<td></td>
</tr>
<tr>
<td>Gyldig til</td>
<td>Angir når utgaven ikke lengre er tilgjengelig i SBL. Gjelder i utg.punkt produksjonsmiljø, men også testmiljø hvis ”Gyldig til-dato” overstyres ved migrering.</td>
<td>Alle</td>
<td></td>
<td>Dato + Tid</td>
<td></td>
</tr>
<tr>
<td>Kun underskjema</td>
<td>Angir at denne utgaven kun blir brukt som et underskjema. Prosessflyt og skjemasett, samt migrering blir utilgjengelig.</td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Mastertjeneste­utgave</td>
<td>Denne brukes for å markere at utgaven skal være tilgjengelig for gjenbruk av andre tjenesteeiere</td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Meldingstype</td>
<td>Angir hva slags meldingstype denne utgaven er. Vanligvis velges <em>Binær/HTML.</em> Øvrige valg er <em>Skatteoppgjør</em> og <em>Foreløpig skatteoppgjør</em>; disse brukes bare for meldinger som skal håndteres spesielt i SBL ifm. Selvangivelse­løsningen</td>
<td>Melding</td>
<td>Ja</td>
<td>Liste</td>
<td></td>
</tr>
<tr>
<td>
Overfør ved bruk av spesifisert metode |
Hent ved bruk av webservice (DownloadQueue)
</td>
<td>Angir hvordan innsendte tjenesteutgaver skal overføres fra Altinn til tjenesteeiers mottakersystem. Innsendte tjenesteutgaver kan enten sendes til mottakersystem eller hentes av mottakersystem. Ved sending må det spesifiseres metode.</td>
<td>Innsending</td>
<td>Ja</td>
<td>Radio</td>
<td></td>
</tr>
<tr>
<td>Metode for oversending av tjenesteutgaves data</td>
<td>Angir hvordan en tjenesteutgaves data skal sendes fra Altinn til tjenesteeiers mottakssystem. Her kan det velges mellom de ulike grensesnittene som er gyldig for den gitte tjenesteeier. For innsynstjenester er det kun en kvittering på benyttet innsyn som sendes.</td>
<td>Innsending, innsyn, melding</td>
<td></td>
<td>Liste</td>
<td></td>
</tr>
<tr>
<td>Inkluder PDF-skjema i oversendingen</td>
<td><p>Angir om en PDF/A-1b-versjon av utgavens skjema(sett) skal oversendes sammen med tjenesteutgaves data til tjenesteeier. Denne vil være lik den som bruker selv kan åpne fra portalen, og inneholde alle hoved- og underskjema samlet. Benyttes funksjonaliteten sammen med sensitive opplysninger vil eventuelle krypterte felter vises med #-tegn tilsvarende bruker generert PDF.</p>
<p>Hvis innsendingstjenesten også er satt opp med split av data vil kun eieren av tjenesten motta PDF.</p>
<p>PDF vil ikke kunne sendes ved bruk av flatfil for oversendelse, kun ved bruk av Altinn XML format.</p>
<p>Parameteren bør ikke brukes ved store volumer av tjenesten, og ytelse bør diskuteres med ASF.</p></td>
<td>Innsending</td>
<td></td>
<td>Sjekk-boks</td>
<td></td>
</tr>
<tr>
<td>Utskriftsvisning</td>
<td>Forteller hvilken visningsmetode som skal brukes når utskriftsvisning genereres i SBL. Eneste valg nå er pdf.</td>
<td>Innsending</td>
<td></td>
<td>Liste</td>
<td></td>
</tr>
<tr>
<td>Kjør ved</td>
<td>Angir når kontroll skal kjøres. Her kan man velge mellom før eller under instansiering avhengig av tjenestetype.</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>Kontroll</td>
<td>Angi hvilken kontroll som skal kjøres ved instansiering av tjenesten.</td>
<td>Innsending, lenke</td>
<td></td>
<td>Liste</td>
<td></td>
</tr>
<tr>
<td>URL</td>
<td><p>Angir hvilken URL lenketjenesten skal åpne.</p>
<p>For lenketjeneste som representerer en ekstern ressurs som ikke trenger åpning av lenke og ønsker å ta i bruk forenklet delegering i Altinn må denne settes til en spesifikk verdi.</p>
<p>Se <a href="../lenke/">Lenketjenester</a> for mer informasjon.</p></td>
<td>Lenke</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Vis ELMER</td>
<td><p>Angir om skjema skal presenteres i sluttbrukerløsningen i henhold til ELMER-retningslinjene. <em>Vis ELMER</em> er satt som default valg i TUL. Dette vil gi et navigasjonsområde til venstre og et område for selvvalgt tilleggs­informasjon til høyre. I tillegg vil det være en knapperad med navigasjonsknapper under skjemaet.</p>
<p>Se <a href="../../vedlegg/c/">Vedlegg C: Utforming av brukervennlige tjenester</a> for mer informasjon.</p></td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Fri navigasjon | Styrt navigasjon</td>
<td><p>Angir om navigasjonen skal være fri eller styrt. Bruk av ELMER med fri navigasjon er satt som default valg i TUL, og anbefales. Kun i spesielle tilfeller kan det være hensiktsmessig å velge styrt navigasjon, som for eksempel hvis det er nødvendig å lede sluttbrukeren gjennom et bestemt resonnement.</p>
<p>Se <a href="../../vedlegg/c/">Vedlegg C: Utforming av brukervennlige tjenester</a> for mer informasjon.</p></td>
<td>Innsending</td>
<td></td>
<td>Radio</td>
<td></td>
</tr>
<tr>
<td>Lagre i arkiv</td>
<td>Angir om tjenesteutgaven skal lagres under <em>Sendt og arkivert</em> i <em>Min meldingsboks</em> i SBL. Satt som default valg i TUL.</td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Tillat instansiering fra arkiv</td>
<td>Angir om om sluttbruker kan lage en ny kopi av arkivert tjeneste i SBL. Satt som default valg i TUL. Deaktiveres hvis <em>Lagre i arkiv</em> ikke er valgt.</td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Tillat delvis kopiering</td>
<td>Utgavens navn vises på utgavens arbeidsflate i TUL.</td>
<td>Innsending</td>
<td>Nei</td>
<td>Sjekk-boks</td>
<td></td>
</tr>
<tr>
<td>Send status om meldingen er lest</td>
<td>Angir om det skal sendes melding om sluttbruker har lest meldingen</td>
<td>Melding</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Send status etter antall dager</td>
<td>Angir antall dager det skal gå før det sjekkes og sendes melding om sluttbruker har lest meldingen. Deaktivert om <em>Send status om meldingen er lest</em> ikke er valgt.</td>
<td>Melding</td>
<td></td>
<td>Tall</td>
<td></td>
</tr>
<tr>
<td>Logge informasjon om leseaktivitet i tjenesteeiers arkiv</td>
<td>Angir om leseaktivitet i tjenesteeiers arkiv skal logges eller ikke.</td>
<td>Innsending, melding</td>
<td></td>
<td>Sjekk-boks</td>
<td></td>
</tr>
<tr>
<td>Lagring av sporings- og logginforma­sjon i loggarkiv (TTP-data)</td>
<td>Angir i antall år hvor lenge sporings- og logginformasjonen skal lagres i loggarkivet (TTP). Default og minimum er 10 år.</td>
<td>Alle</td>
<td>Ja</td>
<td>Tall</td>
<td></td>
</tr>
<tr>
<td>Lagringstid i tjenesteeieres arkiv</td>
<td>Angir hvor lenge melding skal lagres om tjenesteeier sender melding til sluttbruker. Hvis ingen lagring, angis 0 år og 0 måneder.</td>
<td>Innsending, melding</td>
<td>Ja</td>
<td>Tall</td>
<td></td>
</tr>
<tr>
<td>Tillat innsending fra SBS</td>
<td>Angir om tjenesten kan sendes inn fra et eksternt sluttbrukersystem. Satt som default valg i TUL.</td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Tillat instansiering for sluttbrukere uten brukerprofil</td>
<td>Angir om tjenesten skal kunne instansieres fra etat for en bruker som ikke har samtykket til bruk av Altinn.</td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td><p>Kvitteringstekst</p>
<p>Informasjons­tekst</p></td>
<td>Etter å ha fylt ut et skjema i SBL vil sluttbruker bli sendt til en egen kvitteringsside med kvitteringsteksten. Se <em>Vedlegg C: Veiledning i utforming av brukervennlige tjenester</em> for mer informasjon.</td>
<td>Innsending</td>
<td></td>
<td>Tekst</td>
<td>Ja</td>
</tr>
<tr>
<td>Kvitteringstekst i portal</td>
<td>Etter å ha fylt ut et skjema i SBL vil sluttbruker bli sendt til en egen kvitteringsside med kvitteringsteksten. Se <em>Vedlegg C: Veiledning i utforming av brukervennlige tjenester</em> for mer informasjon.</td>
<td>Innsending</td>
<td></td>
<td>Tekst</td>
<td>Ja</td>
</tr>
<tr>
<td>Kvitteringstekst i e-post</td>
<td>Etter å ha fylt ut et skjema i SBL vil sluttbruker bli sendt til en egen kvitteringsside med kvitteringsteksten. Se <em>Vedlegg C: Veiledning i utforming av brukervennlige tjenester</em> for mer informasjon.</td>
<td>Innsending</td>
<td></td>
<td>Tekst</td>
<td>Ja</td>
</tr>
<tr>
<td>Krav til avgivertype</td>
<td>Angir hvilke type brukere som kan stå som avsender av en innsendingstjeneste. Kan være «<em>privatperson», «juridisk enhet (foretak)», «bedrift», «bedrift eller en juridisk enhet (foretak)», «konkursbo», «person eller juridisk enhet», «bedrift, juridisk enhet eller konkursbo»</em> eller <em>«privatperson, juridisk enhet (foretak) eller konkursbo»</em>. <em>Bedrif</em>t er enheter med type <em>BEDR</em> eller <em>ADOS (Administrativ enhet – offentlig sektor). Konkursbo</em> er enheter av type <em>KBO. Juridisk enhet</em> er de typene som ikke er BEDR, ADOS eller KBO. Hva som skal velges vil ofte være angitt i skjemadesignet.</td>
<td>Innsending, samhandling</td>
<td></td>
<td>Liste</td>
<td></td>
</tr>
<tr>
<td>Sikkerhetsnivå</td>
<td>Angir krav til hvilken innloggingsmetode som minimum kreves for tjenesten. Kan angis som <em>Nivå 0-4.</em> Se tabell under for informasjon om de ulike nivåene.</td>
<td>Alle</td>
<td></td>
<td>Liste</td>
<td></td>
</tr>
<tr>
<td>Avsender</td>
<td>Angir hvem som står som avsender av meldingen i SBL.</td>
<td>Melding</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Bekreftelse for mottatt: Sluttbruker må bekrefte</td>
<td>Angir hvorvidt meldingen må bekreftes lest av sluttbruker. Satt som default valg i TUL.</td>
<td>Melding</td>
<td></td>
<td>Radio</td>
<td></td>
</tr>
<tr>
<td>Bekreftelse for mottatt: Sluttbruker trenger ikke bekrefte</td>
<td>Angir hvorvidt meldingen må bekreftes lest av sluttbruker.</td>
<td>Melding</td>
<td></td>
<td>Radio</td>
<td></td>
</tr>
<tr>
<td>Betrodd partner kan opprette ny forekomst</td>
<td>Angir om betrodd partner (”Trusted Partner”, sluttbrukersystem med utvidede rettigheter) kan instansiere tjenesten.</td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Krypterte data kan låses opp for visning</td>
<td>Angir om midlertidig dekryptering skal tillates hos sluttbruker hvis utgaven inneholder sensitive opplysninger som blir kryptert og uleselig etter at sluttbruker har lagt dem inn.</td>
<td>Innsending</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>I SBL kan brukere logge inn som en virksomhet, uten å bli autentisert som en bestemt person. En virksomhets­bruker kan være en av flere ulike personer.</td>
<td>Angir om en virksomhets­identifisert bruker ikke kan benytte seg av tjenesten.</td>
<td>Alle</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Send status for melding og når</td>
<td>Angir hvorvidt status for melding skal sendes til tjenesteeier (<em>ikke åpnet</em>, <em>åpnet</em>, <em>bekreftet</em>; standard verdi er <em>ikke åpnet</em>) og hvor lenge innen informasjonen skal sendes (dager). Sjekkboksen angir om informasjonen skal sendes eller ikke, i tekstboksen angis antall dager innen informasjonen sendes (standard verdi er 7 dager). Tekstboksen aktiveres hvis sjekkboksen er sjekket.</td>
<td>Melding</td>
<td></td>
<td>Sjekk­boks og tekst</td>
<td></td>
</tr>
<tr>
<td>Send bekreftelse: Ja / Nei</td>
<td>Angir om det skal sendes bekreftelse på at utgaven av innsynstjenesten er benyttet.</td>
<td>Innsyn</td>
<td></td>
<td>Radio</td>
<td></td>
</tr>
<tr>
<td>Tillat sluttbruker å lagre Altinn-signert kopi</td>
<td>Angir om sluttbruker kan be om Altinn-signert kopi av innsynstjenesten som lagres i sluttbrukers meldingsboks.</td>
<td>Innsyn</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Tillat videresending på e-post</td>
<td>Angir om sluttbruker kan videresende Altinn-signert innsynstjeneste på e-post.</td>
<td>Innsyn</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Informasjon til sluttbruker</td>
<td>Angir informasjon som vises til sluttbruker i høyre del av skjermbildet (samtidig med innsynstjenesten).</td>
<td>Innsyn</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Mappernavn</td>
<td>Navn på mapper-endepunkt</td>
<td>Innsyn</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Requestskjema</td>
<td>Skjema for innkommende forespørsler som beskriver data som skal sendes inn.</td>
<td>Innsyn</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Responsskjema</td>
<td>Skjema for utgående forespørsler som beskriver data som blir sendt ut</td>
<td>Innsyn</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Kan inngå i samhandlings­tjeneste</td>
<td>Angir om utgaven vises i listen over tjenesteutgaver som kan inngå i en samhandlingstjeneste.</td>
<td>Innsending, melding, innsyn</td>
<td></td>
<td>Sjekk­boks</td>
<td></td>
</tr>
<tr>
<td>Erstatt standard instansiering I SBL med tilpasset programlogikk (URL)</td>
<td>Angir en URL for programlogikken som skal aktiveres når instansiering normalt utføres. Benyttes hvis tjenesteutgaven har spesielle krav til instansiering.</td>
<td>Innsending</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Erstatt standard skjemautfylling i SBL med tilpasset presentasjon (URL)</td>
<td>Angir en URL for den tilpassede presentasjonen som skal åpnes når skjemautfylling normalt utføres. Benyttes hvis utgaven har spesielle krav til skjemautfylling.</td>
<td>Innsending</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Erstatt standard signering/innsending i SBL med tilpasset programlogikk (URL)</td>
<td>Angir en URL for programlogikken som skal aktiveres når signering/innsending normalt utføres. Benyttes hvis utgaven har spesielle krav til signering/innsending.</td>
<td>Innsending</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Erstatt standard utskriftsvisning i SBL med tilpasset presentasjon (URL)</td>
<td>Angir en URL for programlogikken som skal aktiveres når utskriftsversjonen av skjemasettet normalt åpnes. Benyttes hvis utgaven har spesielle krav til utskrift.</td>
<td>Innsending</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Erstatt standard systemhjelp med tilpasset innhold og presentasjon (URL)</td>
<td>Angir en URL for den tilpassede hjelpen som skal åpnes fra signerings-/innsendingssiden. Benyttes hvis utgaven benytter tilpasset logikk for skjemautfylling og det er ønskelig å tilpasse systemhjelpen tilsvarende.</td>
<td>Innsending</td>
<td></td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Bruk forenklet presentasjon i innsendingsprosessen</td>
<td>Angir om SBL skal benytte forenklede sider for signering/innsending og kvittering.</td>
<td>Innsending</td>
<td></td>
<td>Sjekkboks</td>
<td></td>
</tr>
<tr>
<td>Slett filene etter at alle mottakere har lastet de ned</td>
<td>Angir om filene som blir overført skal slettes med en gang alle mottakere har lastet de ned.</td>
<td>Formidling</td>
<td></td>
<td>Sjekkboks</td>
<td></td>
</tr>
<tr>
<td>Antall dager filene skal være tilgjengelige</td>
<td>Angir antall dager filene skal være tilgjengelige for mottakerene før de ikke lenger kan lastes ned.</td>
<td>Formidling</td>
<td>Ja</td>
<td>Tekst</td>
<td></td>
</tr>
<tr>
<td>Bruk tjeneste­eier­styrt rettighets­register</td>
<td>Angir om utgaven kun skal være tilgjengelig for brukere som er registrert i tjenesteeierstyrt rettighetsregister. For lenke- og innsynstjenester gjelder dette for om samtykke skal være tilgjengelig bare for de som står i registeret.</td>
<td>Formidling, Lenke, Innsyn</td>
<td></td>
<td>Sjekkboks</td>
<td></td>
</tr>
<tr>
<td>Tillat samtykke­basert deling av data</td>
<td>Avgjør om utgaven kan brukes til å dele data basert på samtykke fra sluttbruker.</td>
<td>Lenke, Innsyn</td>
<td></td>
<td>Sjekkboks</td>
<td></td>
</tr>
<tr>
<td>Tillat bare engangssamtykker</td>
<td>Avgjør om utgaven skal brukes for engangssamtykker. Ved bruk av engangssamtykke vil tilgangen bli fjernet etter at det har blitt logget henting av data én gang.</td>
<td>Lenke, Innsyn</td>
<td></td>
<td>Sjekkboks</td>
<td></td>
</tr>
<tr>
<td>Velg samtykke-/fullmakts-mal</td>
<td>Angir hvilken mal som skal benyttes for visning av samtykket/fullmakten i Altinn. Malene i listen prefikses med (S) for samtykkemaler og (F) for fullmaktsmaler.</td>
<td>Lenke, Innsyn</td>
<td>Der­som sam­tykke er valgt.</td>
<td>Liste</td>
<td></td>
</tr>
<tr>
<td>Samtykketekst som forklarer hva brukeren samtykker til</td>
<td>Tekst som skal opplyse sluttbruker om hva det er han gir tillatelse til dersom han velger å gi samtykke. Denne er obligatorisk dersom samtykke er valgt.</td>
<td>Lenke, Innsyn</td>
<td>Der­som sam­tykke er valgt.</td>
<td>Tekst</td>
<td></td>
</tr>
</tbody>
</table>

Rettighetskrav settes på *Rolleadministrasjon*-siden som lenkes fra startsiden og *Overstyr rettigheter*-siden som lenkes fra
tjenesteutgavens arbeidsflate.

For hver utgave må man også angi hvilket sikkerhetsnivå som kreves for å åpne tjenesteutgaven i SBL. Sikkerhetsnivåene er fra 0 til 4 og
hvert nivå kan ha en eller flere innloggingsmetoder. Disse vises i tabellen under:

| *Sikkerhetsnivå* | *Innloggingsmetode*                  |
| ---------------- | -------------------------------------|
| 0                | Kun passord, uten fødselsnummer      |
| 1                | Kun passord, med fødselsnummer       |
| 2                | PIN-kode fra Altinn                  |
| 2                | PIN-kode fra selvangivelsen (utgått) |
| 2                | PIN-kode fra SMS                     |
| 3                | PIN-kode fra MinID                   |
| 3                | Virksomhetsertifikatpålogging        |
| 4                | Buypass, BankID, Commfides           |



### Overstyr rettigheter

I TUL kan systemeier definere roller med tilhørende rettigheter, mens alle har tilgang til informasjon om hva som er definert. En rettighet
gir sluttbruker tilgang til å utføre en bestemt operasjon på en bestemt ressurs for en bestemt avgiver – for eksempel å lese momsoppgavene i
arkivet til virksomheten brukeren er ansatt i. Se [Rolleadministrasjon](../../funksjonalitet/rolleadministrasjon/) for nærmere beskrivelse.

I definisjon av roller i TUL settes rettigheter på tjenestenivå. En utgave vil arve disse rettighets­kravene automatisk når den migreres
til SBL. Dette betyr at når du lager en helt ny tjeneste, må du vurdere hvilke rolledefinisjoner som skal oppdateres for å gi tilgang til
tjenesten. Tilsvarende, når du lager en ny utgave, må du vurdere om rolledefinisjonene på tjenestenivå er tilstrekkelige, eller om de bør
justeres eller overstyres for akkurat denne utgaven. Du kan hente fram en oversikt over alle rettigheter til tjenesten fra
tjeste­arbeidsflaten, se [rettigheter fra tjenestearbeidsflaten](../../rolleadministrasjon/#rettigheter-fra-tjenestearbeidsflaten)

Roller som gir rettigheter til tjenesteeiers arkiv kan ikke overstyres. Dette er roller med *rollekategori* = *tjenesteeier.*

Endring av roller på tjenestenivå må man be systemeier utføre, mens overstyring for den enkelte utgave kan gjøres av tjenesteutvikler fra
utgavens arbeidsflate.

Overstyring av rettigheter kan være aktuelt å bruke hvis en tjeneste har to utgaver som benyttes av forskjellige brukergrupper, 
f eks eBrev som kan benyttes av både virksomheter og privat person. 

{{% notice warning  %}}
Rolle og rettighetskrav skal ALLTID settes på tjenestenivå før man evt benytter seg av funksjonaliteten "overstyring av rettigheter". 
{{% /notice %}}

For samhandlingstjenester har du også muligheten til å gi roller tilgang til spesifikke rollestyrte dialogsider gjennom å benytte Overstyr
rettigheter. Ved å gi en rolle tilgang til en spesifikk dialogside vil man kunne skape ulike arbeidsflater for ulike roller for
samhandlingstjenesten.

I følgende tilfeller er det aktuelt å gå inn på siden Overstyr rettigheter:

- Rettigheter på tjenestenivå skal normalt gjelde, men det er spesielle behov knyttet til akkurat denne utgaven.
- Utgaven skal følge en prosessflyt med mer enn ett signeringstrinn.
- Samhandlingstjenesteutgaven har dialogsider som skal vises for bestemte roller.

Du kan overstyre rettigheter på utgave-, side- eller feltnivå; side- og feltnivå gjelder bare innsendingstjenester. For
samhandlingstjenester kan du i tillegg overstyre på dialogsidenvå. Du velger først ressursnivå og deretter hvilke operasjoner som skal
overstyres per rolle. Du kan definere flere overstyringer for hver utgave.

![Figur 26 – Overstyr rettigheter side, innsendingstjeneste](/docs/images/guides/tul/overstyr-rettigheter-innsending.png "Figur 26 – Overstyr rettigheter side, innsendingstjeneste")

![Figur 27 – Overstyr rettigheter side, samhandlingstjeneste](/docs/images/guides/tul/overstyr-rettigheter-samhandling.png "Figur 27 – Overstyr rettigheter side, samhandlingstjeneste")

For å overstyre rettigheter som gjelder utgaven som helhet, velger du radioknappen *Utgave/prosessflyt for innsendingstjeneste, Utgave for
andre tjenestetyper,* og trykker på knappen *Legg til overstyring.* Du vil da få opp en pop-up med en rettighetsmatrise*.* Her listes de
roller som har rettigheter for valgt ressurs vertikalt. Horisontalt listes tilgjengelige operasjoner. Operasjonene som listes, vil avhenge
av hvilken ressurs som er valgt. Hvis det for eksempel er en innsendingstjeneste med to signeringssteg, vil det være en kolonne for hvert
signeringssteg.

![Figur 28 – Overstyr rettigheter](/docs/images/guides/tul/overstyr-rettigheter.png "Figur 28 – Overstyr rettigheter")

Du har også muligheten til å liste alle roller, noe som er nødvendig for å tildele rettigheter til roller som ikke allerede har det på
tjenestenivå. Nederst til venstre i pop-up-vinduet er det en sjekkboks, og ved å ta bort haken i denne vil listen utvides til å vise alle
roller.

Du overstyrer rettighetene ved å legge til eller fjerne markeringer for hvilke operasjoner hver enkelt rolle skal kunne utføre. Deretter
trykker du på *OK­*-knappen for å lagre og lukke pop-up-vinduet. Du vi se at det nederst på siden kommer et nytt innslag i listen over alle
ressurser med overstyrte rettigheter.

For innsendingstjenester kan du i tillegg overstyre rettigheter for en enkelt side eller et enkelt felt. Du må da velge radioknappen
*Side/felt* og deretter hvilken side og eventuelt hvilket felt det gjelder, før du klikker på knappen *Legg til overstyring.* Da kommer du
til rettighets­matrisen og fortsetter som for overstyring på utgavenivå.

For samhandlingstjenester som har rollestyrte dialogsider, kan du gi tilgang til disse ved å velge radioknappen Dialogside og deretter velge
aktuell dialogside. Bare dialogsider som er lagt til som ”rollekontrollert” på siden *Tilstander*, er tilgjengelig for slik overstyring.
Marker valget i kolonnen Dialogside-tilgang for de rollene som skal få tilgang til siden. Også her har du mulighet til å liste alle roller,
men det er uansett bare roller som har rettighet til selve tjenesteutgaven som vil kunne se tjenesten i sin meldingsboks. Merk at for en ny
utgave opprettet ved å kopiere en eksisterende vil eventuelle overstyringer også bli kopiert.

![Figur 29 – Overstyr rettigheter – dialogside](/docs/images/guides/tul/overstyr-rettigheter-dialog.png "Figur 29 – Overstyr rettigheter – dialogside")

Du kan senere endre eller slette overstyringene ved å trykke på *Endre*- eller *Slett*-lenkene som er knyttet til hvert enkelt innslag i
listen med overstyringer.

For å overstyre rettigheter på felter som blir hentet fra sekundær datakilde vil dette kun fungere sammen med følgende URL:

http://mapperservices.altinn.no:87/ServiceEngine/FormsEngineFieldLevelDataSource.svc?wsdl

For mer informasjon om sekundær datakilde / [kodelister](../../funksjonalitet/kodelister/).

Skriv inn URL som er oppgitt over for å angi web service lokasjon:

![Figur 30 – legg til sekundær datakilde](/docs/images/guides/tul/sekundær-datakilde.png "Figur 30 – legg til sekundær datakilde")

Trykk Neste.

![Figur 31 – legg til sekundær datakilde](/docs/images/guides/tul/sekundær-datakilde-2.png "Figur 31 – legg til sekundær datakilde")

Velg GetFieldAuthorization method og *Neste*

![Figur 32 – legg til sekundær datakilde](/docs/images/guides/tul/sekundær-datakilde-3.png "Figur 32 – legg til sekundær datakilde")

Du kan nå velge *sample values*. Velg "-1" i alle felter.

![Figur 33 – legg til sekundær datakilde](/docs/images/guides/tul/sekundær-datakilde-4.png "Figur 33 – legg til sekundær datakilde")

Velg bort Hent data automatisk når skjemaet åpnes check box. Klikk *Finish*.

![Figur 34 – sekundær datakilde i InfoPath](/docs/images/guides/tul/sekundær-datakilde-infopath.png "Figur 34 – sekundær datakilde i InfoPath")

Den sekundære datakilden kan ses i InfoPath skjema under Datakilder (Sekundær).

Legg merke til at navn med prefix "ns6" vil kunne variere fra skjema til skjema.

Den sekundære datakilden må nå legges inn i InfoPaths kodefil (FormCode.cs). Trykk *Utvikler* *Innlastingshendelse* i InfoPath.

![Figur 35 – legg til Loading Event kode](/docs/images/guides/tul/loading-event.png "Figur 35 – legg til Loading Event kode")

Følgende kode må være lagt inn i `FormEvents_Loading`-metoden:

```csharp
string FormID     = (FormState["FormID"] != null) ? FormState["FormID"].ToString() : string.Empty;
string UserID     = (FormState["UserID"] != null) ? FormState["UserID"].ToString() : string.Empty;
string ReporteeID = (FormState["ReporteeID"] != null) ? FormState["ReporteeID"].ToString() : string.Empty;

NamespaceManager.AddNamespace("namespaceprefix", "http://www.altinn.no/services/ServiceEngine/FormsEngine/2009/10"); // refer the figure below!!
NamespaceManager.AddNamespace("dfs", "http://schemas.microsoft.com/office/infopath/2003/dataFormSolution");

XPathNavigator xnav = this.DataSources["GetFieldAuthorization"].CreateNavigator();
XPathNavigator formid = xnav.SelectSingleNode("copy & paste the XPath of the formID from the GetFieldAuthorization secondary data source", NamespaceManager);
XPathNavigator userid = xnav.SelectSingleNode("copy & paste the XPath of the userID from the GetFieldAuthorization secondary data source", NamespaceManager);
XPathNavigator reporteeid= xnav.SelectSingleNode("copy & paste the XPath of the reporteeID from the GetFieldAuthorization secondary data source", NamespaceManager);

formid.SetValue(FormID);
userid.SetValue(UserID);
reporteeid.SetValue(ReporteeID);

this.DataSources["GetFieldAuthorization"].QueryConnection.Execute();
```

![Figur 36 – Datakilde namespace](/docs/images/guides/tul/datakilde-namespace.png "Figur 36 – Datakilde namespace")


Legg merke til at XPath brukt i `XPathNavigator` fra koden over må hentes fra feltene i den sekundære datakilden som ble lagt inn i skjemaet.

Høyreklikk på de aktuelle feltene i InfoPath og velg *kopier XPath* for å finne korrekt XPath. Hvis den korrekte XPath ikke blir benyttet i
koden vil det resultere i en "null reference" og en skjema exception vil bli kastet i SBL. Hvis koden over allerede finnes i skjemakoden bør
denne koden sammenslåes med den eksisterende koden.

Følgende elementer i InfoPath støttes av overstyring av rettigheter i Altinn:

  - Text Box
  - Rich Text Box
  - Combo Box
  - List Box
  - Check Box

Repeterende tabeller og seksjoner støttes ikke.

## Tjenesteutgavens innhold

Tjenesteinnholdet består av den informasjonen som formidles mellom tjenesteeier og bruker. For de fleste tjenestetypene kan slikt innhold
presenteres og eventuelt registreres gjennom et skjema som utvikles i InfoPath, som er et standard Microsoft Office-produkt. Et
InfoPath-skjema representerer dermed tjenesteinnholdet og interaksjonen med sluttbruker i SBL. Det definerer utgavens ”brukergrensesnitt” og
grafiske layout.

For innsendingstjenster og innsynstjenester er InfoPath-skjema en sentral og nødvendig del. For de andre tjenestetypene er andre
innholdstyper sentrale, og disse beskrives under den enkelte tjenestetypen.

### InfoPath-skjema i Altinn

Nedenfor følger en beskrivelse av prinsippene for håndtering av skjemaer i TUL. Mer informasjon som er rettet direkte mot hver enkelt
tjenestetype, finnes i tjenestetype-kapitlene i underkapitler under ”Iinnhold”. Der refereres det også til vedlegg med detaljinformasjon
rettet mot den enkelte tjenestetypen.

En generell brukerveiledning i InfoPath gis ikke i denne brukerveiledningen, og det henvises til Microsoft sin generelle brukerdokumentasjon
på dette standardproduktet.

#### Skjemabibliotek, skjema og visning

Under området for Innholdsspesifikasjon på utgavens arbeidsflate kan du legge til et InfoPath-skjema og åpne og redigere skjemaet i
Microsoft Office InfoPath.

Skjemaet lastes opp og vedlikeholdes i skjemabiblioteket på arbeidsflaten, som vist i Figur 1. Dette er et standard SharePoint
dokumentbibliotek, men godtar kun InfoPath-filer(.xsn). Sjekk ut/sjekk inn, versjonerings- og dokumentbibliotekfunksjonalitet er
tilgjengelig. Se detaljer om [hvordan sjekke ut og inn](../../kom-i-gang/#inn-og-utsjekking).

![Figur 37 – Skjemabibliotek](/docs/images/guides/tul/skjemabibliotek.png "Figur 37 – Skjemabibliotek")

Et skjema kan om ønskelig bestå av mange visninger som man kan navigere mellom under utfylling i SBL, eller benyttes for utskrift eller
kvittering. En visning er synonymt med side. Det er verdt å merke seg at navnene og rekkefølgen som er på visningene inne i InfoPath, er
irrelevant. Hvordan de ulike sidene skal benyttes, angis på utgavens arbeidsflate under [Sideegenskaper](#sideegenskaper). 

Når man utvikler skjema for en utgave, gjør man det for utgavens *hovedspråk*. Som nevnt tidligere angis hovedspråket blant
*utgaveparametrene*. For at man skal kunne ha skjema på flere språk, er det flere ting som er viktig. Alle språkavhengige elementer i
skjemaet (ledetekster, overskrifter og lignende) må defineres som uttrykksfelter (expression boxes) i InfoPath, slik at de skal kunne
oversettes i oversettermodulen i TUL. Hvordan du setter opp uttrykksfelter er beskrevet i [Vedlegg A: Skjemautvikling i
InfoPath](../../vedlegg/a). Tekster som «flyter fritt» utenfor uttrykksbokser vil ikke la seg oversette. Det er da også viktig å merke seg at tekster knyttet
til radioknapper og sjekkbokser, samt tabelloverskrifter etc. må ligge i uttrykksbokser.

Skjemaet selv, og de ulike komponentene skjemaet består av, bør navngis i henhold til gjeldende navnestandard,
se [Vedlegg E: InfoPath navnestandard](../../vedlegg/e/).

Når skjemaet er ferdig og lagret, laster du det opp på utgavens arbeidsflate. Klikk på *Last opp nytt dokument* under området for
*Innholdsspesifikasjon*, og velg den filen du ønsker å benytte.

Dersom det oppstår en feil i forbindelse med opplasting, så vil utgaven bli merket med at den har en skjemafeil. Da vil du se en advarsel i
rød tekst på utgavearbeidsflaten. En utgave med en slik feil vil kunne få problem med funksjonalitet som baserer seg på skjema. Dersom dette
har skjedd må du slette skjemaet og laste opp på nytt. Meldingen vil forsvinne når du sletter skjemaet. Dukker meldingen opp på nytt etter
ny opplasting, bør du ta kontakt med Altinn support.

![Figur 38 Feilmelding etter skjemaopplasting](/docs/images/guides/tul/feilmelding-etter-skjemaopplasting.png "Figur 38 Feilmelding etter skjemaopplasting")

#### Sjekke ut, editere og sjekke inn InfoPath-skjema

For å kunne editere InfoPath-skjemaet, er det viktig at du sjekker ut først. Hvis ikke vil du få en melding om at skjemaet er i bruk. Når du
har sjekket ut, trenger du bare å klikke på skjemaets navn for å editere. Det som skjer nå er at skjemaet åpnes i design-modus, men du kan
bli bedt om å taste inn brukernavn og passord. Dette er helt normalt og skyldes at InfoPath ikke deler sikkerhetsinformasjon med TUL
SharePoint.

Når skjemaet så åpnes, er det i read-only modus. Derfor må du lagre til TULShare før du begynner å editere. Grunnen til at du bør gjøre
dette er at da har du en sikkerhetskopi på lokal disk. Velg derfor å lagre.

Når alle endringer er gjort, så kan du lagre tilbake til TUL SharePoint. Velg *Publiser* fra Fil-meny. Så velger du *Nettverksplassering*,
som vist i figuren under.

![Figur 39 - Nettverksplassering](/docs/images/guides/tul/nettverksplassering.png "Figur 39 - Nettverksplassering")

Trykk *Neste*. Så skal du angi hvor du vil publisere skjemaet. Det vil være tilbake til TUL og skjemabiblioteket i Innholdsspesifikasjonen.

![Figur 40 - Publiseringsveiviser](/docs/images/guides/tul/publiseringsveiviser.png "Figur 40 - Publiseringsveiviser")

Det som typisk vil stå i øverste feltet er:

```
http://tul.altinn.basefarm.net/sites/<tjenesteeier>/<tj.kortnavn\>/<tj.utg.kortnavn>/FormLibrary/Forms/<skjemanavn>.xsn
```

F.eks.

http://tul.altinn.basefarm.net/sites/skd/RF1113/RF11132009/FormLibrary/Forms/RF1113.xsn

En måtene å finner fram til denne adressen på, er å velge *Vis egenskaper* og så høyreklikke på skjemanavnet velge *Kopier snarvei*. Dette
limer du så inn igjen i InfoPath. Merk at dette er noe du kun trenger å gjøre en gang for hvert skjema/utgave. Klikk *Neste* og verifiser at
samme bane og filnavn som i forrige skjermbilde står også her. Klikk *Neste*, og så *Publisér*. Nå lagres skjema tilbake i TUL og du kan
klikke *Lukk* når dette er fullført.

Det er viktig å påpeke at valget *Rediger i Microsoft InfoPath*, som finnes i kontekstmenyen til skjemaet, ikke skal benyttes. Dette valget
støtter ikke åpning i designmodus eller SharePoint sin utsjekk/innsjekk-funksjonalitet.

#### XSD-egenskaper

Informasjon om dataformat (tidligere meldingsformat eller “spesifikasjon”) angis per InfoPath-skjema etter at det lastes opp. Du kan senere
endre informasjonen ved å velge *XSD-egenskaper* fra kontekstmenyen til hvert enkelt skjema.

Dette er informasjon som benyttes for skjemahåndtering i SBL for å identifisere dataformatet entydig på tvers av utgaver og versjoner.
Informasjonen brukes også til å identifisere felles datakilde i skjemasett.

I tidligere versjoner av Altinn benyttet man alltid dataformat fra Oppgaveregisteret. Nå er løsningen gjort mer fleksibel, slik at
dataformater fra flere leverandører kan benyttes. Derfor har feltene fått mer generelle navn enn tidligere.

XSD-egenskapene består av *XSD-leverandør*, *XSD-id* og *XSD-versjon*. Til sammen identifiserer disse tre parametrene unikt XSD’en som er
benyttet som hoveddatakilde i InfoPath, mao. dataformatet som skjemadata lagres på. Alle parametrene er obligatorisk for migrering av
skjema. Hvis XSD-leverandør er Oppgaveregisteret eller SERES, vil disse parametrene populeres automatisk når skjema lastes opp.

#### Tilleggsegenskaper for skjema

Når et skjema er ferdigutviklet i InfoPath, kan det defineres tilleggsegenskaper i TUL for å gi tjenesten ønskede egenskaper.
Tilleggsegenskapene som kan legges inn, er avhengig av tjenestetypen. Sideegenskaper og innholdsreferanser er relevant for flere
tjenestetyper og beskrives i dette kapitlet. Øvrige egenskaper beskrives under den enkelte tjenestetypen.

### Sideegenskaper

Under *Sideegenskaper* kan du tildele egenskaper til skjemaets visninger fra InfoPath. Egenskapene bestemmer hvordan en visning fra InfoPath
skal benyttes i sluttbrukerløsningen. Dette er relevant for innsendings- og innsynstjenester.

De neste seksjonene angir hva som må angis for hver visning. For at en migrering av utgaven til SBL skal være vellykket, må sideegenskaper
være komplett utfylt.

#### Sidenavn i ELMER-skjema

Sidenavn gjelder innsendingstjenester der man som utgaveparameter har valgt visning i henhold til ELMER-retningslinjene. Navnet du angir
skal være gjeldene for utgavens hovedspråk. Navnet kan inneholde norske bokstaver, og vil kunne oversettes i språkverktøyet. Navnet på siden
vises i venstre kant av skjermbildet under utfylling i SBL, også kalt *navigasjonsmenyen* i SBL. Navnet vil deles ved mellomrom hvis det er
langt, men det er verdt å tenke på at navnene ikke bør inneholde lange ord uten mellomrom. Hvor mange bokstaver et ord kan ha, vil avhenge
av oppløsningen sluttbruker har på sin skjerm under utfylling. Det bør dog tae hensyn til at denne kan være så liten som 1024x768.

#### Siderekkefølge i ELMER-skjema

Rekkefølge gjelder innsendingstjenester der man som utgaveparameter har valgt visning i henhold til ELMER-retningslinjene. I InfoPath er det
ikke mulig å definere rekkefølge/sekvens på sidene, men dette er nødvendig for å styre sluttbrukers utfylling. Det er derfor i
sideegenskaper mulig å angi et unikt nummer for en visning, hvor prinsippet med stigende rekkefølge vil være gjeldene. Det vil ikke være
mulig å velge samme nummer på to sider da det nummeret man velger vil byttes med den siden som allerede har gjeldene nummer. Ved åpning av
sideegenskaper vil visningene være listet i rekkefølgene de befinner seg i skjemaet. Dette medfører at en visning tiltenkt utskrift eller
kvittering kan ligge i listen før andre visninger tiltenkt utfylling. Det er da viktig at sekvens/rekkefølge tar hensyn til dette.

Det er derimot viktig at siden som er satt til å være først i TUL, i InfoPath har egenskapen *”Angi som standardvisning” avkrysset.* Dette
gjøres på egenskaper for gitt view i InfoPath.

#### Visningstype

InfoPath har mulighet for å angi utskriftversjon for et skjema, men denne funksjonaliteten skal ikke benyttes, da det setter begrensninger
for PDF-generering av visninger.

Du kan velge mellom følgende visningstyper:

  - **Web:** Dette vil være typen de fleste visninger har. Skjemaside skal vises til brukeren i SBL, for utfylling av en
    innsendingstjeneste, og for navigasjon og presentasjon av data i en innsynstjeneste. Denne typen blir også automatisk gjeldende for
    skjemaet i en meldingstjeneste.

  - **Utskrift:** Angir at denne visningen skal benyttes ved generering av utskriftsformat i sluttbrukerløsningen. Dersom man ønsker
    utskrift basert på webvisning av skjema, skal man opprette så mange visninger som det er sider i skjema og kopiere og lime inn innholdet
    fra hver side til tilhørende visning for utskrift. Utskrift-visningene kan settes til å være read-only ved å klikke på *Fil*, så
    *Sideegenskaper* og krysse av for *Read-only*. Der kan man også sette formatet på side som skal skrives ut, samt at man kan se
    forhåndsvisning for utskriftsversjon.

  - **Kvitteringssammendrag (gjelder innsendingstjeneste):** Vises til sluttbruker etter innsending. Kvitteringssammendrag opprettes ved at
    man lager ekstra visning og kaller den f.eks for *Kvittering*, definerer layout og legger deretter på de feltene som man ønsker å ha på
    kvitteringssammendraget. Man kan definere hjelpefelter og legge dem på utskriftsvisninger og på kvitteringen.

  - **Signering:** Angir at denne visningen skal brukes som signeringsversjon. Hvis signeringsversjon er definert ,er det denne sluttbruker
    signerer for en innsendingstjeneste, og det er denne Altinn signerer ved arkivering av en innsynstjeneste. Denne visningstypen er tenkt
    brukt hvis tjenesteeier vil ekskludere informasjon ved signering.

  - **Sensitive opplysninger/SPO (gjelder innsendingstjeneste):** Du velger denne visningstypen for en skjemaside som inneholder SPO. Alle
    feltene på denne siden vil krypteres ende-til-ende. Sluttbruker vil få informasjon om dette og mulighet for å låse opp med passord, hvis
    dette er satt som utgaveparameter. Merk at skjemasiden da bare må inneholde tekstbokser, ikke for eksempel nedtrekkslister og
    sjekkbokser.

  - **Signeringssammendrag (gjelder innsendingstjeneste):** Vises til sluttbruker under signering. Signeringssammendrag opprettes ved at man
    lager ekstra visning og kaller den f.eks for *Sammendrag*, definerer layout og legger deretter på de feltene som man ønsker å ha på
    signeringssammendraget.

  - **Betalingssammendrag (gjelder innsendingstjeneste):** Vises til sluttbruker i betalingssteget før bruker blir sendt videre til
    betalingsleverandøren. Dette kan brukes til å gi detaljerte opplysninger om hva betaling gjelder og/eller hvordan beløpet er regnet ut.
    Denne visningstypen vil bare bli vist på betalingssteget. Vil du at disse opplysningen skal vises på kvitteringen etter innsending, så
    må du legge det inn på kvitteringssammendrag. Vil du vise det begge steder må du ha både betalingssammendrag og kvitteringssammendrag.
    Betalings­sammendrag opprettes ved at man lager ekstra visning og kaller den for eksempel for *Betalingssammendrag*, definerer layout og
    deretter legger på de feltene som man ønsker å ha med.

For å gjøre det enklere å opprettholde riktig rekkefølge og sidetype i TUL så bør sidene i InfoPath gis navn som klart indikerer hva de skal
brukes til: *Web 1*, *Web 2* osv, *Utskrift 1*, *Utskrift 2* osv og *Kvittering*.

Figuren nedenfor viser skjermbilde av siden for sideegenskaper. For innsynstjeneste vil bare Visningstype være tilgjengelig.

![Figur 41 – Sideegenskaper](/docs/images/guides/tul/sideegenskaper.png "Figur 41 – Sideegenskaper")


### Innholdsreferanser

Innholdsreferanser er en side i TUL der du kan definere referanser til utvalgte felter i InfoPath-skjema, for at det skal knyttes spesiell
funksjonalitet til disse i SBL. Presentasjonsfelt brukes for innsendings- og innsynstjeneste, mens geografisk tilhørighet brukes bare for
innsendingstjenester. Siden het tidligere *Presentasjonsfelt*.

#### Presentasjonsfelt

Presentasjonsfelt brukes i SBL for å skille flere innsendinger av samme utgave fra hverandre i meldingsboksen og i arkivet. Måten dette
gjøres på er å vise det utfyller har skrevet i gitt(e) felt sammen med navnet på utgaven. Presentasjonsfeltene listes etter utgavenavnet og
henter verdier som brukeren har oppgitt under utfylling av skjemaet. Naturlige presentasjonsfelt kan være f.eks. organisasjonsnummer, navn
eller termin.

I TUL velges presentasjonsfelt ved først å velge side. Rekkefølgen på de presenterende feltene kan endres. Det er mulig å oppgi maksimalt
seks innholdsreferanser. Rekkefølgen vil være gjeldende i SBL hvor innholdsreferansen med ID 1 vil komme først etter utgavenavn, så ID 2
osv.

Definerte innholdsreferanser fjernes ved å klikke på *Fjern.*

Eksempel:

Tjenesten *RR-0002 Årsregnskap for små, store og øvrige selskap* kan benytte feltet *Organisasjonsnavn* som innholdsreferanser. I
sluttbrukerløsningen vil ulike innsendinger av denne tjenesten bli listet med tjenestenavnet først og verdien i feltet *Organisasjonsnavn*
bak, eksempelvis:

*RR-0002 Årsregnskap for små, store og øvrige selskap, Nordmanns advokatselskap*

*RR-0002 Årsregnskap for små, store og øvrige selskap, Hansens Bygg og Håndverksselskap*

![Figur 42 – Innholdsreferanser](/docs/images/guides/tul/innholdsreferanser.png "Figur 42 – Innholdsreferanser")

#### Geografisk tilhørighet

Det er mulig å definere roller i Altinn som gir tilgang til skjema som «tilhører» et bestemt geografisk område. Dette gjelder for
tjenesteeiers arkiv. Tilhørighet bestemmes ved innholdet i utvalgte felt i skjema.

Du kan spesifisere hvilke felt i skjema som inneholder geografisk informasjon ved å velge visning og felt for hhv. fylke, kommune og bydel.
Det er mulig å angi kun fylke, fylke og kommune, eller alle tre. Det kommer an på hvor nyanserte roller det er behov for. I de fleste
tilfeller vil du ikke definere geografiske referanser i det hele tatt.

For at geografiske referanser skal fungere i SBL, må innholdet i feltene være format på det standardiserte formatet "NO-KKKK nnnn":

  - Fylke: KK
  - Kommune: KK
  - Bydel: nnnn

Dette formatet bygges på eksisterende standard for fylke, kommunenummer og bydel. Bruk av NO-KK for fylke er en ISO-standard (3166), mens
kommunenummer består av 2 ekstra siffer.

#### Felter som overstyres av sluttbrukersystem ved komplett innsending

Ved komplett innsending fra sluttbrukersystem skal følgende tre prinsipper gjelde:

1. Altinn skal ikke endre på felter i skjemasettet som blir sendt inn av SBS.
2. Altinn kan tilføye kalkulerte felter for felter som er unnlatt å sende inn.
3. Skjemasett med feil skal stoppes av Altinn og innsending skal feile.

Tjenesteeier har mulighet til å fravike det tredje prinsippet ved å definere overstyrbare felter i TUL. For felter som spesifiseres her, vil
verdi fra sluttbrukersystem aksepteres også ved avvik fra validering/kalkulering i Infopath. Avvik som normalt gir valideringsfeil, gir i
stedet kun advarsal tilbake til sluttbrukersystem.

Hvis "kun XSD validering" er angitt under XSD-egenskaper, er det ikke nødvendig å spesifisere felter her. Overstyrte felter påvirker ikke
utfylling i SBL, uavhengig om det er definert her eller under «XSD-egenskaper».

Hvis skjema har et attributt med navn SentFromEUS i namespacet my (`@my:SentFromEUS`), så vil det bli lagt inn verdien `true` i dette feltet
hvis skjema er sendt fra sluttbrukersystem. Denne attributten kan benyttes til å ha ulik validering/kalkulering for innsending fra SBS og
fra portal selv om det kanskje ikke er ønskelig vedlikeholdsmessig.

#### Trekk ut data fra innsendelse
Tjenesteeier har mulighet til å definere metadatafelter som kan brukes til å styre videre behandling av skjema etter de er mottatt fra Altinn. 
Metadatafeltene legges i en liste utenfor skjema-XMLen og kan så brukes direkte uten at man trenger å pakke ut og tolke hele skjema-XML-en for å finne den samme informasjonen.
Metadatafeltene returneres som ShipmentMetadata av webservicemetoden GetDownloadQueueItems, og utnyttelse av definerte metadatafelt forutsetter derfor at tjenesteeier har valgt "Hente ved bruk av webservice (DownloadQueue)"
under seksjonsoverskriften "Oversending".

Tjenesteeier kan spesifisere hvilke data i skjema som skal trekkes ut ved å velge visning, felt og skrive inn et nøkkelnavn (metadatafeltnavn) som kan brukes til uthentelse senere.
Når tjenesteeier har skrevet inn et nøkkelnavn og klikker seg ut fra feltet vil en ny rad dukke opp hvis skjemaside og felt er valgt. 
Hvor mange rader som er maksimalt mulig å oppgi, er spesifisert i beskrivelsen av feltet rett under seksjonsoverskriften "Trekk ut data fra innsendelse"

Definerte metadatafelter fjernes ved å klikke på *Fjern.*

