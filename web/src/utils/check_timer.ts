function checkTimer(startDate: Date, timeLimit: number) {
    const currentDate = new Date().getTime()
    const startDateInMs = startDate.getTime()
    const timeLimitInMs = timeLimit * 60 * 1000
    const timeLeft = startDateInMs + timeLimitInMs - currentDate
    
    if (timeLeft < 0) {
        return {
            hasExpired: true,
            timeLeft: {
                minute: 0,
                second: 0,
            },
        }
    }

    const minute = Math.floor(timeLeft / (60 * 1000))
    const second = Math.ceil((timeLeft - minute * 1000 * 60) / 1000)
    return {
        hasExpired: false,
        timeLeft: {
            minute: second >= 60 ? minute + 1 : minute,
            second: second >= 60 ? 0 : second,
        },
    }
}

export default checkTimer
