---
title: Tjenesteeiere
description: Dokumentasjon for tjenesteeierdelen av Altinns REST-apier
weight: 10
---

Altinns REST-api for tjenesteeiere er bare tilgjengelig med bruk av virksomhetssertifikat
og krever at man har en apinøkkel med tilgang til "serviceowner"-ressursene.

Organisasjonsnummeret i sertifikatet må matche det som er oppført på etaten som tjenesteeier i Altinns databaser.  
For å trigge autentisering med virksomhetssertifikat, legger man på parameteren `?ForceEIAuthentication` i URI-en.

{{% notice info %}}
[Teknisk dokumentasjon av API'et for tjenesteeiere](https://www.altinn.no/api/serviceowner/help).
{{% /notice %}}

{{% children description="true" %}}