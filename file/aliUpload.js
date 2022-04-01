import http from "./http";
import OSS from "ali-oss";
/**
 * 随机生成文件名
 * @param len
 * @return {string}
 */
let random_string = (len) => {
    len = len || 32;
    let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz12345678",
        maxPos = chars.length,
        pwd = "";
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return pwd;
};

/**
 *  阿里云 oss 文件上传
 * @param file 文件
 * @param success 成功回调
 * @param error 失败回调
 * @param progress 上传进度
 * @param execution 返回oss 实例，用于取消上传请求 client.cancel();
 */
const aliUpload = ({ file, success, error, progress, execution }) => {
    http.get("/mgr/common/upAndDownLoad/getOssToken")
        .then((res) => {
            if (res.code == 200) {
                let {
                    accessKeyId,
                    accessKeySecret,
                    bucket,
                    region,
                    stsToken,
                } = res.data;
                let client = new OSS({
                    region: region,
                    accessKeyId: accessKeyId,
                    accessKeySecret: accessKeySecret,
                    stsToken: stsToken,
                    bucket: bucket,
                    secure: true,
                });
                execution && execution(client);
                // 文件名
                let date = new Date();
                var zero = function (value) {
                    if (value < 10) {
                        return "0" + value;
                    }
                    return value;
                };
                let time =
                    "" +
                    date.getFullYear() +
                    zero(date.getMonth() + 1) +
                    zero(date.getDate());
                const random_name =
                    random_string(6) +
                    "_" +
                    new Date().getTime() +
                    "_" +
                    file.name;
                // dev=开发环境、test=测试环境、prod=正式环境
                let env = import.meta.env.MODE;
                let savePath = "";
                if (env == "development") {
                    savePath = "dev";
                }
                // else if (env == "production") { // 准上线再放开，测试服务器构建的是生产环境的命令
                //     savePath = "prod";
                // }
                else {
                    savePath = "test";
                }
                let storeAs = savePath + time + "/" + random_name;
                // 上传
                client
                    .multipartUpload(storeAs, file, {
                        //获取进度条的值
                        progress: function (p) {
                            progress && progress(p * 100);
                        },
                    })
                    .then(function (result) {
                        let url = result.res.requestUrls[0].split("?").shift();
                        success && success(url);
                    })
                    .catch(function (err) {
                        error && error(err);
                    });
            } else {
                error && error();
            }
        })
        .catch(() => {
            error && error();
        });
};

export default aliUpload;


// 使用
const beforeUpload = (file) => {
    uploadInfo.uploadLoading = true;
    uploadInfo.progress = ''
    aliUpload({
        file: file.file,
        progress: (p) => {
            console.log(p)
            uploadInfo.progress =  p < 100 ? ` ${parseInt(p)}%` : '';
        },
        success: (url) => {
            uploadInfo.uploadLoading = false;
            commonData.formData.planUrl = url;
        },
        error: (err) => {
            uploadInfo.uploadLoading = false;
            if (err && err.name != "cancel") {
                message.error("文件上传出错,请重试!");
            }
        }
    });
    return false;
};
