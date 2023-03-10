import { describe } from '@jest/globals';
import { getNextSortBy } from './getNextSortBy';

describe('getNextSortBy function', () => {
    it('по умолчанию', () => {
        expect(getNextSortBy('по умолчанию')).toEqual('по возрастанию цены');
    });
    it('по возрастанию цены', () => {
        expect(getNextSortBy('по возрастанию цены')).toEqual(
            'по убыванию цены'
        );
    });
    it('по убыванию цены', () => {
        expect(getNextSortBy('по убыванию цены')).toEqual('по умолчанию');
    });
});
