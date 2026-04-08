import type { InputEvent } from "@sjawhar/inspect-viewer-common/types";
import { ANSIDisplay } from "@sjawhar/inspect-viewer-react/components";
import { formatDateTime } from "@sjawhar/inspect-viewer-util";
import { FC } from "react";

import { EventPanel } from "./event/EventPanel";
import { TranscriptIcons } from "./icons";
import { EventNode } from "./types";

interface InputEventViewProps {
  eventNode: EventNode<InputEvent>;
  className?: string | string[];
}

export const InputEventView: FC<InputEventViewProps> = ({
  eventNode,
  className,
}) => {
  const event = eventNode.event;
  return (
    <EventPanel
      eventNodeId={eventNode.id}
      title="Input"
      className={className}
      subTitle={
        event.timestamp ? formatDateTime(new Date(event.timestamp)) : undefined
      }
      icon={TranscriptIcons.input}
    >
      <ANSIDisplay
        output={event.input_ansi}
        style={{ fontSize: "clamp(0.4rem, 1.15vw, 0.9rem)" }}
      />
    </EventPanel>
  );
};
