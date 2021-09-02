import styles from '../styles/Bubble.module.scss'
import Message from '../types/Message'

export default function MessageBubble({message}: { message: Message }) {
    return <div className={styles.container}>
        <div>
            {message.content}
        </div>
        <div className={styles.time}>
            {message.time}
        </div>
    </div>
}
