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

export const mockAPIServerURL = 'https://demomocktradingserver.azurewebsites.net';
export const currentUser = 'michael.de.keyser';

export default function App() {
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
							<HomePage />
						</Route>
					</Switch>
				</div>
			</Router>

		</div>
	);
}
