---
title: Brukerveiledning for innlogging på Domeneklienten via VMware Horizon Client
linktitle: Domeneklient via VMware
description: Hvordan logge inn på Domeneklienten ved å bruke VMware Horizon Client. 
weight: 120
---

Vi anbefaler at VMware Horizon Client er installert på din pc før du fortsetter. Se avsnitt «Installasjon av VMware Horizon Client».

## Logge inn på VMware Horizon Client

Start en nettleser og skriv inn <https://brvdi.brreg.no> i adressefeltet.

![Figur 1 - Innlogging - angi brukernavn](../../brvdi-brukernavn.png "Figur 1 - Innlogging - angi brukernavn")

Skriv inn brukernavnet ditt som du har fått tilsendt fra [Brønnøysundregistrene](mailto:servicedesk@brreg.no) + «@brreg.no». Klikk på «**Next**».

![Figur 2 - Innlogging - angi passord](../../brvdi-innlogging-passord.png "Figur 2 - Innlogging - angi passord")

Skriv inn passordet ditt og klikke på «**Logg på**».

*Vær oppmerksom på at brukeren automatisk blir låst i 15 minutter etter 3 feilaktige innloggingsforsøk. Du kan selv låse opp brukeren/kontoen, se avsnittet «Veiledning for å låse opp konto til VMware Horizon Client»*.

![Figur 3 - Innlogging - tofaktorautentisering](../../brvdi-innlogging-tofaktor.png "Figur 3 - Innlogging - tofaktorautentisering")

Klikk på feltet «**Send en tekstmelding til +XX XXXXXX??**» for å få tilsendt en engangskode på sms.

*Du kan legge til flere autentiseringsmetoder, f.eks. Microsoft Authenticator. For å gjøre dette logger du inn på <https://myaccount.microsoft.com/> og velger «Sikkerhetsinformasjon». Velg så «Legg til en påloggingsmetode».*

![Figur 4 - Innlogging - legge inn engangskode](../../brvdi-innlogging-smskode.png "Figur 4 - Innlogging - legge inn engangskode")

Skriv inn den mottatte engangskoden og klikk på «**Kontroller**».

![Figur 5 - Innlogging - forbli pålogget](../../brvdi-innlogging-forbli-palogget.png "Figur 5 - Innlogging - forbli pålogget")

Klikk på «**Ja**» eller «**Nei**» for om du ønsker å forbli pålogget din konto hos Brønnøysundregistrene. Hvis du klikker på «Ja» vil du forbli pålogget så lenge det er tilkobling. Hvis du har tilkobling men ikke har brukt løsningen på 90 dager, blir du logget av. Alternativt kan du også selv velge å logge av hvis du ønsker dette.

*For å slippe dette spørsmålet hver gang du skal starte klienten kan du krysse av for «Ikke vis dette flere ganger».*

![Figur 6 - Innlogging - remote desktop](../../brvdi-innlogging-passord-andregang.png "Figur 6 - Innlogging - remote desktop")

Skriv inn passordet ditt på nytt og klikke på «**Logon**».

Etter at du har klikket på knappen «**Logon**» får du opp et vindu med oversikt over de virtuelle maskinene du har tilgang til via «remote desktop» (de fleste har bare en):

![Figur 7 - Velg SERES Desktop](../../brvdi-velg-seres-desktop.png "Figur 7 - Velg SERES Desktop")

Klikk på «SERES Desktop».

![Figur 8 - Velg SERES Desktop](../../brvdi-innlogging-velg-klient.png "Figur 8 - Velg SERES Desktop")

Velg at SERES Desktop skal åpnes i «**VMware Horizon**» og klikk på «**OK**».

*Vi anbefaler at det brukes VMware Horizon klienten fremfor HTML da denne gir bedre ytelse og mer funksjonalitet. Du kan senere endre valgt klient ved å klikke på «VDI settings» (tannhjulet) til venstre for «Logout».*

![Figur 9 - Åpne VMware Horizon Client](../../brvdi-apne-horizon-client.png "Figur 9 - Åpne VMware Horizon Client")

Klikk på «**Åpne VMware Horizon Client**»

*For å slippe dette spørsmålet hver gang du skal starte klienten kan du krysse av for «Tillat alltid `brvdi.brreg.no` å åpne linker av denne typen i den tilknyttede appen.»*

![Figur 10 - Skrivebordet til SERES Desktop](../../brvdi-seres-desktop-skrivebord.png "Figur 10 - Skrivebordet til SERES Desktop")

&nbsp;

## Logge inn på Domeneklient

For å logge på Domeneklienten må du dobbeltklikke på ikonet til Domeneklienten:

![Figur 11 - Ikon for å starte Domeneklient](../../domeneklient-ikon.png "Figur 11 - Ikon for å starte Domeneklient")

Du vil da få opp følgende innloggingsbilde:

