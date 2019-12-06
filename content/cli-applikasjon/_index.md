---
title: ALtinn Cli
description: Altinn Cli er en kommando linje applikasjon som kan brukes av tjenesteeiere. Applikasjonen har som standard implementert funksjoner for å kunne lage Applikasjons instanser og funksjoner for å hente og lagre data knyttet til en applikasjon. Den ligger på et eget åpnet repo, https://github.com/Altinn/altinn-cli. Den kan hentes ned og brukes slik den eller utvides med skreddersydde funksjoner utviklet av tjenesteeiere selv.
weight: 5
aliases:
- /guides/altinn-cli/
---

## Begreper

I CLI applikasjonen er begreper knyttet opp mot deler av bruker kommando.

eks: Storage GetData appId=ttd/how-to-name-it processIsComplete=true

Kommando er "Storage"
Subkommando er "GetData"
Opsjoner er "appId=ttd/how-to-name-it" "processIsComplete=true"

### Kommando 

En kommando definerer hvilke API man ønsker å gå imot.  

### Subkommando

En subkommando definerer hva man ønsker å gjøre i API'et

### Opsjon

Opsjoner er som oftest filtre som er tilgjengelig i API'et. 

## Standard kommandoer

### Login

For å kunne gå mot Altinns Storage Api'er må en ha et gyldig sertifikat. Med gyldig sertifikat menes her......... Login kommandoen lager ut i fra sertifikatet en jwt-toke som verifiseres av Maskinporten. Responsen fra Maskinporten som er en autentisert token brukes så i alle API kall mot Altinn Sorage og ALtinn Runtime. Tokenet er gyldig til cli applikasjonen lukkes.   

### Help

Help implementeres på alle kommandoer og subkommandoer

### Storage

Storeage kommandoen brukes for å hent og lagre data knyttet til applikasjons instanser i Storage lagret. 

#### Storage Subkommandoer

##### GetData

##### GetInstance

##### UploadData

### Application

Application kommandoen brukes for å lage applikasjoner og instanser. Det kan knyttes data til en opprettelse av en instans ved å spesifisere disk folder med instans og datafiler. 

##### CreateInstance

## Software Implementasjon

Hovedformålet med Software strukturen er at det skal være enkelt å legge til nye kommandoer med underliggende subkommandoer. Dette er løst ved at det er definert interfacer som må implementeres av nye klasser. Generisk kode plukker da opp og bruker ny kode.  "Plukker opp" vil i denne sammenhengen si at den generisk kode finner hvilke klasser som er laget for å behandle en spesifikk kommando/subkommando på bakgrunn av kommandoens definisjon. Kommander defineres i en egen definisjons file CommandDefs.json som enten ligger lagret på disk eller er den del av applikasjonen. 

### Applikasjons settinger

Settinger som er nødvendig for CLI Applikasjoner er definert i fila appsettings.json Initiellt innhold av den er :
```json
{
  "APIBaseAddress": "https://platform.at21.altinn.cloud/storage/api/v1",
  "AppAPIBaseAddress": "https://{org}.apps.at21.altinn.cloud",
  "UseLiveClient": "True",
  "StorageOutputFolder": "c:/storage/Output",
  "StorageInputFolder": "c:/storage/Input",
  "CommandDefinitionFile": "C:/storage/CommandDefs/Commands.json",
  "MaskinportenBaseAddress": "https://oidc-ver2.difi.no/idporten-oidc-provider",
  "AuthBaseAddress": "https://platform.at21.altinn.cloud/authentication/api/v1",
  "tokenSettings": {

  }
```

Setting               | Beskrivelse 
--------------------  |-----------------------------------------
Addresse              |Definerer base del av url'n til API'ene. De forskjellig adressene hentes av ClinetWrapperne og sendes ned til HttpClientWrapper som lager en komplett Url.
UseLiveClient         |Brukes til å switche mellom ClientWrapper som går mot API eller mot en klient som skal brukes for lokal testing. 
StorageInputFolder    |Definerer i hvilke folder som skal brukes for å lagre hentede filer
StorageOutputFolder   |Definerer i hvilke folder som inneholder filer som skal sendes
CommandDefinitionFile |Definerer i hvilke folder kommando definisjons fila CommandDefs.json ligger

