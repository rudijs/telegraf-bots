import type { Session } from "../types";

export const getDefaultSession = (): Session => {
  return {
    mediaGroupIds: [],
    messages: [],
  };
};
