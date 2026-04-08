import { useAsyncDataFromQuery } from "@sjawhar/inspect-viewer-react/hooks";
import { AsyncData } from "@sjawhar/inspect-viewer-util";
import { skipToken } from "@tanstack/react-query";

import { useApi } from "../../state/store";
import { Transcript } from "../../types/api-types";

type TranscriptParams = {
  location: string;
  id: string;
};

export const useTranscript = (
  params: TranscriptParams | typeof skipToken
): AsyncData<Transcript> => {
  const api = useApi();

  return useAsyncDataFromQuery({
    queryKey: params === skipToken ? [skipToken] : ["transcript", params],
    queryFn:
      params === skipToken
        ? skipToken
        : () => api.getTranscript(params.location, params.id),
    staleTime: Infinity,
  });
};
