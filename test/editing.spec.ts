import { expect } from "chai";
import * as sinon from "sinon";
import { submitEdit } from "../src/editing/submit";

describe("edit submit", () => {
    const originalFetch = globalThis.fetch;
    const fakeFetch = sinon.fake(() => Promise.resolve({ status: 200 }));

    before(() => {
        //@ts-expect-error
        globalThis.StackExchange = { options: { user: { fkey: "abc" } } };
        globalThis.fetch = fakeFetch;
    });

    it("should correctly attempt to submit edits", async () => {
        const site = "https://stackoverflow.com";
        const hash = "bogus-post-hash";
        const id = 10101010;
        const body = "some bogus text here";
        const title = "What is a bogus title?";
        const tags = ["bogus", "editing"];
        const comment = "edited a bogus post";

        const status = await submitEdit(
            site,
            id,
            hash,
            body,
            title,
            tags,
            comment
        );

        const [[url, init]] = fakeFetch.args;

        expect(status).to.be.true;
        expect(fakeFetch.calledOnce).to.be.true;
        expect(url).to.equal(`${site}/posts/${id}/edit-submit/${hash}`);
        expect(init.body.get("fkey")).to.equal("abc");
        expect(init.body.get("tagnames")).to.equal("bogus editing");
    });

    after(() => (globalThis.fetch = originalFetch));
});
