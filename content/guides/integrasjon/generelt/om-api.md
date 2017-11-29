---
title: Om API
description: Generelt om Altinns REST-apier
weight: 2
---

Altinn tilbyr to seperate REST-apier - ett for [sluttbrukere](../../sluttbrukere/) som alle kan registrere seg for å bruke,
og ett som utelukkende kan brukes av [tjenesteeiere](../../tjenesteeiere/) i Altinn.

{{< figure src="/docs/images/guides/api/api-konsept.jpg" title="API konseptskisse" >}}

### Generell oppbygning av API-et

Altinn API benytter REST arkitekturstil, og baserer seg på en semantisk definisjon av innholdet.
Strukturen i responsen fra API-et kan endre seg, men betydningen av elementene er den samme.

Dette blir som når man navigerer seg inn på en vanlig nettside. Da kan en klient navigere seg inn i API-et ved å følge lenker med en definert betydning.
Det er ikke sikkert at URL-en man var på sist fortsatt eksisterer, men det vil være mulig å bla eller søke seg tilbake til det samme innholdet fra forsiden.

Fordelen med dette er at Altinn har mulighet til å bygge ut og omstrukturere innholdet i API-et uten at dette hindrer en klient fra å finne frem
til innholdet den brukte fra før.

API-et baserer seg på de mekanismene som allerede finnes i HTTP-standarden og meldingshoder som brukes av vanlige nettlesere og webservere i dag.
Altinn API støtter følgende formater

 - application/HAL+json
 - application/HAL+xml
 - application/xml
 - application/json

 

### Navigasjon og semantikk

Navigasjonen foregår ved at man navigerer til https://www.altinn.no/api/my/messages/ og navigerer seg via lenkene som finnes der.
Det er mulig å bla seg innover i hierarkiet av meldinger, eller gå rett til en enkelt melding.

API-et gir informasjonen som meldinger på formatene XML eller JSON.
Siden XML og JSON mangler semantiske elementer, bruker meldingene i tillegg standarden [HAL](https://en.wikipedia.org/wiki/Hypertext_Application_Language).
HAL-formatet angir en ressurs med innhold og lenker. I tillegg kan hver ressurs inneholde andre ressurser med sine lenker og innhold.
Lenkene angir en semantisk relasjon mellom ressursen man er på og ressursen det lenkes til.

Foreløpig er følgende relasjoner definert, og flere relasjoner kan komme etter hvert som API-et bygges ut.

| Lenke      | Ressurs                   | Beskrivelse                                                   |
| ---------- | ------------------------- | ------------------------------------------------------------- |
| self       | Message/Organization/Form | URI til representasjon av den enkelte ressursen.              |
| print      | Message                   | URI til utskriftsversjonen av et arkivert skjema eller et skjema under utfylling. Er kun gyldig for message elementer av typen `FormTask`. For `print` relasjoner er "mime-type" i de fleste tilfeller "application/pdf" men vil i noen tilfeller også være "application/text-html". |
| attachment | Message                   | URI og navn på vedlegg knyttet til message.                   |
| form       | Message                   | URI til skjema knyttet til meldingen av type FormTask.        |      
| portalview | Message                   | URI til portal-visning av det aktuelle Message-objektet.      |
| formdata   | Form                      | URI til skjemadata i XML-format.                              |
| messages   | Organization              | URI til liste over meldinger for den aktuelle organisasjonen. |
 

### OData

OData  kan brukes til filtrering, paging og sortering i lister av elementer av alle typer.
Listene er begrenset i kode til å maksimalt inneholde 50 elementer.
Det er mulig å utføre paging ved å sende med Odata parameteren `skip` (for eksempel `$skip=50`).

Det er også mulig å filtrere listene som returneres basert på hvilke informasjonselementer de inneholder.
For eksempel vil følgende parametere på message elementet `$filter=ServiceOwner eq 'Skatteetaten'` kun returnere meldinger fra Skatteetaten.

Se også [ytterligere informasjon om OData](http://www.asp.net/web-api/overview/odata-support-in-aspnet-web-api/).
