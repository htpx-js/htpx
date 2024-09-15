export class CancelToken {
  constructor(executor) {
    this.promise = new Promise((resolve) => {
      executor((message) => {
        this.reason = message;
        resolve();
      });
    });
  }

  static source() {
    let cancel;
    const token = new CancelToken((c) => (cancel = c));
    return { token, cancel };
  }
}
