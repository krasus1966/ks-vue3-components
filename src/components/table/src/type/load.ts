import {Ref} from "vue";

export interface LoadConfig {
  isLoad: Ref<boolean>,
  // 是否全屏
  fullscreen: boolean,
  // 锁定屏幕
  lock: boolean,
  // 文本
  text:string,
  // 背景颜色
  background: string
}
