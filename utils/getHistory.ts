import {bot, ensureOnline} from '../providers/oicqProvider'
import DateGroup from '../types/DateGroup'
import formatDate from './formatDate'
import SenderGroup from '../types/SenderGroup'
import processMessage from './processMessage'

export type ErrorRet = {
    error: true
    data: string
}
export type OkRet = {
    error: false
    data: DateGroup[]
}

export default async function getHistory(resId: string): Promise<OkRet | ErrorRet> {
    if (!await ensureOnline()) {
        return {
            error: true,
            data: '服务器离线',
        }
    }
    const history = await bot.getForwardMsg(resId)
    if (history.error || !history.data) {
        return {
            error: true,
            data: history.error ? history.error.message : 'no error returned',
        }
    }
    const data: DateGroup[] = []
    let currentDateGroup: DateGroup | undefined
    let currentSenderGroup: SenderGroup | undefined
    for (let i = 0; i < history.data.length; i++) {
        const current = history.data[i]
        const msgDate = new Date(current.time * 1000)
        if (!currentDateGroup || formatDate('yyyy/M/d', msgDate) !== currentDateGroup.date) {
            // 推入所有数据
            if (currentSenderGroup)
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
        const message = await processMessage(current.message)
        message.id = i
        message.time = formatDate('hh:mm', msgDate)
        currentSenderGroup.messages.push(message)
    }
    // 收工啦
    if (currentSenderGroup)
        currentDateGroup!.messages.push(currentSenderGroup)
    if (currentDateGroup)
        data.push(currentDateGroup)
    return {
        error: false,
        data,
    }
}
