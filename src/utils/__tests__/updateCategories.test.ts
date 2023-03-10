import { describe } from '@jest/globals';
import { updateCategories } from '../updateCategories';

describe('updateCategories function', () => {
    it('has all categories', () => {
        expect(
            updateCategories(['Электроника', 'Для дома', 'Одежда'], 'Одежда')
        ).toEqual(['Электроника', 'Для дома']);
    });

    it('has empty current categories', () => {
        expect(updateCategories([], 'Одежда')).toEqual(['Одежда']);
    });
});
