import {computed, defineComponent, PropType} from 'vue';
import {dateZhCN, NConfigProvider, zhCN} from 'naive-ui';
import {ForwardMessage} from 'icqq';
import {TelegramMessage} from './types/telegram';
import processHistory from './utils/processHistory';
import DateContainer from './components/DateContainer';

export default defineComponent({
  props: {
    messages: {required: true, type: Object as PropType<ForwardMessage[] | TelegramMessage[]>},
  },
  setup(props) {
    const groupedHistory = computed(() => processHistory(props.messages));

    return () => (
      <NConfigProvider locale={zhCN} dateLocale={dateZhCN}>
        {groupedHistory.value.map(e => <DateContainer group={e} key={e.date}/>)}
      </NConfigProvider>
    );
  },
});
