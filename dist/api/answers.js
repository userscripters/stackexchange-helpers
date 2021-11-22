import { fetchAPI } from ".";
/**
 * @summary gets question answers from the API
 */
export const getAnswers = async (questionId, options) => {
    return await fetchAPI(`/questions/${questionId}/answers`, options);
};
