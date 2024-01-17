import { decodeJson, encodeJson } from "use-query-params";

const APP_CONTEXT = "app_ctx";

type contextItems = "quotes";

export const DAO = {
  getItem: (key: contextItems) => {
    return decodeJson(localStorage.getItem(APP_CONTEXT) ?? "{}")[key];
  },

  setItem: (key: contextItems, value?: string | object) => {
    let pdm_context = decodeJson(localStorage.getItem(APP_CONTEXT) ?? "{}");
    pdm_context[key] = value;
    localStorage.setItem(APP_CONTEXT, encodeJson(pdm_context)!);
  },

  clearCache: () => {
    localStorage.setItem(APP_CONTEXT, "{}");
  },
};
