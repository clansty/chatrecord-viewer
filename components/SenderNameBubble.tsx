import styles from '../styles/Bubble.module.scss'
import classNames from 'classnames'

export default function SenderNameBubble({name}: { name: string }) {
    return <div className={classNames(styles.container, styles.senderName)}>
        {name}
    </div>
}
