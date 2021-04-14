import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./component/Main";
import Login from "./component/Login";
import Signup from "./component/Signup";
import "./css/login.css";
import SigninWithPhone from "./component/SigninWithPhone";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/signup" component={Signup}></Route>
					<Route exact path="/signinphone" component={SigninWithPhone}></Route>
					<Main></Main>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
