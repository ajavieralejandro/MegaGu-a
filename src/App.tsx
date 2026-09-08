import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { BusinessPage } from './pages/BusinessPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';
import { JoinPage } from './pages/JoinPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SearchPage } from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="buscar" element={<SearchPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
          <Route path="categoria/:slug" element={<CategoryPage />} />
          <Route path="negocio/:slug" element={<BusinessPage />} />
          <Route path="sumate" element={<JoinPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
