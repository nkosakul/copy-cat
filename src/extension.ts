import * as vscode from 'vscode';
import { textEditor, historyLimit } from './utils/utils';
import LocalStorageService from './helpers/localStorageService';

const saveSelectionToHistory = (history: LocalStorageService, action: string): void => {
	if (!textEditor) { return; }

	const document = textEditor.document;

	if (!document) { return; }

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

	// // reverse array, so newest copied items are at top position
	// const reversedItems = historyItems.reverse();

	vscode.window
		.showQuickPick(historyItems, {
			title: 'Copy Cat History',
			placeHolder: 'Copy a line to the clipboard',
			matchOnDescription: false,
			matchOnDetail: true,
			onDidSelectItem: (item: string) => {
				vscode.env.clipboard.writeText(item);
			}
		});
};

const clearHistory = (history: LocalStorageService): void => history.clear();

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext): any {
	const storageManager = new LocalStorageService(context.globalState, historyLimit);
	const commandCopy = vscode.commands.registerCommand('copy-cat.copy', (): void => saveSelectionToHistory(storageManager, 'clipboardCopyAction'));
	const commandCut = vscode.commands.registerCommand('copy-cat.cut', (): void => saveSelectionToHistory(storageManager, 'clipboardCutAction'));
	const commandshowHistory = vscode.commands.registerCommand('copy-cat.showHistory', (): void => showHistory(storageManager));
	const commandclearHistory = vscode.commands.registerCommand('copy-cat.clearHistory', (): void => clearHistory(storageManager));

	context.subscriptions.push(commandCopy);
	context.subscriptions.push(commandCut);
	context.subscriptions.push(commandshowHistory);
	context.subscriptions.push(commandclearHistory);
}

// this method is called when your extension is deactivated
export function deactivate() { }
