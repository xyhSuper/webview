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
                    <Suspense fallback={<div>Loading...</div>}>
                    <Route exact path="/signing" component={config.signing} />
                    </Suspense>
                </Switch>
            </Router>
        </div>
    )
};

export default App;
