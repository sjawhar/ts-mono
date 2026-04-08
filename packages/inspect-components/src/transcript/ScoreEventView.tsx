import type { ScoreEvent } from "@sjawhar/inspect-viewer-common/types";
import {
  RecordTree,
  RenderedText,
} from "@sjawhar/inspect-viewer-components/content";
import { formatDateTime } from "@sjawhar/inspect-viewer-util";
import clsx from "clsx";
import { FC, Fragment } from "react";

import { EventPanel } from "./event/EventPanel";
import { TranscriptIcons } from "./icons";
import styles from "./ScoreEventView.module.css";
import { ScoreValue } from "./ScoreValue";
import { EventNode } from "./types";

interface ScoreEventViewProps {
  eventNode: EventNode<ScoreEvent>;
  className?: string | string[];
}

export const ScoreEventView: FC<ScoreEventViewProps> = ({
  eventNode,
  className,
}) => {
  const event = eventNode.event;
  const resolvedTarget = event.target
    ? Array.isArray(event.target)
      ? event.target.join("\n")
      : event.target
    : undefined;

  return (
    <EventPanel
      eventNodeId={eventNode.id}
      title={(event.intermediate ? "Intermediate " : "") + "Score"}
      className={clsx(className, "text-size-small")}
      subTitle={
        event.timestamp ? formatDateTime(new Date(event.timestamp)) : undefined
      }
      icon={TranscriptIcons.scorer}
      collapsibleContent={true}
    >
      <div data-name="Explanation" className={clsx(styles.explanation)}>
        {event.target ? (
          <Fragment>
            <div className={clsx(styles.separator)}></div>
            <div className={"text-style-label"}>Target</div>
            <div>
              <RenderedText markdown={resolvedTarget || ""} />
            </div>
          </Fragment>
        ) : (
          ""
        )}
        <div className={clsx(styles.separator)}></div>
        <div className={"text-style-label"}>Answer</div>
        <div className={clsx(styles.wrappingContent)}>
          <RenderedText markdown={event.score.answer || ""} />
        </div>
        <div className={clsx(styles.separator)}></div>
        <div className={"text-style-label"}>Explanation</div>
        <div className={clsx(styles.wrappingContent)}>
          <RenderedText markdown={event.score.explanation || ""} />
        </div>
        <div className={clsx(styles.separator)}></div>
        <div className={"text-style-label"}>Score</div>
        <ScoreValue score={event.score.value} />
        <div className={clsx(styles.separator)}></div>
      </div>
      {event.score.metadata ? (
        <div data-name="Metadata">
          <RecordTree
            id={`${eventNode.id}-score-metadata`}
            record={event.score.metadata}
            className={styles.metadataTree}
            defaultExpandLevel={0}
          />
        </div>
      ) : undefined}
    </EventPanel>
  );
};
