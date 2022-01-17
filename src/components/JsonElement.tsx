import BilibiliMiniApp from '../types/BilibiliMiniApp'
import StructMessageCard from '../types/StructMessageCard'

export default function ({json}: { json: string }) {
    const jsonObj = JSON.parse(json)
    if (jsonObj.app === 'com.tencent.mannounce') {
        try {
            const title = atob(jsonObj.meta.mannounce.title)
            const content = btoa(jsonObj.meta.mannounce.text)
            return <div>
                <p><strong>{title}</strong></p>
                <p>{content}</p>
            </div>
        } catch (err) {
            return <div>[群公告]</div>
        }
    }
    const biliRegex = /(https?:\\?\/\\?\/b23\.tv\\?\/\w*)\??/
    const zhihuRegex = /(https?:\\?\/\\?\/\w*\.?zhihu\.com\\?\/[^?"=]*)\??/
    const biliRegex2 = /(https?:\\?\/\\?\/\w*\.?bilibili\.com\\?\/[^?"=]*)\??/
    const jsonLinkRegex = /{.*"app":"com.tencent.structmsg".*"jumpUrl":"(https?:\\?\/\\?\/[^",]*)".*}/
    const jsonAppLinkRegex = /"contentJumpUrl": ?"(https?:\\?\/\\?\/[^",]*)"/
    let appurl = ''
    if (biliRegex.test(json))
        appurl = json.match(biliRegex)![1].replace(/\\\//g, '/')
    else if (biliRegex2.test(json))
        appurl = json.match(biliRegex2)![1].replace(/\\\//g, '/')
    else if (zhihuRegex.test(json))
        appurl = json.match(zhihuRegex)![1].replace(/\\\//g, '/')
    else if (jsonLinkRegex.test(json))
        appurl = json.match(jsonLinkRegex)![1].replace(/\\\//g, '/')
    else if (jsonAppLinkRegex.test(json))
        appurl = json.match(jsonAppLinkRegex)![1].replace(/\\\//g, '/')
    if (appurl) {
        try {
            const meta = (jsonObj as BilibiliMiniApp).meta.detail_1 || (jsonObj as StructMessageCard).meta.news
            let previewUrl = meta.preview
            if (!previewUrl.toLowerCase().startsWith('http')) {
                previewUrl = 'https://' + previewUrl
            }
            return <a href={appurl}>
                <p><strong>{meta.title}</strong></p>
                <img src={previewUrl} alt={meta.title} referrerPolicy="no-referrer" width={200}/>
                <p>{meta.desc}</p>
            </a>
        } catch (e) {
        }
    }
    return <div>[JSON 卡片]</div>
}
