---
title: Brukerveiledning for innlogging på Domeneklienten via VMware Horizon Client
linktitle: Domeneklient via VMware
description: Hvordan logge inn på Domeneklienten ved å bruke VMware Horizon Client. 
weight: 120
---
&nbsp; 

VMware Horizon Client må være installert på din pc før du kan fortsette. Se avsnitt [Installasjon av VMware Horizon Client](#installasjon-vmware).

&nbsp;
# Logge inn på VMware Horizon Client
&nbsp;

Start VMware Horizon Client på din pc ved å dobbeltklikke på ikonet:

![Figur 1 - Ikon for å starte VMware Horizon Client](../../vmware-ikon.png)
*Figur 1 - Ikon for å starte VMware Horizon Client*

&nbsp;


Etter at VMware Horizon Client er startet må du gjennom en innloggingssekvens på fem trinn. 

![Figur 2 - Valg av server](../../vmware-valg-av-server.png)
*Figur 2 - Valg av server*

Dobbeltklikk på ikonet til «vdesk.brreg.no». Hvis ikonet ikke finnes, klikk på knappen «New Server». Oppgi «**vdesk.brreg.no**» i feltet for Connection Server og klikk på «**Connect**».

&nbsp;


![Figur 3 - Bestille engangskode](../../vmware-bestille-engangskode.png)
*Figur 3 - Bestille engangskode*

I feltet «User name» skriver du brukernavnet som du har fått tilsendt per e-post fra Brønnøysundregistrenes sin IT-support (it-support@brreg.no). Brukernavnet vil bestå av 3 til 5 bokstaver. I feltet «Passcode» skriver du «**sms**». Velg så «**Login**».

Du vil nå få tilsendt en sms med engangskode fra nummer BRREG (27734) på din mobiltelefon. Meldingen vil være: «Melding fra Brønnøysundregistrene, din engangskode er: «**sekssifret kode**».

&nbsp;


![Figur 4 - Legge inn engangskode](../../vmware-legge-inn-engangskode.png)
*Figur 4 - Legge inn engangskode*

Skriv inn den mottatte engangskoden i feltet «**Next Code**» og klikk på «**Login**».

&nbsp;


![Figur 5 - Innloggingsbilde VMware Horizon Client](../../vmware-innlogging.png)
*Figur 5 - Innloggingsbilde VMware Horizon Client*

I feltet «**User name**» skriver du brukernavnet ditt en gang til og i feltet «**Password**» skriver du det passordet som du fikk tilsendt i den samme e-posten som brukernavnet. Klikk på «**Login**».

&nbsp;


Etter at du har klikket på knappen «**Login**» får du opp et vindu med oversikt over de virtuelle maskinene du har tilgang til via «**remote desktop**» (de fleste har bare en):

![Figur 6 - Valg av remote desktop](../../vmware-valg-av-remote-desktop.png)
*Figur 6 - Valg av remote desktop*

Dobbeltklikk på ikonet til «**SERES-desktop**». Du vil da bli koblet til en virtuell maskin (Innholdet på skrivebordet kan avvike fra bildet.). 

&nbsp;


![Figur 7 - Skrivebordet til SERES-desktop](../../vmware-skrivebordet-til-seres-desktop.png)
*Figur 7 - Skrivebordet til SERES-desktop*

&nbsp; 
## Logge inn på Domeneklient
&nbsp;

For å logge på Domeneklienten må du dobbeltklikke på ikonet til Domeneklienten:

![Figur 8 - Ikon for å starte Domeneklient](../../domeneklient-ikon.png)
*Figur 8 - Ikon for å starte Domeneklient*

&nbsp;


Du vil da få opp følgende innloggingsbilde:

![Figur 9 - Innloggingsbildet til Domeneklienten](../../domeneklient-innloggingsbilde.png)
*Figur 9 - Innloggingsbildet til Domeneklienten*

I feltene Brukernavn og passord skriver du inn det brukernavnet og passordet du har fått tildelt fra [Digitalisering Servicedesk](mailto:tjenesteeier@altinn.no). Brukernavnet vil som regel være navnet ditt. 
Brukernavn og passord vil **ikke** være det samme som du brukte ved innloggingen til VMware. 

Vi anbefaler at du endrer passordet du fikk tildelt til klienten(e) så snart som mulig. For å endre passordet se avsnittet [Veiledning for endring av passord](#endring-passord).

&nbsp;


Hvis du også har tilgang til kursmiljøet vil du få spørsmål om å velge miljø:

![Figur 10 - Velge miljø ved innlogging til Domeneklient](../../domeneklient-velg-miljo.png)
*Figur 10 - Velge miljø ved innlogging til Domeneklient*

Velg ønsket brukermiljø. Vær oppmerksom på at produksjon av tjenester skjer i produksjonsmiljøet, mens egentrening skjer i kursmiljøet. 

&nbsp;

{{%expandlarge id="installasjon-vmware" header="Installasjon av VMware Horizon Client" %}}
&nbsp;

For å laste ned klienten følg denne lenken:
https://my.vmware.com/web/vmware/info/slug/desktop_end_user_computing/vmware_horizon_clients/4_0

![Figur 1](../../vmware-go-to-download.png)

Klikk på «**Go to Downloads**» for den versjonen av VMware-klienten som passer til ditt
operativsystem.

&nbsp;


I denne veiledningen er det valgt VMware Horizon Client for Windows:

![Figur 2](../../vmware-download-velg-versjon.png)

Velg versjon «**4.9.0**» og klikk på «**Download**». Versjon 4.9.0 er den nyeste versjonen som foreløpig
støttes av våre servere.

&nbsp;


![Figur 3](../../vmware-download-kjør.png)

Klikk på «**Kjør**».

&nbsp;


![Figur 4](../../vmware-install.png)

Klikk på «**Agree & Install**»

&nbsp;


![Figur 5](../../vmware-install-finish.png)

Klikk på «**Finish**».

&nbsp;


![Figur 6](../../vmware-install-restart.png)

Klikk på «**Restart Now**» slik at pc-en blir restartet og endringene blir aktivisert.

&nbsp;


![Figur 7](../../vmware-ikon.png)

Etter restart vil du kunne se dette ikonet på skjermen din. Dobbeltklikk på ikonet slik at VMware
starter.

&nbsp;


![Figur 8](../../vmware-ny-server.png)

Klikk på «**New Server**», ev. dobbeltklikk på «**Add Server**».

&nbsp;


![Figur 9](../../vmware-oppgi-servernavn.png)

Skriv inn «**vdesk.brreg.no**» i feltet «Enter the name of the Connection Server» og klikk på «**Connect**».

&nbsp;


![Figur 10](../../vmware-innlogging.png)

Klikk på knappen «**Cancel**» hvis du ikke ønsker å logge deg inn nå.

&nbsp;


![Figur 11](../../vmware-valg-av-server.png)

Løsningen er klar til bruk.


{{% /expandlarge%}}


{{%expandlarge id="innstilling-brannmur" header="Innstillinger i brannmur" %}}
&nbsp;

Hvis det oppleves problemer med innloggingen på VMware Horizon Client, kan årsaken være at det ikke er åpnet for de nødvendige portene i brannmuren i det nettverket du bruker. De viktigste portene det må være åpnet for er disse:

Kilde | Port | Mål | Port | Protokoll | Beskrivelse
----- |:----:| --- |:----:|:---------:| -----------
Security server (vdesk.brreg.no) | 4172 | View Client | 4172 | UDP | PCoIP (AES-128-GCM only) if PCoIP Secure Gateway is used.
View Client | * | View Connection Server or security server (vdesk.brreg.no) | 80 | TCP | HTTP access if SSL is disabled for client connections.
View Client | * | View Connection Server or security server (vdesk.brreg.no) | 443 | TCP | HTTPS access if SSL is enabled for client connections.
View Client | * | View Connection Server or security server (vdesk.brreg.no | 4172 | TCP | PCoIP (HTTPS) if PCoIP Secure Gateway is used.
View Client | 4172 | View Connection Server or security server (vdesk.brreg.no) | 4172 | UDP | PCoIP (AES-128-GCM only) if PCoIP Secure Gateway is used.

Konfigurasjonen gjelder bare mot vdesk.brreg.no ved bruk av PCoIP-protokollen.

Kilde: https://kb.vmware.com/s/article/1027217

{{% /expandlarge%}}


{{%expandlarge id="endring-passord" header="Veiledning for endring av passord" %}}
&nbsp;


Det brukes samme brukernavn og passord på Domeneklienten og Administratorklienten. Men
endring av passord kan kun gjøres i Administratorklienten.

Åpne innloggingsbildet til Domeneklienten.

![Figur 1](../../domeneklient-innloggingsbilde.png)

Klikk på lenken «**Endre passord**».

&nbsp;


![Figur 2](../../administratorklient-innloggingsside.png)

Logg på med det brukernavnet og passordet du bruker for å logge på Domeneklienten. Vær
oppmerksom på at Administrasjonsklienten ikke fungerer i nettleseren Microsoft Internet Explorer. Den fungerer best i nettleseren Google Chrome.

&nbsp;


![Figur 2](../../administratorklient-endre-passord.png)

Skriv inn det nye passordet to ganger. Når nytt passord er lagt inn, trykker du på knappen «**Lagre**».
Ditt nye passord gjelder fra neste gang du logger deg på Domeneklienten.

Merk at det også er mulig å endre passordet gjennom funksjonen "Glemt passord".

{{% /expandlarge%}}

&nbsp;

