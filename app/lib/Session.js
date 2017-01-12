export default class Session {

  static storageKey = 'account';

  static login(account) {
    window.localStorage.setItem(Session.storageKey, JSON.stringify(account));
  }

  static logout() {
    window.localStorage.removeItem(Session.storageKey);
  }

  static current() {
    if (window.localStorage === undefined) {return null;}
    let account = window.localStorage.getItem(Session.storageKey);
    if (account != null) {
      return JSON.parse(account);
    } else {
      return null;
    }
  }
}
