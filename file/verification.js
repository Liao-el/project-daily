/**
 * @description 检验密码强度
 * @param rule
 * @param value
 * @param callback
 */
export const checkPassword_rule = (rule, value) => {
    if (!checkPassword(value)) {
        return Promise.reject('8-16个字符，包含大小写字母和数字,不能包含特殊字符');
    } else {
        return Promise.resolve();
    }
};

/**
 * 至少4-32个字符，不能包含汉字、中文符号
 * @param {*} str
 * @returns {boolean}
 */
export const chineseReg = /[\u4E00-\u9FFF]|[^\x00-\xff]/g;
export const checkChinese = (_rule, value) => {
    if (value.match(chineseReg)) {
        return Promise.reject('不能包含汉字、中文符号');
    } else if (value.length < 4 && value.length > 32) {
        return Promise.reject('至少4-32个字符');
    } else {
        return Promise.resolve();
    }
};

// 不能输入表情
export const replaceEmo = str => {
    if (!str) {
        return;
    }
    const regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
    return str.replace(regStr, '');
};

/**
 * 隐藏敏感信息
 * @param {*} str 需要隐藏的内容
 * @param {*} startLen 开始
 * @param {*} endLen 结尾
 */
export function hiddenPart(str, startLen, endLen) {
    if (!str) return;
    let len = str.length - startLen - endLen;
    if (len == 0) len = 1;
    let star = '';
    for (let i = 0; i < len; i++) {
        star += '*';
    }
    return str.substring(0, startLen) + star + str.substring(str.length - endLen);
}

/**
 * @description "至少8-16个字符，至少1个大写字母，1个小写字母和1个数字,不能包含特殊字符"
 * @param str
 * @returns {boolean}
 */
export const checkPassword = str => {
    var reg1 = /^[a-zA-Z0-9]{8,16}$/;
    return reg1.test(str) && /\d+/.test(str) && /[a-z]+/.test(str) && /[A-Z]+/.test(str);
};

export const userNameReg = /^[A-Za-z][A-Za-z0-9_]{4,19}$/;

export const intReg = /^[1-9]+[0-9]*]*$/;

export const dbReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;

/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
export const isEmail = function (str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
};
export const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export const idCardReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
export const isIdCard = function (str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
};

/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */

export const isPhoneNum = function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/.test(str);
};

export const phoneReg = /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;

/**
 * @description '密码6-16位,包含数字，大小写字母，符号'
 * @param str
 * @returns {boolean}
 */
export const isPwd = function (str) {
    return /^[A-Za-z0-9]\w{5,15}$/.test(str);
};

/**
 *  选择省市区，至少选择一个
 * @param _rule
 * @param value
 * @returns {Promise<never>|Promise<void>}
 */
export const checkArea = (_rule, value) => {
    if (value == undefined || !value.length) {
        return Promise.reject('地区必填');
    }
    return Promise.resolve();
};

/**
 *
 * @desc   判断是否为车牌号码
 * @param  {String}  str
 * @return {Boolean}
 */
export const carNumberReg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$)/;
export const checCarNumber = value => {
    return carNumberReg.test(value);
};

// 判断文件url类型
export const getMediaType = url => {
    try {
        let splitList = url.split('.');
        let ext = splitList[splitList.length - 1];
        let imgTypeList = ['xbm', 'tif', 'pjp', 'svgz', 'jpg', 'jpeg', 'ico', 'tiff', 'gif', 'svg', 'jfif', 'webp', 'png', 'bmp', 'pjpeg', 'avif'];
        // video标签支持格式
        let videoTypeList = [
            'mp4',
            'MP4',
            'ogg',
            'mkv',
            'mov',
            'webm',
            //   "m2v",
            //   "rmvb",
            //   "wmv",
            //   "avi",
            //   "flv",
            //   "m4v",
        ];
        if (imgTypeList.includes(ext)) return 'img';
        if (videoTypeList.includes(ext)) return 'video';
        else return url;
    } catch (err) {
        return url;
    }
};

export const random_string = len => {
    len = len || 32;
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz12345678',
        maxPos = chars.length,
        pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return pwd;
};

export const random_string_num = len => {
    len = len || 32;
    let chars = '0123456789',
        maxPos = chars.length,
        pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return pwd;
};
