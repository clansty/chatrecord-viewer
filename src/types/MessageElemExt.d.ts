import {MessageElem} from 'oicq'

export type MessageElemExt = MessageElem | {
  type: 'video-loop',
  url: string
} | {
  type: 'tgs',
  url: string
}
