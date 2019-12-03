---
title: "Regelmotor.xsd"
description: XML Schema Definition for Altinn regelfiler.
weight: 100
---

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
	<xs:element name="AltinnRuleEngine">
		<xs:complexType>
			<xs:sequence>
				<xs:element name="Description" type="xs:string"/>
				<xs:element name="Configuration">
					<xs:complexType>
						<xs:sequence>
							<xs:element name="Forms">
								<xs:complexType>
									<xs:sequence>
										<xs:element name="Form" maxOccurs="unbounded">
											<xs:complexType>
												<xs:attribute name="name" type="xs:string" use="optional"/>
												<xs:attribute name="dataFormatId" type="xs:integer" use="required"/>
												<xs:attribute name="validationEngine" use="required">
													<xs:simpleType>
														<xs:restriction base="xs:string">
															<xs:enumeration value="AltinnRuleEngine"/>
															<xs:enumeration value="InfoPath"/>
															<xs:enumeration value="Both"/>
															<xs:enumeration value="None"/>
														</xs:restriction>
													</xs:simpleType>
												</xs:attribute>
												<xs:attribute name="calculationEngine" use="required">
													<xs:simpleType>
														<xs:restriction base="xs:string">
															<xs:enumeration value="AltinnRuleEngine"/>
															<xs:enumeration value="InfoPath"/>
															<xs:enumeration value="Both"/>
															<xs:enumeration value="None"/>
														</xs:restriction>
													</xs:simpleType>
												</xs:attribute>
											</xs:complexType>
										</xs:element>
									</xs:sequence>
									<xs:attribute name="default" type="xs:string" use="optional"/>
								</xs:complexType>
							</xs:element>
							<xs:element name="Codelists" minOccurs="0">
								<xs:complexType>
									<xs:sequence>
										<xs:element name="Codelist" maxOccurs="unbounded">
											<xs:complexType>
												<xs:attribute name="name" type="xs:string" use="required"/>
												<xs:attribute name="lang" type="Languages" use="required"/>
												<xs:attribute name="version" type="xs:integer" use="optional"/>
											</xs:complexType>
										</xs:element>
									</xs:sequence>
								</xs:complexType>
							</xs:element>
							<xs:element name="PurgeMissingTransfers" minOccurs="0">
								<xs:complexType name="">
									<xs:attribute name="value" type="xs:string" use="optional"/>
								</xs:complexType>
							</xs:element>
						</xs:sequence>
					</xs:complexType>
				</xs:element>
				<xs:element name="Rules">
					<xs:complexType>
						<xs:sequence>
							<xs:element name="Rule" maxOccurs="unbounded">
								<xs:complexType>
									<xs:sequence>
										<xs:element name="Source" minOccurs="0" maxOccurs="unbounded">
											<xs:complexType>
												<xs:attribute name="form" type="xs:integer" use="optional"/>
												<xs:attribute name="field" type="xs:string" use="optional"/>
												<xs:attribute name="addFields" type="xs:string" use="optional"/>
												<xs:attribute name="subtractFields" type="xs:string" use="optional"/>
												<xs:attribute name="sumRecurringFields" type="xs:boolean" use="optional"/>
												<xs:attribute name="multiple" type="xs:boolean" use="optional"/>
											</xs:complexType>
										</xs:element>
										<xs:element name="Target" minOccurs="0" maxOccurs="unbounded">
											<xs:complexType>
												<xs:attribute name="form" type="xs:integer" use="optional"/>
												<xs:attribute name="field" type="xs:string" use="optional"/>
												<xs:attribute name="index" type="xs:integer" use="optional"/>
												<xs:attribute name="value" type="xs:string" use="optional"/>
											</xs:complexType>
										</xs:element>
										<xs:element name="Param" minOccurs="0" maxOccurs="unbounded">
											<xs:complexType>
												<xs:attribute name="name" use="required">
													<xs:simpleType>
														<xs:restriction base="xs:string">
															<xs:enumeration value="AlwaysRun"/>
															<xs:enumeration value="BaseRate"/>
															<xs:enumeration value="CalculationType"/>
															<xs:enumeration value="CheckCount"/>
															<xs:enumeration value="Deductible"/>
															<xs:enumeration value="DoNotIgnoreZeroValue"/>
															<xs:enumeration value="IgnoreGUID"/>
															<xs:enumeration value="IgnorePrefill"/>
															<xs:enumeration value="IndustryTypes"/>
															<xs:enumeration value="InsertEmptyIfNotCalculated"/>
															<xs:enumeration value="MaxDeduction"/>
															<xs:enumeration value="MaxDistance"/>
															<xs:enumeration value="MinimumTollAndFerryDeduction"/>
															<xs:enumeration value="NormalRate"/>
															<xs:enumeration value="OverMaxDistanceRate"/>
															<xs:enumeration value="PercentageField"/>
															<xs:enumeration value="PercentageTransfer"/>
															<xs:enumeration value="RemoveDirtyField"/>
															<xs:enumeration value="RemoveFieldIfConditionsFail"/>
															<xs:enumeration value="RemoveOnMismatch"/>
															<xs:enumeration value="SetNillable"/>
															<xs:enumeration value="SignStorageHint"/>
															<xs:enumeration value="TransferRecurringFields"/>
															<xs:enumeration value="TransferType"/>
															<xs:enumeration value="USField"/>
															<xs:enumeration value="USField1"/>
															<xs:enumeration value="USField2"/>
															<xs:enumeration value="UtbytteFeltHS"/>
															<xs:enumeration value="UtbytteFeltUS"/>
															<xs:enumeration value="ValidationType"/>
															<xs:enumeration value="ValueType"/>
															<xs:enumeration value="XPath"/>
															<xs:enumeration value="xPathsToValidate"/>
														</xs:restriction>
													</xs:simpleType>
												</xs:attribute>
												<xs:attribute name="value" type="xs:string" use="required"/>
											</xs:complexType>
										</xs:element>
										<xs:element name="Condition" type="Conditions" minOccurs="0" maxOccurs="unbounded"/>
										<xs:element name="ErrorTextValueFields" minOccurs="0" maxOccurs="unbounded">
											<xs:complexType>
												<xs:attribute name="fields" type="xs:string" use="optional"/>
											</xs:complexType>
										</xs:element>
										<xs:element name="caption" type="Texts" minOccurs="0"/>
										<xs:element name="Texts" type="Texts" minOccurs="0"/>
									</xs:sequence>
									<xs:attribute name="type" use="required">
										<xs:simpleType>
											<xs:restriction base="xs:string">
												<xs:enumeration value="CalculateRF1086"/>
												<xs:enumeration value="RemoveFieldElement"/>
												<xs:enumeration value="RemoveParentPost"/>
												<xs:enumeration value="SetFieldValue"/>
												<xs:enumeration value="SimpleValidation"/>
												<xs:enumeration value="TransferResult"/>
												<xs:enumeration value="TransferValue"/>
												<xs:enumeration value="ValidateRF1086"/>
												<xs:enumeration value="websa:InternalRF1224Calculations"/>
												<xs:enumeration value="websa:TransferFromNO1ToRF1224"/>
												<xs:enumeration value="websa:TransferFromRF1084ToRF1030"/>
												<xs:enumeration value="websa:TransferFromRF1084ToRF1175"/>
												<xs:enumeration value="websa:TransferFromRF1125ToRF1030"/>
												<xs:enumeration value="websa:TransferSumFrom0402"/>
												<xs:enumeration value="websa:TransferSumToChildcare"/>
												<xs:enumeration value="websa:TransferSumToTravelDeduction"/>
												<xs:enumeration value="websa:TransferSumToWizard"/>
												<xs:enumeration value="websa:ValidatePost337StandardDeductionTempStay"/>
												<xs:enumeration value="websa:ValidateRF1219TransferToWizard"/>
												<xs:enumeration	value="websa:ValidateRF1224BelongsToPost0402"/>
											</xs:restriction>
										</xs:simpleType>
									</xs:attribute>
									<xs:attribute name="description" type="xs:string" use="optional"/>
								</xs:complexType>
							</xs:element>
						</xs:sequence>
					</xs:complexType>
				</xs:element>
			</xs:sequence>
			<xs:attribute name="version" type="xs:string" use="required"/>
			<xs:attribute name="name" type="xs:string" use="required"/>
		</xs:complexType>
		<!-- Keys -->
		<xs:key name="dataFormatId">
			<xs:selector xpath="Configuration/Forms/Form"/>
			<xs:field xpath="@dataFormatId"/>
		</xs:key>
		<xs:key name="codelist">
			<xs:selector xpath="Configuration/Codelists/Codelist"/>
			<xs:field xpath="@name"/>
		</xs:key>
		<!-- Keyrefs -->
		<xs:keyref name="SourceFormRef" refer="dataFormatId">
			<xs:selector xpath="Rules/Rule/Source"/>
			<xs:field xpath="@form"/>
		</xs:keyref>
		<xs:keyref name="TargetFormRef" refer="dataFormatId">
			<xs:selector xpath="Rules/Rule/Target"/>
			<xs:field xpath="@form"/>
		</xs:keyref>
		<xs:keyref name="ConditionCodelistRef" refer="codelist">
			<xs:selector xpath="Rules/Rule/Condition"/>
			<xs:field xpath="@codelist"/>
		</xs:keyref>
	</xs:element>
	<xs:simpleType name="Languages">
		<xs:restriction base="xs:string">
			<xs:enumeration value="1033"/>
			<xs:enumeration value="1044"/>
			<xs:enumeration value="2068"/>
		</xs:restriction>
	</xs:simpleType>
	<xs:complexType name="Texts">
		<xs:sequence>
			<xs:element name="Text" maxOccurs="3">
				<xs:complexType>
					<xs:simpleContent>
						<xs:extension base="xs:string">
							<xs:attribute name="lang" type="Languages" use="required"/>
						</xs:extension>
					</xs:simpleContent>
				</xs:complexType>
			</xs:element>
		</xs:sequence>
	</xs:complexType>
	<xs:complexType name="Conditions">
		<xs:attribute name="type" use="required">
			<xs:simpleType>
				<xs:restriction base="xs:string">
					<xs:enumeration value="AnyFieldEquals"/>
					<xs:enumeration value="AnyFieldExists"/>
					<xs:enumeration value="AnyFieldHasValue"/>
					<xs:enumeration value="AnyFieldHasValueIgnoreZero"/>
					<xs:enumeration value="AnyFieldIsEmpty"/>
					<xs:enumeration value="AnyFieldIsMissing"/>
					<xs:enumeration value="AnyFieldIsPositive"/>
					<xs:enumeration value="AnyFieldNotEquals"/>
					<xs:enumeration value="CodeExistsInCodeList"/>
					<xs:enumeration value="CodeNotInCodeList"/>
					<xs:enumeration value="ContainsAny"/>
					<xs:enumeration value="DoesNotMatchPattern"/>
					<xs:enumeration value="Equals"/>
					<xs:enumeration value="Exists"/>
					<xs:enumeration value="GreaterThan"/>
					<xs:enumeration value="HasAnyForm"/>
					<xs:enumeration value="HasForm"/>
					<xs:enumeration value="HasValue"/>
					<xs:enumeration value="HasValueIgnoreZero"/>
					<xs:enumeration value="IsEmpty"/>
					<xs:enumeration value="IsEmptyWithZeroValue"/>
					<xs:enumeration value="IsMissing"/>
					<xs:enumeration value="IsNegative"/>
					<xs:enumeration value="IsNonValidEmail"/>
					<xs:enumeration value="IsNonValidOrgNr"/>
					<xs:enumeration value="IsNonValidSSN"/>
					<xs:enumeration value="IsPositive"/>
					<xs:enumeration value="IsPositiveIncludingZero"/>
					<xs:enumeration value="IsPrefilled"/>
					<xs:enumeration value="IsValidOrgNr"/>
					<xs:enumeration value="IsValidSSN"/>
					<xs:enumeration value="LessThan"/>
					<xs:enumeration value="MatchPattern"/>
					<xs:enumeration value="MissingForm"/>
					<xs:enumeration value="NoneFieldHasValue"/>
					<xs:enumeration value="NotEqualAcrossMultipleForms"/>
					<xs:enumeration value="NotEquals"/>
					<xs:enumeration value="NotExists"/>
					<xs:enumeration value="NotPrefilled"/>
					<xs:enumeration value="SumEquals"/>
					<xs:enumeration value="SumNotEquals"/>
					<xs:enumeration value="SumNotEqualsWithRange"/>
					<xs:enumeration value="ValueFoundMoreThanOnceInFields"/>
					<xs:enumeration value="ValueNotInCodeList"/>
				</xs:restriction>
			</xs:simpleType>
		</xs:attribute>
		<xs:attribute name="check" type="xs:string"/>
		<xs:attribute name="value" type="xs:string"/>
		<xs:attribute name="valuesourceform" type="xs:string"/>
		<xs:attribute name="valuefieldindex" type="xs:integer"/>
		<xs:attribute name="codelist" type="xs:string"/>
		<xs:attribute name="form" type="xs:string"/>
		<xs:attribute name="fieldindex" type="xs:integer"/>
		<xs:attribute name="donotignorezero" type="xs:boolean"/>
	</xs:complexType>
</xs:schema>
```
