export function insecureRandomBytes(size) {
    const result = new Uint8Array(size);
    for (let i = 0; i < size; ++i) {
        result[i] = Math.floor(Math.random() * 256);
    }
    return result;
}

import crypto from 'crypto';

export function getRandomBytes() {
    if (typeof require !== 'undefined') {
        try {
            return crypto.randomBytes;
        } catch (e) {
            return insecureRandomBytes;
        }
    }
    return insecureRandomBytes;
}

export function browserRandomBytes(size) {
    return window.crypto.getRandomValues(new Uint8Array(size));
}

export function randomBytes(size) {
    const isWindowContext = (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues);
    if (isWindowContext) {
        return browserRandomBytes(size);
    } else {
        return getRandomBytes()(size);
    }
}

export function generateRandId(prefix = '') {
    return prefix + (Date.now().toString(16) + crypto.randomBytes(4).toString('hex'));
}


export function generateFieldTreeId() {
    return generateRandId('f');
}

export function generateTreeId() {
    return generateRandId('t');
}

export function generateNodeId() {
    return generateRandId('n');
}

export function generateRootId() {
    return generateRandId('r');
}

export function generateLeafId() {
    return generateRandId('l');
}

