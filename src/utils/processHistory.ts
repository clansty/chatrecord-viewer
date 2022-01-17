import {ForwardMessage} from 'oicq'
import DateGroup from '../types/DateGroup'
import SenderGroup from '../types/SenderGroup'
import formatDate from './formatDate'

export default function processHistory(history: ForwardMessage[]){
    const data: DateGroup[] = []
    let currentDateGroup: DateGroup | undefined
    let currentSenderGroup: SenderGroup | undefined
    for (let i = 0; i < history.length; i++) {
        const current = history[i]
        const msgDate = new Date(current.time * 1000)
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
        if (!currentSenderGroup || current.user_id !== currentSenderGroup.senderId) {
            if (currentSenderGroup) {
                // 不是一开始的情况
                currentDateGroup!.messages.push(currentSenderGroup)
            }
            // 开始一个新的发送者分组
            currentSenderGroup = {
                id: i,
                senderId: current.user_id,
                username: current.nickname,
                messages: [],
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
