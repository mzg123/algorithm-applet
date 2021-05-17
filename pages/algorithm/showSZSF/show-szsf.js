

var creatQR = require('../../../utils/creatQR')

const app = getApp()
let myClock;
let myTime;
Component({
   //组件静态配置
  properties: {
    sdkData:{
      type:Object,
      value:{}
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    szID:'',
    szDate:'',
    currentDate:'',
    isRefresh:true,
    initData:{
      userName: app.userInfo.pName,
      imgSrc: '/rlnL58+qT+Agn3OB8o9OKCAug5auAbxbq6AupGNb7F0My6Auodlc/tSKK6AgulVciJlviCA/qqqqqqqqr+AAIZ0DiSWCAAAi6U3t/Iun/yAyNbxo2l8Oj0A7iSEfa0SUTYA0b60g0KwTeOA5wgkcmoqcqIAAIIv8cFl8SUA66e3ciyLATeAqZs/yAeRaKYA3uw4BsJoSMoAMTcaNH9i+lsAstTSkDjCWDYAWfOgzmK0TcCAQyAv9zFrurkA0FlCMTwKmCwAQ0klj22WGHsAhZI8gyKwSQaA9spZ0kTpZsuAoJnnsMI97yUA/xP8P62GwDYAIDzr3wbQfaaAi50E972EvK4AKE+2Ioyrl7QAT/5Pz+3bmP6AmNHVWjelC4uAyo9QcrWJsKoA6POGsiDWpokA3/wJj+hSAfsAJShiz+aCaHSAlzmp8p4lLxoAuEsoK61dtp8Av34wT0zawLSAVMs0ojD2WLWA68wxVPwMPssA6RCiPqRYY5kAwz/SdQwb2DIAFGRws3CwaLSA3lNOELM7fpsApGiOe7Xxt3EAnggIBR3SWLyAiXPKNiayCjWA80JZUtPgHjsAgda36VVs1dMAEi6UzRSLQByAyexgjjLwaDmAigmeELjKwf4A3AFBo88APocAN/xyPwwK0PCAkWsya+CwLLeAao81U+5psfuAAMeVtih+04kA/vckvqQHWaiAgiTQeiKwaYuAuofg5/wrpvoAuhTX+r5Fr/wAukowsNwGEKeAggyF5ADWb70A/toptIplP8IA'
    },
    clock:60,
    showError:false,
    freeze:false
  },
  hide(){
    clearInterval(myTime);
    clearInterval(myClock);
  },
  ready(){
    const  name= app.userInfo.pName
    const nameArr = name.split('')
    this.setData({
      'initData.userName': '**' + nameArr[nameArr.length - 1]
    })
    //wx.showLoading();
    this.showQRcode();
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
    clearInterval(myTime);
    clearInterval(myClock);
  },
  methods:{
    startClock(){
      myTime=setInterval(()=>{
        this.getNowFormatDate();
        if(this.data.clock==0){
          this.refreshQRcode();
        }else{
          let count=parseInt(this.data.clock)-1;
          this.setData({
            clock:count
          })
        }
      },1000);
      myClock=setInterval(()=>{
        this.refreshQRcode();
        this.setData({
          clock:60
        })
      },60000);
    },
    resetClock(){
      clearInterval(myTime);
      clearInterval(myClock);
      this.startClock();
    },
    //刷新二维码
    refreshQRcode(){
      const ctx = wx.createCanvasContext('szsfqrcode',this);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 300, 300);
      ctx.draw(true);
      this.triggerEvent('CallBack', {})
      this.setData({
        clock:60
      });
      // this.getNowFormatDate();
      const imgSrc = this.data.initData.imgSrc
      // this.setData({
      //   'initData.imgSrc': imgSrc + '998'
      // })
      this.showQRcode()
      this.resetClock();
    },
    //渲染二维码
    showQRcode(){
      let imgQR=this.data.initData.imgSrc;
        if (!imgQR) return;
        wx.hideLoading();
        this.resetClock();
        const ctx = wx.createCanvasContext('szsfqrcode',this)
        creatQR.drawCertQrCode({
          ctx:ctx,
          codeContent:imgQR,
          width:65, // parseInt(this.data.initData.imgWidth),
          multi:4
        })
      /**
       * 以下是新wx的canvas接口解决方案，真机模式下会出现白屏，渲染失败
       */
    },
    getNowFormatDate() {
      var date = new Date();
      var line = "-";
      var colon = ":";
      var month = date.getMonth() + 1;
      var curDate = date.getDate();
      var curHours = date.getHours();
      var curMinutes = date.getMinutes();
      var curSeconds = date.getSeconds();
    
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (curDate >= 0 && curDate <= 9) {
        curDate = "0" + curDate;
      }
      if (curHours >= 0 && curHours <= 9) {
        curHours = "0" + curHours;
      }
      if (curMinutes >= 0 && curMinutes <= 9) {
        curMinutes = "0" + curMinutes;
      }
      if (curSeconds >= 0 && curSeconds <= 9) {
        curSeconds = "0" + curSeconds;
      }
    
      var currentdate = date.getFullYear() + line + month + line + curDate
              + " " + curHours + colon + curMinutes
              + colon + curSeconds;
      this.setData({
        currentDate:currentdate
      });
      //return currentdate;
    }
  }
})