### Kommando Definisjon


Kommando definisjonsfila, CommandDefs.json definerer alle kommandoer med subkommandoer og opsjoner som kan "kjøres" i CLI applikasjonen. Fila ligger i utgangspunktet som er ressurs i utviklingsprosjektet. Det kan legges til nye kommandoer på følgende format :

```json
   {
      "Name": "Login",
      "SubCommands": [
        {
          "Name": "Maskinporten",
          "Options": [
            {
              "Name": "clientId",
              "type": "Guid",
              "valuerange": "",
              "description": "client guid id",
              "apiname": "clientid"
            },
          ]
        }
      ]
    }
```

Første element Name: definer kommandoens navn, neste Name definer navnet på subkommando. Ingen andre parametere kan defineres på disse nivåene. Options er et array av opsjoner som har følgende elementer:

Element navn        | Beskrivelse 
--------------------|-----------------------------------------
*Name*              |navnet på opsjonen, det samme som må brukes på kommandolinjenn, ikke case sensitivt. 
*type*              |datatype på opsjon. Se liste under med gyldig type, case sensitiv 
*valuerange*        |gyldig range på opsjons verdien 
*description*       |beskrivelse av opsjone, denne vil vises i help
*apiname*           |navn på opsjonen i API'et som kalles. Dette er case sensitivt

#### Gyldige Data typer

Option Type           | System Type            | Opsjons klasse
----------------------|------------------------|------------------
bool                  |System.Boolean          |NumberOption
byte                  |System.Byte             |NumberOption
sbyte                 |System.Decimal          |NumberOption
double                |System.Double           |NumberOption
float                 |System.Single           |NumberOption
int                   |System.Int32            |NumberOption
uint                  |System.UInt32           |NumberOption
long                  |System.Int64            |NumberOption
ulong                 |System.UInt64           |NumberOption
object                |System.Object           |NumberOption
short                 |System.Int16            |NumberOption
ushort                |System.UInt16           |NumberOption
string                |System.String           |NumberOption
datetime              |System.DateTime         |NumberOption
guid                  |System.Guid             |NumberOption
file                  |System.IO.FileStream    |FileOption
thumbprint            |System.String           |ThumbPrintOption

### Klasse oversikt

[![Class Diagram](images/ClassDiagram.png "Implmented classes in base project")](images/ClassDiagram.png)

#### Program

Program er oppstarts klassen i Applikasjonen. Dens hovedoppgave er å implementere CLI funksjonalitet og registrere klasser som håndterer kommandoer og subkommandoer. Med registrere menes her at den "skanner" applikasjonen for klasser som implementerer spesifikke interfacer. Ved registrering/instansiering injectes det en logger som skal brukes for å gi respons i kommandovinduet og/eller på file.  Følgende interface er styrende for registrering og da igjen for bruk i applikasjonen knyttet til kjøring av kommandoer. 

*ICommand* Må implementeres av alle kommandoer
*ISubCommandHandler* Må implementeres av alle subkommandoer. 
*IHelp* Implementeres på alle klasser man ønsker skal gi hjelp info

CLI implementasjonen består i å få input fra tastatur som videresendes til ApplicationManager. 

#### Loggin

Logger som injectes konfigureres in Program. Den er default satt opp til å logge til konsol og til file for alle log levels.

```c#
    Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .WriteTo.File("log.txt", LogEventLevel.Information)
        .WriteTo.Console(restrictedToMinimumLevel: LogEventLevel.Information)
        .CreateLogger();
```

#### ApplicationManager

ApplicationManager instansierer opp kommando og subkommando ut i fra de to første konsol input parameterne. Parameterne brukes som "søkekriterie" for å finne ønsket kommando i registrert kommando/subkommand typer. Ved match vil resten av input parameterne matches og valideres mot tilgjengelig kommand/subkommando parametere. Feil ved validering vil logges og kommando vil temineres, ellers vil kommando eksekveres. 

#### Command

