import {defineComponent} from 'vue';
import styles from './Bubble.module.sass';

export default defineComponent({
  props: {
    name: {required: true, type: String},
  },
  setup(props) {
    return () => <div class={`${styles.container} ${styles.senderName}`}>
      {props.name}
    </div>;
  },
});
