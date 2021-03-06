import * as vscode from 'vscode';

export const historyLimit: number = vscode.workspace
  .getConfiguration('copy-cat')
  .get('limit', 15);

export const persistHistory: boolean = vscode.workspace
  .getConfiguration('copy-cat')
  .get('persistHistory', true);
