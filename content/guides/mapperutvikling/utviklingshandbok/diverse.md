---
title: Diverse
description: Bruk av mappere med Altinn-kontekst, REST/WCF
weight: 700
---


## Avanserte konsepter

### Context

I tjenestene i Altinn har man tilgang til en del informasjon om den konteksten tjenesten kjører i på portalserverene. Dette inkluderer hvilken bruker som har åpnet tjenesten, språkinnstillinger og lignende. I mange tilfeller er dette nyttig informasjon å overføre til bakenforliggende systemer slik at informasjon kan filtreres basert på pålogget bruker eller virksomhet. En måte å overføre denne informasjonen på er å hente den ut fra skjema og sende med felter som datakontrakten. Ulempen med denne fremgangsmåten er at mapperen ikke kan garantere at verdiene er korrekte da tjenesteutviklere selv kan manipulere disse verdiene. For å hente ut verifiserbare verdier må AltinnContext&#39;en benyttes. Dette er en base64-encoded tekststreng som kan verifiseres i mapperen slik at ulike context-verdier kan hentes ut sikkert. Et eksempel er vist i Figur 33.

For å benytte AltinnContexten i mapperen må forespørseldatakontrakten inneholde et tekstfelt for AltinnMapperContexten som vist i Figur 31 .

Figur 30: AltinnMapperContext i datakontrakt for forespørsel

Når forespørselen mottas må AltinnMapperContext lastes inn og verifiseres. Dette gjøres ved kall til klassen Verificator som legges i Utility.cs. Klassen er vist i Figur 31.

Figur 31: Verificator-klassen

Deretter kan mapperen aksessere innholdet på følgende måte. Det er kun et utvalg av verdiene som er hentet ut i eksempelet i Figur 32. Skal noen felter sjekkes som en del av verifikasjonen av tjenestekallet skal dette gjøres i Verificator-klassen som vist i Figur 33.

Figur 32: Uttrekk av informasjon fra AltinnMapperContext

Figur 33: Eksempel på AltinnMapperContext

## Sikkerhet

### Sertifikat

Kommunikasjonen mellom en mapper i Altinn og tjenesteeier må gå kryptert via SSL eller TSL (via https). Dette krever et gyldig sertifikat. Dersom ikke serveren har et sertifikat utstedt av en godkjent sertifikatutsteder vil WCF avbryte operasjonen på grunn av manglende verifikasjon av sertifikatet.

### To-veis sertifikat autentisering

For å sikre overføringen av informasjon mellom mapperen og etatsystemene kan to-veis-sertifikater benyttes. Dette skrus på ved å legge til en endpointbehavior i config-filen som skrur på clientsertifikater i mapperen. Dette er vist i eksempelet i Figur 34.

Figur 34: Endringer i config fil for å benytte to-veis sertifikater

Dersom to-veis sertifikater skal benyttes vil mapperen kun være testbar i TUL og ikke på lokalt utviklermiljø. Dette skyldes at Altinn sine sertifikater ikke vil bli distribuert til brukerene.

### Overstyre sertifikat under utvikling

 Dersom ikke serveren har et sertifikat utstedt av en godkjent sertifikatutsteder vil WCF avbryte operasjonen på grunn av manglende verifikasjon av sertifikatet. Dette kan unngås ved å legge inn en overstyring av denne funksjonaliteten. Det gjøres ved å legge inn en callback på ServerCertificateValidation-verifikasjonen på ServicePointManageren. Merk at man bør ha gyldige sertifikater også testservere også dette bare må gjøres unntaksvis og kun under utvikling. Overstyring av sertifikatsjekken må ikke være med i produksjonsklar kode.

Figur 35: Overstyre validering av sertifikater

For å unngå å måtte fjerne og legge til kode kan det være et parameter i config som skrur av eller på denne mekanismen avhengig av hvilket miljø koden kjører i.

