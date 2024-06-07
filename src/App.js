import { Routes, Route } from "react-router-dom";
import MainPage from "./landingComponents/MainPage";
import Authentication from "./authenticationComponents/Authentication";
import HomePage from "./pages/Homepage";

import LibraryPage from "./pages/LibraryPage";
import UserProfile from "./pages/ProfilePage";

function App() {
  return (
    <main className="main-container">
      <Routes>
        {/*Public */}
        <Route path="/" element={<MainPage />}/>
        <Route path="/signIn" element={<Authentication signIn={true}/>} />
        <Route path="/signUp" element={<Authentication signIn={false}/>} />

        {/*Private */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/profile" element={<UserProfile />} />

      </Routes>
    </main>
  );
}

export default App;
