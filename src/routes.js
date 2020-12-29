import React from 'react';
import { BrowserRouter, Switch ,Route } from 'react-router-dom';

import Home from './pages/Home';
import AnimeView from './pages/AnimeView';
import Search from './pages/Search'
import CategoriesView from './pages/CategoriesView';

const Routes = () => {
    return (
        <BrowserRouter >
            <Switch >
                <Route exact path='/' component={Home} />
                <Route path='/anime/:id' component={AnimeView}/>
                <Route path='/search/:name' component={Search} />
                <Route path='/categories/:id' component={CategoriesView} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;