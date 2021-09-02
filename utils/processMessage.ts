import {MessageElem} from 'oicq'
import Message from '../types/Message'
import path from 'path'
import mime from './mime'
import {base64decode} from 'nodejs-base64/src/index'
import BilibiliMiniApp from '../types/BilibiliMiniApp'
import StructMessageCard from '../types/StructMessageCard'
import getImageUrlByMd5 from './getImageUrlByMd5'

export default async function processMessage(oicqMessage: MessageElem[]) {
    if (!Array.isArray(oicqMessage))
        oicqMessage = [oicqMessage]
    let lastType
    const message: Message = {
        id: 0,
        content: '',
        time: '',
    }
    for (let i = 0; i < oicqMessage.length; i++) {
        const m = oicqMessage[i]
        let appurl
        let url
        switch (m.type) {
            case 'at':
                if (lastType === 'reply')
                    break
            // noinspection FallThroughInSwitchStatementJS 确信
            case 'text':
                message.content += m.data.text
                break
            case 'flash':
            case 'image':
                url = m.data.url!
                message.file = {
                    type: 'image/jpeg',
                    url,
                }
                if (typeof m.data.file === 'string') {
                    message.file.md5 = m.data.file.substr(0, 32)
                }
                break
            case 'bface':
                url = `https://gxh.vip.qq.com/club/item/parcel/item/${m.data.file.substr(
                    0,
                    2,
                )}/${m.data.file.substr(0, 32)}/300x300.png`
                message.file = {
                    type: 'image/webp',
                    url,
                }
                break
            case 'file':
                message.content += m.data.name
                message.file = {
                    type: mime(path.extname(m.data.name)),
                    size: m.data.size,
                    url: m.data.url,
                    name: m.data.name,
                    fid: m.data.fid,
                    md5: m.data.md5,
                }
                break
            case 'share':
                message.content += m.data.url
                break
            case 'json':
                const json: string = m.data.data
                const jsonObj = JSON.parse(json)
                if (jsonObj.app === 'com.tencent.mannounce') {
                    try {
                        const title = base64decode(jsonObj.meta.mannounce.title)
                        const content = base64decode(jsonObj.meta.mannounce.text)
                        message.content = title + '\n\n' + content
                        break
                    } catch (err) {
                    }
                }
                const biliRegex = /(https?:\\?\/\\?\/b23\.tv\\?\/\w*)\??/
                const zhihuRegex = /(https?:\\?\/\\?\/\w*\.?zhihu\.com\\?\/[^?"=]*)\??/
                const biliRegex2 = /(https?:\\?\/\\?\/\w*\.?bilibili\.com\\?\/[^?"=]*)\??/
                const jsonLinkRegex = /{.*"app":"com.tencent.structmsg".*"jumpUrl":"(https?:\\?\/\\?\/[^",]*)".*}/
                const jsonAppLinkRegex = /"contentJumpUrl": ?"(https?:\\?\/\\?\/[^",]*)"/
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
                        const meta = (<BilibiliMiniApp>jsonObj).meta.detail_1 || (<StructMessageCard>jsonObj).meta.news
                        message.content = meta.desc + '\n\n'

                        let previewUrl = meta.preview
                        if (!previewUrl.toLowerCase().startsWith('http')) {
                            previewUrl = 'https://' + previewUrl
                        }
                        message.file = {
                            type: 'image/jpeg',
                            url: previewUrl,
                        }
                    } catch (e) {
                    }

                    message.content += appurl
                }
                else {
                    message.content = '[JSON]'
                }
                break
            case 'xml':
                const urlRegex = /url="([^"]+)"/
                const md5ImageRegex = /image md5="([A-F\d]{32})"/
                if (urlRegex.test(m.data.data))
                    appurl = m.data.data.match(urlRegex)![1].replace(/\\\//g, '/')
                if (m.data.data.includes('action="viewMultiMsg"')) {
                    message.content += '[Forward multiple messages]'
                    const resIdRegex = /m_resid="([\w+=/]+)"/
                    if (resIdRegex.test(m.data.data)) {
                        const resId = m.data.data.match(resIdRegex)![1]
                        console.log(resId)
                        message.content = `[Forward: ${resId}]`
                    }
                }
                else if (appurl) {
                    appurl = appurl.replace(/&amp;/g, '&')
                    message.content = appurl
                }
                else if (md5ImageRegex.test(m.data.data)) {
                    const imgMd5 = appurl = m.data.data.match(md5ImageRegex)![1]
                    url = getImageUrlByMd5(imgMd5)
                    message.file = {
                        type: 'image/jpeg',
                        url,
                    }
                }
                else {
                    message.content += '[XML]'
                }
                break
            case 'face':
                message.content += `[Face: ${m.data.id}]`
                break
            case 'video':
                message.file = {
                    type: 'video/mp4',
                    url: m.data.url!,
                }
                break
            case 'record':
                message.content += `[Audio}]`
                break
        }
        lastType = m.type
    }
    return message
}
