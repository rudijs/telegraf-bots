import type { Message as TGMessage } from "telegraf/types";

import type { Message } from "../types";

export const groupMessages = (messages: Message[]) => {
  const photos: TGMessage.PhotoMessage[] = [];
  const videos: TGMessage.VideoMessage[] = [];
  const text: TGMessage.TextMessage[] = [];

  for (const message of messages) {
    if (message.photo) {
      photos.push(message.photo);
    }

    if (message.video) {
      videos.push(message.video);
    }

    if (message.text) {
      text.push(message.text);
    }
  }

  return {
    photos,
    videos,
    text,
  };
};
