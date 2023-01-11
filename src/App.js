import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthContextData from './components/Auth/AuthContext';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const authCtx=useContext(AuthContextData)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.islogin&&<Route path='/auth'>
          <AuthPage />
        </Route>}
        {authCtx.islogin&&<Route path='/profile'>
          <UserProfile />
        </Route>}
      </Switch>
    </Layout>
  );
}

export default App;
