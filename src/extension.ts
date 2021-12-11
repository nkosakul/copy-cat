import * as vscode from 'vscode';
import { historyLimit, persistHistory } from './utils/utils';
import LocalStorageService from './helpers/localStorageService';

const saveSelectionToHistory = (
  history: LocalStorageService,
  action: string
): void => {
  const textEditor: vscode.TextEditor | undefined =
    vscode.window.activeTextEditor;

  if (!textEditor) {
    return;
  }

  const document = textEditor.document;

  if (!document) {
    return;
  }

  // mimic vscode's behavior
  vscode.commands.executeCommand(`editor.action.${action}`);

  // get selection and store it in the history
  textEditor.selections.map(selection => {
    const text = document.getText(selection);
    history.set(text);
  });
};

const showHistory = (history: LocalStorageService): void => {
  const historyItems = history.get();

  if (!historyItems) {
    vscode.window.showInformationMessage('Clipboard history is empty.');
    return;
  }

  vscode.window.showQuickPick(historyItems, {
    title: 'Copy Cat History',
    placeHolder: 'Copy a line to the clipboard',
    matchOnDescription: false,
    matchOnDetail: true,
    onDidSelectItem: (item: string) => {
      vscode.env.clipboard.writeText(item);
    },
  });
};

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  // clear history if persistHistory is false
  if (!persistHistory) {
    context.globalState.update('copy-cat-history', '');
  }

  // create storeManager
  const storageManager = new LocalStorageService(
    context.globalState,
    historyLimit
  );

  // register commands
  const commandCopy = vscode.commands.registerCommand(
    'copy-cat.copy',
    (): void => saveSelectionToHistory(storageManager, 'clipboardCopyAction')
  );
  const commandCut = vscode.commands.registerCommand('copy-cat.cut', (): void =>
    saveSelectionToHistory(storageManager, 'clipboardCutAction')
  );
  const commandshowHistory = vscode.commands.registerCommand(
    'copy-cat.showHistory',
    (): void => showHistory(storageManager)
  );
  const commandclearHistory = vscode.commands.registerCommand(
    'copy-cat.clearHistory',
    (): void => storageManager.clear()
  );

  // Create a status bar item
  const myStatusBarItem: vscode.StatusBarItem =
    vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
  myStatusBarItem.name = 'Copy Cat';
  myStatusBarItem.text = '$(github-alt) Copy Cat';
  myStatusBarItem.tooltip = 'Copy Cat: Show History';
  myStatusBarItem.command = 'copy-cat.showHistory';
  myStatusBarItem.show();

  context.subscriptions.push(commandCopy);
  context.subscriptions.push(commandCut);
  context.subscriptions.push(commandshowHistory);
  context.subscriptions.push(commandclearHistory);
  context.subscriptions.push(myStatusBarItem);

  // update historyLimit on configuration change
  vscode.workspace.onDidChangeConfiguration(() => {
    const historyLimit: number = vscode.workspace
      .getConfiguration('copy-cat')
      .get('limit', 15);
    storageManager.setHistoryLimit(historyLimit);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {
  // do nothing
}
