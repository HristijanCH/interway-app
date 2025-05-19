import ProductsTable from "./pages/ProductsPage.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import Navbar from "./components/NavBar.tsx";

function App() {

    return (
        <Router>
            <Navbar/>
            <main className="p-4">
            <Routes>
                <Route path="/" element={<ProductsTable />} />
                <Route path="/products" element={<ProductsTable />} />
            </Routes>
            <ToastContainer />
                </main>
        </Router>
    )
}

export default App
