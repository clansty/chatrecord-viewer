import type {ForwardMessage} from 'icqq'
import {TelegramMessage} from './telegram'

// 同一个人连续的一组消息，用于合并头像
type SenderGroup = {
  id: number
  username: string
  senderId: number | string
  messages: (ForwardMessage | TelegramMessage)[]
  avatar: string
}

export default SenderGroup
