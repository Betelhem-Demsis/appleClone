import NavBar from './components/NavBar'; 
import Alert from './components/Alert';
import { Route, Routes } from "react-router-dom";
import Iphone from './components/Iphone';
import FirstSection from './components/FirstSection';
import SecondSection from './components/SecondSection';
import YoutubeVideos from './components/YoutubeVideos';
import ThirdSection from './components/ThirdSection';
import FourthSection from './components/FourthSection';
import FifthSection from './components/FifthSection';
import SixthSection from './components/SixthSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NavBar /> 
      <Routes>
        <Route path="/" element={
          <>
             <Alert />
            <FirstSection />
            <SecondSection />
            <YoutubeVideos />
            <ThirdSection />
            <FourthSection />
            <FifthSection />
            <SixthSection />   
          </>
        } />
        <Route path="/iphone" element={<Iphone />} />  
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
