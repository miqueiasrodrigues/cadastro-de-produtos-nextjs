export default class Product {
  private _id: string;
  private _name: string;
  private _value: number;

  constructor(name: string = "", value: number = 0, id: string = "") {
    this._id = id;
    this._name = name;
    this._value = value;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  get value() {
    return this._value;
  }
}
