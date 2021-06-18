import { simonBretagnon } from '../src/ephemerides';

describe('Simon-Bretagnon Ephemeris', () => {
  test('Date in range', () => {
    const [p, v] = simonBretagnon(2400000.5, 43999.9, "mercury");
    expect(p.x).toBeCloseTo(0.2945293959257430832);
    expect(p.y).toBeCloseTo(-0.2452204176601049596);
    expect(p.z).toBeCloseTo(-0.1615427700571978153);
    expect(v.x).toBeCloseTo(0.1413867871404614441e-1);
    expect(v.y).toBeCloseTo(0.1946548301104706582e-1);
    expect(v.z).toBeCloseTo(0.8929809783898904786e-2);
  });
  test('Date outside range', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation()
    const [p, v] = simonBretagnon(2400000.5, -320000., "earth");
    expect(spy).toHaveBeenCalled();
    expect(p.x).toBeCloseTo(0.9308038666832975759);
    expect(p.y).toBeCloseTo(0.3258319040261346);
    expect(p.z).toBeCloseTo(0.142279454448114056);
    expect(v.x).toBeCloseTo(-0.6429458958255170006e-2);
    expect(v.y).toBeCloseTo(0.1468570657704237764e-1);
    expect(v.z).toBeCloseTo(0.6406996426270981189e-2);
    spy.mockRestore();
  });
  test("Invalid body", () => {
    expect(() => simonBretagnon(0, 0, "rupert")).toThrowError()
  })
});
