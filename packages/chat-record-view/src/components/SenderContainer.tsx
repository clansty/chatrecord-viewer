import {defineComponent, PropType} from 'vue';
import SenderGroup from '../types/SenderGroup';
import {NAvatar} from 'naive-ui';
import styles from './SenderContainer.module.sass';
import SenderNameBubble from './SenderNameBubble';
import MessageBubble from './MessageBubble';
import noAvatar from '../assets/no-avatar.webp';

export default defineComponent({
  props: {
    group: {required: true, type: Object as PropType<SenderGroup>},
  },
  setup(props) {
    return () => <div class={styles.container}>
      <div class={styles.avatarContainer}>
        <NAvatar
          class={styles.avatar}
          round
          size={36}
          src={props.group.avatar || noAvatar}
          fallbackSrc={noAvatar}
          imgProps={{referrerpolicy: 'no-referrer'}}
        />
      </div>
      <div class={styles.mainContainer}>
        <SenderNameBubble name={props.group.username}/>
        {props.group.messages.map((e, index) =>
          <MessageBubble message={e} key={index}/>)}
      </div>
    </div>;
  },
});
