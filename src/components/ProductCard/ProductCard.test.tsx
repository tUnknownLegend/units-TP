import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';

afterEach(jest.clearAllMocks);

jest.mock('../../utils/getPrice', () => ({
    __esModule: true,
    getPrice: jest.fn(() => '999 ₽'),
}));

const elem: Product = {
    id: 1,
    name: 'string',
    description: 'string',
    price: 1231,
    priceSymbol: '₽',
    category: 'Электроника',
    imgUrl: 'string',
};

describe('ProductCard snapshot', () => {
    it('should have img', () => {
        const renderedProductCard = render(<ProductCard {...elem} />);

        const imgElement = renderedProductCard.getByRole('img');

        if (imgElement instanceof HTMLImageElement) {
            expect(imgElement.src).toStrictEqual(
                'http://localhost/' + elem.imgUrl
            );
        } else {
            expect(imgElement).toBeInstanceOf(HTMLImageElement);
        }

        expect(renderedProductCard.asFragment()).toMatchSnapshot();
    });
    it('shouldnt have img', () => {
        const renderedProductCard = render(
            <ProductCard {...elem} imgUrl={undefined} />
        );

        expect(renderedProductCard.queryByRole('img')).toBeNull();
        expect(renderedProductCard.asFragment()).toMatchSnapshot();
    });
});
