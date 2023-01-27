import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        rtl={false}
        newestOnTop
        draggable  
        pauseOnHover
        closeButton
      />
      <div>
        <Router />
      </div>
    </BrowserRouter>
  )
}

export default App
