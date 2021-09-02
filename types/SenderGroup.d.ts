import Message from './Message'

// 同一个人连续的一组消息，用于合并头像
type SenderGroup={
    id: number
    username: string
    senderId: number
    messages: Message[]
}

export default SenderGroup