En kommando må implementer ICommand interfacet slik at den blir registrert i **Program** og dermed blir gjort tilgjengelig for den generiske koden som knytter en kommando spesifiser i kommando linjen til en klasses i kode som skal håndtere kommandoen. Selve kommandoen eksekveres ved å kalle en av de to Run metodene. Den ene med en SubCommand parameter kalles hvis det på kommandolinjen er lagt inn en subkommand, hvis ikke vil Run metode med alle input opsjons parameterne som input kalles. 

```c#
 public interface ICommand
    {
            /// <summary>
            /// Run the supported command handler
            /// </summary>
            /// <param name="commandHandler">the command handler to execute</param>
            void Run(ISubCommandHandler commandHandler = null);

            /// <summary>
            /// Parses the dictionary and run command. Used mainly by Help
            /// </summary>
            /// <param name="input">Dictionary with the cli input paramters</param>
            void Run(Dictionary<string, string> input);

            /// <summary>
            /// Gets the name of the service
            /// </summary>
            string Name { get; }
    }
```

#### SubCommand

```c#
    public interface ISubCommandHandler : IValidate
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        bool Run(); 

        /// <summary>
        /// Name of the command handler
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Name of the command for which the command is implemented
        /// </summary>
        string CommandProvider { get; }

        /// <summary>
        /// Dictionary with cli input options
        /// </summary>
        Dictionary<string,string> DictOptions { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<IOption> SelectableCliOptions { get; set; }

        /// <summary>
        /// Dictionary with cli input options
        /// </summary>
        List<IOption> CliOptions { get; set; }

        /// <summary>
        /// Dictionary with cli input options
        /// </summary>
        IFileWrapper CliFileWrapper { get; set; }

        /// <summary>
        /// Builds the options that can control the command.
        /// </summary>
        void BuildSelectableCommands();
    
```


#### Option 

En Opsjon knytter definisjonen fra en opsjon definert i en kommando definisjon mot input fra kommando linjen. Behandling av de forskjellig opsjoner gjøres av klasser som "styres" av hvilke data type opsjonens verdi har. Det er definert et interface **IOption** som alle klasser som skal representere opsjoner må implementere. Det er i også definert en Option base klasse som inneholder basis funksjonalitet som kan overrides.

```c#
    /// <summary>
    /// Interface that defines the propertioes and methods that
    /// shall be implemented by an Option class
    /// </summary>
    public interface IOption : IValidate
    {
        /// <summary>
        /// The Name og the oprtion that must match the Name 
        /// of the otion in the CommandDefinition file
        /// </summary>
        public string Name { get; set;  }

        /// <summary>
        /// The name of the opsjon in ther API. 
        /// </summary>
        public string ApiName { get; set; }

        /// <summary>
        /// The value of the option as a string
        /// </summary>
        string Value { get; set; }

        /// <summary>
        ///  Defines if the option is defined with a vlue in
        ///  the command line 
        /// </summary>
        bool IsAssigned { get; set; }

        /// <summary>
        /// The description of the option that will be used by help
        /// </summary>
        string Description { get; set; }

        /// <summary>
        /// Valid range for the paramtere. 
        /// </summary>
        string Range { get; set; }

        /// <summary>
        /// Gets the typed value of the option as defined 
        /// in the option definition
        /// </summary>
        /// <returns></returns>
        object GetValue();

    }
```

Det er definert et sett med opsjons klasser for å representere de mest brukte system data typer. Mapping til klasser er vist i tabellen i kapittelet **Gyldige Data typer**. Hovedgrunnen til å lage en spesifikk opsjonsklasse er for å kunne implementere en spesifikk valideringen.

NumberOption - representerer alle standard System datatyper
FileOption - representerer en file, dvs. at opsjonens verdi skal inneholde en full sti til en eksisterende file.
ThumbPrintOption - Denne opsjonen brukes i forbindelse med login. Den skal inneholde verdien på *thumbprint" for sertifikat som skal brukes. 

#### OptionBuilder

Mye av Option håndtering gjøres i OptionBuilder som er en Singelton klasse. Hovedgrunnen til at det er en Singelton er for å kun les inn options defintions fila initielt ikke for hver kommando. 

