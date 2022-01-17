import getImageUrlByMd5 from '../utils/getImageUrlByMd5'
import {Image} from 'antd'

export default function ({xml}: { xml: string }) {
    const urlRegex = /url="([^"]+)"/
    const md5ImageRegex = /image md5="([A-F\d]{32})"/
    let appurl = ''
    if (urlRegex.test(xml))
        appurl = xml.match(urlRegex)![1].replace(/\\\//g, '/')
    if (xml.includes('action="viewMultiMsg"')) {
        return <div>[Forward multiple messages]</div>
    }
    else if (appurl) {
        appurl = appurl.replace(/&amp;/g, '&')
        return <div><a href={appurl}>{appurl}</a></div>
    }
    else if (md5ImageRegex.test(xml)) {
        const imgMd5 = xml.match(md5ImageRegex)![1]
        const url = getImageUrlByMd5(imgMd5)
        return <Image
            width={200}
            alt=""
            src={url}
            referrerPolicy="no-referrer"
        />
    }
    return <div>[XML 卡片]</div>
}
