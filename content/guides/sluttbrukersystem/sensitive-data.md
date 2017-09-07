---
title: Sensitive data
description: Kodeeksempler for innsending av sensitiv data
weight: 970
---

{{< figure src="/docs/images/guides/sluttbrukersystemer/sensitive-data.png" title="">}}

## Kodeeksempler for innsending av sensitiv data


### Generering av nøkkel i Java ved hjelp av Bouncy Castle


```java
private static final String SYMMETRIC_ALGORITHM = "AES";
private static final int KEY_SIZE = 128;

keyGenerator = KeyGenerator.getInstance(SYMMETRIC_ALGORITHM);
keyGenerator.init(KEY_SIZE);
byte[] symmetricKey = Base64.encode(keyGenerator.generateKey().getEncoded());
```

### Kryptering av symmetrisk nøkkel ved hjelp av PKI

```java
byte[] SO_Certificate = Base64.decode(certificateValue);
X509certificate cert = (X509Certificate) certificateFactory.generateCertificate(new ByteArrayInputStream(SO_Certificate));
PublicKey rsaPublicKey = cert.getPublicKey();

encryptCipher.init(Cipher.ENCRYPT_MODE, rsaPublicKey);
bytesOIDandSymmetricKeyEncryptedWithCertificate = encryptCipher.doFinal(symmetricKey);

byte[] tempCertificateValue = Base64.encode(bytesOIDandSymmetricKeyEncryptedWithCertificate);
certificateValue = new String(tempCertificateValue);
```

### Kryptering av symmetrisk nøkkel ved hjelp av password


```java
private static final String MESSAGE_DIGEST_ALGORITHM = "MD5";

byte[] messageDigestOfPassword = new byte[PASSWORD.length()];
char[] password = PASSWORD.toCharArray();
MessageDigest messageDigest = MessageDigest.getInstance(MESSAGE_DIGEST_ALGORITHM);

for (int i = 0; i < password.length; i++) {
    messageDigest.update((byte) password[i]);


messageDigestOfPassword = messageDigest.digest();
symmetricPasswordKey = new SecretKeySpec(messageDigestOfPassword, SYMMETRIC_ALGORITHM);
Cipher encryptCipher = Cipher.getInstance(SYMMETRIC_ALGORITHM);
encryptCipher.init(Cipher.ENCRYPT_MODE, symmetricPasswordKey);
byte[] enSyKeyPwd = encryptCipher.doFinal(Base64.decode(symmetricKey));
byte[] tempSymmetricKeyEncryptedWithPassword = Base64.encode(enSyKeyPwd);
symmetricKeyEncryptedWithPassword = new String(tempSymmetricKeyEncryptedWithPassword);
```

### Kryptering av skjemadata

```java
Cipher encryptCipher = Cipher.getInstance(SYMMETRIC_ALGORITHM);
encryptCipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(symmetricKey, SYMMETRIC_ALGORITHM));
byte[] encryptedData = null;

encryptedData = encryptCipher.doFinal(formDataOutPut.getBytes());
byte[] tempformDataOutPut = Base64.encode(encryptedData);
formDataOutPut = new String(tempformDataOutPut);
```

### Eksempel på skjema data med sensitive felt

```xml
<my:myFields xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xhtml="http://www.w3.org/1999/xhtml"
xmlns:my="http://schemas.microsoft.com/office/infopath/2003/myXSD/2010-06-01T08:11:58"
xmlns:xd="http://schemas.microsoft.com/office/infopath/2003"
xml:lang="nb-NO">
    <my:txtFName>Rune</my:txtFName>
    <my:txtMName>Tømmerås</my:txtMName>
    <my:txtLName>Larsen</my:txtLName>
    <my:dpDOB>1975-07-03</my:dpDOB>
    <my:dpDOJ>2005-10-10</my:dpDOJ>
    <my:txtDept>1005</my:txtDept>
    <my:txtLoc>Oslo</my:txtLoc>
    <my:txtTower />
    <my:txtFloor />
    <my:txtBay />
    <my:txtWorkSN />
    <my:txtFN>8Qgnh6BPUq7OmigGSm8Vvg==</my:txtFN>
    <my:txtDp>eSJAxnzWAx2B71/YWkri8g==</my:txtDp>
    <my:txtWN>eSJAxnzWAx2B71/YWkri8g==</my:txtWN>
    <my:txtSignView>eSJAxnzWAx2B71/YWkri8g==</my:txtSignView>
    <my:dpDJ>2W6ID+y4Hr4hyYo7FpDyiw==</my:dpDJ>
    <my:txtFirst />
    <my:txtMiddle />
    <my:txtLast />
    <my:dpDateOfBirth xsi:nil="true" />
    <my:dpDateOfJoining xsi:nil="true" />
    <my:txtDepartment />
    <my:txtLocation />
    <my:txtTowerPV />
    <my:txtFloorPV />
    <my:txtBayPV />
    <my:txtWStaPV />
    <my:txtPrintView />
    <my:dpDOJRV xsi:nil="true" />
    <my:txtDeptRV />
    <my:txtLocRV />
    <my:txtTowerRV />
    <my:txtFloorRV />
    <my:txtBayRV />
    <my:txtWSRV />
    <my:txtReceiptView />
    <my:field1 />
</my:myFields>
```