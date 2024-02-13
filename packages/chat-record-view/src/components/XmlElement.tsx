import {defineComponent} from 'vue';
import getImageUrlByMd5 from '../utils/getImageUrlByMd5';
import {NImage} from 'naive-ui';

export default defineComponent({
  props: {
    xml: {required: true, type: String},
  },
  setup(props) {
    return () => {
      const urlRegex = /url="([^"]+)"/;
      const md5ImageRegex = /image md5="([A-F\d]{32})"/;
      let appurl = '';
      if (urlRegex.test(props.xml))
        appurl = props.xml.match(urlRegex)![1].replace(/\\\//g, '/');
      if (props.xml.includes('action="viewMultiMsg"')) {
        return <div>[Forward multiple messages]</div>;
      }
      else if (appurl) {
        appurl = appurl.replace(/&amp;/g, '&');
        return <div><a href={appurl}>{appurl}</a></div>;
      }
      else if (md5ImageRegex.test(props.xml)) {
        const imgMd5 = props.xml.match(md5ImageRegex)![1];
        const url = getImageUrlByMd5(imgMd5);
        return <NImage
          width={200}
          src={url}
          imgProps={{referrerpolicy: 'no-referrer'}}
        />;
      }
      return <div>[XML 卡片]</div>;
    };
  },
});
