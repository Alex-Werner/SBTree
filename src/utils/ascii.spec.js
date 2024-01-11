import {expect} from 'chai';
import { draw } from "./ascii.js";

describe('Utils - Ascii', () => {
    it('should draw works', async function () {
        const res = await draw({
            id: 'root',
            order: 3,
            fieldName: 'name',
            root: {
                keys: ['alex', 'alain', 'jean', 'yann', 'zachary'],
                childrens: [
                    {
                        keys: ['alex', 'alain'],
                        childrens: [
                            {
                                keys: ['alex'],
                                childrens: []
                            },
                            {
                                keys: ['alain'],
                                childrens: []
                            }
                        ]
                    },
                    {
                        keys: ['jean', 'yann', 'zachary'],
                        childrens: [
                            {
                                keys: ['jean'],
                                childrens: []
                            },
                            {
                                keys: ['yann', 'zachary'],
                                childrens: [
                                    {
                                        keys: ['yann'],
                                        childrens: []
                                    },
                                    {
                                        keys: ['zachary'],
                                        childrens: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });
        expect(res).to.deep.equal([
            ['alex', 'alain', 'jean', 'yann', 'zachary'],
            [],
        ]);
    });
});
