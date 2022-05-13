---
title: Sende/motta filer
description: Operasjoner relatert til formidlingstjeneste
weight: 10
aliases:
- /guides/integrasjon/sluttbrukere/api/formidling/
---

{{% expiring-notice 2021-12-21 %}}
Formidlingstjenesten på REST kommer i [21.12-releasen](/docs/ny-funksjonalitet/prodsetting/) av Altinn
{{% /expiring-notice %}}

## Generellt om bruk av formidlingstjeneste
I Altinn er det bygget funksjon for å la Altinn fungere som formidler mellom sender og mottaker av filer. 
Formidlingstjeneste fungerer via flere steg; 
først må rettighet til å sende og motta filer via formidligstjeneste deles ut via [Service Rights Repository (SRR)](../tjenesteeiere/rest/tjenesteeierstyrte-rettigheter/)

Deretter må en avsender opprette en instans av formidlingstjeneste hvor mottakere er definert, og laste opp fil.

Når dette er gjort vil så mottakere kunne laste ned filene, og gi confirmation på at fil er lastet ned.

Filer som er blitt lastet ned eller som går ut på dato definert i formidlingstjeneste vil bli automatisk slettet.

Bruk av tjeneste krever [personinnlogging](../kom-i-gang/person/), eller innlogging virksomhetsbruker via 
[Maskinporten](../kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-maskinporten) 
eller med [virksomhetssertifikat](../kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-virksomhetssertifikat))

Finn også mer informasjon om formidlingstjeneste under [Guider](/docs/guides/).

{{% children description="true" %}}
