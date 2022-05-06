import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptService {

  secretKey = "05AIEg48ncwWyO4uFzMwXt2IVBm_ryzW1Kg-fmRbsoqki_f3KgN4yE_hT9uaHpiCTkKP02l1wNez4ciLW9RLl7ED0IBOXERjU4h5laipzZOIjKOYIWbWqt6RP5RnC7jJxWsD8piAGZV61hQckBVzkKpu2xCgyn44ddBleL7UkxM";
  constructor() { }

  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}