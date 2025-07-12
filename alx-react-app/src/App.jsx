import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import WelcomeMessage from "./components/WelcomeMessage";

function App() {

  return (
    <>
      <Header />
      <WelcomeMessage />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
