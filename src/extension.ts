import * as vscode from 'vscode';
import { textEditor } from './utils/utils';
import LocalStorageService from './helpers/localStorageService';

const saveSelectionToHistory = (history: LocalStorageService): void => {
	if (!textEditor) { return; }

	const document = textEditor.document;

	if (!document) { return; }

	vscode.commands.executeCommand('editor.action.clipboardCopyAction');

	const selection = textEditor.selection;
	const text = document.getText(selection);
	history.set(text);
};

const showHistory = (history: LocalStorageService): void => {
	const historyValue = history.get('copy-cat-history');

	if (!historyValue) {
		vscode.window.showInformationMessage('Clipboard history is empty.');
		return;
	}

	// convert string array to real array
	const items: string[] = JSON.parse(historyValue);
	vscode.window
		.showQuickPick(items, {
			title: 'Copy Cat History',
			placeHolder: 'Select a line to paste',
			matchOnDescription: false,
			matchOnDetail: true,
			onDidSelectItem: (item: string) => {
				vscode.env.clipboard.writeText(item);
			}
		});

};

export function activate(context: vscode.ExtensionContext): any {
	const storageManager = new LocalStorageService(context.workspaceState);
	const commandCopy = vscode.commands.registerCommand('copy-cat.copy', (): void => saveSelectionToHistory(storageManager));
	const commandshowHistory = vscode.commands.registerCommand('copy-cat.showHistory', (): void => showHistory(storageManager));

	context.subscriptions.push(commandCopy);
	context.subscriptions.push(commandshowHistory);
}

// this method is called when your extension is deactivated
export function deactivate() { }
