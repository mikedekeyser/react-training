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
import { ITradingData, IUserData, IWatchItem } from './services/Interfaces';
import {getUserData} from './repository/GetUserData'
import { getWatchList } from './repository/GetWatchList';

export const mockAPIServerURL = 'https://demomocktradingserver.azurewebsites.net';
export const currentUser = 'michael.de.keyser';

export default function App() {
    const [watchList, setWatchList] = useState<IWatchItem[]>();
    const [userData, setUserData] = useState<IUserData>();
	const tradingData = {
		watchList: watchList,
		setWatchList: setWatchList,
		userData: userData,
		setUserData: setUserData,
	} as ITradingData;
	
	useEffect(()=>{
		getWatchList(setWatchList);
		getUserData(setUserData);
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
							<AssetsPage />
						</Route>
						<Route path="/details">
							<DetailsPage />
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
