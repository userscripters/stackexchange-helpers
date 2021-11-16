import { Tag } from "@userscripters/stackexchange-api-types";
import { sleep } from "../utils/async.js";
import { ApiFetchOptions } from "./index.js";

const API_VER = 2.3;
const API_BASE = "https://api.stackexchange.com";

type GetTagsOptions = ApiFetchOptions;

/**
 * @summary gets tags from the API
 */
export const getTags = async ({
    key,
    site = "stackoverflow",
    page = 1,
    ...rest
}: GetTagsOptions): Promise<Tag[]> => {
    const url = new URL(`${API_BASE}/${API_VER}/tags`);
    const params = new URLSearchParams({
        key,
        site,
        page: page.toFixed(0),
        ...rest,
    });

    url.search = params.toString();

    const res = await fetch(url.toString());

    if (!res.ok) return [];

    const { items = [], has_more = false, backoff } = await res.json();

    console.log({ backoff, has_more });

    if (backoff) {
        await sleep(backoff);
        return getTags({
            key,
            site,
            page,
            ...rest,
        });
    }

    if (!has_more) return items;

    const more = await getTags({
        key,
        site,
        page: page + 1,
        ...rest,
    });

    return [...items, ...more];
};
