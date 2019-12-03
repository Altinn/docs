---
title: Betingelser
description: Betingelser (conditions) brukes til å styre om en regel skal kjøres eller ikke.
weight: 30
---

## Liste over betingelser

Som del av regelmotoren er det definert et sett betingelser som kan brukes til å bestemme om en [regel](../regler/) skal kjøres eller
ikke. Følgende betingelser er tilgjengelige i Altinns regelmotor.

### AnyFieldIsEmpty
Denne blir sann der et av de gitte feltene er tomme.

```xml
<Condition type="AnyFieldIsEmpty" check="Skjema/Tilbakebetaling/Krav/Krav1, Skjema/Tilbakebetaling/Krav/Krav2"/>
```
**Parameter**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma.

### AnyFieldIsMissing
Betingelsen er sann dersom et av de gitte felt mangler fra xml-en.

```xml
<Condition type="AnyFieldIsMissing" check="orid(33005),orid(33004)"/>
```
**Parameter**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma.

### AnyFieldIsPositive
Blir sann dersom et av de gitte feltene har en positiv verdi.

```xml
<Condition type="AnyFieldIsPositive" check="orid(19890),orid(19792),orid(19794)"/>
```
**Parameter**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma.

### AnyFieldHasValue
Betingelsen blir sann hvis et av de gitte feltene har en verdi.

```xml
<Condition type="AnyFieldHasValue" check="orid(19890),orid(19792),orid(19794)"/>
```
**Parameter**  
Parameteren definerer en liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma.

### AnyFieldHasValueIgnoreZero
Betingelsen blir sann hvis et av de gitte feltene har en verdi. Tallet 0 blir ikke regnet som en verdi.

```xml
<Condition type="AnyFieldHasValueIgnoreZero" check="orid(19890),orid(19792),orid(19794)"/>
```
**Parameter**  
Parameteren definerer en liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma.

### AnyFieldEquals
Er sann dersom et av de gitte felt har en verdi som er lik den gitte verdien.

```xml
<Condition type="AnyFieldEquals" check="Skjema/Utbetaling/Post1, Skjema/Tilbakebetaling/Krav1" value="Ja"/>
```
**Parameter**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma. `value`-attributtet definerer
verdien feltene sjekkes mot.

### AnyFieldNotEquals
Er sann dersom et av de gitte felt har ikke har en verdi som er lik den gitte verdien.

```xml
<Condition type="AnyFieldNotEquals" check=" Skjema/Utbetaling/Post1, Skjema/Tilbakebetaling/Krav1" value="Ja"/>
```
**Parameter**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma. `value`-attributtet definerer
verdien feltene sjekkes mot.

### AnyFieldExists
Er sann dersom et av de gitte feltene i `check` eksisterer.

```xml
<Condition type="AnyFieldExists" check="Skjema/Utbetaling/Post1, Skjema/Tilbakebetaling/Krav1, Skjema/Utbetaling/Post2, Skjema/Tilbakebetaling/Krav2" />
```
**Parameter**  
Bruk `check` for å fortelle hvilke felt som skal sjekkes.

### CodeExistsInCodelist
Brukes til å sjekke om en verdi finnes i en kodeliste

```xml
<Condition type="CodeExistsInCodelist" check="orid(33)"/>
```
**Parameter**  
`check` brukes til å fortelle hvilket felt eller hvilken verdi som skal sjekkes. Du kan ikke bruke XPath for denne
betingelsen.

### CodeNotInCodelist
Blir sann dersom en verdi ikke finnes i en kodeliste.

```xml
<Condition type="CodeNotInCodelist" check="orid(33)"/>
```
**Parameter**  
`check` brukes til å fortelle hvilket felt eller hvilken verdi som skal sjekkes. Du kan ikke bruke XPath for denne
betingelsen.

### ContainsAny
Er sann dersom verdien av et gitt felt inneholder en av de gitte verdiene.

```xml
<Condition type="ContainsAny" check="orid(34409)" value="Nei,0"/>
```
**Parameter**  
Parameteren for denne betingelsen definerer feltet (i `check`) og en liste av verdier separert med komma (i `value`).

### Equals
Denne betingelsen blir sann om det gitte feltet har en verdi som er lik den gitte verdien.

```xml
<Condition type="Equals" check="Skjema/Tilbakebetaling/Krav/Krav1" value="1000"/>
```
**Parameter**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma. Verdien det sjekkes mot blir angitt
i attributtet `value`. Du kan ikke bruke XPath for denne betingelsen.

