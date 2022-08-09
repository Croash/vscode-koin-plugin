export enum upStatus {
	up = '📈',
	down = '📉'
}

export enum filList {
  'btcusdt' = 'BTC',
  'ethusdt' = 'ETH',
  'dogeusdt' = 'DOGE',
  'ltcusdt' = 'LTC',
  'shibusdt' = 'SHIB',
  'filusdt' = 'FIL',
  'zenusdt' = 'ZEN',
  'dydxusdt' = 'DYDX'
};

// export const filList = {
//   btcusdt :'BTC',
//   ethusdt :'ETH',
//   dogeusdt :'DOGE',
//   ltcusdt :'LTC',
//   filusdt :'FIL',
//   zenusdt :'ZEN',
//   dydxusdt :'DYDX',
// };
type filListType = keyof typeof filList;
export interface baseCoinInterface {
  symbol: filListType | string //filList | string 
  open: number
  close: number
}

export interface coinInterface {
  icon?: string
  label: string
  link?: string
  symbol?: string
}

export function getData(initArr: baseCoinInterface[]) : coinInterface[] {
  const arr = initArr?.filter(({symbol}) => {
    return !!filList[symbol as filListType];
  }).map(({ symbol, open, close }) => {
    const bigger = close > open;
    return {
      label: `${bigger ? upStatus['up'] : upStatus['down']} ${filList[symbol as filListType]} ${close} ${((close / open)*100 - 100).toFixed(2)}%`
    };
  });
  return arr;
}
