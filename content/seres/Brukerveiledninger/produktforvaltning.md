---
title: Brukerveiledning for SERES Produktforvaltning
linktitle: Produktforvaltning
description: Hvordan bruke Produktforvaltning for å finne og laste ned XSD-er som er generert fra Domeneklienten.
weight: 170
---

&nbsp; 
## Innledning

SERES Produktforvaltning er en web-klient primært for å gi tilgang til XSD-er generert fra SERES. Det er slik at alle XSD-er som genereres fra SERES Domeneklient blir automatisk lastet opp til SERES Produktforvaltning og kan gjenfinnes der. Tilgjengelighet av XSD-ene avhenger av eierskap og status. Alle kan laste ned XSD-er som har status «kandidat», «produksjon» eller «terminert». Men for også å kunne laste ned XSD-er med status «utkast» eller «forkastet», må brukeren være innlogget og ha redigeringsrettigheter til domenet/domeneedisjonen som XSD-en er generert fra.

Det er tre moduser i klienten, «Navigering», «Søk» og «Administrasjon». Den siste gir brukere med administratorrolle funksjonalitet for brukerforvaltning.

## Navigering etter XSD-er

Navigering betyr å søke etter modeller og XSD-er ved å gjøre valg i nedtrekkslister samt utføre «scrolling» og fritekstsøk i nettleseren.

### Uten innlogging

Etter å ha startet SERES Produktforvaltning gjennom https://app.seres.no/forvaltning/ (produksjonsmiljøet) eller https://app-kurs.seres.no/forvaltning/ (kursmiljøet) får en opp følgende grensesnitt:

![Figur 1](../../produktforvaltning-naviger.png)

I nedtrekkslisten kan en nå se alle lesbare domener:

![Figur 2](../../produktforvaltning-naviger-nedtrekksliste.png)

Ettersom brukeren på dette punktet ikke har autentisert seg, ligger alle domenene i gruppen «Domener med lesetilgang». Det finnes en «?»-knapp som beskriver innholdet i listen og hvordan den skal brukes.

Etter valg av et domene («Sjøfartsdirektoratet») kan det se slik ut:

![Figur 3](../../produktforvaltning-naviger-valgtdomene.png)

I tabellen listes det opp alle modeller (meldingsmodeller eller presentasjonsmodeller) som er brukt fra domenet for å generere en XSD.

**OBS!** I Altinn-sammenheng skal en bruke meldingsmodeller.

Sammen med hver modell angis det i tillegg følgende:

* «Tjenestemodell» som den aktuelle modellen hører inn under
* «dataFormatId» som er en unik identifikator for hver meldingsmodell eller presentasjonsmodell som det er generert XSD-er fra
* «Opprettet» som er tidspunktet modellen første ble brukt for XSD-generering

Brukeren kan så velge en av modellene ved å klikke i modellens tabell-linje, her «Fartstid_M»:

![Figur 4](../../produktforvaltning-naviger-valgtdomene&modell.png)

Alle XSD-utgavene som er generert fra valgt modell, listes opp i den nedre tabellen. Her angis følgende informasjon for hver av disse:

* «Domene/Edisjon»: Domene eller domeneedisjon som modellinnholdet er hentet fra
* «Tjenesteversjon»: Tekststreng som er angitt av brukeren i Domeneklienten i forkant av genereringen
* «dataFormatVersion»: En unik identifikator for hver XSD som er generert fra Domeneklienten
* «Opprettet»: Tidspunkt for når XSD-en ble generert
* «Status»: Kvalitetsgrad som kan ha følgende verdier:
   * utkast: De første XSD-variantene som genereres fra en modell før en har sjekket at de inneholder de elementene og har den strukturen de skal.
   * kandidat: XSD-en er sjekket, validert og klar for å tas inn i en tjenesteutviklingsløsning, f. eks. Altinn TUL.
   * produksjon: XSD-en er tatt i bruk i en løsning, f. eks. Altinn SBL.
   * forkastet: XSD-en har aldri vært i bruk og er ikke aktuell for senere bruk.
   * terminert: XSD-en har vært i bruk, men er tatt ut av produksjon.
