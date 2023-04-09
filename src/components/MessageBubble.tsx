import {ForwardMessage} from 'oicq'
import styles from '../styles/Bubble.module.scss'
import formatDate from '../utils/formatDate'
import MessageElement from './MessageElement'
import {TelegramMessage} from '../types/telegram'

export default function MessageBubble({message}: { message: ForwardMessage | TelegramMessage }) {
  return <div className={styles.container}>
    {'message' in message ? message.message.map((i, k) => <MessageElement elem={i} key={k}/>) :
      <>
        {message.photo && <MessageElement elem={{
          type: 'image',
          file: null,
          url: `https://tg-avatars.init.ink/files/${message.photo[message.photo.length - 1].file_id}`,
        }}/>}
        {message.sticker && <MessageElement elem={{
          type: 'image',
          file: null,
          url: `https://tg-avatars.init.ink/files/${message.sticker.file_id}`,
        }}/>}
        {message.text && <MessageElement elem={{
          type: 'text',
          text: message.text,
        }}/>}
      </>
    }

    <div className={styles.time}>
      {formatDate('hh:mm', new Date(('time' in message ? message.time : message.forward_date || message.date) * 1000))}
    </div>
  </div>
}

