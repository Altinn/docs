---
title: Regler
description: Regelfilen bygges opp av en eller flere regler (valideringer eller overføringer). Alle reglene som støttes listes her.
toc: true
weight: 20
---

## Valideringsregler

### SimpleValidation
SimpleValidation er regeltypen du bruker for å validere ved hjelp av standard betingelser.

Nødvendige parameter: [Source](#source)

## Overføringsregler

### RemoveParentPost 
Denne regelen fjerner foreldreposten til et gitt felt dersom betingelsene er innfridd.

Nødvendige parameter: [Source](#source)

### TransferValue 
Denne regelen blir brukt til å kopiere en verdi fra et felt til et annet. Feltene kan enten være i samme skjema eller i
ulike skjema.

Nødvendige parameter: [Source](#source) og [Target](#target)

### TransferResult
TransferResult er en regeltype som kan brukes dersom du vil gjøre utregninger før du overfører resultatet som verdi.
Utregningene gjøres basert på verdier fra felter man angir i attributtene addFields, subtractFields, multiplyFields og
divideFields. Disse skal ligge som attributter på [Source](#source) elementet til regelen.

Nødvendige parameter: [Source](#source) og [Target](#target)

### SetFieldValue
Regel som kan brukes til å sette en verdi i et felt basert på et sett av betingelser.

Nødvendige parameter: [Target](#target)

### RemoveFieldElement
Denne regelen kan brukes når du trenger å fjerne et spesielt felt basert på et sett av betingelser.

Nødvendige parameter: [Source](#source)

### CalculateResult
CalculateResult er en regeltype som kan brukes dersom du vil gjøre utregninger og overføre resultatet til et felt i
skjema. Utregningene gjøres basert på det matematiske utrykket man angir i elementet CalcExpression.

Nødvendige parameter:

 - [Source](#source)
 - [Target](#target)
 - Param med navn CalcExpression.

For CalcExpression så angir man det matematiske uttrykket i value attributtet til Param elemenetet.

I det matematiske utrykket så kan man enten bruke konstante verdier eller man kan hente verdier fra felter i skjema.
Hvis en verdi skal hentes fra felt i skjema så angis det ved å legge xpath til feltet inn i klammeparenteser i utrykker.

Noen eksempler på bruk av CalculateResult regelen:

```xml
<Rule type="CalculateResult">
	<Source form="4120"/>
	<Target form="4120" field="/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/skatterett"/>
	<Param name="CalcExpression" value="{/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/finansregnskap} * 3 / 2"/>
	<Param name="RoundResultToGivenNumberOfDecimals" value="1"/>
</Rule>
<Rule type="CalculateResult">
	<Source form="4120"/>
	<Target form="4120" field="/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/regnskapsfoererregelverket"/>
	<Param name="CalcExpression" value="{/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/finansregnskap} + {/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/skatterett}"/>
	<Param name="CeilingOfResult" value="true"/>
</Rule>
<Rule type="CalculateResult">
	<Source form="4120"/>
	<Target form="4120" field="/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/rettslaere"/>
	<Param name="CalcExpression" value="{/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/regnskapsfoererregelverket} + ({/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/skatterett} * {/melding/Skjemainnhold_KRT-1005/omRegnskapsfoerer/etterutdanning/finansregnskap})"/>
	<Param name="FloorOfResult" value="true"/>
</Rule>
```

Valgfrie parameter:

 - **CeilingOfResult** - Denne brukes til å angi om det skal gjøres en Ceiling av resultatet. Dette angis med
   verdien True i value attributtet til Param elementet.Param med navn FloorOfResult. Denne brukes til å angi om det skal
   gjøres en Floor av resultatet. Dette angis med verdien True i value attributtet til Param elementet.
 - **RoundResultToGivenNumberOfDecimals** - Denne brukes til å angi om det skal gjøres en Round av resultatet.
   Her angir man ikke True for å indikere at det skal gjøres Round, men man angir antall desimaler det skal gjøres Round med.

### TransferTransformedResult
Denne regelen kan brukes når du trenger å sette sammen verdiene fra flere felter og overføre resultet til et enkelt felt
som en kommaseparert liste.

Nødvendige parameter: [Source](#source) og [Target](#target)

### TransferSingleExternalValue
Overfører en gitt ekstern verdi, dette er verdier som ikke ligger som en del av skjemadataen, men som kan settes
eksplisitt i implementasjonen for f.eks lasting eksterne skjema.

Nødvendige parameter:

 - [Source](#source)
 - [Target](#target)
 - Parameter med navn TransferType.  

TransferType som er støttet pr. 01.10.2015 er ArchiveReference, som henter arkivreferansen fra et eksternt
skjema og sette den i det gitte målfeltet.

## WebSA-spesifikke regler

Det fins en rekke regeldefinisjoner som er utviklet spesielt for bruk i selvangivelsetjenestene.
Disse er merket med `websa:` i starten av navnet.

### websa:InternalRF1224Calculations
For bruk til kalkuleringer i skjema RF-1224.

### websa:TransferFromNO1ToRF1224
Regel for å overføre verdi fra fordeling av næringsinntekt (“Business Allocation”) (fra instansiering i RF-1175) til RF1224.
Denne regelen blir ikke kjørt ved komplett innsending fra sluttbrukersystem.

### websa:TransferFromRF1084ToRF1030
Spesialregel for å overføre fra skjema RF-1084 til skjema RF-1030.  
Denne regelen blir ikke kjørt ved komplett innsending fra sluttbrukersystem.

### websa:TransferFromRF1084ToRF1175
Spesialregel for å overføre fra skjema RF-1084 til skjema RF-1175.  
Denne regelen blir ikke kjørt ved komplett innsending fra sluttbrukersystem.

### websa:TransferFromRF1125ToRF1030
Spesialregel for å overføre til postene 2.1.4 og 3.2.2 i skjema RF-1030 basert på skjema RF-1125.  
Denne regelen blir ikke kjørt ved komplett innsending fra sluttbrukersystem.

### websa:TransferSumFrom0402
Flytter fra post 4.0.2 (fra RF-1175) til RF-1030 basert på den valgte industrisektoren (industry type) og tilegnet inntekt.  
Denne regelen blir ikke kjørt ved komplett innsending fra sluttbrukersystem.

### websa:TransferSumToChildcare
Brukes for å regne ut foreldrefradrag.

### websa:TransferSumToTravelDeduction
Brukes for å regne ut fradrag for reise mellom hjem og arbeid/besøksreiser.

### websa:TransferSumToWizard
Brukes for å flytte verdier fra RF-1084/RF-1219/RF-1224 (lenket via veiviseren og første instans av et bestemt skjema)
til OrID-er eller veiviseren.

### websa:ValidatePost337StandardDeductionTempStay
Dette er en spesialregel for å validere post 3.3.7

### websa:ValidateRF1219TransferToWizard
For å lage en valideringsfeil dersom det er mer enn et RF-1219-skjema som er knyttet til veiviseren for selvstendig
næringsdrivende (Business Wizard).

### websa:ValidateRF1224BelongsToPost0402
For å lage en valideringsfeil dersom det finnes RF-1224 instanser som ikke er knyttet til noen 4.0.2 post (fordeling av
næringsinntekt) når PSAN er instansiert med RF-1175.

### websa: TransferFromRF1224ToRF1030
For å overføre null (0) fra RF 1224 til RF 1030. Hvis verdier i orid 26235 eller orid 26236 er negativ overføres 0 til
henholdsvis 35613 eller 35616.

### Websa:ValidateOnePrimaryDwelling
For å validere at kun en bolig er valgt som primærbolig i postene tilknyttet 2.8/4.3 Bolig og annen fast eiendom

## Source
Definerer skjema og felt som verdi (for overføring eller validering) skal hentes fra.

```xml
<Source form="245"
        field="Skjema/Tilbakebetaling/Utbetaling"
        sumRecurringFields="true"
        multiple="true"
        addFields="orid(7378),orid(7380)"
        subtractFields="orid(15801),orid(32836)" />
```

Forklaring:

 - `Form` er dataformat-id til skjemaet. 
 - `Field` er referanse til et eller flere felt. Kan bli gitt som OR-id eller som komplett XPath.
   Antallet felt må samsvare med antallet felt definert som mål.
 - `SumRecurringFields` forteller om overføringen skal summere repeterende felt eller ikke før overføringen.
 - `Multiple` forteller om modergruppa kan få verdier fra flere kilder. Må være `true` eller `false`.
 - `AddFields` er en liste over felt som skal bli lagt til verdien som skal overføres. Feltene skilles med komma.
 - `SubtractFields` er en liste over felt som skal trekkes fra verdien som skal overføres. Feltene skilles med komma.

## Target
Definerer skjema og felt som skal ta imot verdiene eller feilmeldinger i forbindelse med valideringer.

```xml
<Target form="2" field="Skjema/Tilbakebetaling/Utbetaling" index="0" />
```

Forklaring:

 - `Form` er dataformat-id til skjemaet. 
 - `Field` er referanse til et eller flere felt. Kan bli gitt som OR-id eller som komplett XPath.
   Antallet felt må samsvare med antallet felt definert som kilde.
 - `Index` er indeksen til målfeltet.
 - `Value` brukes om du vil sette en fast verdi.


## Param

Param er et felleselement som kan brukes til mange ulike parametertyper. Attributtet `name` brukes til å fortelle
hvilken type du vil at `Param`-elementet skal være.

### PercentageTransfer
Denne definerer hvor stor del av verdien som skal overføres.
`value` bestemmer den prosentvise delen av verdien som skal overføres. Standardverdi er 100.

```xml
<Param name="PercentageTransfer" value="30"/>
```

### IgnoreGuid
Denne bestemmer om regelmotoren skal ta hensyn til sourceFormGuid når den gjør overføringen. Dersom verdien er `true`
vil overføringen ikke merke xml-en med kildeskjema. For InfoPath-skjema må denne være `true` fordi InfoPath ikke vil
forstå dette attributtet.

Value må være enten `true` eller `false`.

```xml
<Param name="IgnoreGUID" value="true"/>
```

### SignStorageHint
Denne forteller om den overførte verdien skal bli lagret spesifikt som en positiv eller negativ
verdi.

```xml
<Param name="SignStorageHint" value="positive"/>
```

`value` forteller om verdien skal bli lagret som negativ eller positiv.
Mulige valg her er `positive`, `negative` og `any`. Standardverdi er `any`.

### AlwaysRun
Bestemmer om en overføringsregel i tillegg til å kjøres i utregningsprosessen også skal kjøres i
valideringsprosessen.

```xml
<Param name="AlwaysRun" value="true"/>
```
`value` må være `true` eller `false`, og avgjør om regelen blir kjørt i valideringsprosessen i tillegg til utregningsprosessen eller ikke.

### IgnorePrefill
Avgjør om et felt kan slettes selv om det er merket som pre-utfylt. Dette er bare relevant i skjema som ikke er
InfoPath-skjema.

```xml
<Param name="IgnorePrefill" value="true"/>
```

`value` avgjør om feltet skal slettes selv om det er merket som pre-utfylt. Må være `true` eller `false`.

### RemoveFieldIfConditionsFail
Dette avgjør om felt som ikke innfrir betingelsene for verdioverføring skal slettes. Standardverdi er
`true`.

```xml
<Param name="RemoveFieldIfConditionsFail" value="false"/>
```

`value` avgjør om dette feltet skal slettes dersom betingelsene ikke er innfridd.
Mulige valg er `true` eller `false`. Standard er `true`.

### RemoveOnMismatch
Forteller om målfeltet skal bli tømt dersom betingelsene ikke inntreffer.

```xml
<Param name="RemoveOnMismatch" value="false"/>
```

`value` forteller om målfeltet skal slettes eller ikke. Må være `true` eller `false`. Standardverdien er `true`.

### Transfertype
Avgjør typen overføring. Standard er “ManyToOne” (mange til en) der flere verdier blir regnet om til en verdi.
«ManyToMany» (mange til mange) vil overføre hver enkelt verdi til et separat målfelt. Dette er et spesialparameter
opprinnelig lagd for webSA post 402.

```xml
<Param name="TransferType" value="ManyToMany"/>
```

 `value` er enten `ManyToOne` eller `ManyToMany`.

### RemoveDirtyField
Avgjør om såkalte «skitne felt» (felter som har blitt skrevet til i løpet av prosessen) skal fjernes eller ikke.

```xml
<Param name="RemoveDirtyField" value="true"/>
```

 `value` må være `true` eller `false`. Standard er `false`.

### DoNotIgnoreZeroValue
Avgjør om verdien 0 skal overføres eller ikke.

```xml
<Param name="DoNotIgnoreZeroValue" value="true"/>
```

`value` forteller om verdien 0 skal ignoreres eller ikke.
Må være `true` (0 vil bli oppfattet som en verdi) eller `false` (0 vil bli ignorert). Standard er `false`.

### InsertEmptyIfNotCalculated
Avgjør om 0 skal brukes som verdi dersom skjemaet ikke inneholder et eller flere felter som er nødvendige for å regne ut
verdien i feltet.

```xml
<Param name="InsertEmptyIfNotCalculated" value="true"/>
```

`value` forteller om 0 skal brukes som verdi eller ikke når nødvendige felter mangler.
Må være `true` eller `false`. Standard er `false`.

### TransferRecurringFields
Avgjør om repeterende felt skal overføres.

```xml
<Param name="TransferRecurringFields" value="true"/>
```

`value` avgjør om repeterende felt skal overføres. Må være `true` eller `false`. Standard er `false`.

### SetNillable
Brukes til å fortelle at verdien kan være blank (`null`).

```xml
<Param name="SetNillable" value="true"/>
```

`value` settes til `true` for å tillate null-verdier. Standard er `false`.

### PurgeOldTransfers
Brukes når det er ønskelig at gamle overføringer skal slettes før nye gjennomføres. Bør kun brukes når det oppstår
problemer med mange overføringer fra / til samme felt.

```xml
<Param name="PurgeOldTransfers" value="true" />
```

`value` forteller om målfelter skal slettes eller ikke. Må være `true` eller `false`. Standard er `false`.

### SetValueForMultiplePosts
Brukes til å definere om oppdatering av feltverdi skal gjøres til alle målfelter i samme
skjema.

```xml
<Param name="SetValueForMultiplePosts" value="true"/>
```

`value` avgjør om oppdatering av verdi skal gjøres for alle målfelter i samme eller kun det første.
Må være `true` eller `false`. Standard er `false`.


### WebSA-spesifikke Param

Her følger en liste over Param-navn som benyttes i selvangivelsen.

### ValueType
Forteller om verdien er negativ, positiv eller begge deler. Til bruk med regel
[TransferSumFrom0402](#websa-transfersumfrom0402).

```xml
<Param name="ValueType" value="negative"/>
```

`value` kan være `both`, `positive` eller `negative`.
Brukes i kombinasjon med IndustryTypes. Se tabell under IndustryType.

### IndustryTypes
Forteller hvilke industri-/næringsområde som verdien gjelder. Til bruk med regel [TransferSumFrom0402](#websa-transfersumfrom0402).

```xml
<Param name="IndustryTypes" value="Skiferbrudd,Skiferproduksjon"/>
```
Se tabellen under for aktuelle verdier i `value`.

Oversikt over kombinasjon av verdier i IndustryType og ValueType

IndustryType                                                     | ValueType | OrId for målfeltet i RF1030 | Felt i RF1030 
---------------------------------------------------------------- | --------- | --------------------------- | --------------
Inntekt fra   familiebarnehager                                  | Positive  | 28262                       | 2.1.3         
Jordbruk_gartneri_pelsdyr, Pelsdyr,   Jordbruk_gartneri          | Positive  | 27758                       | 2.7.1         
Skogbruk                                                         | Positive  | 27759                       | 2.7.2         
Fiske_og_fangst                                                  | Positive  | 33958                       | 2.7.3         
Reindrift                                                        | Positive  | 27760                       | 2.7.4         
Skiferbrudd,   Skiferproduksjon                                  | Positive  | 20662                       | 2.7.5         
Annen_naering                                                    | Positive  | 27757                       | 2.7.6         
Familiebarnehage_i_eget_hjem,   Inntekt_fra_familiebarnehager    | Negative  | 28299                       | 3.2.19        
Annen_naering                                                    | Negative  | 21006                       | 3.2.19        
Jordbruk_gartneri_pelsdyr,   Jordbruk_gartneri, Pelsdyr          | Negative  | 27784                       | 3.2.19        
Reindrift                                                        | Negative  | 27786                       | 3.2.19        
Skiferproduksjon                                                 | Negative  | 24729                       | 3.2.19        
Skogbruk                                                         | Negative  | 27785                       | 3.2.19        
Fiske_og_fangst                                                  | Negative  | 34097                       | 3.2.19        

### BaseRate
Avgjør den grunnleggende satsen. For bruk med [InternalRF1224Calculations](#websa-internalrf1224calculations).

```xml
<Param name="BaseRate" value="81153"/>
```

`value` skal være et heltall. Standard er `81153`.

### OverMaxDistanceRate
Avgjør prosentsats for den delen av reisen som er over maksavstanden. For bruk med [TransferSumToTravelDeduction](#websa-transfersumtotraveldeduction).

```xml
<Param name="OverMaxDistanceRate" value="0.7"/>
```

`value` skal være et desimaltall. Standard er `0.7`.

### NormalRate
Avgjør normal prosentsats. For bruk med [TransferSumToTravelDeduction](#websa-transfersumtotraveldeduction).

```xml
<Param name="NormalRate" value="1.5"/>
```

`value` skal være et desimaltall. Standard er `1.5`.

### Deductible
Avgjør bunnfradraget for reiseutgifter. For bruk med [TransferSumToTravelDeduction](#websa-transfersumtotraveldeduction).

```xml
<Param name="Deductible" value="13950"/>
```

`value` skal være et heltall. Standard er `13950`.

### MinimumTollAndFerryDeduction
Avgjør minstebeløpet for å få bom- og fergeutgifter dekket. For bruk med [TransferSumToTravelDeduction](#websa-transfersumtotraveldeduction).

```xml
<Param name="MinimumTollAndFerryDeduction" value="3300"/>
```

`value` skal være et heltall. Standard er `3300`.

### MaxDistance
Avgjør hva som er maksavstand for reisegodtgjørelse. For bruk med [TransferSumToTravelDeduction](#websa-transfersumtotraveldeduction).

```xml
<Param name="MaxDistance" value="50000"/>
```

`value` skal være et heltall. Standard er `50000`.

### MaxDeduction
Avgjør maksimalfradrag. For bruk med [ValidatePost337StandardDeductionTempStay](#websa-validatepost337standarddeductiontempstay).

```xml
<Param name="MaxDeduction" value="40000"/>
```

`value` skal være et heltall. Standard er `40000`.
