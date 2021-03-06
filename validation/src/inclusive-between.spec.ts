import { AbstractControlState, box, unbox, validate } from 'ngrx-forms';
import { inclusiveBetween } from './inclusive-between';

describe(inclusiveBetween.name, () => {
  it('should throw for null min parameter', () => {
    expect(() => inclusiveBetween(null as any, 100)).toThrow();
  });

  it('should throw for undefined min parameter', () => {
    expect(() => inclusiveBetween(undefined as any, 100)).toThrow();
  });

  it('should throw for null max parameter', () => {
    expect(() => inclusiveBetween(0, null as any)).toThrow();
  });

  it('should throw for undefined max parameter', () => {
    expect(() => inclusiveBetween(0, undefined as any)).toThrow();
  });

  it('should not return an error for null', () => {
    expect(inclusiveBetween(0, 100)(null)).toEqual({});
  });

  it('should not return an error for undefined', () => {
    expect(inclusiveBetween(0, 100)(undefined)).toEqual({});
  });

  it('should not return an error for non-numeric value', () => {
    expect(inclusiveBetween(0, 100)('string' as any)).toEqual({});
  });

  it('should not return an error if value is greater than min and less than max', () => {
    expect(inclusiveBetween(0, 100)(50)).toEqual({});
  });

  it('should not return an error if value is equal to min', () => {
    expect(inclusiveBetween(0, 100)(0)).toEqual({});
  });

  it('should not return an error if value is less than max', () => {
    expect(inclusiveBetween(0, 100)(99)).toEqual({});
  });

  it('should return errors with min, max and actual properties if less than min', () => {
    const min = 0;
    const max = 100;
    const actual = -1;
    expect(inclusiveBetween(0, 100)(actual)).toEqual({
      inclusiveBetween: {
        min,
        max,
        actual,
      },
    });
  });

  it('should return errors with min, max and actual properties if greater than max', () => {
    const min = 0;
    const max = 100;
    const actual = 101;
    expect(inclusiveBetween(0, 100)(actual)).toEqual({
      inclusiveBetween: {
        min,
        max,
        actual,
      },
    });
  });

  it('should not return an error if boxed value is greater than min and less than max', () => {
    expect(inclusiveBetween(0, 100)(box(50))).toEqual({});
  });

  it('should not return an error if boxed value is equal to min', () => {
    expect(inclusiveBetween(0, 100)(box(0))).toEqual({});
  });

  it('should not return an error if boxed value is equal to max', () => {
    expect(inclusiveBetween(0, 100)(box(100))).toEqual({});
  });

  it('should return errors with min, max and actual properties for boxed values if less than min', () => {
    const min = 0;
    const max = 100;
    const actual = box(-1);
    expect(inclusiveBetween(min, max)(actual)).toEqual({
      inclusiveBetween: {
        min,
        max,
        actual: unbox(actual),
      },
    });
  });

  it('should return errors with min, max and actual properties for boxed values if greater than max', () => {
    const min = 0;
    const max = 100;
    const actual = box(101);
    expect(inclusiveBetween(min, max)(actual)).toEqual({
      inclusiveBetween: {
        min,
        max,
        actual: unbox(actual),
      },
    });
  });

  it('should properly infer value type when used with validate update function', () => {
    // this code is never meant to be executed, it should just pass the type checker
    if (1 !== 1) {
      // tslint:disable-next-line:no-non-null-assertion
      const state: AbstractControlState<number> = undefined!;
      const v = validate(state, inclusiveBetween(0, 100));
      const v2: number = v.value;
      console.log(v2);
    }
  });
});
