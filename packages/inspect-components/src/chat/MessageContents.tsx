import type {
  ChatMessageAssistant,
  ChatMessageSystem,
  ChatMessageTool,
  ChatMessageUser,
  Citation,
} from "@sjawhar/inspect-viewer-common/types";
import { FC } from "react";

import { MessageContent } from "./MessageContent";

interface MessageContentsProps {
  message:
    | ChatMessageAssistant
    | ChatMessageSystem
    | ChatMessageUser
    | ChatMessageTool;
}

export interface MessagesContext {
  citations: Citation[];
}

export const defaultContext = (): MessagesContext => {
  return {
    citations: [],
  };
};

export const MessageContents: FC<MessageContentsProps> = ({ message }) => {
  const context: MessagesContext = defaultContext();
  return (
    <>
      {message.content && (
        <MessageContent contents={message.content} context={context} />
      )}
    </>
  );
};
