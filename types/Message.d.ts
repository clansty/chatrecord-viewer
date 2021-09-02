import MessageFile from './MessageFile'

// 单条消息
type Message = {
    content: string
    file?: MessageFile
    time: string
    id: number
}

export default Message
