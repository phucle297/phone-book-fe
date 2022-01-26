import "./App.css";
import { createBrowserHistory } from "history";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
export const history = createBrowserHistory();

function App() {
  return (
    <HistoryRouter history={history}>
      {/* <Loading></Loading> */}
      <Routes>
        {/* <Route path="/" element={<HomeTemplate />}> */}
        {/* <Route path="/home" element={<HomePage />} />
          <Route path="/yoga" element={<YogaPage />} />
          <Route path="/apartment" element={<HomePage />} />
          <Route path="/" element={<HomePage />} /> */}
        {/* </Route> */}
        <Route path="/" element={<h1>abs</h1>} />
        <Route path="/home" element={<h1>Home</h1>} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
