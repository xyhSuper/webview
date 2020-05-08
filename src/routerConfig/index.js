import React, {Suspense} from "react";
import { Route, Router, Switch } from "react-router-dom";
import config from "./config";
import { createBrowserHistory } from "history";
const historys = createBrowserHistory({ basename: "/" });

const App = () => {

    return (
        <div style={{minHeight:"100vh"}}>
            <Router history={historys}>

                <Switch>
                    <Suspense fallback={<div> </div>}>
                    <Route exact path="/signing" component={config.signing} />
                    <Route exact path="/userAgreement" component={config.userAgreement} />
                    <Route exact path="/privacy" component={config.privacy} />
                    <Route exact path="/hassigned" component={config.Hassigned} />
                    </Suspense>
                </Switch>
            </Router>
        </div>
    )
};

export default App;
