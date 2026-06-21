import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SolveDSA from "./pages/SolveDSA";
import MockInterview from "./pages/MockInterview";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication */}
                <Route path="/" element={<Login />} />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                {/* Main Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* Resume Analyzer */}
                <Route
                    path="/resume-analyzer"
                    element={<ResumeAnalyzer />}
                />

                {/* Solve DSA */}
                <Route
                    path="/solve-dsa"
                    element={<SolveDSA />}
                />

                {/* Mock Interview */}
                <Route
                    path="/mock-interview"
                    element={<MockInterview />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;