import { nanoid } from "nanoid";
import type { Page } from "./types";

export const createPage = () => {
  const slug = nanoid();
  const id = nanoid();

  const page: Page = {
    id,
    title: "Untitled",
    slug,
    nodes: [],
    cover: "ztm-notes.png",
  };

  return page;
};  