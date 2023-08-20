class Stopwatch {
  _start: Date;

  constructor() {
    this._start = new Date();
  }

  public reset(): void {
    this._start = new Date();
  }

  public get elapsed(): number {
    return new Date().getTime() - this._start.getTime();
  }
}

export default Stopwatch;
