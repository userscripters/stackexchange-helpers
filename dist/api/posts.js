import { sleep } from "../utils/async.js";
import { API_BASE, API_VER } from "./index.js";
export const getPosts = async (postIds, { site = "stackoverflow", page = 1, ...rest }) => {
    const url = new URL(`${API_BASE}/${API_VER}/posts/${postIds.join(";")}`);
    const params = new URLSearchParams({
        site,
        page: page.toFixed(0),
        ...rest,
    });
    url.search = params.toString();
    const res = await fetch(url.toString());
    if (!res.ok)
        return [];
    const { items = [], has_more = false, backoff, } = (await res.json());
    if (backoff) {
        await sleep(backoff);
        return getPosts(postIds, { site, page, ...rest });
    }
    if (!has_more)
        return items;
    const more = await getPosts(postIds, {
        page: page + 1,
        site,
        ...rest,
    });
    return [...items, ...more];
};
export const getPostsByTag = async (tagName, { site = "stackoverflow", page = 1, ...rest }) => {
    const url = new URL(`${API_BASE}/${API_VER}/search`);
    const params = new URLSearchParams({
        site,
        page: page.toFixed(0),
        tagged: tagName.toLowerCase(),
        ...rest,
    });
    url.search = params.toString();
    const res = await fetch(url.toString());
    if (!res.ok)
        return [];
    const { items = [], has_more = false, backoff, } = (await res.json());
    if (backoff) {
        await sleep(backoff);
        return getPostsByTag(tagName, { site, page, ...rest });
    }
    if (!has_more)
        return items;
    const more = await getPostsByTag(tagName, {
        page: page + 1,
        site,
        ...rest,
    });
    return [...items, ...more];
};
