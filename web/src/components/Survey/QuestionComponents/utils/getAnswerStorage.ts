export function getAnswerValue(questionId: any) {
    const localAnswer = JSON.parse(localStorage.getItem("answer") || "{}")
    try {
        const selectedId = localAnswer.answers[questionId]
        return selectedId.value
    } catch {
        return []
    }
}
