import {
    act,
    cleanup,
    fireEvent,
    render,
    renderHook,
} from '@testing-library/react';
import React from 'react';
import { MainPage } from './MainPage';
import { useCurrentTime } from '../../hooks';
import '@testing-library/jest-dom';

beforeAll(() => {
    jest.useFakeTimers();
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
        getNextSortBy: jest.fn(() => 'по возрастанию цены'),
    };
});
describe('Main page live clock', () => {
    const getTime = () => new Date().toLocaleTimeString('ru-RU');
    it('should be called on advance time', () => {
        jest.spyOn(global, 'setInterval');
        const callback = jest.fn(getTime);

        renderHook(() => useCurrentTime(callback));
        expect(setInterval).toHaveBeenCalled();
        expect(callback).toHaveBeenCalled();
        cleanup();
    });

    it('should return correct time', () => {
        jest.spyOn(global, 'setInterval');
        const callback = jest.fn(getTime);

        const { result } = renderHook(() => useCurrentTime(callback));
        expect(result.current).toEqual(getTime());
        act(() => jest.advanceTimersByTime(69999));
        expect(result.current).toEqual(getTime());
        cleanup();
    });
});

describe('checks text fields on main page', () => {
    jest.mock('../../utils/getNextSortBy', () => {
        return {
            __esModule: true,
            getNextSortBy: jest.fn(() => 'по возрастанию цены'),
        };
    });

    it('should have VK Маркет name and match snapshot', () => {
        const renderedMainPage = render(<MainPage />);

        expect(renderedMainPage.getByText('VK Маркет')).toHaveClass(
            'main-page__title'
        );

        expect(renderedMainPage.asFragment()).toMatchSnapshot();
    });
});

describe('Main page select category', () => {
    it('click on the first matched button', () => {
        const renderedMainPage = render(<MainPage />);

        const categoryElement = renderedMainPage
            .getAllByTestId('button-select-category')
            .at(0);

        if (!categoryElement) {
            fail('no category button was found');
        }
        fireEvent.click(categoryElement);

        const productEdited = renderedMainPage.getAllByTestId(
            'product-card__category'
        );

        expect(
            productEdited.filter(
                (productCard) =>
                    productCard.innerText === categoryElement.innerText
            ).length
        ).toEqual(productEdited.length);
    });
});
