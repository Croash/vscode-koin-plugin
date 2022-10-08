import * as vscode from 'vscode';
import axios from 'axios';
import { coinInterface, getData, baseCoinInterface } from './utils';

// api https://api.huobi.pro/market/tickers

// extension:
// 'coin.focus'
// icon:
// 'star0.png'
// label:
// '「ETH」1660.31 📈 2.78%'
// link:
// 'https://www.huobi.pro/zh-cn/exchange/eth_usdt'
// symbol:
// 'ethusdt'
class TreeViewItem extends vscode.TreeItem {
	constructor(label: string, collapsibleState?: vscode.TreeItemCollapsibleState) {
		super(label, collapsibleState);
	}
}

class coinViewerList implements vscode.TreeDataProvider<any> {
  constructor() {}
	getTreeItem(element: TreeViewItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	async getChildren(element?: TreeViewItem): Promise<TreeViewItem[]> {
    const res: any = await axios.get('https://api.huobi.pro/market/tickers');
		const data: baseCoinInterface[] = res?.data?.data || [];
		let parsedData = getData(data);
		return Promise.resolve(
			parsedData?.map(({label}) => new TreeViewItem(label)) || []
		);


	}
}

export default coinViewerList;
