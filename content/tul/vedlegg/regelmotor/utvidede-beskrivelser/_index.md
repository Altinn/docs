---
title: Utvidede beskrivelser
description: Bruk av regelmotor for parallell signering og vedleggsfiltrering.
toc: true
weight: 40
---

## Regelmotor og parallellsignering

Tjenester som har parallellsigneringsteg kan velge å få utført automatisk delegering av rettigheter til
parallellsignerere. For å benytte seg av dette må man benytte seg av [TransferTransformedResult](../regler#transfertransformedresult)-regelen.
For slike tjenester forventer Altinn plattformen at man bruker denne regelen til og populere en spesiell property i rot noden på
skjema. Det som trengs av data er personnummer/brukernavn/orgnummer, etternavn, epost og mobilnummer i denne
rekkefølgen. (skjema må da ha slik input i en repeterende gruppe)

Data vil bli validert i signeringssteget under validering slik at det er en fordel at man også implementer slik
validering i selve skjema slik at ikke delegering feiler. (validering av dette kan ikke gjøres av regelmotor)

Eksempel på fungerende oppsatt regel, med riktig angitt regler er.

```xml
<Rule type="TransferTransformedResult" description="Transfer to myfield">
    <Source form="3940" concatFields="/melding/ElektroniskStiftelseAvAksjeselskap/EnhetAnsvarligFodselsnummerOrganisasjonsnummerUserNavn, /melding/ElektroniskStiftelseAvAksjeselskap/LastNavn, /melding/ElektroniskStiftelseAvAksjeselskap/Email, /melding/ElektroniskStiftelseAvAksjeselskap/MobileNummer" />
    <Target form="3940" field="property(ParallelSigningUserDetails)" />
    <Param name="AlwaysRun" value="true" />
    <Param name="TransferType" value="ManyToOne" />
</Rule>
```

## Regelmotor og vedleggsfiltrering

Det er mulig å benytte regelmotoren til validere om brukeren har lagt ved nødvendige vedlegg. For å få dette til å
fungere sammen med Altinn plattformen er det nødvendig å fylle ut et spesielt attributt i rot noden på skjema samt å
gjøre validering på vedleggene lagt ved.

For at filopplastingsfunksjonaliteten i Altinn plattformen skal filtrere ut valg basert på valg i skjema må regelmotoren
sette attributtet Attachmentfilter i rot-noden på skjema. Eksempelet nedenfor viser hvordan det kan gjøres.

```xml
<Rule type="SetFieldValue" description="Set filter when Industri has been chosen">
	<Source form="3940" field="/melding/SkjemavalgSkal/AttachmentTypeChoices"/>
    <Target form="3940" field="property(AttachmentFilter)" value="AT01_Cycle01, AT03_Cycle01, AT04_Cycle01"/>
    <Param name="AlwaysRun" value="true"/>
    <Param name="RemoveOnMismatch" value="false"/>
    <Condition type="Equals" check="/melding/SkjemavalgSkal/AttachmentTypeChoices" value="Industri"/>
</Rule>
```

Basert på conditions og antall skjema kan man validere om riktige vedlegg er lastet opp. Eksempel på regel ses nedenfor
som bruker condition [HasAnyAttachment](../betingelser#hasanyattachment). Legg merke til TargetField som er satt til AttachmentList som gjør at
valideringsfeilmelding blir vist riktig i portal.

```xml
<Rule type="SimpleValidation" description="Check if invalid attachments are added">
    <Target field="AttachmentList"/>
	<Param name="AlwaysRun" value="true"/>
    <Condition type="Equals" check="/melding/SkjemavalgSkal/AttachmentTypeChoices" value="Industri"/>
    <Condition type="HasAnyAttachment" form="AT02_Cycle01,AT06_Cycle01"/>
    <Texts>
        <Text lang="1044"> Ugyldige vedlegg er lagt AT02_Cycle01/AT06_Cycle01.</Text>
        <Text lang="2068"> Ugyldige vedlegg er lagt AT02_Cycle01/AT06_Cycle01.</Text>
        <Text lang="1033">Invalid attachments are added AT02_Cycle01/AT06_Cycle01.</Text>
    </Texts>
</Rule>
```

Eksempelet nedfor viser hvordan man regelmotor validerer om man mangler et vedlegg ved å bruke condition
[MissingAttachment](../betingelser#missingattachment). Legg merke til TargetField som er satt til AttachmentList som gjør at valideringsfeilmelding blir
vist riktig i portal.

```xml
<Rule type="SimpleValidation" description="Check if missing attachments were not added">
    <Target field="AttachmentList"/>
	<Param name="AlwaysRun" value="true"/>
    <Condition type="Equals" check="/melding/SkjemavalgSkal/AttachmentTypeChoices" value="Industri"/>
    <Condition type="MissingAttachment" form="AT01_Cycle01"/>
    <Texts>
        <Text lang="1044"> Manglende vedlegg - AT01_Cycle01.</Text>
        <Text lang="2068"> Manglende vedlegg - AT01_Cycle01.</Text>
        <Text lang="1033"> MIssing Attachment - AT01_Cycle01.</Text>
    </Texts>
</Rule>
```
