import {ForwardMessage} from 'oicq'
import styles from '../styles/Bubble.module.scss'
import formatDate from '../utils/formatDate'
import MessageElement from './MessageElement'

export default function MessageBubble({message}: { message: ForwardMessage }) {
    return <div className={styles.container}>
        {message.message.map((i, k) => <MessageElement elem={i} key={k}/>)}
        <div className={styles.time}>
            {formatDate('hh:mm', new Date(message.time * 1000))}
        </div>
    </div>
}

