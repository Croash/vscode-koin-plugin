// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import DataProvider from './koinList';

export function activate(context: vscode.ExtensionContext) {
  console.log('activate123');
	let disposable = vscode.commands.registerCommand('koin.registerDataProvider', () => {
		console.log('activate998');
    vscode.window.registerTreeDataProvider('coinCheckerView', new DataProvider());
		vscode.window.showInformationMessage('Create coin-checker-view!');
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}
