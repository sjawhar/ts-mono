import type { InfoEvent } from "@sjawhar/inspect-viewer-common/types";
import { RenderedText } from "@sjawhar/inspect-viewer-components/content";
import { JSONPanel } from "@sjawhar/inspect-viewer-react/components";
import { formatDateTime } from "@sjawhar/inspect-viewer-util";
import clsx from "clsx";
import { FC, ReactNode } from "react";

import { EventPanel } from "./event/EventPanel";
import { TranscriptIcons } from "./icons";
import styles from "./InfoEventView.module.css";
import { EventNode } from "./types";

interface InfoEventViewProps {
  eventNode: EventNode<InfoEvent>;
  className?: string | string[];
}

export const InfoEventView: FC<InfoEventViewProps> = ({
  eventNode,
  className,
}) => {
  const event = eventNode.event;
  const panels: ReactNode[] = [];
  if (typeof event.data === "string") {
    panels.push(
      <RenderedText
        markdown={event.data}
        className={clsx(styles.panel, "text-size-base")}
      />
    );
  } else {
    panels.push(<JSONPanel data={event.data} className={styles.panel} />);
  }

  return (
    <EventPanel
      eventNodeId={eventNode.id}
      title={"Info" + (event.source ? ": " + event.source : "")}
      className={className}
      subTitle={
        event.timestamp ? formatDateTime(new Date(event.timestamp)) : undefined
      }
      icon={TranscriptIcons.info}
    >
      {panels}
    </EventPanel>
  );
};
