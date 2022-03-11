import "antd/dist/antd.min.css";
import "./App.css";
import { createBrowserHistory } from "history";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import AuthenticateTemplate from "./templates/AuthenticateTemplate/AuthenticateTemplate";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import HomePage from "./pages/HomePage";
import Loading from "./components/Loading/Loading";

export const history = createBrowserHistory();

function App() {
  return (
    <HistoryRouter history={history}>
      <Loading></Loading>
      <Routes>
        <Route path="auth" element={<AuthenticateTemplate />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<UserTemplate />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
