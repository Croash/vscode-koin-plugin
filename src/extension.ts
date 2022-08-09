// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import DataProvider from './koinList';

let coinViewTimer: NodeJS.Timer | number | null = null;

export function activate(context: vscode.ExtensionContext) {
	// const subscriptions = []
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

	const startCmd = vscode.commands.registerCommand('koin.star', () => {
		const textEditor = vscode.window.activeTextEditor;
		const selectionCode = textEditor?.document.getText(textEditor.selection);
		console.log('selectionCode', selectionCode);
		vscode.window.showInformationMessage('koin edit!!');
	});


	// subscriptions.forEach(subs => context.subscriptions.push(subs))
	context.subscriptions.push(disposable);
	context.subscriptions.push(startCmd);
}

export function deactivate() {
	if(coinViewTimer) {
		clearInterval(coinViewTimer);
	}
}
