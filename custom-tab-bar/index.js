Component({
  data: {
    selected: 1,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/service/service",
      iconPath: "",
      selectedIconPath: "",
      showIcon: false,
      text: "服务"
    },
    {
      pagePath: "/pages/xidCode/xidCode",
      iconPath: "",
      selectedIconPath: "",
      showIcon: false,
      text: "xid"
    },
    {
      pagePath: "/pages/my/my",
      iconPath: "",
      selectedIconPath: "",
      showIcon: false,
      text: "我的"
    }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const currentPage = getCurrentPages()[getCurrentPages().length - 1]
      //如果冻结禁止跳转
      if (currentPage.data.isFreeze) {
        wx.showModal({
          title: '提示',
          content: '是否解冻该雄安数字身份？',
        })
        
        return
      } 

      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})