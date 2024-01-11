// fn.js
// ES Module that exports the waitFor function

/**
 * Monitors a property of an object and performs actions based on the state of that property.
 * @param {Object} watchedObject - The object whose property is being monitored.
 * @param {string} watchedProp - The property of the object to watch for a truthy value.
 * @param {Function} [successCallback] - A callback function that is executed when the watched property becomes truthy.
 * @param {number} [timeoutMs=10000] - The number of milliseconds to wait before rejecting the promise.
 * @returns {Promise} - A promise that resolves to true if the property becomes truthy within the timeout, or rejects with an error message.
 */
export async function waitFor(watchedObject, watchedProp, successCallback, timeoutMs = 10000) {
    // Check if the property is already truthy and resolve immediately if so.
    if (watchedObject[watchedProp]) {
        if (successCallback) {
            successCallback();
        }
        return true;
    }

    // Return a promise that will resolve when the property becomes truthy.
    return new Promise((resolve, reject) => {
        // Set up an interval to check the property every 20 milliseconds.
        const interval = setInterval(() => {
            if (watchedObject[watchedProp]) {
                clearInterval(interval);
                clearTimeout(timeout); // Clear timeout on success.
                if (successCallback) {
                    successCallback();
                }
                resolve(true);
            }
        }, 20);

        // Set up a timeout to reject the promise if the property doesn't become truthy within 10 seconds.
        const timeout = setTimeout(() => {
            clearInterval(interval);
            reject(new Error("Timeout reached before property became truthy."));
        }, timeoutMs);
    });
}
