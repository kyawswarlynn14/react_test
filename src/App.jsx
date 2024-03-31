import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import Starter from "./pages/Starter";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Starter />}>
        <Route path="" element={<Login />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="chat" element={<Chat />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;