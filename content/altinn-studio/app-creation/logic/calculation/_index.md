---
title: Kalkuleringer
description: Hvordan legge til kalkuleringer?
toc: true
---


**Kalkulering er fra 4.7.0 erstattet av dataprosessering. Se [her](/docs/altinn-studio/app-creation/logic/dataprocessing/)**

## Kalkulering 

Kalkuleringer kjøres på serveren, og er basert på input fra sluttbruker/skjemadata.
Kalkuleringer trenger ikke å være rent matematiske, det kan også være å overføre verdier mellom felter, resultater av API-kall, osv. 

Kalkuleringer kodes i C#, i filen `CalculationHandler.cs`. Denne filen kan redigeres enklest ved å laste ned kildekoden til app'en og redigere på egen maskin, f.eks. i Visual Studio Code.
Datamodellen med skjemadata er tilgjengelig og kan redigeres/oppdateres etter ønske/behov.

Kalkuleringer kjøres hver gang data lagres. Med auto-lagring på (dette er standard) vil kalkulering kjøres hver gang en bruker har gjort en endring og hopper ut av et felt.

{{%notice info%}}
VIKTIG: Når en kalkulering er kjørt som har oppdatert dataene på server, må front-end få beskjed om dette, sånn at de oppdaterte dataene kan lastes inn.
For å gjøre dette, må `Calculate`-metoden returnere `true` om det er noen av dataene som har blitt oppdatert.
Hvis dette ikke gjøres, vil de oppdaterte dataen ikke være synlig for sluttbruker før de ev. laster inn siden på nytt.
{{% /notice%}}

Eksempel på kode som erstatter en gitt verdi (`12345678`) med en annen verdi (`22222222`) i et gitt felt vises under:

```C# {hl_lines=[16,22]}
public bool Calculate(object data)
{
    if (data.GetType() == typeof(Skjema))
    {
        // Cast the data object to model type to access all fields
        Skjema model = (Skjema)data;

        // Get the existing value of a specified field, if it exists
        string tlf = 
            model?
            .OpplysningerOmArbeidstakerengrp8819?
            .OpplysningerOmArbeidstakerengrp8855?
            .OppgavegiverTelefonnummerdatadef27335?.value;

        // Check if the value exists and is equal to "12345678"
        if (tlf != null && tlf == "12345678")
        {
            // Replace the value in the field with a new value, "22222222"
            model
              .OpplysningerOmArbeidstakerengrp8819
              .OpplysningerOmArbeidstakerengrp8855
              .OppgavegiverTelefonnummerdatadef27335.value = "22222222";

            // Return true to trigger a re-loading of data 
            return true;
        }
    }

    // Return false if no changes have been made
    return false;
}
```