---
title: Installasjon
description: Beskrivelse av hvordan man lager installasjonspakker og får dem installert i test og produksjon.
weight: 600
---

## Installasjon av mappere

For å lage et installasjonsprosjekt til mapperen lager vi et Visual Studio Installer prosjekt av typen Web Setup.
Vi kaller det SetupInternal.

![Installasjonsprosjekt i Visual Studio](installation-project.png "Installasjonsprosjekt i Visual Studio")

SetupInternal prosjektet:

![Setupinternal i Visual Studio](setupinternal-project.png "Setupinternal i Visual Studio")

![Custom actions i Visual Studio](customactions.png "Custom actions i Visual Studio") 

Filesystem settes opp slik at:

Temp katalogen legges `CustomActions.dll` og `env_variables.csv`

![Temp-katalogen](setupinternal-temp.png "Temp-katalogen") 

 

I web Application Folder legges `Mapper.svc` og `web.config`,

![Web application-katalogen](setupinternal-web-application.png "Web application-katalogen") 

I tillegg er det viktig at VirtualDirectory er satt rett i properties:

![Virtual directory-setting](setupinternal-virtual-directory.png "Virtual directory-setting") 

I bin legger Altinn.Mapper.Common.dll og Primary output from Services.

![Bin-katalogen](setupinternal-bin.png "Bin-katalogen") 


I customActions editor må CustomActionData settes til:
```
/Targets=[TARGETDIR]\web.config /Environment=[ENVIRONMENT] /VariablesCSV=[TEMP]\env_variables.csv:
```

![Custom actions](customactions-editor.png "Custom actions") 

User interface editor

![User interface editor](user-interface-editor-vs.png "User interface editor") 
