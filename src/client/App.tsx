import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/app'
import Chirps from './components/Public/Chirps';
import Nav from './components/Public/Navbar';
import CreateChirp from './components/Private/CreateChirp';
import SingleChirp from './components/Public/SingleChirp';
import Profile from './components/Private/Profile';
import Register from './components/Public/Register';
import Login from './components/Public/Login';
import PrivateRoute from './components/Private/PrivateRoute';
import Edit from './components/Private/EditChirp';

const App: React.FC= () => {

	return (
		<Router>
			<>
				<Nav />
				<Switch>
					<Route exact path='/' component={Chirps} />
					<Route exact path='/:id' component={SingleChirp} />
					<Route exact path='/chirp/register' component={Register} />
					<Route exact path='/chirp/login' component={Login} />
					<PrivateRoute exact path='/:id/edit'> <Edit /> </PrivateRoute>
					<PrivateRoute exact path='/chirp/add'> <CreateChirp /> </PrivateRoute>
					<PrivateRoute exact path='/chirp/profile'> <Profile /> </PrivateRoute>

				</Switch>
			</>
		</Router>
	)
};

console.log('%cLike what you see?....', 'color: black; background: white; border: 2px solid pink; font-size: large; font-weight: bold')
console.log('%cI am looking to get hired! Contact me at carpentieri.a@gmail.com', 'color: black; background: white; border: 2px solid pink; font-size: large; font-weight: bold')


export default App;
