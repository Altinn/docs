

Implementasjonsguide for tjenesteeier                             Accenture
                                                                  Altinn 

### 1	Innledning
Dette dokumentet beskriver de tjenester Altinn tilbyr alle tjenesteeiere og hvordan deres systemer kan integrere seg mot disse. Det er lagt vekt på å beskrive både det funksjonelle aspektet i forhold til hva integrasjonene tilbyr rent funksjonelt, og en teknisk detaljering av grensesnittene som tilbys av Altinn.

Eventuelle tjenester/grensesnitt som er spesifikke for en tjenesteeier er ikke med her.

### 1.1	Hva er Altinn
Altinn er myndighetenes løsning for innrapportering og dialog med næringslivet. Alle tjenester fra det offentlige til næringslivet skal gjøres tilgjengelige her. Målet er at næringslivet bare skal behøve å forholde seg til én nettportal for all rapportering og kommunikasjon med forvaltningen, og at Altinn skal bli et samhandlingsnav for offentlig norsk e-forvaltning. Videre skal Altinn som et transaksjonsnav sørge for håndtering av sluttbrukertjenester som innsendings-, meldings-, samhandlings-, formidlings- og innsynstjenester.

### 1.2	Valg av grensesnitt
Flere av tjenestene tilbys med både web service– og batch-grensesnitt. Som en tommelfingerregel kan man si at skal man overføre færre enn 100 elementer (alternativt mindre enn 30 MB) kan man benytte web service grensesnitt, men for store datamengder bør batch-grensesnitt benyttes. Tommelfingerregelen er scenarioavhengig og ingen absoluttgrense. AltinnII plattformen er bygget på siste versjon av Microsoft software og teknologi, og er ikke en begrensning for transport av data. For overføring av store datamengder er det vel så viktig at eksterne systemer er optimalt konfigurert iht. ønsket grensesnitt.

### 1.3	Lesehenvisning
Dette dokumentet bør leses i sammen med dokumentene "Funksjonell spesifikasjon – Sluttbrukerløsningen", som gir en funksjonell beskrivelse av sluttbrukerløsningen, og "Implementasjonsguide for integrasjon mot Altinn", som er den overordnede guiden for alle som skal integrere seg mot Altinn.
I tillegg refereres leser til Tjenestekatalogen (Service Inventory) som en kontinuerlig oppdatert liste over tilgjengelige tjenester, med tilhørende funksjonell og tekniske informasjon, samt tjenestens WSDL tilgjengelig på endepunktet for den tekniske spesifikasjonen. Tjenestekatalogen vil gi en komplett liste over hvilke tjenester som er tilgjengelig for tjenesteeiere gjennom egen visning av listen (Tjenesteeier tjenester): https://altinn.brreg.no/sites/program/altinn%20II/Lists/Tjenestekatalog/Tjenesteeier%20tjenester.aspx

### 1.4	Like operasjoner med forskjellige protokoller og endepunkter
Alle operasjonene er tilgjengelig på to protokoller (bindings). Operasjoner som benytter SOAP 1.1 er kjennetegnet med navnendelsen –Basic. Operasjoner som benytter SOAP 1.2 er kjennetegnet med navnendelsen –WS. Operasjoner som benytter SOAP 1.2 og sertifikat er kjennetegnet med navnendelsen –EC. Sertifikatet er knyttet til avgiver, slik at flere brukere kan benytte samme sertifikat. Utfyllende beskrivelse kommer senere i dokumentet.
For tjenesteeiere blir EC grensesnitt autentisert ved bruk av et sertifikat og agency system brukernavn og passord.
AEC grensesnitt benytter SOAP 1.2 og sertifikat, men krever ikke bruk av agency systemer, med brukernavn og passord. I stedet hentes Organisasjonsnummer direkte fra sertifikatet som brukes til autentisering, som så valideres opp mot registrerte tjenesteeiere.

### 1.5	Versjonering av operasjoner
Flere av operasjonene i dette dokumentet vil kunne eksistere i flere versjoner. Dette for å være tilbakekompatibel med eventuelt eksisterende klienter. Når en endring blir gjort for en gitt operasjon opprettes det en ny operasjon med tilsvarende navn som ender med et versjonsnummer, for eksempel V2. Dette gjør at gamle klienter vil kunne fortsette å benytte gammel metode og WSDL, mens nye klienter kan (og oppfordres til) benytte nyeste metode og WSDL.

Merk at ikke alle grensesnitt nødvendigvis vil benytte denne endelsen. Dette gjelder i de tilfeller hvor operasjonen ikke tidligere er tilgjengeliggjort og dermed ikke har noen forgjenger, for eksempel gjelder dette for mange av EC grensesnittene.

Dette dokumentet vil dokumentere den nyeste versjonen av operasjonene. For dokumentasjon av tidligere versjoner henvises det til tidligere dokumentversjoner.


