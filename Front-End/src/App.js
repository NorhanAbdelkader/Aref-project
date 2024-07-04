import { Routes, Route  } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Authentication from "./components/authenticationComponents/Authentication";
import HomePage from "./pages/Homepage";
import Library from "./components/libraryComponents/Library";
import BookDetails from './components/libraryComponents/BookDetails'
import UserProfile from "./pages/ProfilePage";
import AuthProvider from "./hooks/AuthProvider";


function App() {
  return (

    <main className="main-container">
      <AuthProvider>
        <Routes>
          {/*Public */}
          <Route path="/" element={<MainPage />} />
          <Route path="/signIn" element={<Authentication signIn={true} />} />
          <Route path="/signUp" element={<Authentication signIn={false} />} />

          {/*Private */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/library" element={<Library/>} />
          <Route exact path="/library/:id" element={<BookDetails/>} />
          {/*<Route path="/library" element={<LibraryPage />} />*/}
          <Route path="/profile/:userId" element={<UserProfile />} />

        </Routes>
      </AuthProvider>
    </main>



  );
}

export default App;
