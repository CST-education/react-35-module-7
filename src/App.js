import { lazy, Suspense, createContext } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Loader } from './components/Loader/Loader';
import { Navigation } from './components/Navigation/Navigation';
export const MyContext = createContext();

// console.log('MyContext', MyContext.Provider);

// import { useHistory, useLocation } from 'react-router';

// DYNAMIC IMPORTS
const HomePage = lazy(() =>
  import('./pages/Home/Home' /* webpackChunkName: 'Home Page'*/),
);
const PexelsPage = lazy(() =>
  import('./pages/Pexels/Pexels' /* webpackChunkName: 'Pexels Page'*/),
);
const ProductsPage = lazy(() =>
  import('./pages/Products/Products' /* webpackChunkName: 'Products Page'*/),
);

function App() {
  // const history = useHistory();
  // console.log('App history:', history);
  // const location = useLocation();
  // console.log('App location:', location);

  // const backToHome = () => {
  //   history.push(location?.state?.from?.location ?? '/');
  // };
  return (
    <>
      <MyContext.Provider value={{ value: 'Context value' }}>
        <header>
          <MyContext.Consumer>{() => <Navigation />}</MyContext.Consumer>
        </header>
      </MyContext.Provider>
      <main>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/pexels">
              <PexelsPage title="Main Title" />
            </Route>
            <Route path="/products" component={ProductsPage} />
            <Route>
              <p>Page not found! please back to Home</p>
              {/* <button type="button" onClick={backToHome}>
                back to Home
              </button> */}
            </Route>
          </Switch>
        </Suspense>
      </main>
      <footer>
        <p>&copy; FE-35 all rights reserved 2021</p>
      </footer>
    </>
  );
}

export default App;
