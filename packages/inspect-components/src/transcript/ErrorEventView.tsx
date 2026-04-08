import type { ErrorEvent } from "@sjawhar/inspect-viewer-common/types";
import { ANSIDisplay } from "@sjawhar/inspect-viewer-react/components";
import { formatDateTime } from "@sjawhar/inspect-viewer-util";
import { FC } from "react";

import { EventPanel } from "./event/EventPanel";
import { TranscriptIcons } from "./icons";
import { EventNode } from "./types";

interface ErrorEventViewProps {
  eventNode: EventNode<ErrorEvent>;
  className?: string | string[];
}

export const ErrorEventView: FC<ErrorEventViewProps> = ({
  eventNode,
  className,
}) => {
  const event = eventNode.event;
  return (
    <EventPanel
      eventNodeId={eventNode.id}
      title="Error"
      className={className}
      subTitle={
        event.timestamp ? formatDateTime(new Date(event.timestamp)) : undefined
      }
      icon={TranscriptIcons.error}
    >
      <ANSIDisplay
        output={event.error.traceback_ansi}
        style={{
          fontSize: "clamp(0.3rem, 1.1vw, 0.8rem)",
          margin: "0.5em 0",
        }}
      />
    </EventPanel>
  );
};
