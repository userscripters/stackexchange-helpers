/**
 * @summary programmatically submit an edit to the post
 * @param {string} site host site to submit to
 * @param {number} postId id of the post being edited
 * @param {string} postHash hash from the edit <form> element action URL
 * @param {string} body new post body
 * @param {string} title new post title
 * @param {string[]} tags list of post tags
 * @param {string} comment edit comment
 * @param {(msg:unknown) => void} [onError] callback to invoke on error
 * @returns {Promise<boolean>}
 */
export const submitEdit = async (site, postId, postHash, body, title, tags, comment, onError = console.log) => {
    try {
        const res = await fetch(`${site}/posts/${postId}/edit-submit/${postHash}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "edit-comment": comment,
                "fkey": StackExchange.options.user.fkey,
                "is-current": "true",
                "post-text": body,
                "tagnames": tags.join(" "),
                title,
            }),
        });
        return res.status === 200;
    }
    catch (error) {
        onError(error);
        return false;
    }
};
