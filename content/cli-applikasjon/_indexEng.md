---
title: ALtinn Cli
description: ALtinn CLIis is a command line application that can be used by service owneres to access ALtinn Api's. The application has as standard implemented functions for creating Altinn Applications and insatnces, functions for fetch and store application data. ALtinn CLI can be found on the GIT repo https://github.com/Altinn/altinn-cli. The application can be used as standrad or extended with custom function devloped by the service owners themselves. 

weight: 5
aliases:
- /guides/altinn-cli/
---

## Concepts

The consepts of the CLI application is releated to the different parts og a command line command. 

Example: Storage GetData appId=ttd/how-to-name-it processIsComplete=true

Command is "Storage"
SubCommand is "GetData"
Option is "appId=ttd/how-to-name-it" "processIsComplete=true"

### Command 

The name of the cammand shall give an indication of which system component that shall be accessed. 

### SubCommand

A sub command defines the operation to be performed on the Command component 

### Option

Options are often used as filter criterias that can be a part op the API call.

## Standard Commands

### Login

To use the CLI Application a successfull login is required. The Login operation requires a valid Service Owner Ceritificat. The command will use the ceritication to generate a jwt-token which is autenticated by **Maskinporten**. A successfull autentication gives a "converted" as response. The response token will then be used as a part of the header in all API calls. 

### Help

The Help command displays help information that is registered on commands, subcommands and options according command line options. 

Example : 
        **Help Storage** displays the available Storage subcommands.
        **Help Storage GetData** displays help information registred on the GetData subcommand which shall a command description and a list with description on all options that can be used. 

### Storage

The Storage command is used to fetch and upload instance data.  

#### Storage SubCommands

##### GetData

GetData fetches data elements from Storage. Data can be fetched for an Applikation with different filter criterias or data can be fetch for a spesific owner and instance. 

Examples:

**Storage GetData ownerId=<ownerId> instanceId=<instanceid>  dataId=<dataId>** fetches a speicifc data element

**Storage GetData appId=<applicationId> <Filter criterias ex. processIsComplete=true>** fetchs all data elements for an application whoose status processing is set to completed

##### GetInstance

##### UploadData

Upload uploads a data element to storage, for instance a receipt. 

Example:

**Storage UploadData ownerId=<ownerId> instanceId=<instanceId> elementType=<elementType> file=<filepath>**
The command options defines application owner and to which instance the data shall attached and the full path to the file that shall be uploaded.  

### Application

The Application command is used to create application and application instances. It is also possible to upload when creating an instance. Data is attached by specifying file option with path to a file.
. 

##### CreateInstance

## Software Implementasjon

The main goal for how the software is build is that adding new commands, subcommands and options shall be simple. This is solved by implementing a generic command interpreter that does not require changes when new commmands,subcommands and options are added. The generic implementation is based on software Interfaces. This requires that new software classes implements propriate interfaces so they can be found when matching command line values against commands, subcommands and options. The second important implementation detail is that the commands with definitions is defined in a json file, CommandDefs.json. The file is part of the project as an embedded resource but can be modified and saved at the location defined in the Application setting parameters **CommandDefinitionFile**. The CLI Application searches for the file at startup, the **CommandDefinitionFile** is search first.

### Application settings

Setting which is required for the CLI Application is defined in the appsettings.json file. Initial content of this file is:
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

Setting               | Description 
--------------------  |-----------------------------------------
Addresse              |Defines the base part of API' Url. The specific address to be used is selected by dedicated ClinetWrapper which forwards it to the HttpClientWrapper which computes a complete URL.
UseLiveClient         |Used to swithc between type of ClientWrappers accessing either the API or a wrapper used by unit tests or testing without accessing the actual API. 
StorageInputFolder    |Defines folder for storing fetched files
StorageOutputFolder   |Defines folder for where files to send shall be fetched
CommandDefinitionFile |Defines in which folder the command definition file CommandDefs.json is located.

### Kommando Definisjon

The command definition file, CommandDefs.json defines all commands with subcommands and options which can be "executed" i the CLI application. The file is initially a resource is the development project. New commands can be added following this format:

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

First element *Name*: defines the command name, next *Name* defines the subcommand name. No other parameters can be defined on this level. Options is an array with following elements:

Element name        | Description 
--------------------|-----------------------------------------
*Name*              |name of the option, the same must be used on the command line, not case sensitive
*type*              |option datatype. See list below for valid types, type is case sensitive
*valuerange*        |valid range 
*description*       |description of the parameter to be used in Help
*apiname*           |name of the option in the API that is accessed, name is case sensitive

#### Valid Data typers

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

### Class Overview

[![Class Diagram](images/ClassDiagram.png "Implmented classes in base project")](images/ClassDiagram.png)

#### Program

**Program** is the startup "class" in the CLI Application. It’s main purpose it to implement CLI functionality and register classes that handles commands and subcommands. Register means in this context to scan the application for classes that implements interfaces that shall be searchable in the generic code.

*ICommand* Must be implemented by all command classes
*ISubCommandHandler* Must be implemented by all subcommand classes
*IHelp* Implemented on all classes that have info to be display by the help command

The actual CLI implementation consist in reading the keyboard and forward it to the ApplicationManager

#### Logging

Logger is injected to the registered command and is configured as a part of the service registration. Logging is default configured to output on console and file for all log levels.

