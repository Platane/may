/**
 * wrap a async function,
 * ensure that function calls are synchronous
 * when calling the function while the previous execution is not over yet,
 * will call once the previous execution is over
 */
export const createQueue = (fn: () => *) => {
    let pending = null

    let callAfter = false

    const call = async () => {
        if (!pending) {
            pending = true

            await fn()

            pending = false

            if (callAfter) {
                callAfter = false
                call()
            }
        } else {
            callAfter = true
        }
    }

    return call
}

/**
 * schedule to call the function in X ms, once only
 * if schedule is re-called, the function in scheduled only once, at the sooner date
 */
export const createScheduler = (fn: () => *) => {
    let timeout = null
    let date = Infinity

    const call = () => {
        date = Infinity
        fn()
    }

    return (delay: number = 0) => {
        const nextDate = Date.now() + delay

        if (nextDate < date) {
            date = nextDate

            clearTimeout(timeout)
            timeout = setTimeout(call, delay)
        }
    }
}

export const wait = (delay: number = 0) =>
    new Promise(resolve => setTimeout(resolve, delay))
