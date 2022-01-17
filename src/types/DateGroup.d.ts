import SenderGroup from './SenderGroup'

// 同一天的消息，用于合并日期
type DateGroup = {
    date: string,
    messages: SenderGroup[]
}

export default DateGroup