![Figur 12 - Innloggingsbildet til Domeneklienten](../../domeneklient-innloggingsbilde.png "Figur 12 - Innloggingsbildet til Domeneklienten")

I feltene Brukernavn og passord skriver du inn det brukernavnet og passordet du har fått tildelt fra [Digitalisering Servicedesk](mailto:tjenesteeier@altinn.no). Brukernavnet vil som regel være navnet ditt.
Brukernavn og passord vil **ikke** være det samme som du brukte ved innloggingen til VMware.

Vi anbefaler at du endrer passordet du fikk tildelt til klienten(e) så snart som mulig. For å endre passordet se avsnittet «Veiledning for endring av passord».

Hvis du også har tilgang til kursmiljøet vil du få spørsmål om å velge miljø:

![Figur 13 - Velge miljø ved innlogging til Domeneklient](../../domeneklient-velg-miljo.png "Figur 13 - Velge miljø ved innlogging til Domeneklient")

Velg ønsket brukermiljø. Vær oppmerksom på at produksjon av tjenester skjer i produksjonsmiljøet, mens egentrening skjer i kursmiljøet.

&nbsp;
{{%expandlarge id="installasjon-vmware" header="Installasjon av VMware Horizon Client" title="Installasjon av VMware Horizon Client" %}}

For å laste ned klienten følg denne lenken:

<a href="https://my.vmware.com/en/web/vmware/downloads/info/slug/desktop_end_user_computing/vmware_horizon_clients/horizon_8" target="_blank" rel="noopener"><span>Download VMware Horizon Clients</span></a>

![Figur 1](../../vmware-go-to-download.png "Figur 1 - Download VMware Clients")

Klikk på «**Go to Downloads**» for den versjonen av VMware-klienten som passer til ditt
operativsystem.

I denne veiledningen er det valgt VMware Horizon Client for Windows:

![Figur 2](../../vmware-download-velg-versjon.png "Figur 2 - Download Product")

Velg nyeste versjon og klikk på «**Download**».

![Figur 3](../../vmware-download-open-file.png "Figur 3 - Open file")

Klikk på «**Open file**».

![Figur 4](../../vmware-install.png "Figur 4 - Agree & Install")

Klikk på «**Agree & Install**»

![Figur 5](../../vmware-install-finish.png "Figur 5 - Finish")

Klikk på «**Finish**».

![Figur 6](../../vmware-install-restart.png "Figur 6 - Restart")

Klikk på «**Restart Now**» slik at pc-en blir restartet og endringene blir aktivisert.

![Figur 7](../../vmware-ikon.png "Figur 7 - Ikon til VMware Horizon Client")

Etter restart vil du kunne se dette ikonet på skjermen din. Dette betyr at løsningen er klar til bruk og du kan logge inn på løsningen via <https://brvdi.brreg.no>.

&nbsp;
{{% /expandlarge%}}

&nbsp;
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

Kilde: <https://kb.vmware.com/s/article/1027217>

{{% /expandlarge%}}

&nbsp;
{{%expandlarge id="endring-passord" header="Veiledning for endring av passord til Domeneklienten" %}}

&nbsp;
Det brukes samme brukernavn og passord på Domeneklienten og Administratorklienten. Men
endring av passord kan kun gjøres i Administratorklienten.

Åpne innloggingsbildet til Domeneklienten.

![Figur 1](../../domeneklient-innloggingsbilde.png "Figur 1 - Innloggingsbildet til Domeneklienten")

Klikk på lenken «**Endre passord**».

![Figur 2](../../administrasjonsklient-innloggingsside.png "Figur 2 - Innloggingssiden til Administrasjonsklienten")

Logg på med det brukernavnet og passordet du bruker for å logge på Domeneklienten. Vær
oppmerksom på at Administrasjonsklienten ikke fungerer i nettleseren Microsoft Internet Explorer. Den fungerer best i nettleseren Google Chrome.

![Figur 2](../../administrasjonsklient-endre-passord.png "Figur 3 - Min side i Administrasjonsklienten")

Skriv inn det nye passordet to ganger. Passordet må være på minst 10 tegn og inneholde store og små bokstaver, tall og spesialtegn. Når nytt passord er lagt inn, trykker du på knappen «**Lagre**».

Ditt nye passord gjelder fra neste gang du logger deg på Domeneklienten.

*Merk at det også er mulig å angi nytt passordet gjennom funksjonen "Glemt passord" i Domeneklienten.*

{{% /expandlarge%}}

&nbsp;
{{%expandlarge id="endring-passord-vmware" header="Veiledning for endring og tilbakestilling av passord til VMware Horizon Client" %}}

&nbsp;
Brukernavn og passord til VMware Horizon Client forvaltes av Brønnøysundregistrene da løsningen kjører hos dem og bruker deres autentisering- og autorisasjonsløsning.

Bytte av passord eller tilbakestilling av passord utføres på følgende adresse: <https://passwordreset.microsoftonline.com/>

