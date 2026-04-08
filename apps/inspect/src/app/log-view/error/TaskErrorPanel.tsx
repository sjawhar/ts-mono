import { EvalError } from "@sjawhar/inspect-viewer-common/types";
import { RenderedContent } from "@sjawhar/inspect-viewer-components/content";
import {
  ANSIDisplay,
  Card,
  CardBody,
  CardHeader,
  ExpandablePanel,
} from "@sjawhar/inspect-viewer-react/components";
import clsx from "clsx";
import { FC } from "react";

import { ApplicationIcons } from "../../appearance/icons";

import styles from "./TaskErrorPanel.module.css";

interface TaskErrorProps {
  error: EvalError;
}

export const TaskErrorCard: FC<TaskErrorProps> = ({ error }) => {
  return (
    <Card>
      <CardHeader
        icon={ApplicationIcons.error}
        label={`Task Failed`}
      ></CardHeader>
      <CardBody>
        <ExpandablePanel
          id="task-error-collapse"
          collapse={true}
          className={clsx("text-size-smaller", styles.message)}
        >
          <RenderedContent
            id="task-error-message"
            entry={{ name: "error", value: error.message }}
          />
        </ExpandablePanel>
        <ANSIDisplay
          output={error.traceback_ansi}
          className={styles["task-error-display"]}
        />
      </CardBody>
    </Card>
  );
};
