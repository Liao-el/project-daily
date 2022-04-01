/**
 * @Description: 国密算法
 * @Doc https://github.com/byte-fe/gm-crypto
 */
import { SM2} from 'gm-crypto'


/**
 * @description sm2 加密
 * @param originalData
 * @returns {*}
 */
export const encryptedData = (originalData)=>{
    let publicKey = '048e3902f9b50284732592b589030d477725067dba093e3100de8005c2463ad737e6438a9d579601343f7eafeb22fcf4acda52c74b5207b9689756fb93f82ae243 '
    let encryptedData = SM2.encrypt(originalData, publicKey, {
        inputEncoding: 'utf8',
        outputEncoding: 'base64',
        pc:true,
    })
    return encryptedData
}


/**
 * @description sm2 解密
 * @param encryptedData
 * @returns {*}
 */
export const decryptedData = (encryptedData)=>{
    let privateKey = '491d1f178314816fff2de2663dea4ac15ecb594a14d1ee542fb68c024d5b64d5 '
    const decryptedData = SM2.decrypt(encryptedData, privateKey, {
        inputEncoding: 'base64',
        outputEncoding: 'utf8',
        pc:true,
    })
    return decryptedData
}
