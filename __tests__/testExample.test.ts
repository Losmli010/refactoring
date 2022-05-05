import { Province, sampleProvinceData } from '../src/testExample';
import type { IProvinceData } from '../src/testExample';

/**
 * 测试策略
 * 观察被测试类应该做的所有事情，然后对这个类的每个行为进行测试，包括各种可能使它发生异常的边界条件。
 */

// 正常行为测试
describe('province', function () {
  let asia: Province;
  beforeEach(function () {
    asia = new Province(sampleProvinceData() as IProvinceData);
  });

  it('shortfall', function () {
    expect(asia.shortfall).toEqual(5);
  });

  it('profit', function () {
    expect(asia.profit).toEqual(230);
  });

  it('change production', function () {
    asia.producers[0].production = 20;
    expect(asia.shortfall).toEqual(-6);
    expect(asia.profit).toEqual(292);
  });

  it('zero demand', function () {
    asia.demand = 0;
    expect(asia.shortfall).toEqual(-25);
    expect(asia.profit).toEqual(0);
  });

  it('negative demand', function () {
    asia.demand = -1;
    expect(asia.shortfall).toEqual(-26);
    expect(asia.profit).toEqual(-10);
  });

  //   it('empty string demand', function () {
  //     asia.demand = Number.NaN;
  //     /* @typescript-eslint/no-unused-expressions */
  //     expect(asia.shortfall).toBeNaN;
  //     /* @typescript-eslint/no-unused-expressions */
  //     expect(asia.profit).toBeNaN;
  //   });
});

// 探测边界条件
describe('no producers', function () {
  let noProducers: Province;
  beforeEach(function () {
    const data = () => {
      return { name: 'No proudcers', producers: [], demand: 30, price: 20 };
    };
    noProducers = new Province(data() as IProvinceData);
  });
  it('shortfall', function () {
    expect(noProducers.shortfall).toEqual(30);
  });

  it('profit', function () {
    expect(noProducers.profit).toEqual(0);
  });
});
