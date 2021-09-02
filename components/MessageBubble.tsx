import styles from '../styles/Bubble.module.scss'
import Message from '../types/Message'
import MessageFile from './MessageFile'

export default function MessageBubble({message}: { message: Message }) {
    return <div className={styles.container}>
        {message.file && <MessageFile file={message.file}/>}
        <div>
            {message.content}
        </div>
        <div className={styles.time}>
            {message.time}
        </div>
    </div>
}
