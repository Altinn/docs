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

Eksempel på kode fra reell app som setter informasjon fra brukerprofil når data lagres:

```C# {hl_lines=[16,22]}
public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
{

        string org = instance.AppId.Split("/")[0];
        string app = instance.AppId.Split("/")[1];
        int partyId = int.Parse(instance.InstanceOwner.PartyId);
        Guid instanceGuid = Guid.Parse(instance.Id.Split("/")[1]);

            if (model.personopplysninger == null)
        {
            UserProfile profile = await _profileService.GetUserProfile(userId.Value);

            model.personopplysninger = new Personopplysninger();

            model.personopplysninger.fornavn = profile.Party.Person.FirstName;
            model.personopplysninger.mellomnavn = profile.Party.Person.MiddleName;
            model.personopplysninger.etternavn = profile.Party.Person.LastName;
            model.personopplysninger.personnummer = profile.Party.Person.SSN;
            model.personopplysninger.fodselsdato = GetBirthDateFromSSN(profile.Party.Person.SSN);

            model.personopplysninger.Adresse = $"{ profile.Party.Person.AddressStreetName} { profile.Party.Person.AddressHouseNumber}{ profile.Party.Person.AddressHouseLetter}".Trim();
            model.personopplysninger.Poststed = profile.Party.Person.AddressCity;
            model.personopplysninger.Postnummer = profile.Party.Person.AddressPostalCode;

            if (!string.IsNullOrEmpty(model.personopplysninger.Poststed) && !string.IsNullOrEmpty(model.personopplysninger.Postnummer))
            {
                model.personopplysninger.Land = "NOR";
            }

            model.personopplysninger.telefonnummer = profile.PhoneNumber;
            model.personopplysninger.epost = profile.Email;

            edited = true;
        }

    // Return false if no changes have been made
    return false;
}
```