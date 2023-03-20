import { act, cleanup, renderHook } from '@testing-library/react';
import { useCurrentTime } from './useCurrentTime';
import '@testing-library/jest-dom';

beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01T00:00:00'));
});

afterAll(() => {
    jest.useRealTimers();
    cleanup();
});

describe('live clock', () => {
    const getTime = () => new Date().toLocaleTimeString('ru-RU');

    it('should return correct time', () => {
        const { result } = renderHook(() => useCurrentTime());
        expect(result.current).toEqual(getTime());
        act(() => jest.advanceTimersByTime(69999));
        expect(result.current).toEqual(getTime());
    });
});
