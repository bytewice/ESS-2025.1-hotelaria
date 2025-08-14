import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reservas from "./pages/Reservas";
import Quartos from "./pages/Quartos";
import Atrações from "./pages/Atrações";
import AdminAttractions from "./pages/AdminAttractions";
import AtracaoDetalhe from "./pages/AtraçãoDetalhe";
import { Admin, AdminUsers, UsersList, AdminList} from "./pages/Admin"
import { CreateUser, CreateAdmin} from './pages/AdminCreate'
import { DeleteUser, DeleteAdmin} from './pages/AdminDelete'
import { EditAdmin, EditUser } from "./pages/AdminEdit"; //fazer jaja
import Layout from "./Layout"; // Caminho para o Layout

export default function App() {
  return (  
    <Router>
      <Routes>
        {/* Home sem Layout */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        {/* Páginas secundárias com Layout */}
        <Route path="/home-admin" element={<Admin/>}/>
        <Route path="/admin-users" element={<AdminUsers/>}/>        
        <Route path="/userslist" element={<UsersList/>}/>
        <Route path="/adminlist" element={<AdminList/>}/>     
        <Route path="/createuser" element={<CreateUser/>}/>
        <Route path="/createadmin" element={<CreateAdmin/>}/>
        <Route path="/delete-user/:id" element={<DeleteUser/>}/>
        <Route path="/delete-admin/:id" element={<DeleteAdmin/>}/>

        <Route path="/adminatrações" element={<AdminAttractions/>}/>
        <Route path="/reservas" element={<Layout><Reservas /></Layout>} />
        <Route path="/quartos" element={<Layout><Quartos /></Layout>} />
        <Route path="/atracoes" element={<Layout><Atrações /></Layout>} />
        <Route path="/atracoes/:name" element={<Layout><AtracaoDetalhe /></Layout>} />
      </Routes>
    </Router>
  );
}
