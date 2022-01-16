import styles from '../styles/Bubble.module.scss'

export default function SenderNameBubble({name}: { name: string }) {
    return <div className={`${styles.container} ${styles.senderName}`}>
        {name}
    </div>
}
