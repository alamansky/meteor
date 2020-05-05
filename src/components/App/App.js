import React from 'react';
import Home from '../Home/Home';
import Admin from '../Admin/Admin';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

function App() {
    return (
        <main>
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/admin' component={Admin} exact />
            </Switch>
        </main>
    )
}

export default App;