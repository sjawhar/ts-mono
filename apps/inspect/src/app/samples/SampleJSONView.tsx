import { EvalSample } from "@sjawhar/inspect-viewer-common/types";
import {
  JSONPanel,
  NoContentsPanel,
} from "@sjawhar/inspect-viewer-react/components";
import { estimateSize } from "@sjawhar/inspect-viewer-util";
import { FC } from "react";

const MAX_JSON_DISPLAY_SIZE = 25 * 1024 * 1024;

interface SampleJSONViewProps {
  sample: EvalSample;
  className?: string;
}

export const SampleJSONView: FC<SampleJSONViewProps> = ({
  sample,
  className,
}) => {
  return estimateSize(sample.events) > MAX_JSON_DISPLAY_SIZE ? (
    <NoContentsPanel text="JSON too large to display" />
  ) : (
    <JSONPanel data={sample} simple={true} className={className} />
  );
};
