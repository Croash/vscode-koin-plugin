import * as vscode from 'vscode';
import axios from 'axios';
import { coinInterface, getData, baseCoinInterface } from './utils';
// this is a static render way
// dynamic way need ftpmodel
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

class koinList implements vscode.TreeDataProvider<any> {
  constructor() {}
	getTreeItem(element: TreeViewItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	async getChildren(element?: TreeViewItem): Promise<TreeViewItem[]> {
    const res: any = await axios.get('https://api.huobi.pro/market/tickers');
		const data: baseCoinInterface[] = res?.data?.data || [];
		// console.log(data?.filter(({symbol}) => symbol === 'btcusdt'));
		let parsedData = getData(data);
		// parsedData = [{label: '123'}, { label: 'test' }, { label: 'asdt' }];
		// console.log('parsedData', parsedData);
		return Promise.resolve(
			parsedData?.map(({label}) => new TreeViewItem(label)) || []
		);


	}
}

export default koinList;
