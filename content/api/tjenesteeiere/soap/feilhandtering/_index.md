---
title: Feilhåndtering
description: Altinn benytter en SOAP fault til å returnere feilmeldinger for en web service. Denne fault meldingen er i henholdt til AltinnFault kontrakten definert i WSDL for alle tjenestene. Kontrakten vil angi en feilkode og en feilmelding, henholdsvis ErrorID og AltinnErrorMessage, for å definere feilsituasjoner.
weight: 801
---

Eksempel på en feilmelding fra Altinn:

```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Body>
        <s:Fault>
            <detail>
                <AltinnFault>
                    <AltinnExtendedErrorMessage>No information available</AltinnExtendedErrorMessage>
                    <AltinnLocalizedErrorMessage>Incorrect username/password/pin given for user</AltinnLocalizedErrorMessage>
                    <ErrorGuid>ed4c23c0-7de6-4343-a442-89bd3a6f38d8</ErrorGuid>
                    <ErrorID>989</ErrorID>
                    <UserGuid>-no value-</UserGuid>
                    <UserId/>
                </AltinnFault>
            </detail>
        </s:Fault>
   </s:Body>
</s:Envelope>
```

## Feilkoder

Listen under angir de generelle feilkodene som benyttes.
Disse er først og fremst benyttet i sammenheng med autentisering og autorisering og benyttes derfor av flere av tjenestene i Altinn.
Feilkoder mer spesifikke for operasjonene er listet opp under de respektive operasjonene i kapittel 9 Grensesnitt – web services.

| **Feilkode** | **Beskrivelse**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0            | Denne feilen oppstår i følgende tilfeller, se tekst i AltinnErrorMessage for mer informasjon: En nødvendig parameter for autentisering/autorisering mangler i forespørsel, Systemet er ikke autorisert for denne operasjonen på vegne av angitt avgiver, Operasjonen krever høyere autentiseringsnivå enn mulig og må derfor utføres i portalen                                                                                                                                                                                                            |
| 5            | Denne feilen oppstår i følgende tilfeller, se tekst i AltinnErrorMessage for mer informasjon: Ikke mulig å autorisere forespørsel basert på sendte parametere – verifiser gyldigheten/format, Autentisering av systemet vha sertifikat feilet pga feil brukernavn/passord, Systemet autentisert ved sertifikat er midlertidig låst ute, Systemet er ikke autorisert til å kalle tjenesten fra innkommende IP adresse, Systemet er ikke autorisert til å kalle forespurt ressurs (feil tjenesteeier), Angitt system ID er ikke gyldig – skal være et nummer |
| 989          | Denne feilen oppstår i følgende tilfeller, se tekst i AltinnErrorMessage for mer informasjon: Forespørsel mangler system ID eller system passord, Autentisering av systemet (uten sertifikat) feilet pga feil brukernavn/passord, Systemet (ikke sertifikat) er midlertidig låst ute                                                                                                                                                                                                                                                                       |


Hvis det ikke kommer en forståelig feilmelding, send en henvendelse til support@altinn.no.
Legg med tidspunkt for innsending og systemUserName, den unike koden (ErrorGuid) samt beskrivelse av hva som har skjedd.