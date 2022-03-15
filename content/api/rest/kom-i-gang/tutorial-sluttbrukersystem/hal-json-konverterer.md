---
title: Konvertere HAL+JSON
description: "Et eksempel på hvordan man kan lage en tilpasset HAL+JSON konverterer for å serialisere og deserialisere lister av rettigheter med System.Text.Json."
toc: false
aliases:
weight: 6
categories: [Kom-i-gang veiledninger]
keywords: [autorisasjon, API, REST, integrasjon, HAL+JSON, JSON, System.Text.Json]
tags: [REST]
---

### Tilpasset HAL+JSON konverterer
*(eng: custom HAL+JSON converter)*

I denne leksjonen vil vi vise hvordan man lager en tilpasset konverterer for HAL+JSON for `System.Text.Json`.
Detaljene vil være sterkt knyttet til `System.Text.Json` og vil ikke kunne brukes uten modifikasjoner mot andre JSON biblioteker.
Vi har basert implementasjonen på [Microsoft - How to write custom converters for JSON serialization (marshalling) in .NET](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-converters-how-to?pivots=dotnet-core-3-1)
og bruker *factory pattern*.

#### JsonConverterFactory

```cs
public class EmbeddedListConverter : JsonConverterFactory
```
Tilpassede konverterere som bruker *factory* mønsteret må implementere to funksjoner:
- `CanConvert()` som bestemmer om konvertereren støtter denne typen,
- `CreateConverter()` som lager en `JsonConverter` som kan håndtere serialisering og deserialisering av denne typen.
```cs
public override bool CanConvert(Type typeToConvert)
{
    if (!typeToConvert.IsGenericType)
    {
        return false;
    }

    if (typeToConvert.GetGenericTypeDefinition() != typeof(List<>))
    {
        return false; 
    }

    Type listType = typeToConvert.GetGenericArguments()[0];
    if (listType != typeof(Right))
    {
        return false;
    }

    return true; 
}
```
Denne implementasjonen av `CanConvert()` vil kun akseptere `List<Right>`.
Den eneste endringen som må gjøres for å håndtere lister av andre objekter, som for eksempel `Roles`, er å legge til en sjekk som aksepterer den her.
Resten av konvertereren trenger ingen endring for å støtte det.

```cs
public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
{
    Type listValueType = typeToConvert.GetGenericArguments()[0];

    JsonConverter converter = (JsonConverter)Activator.CreateInstance(
        typeof(EmbeddedListConverterInner<>).MakeGenericType(
            new Type[] { listValueType }),
        BindingFlags.Instance | BindingFlags.Public,
        binder: null,
        args: new object[] { options },
        culture: null);

    return converter;
}
```

### JsonConverter
Oppgaven som skal utføres av JsonConverter er å konvertere mellom lister av objekter i klientkoden og JSON som aksepteres av Altinn.
I dette eksempelet vil vi benytte modellen for en rettighet `Right`.
`System.Text.Json` støtter allerede serialisering av objekter hvor alle attributtene har enkle typer (se: `JsonSerilizerOptions.GetConverter()`).
Det som gjenstår å beskrive er hvordan lister av disse objektene skal serialiseres (`Write()`) og deserialiseres (`Read()`).

Eksempel på HAL+JSON
```json
{
    "_links": {
        ...
    },
    "_embedded": {
        "rights": [
            {
                "RightID": 0,
                "RightType": "Service",
                "ServiceCode": "1337",
                "ServiceEditionCode": 1,
                "Action": "Read",
                "RightSourceType": "DirectlyDelegatedRights",
                "IsDelegatable": true
            },
            {
                "RightID": 1,
                ...
            }
        ]
    }
}
```

#### EmbeddedListConverterInner klassen
```cs
private class EmbeddedListConverterInner<T> : JsonConverter<List<T>>
{
    private readonly JsonConverter<T> _converter;
    private readonly Type _type;

    public EmbeddedListConverterInner(JsonSerializerOptions options)
    {
        _converter = (JsonConverter<T>)options.GetConverter(typeof(T));
        _type = typeof(T);
    }
    
``` 

#### Read
`Read()` må
- lage listen med `Rights`,
- kalle konvertereren for `Rights` som ble satt i konstruktøren,
- ignorere og gå videre når den kommer til `JsonTokenType.EndObject`,
- returnere listen når den kommer til slutten av `array`.
```cs
public override List<T> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    var list = new List<T>();

    while (reader.Read())
    {
        if (reader.TokenType == JsonTokenType.EndObject)
        {
            continue;
        }
        if (reader.TokenType == JsonTokenType.EndArray)
        {
            return list;
        }

        T element = _converter.Read(ref reader, _type, options);
        list.Add(element);
    }
}
```

#### Write
`Write()` skal kun legge til `array` notasjon rundt utlistingen av `Rights`.
```cs
public override void Write(Utf8JsonWriter writer, List<T> list, JsonSerializerOptions options)
{
    writer.WriteStartArray();
    foreach (T value in list)
    {
        _converter.Write(writer, value, options);
    }
    writer.WriteEndArray();
}
```

I [neste leksjon](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/hente-delegations/) skal vi bruke HAL+JSON modellene og konvertereren til å håndtere responsen fra `GET {who}/authorization/Delegations`.