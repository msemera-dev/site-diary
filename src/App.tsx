import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPage from "./components/ListPage/List";
import ViewPage from "./components/ViewPage/View";
import CreatePage from "./components/CreatePage/Create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;