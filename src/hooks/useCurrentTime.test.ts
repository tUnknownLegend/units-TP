import { act, cleanup, renderHook } from '@testing-library/react';
import { useCurrentTime } from './useCurrentTime';
import '@testing-library/jest-dom';

const date = new Date('2020-01-01T00:00:00').toLocaleString();
beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01T00:00:00'));
    jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue(date);
});

afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    cleanup();
});

describe('live clock', () => {
    it('should return correct time', () => {
        const { result } = renderHook(() => useCurrentTime());
        expect(result.current).toEqual(date);
        act(() => jest.advanceTimersByTime(69999));
        expect(result.current).toEqual(date);
    });
});
