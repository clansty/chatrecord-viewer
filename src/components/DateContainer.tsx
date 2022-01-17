import DateGroup from '../types/DateGroup'
import styles from '../styles/DateContainer.module.scss'
import SenderContainer from './SenderContainer'

export default function DateContainer({group}: { group: DateGroup }) {
    return <div>
        <div className={styles.date}>
            <span>
                {group.date}
            </span>
        </div>
        {group.messages.map(e => <SenderContainer group={e} key={e.id}/>)}
    </div>
}
