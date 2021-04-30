import './App.css';
import { HomePage } from './components/HomePage'
import { AssetsPage } from './components/AssetsPage'
import { DetailsPage } from './components/DetailsPage'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { IStock, ITradingData, ITransaction, IUserData, IWatchItem } from './services/Interfaces';
import {getUserData} from './repository/GetUserData'
import { getWatchList } from './repository/GetWatchList';
import { PropertyKeys } from 'ag-grid-community';
import { getStocks } from './repository/GetStocks';
import { watch } from 'node:fs';

export const mockAPIServerURL = 'https://demomocktradingserver.azurewebsites.net';
export const currentUser = 'michael.de.keyser';

export default function App() {
    const [watchList, setWatchList] = useState<IWatchItem[]>();
    const [userData, setUserData] = useState<IUserData>();
	const [currentStock, setCurrentStock] = useState('');
	const [transactions, setTransactions] = useState<ITransaction[]>();
	const [stocks, setStocks] = useState<IStock[]>();
	
	const tradingData = {
		watchList: watchList,
		setWatchList: setWatchList,
		userData: userData,
		setUserData: setUserData,
		currentStock: currentStock,
		setCurrentStock: setCurrentStock,
		transactions: transactions,
		setTransactions: setTransactions,
		stocks: stocks,
		setStocks: setStocks,
	} as ITradingData;
	
	useEffect(()=>{
		getWatchList(setWatchList);
		getUserData(setUserData);
		getStocks(setStocks);
		if (watchList && watchList.length>0) 
			setCurrentStock(watchList[0].symbol) 
		else setCurrentStock('ACME');
	},[]);


	return (
		<div>
			<Router>
				<header className="main-header">
					<nav>
						<ul className="menu">
							<li className="menu__list-item"><a href="home.html" className="menu__list-item--active">
								<Link to="/">Home</Link>
							</a></li>
							<li className="menu__list-item"><a href="assets.html">
								<Link to="/assets">Assets</Link>
							</a></li>
							<li className="menu__list-item"><a href="details.html">
								<Link to="/details">Details</Link>
							</a></li>
						</ul>
					</nav>
				</header>
				<div>
					<Switch>
						<Route path="/assets">
							<AssetsPage tradingData={tradingData} />
						</Route>
						<Route path="/details">
							<DetailsPage tradingData={tradingData}/>
						</Route>
						<Route path="/">
							<HomePage tradingData={tradingData}/>
						</Route>
					</Switch>
				</div>
			</Router>

		</div>
	);
}
