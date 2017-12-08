---
title: Installasjon
description: Beskrivelse av hvordan man lager installasjonspakker og får dem installert i test og produksjon
weight: 600
---

## Installasjon av mappere

For å lage et installasjonsprosjekt til mapperen lager vi et Visual Studio Installer prosjekt av typen Web Setup.
Vi kaller det SetupInternal.

{{<figure src="installation-project.png?width=700" alt="Installasjonsprosjekt i Visual Studio" >}}

SetupInternal prosjektet:

{{<figure src="setupinternal-project.png" alt="Setupinternal i Visual Studio" >}}

{{<figure src="customactions.png?width=700" alt="Custom actions i Visual Studio" >}} 

Filesystem settes opp slik at:

Temp katalogen legges `CustomActions.dll` og `env_variables.csv`

{{<figure src="setupinternal-temp.png?width=700" alt="Temp-katalogen" >}} 

 

I web Application Folder legges `Mapper.svc` og `web.config`,

{{<figure src="setupinternal-web-application.png?width=700" alt="Web application-katalogen" >}} 

I tillegg er det viktig at VirtualDirectory er satt rett i properties:

{{<figure src="setupinternal-virtual-directory.png" alt="Virtual directory-setting" >}} 

I bin legger Altinn.Mapper.Common.dll og Primary output from Services.

{{<figure src="setupinternal-bin.png?width=700" alt="Bin-katalogen" >}} 


I customActions editor må CustomActionData settes til:
```
/Targets=[TARGETDIR]\web.config /Environment=[ENVIRONMENT] /VariablesCSV=[TEMP]\env_variables.csv:
```

{{<figure src="customactions-editor.png" alt="Custom actions" >}} 

User interface editor

{{<figure src="user-interface-editor-vs.png" alt="User interface editor" >}} 
