import {computed, defineComponent} from 'vue';
import './styles/global.sass';
import {useBrowserLocation, useFetch} from '@vueuse/core';
import styles from './App.module.sass';
import {TelegramMessage, ForwardMessage, ChatRecordView} from '@clansty/chat-record-view';

export default defineComponent({
  setup() {
    const location = useBrowserLocation();
    const url = computed(() => {
      const params = new URLSearchParams(location.value.search);
      return '/api/get/' + (params.get('hash') || params.get('tgWebAppStartParam'));
    });

    const {isFetching, error, data} = useFetch<TelegramMessage[] | ForwardMessage[]>(url).json();

    return () => {
      if (isFetching.value)
        return <div class={styles.tip}>
          加载中...
        </div>;
      if (error.value || !data.value)
        return <div class={styles.tip}>
          出错了
        </div>;
      return <div class={styles.container}>
        <ChatRecordView messages={data.value}/>
      </div>;
    };
  },
});
