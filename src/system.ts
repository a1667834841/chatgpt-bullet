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
## bullet-chatgpt
- 一个可以发送弹幕的chatgpt
`


export type Setting = typeof setting

export const resetContinuousDialogue = false
