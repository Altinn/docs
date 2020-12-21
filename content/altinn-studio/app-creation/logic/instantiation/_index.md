---
title: Instansiering
description: Hvordan legge til logikk som skal kjøres ved instansiering?
toc: true
---

## Introduksjon

Applikasjonslogikk knyttet til instansiering kan defineres i `InstantiationHandler.cs`. For en helt ny app vil det være to funksjoner implementert i denne klassen:

 - `RunInstantiationValidation` - lag egne sjekker for å avgjøre om en bruker/avgiver får lov til å instansiere.
 - `DataCreation` - lag tilpasset prefill data.

## Egendefinerte valideringsregler for instansiering
Som tidligere nevnt, kan sjekker for instansieres kan defineres i `RunInstantiationValidation`.
Tilgang til _Register_- og _Profile_-tjenester er inkludert i `InstantiationHandler.cs`-filen, som tillater å gjøre sjekker mot disse.
Valideringsregler for instansiering kan innebære å validere tidspunkt til spesifikke brukerrestriksjoner og komplekse sjekker som krever eksterne API-kall.


### Eksempel 1 - Insansiering kun tillatt før kl 15:00 på en gitt dag

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

### Eksempel 2 - Instansiering kun tillatt for applikasjonseier

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

## Egendefinert prefill
Dette er logikk som kan brukes til å preutfylle all mulig data, inkludert data fra `Register` og `Profile`. Man kan også f.eks. gjøre eksterne API-kall for å hente data.

Under er et eksempel der feltet `Person.FirstName` preutfylles med verdien `Test Testesen`:

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