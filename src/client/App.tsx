import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/app'
import Chirps from './components/Chirps';
import Nav from './components/Navbar';
import CreateChirp from './components/CreateChirp';
import SingleChirp from './components/SingleChirp';

const App: React.FC<IAppProps> = props => {

	return (
		<Router>
			<>
				<Nav />
				<Switch>
					<Route exact path='/' component={Chirps} />
					<Route exact path='/chirp/add' component={CreateChirp} />
					<Route exact path='/:id' component={SingleChirp} />
				</Switch>
			</>
		</Router>
	)
};

export interface IAppProps { }

export default App;
