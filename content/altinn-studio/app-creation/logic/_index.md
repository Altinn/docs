---
title: Logikk
description: Hvordan legge til, endre og konfigurere applikasjonslogikk som validering, kalkulering og dynamikk.
toc: true
---

De forskjellige filene som brukes til å definere logikk, finner man i logikk-menyen,
som er tilgjengelig i UI-editoren via  _f(x)_-ikonet øverst til høyre.

![Logikkmeny](ui-editor-logic-menu.png?height=300px "Logikkmeny")

De kan også redigeres direkte fra applikasjonsrepoet, under folderen `App/logic` (for serverside applikasjonslogikk) eller folderen `App/ui` (for dynamikk).
Denne folderen inneholder som standard følgende filer:

```C#
🗀 App/
  🗀 logic/
    🗀 Calculation/
      🗎 CalculationHandler.cs
    🗀 Validation/
      🗎 ValidationHandler.cs
    🗎 App.cs
    🗎 InstantiationHandler.cs
```
Flere filer kan legges til her når det er nødvendig.

Et komplett prosjekt med eksempler på serverside applikasjonslogikk ligger [her](https://dev.altinn.studio/repos/ttd/webdemo2).

{{%panel info%}}
**MERK:** Måten man refererer til elementer i datamodellen er ulik mellom OR og SERES typer XSDer.
For OR XSDer er `.value` et nødvendig suffiks i referansen. Eksempelkoden under bruker en blanding av de to typene datamodeller.
{{% /panel%}}

## Instansiering
Applikasjonslogikk knyttet til instansiering kan defineres i `InstantiationHandler.cs`. For en helt ny app vil det være to funksjoner implementert i denne klassen:

 - `RunInstantiationValidation` - lag egne sjekker for å avgjøre om en bruker/avgiver får lov til å instansiere.
 - `DataCreation` - lag tilpasset prefill data.

### Egendefinerte valideringsregler for instansiering
Som tidligere nevnt, kan sjekker for instansieres kan defineres i `RunInstantiationValidation`.
Tilgang til _Register_- og _Profile_-tjenester er inkludert i `InstantiationHandler.cs`-filen, som tillater å gjøre sjekker mot disse.
Valideringsregler for instansiering kan innebære å validere tidspunkt til spesifikke brukerrestriksjoner og komplekse sjekker som krever eksterne API-kall.


#### Eksempel 1 - Insansiering kun tillatt før kl 15:00 på en gitt dag

```C# {hl_lines=[4]}
public async Task<InstantiationValidationResult> RunInstantiationValidation(Instance instance)
{
    DateTime now = DateTime.Now;
    if (now.Hour < 15)
    {
        return new InstantiationValidationResult()
        {
            Valid = false,
            Message = "ERROR: Instantiation not possible before 3PM."
        };
    }

    return null;
}
```

#### Eksempel 2 - Instansiering kun tillatt for applikasjonseier

Kodebasen som eksempelet er basert på er tilgjengelig [her](https://altinn.studio/repos/ttd/example-app-1).
(krever innlogging i altinn.studio)

For å kunne begrense instansiering til en gitt entitet, i dette tilfellet applikasjonseier,
er det to filer som må endres: `App.cs` og `InstantiationHandler.cs`. 

![Changes to app.cs](instatiation-example-2-appcs.PNG "Changes to app.cs")

I `App.cs` tilgjengeliggjøres http-konteksten og 
brukerdata (claims principals) hentes ut fra konteksten ved å kalle ```_httpContext.User```.

For å validere instansieringen kan man sjekke ett av to claims i konteksten.
Enten organisasjonsen trebokstavsforkortelse eller organisasjonsnummeret.
Valideringen skjer i `InstantiationHandler.cs` og eksempelet nedenfor bruker organisasjonsforkortelsen. 

For å validere basert på organisasjonsnummer kan du følge eksempelet nedenfor,
og bytte ut *AltinnCoreClaimTypes&#46;Org* med *AltinnCoreClaimTypes.OrgNumber*.  
om må gjøres i denne file ser du nedenfor.

![InstantiationHandler.cs](instatiation-example-2-instantiationhandler.PNG "Changes to instantiationHandler.cs")


```C#
public async Task<InstantiationValidationResult> RunInstantiationValidation(Instance instance, ClaimsPrincipal user)
{
    var result = new InstantiationValidationResult();
    string org = string.Empty;

    if (user.HasClaim(c => c.Type == AltinnCoreClaimTypes.Org))
    {
        Claim orgClaim =
          user.FindFirst(c => c.Type == AltinnCoreClaimTypes.Org);
          
        if (orgClaim != null)
        {
            org = orgClaim.Value;
        }
    }

    if (!string.IsNullOrWhiteSpace(org) && org.Equals("ttd"))
    {
        result.Valid = true;
    }
    else
    {
        result.Valid = false;
        result.Message =
          "Only ttd is allowed to instantiate this application.";
    }

    return await Task.FromResult(result);
}
```

### Custom prefill
This can be used to prefill any data, including data from `Register` and `Profile`, as well as data from external sources from API calls. 

An example that prefills a field `Person.FirstName` to the value `Test Testesen` is:

```C#
public async Task DataCreation(Instance instance, object data)
{
    if (data.getType() == typeof(Skjema))
    {
      Skjema model = (Skjema)data;
      model.Person.FirstName = "Test Testesen";
    }
}
```

## Validering

Valideringer sørger for at brukerens input er gyldig med tanke på datamodellen,
i tillegg til alle egendefinerte regler som settes opp for applikasjonen.
Valideringer kan kjøres enten på klient (dvs. browseren) eller serversiden.

### Klientside-validering

{{%notice info%}}
MERK: Konfigurasjon av klientside-validering er foreløpig ikke tilgjenglig.
Dokumentasjonen vil oppdateres når ny funksjonalitet blir tilgjengelig.
{{% /notice%}}

Disse valideringene kjøres automatisk og,
validerer brukerens input opp mot restriksjoner i datamodellen.
Følgende restriksjoner er tilgjengelige for øyeblikket:

- min verdi (tall)
- max verdi (tall)
- min lengde
- max lengde
- lengde
- mønster / patterns

I tillegg støttes påkrevde felt.
Dette kobles automatisk til datamodellen og ingen ytterligere konfigurasjon er nødvendig.

### Serverside-validering

Serverside-validering kan deles opp i to kategorier:

- **Valideringer mot datamodell** - Disse kjører automatisk når brukeren prøver å sende inn skjemadata.
- **Egendefinerte valideringer** - Disse skrives av applikasjonsutvikleren,
og kjører når brukeren prøver å sende inn skjemadata eller flytte prosessen til et nytt steg.

### Hvordan legge til egendefinert validering
Egendefinerte validering kan igjen deles opp i to kategorier; task-validering og data-validering.
  - Task-validering vil kjøres hver gang validering trigges enten manuelt fra applikasjonen eller når man prøver å flytte seg framover i prosessen.
  - Data-validering vil kjøre dersom man står på et steg som har definerte dataelementer knyttet til seg.

Valideringer er skrevet i C#, i `ValidationHandler.cs` -filen i applikasjonsmalen.
Filen kan aksesseres og endres i Altinn Studio via logikkmenyen, ved å velge _Rediger valideringer_,
eller direkte i applikasjonsrepoet der ligger filen i `logic/Validation`-mappen.

Endringer gjøres i `ValidateData` og `ValidateTask`-metodene (disse er tomme når appen lages).
Førstnevnte får inn et dataobjekt og sistnevnte får inn instansen og taskId.
For å legge til en valideringsfeil brukes `AddModelError`-metoden til `validationResults` object som sendes med i begge metodene.

Et eksempel på en enkel data-validering som sjekker at feltet _FirstName_ ikke inneholder verdien _1337_, når rotelementet til modellen er `Skjema` er vist nedenfor:

```C# {hl_lines=[12]}
public void ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data.GetType() == typeof(Skjema))
    {
      // Cast instance data to model type
      Skjema model = (Skjema)data;

      // Get value to test - FirstName
      string firstName = Skjema?.Person?.FirstName;

      // Check if FirstName exists, and contains the value "1337"
      if (firstName != null && firstName.Contains("1337"))
      {
        // Add validation error, with error message and list
        // of affected fields (in this case Person.FirstName)
        validationResults.AddModelError(
          "Person.FirstName",
          "Error: First name cannot contain the value '1337'."
        );
      }
    }
}
```

Se kommentarer i koden over for en forklaring på hva de ulike delene gjør.

Et eksempel på en enkel task-validering som sjekker hvor lang tid brukeren har brukt på Task_1 og returnerer en feil dersom det har tatt lenger enn 3 dager.

```C# {hl_lines=["5-6"]}
public async Task ValidateTask(Instance instance, string taskId, ModelStateDictionary validationResults)
{
  if (taskId.Equals("Task_1"))
  {
    DateTime deadline = ((DateTime)instance.Created).AddDays(3);
    if (DateTime.UtcNow < deadline)
    {
      validationResults.AddModelError("Task_1", $"Ferdigstilling av Task_1 har tatt for lang tid. Vennligst start på nytt.");
    }
  }
}
```

### Enkeltfeltvalidering

Dersom det er behov for umiddelbar validering av et felt
som ikke kan dekkes i klientsidevalideringen, 
så kan man sette opp en trigger for validering på enkeltfelter i `formLayout.json`

```json {hl_lines=[13]}
{
  "data": {
    "layout": [
      {
        "id": "3611fb2a-c06b-4fa7-a400-3f6c1ece64e1",
        "textResourceBindings": {
          "title": "25795.OppgavegiverNavnPreutfyltdatadef25795.Label"
        },
        "dataModelBindings": {
          "simpleBinding": "etatid"
        },
        "type": "Input",
        "triggers": ["validation"] , // <--- Add this field
      },
      {
        "id": "9ec368da-d6a9-4fbd-94d0-b4dfa8891981",
        "type": "Button",
        "textResourceBindings": {
          "title": "Button"
        },
        "dataModelBindings": {},
        "textResourceId": "Standard.Button.Button",
        "customType": "Standard"
      }
    ]
  }
}
```

Konfigurasjonen overfor vil resultere i at din egendefinerte validering i `ValidationHandler.cs`
vil trigges hver gang feltet oppdaterer seg. Dersom du har behov for å vite hvilket
felt som trigget valideringen er denne tilgjengelig i http-konteksten som en header på requesten ved navn _ValidationTriggerField_.

Et eksempel på en egendefinert validering der headerverdien hentes ut er vist nedenfor.

```csharp
 public async Task ValidateData(object data, ModelStateDictionary validationResults)
 {
    _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("ValidationTriggerField", out StringValues value);

    if (value.Count > 0 && value[0].Equals("kommune"))
    {
      // Cast instance data to model type
      flyttemelding model = (flyttemelding)data;

      // Get value to test - Kommune
      string kommune = model.kommune;

      if (!kommune.Equals("Oslo"))
      {
          validationResults.AddModelError(value[0], "Dette er ikke en gyldig kommune.");
      }
    }
 }
```

### Soft validation

{{%notice warning%}}
This functionality is currently disabled.
{{% /notice%}}

Soft validations (or warnings) are validation messages that do not stop the user from proceeding to the next step.
This validation type can be used for example to ask the user to verify input that might seem strange, but is not technically invalid.
Soft validations are set up in the same way as other validations - the only difference is that the validation message must be prefixed by `*WARNING*`. 

<!-- An example is shown below:

```csharp
public void Validate(TestModel TestModel, RequestContext requestContext, ModelStateDictionary modelState)
{   
    // Validate first name
    ValidateFirstName(TestModel, modelState);
}

private void ValidateFirstName(TestModel TestModel, ModelStateDictionary modelState)
{
    // First, make sure that the field exists
    string firstName = TestModel?.Person?.FirstName;

    // Check if field contains "1337"
    if (firstName != null && firstName.Contains("1337")) 
    {
        // If the field value contains "1337", add an error message using AddModelError-method.
        // The first argument is the error message key, which should be the data model path (without root node), if possible.
        // The second argument is the error message, which can be either a text, or a text key.
        // When adding a soft validation, prefix the error message with *WARNING*
        modelState.AddModelError("Person.FirstName", "*WARNING*Are you sure your first name contains 1337?");
    }
}
```-->

## Calculation
Calculations are done server-side, and are based on input from the end user.
Calculations do not have to be purely mathematical calcilations, but can also include populating fields based on other form data, api calls, etc.

 Calculations need to be coded in C# in the file `CalculationHandler.cs`.
 This file can be edited by clicking _Rediger kalkuleringer_ from the logic menu.
 The data model object is passed to the `Calculate`-method and can be manipulated directly. 

{{%notice info%}}
IMPORTANT: Once a calculation is done, the app front-end needs to re-load the data in order to get the updated data.  
To do this, the `Calculate`-method must return the value `true` if any data has been updated.
If this is not done, then the data will be updated on the server, but this will not be visible for the end user until they manually reload.
{{% /notice%}}

Below is an example of code that replaces a given value (`12345678`) with another value (`22222222`) in a specified field:

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


## Dynamics
Dynamics are events that happen on the client-side. These are split into two categories:

- Rules - explicitly set the value of a field, based on some condition or value input. 
  - For example calculations based on input from another field.
- Conditional rendering - Show/hide fields based on conditions.

All conditions and rules are written in javascript, in the file `RuleHandler.js`. The file can be reached through the logic menu, by clicking _Rediger dynamikk_. 

Once these conditions/methods are coded, they can be configured to be triggered for specific fields in the form.

{{%notice info%}}
The code that defines rules/conditions should be set up so that it handles any possible error sources.  
For example, rules are set up to run as soon as input is received.
If a rule is dependent on input from multiple fields, then it must be coded to handle cases when only one of the fields has received input.  
If a rule is not behaving as expected, take a look at the code for the rule and consider if there are any assumptions made that may need to be addressed. 
{{% /notice%}}

### Add/edit methods for dynamics
The solution currently supports two types of methods:

- Rules for calculation/populating values in form fields
- Conditions for rendering (hide/show) of form fields

These are defined in the file `RuleHandler.js` as separate objects, `ruleHandlerObject` and `conditionalRuleHandlerObject`. In addition there are two corresponding _helper_ objects (`ruleHandlerHelper` and `conditionalRuleHandlerHelper`), that define which parameters should be set up when configuring the methods to trigger. In order for a dynamics method to be available, the actual method/action must be defined in the _object_ and the configuration parameters must be defined in the corresponding _helper_, and the names _must_ be as described above for the helpers and objects.

The structure of the _helper_ is as follows:

```javascript
var ruleHandlerHelper = {
  <name_of_rule>: () => {
    return {
      <input_param>: "<description>",
      <input_param>: "<description>",
      <input_param>: "<description>"
      ...
    };
  }
}
```

The structure of the _object_ containing the rule/conditional rendering definitions is as follows:

```javascript
var ruleHandlerObject = {
  <name_of_rule>: (<input_variable_name>) => {
    // Do something here
    // Values from input parameters defined in 
    // helper can be accessed through the object passed
    // into the rule, f.ex.
    // <input_variable_name>.<input_param>
  }
}
```

For example, to create a rule that returns the sum of two numbers, one would need the following:

```javascript
var ruleHandlerHelper = {
  sum: () => {
    return {
      field1: "Field 1 in sum",
      field2: "Field 2 in sum"
    };
  }
}

var ruleHandlerObject = {
  sum: (data) => {
    // Check if data is available
    if (!data) return;

    // Check if value from input fields are available
    // If not, use value 0 in sum
    data.field1 = data.field1 ? data.field1 : 0;
    data.field2 = data.field2 ? data.field2 : 0;

    // return the sum
    return data.field1 + data.field2;
  }
}
```

The objects and helpers are all generated automatically with some examples when the service is created, and can be added to or edited to create/change methods.

In the example below, the following methods are defined:

| Method name          | Description                                                      | Parameters              | Defined in object/helper                                      |
| -------------------- | ---------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------- |
| `sum`                | Returns the sum of the 2 provided values                         | `value1`, `value2`      | `ruleHandlerObject`/`ruleHandlerHelper`                       |
| `fullName`           | Returns the full name based on the provided first and last names | `firstName`, `lastName` | `ruleHandlerObject`/`ruleHandlerHelper`                       |
| `lengthGreaterThan4` | Returns `true` if the provided value's length is greater than 4  | `value`                 | `conditionalRuleHandlerObject`/`conditionalRuleHandlerHelper` |

Note that _rules_ are run when there is a change in any of the defined input parameters.
The rule definition needs to handle cases where the rule might crash because one or more parameters are missing, or if the rule should not produce a result until all input parameters are provided.

An example of how this can be done is shown in the `sum` rule below, where the rule tests if the parameters are provided,
and sets them to the value `0` if they are not provided, so that a sum can be calculated.

```javascript
var ruleHandlerObject = {
  sum: (obj) => {
    obj.value1 = obj.value1 ? +obj.value1 : 0;
    obj.value2 = obj.value2 ? +obj.value2 : 0;
    return obj.value1 + obj.value2;
  },

  fullName: (obj) => {
    return obj.firstName + ' ' + obj.lastName;
  }
}
var ruleHandlerHelper = {
  sum: () => {
    return {
      value1: "Value 1",
      value2: "Value 2"
    }
  },

  fullName: () => {
    return {
      firstName: "First name",
      lastName: "Last name"
    };
  }
}

var conditionalRuleHandlerObject = {
  lengthBiggerThan4: (obj) => {
    if (obj.value == null) return false;
    return obj.value.length >= 4;
  }
}
var conditionalRuleHandlerHelper = {
  lengthBiggerThan4: () => {
    return {
      value: "value"
    }
  }
}
```

### Configuring dynamics for form components

1. Add any form components that are needed. For example, for the method `sum` defined above, 3 input values are required, so 3 form components have to be set up for the input, in addition to 1 field to display the result. 
2. Open the logic menu and select _Legg til tilkobling_ under _Regler_ (for calculation/population rules) or _Betingede redigeringstilkoblinger_ for conditional rendering.
3. Select rule from the list of available rules, ex. `sum` from the example above.
4. Configure the fields that will provide input to the method
  - a. For calculation/population rules, use the same data model field as configured on the form component.
  - b. For conditional rendering, select the component id from the list
5. Configure the field that will show the output/render conditionally
  - a. For calculation/population rules, select the same data model field as configured on the form component that is to show the result.
  - b. For conditional rendering, first select the action (hide/show) that will trigger if the selected method returns `true`. Then select the component id that will be conditionally rendered.
6. Save the configuration.
7. Test that it works by entering values in the defined input fields.

Existing configurations are visible in the logic menu, and can be edited/deleted.

### Example of using dynamics in a form

The scenario:

An app uses a form which has multiple input fields. One of these is a radio button group, with Yes/No options.
Depending on the end users response (Yes or No), different content should be shown:

- Yes: A new input field should be shown, together with information on what to fill out in the field.
- No: An information text should be showm.

After creating the form in the UI editor, the following code is added from the logic menu, under "Rediger dynamikk":

```javascript
var conditionalRuleHandlerObject = {
  sjekkVirksomhetIDrift: (obj) => {
    return (obj.value && obj.value === "Ja");
  },

  sjekkVirksomhetIkkeIDrift: (obj) => {
    return (!obj.value || obj.value != "Ja");
  }
}

var conditionalRuleHandlerHelper = {
  sjekkVirksomhetIDrift: () => {
    return {
      value: "Verdi"
    }
  },
  sjekkVirksomhetIkkeIDrift: () => {
    return {
      value: "Verdi"
    }
  }
}
```

Here, two functions are created to check if the a given value is either "Ja" or "Nei". 

After adding this code, the configuration for using the functions is added. Starting with `sjekkVirksomhetIDrift`:

![Test of dynamics example](dynamics-example-config.png "Test of dynamics example")

- First, we add the field that will provide the input.
  - This is the data model field that is also mapped to the radio button group we want to trigger the dynamics.
- Then we select the action (show/hide) we want to trigger, and which components we want to be affected
  - Here, we select *show*. This will hide the components until they are triggered to show.
  - We add the text components (header and paragraph for information text) and input component that should be _shown_ when the dynamic is triggered.

Then we do the same for `sjekkVirksomhetIkkeIDrift`. 

Finally, we run a manual test in Altinn Studio to check that everything works as expected. The results are shown in the GIF below. 

![Test of dynamics screenshot](dynamics-test.gif "Test of dynamics example")


### Example with more complex dynamics

The scenario:

A form with two sets of radio buttons (yes/no), and a checkbox.

- When the form loads, only the first radio button group is visible. 
- If the user selects _Yes_ in the first radio button group, the second radio button group becomes visible.
- If the user selects _Yes_ in the second radio button group, the checkbox becomes visible.
- If the user goes back and selects _No_ in the first radio button group, only the first radio button group should be visible.

#### Alternative 1
This can be set up by creating two separate conditions for when to show the fields:

- One for the second radio button group:
  - Show when _Yes_ is selected in the first group
- One for the checkbox:
  - Show when _Yes_ is selected in _both_ the first and second radio button groups.

The code for this would be:

```javascript
var conditionalRuleHandlerObject = {
  showField2: (obj) => {
    if (obj && obj.field1 && obj.field1=== "yes") {
      return true;
    }
    return false;
  },

  showField3: (obj) => {
    if (obj && obj.field1 && obj.field1 === "yes"
      && obj.field2 && obj.field2 === "yes") {
        return true;
    }
    return false;
  }
}

var conditionalRuleHandlerHelper = {
  showField2: () => {
    return {
      field1: "Field 1"
    };
  },

  showField3: () => {
    return {
      field1: "Field 1",
      field2: "Field 2"
    };
  }
}
```

#### Alternative 2
This can also be set up by using the same condition for showing the field for both the second radio button group and the checkbox,
and in addition adding a rule to clear the value from the second radio button group if the value of the first radio button group is set to _No_:

```javascript
var ruleHandlerObject = {
  clearField: (obj) => {
    if (obj && obj.checkValue === "no") {
      return "";
    }
    return obj.currentValue;
  }
}

var ruleHandlerHelper = {
  clearField: () =>  {
    return {
      checkValue: "check against this value",
      currentValue: "the current value"
    }
  }
}

var conditionalRuleHandlerObject = {
  showField: (obj) => {
    if (obj && obj.checkField && obj.checkField === "yes") {
      return true;
    }
    return false;
  }
}

var conditionalRuleHandlerHelper = {
  showField: () => {
    return {
      checkField: "check against this value"
    };
  }
}
```

## Auto-complete/intellisense

C#-files (which are used in calculations and server-side validations) are set up with support for auto-complete for the data model.
This means that suggestions for possible fields in the data model are displayed as you type. 

For javascript-files, a full language intellisense is available, which suggests possibilities defined by the javascript language,
and shows any syntax errors with a red underline.
Intellisense/autocomplete is automatically shown as you type, and can also be reached by the key combination `CTRL + SPACE`.

![Logic menu - auto-complete/intellisense](datamodel-intellisense.gif "Logic menu - auto-complete/intellisense")

In order to get complete intellisense with C# support, the app must be edited locally using f.ex. Visual Studio Code.
