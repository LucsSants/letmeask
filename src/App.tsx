import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import  { ThemeProvider } from 'styled-components'

import { AuthContextProvider } from './contexts/AuthContext'

import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import GlobalStyle from './styles/global'

import {useTheme} from  './hooks/useTheme'


function App() {

  const theme = useTheme()
  console.log(theme.toggleTheme)

  return (
    <ThemeProvider theme={theme.theme}> 
    <GlobalStyle/>
    <BrowserRouter> 
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room}/>

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch> 
      </AuthContextProvider>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
