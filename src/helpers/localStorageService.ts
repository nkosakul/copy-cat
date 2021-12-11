import { Memento } from 'vscode';

// type Buffer = string[][];
export default class LocalStorageService {
  historyName: string = 'copy-cat-history';
  items: string[];

  constructor(private storage: Memento) {
    this.items = [];
  }

  public get = (key: string): string | undefined => {
    return this.storage.get(key);
  };

  public set = (value: string): void => {
    // make sure, to add quotes so we can convert historyValue into a real array easier, later
    this.items.push(`"${value}"`);

    // reverse array, so newest copied items are on top
    const reversedItems = this.items.reverse();
    this.storage.update(this.historyName, `[${reversedItems}]`);
  };

  public clear = (): void => {
    this.storage.update(this.historyName, '');
  };
}