import React from 'react';
import GoogleLogin from 'react-google-login'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'


import '../assets/css/App.css'
import '../assets/css/uikit.css'


function Login() {

    const history = useHistory();
    let Repsonse = (response) => {
        history.push({
            pathname: '/Mainpage',
            state: { detail: response.profileObj }
        });
    }
    return (
        <Router>
                <div class="uk-section uk-flex uk-animation-fade">
	<div class="uk-width-1-1">
		<div class="uk-container">
			<div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
				<div class="uk-width-1-1@m">
					<div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
						<h3 class="uk-card-title uk-text-center">Sign In With Google</h3>
						<form>
							<div class="uk-margin uk-text-center">
                            <GoogleLogin
                    clientId="1091976309647-sc0eo4a1hbrgt5c9332v1mht00vo5ls0.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={Repsonse}
                    cookiePolicy={'single_host_origin'}
                />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
        </Router>
    );
}

export default Login;
