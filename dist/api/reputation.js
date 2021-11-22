import { sleep } from "../utils/async.js";
import { API_BASE, API_VER } from "./index.js";
/**
 * @see https://api.stackexchange.com/docs/reputation-on-users
 *
 * @summary gets a subset of reputation changes
 * @param userIds list of user ids to fetch the changes for
 * @param options configuration options
 */
export const getReputation = async (userIds, { page = 1, site = "stackoverflow", ...rest }) => {
    const url = new URL(`${API_BASE}/${API_VER}/users/${userIds.join(";")}/reputation`);
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
        return getReputation(userIds, { site, page, ...rest });
    }
    if (!has_more)
        return items;
    const more = await getReputation(userIds, {
        page: page + 1,
        site,
        ...rest,
    });
    return [...items, ...more];
};
