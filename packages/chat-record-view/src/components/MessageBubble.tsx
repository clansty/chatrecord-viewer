import {defineComponent, PropType} from 'vue';
import type {ForwardMessage} from 'icqq';
import type {TelegramMessage} from '../types/telegram';
import MessageElement from './MessageElement';
import styles from './Bubble.module.sass';
import {NTime} from 'naive-ui';

export default defineComponent({
  props: {
    message: {required: true, type: Object as PropType<ForwardMessage | TelegramMessage>},
  },
  setup(props) {
    return () => <div class={styles.container}>
      {'message' in props.message ? props.message.message.map((i, k) => <MessageElement elem={i} key={k}/>) :
        <>
          {props.message.photo && <MessageElement elem={{
            type: 'image',
            file: null,
            url: `https://tg-avatars.init.ink/files/${props.message.photo[props.message.photo.length - 1].file_id}`,
          }}/>}
          {props.message.sticker && <MessageElement elem={{
            type: (() => {
              if (props.message.sticker.is_video) return 'video-loop';
              if (props.message.sticker.is_animated) return 'tgs';
              return 'image';
            })(),
            file: null,
            url: `https://tg-avatars.init.ink/files/${props.message.sticker.file_id}`,
          }}/>}
          {props.message.text && <MessageElement elem={{
            type: 'text',
            text: props.message.text,
          }}/>}
        </>
      }

      <div class={styles.time}>
        <NTime
          time={('time' in props.message ? props.message.time : props.message.forward_date || props.message.date) * 1000}
          format="HH:mm"
        />
      </div>
    </div>;
  },
});
