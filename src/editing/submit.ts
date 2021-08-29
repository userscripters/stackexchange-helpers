    /**
     * @summary programmatically submit an edit to the post
     * @param {number} postId id of the post being edited
     * @param {string} postHash hash from the edit <form> element action URL
     * @param {string} body new post body
     * @param {string} title new post title
     * @param {string[]} tags list of post tags
     * @param {string} comment edit comment
     * @returns {Promise<boolean>}
     */
    export const editSubmitter = async (
        postId: number,
        postHash: string,
        body: string,
        title: string,
        tags: string[],
        comment: string
    ) => {
        try {
            const { protocol, hostname } = location;

            const res = await fetch(
                `${protocol}//${hostname}/posts/${postId}/edit-submit/${postHash}`,
                {
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
                }
            );

            console.log(await res.json());

            return res.status === 200;
        } catch (error) {
            //TODO: add handler
            return false;
        }
    };
