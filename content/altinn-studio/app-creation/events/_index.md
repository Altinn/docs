---
title: Events
description: Hvordan lage egendefinerte events
toc: true
weight: 180
---

## Aktivere generering av events i applikasjonen din

{{%notice info%}}
For at applikasjonen din skal kunne generere events må den referere til nugetversjon >= 1.2.4.
Se hvordan du oppdaterer nugetreferanser for applikasjonen din [her](../update/#nuget-pakker).
{{% /notice%}}

Generering og lagring av events er ikke enablet som default i applikasjonene per 22.10.2020.
Det må derfor et manuelt steg til for at applikasjonen din skal generere events.

I filen `appsettings.json` i mappen _App_ må følgende legges til i seksjonen _AppSettings_

```json
"RegisterEventsWithEventsComponent": true
```

## Pushe egendefinerte events i applikasjonen din

Servicen `IEvents` er eksponert i applikasjonen og kan dependency injectes
i den klassen der du har behov for å generere et egendefinert event. 

Metoden _AddEvent_ krever navnet på eventypen og instansen som input.

### Kodeeksempel

I denne seksjonen finner du et eksempel på hvordan man kan generere
et egendefinert event ved instansiering av applikasjonen.

Logikken er implementert i `InstantiationHandler.cs`

```cs
using Altinn.App.Services.Interface;
using Altinn.App.PlatformServices.Interface;
using Altinn.App.Services.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;
using System.Threading.Tasks;
// using Altinn.App.Models; // Uncomment this line to refer to app model(s)

namespace Altinn.App.AppLogic
{
    public class InstantiationHandler
    {
        private IProfile _profileService;
        private IRegister _registerService;
        private IEvents _eventsService;

        /// <summary>
        /// Set up access to profile and register services
        /// </summary>
        public InstantiationHandler(IProfile profileService, IRegister registerService, IEvents eventsService)
        {
            _profileService = profileService;
            _registerService = registerService;
            _eventsService = eventsService;
        }

        /// <summary>
        /// Run validations related to instantiation
        /// </summary>
        /// <example>
        /// if ([some condition])
        /// {
        ///     return new ValidationResult("[error message]");
        /// }
        /// return null;
        /// </example>
        /// <param name="instance"></param>
        /// <param name="validationResults"></param>
        /// <returns>The validation result object (null if no errors) </returns>
        public async Task<InstantiationValidationResult> RunInstantiationValidation(Instance instance)
        {
            return await Task.FromResult((InstantiationValidationResult)null);
        }

        /// <summary>
        /// Run events related to instantiation
        /// </summary>
        /// <remarks>
        /// For example custom prefill.
        /// </remarks>
        /// <param name="instance">Instance information</param>
        /// <param name="data">The data object created</param>
        public async Task DataCreation(Instance instance, object data)
        {
            await _eventsService.AddEvent("app.test.event", instance);
            await Task.CompletedTask;
        }
    }
}
```

1. Den private variabelen for servicen inkluderes i klassen

    ```cs
    private IEvents _eventsService;
    ```

2. Namespce for IEvents må inkluderes i klassen. 
    Legg til linjen nedenfor blant de andre _using_-statements øverst i filen.

    ```cs
    using Altinn.App.PlatformServices.Interface;
    ```

3. IEvents servicen dependency injectes inn i klassen. Og den private variabelen blir assignet en verdi.

    ```cs
        public InstantiationHandler(IProfile profileService, IRegister registerService, IEvents eventsService)
        {
            _profileService = profileService;
            _registerService = registerService;
            _eventsService = eventsService;
        }
    ```

4. I metoden der man har behov for å genere et event kaller man på servicen.

    Her har det egendefinerte eventet fått navnet `app.test.event`,
    i tillegg sendes instansen med. Denne brukes til å populere resterende metadata om eventet.

    ```cs
    await _eventsService.AddEvent("app.test.event", instance);  
   ```

5. Dersom du prøver å bygge løsningen nå vil det feile.

    IEvents vil mangle der InstantiationHandler instansieres. Naviger til `App.cs`
    og dependency inject servicen inn i konstruktøren til App.

    Videre må tjenesten legges til i kallet der InstantiationHandler instansieres som vist nedenfor.

    ```cs
    public App(
        IAppResources appResourcesService,
        ILogger<App> logger,
        IData dataService,
        IProcess processService,
        IPDF pdfService,
        IProfile profileService,
        IRegister registerService,
        IPrefill prefillService,
        IEvents eventsService
        ) : base(appResourcesService, logger, dataService, processService, pdfService, prefillService)
    {
        _logger = logger;
        _validationHandler = new ValidationHandler();
        _calculationHandler = new CalculationHandler();
        _instantiationHandler = new InstantiationHandler(profileService, registerService, eventsService);
    }
    ```

6. Applikasjonen din er nå klar til å generere et egendefinert event under instansiering.
Dette er mulig å [teste lokalt](https://github.com/Altinn/altinn-studio/blob/master/LOCALAPP.md) før det evt. deployes til et testmiljø.