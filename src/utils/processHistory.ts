import {ForwardMessage} from 'oicq'
import DateGroup from '../types/DateGroup'
import SenderGroup from '../types/SenderGroup'
import formatDate from './formatDate'
import {TelegramMessage} from '../types/telegram'

export default function processHistory(history: ForwardMessage[] | TelegramMessage[]) {
  const data: DateGroup[] = []
  let currentDateGroup: DateGroup | undefined
  let currentSenderGroup: SenderGroup | undefined
  for (let i = 0; i < history.length; i++) {
    const current = history[i]
    const time = 'time' in current ? current.time : current.forward_date || current.date
    const msgDate = new Date(time * 1000)
    if (!currentDateGroup || formatDate('yyyy/M/d', msgDate) !== currentDateGroup.date) {
      // 推入所有数据
      if (currentSenderGroup)
        // 必有 currentDateGroup
        currentDateGroup!.messages.push(currentSenderGroup)
      if (currentDateGroup)
        data.push(currentDateGroup)
      currentSenderGroup = undefined
      // 开始新的一天
      currentDateGroup = {
        date: formatDate('yyyy/M/d', msgDate),
        messages: [],
      }
    }
    let senderId = 0 as number | string, username = '', avatar = ''
    if ('user_id' in current) {
      senderId = current.user_id
      username = current.nickname
      avatar = `https://q1.qlogo.cn/g?b=qq&nk=${senderId}&s=140`
    }
    else if (current.forward_from) {
      senderId = current.forward_from.id
      username = current.forward_from.first_name + (current.forward_from.last_name ? ' ' + current.forward_from.last_name : '')
      avatar = `https://tg-avatars.init.ink/avatar/${senderId}`
    }
    else if (current.forward_sender_name) {
      senderId = username = current.forward_sender_name
    }
    else if (current.forward_from_chat) {
      senderId = current.forward_from_chat.id
      username = current.forward_from_chat.first_name + (current.forward_from_chat.last_name ? ' ' + current.forward_from_chat.last_name : '')
    }
    else if (current.from) {
      senderId = current.from.id
      username = current.from.first_name + (current.from.last_name ? ' ' + current.from.last_name : '')
      avatar = `https://tg-avatars.init.ink/avatar/${senderId}`
    }

    if (!currentSenderGroup || senderId !== currentSenderGroup.senderId) {
      if (currentSenderGroup) {
        // 不是一开始的情况
        currentDateGroup!.messages.push(currentSenderGroup)
      }
      // 开始一个新的发送者分组
      currentSenderGroup = {
        id: i,
        senderId,
        username,
        messages: [],
        avatar,
      }
    }
    currentSenderGroup.messages.push(current)
  }
  // 收工啦
  if (currentSenderGroup)
    currentDateGroup!.messages.push(currentSenderGroup)
  if (currentDateGroup)
    data.push(currentDateGroup)
  return data
}