### NotEquals
Denne er sann dersom det gitte feltet har en verdi som ikke er lik den gitte verdien.

```xml
<Condition type="NotEquals" check="orid(34071)" value="100"/>
```
**Parameter**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden. Feltene blir separert av et komma. Verdien det sjekkes mot blir angitt
i attributtet `value`. Du kan ikke bruke XPath for denne betingelsen.

### SumEquals
Denne betingelsen er sann dersom summen av feltene i `check` er lik summen av feltene i `value`.

```xml
<Condition type="SumEquals" check="orid(34408),orid(34409)" value="orid(34588),orid(34510)"/>
```
**Parameters**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden som skal summeres. En gruppe i `check` og en annen gruppe i `value`.
Feltene blir separert av et komma. Du kan ikke bruke XPath for denne betingelsen.

### SumNotEquals
Denne betingelsen er sann dersom summen av feltene i `check` ikke er lik summen av feltene i `value`.

```xml
<Condition type="SumNotEquals" check="orid(34408),orid(34409)" value="orid(34588),orid(34510)"/>
```
**Parameters**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden som skal summeres. En gruppe i `check` og en annen gruppe i `value`.
Feltene blir separert av et komma. Du kan ikke bruke XPath for denne betingelsen.

### SumNotEqualsWithRange
Blir sann dersom summen av feltene i `check` ikke er innenfor et område. Du kan bare ha et felt i denne betingelsen,
avviket skal være parameter nummer to.

