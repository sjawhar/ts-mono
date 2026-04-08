import type { LoggerEvent } from "@sjawhar/inspect-viewer-common/types";
import { MetaDataGrid } from "@sjawhar/inspect-viewer-components/content";
import { parsedJson as maybeParseJson } from "@sjawhar/inspect-viewer-util";
import clsx from "clsx";
import { FC } from "react";

import { EventRow } from "./event/EventRow";
import { TranscriptIcons } from "./icons";
import styles from "./LoggerEventView.module.css";
import { EventNode } from "./types";

interface LoggerEventViewProps {
  eventNode: EventNode<LoggerEvent>;
  className?: string | string[];
}

export const LoggerEventView: FC<LoggerEventViewProps> = ({
  eventNode,
  className,
}) => {
  const event = eventNode.event;
  const obj = maybeParseJson(event.message.message);
  return (
    <EventRow
      className={className}
      title={event.message.level}
      icon={
        TranscriptIcons.logging[event.message.level.toLowerCase()] ||
        TranscriptIcons.info
      }
    >
      <div className={clsx("text-size-base", styles.grid)}>
        <div className={clsx("text-size-smaller")}>
          {obj !== undefined && obj !== null ? (
            <MetaDataGrid entries={obj as Record<string, unknown>} />
          ) : (
            event.message.message
          )}
        </div>
        <div className={clsx("text-size-smaller", "text-style-secondary")}>
          {event.message.filename}:{event.message.lineno}
        </div>
      </div>
    </EventRow>
  );
};
