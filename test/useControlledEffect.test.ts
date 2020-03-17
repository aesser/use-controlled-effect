import { renderHook, act } from '@testing-library/react-hooks';
import useControlledEffect from '../src/useControlledEffect';

describe('useControlledEffect', () => {
    it('should run once when it should run immediately', () => {
        const callback = jest.fn();
        const runImmediately = () => true;
        const someInput = 1;

        const { result } = renderHook(() => useControlledEffect(callback, runImmediately, [someInput], 50));
        expect(callback).toHaveBeenCalledTimes(1);      // useEffect is called immediately
    });

    it('should run once when it should not run immediately', () => {
        jest.useFakeTimers();
        const callback = jest.fn();
        const runImmediately = () => false;
        let someInput = 1;

        const { result, rerender } = renderHook(() => useControlledEffect(callback, runImmediately, [someInput], 50));
        
        expect(callback).not.toBeCalled();              // we're not using useEffect and therefore execution of callback doesn't run immediatley
        
        someInput = 3;                                  // change input and force rerender
        rerender([someInput]);
        
        jest.advanceTimersByTime(51);
        
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
