---
title: Webservice mottak 
description: Sette opp mottak over webservice.
weight: 800
---

## Online overføring til Tjenesteeier over webservice

Det er mulig for tjenesteeiere å motta online forsendelser av innsendingstjenester med vedlegg over web service.
Mottaket skal ha en metode som heter ReceiveOnlineBatchExternalAttachment.
Denne kalles som en "SOAP Document" metode, og kan benyttes til å motta innsendingstjenester hvor vedleggene er  pakket i en ekstern ZIP fil, ergo navnet.

Denne tjenesten kan settes opp for MTOM for å støtte mer effektiv overføring av store binære vedlegg.
Ved bruk av MTOM som dataoverføringsmetode kan det oppnås opptil 20-30% besparelse av båndbredde sammenliknet med vanlig dataoverføring mot web tjenesten.

Merk: Det er fullt mulig å sende uten vedlegg eksternt i ZIP fil over dette grensesnittet.
Vedlegg vil da komme base64encoded i XML i batch parameteren, og det er ikke lenger mulig å sette opp tjenesten for bruk av MTOM.

### ReceiveOnlineBatchExternalAttachment

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**          | **Beskrivelse**                                                                 |
| ------------------ | ------------------------------------------------------------------------------- |
| Username           | Brukernavnet som Altinn skal oppgi                                              |
| passwd             | Passordet som Altinn skal oppgi                                                 |
| receiversReference |                                                                                 |
| sequenceNumber     | Sekvensnummer på forsendelsen                                                   |
| batch              | Selve forsendelsen, iht.  nyeste versjon av XSD for genericbatch                |
| attachments        | ZIP-fil med evt. binære vedleggsfiler                                           |
| **Returverdi**     | **Beskrivelse**                                                                 |
| [returverdi]       | Status tilbake til Altinn for mottak av forsendelse iht. OnlineBatchReceipt.xsd |

Dersom det ikke finnes vedlegg til batchen vil parameteren “attachments" bli satt til en byte array med lengde 0.

Tabellen under beskriver elementer og attributter relevante for kvittering som skal returneres av tjenesteeier:

| **Element**               | **Beskrivelse**                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OnlineBatchReceipt        | Rotnode. Denne XSDen beskriver kvitteringen som skal returneres fra et mottakssystem etter å ha mottatt en online forsendelse fra Altinn. Kvitteringen begrenser seg til å kun beskrive selve mottaket av batchen, og det er ikke lagt opp til at kvitteringen skal inneholde informasjon vedrørende prosessering av selve batchen |
| OnlineBatchReceipt.Result | Dette elementet har ett attributt resultCode som beskriver status på mottatt batch. Innholdet i Result-elementet er en valgfri streng. Denne blir ikke brukt programmatisk, men vil bli lest av driftspersonell i tilfelle feil                                                                                                    |
| resultCode                | De forskjellige resultatkodene som kan returneres fra mottaket, se under for en detaljert forklaring.                                                                                                                                                                                                                              |

* OK - Batch er mottatt OK
* FAILED - Batch er ikke mottatt, eller det oppstod en midlertidig  feil i mottaket, - Altinn kan forsøke forsendelse på nytt et begrenset antall før det logges som feilet.
* FAILED_DO_NOT_RETRY - Samme som FAILED, men Altinn skal ikke forsøke å sende batch på ny. - Benyttes typisk hvis det er en datafeil i innsendt skjema som kun lar seg løse dersom innsender sender skjema på nytt.
* Hvis webservicen returnerer SOAP-faults vil Altinn tolke dette som at tjenesten er midlertidig nede, og vil gå over til kømodus, der alle elementer legges i en kø og Altinn tester å sende første element i køen på nytt periodisk inntil det går OK.

Ved store volum av feilkoder, eller lange køperioder, vil Altinns teknikere varsle tjenesteeier.

### Navnerom

For at Altinn sin webserviceklient skal kunne kommunisere med mottaket, er det viktig at følgende er satt korrekt (definisjonene vil finnes igjen i WSDL-filen).
Denne informasjonen skal ligge i WSDL-filen man blir presentert for når man åpner definisjonen for mottakets web service.

| **Definisjon**                                                           | **Verdi**                                                         | **Beskrivelse**                                            |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| /wsdl:definitions/@xmlns:tns                                             | http://AltInn.no/webservices/                                     | Navneromsdefinisjon                                        |
| /wsdl:definitions/@targetNamespace                                       | http://AltInn.no/webservices/                                     | Navneromsdefinisjon                                        |
| /wsdl:definitions/wsdl:types/s:schema/@targetNamespace                   | http://AltInn.no/webservices/                                     | Navneromsdefinisjon                                        |
| /wsdl:definitions/wsdl:binding/wsdl:operation/soap:operation/@soapAction | http://AltInn.no/webservices/ReceiveOnlineBatchExternalAttachment | Identifikator for SOAP-metode                              |
| /wsdl:definitions/wsdl:service/wsdl:port/soap:address/@location          | Mottaksavhengig                                                   | Dette er URLen til mottaket som Altinn skal benytte seg av |