* Siste tabellkolonne er en knapp for mulig nedlasting av XSD-en. Dersom brukeren ikke har rettigheter for å laste ned XSD-en, er knappen deaktivert (grå).

### Med innlogging

For å logge inn trykker brukeren på «Logg inn» slik at innloggingsdialogen vises: 

![Figur 5](../../produktforvaltning-innlogging.png)

Brukeren logger inn med BR-signatur og tilhørende passord som autentiseres mot BRs Active Directory. Normalt vil ett eller et fåtall domener gjøres tilgjengelig i den skrivbare delen av nedtrekkslisten, mens resten av domenene er gruppert under den lesbare delen.

![Figur 6](../../produktforvaltning-naviger-nedtrekksliste-innlogget.png)

Om en så velger et domene med skrivetilgang, vil en nå se at alle XSD-er som er generert fra dette domenet, dvs. også dem med status «utkast» og «forkastet» kan lastes ned. En vil også kunne endre status gjennom valg i en nedtrekksliste som viser alle mulige statusverdier.

![Figur 7](../../produktforvaltning-naviger-valgtdomene&modell-innlogget.png)

### Sortering og blaing

I tabellene er det mulig å sortere på de fleste kolonnene. Her er det sortert på «Opprettet»-tidspunkt av meldingsmodell.

![Figur 8](../../produktforvaltning-naviger-valgtdomene&modell-sortert-innlogget.png)

En kan også bla i en tabellvisning om tabellen inneholder flere enn det antall linjer visningen er satt opp med ved å trykke på knappene med tekst «1», «2» osv. eller frem- og tilbakeknappene «←» (forrige side), «|←» (første side), «→» (neste side), «→|» (siste side):

![Figur 9](../../produktforvaltning-naviger-valgtdomene&modell-sortert-xsd-innlogget.png)

Hvis en foretrekker å scrolle fremfor å bla, kan en øke antall visninger pr. side til 25, 50 eller 100. Dette gir også mulighet for fritekstsøk over et antall på inntil 100 XSD-er som et alternativ til den strukturerte søkefunksjonaliteten som blir beskrevet i neste kapittel. Tittelfeltet viser antallet XSD-er som kan hentes frem i tabellen.

## Søk etter XSD-er

Istedenfor å navigere for å finne en XSD kan en utføre et strukturert søk. Brukeren går over til søkemodus ved å trykke på «Gå til søk»-knappen:

![Figur 10](../../produktforvaltning-gaatilsok.png)

### Søkegrensesnitt

En kommer først til enkel søkefunksjonalitet:

![Figur 11](../../produktforvaltning-gaatilsok-enkeltsok.png)

Dette er antatt å dekke det brukeren trenger oftest. Hvis en vil gjøre et søk med flere detaljer, trykker en på lenken «Bytt til avansert søk»:

![Figur 12](../../produktforvaltning-gaatilsok-avansertsok.png)

### Felter i avansert søk

Søket kan utføres ved å fylle ut et eller flere av de 11 feltene. Her er beskrivelse av hvert av feltene med tilhørende søk-kriterier (dvs. utvalgte egenskapsverdier for XSD-ene) angitt i *kursiv*:

*Domene*: Søker på navn eller deler av *navn på domener*. Får ut en tabell over alle XSD-er som tilhører de domener/edisjoner som gir treff på søket.

*Modellnavn*: Søker på navn eller deler av *navn på modeller*. Får ut en tabell over alle XSD-er som er generert fra modeller som gir treff på søket.

*Tjenesteversjon*: Søker på navn eller deler av *navn på tjenesteversjon* som angis i forkant av XSD-genereringen. Får ut en tabell over alle XSD-er som er generert fra tjenesteversjoner som gir treff på søket.

*Bruker*: Søker på navn eller deler av navn på *SERES-brukere*. Får ut en tabell over alle XSD-er som er generert fra edisjoner opprettet av brukere som gir treff på søket. XSD-er fra domener blir ikke med her.

