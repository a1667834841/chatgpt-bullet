export const setting = {
  continuousDialogue: true,
  archiveSession: false,
  openaiAPIKey: "",
  openaiAPITemperature: 60,
  password: "",
  systemRule: "",
  bullet: true
}

export const message = `
# 公告
> 目前网站在使用ChatGPT账号的时候发现免费额度已经快用完啦！
😱一旦额度耗尽，可能就再也不能继续使用这个网站了，这可怎么办呢？
😢但是我相信总有解决办法的！
如果有哪位小仙女/小哥哥手里的ChatGPT账号免费额度也快要过期了，而且又不用api的话，能不能麻烦你们给我续一下天数呢？这个小小的举动对我来说就像一份大礼！
🎁如果你们有意愿的话，可以加入群来联系我哦！特别感谢大家的支持和帮助！

- **非常感谢所有已提供apikey的用户**
- 至理名言
- 德鲁大叔
- 子非鱼
- [[Shift]] + [[Enter]] 换行。开头输入 [[/]] 或者 [[空格]] Prompt 预设。[[↑]] 可编辑最近一次提问。点击名称滚动到顶部，点击输入框滚动到底部。`


export type Setting = typeof setting

export const resetContinuousDialogue = false
