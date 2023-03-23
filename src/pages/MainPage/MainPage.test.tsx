import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MainPage } from './MainPage';
import '@testing-library/jest-dom';
import { SortBy } from '../../types';

beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01T00:00:00'));
});

afterAll(() => {
    jest.useRealTimers();
});

afterEach(jest.clearAllMocks);

jest.mock('../../utils/getPrice', () => {
    return {
        __esModule: true,
        getPrice: jest.fn(() => '999 ₽'),
    };
});

jest.mock('../../utils/getNextSortBy', () => {
    return {
        __esModule: true,
        getNextSortBy: jest.fn(),
    };
});

jest.mock('../../utils/getNextSortBy', () => {
    return {
        __esModule: true,
        getNextSortBy: jest.fn((sortBy: SortBy) =>
            sortBy === 'по умолчанию'
                ? 'по возрастанию цены'
                : 'по убыванию цены'
        ),
    };
});

describe('checks text fields on main page', () => {
    it('should have VK Маркет name and match snapshot', () => {
        const renderedMainPage = render(<MainPage />);

        expect(renderedMainPage.asFragment()).toMatchSnapshot();
    });

    it('should change sort button innerText', () => {
        const renderedButton = render(<MainPage />);

        const sortButton = renderedButton.getByTestId('sort-button-id');

        fireEvent.click(sortButton);
        expect(sortButton.textContent).toStrictEqual(
            'Сортировать по возрастанию цены'
        );
        fireEvent.click(sortButton);
        expect(sortButton.textContent).toStrictEqual(
            'Сортировать по убыванию цены'
        );
    });
});

describe('Main page select category', () => {
    it('click on the first matched button', () => {
        const renderedMainPage = render(<MainPage />);

        const categoryElement = renderedMainPage.getAllByTestId(
            'button-select-category'
        )[0];

        fireEvent.click(categoryElement);

        const productEdited = renderedMainPage.getAllByTestId(
            'product-card__category'
        );
        expect(
            productEdited.every(
                ({ innerText }) => innerText === categoryElement.innerText
            )
        ).toBeTruthy();
    });
});
