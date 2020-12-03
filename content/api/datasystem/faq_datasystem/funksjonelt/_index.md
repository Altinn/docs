---
title: Funksjonelt
description: Spørsmål og svar som gjelder det funksjonelle rundt implementasjon
weight: 200
toc: true
---

***
## _Bør SystemID registreres på fødselsnummer eller organisasjonsnummer?_
**Svar:** Når du sender inn et skjema via Webservice (submitFormTask), der SystemID er registrert på fødselsnummer og reportee er et org.nr, vil bare den originale brukeren (fødselsnummer) som bruker sin originale SystemID kunne hente tilbakemeldingen fra Tjenesteeier.
 
Dersom det er ønskelig at alle med de nødvendige roller/rettigheter på organisasjonsnummer (reportee) skal kunne hente tilbakemeldingen, så må systemID som benyttes i innsendingen være registrert på organisasjonsnummeret.

***

## _Hvordan får jeg ID? (Fagsystem-ID / Sluttbrukersystem-ID)?_

**Svar:**

1. Logg inn i portalen
2. Velg å representere avgiveren det skal sendes inn data for.
3. Velg «profil» i toppmenyen.
4. Gå til «Avanserte innstillinger»
5. Gå ned til «Registrer datasystem»
6. Fyll inn feltene og klikk på «legg til».
7. Du vil nå få en ID som tilhører ditt sluttbrukersystem. Dette vil være SystemUserName i requesten din, og passordet du velger blir systemPassword.

Passordet du registrerer i steg 6 må bestå av minimum 7 tegn, og inneholde både tall og bokstaver.
NB! Husk at systemID vil ha rettighet til å rapportere for den avgiveren du representerer i det du oppretter systemet.

***

## _Hvorfor er det viktig å oppdatere kvitteringen fra Altinn?_

**Svar:**  
Innsending til Altinn via webtjeneste:  
 Du får returnert en synkron kvittering på at dataene er mottatt og teknisk validert ok mot wsdl. Denne kvitteringen inneholder en referanse til forsendelsen. Det betyr ikke at payload er validert i henhold til XSD eller at de er forretningsmessig validert ok (kalkyler, kryssvalideringer, …). 

Asynkron prosess starter:  
Dette skjermiddelbart etter at dataene er mottatt og foretar validering av payload mot XSD og forretningsreglene. For å få oppdatert status på denne valideringen må du etterspørre kvittering basert på referansen i den opprinnelige forsendelsen. Kvitteringen viser deg om valideringen er ferdig og resultatet av valideringen når den er ferdig. Een eventuell feil i valideringen vil komme i kvitteringen som feilmeldinger.
 
Lastetid:  
Det tar fra noen sekunder til noen minutter (avhengig av last på løsningen) før Altinn har prossesert meldingen.Du trenger derfor ikke etterspørre asynkron kvittering direkte etter du har sendt inn dataene.
 
Altinn har registrert at enkelte sluttbrukersystemer etterspør asynkron kvittering i tett løkke for å få en oppdatert kvittering. Dette belaster systemet unødvendig.
***