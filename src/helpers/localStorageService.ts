import { Memento } from 'vscode';
export default class LocalStorageService {
  historyName: string = 'copy-cat-history';
  items: string[];

  constructor(private storage: Memento, private historyLimit: number) {
    this.items = [];
  }

  public get = (): string[] | undefined => {
    return this.storage.get(this.historyName);
  };

  public set = (value: string): void => {
    // add new item at the beginning of the array
    this.items.unshift(value);

    // remove last this.historyLimit items if the array is too long
    if (this.items.length > this.historyLimit) {
      this.items.pop();
    }

    this.storage.update(this.historyName, this.items);
  };

  public clear = (): void => {
    this.items = [];
    this.storage.update(this.historyName, '');
  };

  public setHistoryLimit = (limit: number): void => {
    this.historyLimit = limit;

    // FIXME: splice is buggy
    if (this.items.length > this.historyLimit) {
      this.items.splice(0, this.historyLimit + 1);
    }

    // FIXME: keep newest items, not oldest
    this.storage.update(this.historyName, this.items);
  };
}