```c#
    Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .WriteTo.File("log.txt", LogEventLevel.Information)
        .WriteTo.Console(restrictedToMinimumLevel: LogEventLevel.Information)
        .CreateLogger();
```

#### ApplicationManager

The ApplicationManager instantiates command and eventually subcommand from the two first console input parameters. The parameters are used as search criteria’s for finding relevant command/subcommand classes. If a match is found command line input option parameters will be matched and validated against selectable options. Not found or illegal value will terminate the command and a proper log message will be displayed in the consol.

#### Command

A command class must implement the ICommand interface to be registered in **Program**. That makes the command available for the generic code which is selecting a command based on the command line input. The selection is based on the implementation of the ICommand interface and the Name property which must match the command name on the command line. The command itself is executed by calling any of the the command class Run methods. There exist two Run commands, one with the SubCommand as parameter and one with a list of command line input parameters that is called if no subcommand is specified.

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

An Option binds the definitions specified at the command line to a definition defined in the CommandDefinition file. The handling of the option is as described in the ApplicationManager description partly done by generic code. Partly means here creation of correct option type based on the option's type definition property and the activation of validation. The actual validation is implemented in the option class itself. An Option base class is implemented with basic functionality like the TryParse method that is used as a part of the validation of the NumberOption type.
 
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

A set of Option classes is implemented to cover the most used system types. Mapping from the type set in the definition file to a C# class is shown in the table in the subchapter **Valid Data Types**. The main reasons for implementing dedicated classes is the possibility to implement generic handling of them together with the advantage of implementing separate code in them like validation.

NumberOption - represent all simple System Data Types
FileOption - represent a file, the value of the option shall contain full path to the file. The validation verifies that the file exists.
ThumbPrintOption - This option is used as to represent the *thumbprint" value in the ceritificat that is used in Login.

#### OptionBuilder

Much of the handling of Options is done by the Singleton class OptionBuilder. Main reason for making it as a Singleton is to avoid reading the CommandDefs file for each command. The file is read initially and save in the class member **CfgCommands**.

There are two public methods in the OptionBuilder, **BuildAvailableOptions** and**AssignValueToCliOptions**.

##### BuildAvailableOptions

**BuildAvailableOptions** finds command/subcommand in the list of available commands defined in the CommandDefs.json and according to defined type instantiates classes with options of correct type. 

##### AssignValueToCliOptions

**AssignValueToCliOptions** is responsible for validation and assignment of input options. Not valid options/option values are logged, and command is terminated.

###### Validation

*NumberOption*

Validation is done by the generic method TryParse which is call in the Validate method.    

*FileOption*

 The FileOption class overrides the Base class defined Validate method. The actual validation consist in a check for the existence of the specified file. 

*ThumbPrintOption*
 
 The ThumbPrintOption class overrides the Base class defined Validate method. The actual validation consist is a check for the existence of a certificate in the "LocalStore" with same thumbprint as the specified thumbprint. 

#### ClientWrapper

The construction of the URL is done in dedicated ClientWrapper classes. A dedicated wrapper shall be made for each command. An Interface that defines all public methods in the wrapper shall be made. The interface shall be implemented in a test wrapper that shall be used in unit testing. 

##### Test Wrapper

The test wrapper shall be coded and configures to make verification of command execution possible without connecting to the actual API. The class will mainly be used in unit testing but can also be used to test with real data. That is best done by catching "responses", saving the respons and use it in the test that can load the response file(s).

#### HttpClientWrapper

The HttpClientWrapper make the HHP(s) requests. The wrapper builds the URL based on input parameter. In addition header with required parameters and tokens is build and attached to the requests that is required for authorization on the server side. 

### Extensions

#### Command

Adding a new command requires following addtions:

- Command definition on the CommandDefs.json, must include subcommand and options. Command name must be unique.
- Folder in the development project named with the command name.
- C# class with name on the command. The class must implement ICommand and IHelp interface
- Interface which define the methods in the ClientWrapper that will be used by the SubCommandHandler.
- C# ClientWrapper and a ClientFileWrapper class which implements the ClientWrapper interface.
- Folder SubCommandHandlers as a subfolder to the new Command folder. 
- C# class for the subcommand which inherits SubCommandHandlerBase and implements ISubCommandHandler and IHelp interface.

#### SubKommando

- Extend command definition with new subcommand definition in CommandDefs.json, include Option definitions
- Eventually extend ClientWrapper interface with new method(s) which will be used by the new SubCommandHandler
- Eventually extend C# ClientWrapper and ClientFileWrapper with new methods defined in the interface 
- C# class for the new subcommand which inherits SubCommandHandlerBase and implements ISubCommandHandler and IHelp interface.

#### Option

- Extend subcommand with new option definition in CommandDefs.json
- Eventuelt ClientWrapper Interface with new method(s) which will be used by the SubCommandoHandle for å få med nye opsjoner
- Eventually extend ClientWrapper interface with new methode(s) which will be used by the new SubCommandHandler
- Eventually extend C# ClientWrapper and ClientFileWrapper with new methods defined in the interface 
- Add handling of the new options, if required, to the SubCommandHandler

**None of the extensions shall require changes in the HttpClientWrapp's. New methods shall be added if changes is required to avoid breaking existing code**