*DataFormatId*: Søker på tallstreng eller deler av denne for *DataFormatId*. Får ut en tabell over alle XSD-er som har DataFormatId-verdier som gir treff på søket.

*DataFormatVersion*: Søker på tallstreng eller deler av denne for *DataFormatVersion* som er autogenerert og unik for hver XSD. Får ut en tabell over alle XSD-er som har DataFormatVersion-verdier som gir treff på søket.

*Status*: Søker på XSD-status. Får ut en tabell over alle XSD-er som har angitt *status-verdi*.

*Opprettet i tidsrommet*: Søker på tiden mellom to tidspunkter (tidsrom) angitt av et feltpar. Får ut en tabell over alle XSD-er som ble *opprettet* innenfor tidsrommet.

*Endret i tidsrommet*: Søker på tiden mellom to tidspunkter (tidsrom) angitt av et feltpar. Får ut en tabell over alle XSD-er som hadde sin *siste endring* innenfor tidsrommet. Per dato er det bare endring av status som påvirker denne datoen.

Hvert av feltene kan kombineres til et samlet søk der XSD-ene i tabellen har søk-kriterier som tilfredsstiller alle feltene som brukeren har anvendt i søket. I tillegg kan en ta i bruk jokertegn (wildcards) for å utvide/justere søket der prinsippene er:

1. Søket skiller ikke på store og små bokstaver i søk-kriteriet.
2. Søket gir treff på alle søk-kriterier som starter med søketeksten.
3. Jokertegnet «*» settes foran søketeksten for å få treff på alle søk-kriterier som inneholder søketeksten.
4. For å søke etter en eksakt verdi brukes det anførselstegn «"» foran og bak.
5. Settes «$» som siste tegn, vil søket begrenses til søk-kriterier som avsluttes med søketeksten.

Eksempler basert på domenenavn:

* «staten» vil gi treff på «Statens lånekasse», «StatensInnkrevingssentral» osv., men ikke «Fristaten Christiania».
* «"Difi"» eller «Difi$» vil bare gi treff på «Difi».
* «*komm» vil gi treff som «KSKommIT», «SkedsmoKommune», «Kommunenes Sentralforbund» osv.
* «*tilsynet$» vil gi treff som «Luftfartstilsynet», «Helsetilsynet» osv., men ikke «Tilsynet for høy moral».

### Feltvalidering

Når brukeren trykker på «Søk»-knappen, blir feltene validert på innholdet. Det sjekkes på antall tegn, type tegn, størrelsen på heltall som representerer identifikatorer, datoer og e-postadresser. Merk at datoer kan angis med en datovelger. Mange av feltene har en begrensning på 256 tegn. Hvis et felt ikke validerer, kommer det en feiltekst øverst på skjermen innledet med feltnavn, f. eks.:

![Figur 13](../../produktforvaltning-feilmelding-feltvalidering.png)

### Andre typer tilbakemeldinger

Hvis et søk ikke finner noen XSD-er fås en tilbakemelding om det:

![Figur 14](../../produktforvaltning-feilmelding-annen.png)

### Enkle og avanserte søk

Her er et enkelt søk etter alle XSD-er som kommer fra et domene med navn som begynner med «A» eller «a» og der det er bladd frem til side 6 som svarer til numrene 51-60 av de angitte 104 XSD-ene:

![Figur 15](../../produktforvaltning-enkeltsok-sok.png)

Her er et avansert søk der alle søkefeltene er tatt i bruk, bortsett fra *Endret i tidsrommet*:

![Figur 16](../../produktforvaltning-avansertsok-sok.png)

Her kan brukeren verken endre på status eller laste ned XSD-en, dette fordi han/hun enten mangler skrivetilgang til det aktuelle domenet («NAV») eller ikke er innlogget.

### XSD-er med skrivetilgang

Dersom brukeren er innlogget og har skrivetilgang til domenet som XSD-ene tilhører, vil disse kunne endre status og lastes ned uansett status-verdi:

![Figur 17](../../produktforvaltning-avansertsok-sok-innlogget.png)


