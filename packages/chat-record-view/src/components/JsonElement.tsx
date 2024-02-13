import {computed, defineComponent} from 'vue';
import type BilibiliMiniApp from '../types/BilibiliMiniApp';
import type StructMessageCard from '../types/StructMessageCard';

export default defineComponent({
  props: {
    json: {required: true, type: String},
  },
  setup(props) {
    return () => {
      const jsonObj = computed(() => JSON.parse(props.json));

      return () => {
        if (jsonObj.value.app === 'com.tencent.mannounce') {
          try {
            const title = atob(jsonObj.value.meta.mannounce.title);
            const content = btoa(jsonObj.value.meta.mannounce.text);
            return <div>
              <p><strong>{title}</strong></p>
              <p>{content}</p>
            </div>;
          } catch (err) {
            return <div>[群公告]</div>;
          }
        }
        const biliRegex = /(https?:\\?\/\\?\/b23\.tv\\?\/\w*)\??/;
        const zhihuRegex = /(https?:\\?\/\\?\/\w*\.?zhihu\.com\\?\/[^?"=]*)\??/;
        const biliRegex2 = /(https?:\\?\/\\?\/\w*\.?bilibili\.com\\?\/[^?"=]*)\??/;
        const jsonLinkRegex = /{.*"app":"com.tencent.structmsg".*"jumpUrl":"(https?:\\?\/\\?\/[^",]*)".*}/;
        const jsonAppLinkRegex = /"contentJumpUrl": ?"(https?:\\?\/\\?\/[^",]*)"/;
        let appurl = '';
        if (biliRegex.test(props.json))
          appurl = props.json.match(biliRegex)![1].replace(/\\\//g, '/');
        else if (biliRegex2.test(props.json))
          appurl = props.json.match(biliRegex2)![1].replace(/\\\//g, '/');
        else if (zhihuRegex.test(props.json))
          appurl = props.json.match(zhihuRegex)![1].replace(/\\\//g, '/');
        else if (jsonLinkRegex.test(props.json))
          appurl = props.json.match(jsonLinkRegex)![1].replace(/\\\//g, '/');
        else if (jsonAppLinkRegex.test(props.json))
          appurl = props.json.match(jsonAppLinkRegex)![1].replace(/\\\//g, '/');
        if (appurl) {
          try {
            const meta = (jsonObj.value as BilibiliMiniApp).meta.detail_1 || (jsonObj.value as StructMessageCard).meta.news;
            let previewUrl = meta.preview;
            if (!previewUrl.toLowerCase().startsWith('http')) {
              previewUrl = 'https://' + previewUrl;
            }
            return <a href={appurl}>
              <p><strong>{meta.title}</strong></p>
              <img src={previewUrl} alt={meta.title} referrerpolicy="no-referrer" width={200}/>
              <p>{meta.desc}</p>
            </a>;
          } catch (e) {
          }
        }
        return <div>[JSON 卡片]</div>;
      };

    };
  },
});
