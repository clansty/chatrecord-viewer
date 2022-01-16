import {MessageElem} from 'oicq'
import getImageUrlByMd5 from '../utils/getImageUrlByMd5'
import {Image} from 'antd'
import JsonElement from './JsonElement'
import XmlElement from './XmlElement'
import styles from '../styles/MessageElement.module.sass'

export default function MessageElement({elem}: { elem: MessageElem }) {
    switch (elem.type) {
        case 'text':
        case 'face':
        case 'sface':
        case 'at':
            return <div className={styles.messageContent}>{elem.text}</div>
        case 'image':
        case 'flash':
            let md5
            if (typeof elem.file === 'string') {
                md5 = elem.file.substr(0, 32)
                if (!/([a-f\d]{32}|[A-F\d]{32})/.test(md5))
                    md5 = undefined
            }
            return <Image
                width={200}
                alt=""
                src={md5 ? getImageUrlByMd5(md5) : elem.url}
                referrerPolicy="no-referrer"
            />
        case 'video':
            return <div>[视频]</div>
        case 'record':
            return <div>[语音]</div>
        case 'file':
            return <div>[文件] {elem.name}</div>
        case 'location':
            return <div>[地址] {elem.name}<br/>{elem.address}</div>
        case 'bface':
            let url = `https://gxh.vip.qq.com/club/item/parcel/item/${elem.file.substr(
                0,
                2,
            )}/${elem.file.substr(0, 32)}/300x300.png`
            return <img src={url} alt={elem.text} referrerPolicy="no-referrer" width={200}/>
        case 'rps':
            return <div>[猜拳]</div>
        case 'dice':
            return <div>[骰子]</div>
        case 'json':
            return <JsonElement json={elem.data}/>
        case 'xml':
            return <XmlElement xml={elem.data}/>
        default:
            return <></>
    }
}
