import {defineComponent, type PropType} from 'vue';
import type {MessageElemExt} from '../types/MessageElemExt';
import styles from './MessageElement.module.sass';
import getImageUrlByMd5 from '../utils/getImageUrlByMd5';
import {NImage} from 'naive-ui';
import JsonElement from './JsonElement';
import XmlElement from './XmlElement';

export default defineComponent({
  props: {
    elem: {required: true, type: Object as PropType<MessageElemExt>},
  },
  setup(props) {
    return () => {
      switch (props.elem.type) {
        case 'text':
        case 'face':
        case 'sface':
        case 'at':
          return <div class={styles.messageContent}>{props.elem.text}</div>;
        case 'image':
        case 'flash':
          let md5;
          if (typeof props.elem.file === 'string') {
            md5 = props.elem.file.substring(0, 32);
            if (!/([a-f\d]{32}|[A-F\d]{32})/.test(md5))
              md5 = undefined;
          }
          return <NImage
            width={200}
            src={md5 ? getImageUrlByMd5(md5) : props.elem.url}
            imgProps={{referrerpolicy: 'no-referrer'}}
          />;
        case 'video-loop':
          return <video src={props.elem.url} autoplay muted loop width={200}/>;
        case 'tgs':
          return <tgs-player autoplay={true} loop={true} mode="normal" src={props.elem.url}
                             style={{width: 200, height: 200}}/>;
        case 'video':
          return <div>[视频]</div>;
        case 'record':
          return <div>[语音]</div>;
        case 'file':
          return <div>[文件] {props.elem.name}</div>;
        case 'location':
          return <div>[地址] {props.elem.name}<br/>{props.elem.address}</div>;
        case 'bface':
          let url = `https://gxh.vip.qq.com/club/item/parcel/item/${props.elem.file.substring(
            0,
            2,
          )}/${props.elem.file.substring(0, 32)}/300x300.png`;
          return <img src={url} alt={props.elem.text} referrerpolicy="no-referrer" width={200}/>;
        case 'rps':
          return <div>[猜拳]</div>;
        case 'dice':
          return <div>[骰子]</div>;
        case 'json':
          return <JsonElement json={props.elem.data}/>;
        case 'xml':
          return <XmlElement xml={props.elem.data}/>;
        default:
          return <></>;
      }
    };
  },
});
