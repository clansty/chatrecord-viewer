import styles from '../styles/SenderContainer.module.scss'
import SenderGroup from '../types/SenderGroup'
import getUserAvatarUrl from '../utils/getUserAvatarUrl'
import SenderNameBubble from './SenderNameBubble'
import MessageBubble from './MessageBubble'

export default function SenderContainer({group}: { group: SenderGroup }) {
    return <div className={styles.container}>
        <div className={styles.avatarContainer}>
            <img
                src={getUserAvatarUrl(group.senderId)}
                alt={`头像：${group.senderId}`}
                referrerPolicy="no-referrer"
            />
        </div>
        <div className={styles.mainContainer}>
            <SenderNameBubble name={group.username}/>
            {group.messages.map(e => <MessageBubble message={e} key={e.time}/>)}
        </div>
    </div>
}
