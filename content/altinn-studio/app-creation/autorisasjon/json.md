---
title: Regelbibliotek JSON - UNDER ARBEID!
linktitle: JSON
description: Bibliotek av autorisasjonsregler som kan brukes i en app. Husk å bytte ut tags ([ORG], [APP], [RULE_ID]) med din egen data.
hidden: true
---

## [ORG] can instantiate an instance of [ORG]/[APP]

[ORG_1] og [ORG_2] kan her være like eller ulike. I tilfellet at de er ulike vil [ORG_1] tilsvare applikasjonseieren og [ORG_2] være en annen organisasjon som får lov til å instansiere. 

```xml {linenos=false,hl_lines=[2,7,15,19,27]}
<xacml:Rule RuleId="urn:altinn:example:ruleid:[RULE_ID]" Effect="Permit">
  <xacml:Description>[ORG_2] can instantiate an instance of [ORG_1]/[APP]</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG_2]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG_1]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">instantiate</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

```json {linenos=false,hl_lines=[9,12,15]}
{
  "$schema": "https://altinncdn.no/schemas/json/policy/policy.schema.v1.json",
  "Policy": {
    "Rules": [
      {
        "Effect": "Permit",
        "Description": "[ORG_2] can instantiate an instance of [ORG_1]/[APP]",
        "Subjects": [
          "org:[ORG_2]"
        ],
        "Resources": [
          "app:[ORG_1]/[APP]"
        ],
        "Actions": [
          "instantiate"
        ]
      }
    ]
  }
}
```

## User with role REGNA can read instances of [ORG]/[APP] when it is in Task_1

Ved å endre på rolle og task i denne regelen vil du kunne gi rettigheter til å lese instansdata på en gitt task i prosessflyten.

```xml {linenos=false,hl_lines=[2,7,15,19,23,31]}
<xacml:Rule RuleId="urn:altinn:example:ruleid:[RULE_ID]" Effect="Permit">
  <xacml:Description>User with role REGNA can read instances of [ORG]/[APP] when it is in Task_1</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">REGNA</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>  
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Task_1</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:task" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
      <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

```json {linenos=false,hl_lines=[9,12,15]}
{
  "$schema": "https://altinncdn.no/schemas/json/policy/policy.schema.v1.json",
  "Policy": {
    "Rules": [
      {
        "Effect": "Permit",
        "Description": "User with role REGNA can read instances of [ORG]/[APP] when it is in Task_1",
        "Subjects": [
          "role:REGNA"
        ],
        "Resources": [
          "app:[ORG]/[APP]/Task_1"
        ],
        "Actions": [
          "read"
        ]
      }
    ]
  }
}
```

## [ORG] can write to an instance of [ORG]/[APP] in any task or event

Denne regelen kan brukes dersom applikasjonseier skal kunne oppdatere instanser uavhengig av hvor de er i prosessflyten sin.

```xml {linenos=false,hl_lines=[2,7,15,19,27]}
<xacml:Rule RuleId="urn:altinn:example:ruleid:[RULE_ID]" Effect="Permit">
  <xacml:Description>[ORG] can write to instances of [ORG]/[APP] in any task or event</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">write</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

```json {linenos=false,hl_lines=[9,12,15]}
{
  "$schema": "https://altinncdn.no/schemas/json/policy/policy.schema.v1.json",
  "Policy": {
    "Rules": [
      {
        "Effect": "Permit",
        "Description": "[ORG] can write to instances of [ORG]/[APP] in any task or event",
        "Subjects": [
          "org:[ORG]"
        ],
        "Resources": [
          "app:[ORG]/[APP]"
        ],
        "Actions": [
          "write"
        ]
      }
    ]
  }
}
```


## User with role REGNA or DAGL can confirm instances of [ORG]/[APP] when it is in Task_2

Denne reglen begrenser rettigheten til å bekrefte en instans i en bestemt task til kun to roller.
Ved å enten modifisere task eller roller vil du her kunne sette regler for hvem som får bekrefte instansen i ulike faser av prosessen.

```xml {linenos=false,hl_lines=[2,7,13,21,25,29,37]}
<xacml:Rule RuleId="urn:altinn:example:ruleid:[RULE_ID]" Effect="Permit">
  <xacml:Description>User with role REGNA or DAGL can confirm instances of [ORG]/[APP] when it is in Task_2</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">REGNA</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Task_2</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:task" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
      <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">confirm</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

```json {linenos=false,hl_lines=[9,10,13,16]}
{
  "$schema": "https://altinncdn.no/schemas/json/policy/policy.schema.v1.json",
  "Policy": {
    "Rules": [
      {
        "Effect": "Permit",
        "Description": "User with role REGNA or DAGL can confirm instances of [ORG]/[APP] when it is in Task_2",
        "Subjects": [
          "role:REGNA",
          "role:DAGL"
        ],
        "Resources": [
          "app:[ORG]/[APP]/Task_2"
        ],
        "Actions": [
          "confirm"
        ]
      }
    ]
  }
}
```


## User with role REGNA can read instanes of [ORG]/[APP] when it is in EndEvent_1

Denne regler tillatter en bruker med den gitte rollen å lese instansdata etter at prosessen er avsluttet.
Dette vil bl.a. inkludere å laste ned vedlegg og kvitteringer knyttet til instansen.

```xml {linenos=false,hl_lines=[2,7,14,18,22,30]}
<xacml:Rule RuleId="urn:altinn:example:ruleid:[RULE_ID]" Effect="Permit">
  <xacml:Description>User with role REGNA can read instanes of [ORG]/[APP] when it is in EndEvent_1</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">REGNA</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">EndEvent_1</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:end-event" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

```json {linenos=false,hl_lines=[9,12,15]}
{
  "$schema": "https://altinncdn.no/schemas/json/policy/policy.schema.v1.json",
  "Policy": {
    "Rules": [
      {
        "Effect": "Permit",
        "Description": "User with role REGNA can read instanes of [ORG]/[APP] when it is in EndEvent_1",
        "Subjects": [
          "role:REGNA"
        ],
        "Resources": [
          "app:[ORG]/[APP]/EndEvent_1"
        ],
        "Actions": [
          "read"
        ]
      }
    ]
  }
}
```

## Rule that defines that [ORG] can complete an instance of [ORG]/[APP] which state is at the end event.

Denne regelen tillatter applikasjonseier å utføre en kvittering på at de er ferdig med en instans. Instansen må ha en fullført process.

```xml {linenos=false,hl_lines=[2,7,15,19,23,31]}
<xacml:Rule RuleId="urn:altinn:example:ruleid:5" Effect="Permit">
  <xacml:Description>Rule that defines that [ORG] can complete an instance of [ORG]/[APP] which state is at the end event.</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">EndEvent_1</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:end-event" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">complete</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

```json {linenos=false,hl_lines=[9,12,15]}
{
  "$schema": "https://altinncdn.no/schemas/json/policy/policy.schema.v1.json",
  "Policy": {
    "Rules": [
      {
        "Effect": "Permit",
        "Description": "Rule that defines that [ORG] can complete an instance of [ORG]/[APP] which state is at the end event.",
        "Subjects": [
          "org:[ORG]"
        ],
        "Resources": [
          "app:[ORG]/[APP]/EndEvent_1"
        ],
        "Actions": [
          "complete"
        ]
      }
    ]
  }
}
```