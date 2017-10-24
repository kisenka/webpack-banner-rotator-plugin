export default class ClosedBannersStorage {
  constructor(key) {
    this.storageKey = key;

    if (this.get() === null) {
      this.set([]);
    }
  }

  /**
   * @param {string} idsString
   * @return {Array<string>}
   */
  static parse(idsString) {
    return idsString.split(',');
  }

  /**
   * @param {Array<string>} idsArray
   * @return {string}
   */
  static stringify(idsArray) {
    return idsArray.join(',');
  }

  has(bannerId) {
    const val = this.get();
    return val && val.includes(bannerId);
  }

  add(bannerId) {
    const ids = this.get();
    ids.push(bannerId);
    this.set(ids);
  }

  /**
   * @return {Array<string>}
   */
  get() {
    const rawValue = window.localStorage.getItem(this.storageKey);
    return rawValue !== null ? ClosedBannersStorage.parse(rawValue) : null;
  }

  /**
   * @param {Array<string>} value
   */
  set(value) {
    window.localStorage.setItem(this.storageKey, ClosedBannersStorage.stringify(value));
  }
}