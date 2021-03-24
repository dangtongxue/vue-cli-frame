const pulic = {
  emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, // 邮箱正则校验
  phone: /^1[3456789]\d{9}$/, // 手机号正则校验
  companyName: /[^A-Za-z0-9\u4e00-\u9fa5()（）]/, // 企业名称
  blicUscc: /[^A-Za-z0-9]+/, // 统一社会信用编码
  pinyin: /[^A-Za-z]+/, // 统一社会信用编码
  chinese: /[^\u4e00-\u9fa5]+/, // 中文
  password: /^(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*()])[a-z\d#@!~%^&*()]{6,16}/, // 密码
  date: (format, str) => {
    if (str === '-') return ''
    if (!str) return ''
    const oDate = new Date(str * 1)
    const oYear = oDate.getFullYear()
    const oMonth = oDate.getMonth() + 1
    const oDay = oDate.getDate()
    // ,
    const oHour = oDate.getHours()
    const oMin = oDate.getMinutes()
    const oSec = oDate.getSeconds()
    let oTime = ''
    if (format === 'yyyy-mm-dd') {
      // oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
      oTime = oYear + '-' + pulic.getzf(oMonth) + '-' + pulic.getzf(oDay) // 最后拼接时间
    } else if (format === 'yyyy/mm/dd') {
      // oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
      oTime = oYear + '/' + pulic.getzf(oMonth) + '/' + pulic.getzf(oDay)
    } else if (format === 'yyyy-mmdd hh:mm:ss') {
      // oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
      oTime = oYear + '-' + pulic.getzf(oMonth) + '-' + pulic.getzf(oDay) + ' ' + pulic.getzf(oHour) + ':' + pulic.getzf(oMin) + ':' + pulic.getzf(oSec)
    }
    return oTime
  },
  // 补0操作
  getzf: (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num
    }
    return num
  },
  // 空值转换为 ''
  valValid: (val) => {
    if (!val || val === '' || val === null || val === undefined) {
      return ''
    }
    return val
  },
  // 控制转换为'-'
  valValidCross: (val) => {
    if (!val || val === '' || val === null || val === undefined) {
      return '-'
    }
    return val
  },
  // 金额逗号拼接
  toThousands (toThousandsdata) {
    toThousandsdata = toThousandsdata + ''
    const nums = toThousandsdata.split('.')
    let num = (nums[0] || 0).toString()
    let result = ''
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result
      num = num.slice(0, num.length - 3)
    }
    if (num) {
      result = num + result
    }
    if (nums.length > 1) {
      result += '.' + nums[1]
    }
    return result
  }
}
export default pulic
