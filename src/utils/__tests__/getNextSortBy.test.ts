import { describe } from '@jest/globals';
import { getNextSortBy } from '../getNextSortBy';
import { SortBy } from '../../types';

describe('getNextSortBy function', () => {
    const testData: Array<{ sortBy: SortBy; expected: SortBy }> = [
        { sortBy: 'по умолчанию', expected: 'по возрастанию цены' },
        { sortBy: 'по возрастанию цены', expected: 'по убыванию цены' },
        { sortBy: 'по убыванию цены', expected: 'по умолчанию' },
    ];
    test.each(testData)(
        'should check if next sorting order is correct',
        ({ sortBy, expected }) => {
            expect(getNextSortBy(sortBy)).toStrictEqual(expected);
        }
    );
});
