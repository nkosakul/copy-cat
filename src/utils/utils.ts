import * as vscode from 'vscode';

export const textEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

export const historyLimit: number = vscode.workspace.getConfiguration('copy-cat').get('limit', 15);