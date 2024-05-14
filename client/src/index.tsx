import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './store/store'
import { Provider } from 'react-redux'
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Auth from "./pages/Auth";
import NoPage from "./pages/NoPage";
import './css/app.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="notes" element={<Notes />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);