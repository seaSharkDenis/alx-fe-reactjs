import "./App.css";
import ProfilePage from "./components/ProfilePage";
import { UserContext } from "./components/UserContext";

function App() {
  const userData = { name: "John Doe", email: "jane.doe@example.com" };

  return (
    
    <>
    < UserContext.Provider value={userData}>
     <ProfilePage />
    </UserContext.Provider>
     
    </>
  );
}

export default App;
