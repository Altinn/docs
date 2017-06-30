---
title: Samtykke
description: "Gjennom samtykkeløsningen i Altinn kan personer/organisasjoner gi samtykke til at en tredjepart (offentlige og private virksomheter) får midlertidig 
              innsynsrett på et spesifikt sett med opplysninger om dem som tidligere er innhentet."
weight: 100
---

Gjennom samtykkeløsningen i Altinn kan personer/organisasjoner gi samtykke til at en tredjepart (offentlige og private virksomheter) får midlertidig 
innsynsrett på et spesifikt sett med opplysninger om dem som tidligere er innhentet. Dette kan for eksempel være ligningsdata fra Skatteetaten.

Med sluttbrukerens samtykke vil tredjepart automatisk bli tildelt en tidsbegrenset lese-rettighet for en eller flere 
sett av opplysninger representert ved tjenester i Altinn. 


### Fordeler og muligheter
Samtykkeløsningen gir datakilder tilgang til å dele data de allerede har samlet inn på en person eller en organisasjon med en tredjepart som trenger de samme opplysningene.
Løsningen kan utnyttes i en pågående prosess hos tredjepart hvor brukeren må gi samtykke til å innhente gitte opplysninger som en del av prosessen.
Dette skjer ved at bruker sendes til en egen samtykkeside i Altinn. Siden støtter videreføring tilbake til tredjepart etter at bruker har gitt samtykke.
For å kunne gi et samtykke må brukeren først identifisere seg med en elektronisk ID i den felles offentlige innloggingsløsningen ID-porten.

Tredjepart angir hvilke opplysninger det ønskes midlertidig innsyn i, hvor lenge innsynet skal vare og i hvilken kontekst opplysningene skal benyttes.
Dette angir tredjepart som input til samtykkesiden. Datakilden har på forhånd navngitt settet av opplysninger og angitt overordnet og detaljert
beskrivelse av opplysningene det vil bli gitt tilgang til.

Det er frivillig for brukeren om han ønsker å samtykke så han kan også velge å ikke gi samtykke.
I Altinn vil alle samtykker logges slik at brukeren til en hver tid har oversikt over avgitte, slettede og opphørte samtykker.
Bruker har her også muligheten til å trekke et samtykke han tidligere har gitt slik at innsynsretten stoppes.

Det er støtte for to ulike dataflyter for overføringen av data etter at samtykket er gitt. Dataflyten kan gå gjennom Altinn eller
den kan gå direkte mellom datakilde og tredjepart. Dersom overføringen av data skal gå gjennom Altinn benyttes en innsynstjeneste i Altinn.
Tredjepart vil da knytte seg til Altinn for å be om data fra datakilden. Altinn autoriserer og videreformidler forespørselen til datakildene
og returnerer datasettet ved autorisert tilgang. Dersom innsynet skjer direkte mellom datakilde og tredjepart benyttes en lenketjeneste.
Her vil tredjepart etter at bruker har avgitt samtykke få en autorisasjonskode, som igjen kan brukes til å motta et signert autorisasjons-token.
Tokenet gir informasjon om samtykket som er gitt, varighet og hvilke datasett det gjelder og benyttes overfor datakilde for å hente ut data.


#### Fordeler for tredjepart: 
 - Enklere å kunne hente data direkte og strukturert
 - Kundeinformasjonen er valid og krever ikke kontroll
 - Gir økt effektivitet til ulike prosesser. Digital tilgang til brukerens data i en begrenset periode for å kunne utnytte dataene i en digital prosess med et avgrenset formål

#### Fordeler for sluttbruker:
 - Enklere og ukomplisert «avlevering» av etterspurt informasjon
 - Gir større trygghet i situasjonen for kunden,  - ikke krevende, forvirrende eller tidkrevende
 - Vil kunne se hvilke data man har delt med hvem og når

#### Fordeler for datakilde:
 - Slipper henvendelser fra brukerne på å få f.eks. ligningspapirer, regnskapsopplysninger
 - En sikker og brukerautorisert måte kunne gi eksterne parter tilgang til brukers data

### Råd og tips
 - Samtykke kan knyttes til alle tjenester som har definert samtykketekst
 - Utform samtykketeksten slik at sluttbruker forstår hva man gir samtykke til. 
 - Hvis du lar datakonsument aksessere data gjennom Altinn kan Altinn håndtere autorisasjonen. Dette sparer kompleksitet på datakonsument siden som kan velge å stole på Altinn.

### Kanaler
 - Samtykke gis i portal og data kan aksesseres via REST eller webservice. Flyt utenom Altinn er også mulig.
 - Varslingstjenesten

### Avhengigheter
Samtykke knyttes til innsyn eller lenketjenester.

### Teknisk dokumentasjon
[Samtykkeløsning med bruk av token](https://altinnett.brreg.no/Global/opendoc/SBL-Samtykkeloesning-med-bruk-av-token.pdf)
