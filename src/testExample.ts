/**
 * 每个行省（province）都有一份生产计划，计划中包含需求量（demand）和采购价格（price）。
 * 每个行省都有一些生产商（producer），他们各自以不同的成本价（cost）供应一定数量的产品。
 * 界面上还会显示，当商家售出所有的商品时，他们可以获得的总收入（full revenue）。
 * 页面底部展示了该区域的产品缺额（需求量减去总产量）和总利润（profit）。
 */

class Producer {
  private _province: Province;
  private _cost: number;
  private _name: string;
  private _production: number;

  constructor(aProvince: Province, data: Producer) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }

  get name() {
    return this._name;
  }
  get cost() {
    return this._cost;
  }
  set cost(value) {
    this._cost = value;
  }
  get production() {
    return this._production;
  }
  set production(value) {
    const newProduction = Number.isNaN(value) ? 0 : value;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}

export class Province {
  private _name: string;
  private _producers: Producer[];
  private _totalProduction: number;
  private _demand: number;
  private _price: number;

  constructor(doc: IProvinceData) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d: Producer) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg: Producer) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get name() {
    return this._name;
  }
  get producers() {
    return this._producers.slice();
  }
  get totalProduction() {
    return this._totalProduction;
  }
  set totalProduction(arg) {
    this._totalProduction = arg;
  }
  get demand() {
    return this._demand;
  }
  set demand(value) {
    this._demand = value;
  }
  get price() {
    return this._price;
  }
  set price(value) {
    this._price = value;
  }
  get shortfall() {
    return this._demand - this.totalProduction;
  }
  get profit() {
    return this.demandValue - this.demandCost;
  }
  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a: Producer, b: Producer) => a.cost - b.cost)
      .forEach((p: Producer) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }
}

export interface IProvinceData {
  name: string;
  producers: Producer[];
  demand: number;
  price: number;
}

export function sampleProvinceData() {
  return {
    name: 'Asia',
    producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}
