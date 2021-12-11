import * as vscode from 'vscode';
import { textEditor } from './utils/utils';
import LocalStorageService from './helpers/localStorageService';

const saveSelectionToHistory = (history: LocalStorageService): void => {
	if (!textEditor) { return; }

	const document = textEditor.document;

	if (!document) { return; }

	// mimic vscode's behavior
	vscode.commands.executeCommand('editor.action.clipboardCopyAction');

	// get selection and story in the history
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

	vscode.window
		.showQuickPick(historyItems, {
			title: 'Copy Cat History',
			placeHolder: 'Select a line to paste',
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
	const storageManager = new LocalStorageService(context.globalState);
	const commandCopy = vscode.commands.registerCommand('copy-cat.copy', (): void => saveSelectionToHistory(storageManager));
	const commandshowHistory = vscode.commands.registerCommand('copy-cat.showHistory', (): void => showHistory(storageManager));
	const commandclearHistory = vscode.commands.registerCommand('copy-cat.clearHistory', (): void => clearHistory(storageManager));

	context.subscriptions.push(commandCopy);
	context.subscriptions.push(commandshowHistory);
	context.subscriptions.push(commandclearHistory);
}

// this method is called when your extension is deactivated
export function deactivate() { }
