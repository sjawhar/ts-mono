import { useMapAsyncData } from "@sjawhar/inspect-viewer-react/hooks";
import { AsyncData } from "@sjawhar/inspect-viewer-util";
import { useCallback } from "react";

import { ActiveScanInfo } from "../../types/api-types";

import { useActiveScans } from "./useActiveScans";

export const useActiveScan = (
  scanId: string | undefined
): AsyncData<ActiveScanInfo | undefined> =>
  useMapAsyncData(
    useActiveScans(),
    useCallback(
      (activeScans: Record<string, ActiveScanInfo>) =>
        scanId ? (activeScans[scanId] ?? undefined) : undefined,
      [scanId]
    )
  );
