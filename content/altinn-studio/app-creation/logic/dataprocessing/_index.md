---
title: Dataprosessering
description: Hvordan legge til kalkuleringer og annen dataprosessering?
toc: true
---

Dataprosessering kjøres på serveren, og er basert på input fra sluttbruker/skjemadata.
Dataprossering kan være kan være rent matematiske kalkuleringer, det kan også være å overføre verdier mellom felter, resultater av API-kall, osv. 

Dataprossering kodes i C#, i filen `DataProsessingHandler.cs`. Denne filen kan redigeres enklest ved å laste ned kildekoden til app'en og redigere på egen maskin, f.eks. i Visual Studio Code.
Datamodellen med skjemadata er tilgjengelig og kan redigeres/oppdateres etter ønske/behov.

Dataprossering kjøres hver gang data lagres og når data hentes ut fra API. Med auto-lagring på (dette er standard) vil dataprossering kjøres hver gang en bruker har gjort en endring og hopper ut av et felt.

For å sikre optimal opplevelse og kontroll er applikasjonstemplaten to forskjellige hendelser hvor logikk kan plasseres.

- ProcessDataWrite kjøres når data lagres
- ProcessDataRead kjøres når data leses fra databasen

{{%notice info%}}
VIKTIG: Når en dataprossering er kjørt som har oppdatert dataene på server, må front-end få beskjed om dette, sånn at de oppdaterte dataene kan lastes inn.
For å gjøre dette, må `ProcessDataWrite`-metoden returnere `true` om det er noen av dataene som har blitt oppdatert.
Hvis dette ikke gjøres, vil de oppdaterte dataen ikke være synlig for sluttbruker før de ev. laster inn siden på nytt.
{{% /notice%}}

Eksempel på kode fra app som prosesserer og populerer forskjellige data under lagring.

```C# {hl_lines=[16,22]}
      public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
        {
            bool edited = false;

            if (data.GetType() == typeof(SoknadUnntakKaranteneHotellVelferd))
            {
                SoknadUnntakKaranteneHotellVelferd model = (SoknadUnntakKaranteneHotellVelferd)data;

                HttpContext ctxt = _httpContextAccessor.HttpContext;

                string org = instance.Org;
                string app = instance.AppId.Split("/")[1];
                int partyId = int.Parse(instance.InstanceOwner.PartyId);
                Guid instanceGuid = Guid.Parse(instance.Id.Split("/")[1]);

                // handling mapping of multiple choice velferdsgrunner
                if (!string.IsNullOrEmpty(model.velferdsgrunner?.sammenstilling))
                {
                    model.velferdsgrunner.helseproblemer = model.velferdsgrunner.sammenstilling.Contains("helseproblemer") ? true : false;
                    model.velferdsgrunner.barnefodsel = model.velferdsgrunner.sammenstilling.Contains("barnefodsel") ? true : false;
                    model.velferdsgrunner.begravelse = model.velferdsgrunner.sammenstilling.Contains("begravelse") ? true : false;
                    model.velferdsgrunner.naerstaaende = model.velferdsgrunner.sammenstilling.Contains("naerstaaende") ? true : false;
                    model.velferdsgrunner.adopsjon = model.velferdsgrunner.sammenstilling.Contains("adopsjon") ? true : false;
                    model.velferdsgrunner.sarligeOmsorg = model.velferdsgrunner.sammenstilling.Contains("sarligeOmsorg") ? true : false;
                    model.velferdsgrunner.barnAlene = model.velferdsgrunner.sammenstilling.Contains("barnAlene") ? true : false;
                    model.velferdsgrunner.hjemmeeksamen = model.velferdsgrunner.sammenstilling.Contains("hjemmeeksamen") ? true : false;
                    model.velferdsgrunner.arbeidunntak = model.velferdsgrunner.sammenstilling.Contains("arbeidunntak") ? true : false;
                    model.velferdsgrunner.andreVelferdshensyn = model.velferdsgrunner.sammenstilling.Contains("annet") ? true : false;
                    model.velferdsgrunner.andreVelferdshensynBeskrivelse = model.velferdsgrunner.sammenstilling.Contains("annet") ? model.velferdsgrunner.andreVelferdshensynBeskrivelse : null;

                    edited = true;
                }
                else
                {
                    model.velferdsgrunner = null;
                }

                // set data for receipt if not set
                if (string.IsNullOrEmpty(model.applogic?.altinnRef))
                {
                    model.applogic ??= new Applogic();

                    Party party = await _registerService.GetParty(int.Parse(instance.InstanceOwner.PartyId));
                    model.applogic.avsender = $"{instance.InstanceOwner.PersonNumber}-{party.Name}";
                    model.applogic.altinnRef = instance.Id.Split("-")[4];
                }
            }

            return await Task.FromResult(edited);
        }
```