Det er to public metoder i OptionBuilder, **BuildAvailableOptions** som ut i fra en kommandos definisjon i opsjonsfila lager en Collection av lovlige parametere for kommando som skal eksekveres, og metoden **AssignValueToCliOptions** som validere og tilordener en verdi til en opsjon. 

##### Instansiering

**BuildAvailableOptions** finner kommand/subkommando i liste av kommandoer definert i CommandDefs.json og instansiere opp opsjoner av riktig type. Riktig type er definert av **type** variabelen i opsjonsdefinisjonen. List av valgbare opsjoner legges på subkommandoen. 

##### Validering

Valideringen av en opsjon skjer som et steg i **AssignValueToCliOptions** når verdien skal tilordnes opsjonen i lista over tilgjengelig på subkommandoen. 

*NumberOption*

Selve validering gjøres generisk i TryParse metoden som kalles av Validate metode.    

*FileOption*

 Validate metode definert i Option som er en baseklasse overrides. Selve validering gjøres i Validate metoden som sjekker at fila som er spesifisert eksisterer.

*ThumbPrintOption*
 
 Validate metode definert i Option som er en baseklasse overrides. Selve validering gjøres i Validate metoden som sjekker om det finnes et sertifikat i "LocalStore" med oppgitt ThumbPrint 

#### ClientWrapper

Oppbygging av API kall gjøres i egne ClientWrapper klasser. Det skal lages en wrapper for hver kommando. Hovedformålet med wrapperen er å bygge opp API kallen. Det skal/kan defineres et interface for hver wrapper som også skal implementeres i en wrapper pluss en klasse som skal brukes i test.

##### Test Wrapper

Test wrapperen skal kodes og konfigureres slik at det er mulig å lage tester som verifiserer eksekvering av en kommando. Det er i stor grad responser fra API som simuleres. Det er ingen fasit på hvordan responser simuleres, det viktige er at det er enkelt og fleksibelt slik at det det er enkelt å lage tester som dekker "ALLE" kombinasjoner. 

#### HttpClientWrapper

HttpClientWrapper gjør selve HTTP(s) kallene. De vil bygge en URL basert på input parameteren. I tillegg vil den bygge opp http header med paramtere og tokens som er nødvendig for autorisering.  

### Utvidelser

#### Kommando 
For å utvide CLI med en ny kommando må det legges til: 

- Kommando definisjon i CommandDefs.json, skal da inkludere Subkommando og Opsjons definisjoner
- Folder i utviklingsprosjektet med navnet på kommandoen.
- C# klasse for kommando som implementerer  ICommand og IHelp interface
- Interface som definerer metoder i ClinetWrapper som skal brukes av SubCommandoHandle
- C# ClientWrapper og en ClientFileWrapper klasser som implementerer det definerte ClinetWrapper interfacet
- Folder SubCommandHandlers under kommando folderen hvor SunCommandHandlerene skal legges 
- C# klasse for subkommando som arver SubCommandHandlerBase og implmenterer ISubCommandHandler og IHelp interfacene

#### SubKommando

- Utvide kommando definisjonen med ny subkommando definisjon i CommandDefs.json, inkludert Opsjons definisjoner
- Eventuelt utvide ClientWrapper interface med ny(e) metoder som skal brukes av SubCommandoHandle
- Eventuelt utvide C# ClientWrapper og en ClientFileWrapper med nye metoder definert i interfacet 
- C# klasse for ny subkommando som arver SubCommandHandlerBase og implmenterer ISubCommandHandler og IHelp interfacene

#### Option

- Utvide subkommando med ny opsjons definisjon definisjon i CommandDefs.json
- Eventuelt utvide ClientWrapper interface med ny(e) metoder som skal brukes av SubCommandoHandle for å få med nye opsjoner
- Eventuelt utvide C# ClientWrapper og en ClientFileWrapper med nye metoder definert i interfacet 
- Eventuelt utvide C# klasse for subkommando med kode for å håndtere ny opsjon


**Ingen av utvidelsene bør påvirkt HttpClientWrapp's eksisterende metoder. Kreves det endringer bør det legges inn i en ny metode.**