```xml
<Condition type="SumNotEqualsWithRange" check="orid(34408),orid(34409)" value="orid(34588),20"/>
```
**Parameters**  
Liste av felter i skjemaet gitt i [Source](../regler#source)-noden som skal summeres i `check`. `value` skal være først en direkte verdi
eller et felt som verdien skal hentes fra, og deretter hvor stor avvik som skal tillates. Feltene blir separert av et
komma. Du kan ikke bruke XPath for denne betingelsen.

### IsPositive
Denne betingelsen er sann om det gitte feltet har en positiv verdi. Tallet 0 blir ikke regnet som positivt.

```xml
<Condition type="IsPositive" check="/Skjema/Tilbakebetaling/Krav/Krav1" form="62"/>
```
**Parameter**  
Parameter for denne metoden er en enkelt referanse (i `check`-attributet) til et felt i skjemaet definert i attributtet
`form`.

### IsPositiveIncludingZero
Denne betingelsen er sann om det gitte feltet har en positiv verdi. Tallet 0 blir regnet som positivt.

```xml
<Condition type="IsPositiveIncludingZero" check=" Skjema/Utbetaling/Post1, Skjema/Tilbakebetaling/Krav1"/>
```
**Parameter**  
Parameter for denne metoden er en enkelt referanse (i `check`-attributet).

### IsPrefilled
Finner ut om et felt eller gruppen den er del av er preutfylt.

```xml
<Condition type="IsPrefilled" check=" Skjema/Utbetaling/Post1, Skjema/Tilbakebetaling/Krav1"/>
```
**Parameter**  
Hvilket felt som skal sjekkes legges inn i `check`.

### NotPrefilled
Blir sann dersom et felt eller gruppen den er del av er preutfylt.

```xml
<Condition type="NotPrefilled" check="orid(20804)"/>
```
**Parameter**  
Hvilket felt som skal sjekkes legges inn i `check`.

### IsNegative
Denne er sann om det gitte feltet har en negativ verdi.

```xml
<Condition type="IsNegative" check="orid(32969)"/>
```
**Parameter**  
Parameteren er en enkelt referanse i `check` til et felt i skjemaet som er gitt i [Source](../regler#source)-noden.

### IsEmpty
Denne betingelsen er sann om et felt er tomt..

```xml
<Condition type="IsEmpty" check="orid(34116)"/>
```
**Parameter**  
Parameteren definerer et enkelt felt i skjemaet definert i [Source](../regler#source)-noden.

### IsEmptyWithZeroValue
Er sann om et felt er tomt. Tallet 0 blir regnet som en verdi.

```xml
<Condition type="IsEmptyWithZeroValue" check=" Skjema/Utbetaling/Post1, Skjema/Tilbakebetaling/Krav1" value="Ja"/>
```
**Parameter**  
Parameteren definerer et enkelt felt i `check`.

### IsMissing
Denne er sann dersom et felt mangler i skjema-xml-en (ikke er til stede i xml-en).

```xml
<Condition type="IsMissing" check="orid(19794)"/>
```
**Parameter**  
Definerer et enkelt felt i skjemaet funnet i [Source](../regler#source)-noden.

### IsNonValidEmail
Sjekker om verdien er en gyldig epost-adresse. Returnerer sann dersom verdien ikke følger formatet til epost-adresse.

```xml
<Condition type="IsNonValidEmail" check="orid(3344)"/>
```
**Parameter**  
Feltet som skal sjekkes fyller du ut i `check`. Du kan ikke bruke XPath for denne betingelsen.

### IsValidSSN
Blir sann om det gitte feltet inneholder et nummer som følger formatet for personnummer (modulus-sjekk). Den vil ikke
sjekke om det faktisk finnes en person som har dette personnummeret.

```xml
<Condition type="IsValidSSN" check="orid(20804)"/>
```
**Parameter**  
Definerer feltet som skal bli sjekket for personnummer.

### IsNonValidSSN
Blir sann om det gitte feltet ikke inneholder et nummer som følger formatet for personnummer (modulus-sjekk). Den vil
ikke sjekke om det faktisk finnes en person som har dette personnummeret.

```xml
<Condition type="IsNonValidSSN" check="orid(20804)"/>
```
**Parameter**  
Definerer feltet som skal bli sjekket for personnummer.

### IsValidOrgNr
Denne betingelsen blir sann dersom det gitte feltet inneholder en verdi som passer med formatet for organisasjonsnummer.

```xml
<Condition type="IsValidOrgNr" check="orid(34091)"/>
```
**Parameter**  
Definerer feltet som skal sjekkes for organisasjonsnummer.

### IsNonValidOrgNr
Denne betingelsen blir sann dersom det gitte feltet inneholder en verdi som ikke passer med formatet for
organisasjonsnummer.

```xml
<Condition type="IsNonValidOrgNr" check="orid(34091)"/> 
```
**Parameter**  
Definerer feltet som skal sjekkes for organisasjonsnummer.

### GreaterThan
Denne er sann dersom verdien i et gitt felt er større enn den gitte verdien.

```xml
<Condition type="GreaterThan" check="orid(6824)" value="2014"/>
```
**Parameter**  
Definerer feltet i `check`og verdien det skal sammenlignes med i `value`. Du kan ikke bruke XPath for denne
betingelsen.

### LessThan
Denne er sann dersom verdien i et gitt felt er mindre enn den gitte verdien.

```xml
<Condition type="LessThan" check="orid(6827)" value="1900"/>
```
**Parameter**  
Definerer feltet i `check`og verdien det skal sammenlignes med i `value`. Du kan ikke bruke XPath for denne
betingelsen.

### HasValue
Er sann dersom det gitte feltet har en verdi. Tallet 0 er regnet som en verdi.

```xml
<Condition type="HasValue" check="orid(6824)"/>
```
**Parameter**  
`check` definerer feltet som skal sjekkes.

### HasValueIgnoreZero
Er sann dersom det gitte feltet har en verdi. Tallet 0 er ikke regnet som en verdi.

```xml
<Condition type="HasValueIgnoreZero" check="orid(6824)"/>
```
**Parameter**  
`check` definerer feltet som skal sjekkes.

### NotPrefilled
Denne betingelsen er sann dersom det gitte feltet ikke er pre-utfylt. Dette vil bare virke med selvangivelsetjenestene
(APE) som er merket med pre-utfylte verdier.

```xml
<Condition type="NotPrefilled" check="orid(22689)"/>
```
**Parameters**  
Definerer feltet som skal bli sjekket for pre-utfylling.

### Exists
Blir sann dersom det gitte feltet eksisterer i xml-en.

```xml
<Condition type="Exists" check="orid(34295)"/>
```
**Parameter**  
Definerer feltet som det skal bli sjekket om eksisterer.

### HasForm
Blir sann dersom skjemasettet inneholder et gitt skjema.

```xml
<Condition type="HasForm" form="618"/>  
```
**Parameter**  
Definerer dataformat-id for skjemaet det skal sjekkes at er i skjemasettet.

### MissingForm
Blir sann dersom skjemasettet mangler et gitt skjema.

```xml
<Condition type="MissingForm" form="618"/>  
```
**Parameters**  
Definerer dataformat-id for skjemaet det skal sjekkes for.

### MatchPattern
Sjekker om verdien oppfyller et regulært uttrykk (regular expression/regex). Returnerer sann dersom det er en match.
(Regulære uttrykk er en måte å finne ut om en tekst oppfyller definerte kriterier. Hvordan du lager slike uttrykk faller
utenfor denne håndboka. Du vil finne mange guider om dette på nettet.)

```xml
<Condition type="MatchPattern" check="orid(33)" value="([A-Z])\w+"/>
```
**Parameter**  
Legg feltet som skal sjekkes i `check` og det regulære uttrykket i `value`. Du kan ikke bruke XPath for denne
betingelsen.

### DoesNotMatchPattern
Sjekker om verdien oppfyller et regulært uttrykk (se MatchPattern). Returnerer sann dersom det ikke er en match.

```xml
<Condition type="DoesNotMatchPattern" check="orid(222)" value="([A-Z])\w+"/>
```
**Parameter**  
Legg feltet som skal sjekkes i `check` og det regulære uttrykket i `value`. Du kan ikke bruke XPath for denne
betingelsen.

### HasAnyForm
Blir sann dersom skjemasettet inneholder et av de gitte skjemaene.

```xml
<Condition type="HasAnyForm" form="1,2,61"/>
```
**Parameter**  
Definerer dataformat-ider for skjemaene det skal sjekkes for. De skal skilles med komma.

### ValueNotInCodeList
Denne betingelsen blir sann dersom et gitt felt ikke er lik en verdi fra en gitt kodeliste.

```xml
<Condition type="ValueNotInCodeList" codelist="ASF_Land" check="orid(34112)" value="3"/>  
```
**Parameters**  
Definer kodelisten i «codelist», feltet i `check` og verdien i `value`. Du kan ikke bruke XPath for denne betingelsen.

### ValueFoundMoreThanOnceInFields
Sjekker om verdien finnes i mer enn et av de feltene du oppgir.

```xml
<Condition type="ValueFoundMoreThanOnceInFields" check="orid(20804), orid(20805), orid(20806)" value="orid(2045)"/>
```
**Parameter**  
Bruk `check` for å angi feltene, og `value` for å gi verdien det skal sjekkes mot. Du kan ikke bruke XPath for denne
betingelsen.

### NoneFieldHasValue
Returnerer sann dersom ingen av feltene har en ­verdi.

```xml
<Condition type="NoneFieldHasValue" check="orid(20804), orid(20805)"/>
```
**Parameter**  
Feltene definerer du i `check`.

### NotEqualAcrossMultipleForms
Sjekker om en verdi ikke er lik over flere skjema. Returnerer sann dersom verdien er funnet mer enn en gang.

```xml
<Condition type="NotEqualAcrossMultipleForms" check="orid(20804)" value="orid(20810)"/>
```
**Parameter**  
Legg feltene som skal sjekkes i check, og verdien som skal sjekkes i value. Du kan ikke bruke XPath som `value` i denne
betingelsen. For `check` vil XPath kunne brukes.

### AnyFieldIsPositiveIncludingZero
Sjekker om noen av de gitte feltene har positiv verdi inkludert 0.

```xml
<Condition type="AnyFieldIsPositiveIncludingZero" check="orid(18116),orid(26537)"/>
```
**Parameter**  
Feltene definerer du i `check`.

### DuplicatedValue
Sjekker om gitt felt inneholder dupliserte verdier.

```xml
<Condition type="DuplicatedValue" check="orid(19890)"/>
```
**Parameter**  
Feltet definerer du i `check`.

### DateNotWithinRange
Sjekker om datoen i et gitt felt er innenfor en gitt periode (spesifisert med to datoer, kommaseparert).

```xml
<Condition type="DateNotWithinRange" check="orid(35505)" value="01-01-2012,31-12-2014"/>
```
**Parameter**  
Feltet definerer du i `check`.
`value` forteller hvilken periode det skal sjekkes mot.

### HasAttachment
Sjekker om et gitt vedlegg finnes for en form

```xml
<Condition type="HasAttachment" form="AT03_Cycle01"/>
```
**Parameter**  
Vedlegg definerer du i `form`.

### HasAnyAttachment
Sjekker om noe av gitt vedlegg finnes for en form

```xml
<Condition type="HasAnyAttachment" form="AT02_Cycle01, AT03_Cycle01, AT04_Cycle01, AT06_Cycle01"/>
```
**Parameter**  
Vedlegg (kommaseparert) definerer du i `form`.

### MissingAttachment
Sjekker om et gitt vedlegg finnes ikke for en form

```xml
<Condition type="MissingAttachment" form="AT01_Cycle01"/>
```
**Parameter**  
Vedlegg definerer du i `form`.
