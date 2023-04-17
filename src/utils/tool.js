module.exports = Tool = {
    /**
     * 空校验 null或""都返回true
     */
    isEmpty: function (obj) {
        if ((typeof obj == 'string')) {
            return !obj || obj.replace(/\s+/g, "") == ""
        } else {
            return (!obj || JSON.stringify(obj) === "{}" || obj.length === 0);
        }
    },

    /**
     * 非空校验
     */
    isNotEmpty: function (obj) {
        return !this.isEmpty(obj);
    },

    /**
     * 长度校验
     */
    isLength: function (str, min, max) {
        return $.trim(str).length >= min && $.trim(str).length <= max;
    },

    /**
     * 时间格式化，date为空时取当前时间
     */
    dateFormat: function (format, date) {
        let result;
        if (!date) {
            date = new Date();
        }
        const option = {
            "y+": date.getFullYear().toString(),        // 年
            "M+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "h+": date.getHours().toString(),           // 时
            "m+": date.getMinutes().toString(),         // 分
            "s+": date.getSeconds().toString()          // 秒
        };
        for (let i in option) {
            result = new RegExp("(" + i + ")").exec(format);
            if (result) {
                format = format.replace(result[1], (result[1].length == 1) ? (option[i]) : (option[i].padStart(result[1].length, "0")))
            }
        }
        return format;
    },

    /**
     * 10进制转62进制
     * @param number
     * @returns {string}
     * @private
     */
    _10to62: function (number) {
        let chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
        let radix = chars.length;
        let arr = [];
        do {
            let mod = number % radix;
            number = (number - mod) / radix;
            arr.unshift(chars[mod]);
        } while (number);
        return arr.join('');
    },
    formatSize: function (limit) {
        let size = "";
        if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
            size = limit.toFixed(2) + "B"
        } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
            size = (limit / 1024).toFixed(2) + "KB"
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "MB"
        } else {                                            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
        }

        let sizeStr = size + "";                        //转成字符串
        let index = sizeStr.indexOf(".");                    //获取小数点处的索引
        let dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
        if (dou == "00") {                                //判断后两位是否为00，如果是则删除00
            return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
        }
        return size;
    }
};