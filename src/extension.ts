// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import DataProvider from './koinList';

let coinViewTimer: NodeJS.Timer | number | null = null;

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('koin.registerDataProvider', () => {
		const callback = () => {
			const data = new DataProvider();
			// By default, registerTreeDataProvider will run while the page in the view. 
			vscode.window.registerTreeDataProvider('coinCheckerView',data);
		};
		if(!coinViewTimer) {
			setImmediate(callback);
			coinViewTimer = setInterval(callback, 10000);
		}
		vscode.window.showInformationMessage('Create coin-checker-view!');
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {
	if(coinViewTimer) {
		clearInterval(coinViewTimer);
	}
}
