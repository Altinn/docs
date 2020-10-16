---
title: Sikkerhet i eOppslag
description: Altinn kan benyttes for å videredelegere tilgang til API-er sikret med Maskinporten
weight: 60
---

{{% notice warning  %}}
Sikkerhet i eOppslag er i pilotdrift. Alt på disse sidene er gjenstand for endring. 
{{% /notice %}}

## Introduksjon

[Den nasjonale referansearkitekturen for eOppslag](https://doc.difi.no/nasjonal-arkitektur/nab_referanse_arkitekturer_eoppslag/)
søker å møte behovet for samordnede sikkerhetsmekanismer for å sikre tilganger til API-er gjennom sterk autentisering, 
samt mulighet for å kunne delegere tilganger videre til f.eks. leverandører som skal utføre arbeid på vegne av en aktør som har fått tilgang til et API.

[Maskinporten](https://difi.github.io/felleslosninger/oidc_guide_maskinporten.html) er delen av den felles nasjonale innloggingsløsningen
[ID-porten](https://www.difi.no/fagomrader-og-tjenester/difis-felleslosninger/id-porten) som tilbyr sikring av API-tilganger
via maskin-til-maskin-autentisering og en OAuth2-scope basert autorisasjonsmekanisme.

Sammen med Altinn er det implementert en mekanisme som gjør det mulig for virksomheter som er gitt tilgang til et API
gjennom Maskinporten å gi denne videre til for eksempel en leverandør som skal utføre den tekniske implementasjonen på deres vegne.
Dette gjør at API-eier ikke trenger å forholde seg til enkeltleverandører, og man unngår deling av virksomhetssertifkat mellom virksomheten som har fått tilgang og dens leverandør.

### Et eksempel
Skatteetaten oppretter API-er for oppslag mot Folkeregisteret (1), og registrerer samtidig API-et (scopet) som en delegerbar ressurs i Altinn (2).
Deretter gis tilgang til Leikanger kommune til scopet som representerer Folkeregisteret (3). 

En hoveadministrator for Leikanger kommune logger da inn i Altinn og utfører en vanlig tjenestedelegering til en leverandør. (4)

{{<mermaid>}}
graph TD
  subgraph Skattetaten
    SSC[Selvbetjeningsklient]
  end
  subgraph Maskinporten
    SSA[Selvbetjenings-API]
  end
  subgraph Leikanger Kommune
     CON[Tilgangsstyrer]
  end
  subgraph "Delegeringskilde (Altinn)"
     AP[Altinn Portal]
     AA[Altinn Autorisasjon]
  end

  SSC--> |1. Oppretter API|SSA
  SSC --> |2. Registrer API som delegerbar ressurs|AA
  SSC --> |3. Gir tilgang til Leikanger kommune|SSA
  CON --> |4. Delegerer tilgang til leverandør via Portal|AP
{{</mermaid>}}

Underleverandøren får beskjed om dette via varsel, og kan da opprette en OAuth2-klient i Maskinporten som provisjoneres med scopet som representerer Folkeregisteret.
Når underleverandøren da forsøker å hente ut et access token, oppgir de at de gjøre dette på vegne av Leikanger Kommune.
Maskinporten gjør da et oppslag mot Altinn for å sjekke om det foreligger en aktiv delegering på Folkeregister-scopet gitt fra Leikanger Kommune til underleverandøren.
Altinn returnerer en bekreftelse på dette, og Maskinporten utsteder token til underleverandører, som da kan bruke dette mot Skatteetatens API som om den var Leikanger Kommune.

{{<mermaid>}}
graph TD
  subgraph Skattetaten
    API[Folkeregister-API]
  end
  subgraph Maskinporten
    OIDC[OAuth2-server]
  end
  subgraph Leverandør
     CLI[OAuth2-klient]
  end
  subgraph "Delegeringskilde (Altinn)"
     AA[Altinn Autorisasjon]
  end

  CLI --> |1. Forespør token pva. Leikanger kommune|OIDC
  OIDC -->|2. Sjekker om delegering foreligger|AA
  OIDC -->|3. Utsteder leverandørtoken|CLI
  CLI --> |4. Bruker token mot API|API
{{</mermaid>}}

<script>
mermaidConfig = {
    theme: "default",
    fontFamily: "DIN-reg",
    flowchart: { 
            useMaxWidth: true,
            bottomMarginAdj: 50
    },
    themeCSS: 
       /* ".node rect { fill: #0062BA; }"+*/
        ".node rect { fill: #1EAEF7; }"+
        ".node .label { color: white }"+
        ".cluster rect { fill: #EFEFEF !important; stroke: #1EAEF7 !important }"+
        ".edgeLabel { background: #fff; padding: 0.3rem }"
}
</script>

{{% children description="true" %}}