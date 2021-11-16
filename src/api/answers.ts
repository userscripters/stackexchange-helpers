import { ApiFetchOptions, fetchAPI } from ".";

type GetAnswersOptions = ApiFetchOptions;

/**
 * @summary gets question answers from the API
 */
export const getAnswers = async (
    questionId: number,
    options: GetAnswersOptions
) => {
    await fetchAPI(`/questions/${questionId}/answers`, options);
};
