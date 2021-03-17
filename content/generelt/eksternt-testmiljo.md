---
title: Eksternt testmiljø
description: Beskrivelse av eksternt testmiljø
weight: 100
---

Første versjon av et testbart API for [ITU/UTT](../../apidokumentasjon/losoreregisteret/itu-utt) var klar for testing fra mai 2019.

I parallell med registerutviklingen, jobber prosjektet med å etablere et testmiljø for eksterne brukere med syntetiske testdata.
Testdata vil bestå av fiktive personer, virksomheter og registerdata.
Konsumenter som skal teste API-er mot den nye registerplattformen, må teste fra eget testmiljø basert på testdata fra Brønnøysundregistrene.

## Syntetiske testdata for ITU/UTT

Vi har en [Excel-fil med syntetiske testdata](../../apidokumentasjon/losoreregisteret/itu-utt/Testdata%20ITU-UTT%20pr%2004.10.2019-PPE.xlsx) for personer/virksomheter som det er registrert saker på. Alt er oppkonstruert, både personer, virksomheter og saker.
Merk at avvik mellom filen og respons fra tjenesten kan forekomme over tid, ettersom tjenesten oppdateres fortløpende.

{{% children description="false" %}}