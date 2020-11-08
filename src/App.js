import { Route, Switch } from 'react-router-dom'
import Topbar from './components/layouts/topbar'
import Home from './components/layouts/home'
import Error from './components/layouts/error'
import Proyectos from './components/proyectos/proyectos'
import Proyecto from './components/proyectos/proyecto'

export default function App() {
  return (
    <div>
        <Topbar />

        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/proyectos/" component={Proyectos} exact />
            <Route path="/proyecto/:action/:id" component={Proyecto} />
            <Route component={Error} />
          </Switch>
        </div>
    </div>
  );
}
