import type {MessageElem} from 'icqq'

export type MessageElemExt = MessageElem | {
  type: 'video-loop',
  url: string
} | {
  type: 'tgs',
  url: string
}
