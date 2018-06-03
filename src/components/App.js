import React from 'react';
import { BrowserRouter , Route  } from 'react-router-dom'

import NavigationBar from './NavigationBar'

import Landing from './Landing'
import SignupPage from './sign/SignupPage'
import LoginPage from './login/LoginPage'
import PlayerPage from './player/PlayerPage'

class App extends React.Component{
    render(){
        return (
            <div className="container">
                <BrowserRouter>

                    <div>
                        <NavigationBar/>
                        
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/signup" component={SignupPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/player" component={PlayerPage} />
                        
                    </div>

                </BrowserRouter>
            </div>
        )
    }
   
}
export default App