---
title: Brukerveiledning for innlogging på Domeneklienten via VMware Horizon Client
linktitle: Domeneklient via VMware
description: Hvordan logge inn på Domeneklienten ved å bruke VMware Horizon Client. 
weight: 120
---

VMware Horizon Client må være installert på din pc før du kan fortsette. Se avsnitt [Installasjon av VMware Horizon Client](#installasjon-vmware).

## Logge inn på VMware Horizon Client

Start VMware Horizon Client på din pc ved å dobbeltklikke på ikonet:

![Figur 1 - Ikon for å starte VMware Horizon Client](../../vmware-ikon.png)
*Figur 1 - Ikon for å starte VMware Horizon Client*

Etter at VMware Horizon Client er startet må du gjennom en innloggingssekvens på fire trinn. 

![Figur 2 - Valg av server](../../vmware-valg-av-server.png)
*Figur 2 - Valg av server*

Dobbeltklikk på ikonet til «**vdi1.brreg.no»** og klikk på «**Connect**».

*Hvis ikonet ikke finnes, klikk på knappen «New Server». Oppgi «vdi1.brreg.no» i feltet for Connection Server og klikk på «Connect».*

![Figur 3 - Innlogging VMware Horizon Client](../../vmware-innlogging.png)
*Figur 3 - Innloggingsbilde VMware Horizon Client*

I feltene «**User name**» og «**Password**» skriver du brukernavnet og passordet som du har fått tilsendt per e-post fra Brønnøysundregistrene sin [Servicedesk](mailto:servicedesk@brreg.no). Brukernavnet vil bestå av 3 til 5 bokstaver.  Velg så «**Login**».

*Vær oppmerksom på at brukeren automatisk blir låst i 15 minutter etter 3 feilaktige innloggingsforsøk.*

Du vil nå få tilsendt en sms med engangskode fra nummer BRREG (27734) på din mobiltelefon. Meldingen vil være: «Passcode: «**sekssifret kode**».

![Figur 4 - Legge inn engangskode](../../vmware-legge-inn-engangskode.png)
*Figur 4 - Legge inn engangskode*

Skriv inn den mottatte engangskoden i feltet «**Passcode**» og klikk på «**Login**».

Etter at du har klikket på knappen «**Login**» får du opp et vindu med oversikt over de virtuelle maskinene du har tilgang til via «**remote desktop**» (de fleste har bare en):

![Figur 5 - Valg av remote desktop](../../vmware-valg-av-remote-desktop.png)
*Figur 5 - Valg av remote desktop*

Dobbeltklikk på ikonet til «**SERES-desktop**». Du vil da bli koblet til en virtuell maskin (Innholdet på skrivebordet kan avvike fra bildet.). 

![Figur 6 - Skrivebordet til SERES-desktop](../../vmware-skrivebordet-til-seres-desktop.png)
*Figur 6 - Skrivebordet til SERES-desktop*


## Logge inn på Domeneklient

For å logge på Domeneklienten må du dobbeltklikke på ikonet til Domeneklienten:

![Figur 7 - Ikon for å starte Domeneklient](../../domeneklient-ikon.png)
*Figur 7 - Ikon for å starte Domeneklient*

Du vil da få opp følgende innloggingsbilde:

![Figur 8 - Innloggingsbildet til Domeneklienten](../../domeneklient-innloggingsbilde.png)
*Figur 8 - Innloggingsbildet til Domeneklienten*

I feltene Brukernavn og passord skriver du inn det brukernavnet og passordet du har fått tildelt fra [Digitalisering Servicedesk](mailto:tjenesteeier@altinn.no). Brukernavnet vil som regel være navnet ditt. 
Brukernavn og passord vil **ikke** være det samme som du brukte ved innloggingen til VMware. 

Vi anbefaler at du endrer passordet du fikk tildelt til klienten(e) så snart som mulig. For å endre passordet se avsnittet [Veiledning for endring av passord](#endring-passord).

Hvis du også har tilgang til kursmiljøet vil du få spørsmål om å velge miljø:

![Figur 9 - Velge miljø ved innlogging til Domeneklient](../../domeneklient-velg-miljo.png)
*Figur 9 - Velge miljø ved innlogging til Domeneklient*

Velg ønsket brukermiljø. Vær oppmerksom på at produksjon av tjenester skjer i produksjonsmiljøet, mens egentrening skjer i kursmiljøet. 


{{%expandlarge id="installasjon-vmware" header="Installasjon av VMware Horizon Client" %}}

For å laste ned klienten følg denne lenken:

<a href="https://my.vmware.com/en/web/vmware/downloads/info/slug/desktop_end_user_computing/vmware_horizon_clients/horizon_8" target="_blank" rel="noopener"><span>Download VMware Horizon Clients</span> </a>

![Figur 1](../../vmware-go-to-download.png)

Klikk på «**Go to Downloads**» for den versjonen av VMware-klienten som passer til ditt
operativsystem.

I denne veiledningen er det valgt VMware Horizon Client for Windows:

![Figur 2](../../vmware-download-velg-versjon.png)

Velg nyeste versjon og klikk på «**Download**».

![Figur 3](../../vmware-download-open-file.png)

Klikk på «**Open file**».

![Figur 4](../../vmware-install.png)

Klikk på «**Agree & Install**»


![Figur 5](../../vmware-install-finish.png)

Klikk på «**Finish**».

![Figur 6](../../vmware-install-restart.png)

Klikk på «**Restart Now**» slik at pc-en blir restartet og endringene blir aktivisert.

![Figur 7](../../vmware-ikon.png)

Etter restart vil du kunne se dette ikonet på skjermen din. Dobbeltklikk på ikonet slik at VMware
starter.

![Figur 8](../../vmware-ny-server.png)

Klikk på «**New Server**», ev. dobbeltklikk på «**Add Server**».

![Figur 9](../../vmware-oppgi-servernavn.png)

Skriv inn «**vdi1.brreg.no**» i feltet «Enter the name of the Connection Server» og klikk på «**Connect**».

![Figur 10](../../vmware-innlogging.png)

Klikk på knappen «**Cancel**» hvis du ikke ønsker å logge deg inn nå.

![Figur 11](../../vmware-valg-av-server.png)

Løsningen er klar til bruk.


{{% /expandlarge%}}


{{%expandlarge id="innstilling-brannmur" header="Innstillinger i brannmur" %}}

Hvis det oppleves problemer med innloggingen på VMware Horizon Client, kan årsaken være at det ikke er åpnet for de nødvendige portene i brannmuren i det nettverket du bruker. De viktigste portene det må være åpnet for er disse:

| Kilde                            | Port | Mål                                                        | Port | Protokoll | Beskrivelse                                               |
| -------------------------------- |:----:| ---------------------------------------------------------- |:----:|:---------:| --------------------------------------------------------- |
| Security server (vdesk.brreg.no) | 4172 | View Client                                                | 4172 | UDP       | PCoIP (AES-128-GCM only) if PCoIP Secure Gateway is used. |
| View Client                      | *    | View Connection Server or security server (vdesk.brreg.no) | 80   | TCP       | HTTP access if SSL is disabled for client connections.    |
| View Client                      | *    | View Connection Server or security server (vdesk.brreg.no) | 443  | TCP       | HTTPS access if SSL is enabled for client connections.    |
| View Client                      | *    | View Connection Server or security server (vdesk.brreg.no  | 4172 | TCP       | PCoIP (HTTPS) if PCoIP Secure Gateway is used.            |
| View Client                      | 4172 | View Connection Server or security server (vdesk.brreg.no) | 4172 | UDP       | PCoIP (AES-128-GCM only) if PCoIP Secure Gateway is used. |

Konfigurasjonen gjelder bare mot vdesk.brreg.no ved bruk av PCoIP-protokollen.

Kilde: https://kb.vmware.com/s/article/1027217

{{% /expandlarge%}}


{{%expandlarge id="endring-passord" header="Veiledning for endring av passord til Domeneklienten" %}}


Det brukes samme brukernavn og passord på Domeneklienten og Administratorklienten. Men
endring av passord kan kun gjøres i Administratorklienten.

Åpne innloggingsbildet til Domeneklienten.

![Figur 1](../../domeneklient-innloggingsbilde.png)

Klikk på lenken «**Endre passord**».

![Figur 2](../../administrasjonsklient-innloggingsside.png)

Logg på med det brukernavnet og passordet du bruker for å logge på Domeneklienten. Vær
oppmerksom på at Administrasjonsklienten ikke fungerer i nettleseren Microsoft Internet Explorer. Den fungerer best i nettleseren Google Chrome.

![Figur 2](../../administrasjonsklient-endre-passord.png)

Skriv inn det nye passordet to ganger. Passordet må være på minst 10 tegn og inneholde store og små bokstaver, tall og spesialtegn. Når nytt passord er lagt inn, trykker du på knappen «**Lagre**».

Ditt nye passord gjelder fra neste gang du logger deg på Domeneklienten.

*Merk at det også er mulig å angi nytt passordet gjennom funksjonen "Glemt passord" i Domeneklienten.*

{{% /expandlarge%}}

{{%expandlarge id="endring-passord-vmware" header="Veiledning for endring av passord til VMware Horizon Client" %}}

Brukernavn og passord til VMware Horizon Client forvaltes av Brønnøysundregistrene da løsningen kjører hos dem og bruker deres autentisering- og autorisasjonsløsning.

Bytte av passord utføres på følgende adresse: https://fs.brreg.no/adfs/portal/updatepassword

Etter at du har klikket på lenken vil du få opp følgende side:

![Figur 1](../../vmware-oppdatere-passord-BR-AD.png)

I feltene «**Brukernavn**» og «**Gammelt passord**» skriver du brukernavnet og passordet som du tidligere har fått tilsendt per e-post fra Brønnøysundregistrene sin [Servicedesk](mailto:servicedesk@brreg.no). (*Brukernavnet vil bestå av 3 til 5 bokstaver.*)

I feltene «**Nytt passord**» og «**Bekreft nytt passord**» skriver du inn det nye passordet du ønsker. Passordkravene for det nye passordet er som følger: 
* Passord skal inneholde 3 av følgende kategorier:
    * Små bokstaver
    * Store bokstaver
    * Tall
    * Spesialtegn
* Passord skal inneholde minst 12 tegn
* Det er ikke mulig å gjenbruke passord

Etter at du har fylt ut feltene klikker du på knappen «**Send**». Hvis endringen av passordet ble gjennomført vil du få denne bekreftelsen:

![Figur 2](../../vmware-oppdatert-passord-BR-AD.png)

&nbsp; 

Vær oppmerksom på at passord skal byttes hver 12. måned.

Hvis du får problemer med å bytte passord tar du kontakt med Brønnøysundregistrenes sin: [Servicedesk](mailto:servicedesk@brreg.no?Subject=SERES%20-%20Endring%20av%20passord%20til%20VMware&Body=Hei%0A%0AKan%20dere%20endre%20passordet%20til%20min%20bruker%20[Oppgi%20brukernavn].)

{{% /expandlarge%}}