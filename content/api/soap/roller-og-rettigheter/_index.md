---
title: Roller og rettigheter
description: Beskrivelse av hvem sluttbrukersystemet kan rapportere for.
weight: 950
aliases:
- /guides/integrasjon/sluttbrukere/webservice/roller-og-rettigheter/
---

Sluttbrukersystemet baserer seg på en ”reportee” og en systemUser.  Sluttbrukersystemet kan rapportere for en participant A (bruker eller organisasjon) eller en participant B, som participant A har rettighet til å rapportere for.

Når en sluttbrukersystemtype er lagt inn i Altinn, står innrapportører fritt til å disponere sitt eget oppsett av systemer som skal rapportere inn til Altinn. En sluttbrukersystembruker bestemmer selv om han ønsker å opprette kun ett system (enterprisesystemid) som skal rapportere for flere avgivere, eller om han ønsker å opprette flere systemer som skal rapportere for hver enkelt avgiver. Poenget er at systemet må ha rettighet til å rapportere for avgiveren. Det er en forskjell hvordan rettighetene blir håndtert på ny og gammel plattform. På gammel plattform (tjenester som slutter på .asmx) baserer autorisasjonssjekk seg på en enkeltrolle som heter ”systeminnsendingsrettighet gamle tjenester”. Når en avgiver gir denne rollen til eier av systemet vil systemet kunne rapportere for denne avgiveren.

**Eksempel 1:**
System med enterprisesystemid=1 er registrert på regnskapsbyrå A. Klient B delegerer systeminnsendingsrettighet til regnskapsbyrå A. Klient C delegerer også systeminnsendingsrettighet til regnskapsbyrå A. System med enterprisesystem=1 kan rapportere for både B og C.

**Eksempel 2:**
Klient B oppretter et eget system med enterprisesystemid=2 i stedet for å delegere systeminnsendingsrettighet til regnskapsbyrå A. Klient C delegerer systeminnsendingsrettighet til regnskapsbyrå A. I dette tilfellet vil enterprisesystem=2 kunne rapportere for B, mens centerprisesystem=1 vil kunne rapportere for C.

**Eksempel 3:**
Klient B oppretter et eget system med enterprisesystemid=2, og klient C oppretter et eget system med enterprisesystemid=3. I dette tilfellet kan enterprisesystemid=2 rapportere for B, mens enterprisesystemid=3 kan
rapportere for C. Enteprisesystemid=1 kan ikke rapportere for verken B eller C.

For tjenester på ny plattform settes det strengere krav til hvilken rettighet systemet har. Her må det delegeres den rollen/rettigheten for den aktuelle tjenesten hvor det skal utføres innsending/uthenting eller modifisering av data.

**Eksempel 4**
Klient B ønsker at regnskapsbyrå A skal fylle ut RF-1070 som er en tjeneste på ny plattform. Tjenesten krever rollen utfyller/innsender. Klient B må da delegere rollen utfyller/innsender til regnskapsbyrå A for at enterprisesystemID=1 skal kunne rapportere for Klient B på denne tjenesten.

Hvordan delegere systeminnsendingsrett
--------------------------------------

Det er mulig å delegere sluttbrukersysteminnsendingsrett til en revisororganisasjon. Et sluttbrukersystem som er registrert på denne organisasjonen vil dermed kunne sende inn for avgiveren som delegerte rettigheten.

Du kan kun delegere de rettighetene du har selv. For å kunne delegere må du ha en

administrasjonsrettighet i Altinn. Velg Deleger roller enkeltvis i Administrasjonsmenyen, og registrer fødselsnummer og navn til den personen du vil at skal utføre rapportering på vegne av deg. Deretter krysser du av de rettighetene denne personen skal få
