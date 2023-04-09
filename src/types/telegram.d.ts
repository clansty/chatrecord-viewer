export type TelegramFrom = {
  first_name: string;
  id: number;
  is_bot: boolean;
  language_code: string;
  username: string;
  last_name?: string;
};

export type TelegramChat = {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  // photo?: TelegramChatPhoto;
  bio?: string;
  has_private_forwards: boolean;
  description?: string;
  invite_link?: string;
  pinned_message?: TelegramMessage;
  // permissions?: TelegramChatPermissions;
  slow_mode_delay?: number;
  message_auto_delete_time?: number;
  has_protected_content?: boolean;
  sticker_set_name?: string;
  can_set_sticker_set?: boolean;
  linked_chat_id?: number;
  // location?: TelegramChatLocation;
};

export type TelegramUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  can_join_groups?: boolean;
  can_read_all_group_messages?: boolean;
  supports_inline_queries: boolean;
};

export type TelegramMessageEntity = {
  type: string;
  offset: number;
  length: number;
  url?: string;
  user?: TelegramUser;
  language?: string;
};

export type TelegramPhotoSize = {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
};

export type TelegramMessage = {
  message_id: number;
  from: TelegramFrom;
  sender_chat?: TelegramChat;
  date: number;
  chat: TelegramChat;
  forward_from?: TelegramUser;
  forward_from_chat?: TelegramChat;
  forward_from_message_id?: number;
  forward_signature?: string;
  forward_sender_name?: string;
  forward_date?: number;
  is_automatic_forward?: boolean;
  reply_to_message?: TelegramMessage;
  via_bot?: TelegramUser;
  edit_date?: number;
  has_protected_content?: boolean;
  media_group_id?: string;
  author_signature?: string;
  text?: string;
  entities?: TelegramMessageEntity[];
  // animation?: TelegramAnimation;
  // audio?: TelegramAudio;
  // document?: TelegramDocument;
  photo?: TelegramPhotoSize[];
  sticker?: TelegramSticker;
  // video?: TelegramVideo;
  // video_note?: TelegramVideoNote;
  // voice?: TelegramVoice;
  caption?: string;
  caption_entities?: TelegramMessageEntity[];
  // contact?: TelegramContact;
  // dice?: TelegramDice;
  // poll?: TelegramPoll;
  // venue?: TelegramVenue;
  // location?: TelegramLocation;
  new_chat_members?: TelegramUser[];
  left_chat_member?: TelegramUser;
  new_chat_title?: string;
  // new_chat_photo?: TelegramPhotoSize[];
  delete_chat_photo?: boolean;
  group_chat_created?: boolean;
  supergroup_chat_created?: boolean;
  channel_chat_created?: boolean;
  // message_auto_delete_timer_changed?: TelegramAutoDeleteTimerChanged;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: TelegramMessage;
  // invoice?: TelegramInvoice;
  // successful_payment?: TelegramSuccessfulPayment;
  connected_website?: string;
  // passport_data?: TelegramPassportData;
  // proximity_alert_triggered?: TelegramProximityAlertTriggered;
  // voice_chat_scheduled?: TelegramVoiceChatScheduled;
  // voice_chat_started?: TelegramVoiceChatStarted;
  // voice_chat_ended?: TelegramVoiceChatEnded;
  // voice_chat_participants_invited?: TelegramVoiceChatParticipantsInvited;
  // reply_markup?: TelegramInlineKeyboardMarkup;
  web_app_data?: {
    data: string
    button_text: string
  }
};

export type TelegramInputMessageContent = {
  message_text: string;
  parse_mode: string;
};

export type TelegramInlineQuery = {
  chat_type: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
  from: TelegramFrom;
  id: number;
  offset: string;
  query: string;
};


export type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
  inline_query?: TelegramInlineQuery;
  // chosen_inline_result?: TelegramChosenInlineResult;
  callback_query?: TelegramCallbackQuery;
  // shipping_query?: TelegramShippingQuery;
  // pre_checkout_query?: TelegramPreCheckoutQuery;
  // poll?: TelegramPoll;
  // poll_answer?: TelegramPollAnswer;
  // my_chat_member?: TelegramChatMemberUpdated;
  // chat_member?: TelegramChatMemberUpdated;
  // chat_join_request: TelegramChatJoinRequest;
}

export type PartialTelegramUpdate = {
  update_id?: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
  inline_query?: TelegramInlineQuery;
};

export type TelegramInlineQueryType =
  | 'article'
  | 'photo'
  | 'gif'
  | 'mpeg4_gif'
  | 'video'
  | 'audio'
  | 'voice'
  | 'document'
  | 'location'
  | 'venue'
  | 'contact'
  | 'game'
  | 'sticker';

export type InlineKeyboardButton = {
  text: string,
  url?: string,
  callback_data?: string
  web_app?: {
    url: string
  }
}

export type InlineKeyboardMarkup = { inline_keyboard: InlineKeyboardButton[][] }

export type KeyboardButton = {
  text: string,
  web_app?: {
    url: string
  }
}

export type ReplyKeyboardMarkup = {
  keyboard: KeyboardButton[][]
  resize_keyboard?: boolean
}

export type ReplyKeyboardRemove = {
  remove_keyboard: true
}

export type TelegramCallbackQuery = {
  id: string
  from: TelegramFrom;
  message?: TelegramMessage
  inline_message_id?: string
  chat_instance: string
  data?: string
}

export type TelegramSticker = {
  width: 512;
  height: 277;
  emoji: "🐱";
  set_name: "MenciPusheen";
  is_animated: false;
  is_video: false;
  type: "regular";
  thumbnail: {
    file_id: "AAMCAQADGQEAA2VkMoB-QzPi-mrbLi1lwiS4ZogRcQACBgIAAk8oGURQ5fOkwdq4SAEAB20AAy8E";
    file_unique_id: "AQADBgIAAk8oGURy";
    file_size: 7566;
    width: 320;
    height: 173;
  };
  thumb: {
    file_id: "AAMCAQADGQEAA2VkMoB-QzPi-mrbLi1lwiS4ZogRcQACBgIAAk8oGURQ5fOkwdq4SAEAB20AAy8E";
    file_unique_id: "AQADBgIAAk8oGURy";
    file_size: 7566;
    width: 320;
    height: 173;
  };
  file_id: "CAACAgEAAxkBAANlZDKAfkMz4vpq2y4tZcIkuGaIEXEAAgYCAAJPKBlEUOXzpMHauEgvBA";
  file_unique_id: "AgADBgIAAk8oGUQ";
  file_size: 12620;
};
