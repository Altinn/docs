---
title: Installasjon
description: Beskrivelse av hvordan man lager installasjonspakker og får dem installert i test/produksjon
weight: 600
---


## Installasjon av mappere

For å lage et installasjonsprosjekt til mapperen lager vi et Visual Studio Installer prosjekt av typen Web Setup. Vi kaller det SetupInternal.

{{< figure src="/docs/images/guides/mapperutvikling/installation-project.png" alt="Installasjonsprosjekt i Visual Studio" >}}

SetupInternal prosjektet:

{{< figure src="/docs/images/guides/mapperutvikling/setupinternal-project.png" alt="Setupinternal i Visual Studio" >}}


{{< figure src="/docs/images/guides/mapperutvikling/customactions.png" alt="Custom actions i Visual Studio" >}} 

Filesystem settes opp slik at:

Temp katalogen legges CustomActions.dll og env\_variables.csv

{{< figure src="/docs/images/guides/mapperutvikling/setupinternal-temp.png" alt="Temp-katalogen" >}} 

 

I web Application Folder legges Mapper.svc og web.config,

 {{< figure src="/docs/images/guides/mapperutvikling/setupinternal-web-application.png" alt="Web application-katalogen" >}} 

I tillegg er det viktig at VirtualDirectory er satt rett i properties:
{{< figure src="/docs/images/guides/mapperutvikling/setupinternal-virtual-directory.png" alt="Virtual directory-setting" >}} 

 
I bin legger Altinn.Mapper.Common.dll og Primary output from Services.

{{< figure src="/docs/images/guides/mapperutvikling/setupinternal-bin.png" alt="Bin-katalogen" >}} 


I customActions editor må CustomActionData settes til : /Targets=[TARGETDIR]\web.config /Environment=[ENVIRONMENT] /VariablesCSV=[TEMP]\env\_variables.csv:

{{< figure src="/docs/images/guides/mapperutvikling/customactions-editor.png" alt="Custom actions" >}} 

User interface editor

{{< figure src="/docs/images/guides/mapperutvikling/user-interface-editor-vs.png" alt="User interface editor" >}} 

