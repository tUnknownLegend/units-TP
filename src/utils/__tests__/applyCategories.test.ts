import { describe } from '@jest/globals';
import { Product } from '../../types';
import { applyCategories } from '../applyCategories';

describe('applyCategories function', () => {
    const defaultCategory: Product = {
        imgUrl: 'string',
        price: 123,
        name: 'string',
        description: 'string',
        id: 234523,
        category: 'Электроника',
        priceSymbol: '₽',
    };

    it('empty categories', () => {
        expect(applyCategories([defaultCategory], [])).toStrictEqual([
            defaultCategory,
        ]);
    });
    it('single category', () => {
        expect(
            applyCategories([defaultCategory], ['Электроника'])
        ).toStrictEqual([defaultCategory]);
    });
    it('many products', () => {
        expect(
            applyCategories(
                [
                    defaultCategory,
                    { ...defaultCategory, category: 'Для дома' },
                    { ...defaultCategory, category: 'Одежда' },
                ],
                ['Электроника', 'Для дома']
            )
        ).toStrictEqual([
            defaultCategory,
            { ...defaultCategory, category: 'Для дома' },
        ]);
    });
});
