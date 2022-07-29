import './styles/App.css';
import "./utils/dropConsole";

import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import PublicProfileView from './routes/publicProfileView';
import NotFound from './routes/notFound';


function App() {

  return (
    
    <HashRouter>
    <Routes>
      <Route exact path="/" element={<NotFound/>}></Route>
       <Route exact path="u/:publicId" element={<PublicProfileView />}></Route>
       <Route exact path="/:publicId" element={<PublicProfileView />}></Route>
    </Routes>
  </HashRouter>
  );
}

export default App;
