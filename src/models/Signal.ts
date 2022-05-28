export default class Signal {
  id: number;
  date: number;
  dateReadable: string;
  price: number;
  securityName: string;
  strategy: string;
  type: string;

  constructor(
    id: number,
    date: number,
    dateReadable: string,
    price: number,
    securityName: string,
    strategy: string,
    type: string,
  ) {
    this.id = id;
    this.date = date;
    this.dateReadable = dateReadable;
    this.price = price;
    this.securityName = securityName;
    this.strategy = strategy;
    this.type = type;
  }
}
