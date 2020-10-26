---
title: Hemmeligheter i app
description: Hvordan håndtere hemmeligheter og sensitiv data i en app.
weight: 200
---

{{%notice info%}}
MERK: Det gjøres i disse dager et arbeid for å opprette et Azure Key Vault
for alle appeiere der de selv kan administrere sine hemmeligheter.
Ta en avsjekk med din tekniske kontakt dersom du er usikker på om dette er tilgjengelig for din organisasjon.
{{% /notice%}}

## Konfigurer støtte for bruk av hemmeligheter i applikasjonen

For å kunne benytte hemmeligheter i din applikasjon må du bruke nugetversjon >= 1.2.2.
Se hvordan du oppdaterer nugetreferanser for applikasjonen din [her](../update/#nuget-pakker).

1. Oppdater helm charts for å koble opp rett konfigurasjon til din

    I applikasjonsrepoet ditt finner du filen `values.yaml` i mappen _deployment_.

    Under seksjonen _volumeMounts_ legger du til følgende linjer:

    ```yaml
    - name: altinn-appsettings-secret
    mountPath: "/altinn-appsettings-secret"
    ```

    Under seksjonen _volumes_ legger du til følgende linjer:

    ```yaml
    - name: altinn-appsettings-secret
        secret:
        secretName: altinn-appsettings-secret
    ```

    OBS! Vær påpasselig med antall linjeskift og innrykk når du jobber i _values.yaml_.

    Siste del av filen skal se omtrent slik ut når du har gjort ferdig alle endringer.

    ![Steg 1](images/1.PNG)

2. Videre må konfigurasjonen som ligger i appclusteret knyttes til den kjørende tjenesten

    I applikasjonsrepoet ditt finner du filen `Program.cs` i mappen _App_.

    I metoden `CreateHostBuilder` skal det kalles på en metode som vil laste opp konfigurasjon for hemmeligheter.

    Du kan bytte ut hele metoden med kodesnuten nedenfor.

    ```cs
    public static IHostBuilder CreateHostBuilder(string[] args) =>
                Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureAppConfiguration((hostingContext, configBuilder) =>
                    {
                        configBuilder.LoadAppConfig();
                    });
                    webBuilder.UseStartup<Startup>();
                });
    ```

    I tillegg må man importere biblioteket der _configBuilder.LoadAppConfig_ er implementert.
    Lim inn følgende øverst i filen.

    ```cs
    using Altinn.App.PlatformServices.Extensions;
    ```

3. I applikasjonsrepoet ditt finner du filen `Startup.cs` i mappen `App`.

    I metoden `ConfigureServices` skal det kalles på en metode som vil tilgjengeliggjøre konfigurasjon samt en klient for å hente tjeneser
    for applikasjonens ulike klasser.

    Lim inn følgende et sted i denne metoden. Gjerne der andre kall til _services_ blir gjort.

    ```cs
    services.AddAppSecrets(Configuration, _env);
    ```

4. Forsikre deg om at applikasjonen din fortsatt bygger og at deploy via Altinn Studio enda er mulig.
    Din applikasjon er nå klar til å benytte hemmeligheter!

## Hvordan benytte hemmeligheter i applikasjonen

Servicen `ISecret` er eksponert i applikasjonen og kan dependency injectes
i den klassen der du har behov for å hente ut en hemmelighet.

### Lokal mock

For å kunne kjøre tjenesten din lokalt uten å koble seg til Azure Key vault
må man opprette filen `secrets.json` under mappen _App_.
I Json strukturen kan man legge inn dummydata for hemmelighetene man har behov for.
Har man lastet opp en hemmelighet i Key Vault med navnet "secretId" vil innholdet i json-filen se slik ut

```json
{
  "secretId": "local cecret dummy data"
}
```

### Type hemmeligheter

Secret - lagres som en streng direkte i keyvault. F.eks et sertifikat som er base64 encoded eller et token.
Key - Nøkkel
Certificate - et sertifikat

### Kodeeksempel

I denne seksjonen finner du et eksempel på hvordan man benytter en hemmelighet
til å populere et skjemafelt under instansiering.

Logikken er implementert i `InstantiationHandler.cs`

```cs
using Altinn.App.Models;
using Altinn.App.Services.Interface;
using Altinn.App.Services.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;
using System.Threading.Tasks;

namespace Altinn.App.AppLogic
{
    public class InstantiationHandler
    {
        private IProfile _profileService;
        private IRegister _registerService;
        private ISecrets _secretsService;

        /// <summary>
        /// Set up access to profile and register services
        /// </summary>
        /// <param name="profileService"></param>
        /// <param name="registerService"></param>
        public InstantiationHandler(IProfile profileService, IRegister registerService, ISecrets secretsService)
        {
            _profileService = profileService;
            _registerService = registerService;
            _secretsService = secretsService;
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

            if (data.GetType() == typeof(Skjema))
            {
                Skjema model = (Skjema)data;
                model.etatid = await _secretsService_.GetSecretAsync("secretId");
            }
            await Task.CompletedTask;
        }
    }
}
```

1. Den private variabelen for servicen inkluderes i klassen

    ```cs
    private ISecrets _secretsService;
    ```

2. ISecrets servicen dependency injectes inn i klassen. Og den private variabelen blir assignet en verdi.

    ```cs
    public InstantiationHandler(IProfile profileService, IRegister registerService, ISecrets secretsService)
            {
                _profileService = profileService;
                _registerService = registerService;
                _secretsService = secretsService;
            }

    ```

3. I metoden der man har behov for hemmeligheten kaller man på servicen.
    `secretId` vil være navnet på hemmeligheten i KeyVault evt. i lokal mock.

    ```cs
    await _secretsService_.GetSecretAsync("secretId");
    ```

4. Dersom du prøver å bygge løsningen nå vil det feile.

    ISecrets vil mangle der InstantiationHandler instansieres. Naviger til `App.cs`
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
        ISecrets secretsService
        ) : base(appResourcesService, logger, dataService, processService, pdfService, prefillService)
    {
        _logger = logger;
        _validationHandler = new ValidationHandler();
        _calculationHandler = new CalculationHandler();
        _instantiationHandler = new InstantiationHandler(profileService, registerService, secretsService);
    }
    ```

## Administrere din hemmeligheter i Azure

Enn så lenge er det ikke mulig for tjenesteeiere å selv administrere sine hemmeligheter.
Ta kontakt med din kontaktperson i Altinn 3 teamet, så vil de være behjelpelige.