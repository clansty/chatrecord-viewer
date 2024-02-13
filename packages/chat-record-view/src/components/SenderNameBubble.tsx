import {computed, defineComponent} from 'vue';
import styles from './Bubble.module.sass';
import cyrb53 from '../utils/cyrb53';

export default defineComponent({
  props: {
    name: {required: true, type: String},
    id: {required: true, type: [String, Number]},
  },
  setup(props) {
    const color = computed(() => {
      const id = typeof props.id === 'string' ? cyrb53(props.id) : props.id;
      return [
        '#FF516A',
        '#FFA85C',
        '#D669ED',
        '#54CB68',
        '#28C9B7',
        '#2A9EF1',
        '#FF719A'][id % 7];
    });

    return () => <div style={{color: color.value}} class={`${styles.container} ${styles.senderName}`}>
      {props.name}
    </div>;
  },
});
