/*
 * @Description  : aes
 * @Author       : 王占领
 * @Date         : 2022-02-23 10:33:11
 * @LastEditTime : 2022-02-23 11:44:13
 * @LastEditors  : 王占领
 */
import CryptoJS from 'crypto-js/crypto-js'
import randomKey from './RandomKey';
const AESKEY = randomKey.getKey(64)
const AESIV = randomKey.getKey(32)
const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(AESKEY).toString())
const iv = CryptoJS.enc.Utf8.parse(
   CryptoJS.MD5(AESIV)
      .toString()
      .substr(0, 16)
)
const options = {
   iv: iv,
   mode: CryptoJS.mode.CBC,
   padding: CryptoJS.pad.ZeroPadding
}
export function encryption (obj) {
   try {
      const aesResult = CryptoJS.AES.encrypt(JSON.stringify(obj), key, options).toString()
      return aesResult
   } catch (error) {
      return ''
   }
}
export function decryption (str) {
   try {
      const decryptResult = CryptoJS.AES.decrypt(str, key, options)
      const resData = decryptResult.toString(CryptoJS.enc.Utf8) // 因为解析出来是一个字符串，又转换成为字符串，所以需要反序列化两次
      return JSON.parse(resData)
   } catch (error) {
      return null
   }
}
