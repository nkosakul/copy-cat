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
    // make sure, to add quotes so we can convert historyValue into a real array easier, later
    this.items.push(value);

    // remove every items that are not in the historyLimit
    if (this.items.length > this.historyLimit) {
      this.items.splice(0, this.items.length - this.historyLimit);
    }

    this.storage.update(this.historyName, this.items);
  };

  public clear = (): void => {
    this.storage.update(this.historyName, '');
  };
}