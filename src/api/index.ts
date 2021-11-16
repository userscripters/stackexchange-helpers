export type ApiFetchOptions = {
    // body?:
    /** response object filter */
    filter?: string;
    /** registered API key */
    key: string;
    /** site to access the API for */
    site?: string;
    /** results page to fetch */
    page?: number;
} & {
    /** any other properties to pass to the API */
    [key: string]: string | number;
};

export const API_VER = 2.3;

export const API_BASE = "https://api.stackexchange.com";

/**
 * @summary abstract helper for fetching the API
 */
export const fetchAPI = async (
    path: string,
    { key, site = "stackoverflow", page = 1, ...rest }: ApiFetchOptions
) => {
    const normalized = path.replace(/^\//, "");

    const url = new URL(`${API_BASE}/${API_VER}/${normalized}`);

    const params = new URLSearchParams({
        key,
        page: page.toFixed(0),
        site,
        ...rest,
    });

    url.search = params.toString();

    const res = await fetch(url.toString(), {
        // method
        headers: {
            "Content-Type": "application/json",
        },
    });
};
