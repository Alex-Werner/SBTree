import {expect} from 'chai';
import {waitFor} from './fn.js';

describe('waitFor function', () => {
    it('should resolve immediately if the property is already true', async () => {
        const watchedObject = {prop: true};
        const result = await waitFor(watchedObject, 'prop');
        expect(result).to.be.true;
    });

    it('should resolve when the property becomes true', async () => {
        const watchedObject = {prop: false};
        setTimeout(() => {
            watchedObject.prop = true;
        }, 50);
        const result = await waitFor(watchedObject, 'prop');
        expect(result).to.be.true;
    });

    it('should call the callback when the property becomes true', (done) => {
        const watchedObject = {prop: false};
        const callback = () => {
            expect(watchedObject.prop).to.be.true;
            done();
        };
        setTimeout(() => {
            watchedObject.prop = true;
        }, 50);
        waitFor(watchedObject, 'prop', callback);
    });

    it('should reject after the timeout', async () => {
        return new Promise((resolve, reject) => {
            const watchedObject = {prop: false};
            waitFor(watchedObject, 'prop', null, 1900)
                .catch((error) => {
                    expect(error.message).to.equal('Timeout reached before property became truthy.');
                    resolve(true);
                });
        });
    });
});
