---
title: Eksponere API
description: I applikasjonene kan man som utvikler legge til flere api enn det som er definert som standard api for applikasjoner utviklet i Altinn Studio.
toc: false
weight: 106
---


Applikasjonene som utvikles i Altinn Studio baserer seg i dag på [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core) for back-end.
Dette gir høy fleksibiltet til å endre og modifisere applikasjonene.


## Legge til API kontroller

For å kunne eksponere et nytt API i applikasjonen må det legges til en eller flere API kontrollere. 


Nedenfor vises et eksempel fra en API controller som er lagt til i en gitt app. 
Her settes det opp hvilken path API skal lytte på og logikken. 


```C#
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Altinn.App.Api.Controllers
{
    [ApiController]
    [Route("{org}/{app}/CustomApi")]
    public class CustomApiController : ControllerBase
    {
        [HttpGet("TimeInfo")]
        public async Task<ActionResult> Get()
        {
            return Ok(DateTime.Now);
        }
    }
}
```

![Test av API i nettleser](apiresponse1.png "API respons")

Koden kan ses i [dette repositoriet](https://dev.altinn.studio/repos/ttd/mva/src/branch/master/App/controllers/CustomApiController.cs). 

I dokumentasjonen til ASP.NET kan du lese flere detaljer om [mulighetene for å eksponere API](https://docs.microsoft.com/en-us/aspnet/core/web-api/).
