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
