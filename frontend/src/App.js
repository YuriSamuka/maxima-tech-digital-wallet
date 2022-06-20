import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import  { Layout }  from "./components/Layout";
import  { Unauthorized }  from "./components/Unauthorized";
import  { RequireAuth }  from "./components/RequireAuth";
import  { Missing }  from "./components/Missing";
import  { Wallet }  from "./components/Wallet";
import  { SignUp }  from "./components/SignUp";
import  { Login }  from "./components/Login";

function App() {

  const location = useLocation();

  return (
    <div className="main-content">
      <div className="w-100 d-block m-auto" style={{ height: "100px"}}>
        <img className="h-100 d-block m-auto" src="/logo.jpg"></img>
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Wallet actoin="summary" />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/transfer" element={<Wallet actoin="transfer"/>} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
