import './App.css';
import PetForm from './components/PetForm';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import EditPet from './components/EditPet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<PetForm />} path="/pets/new" />
                    <Route element={<PetList />} path="/" default />
                    <Route element={<PetList />} path="/pets" default />
                    <Route element={<PetDetails />} path="/pets/:id" />
                    <Route element={<EditPet />} path="/pets/:id/edit" />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;