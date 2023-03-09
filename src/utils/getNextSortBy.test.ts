import { describe, expect, test } from '@jest/globals';
import { getNextSortBy } from './getNextSortBy';

describe('', () => {
    it('', () => {
        expect(getNextSortBy('по умолчанию')).toEqual('по возрастанию цены');
    });
    it('', () => {
        expect(getNextSortBy('по возрастанию цены')).toEqual(
            'по убыванию цены'
        );
    });
    it('', () => {
        expect(getNextSortBy('по убыванию цены')).toEqual('по умолчанию');
    });
});
