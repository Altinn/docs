---
title: Kodeeksempler SPI 
description: Feilkoder i Altinn
weight: 700
---
{{< figure src="/docs/images/guides/tjenesteeier/kodeeksempler.png" title="">}}

##### Kodeeksempler SPI

##### Dekryptering av kryptert symmetrisk nøkkel

Dette eksemplet henter ut privat nøkkel fra keystore basert på keyname og dekrypterer den symmetriske nøkkelen ved hjelp av RSA algoritmen. Kodeeksemplet er basert på C#.

```xml
        /// <summary>
        /// Method to retrieve certificate from KeyStore
        /// </summary>
        /// <param name="thumbprint"></param>
        /// <param name="storeName"></param>
        /// <param name="storeLocation"></param>
        /// <returns></returns>
        public static X509Certificate2 GetCert(string thumbprint, StoreName storeName, StoreLocation storeLocation)
        {  // The following code gets the cert from the keystore
            X509Store store = new X509Store(storeName, storeLocation);
            store.Open(OpenFlags.ReadOnly);
            X509Certificate2Collection certCollection = store.Certificates.Find(X509FindType.FindByThumbprint, thumbprint, false);
            X509Certificate2Enumerator enumerator = certCollection.GetEnumerator();
            X509Certificate2 cert = null;
            while (enumerator.MoveNext())
            {
                cert = enumerator.Current;
            }
            return cert;
        }



     /// <summary>
        /// Decrypt the symmetric key encrypted with certificate. This method will
        /// retrive the private key based on the thumprint given for certificate
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, EventArgs e)
        {
            string thumbprint = soCertificateThumbPrint_TB.Text;
            X509Certificate2 cert =  GetCert(thumbprint, StoreName.My, StoreLocation.LocalMachine);

            byte[] symmetricKey = Convert.FromBase64String(soEncryptedSymmetricKeyWithCertTB.Text);

              ////Encrypt the symmetric key with certificate
                RSACryptoServiceProvider rsa = (RSACryptoServiceProvider)cert.PrivateKey;
                byte[] decryptedKey = rsa.Decrypt(symmetricKey, false);

                soDecryptedSymmetricKeyTB.Text = Convert.ToBase64String(decryptedKey)
        }

```

##### Dekryptering av data

Dette eksemplet viser dekryptering av data kryptert med den AES algoritmen.

```xml
    `    /// <summary>
        /// Method to Setup the AESCipher
        /// </summary>
        private void SetupAesCipher(byte[] symmetricKey, bool isXmlEncryption)
        {
            if (_aesCipher == null)
            {
                _aesCipher = new AesManaged();

                _aesCipher.KeySize = this._keyLengthInBits;
/// BlockSize: 128-bit == 16 bytes, which is what you get with the AES from IBM's JCE provider. 
                // 128-bit is the default for RijndaelManaged
                _aesCipher.BlockSize = 128;  // can also specify 256

                _aesCipher.Mode = CipherMode.CBC;

    //If the data is Xml, padding mode is ISO10126
aesCipher.Padding = isXmlEncryption ? PaddingMode.ISO10126 :      PaddingMode.PKCS7;
            }

      byte[] key = new byte[16];
      byte[] iv = new byte[16];
System.Buffer.BlockCopy(symmetricKey, 0, key, 0, 16);
System.Buffer.BlockCopy(symmetricKey, 16, iv, 0, 16);
            _aesCipher.IV = iv;
            _aesCipher.Key = key;
        }



/// <summary>
        /// Decrypt and message and return it as string
        /// </summary>
        /// <param name="cipherText"></param>
/// <param name=" isXmlEncryption">true if data is Xml</param>
        /// <returns></returns>
        public string DecryptMessageToString(byte[] cipherText, bool isXmlEncryption)
        {
            try
            {
                byte[] plainText = DecryptMessage(cipherText, isXmlEncryption);
                return System.Text.Encoding.ASCII.GetString(plainText);
            }
            catch
            {
                return "(garbled)";
            }
        }




        /// <summary>
        /// Decrypt message
        /// </summary>
        /// <param name="cipherText"></param>
   /// <param name=" isXmlDecryption ">true if data is Xml</param>
        /// <returns></returns>
        public byte[] DecryptMessage(byte[] cipherText, bool isXmlDecryption)
        {
            byte[] plainText;

            ICryptoTransform transform = _aesCipher.CreateDecryptor();

            if (isXmlDecryption)
            {
//create another array to copy the data to be decrypted leaving the IV (which is first 16 bytes)
                byte[] cipherBytes = new byte[cipherText.Length - _aesCipher.IV.Length];

                // copy the data to be decrypted which is from 16
  System.Buffer.BlockCopy(cipherText, _aesCipher.IV.Length, cipherBytes, 0, cipherBytes.Length);

                //decrypt the data
                plainText = transform.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
            }
            else
            {
                plainText = transform.TransformFinalBlock(cipherText, 0, cipherText.Length);
            }

            return plainText;
        }



  /// Method that decrypts the data for Agency System based on the symmetric key that
        /// has been encrypted with RSA Algorithm
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void soDecryptData_Click(object sender, EventArgs e)
        {
            Byte[] symmetricKey = Convert.FromBase64String(soDecryptedSymmetricKeyTB.Text);
            SetupAesCipher(symmetricKey);
            soDecryptedSensitiveData_TB.Text = DecryptMessageToString(Convert.FromBase64String(soEncryptedSPIData_TB.Text));
        }
```