
import './App.css';
import store from "./redux/store";
import { Provider } from "react-redux";
import Repos from './components/userrepos/Repos';

function App() {
  return (
    <Provider store={store}>
   <Repos/>
   </Provider>
  );
}

export default App;
