import WeatherDashboard from "./components/WeatherDashboard"
import Header from "./components/Header"
import Footer from "./components/Footer"
import "./App.css"

const App = () => {
  return (
    <div className="app">
      <Header />
      <WeatherDashboard />
      <Footer />
    </div>
  )
}

export default App