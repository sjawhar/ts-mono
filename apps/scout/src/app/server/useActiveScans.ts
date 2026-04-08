import { useAsyncDataFromQuery } from "@sjawhar/inspect-viewer-react/hooks";
import { AsyncData } from "@sjawhar/inspect-viewer-util";

import { useApi } from "../../state/store";
import { ActiveScanInfo } from "../../types/api-types";

export const useActiveScans = (): AsyncData<Record<string, ActiveScanInfo>> => {
  const api = useApi();
  return useAsyncDataFromQuery({
    queryKey: ["active-scans"],
    queryFn: async () => (await api.getActiveScans()).items,
    refetchInterval: 5000,
  });
};
