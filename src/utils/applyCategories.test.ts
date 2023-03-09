import { describe, expect, test } from '@jest/globals';
import { Category, PriceSymbol } from '../types';
import { applyCategories } from './applyCategories';

const defaultCategory = {
    imgUrl: 'string',
    price: 123,
    name: 'string',
    description: 'string',
    id: 234523,
    category: 'Электроника' as Category,
    priceSymbol: '₽' as PriceSymbol,
};
describe('', () => {
    it('empty categories', () => {
        expect(applyCategories([defaultCategory], [])).toEqual([
            defaultCategory,
        ]);
    });
    it('', () => {
        expect(applyCategories([defaultCategory], ['Электроника'])).toEqual([
            defaultCategory,
        ]);
    });
    it('', () => {
        expect(
            applyCategories(
                [
                    defaultCategory,
                    { ...defaultCategory, category: 'Для дома' },
                    { ...defaultCategory, category: 'Одежда' },
                ],
                ['Электроника']
            )
        ).toEqual([
            defaultCategory
        ]);
    });
});