Etter at du har klikket på lenken vil du få opp følgende side:

![Figur 1](../../vmware-tilbakestille-passord-BR-AD-1.png "Figur 1 - Brukernavn og CAPTCHA-kode")

Skriv inn brukernavnet som du tidligere har fått tilsendt per e-post fra Brønnøysundregistrene sin [Servicedesk](mailto:servicedesk@brreg.no). Vær oppmerksom på at brukernavnet, som består av 3 til 5 bokstaver, må skrives som en e-postadresse. F.eks. «xabcd@brreg.no». Fyll ut CAPTCHA-koden og klikke på «**Neste**».

&nbsp;

![Figur 2](../../vmware-tilbakestille-passord-BR-AD-2.png "Figur 2 - Glemt passord")

Velg alternativet «**Jeg har glemt passordet**». Dette valget gjelder både for endring av passord og tilbakestilling av glemt passord. Klikk på «**Neste**».

&nbsp;

![Figur 3](../../vmware-tilbakestille-passord-BR-AD-3.png "Figur 3 - Kontaktmetode")

Velg kontaktmetoden «**Tekst mobiltelefon**». Skriv inn ditt mobilnummer og klikk på «**Neste**».

&nbsp;

![Figur 4](../../vmware-tilbakestille-passord-BR-AD-4.png "Figur 4 - Bekreftelseskode")

Skriv inn bekreftelseskoden (6 siffer) som du fikk tilsendt på sms og klikk på «**Neste**».

&nbsp;

![Figur 5](../../vmware-tilbakestille-passord-BR-AD-5.png "Figur 5 - Valg av passord")

I feltene «**Skriv inn nytt passord**» og «**Bekreft nytt passord**» skriver du inn det nye passordet du ønsker. Passordkravene for det nye passordet er som følger:

* Passord skal inneholde 3 av følgende kategorier:
  * Små bokstaver
  * Store bokstaver
  * Tall
  * Spesialtegn
* Passord skal inneholde minst 12 tegn
* Det er ikke mulig å gjenbruke passord

&nbsp;

Etter at du har fylt ut feltene klikker du på knappen «**Fullfør**». Hvis endringen av passordet ble gjennomført vil du få denne bekreftelsen:

![Figur 6](../../vmware-tilbakestille-passord-BR-AD-6.png "Figur 6 - Passord er tilbakestilt")

&nbsp;

Vær oppmerksom på at passord skal byttes hver 12. måned.

Hvis du får problemer med å bytte passord tar du kontakt med Brønnøysundregistrenes sin: [Servicedesk](mailto:servicedesk@brreg.no?Subject=SERES%20-%20Endring%20av%20passord%20til%20VMware&Body=Hei%0A%0AKan%20dere%20endre%20passordet%20til%20min%20bruker%20[Oppgi%20brukernavn].)

{{% /expandlarge%}}

&nbsp;
{{%expandlarge id="laseopp-konto-vmware" header="Veiledning for å låse opp konto til VMware Horizon Client" %}}

&nbsp;
Kontoen til VMware Horizon Client forvaltes av Brønnøysundregistrene da løsningen kjører hos dem og bruker deres autentisering- og autorisasjonsløsning.

Å låse opp konto utføres på følgende adresse: <https://passwordreset.microsoftonline.com/>

Etter at du har klikket på lenken vil du få opp følgende side:

![Figur 1](../../vmware-laseopp-konto-BR-AD-1.png "Figur 1 - Brukernavn og CAPTCHA-kode")

Skriv inn brukernavnet som du tidligere har fått tilsendt per e-post fra Brønnøysundregistrene sin [Servicedesk](mailto:servicedesk@brreg.no). Vær oppmerksom på at brukernavnet, som består av 3 til 5 bokstaver, må skrives som en e-postadresse. F.eks. «xabcd@brreg.no». Fyll ut CAPTCHA-koden og klikke på «**Neste**».

&nbsp;

![Figur 2](../../vmware-laseopp-konto-BR-AD-2.png "Figur 2 - Låst konto")

Velg alternativet «**Jeg vet hva passordet er, men kan likevel ikke logge på**». Klikk på «**Neste**».

&nbsp;

![Figur 3](../../vmware-laseopp-konto-BR-AD-3.png "Figur 3 - Kontaktmetode")

Velg kontaktmetoden «**Tekst mobiltelefon**». Skriv inn ditt mobilnummer og klikk på «**Neste**».

&nbsp;

![Figur 4](../../vmware-laseopp-konto-BR-AD-4.png "Figur 4 - Bekreftelseskode")

Skriv inn bekreftelseskoden (6 siffer) som du fikk tilsendt på sms og klikk på «**Neste**».

&nbsp;

![Figur 5](../../vmware-laseopp-konto-BR-AD-5.png "Figur 5 - Kontoen er låst opp")

Kontoen er låst opp.

{{% /expandlarge%}}
