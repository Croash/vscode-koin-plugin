import * as vscode from 'vscode';

class TreeViewItem extends vscode.TreeItem {
	constructor(label: string, collapsibleState?: vscode.TreeItemCollapsibleState) {
		super(label, collapsibleState);
	}
}

class koinList implements vscode.TreeDataProvider<any> {
  constructor() {}
	getTreeItem(element: TreeViewItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	getChildren(element?: TreeViewItem): vscode.ProviderResult<TreeViewItem[]> {
		return Promise.resolve([
			new TreeViewItem('TreeItem-01'),
			new TreeViewItem('TreeItem-02'),
			new TreeViewItem('TreeItem-03'),
		]);
	}
}

export default koinList;
