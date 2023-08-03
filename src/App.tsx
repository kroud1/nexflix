import React from 'react';
import './App.css';

import { Outlet, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Nav from './components/Nav';
import DetailPage from './pages/DetailPage';

// <{}> : props를 받지 않는다는 것을 명시
// Layout 컴포넌트는 Nav 컴포넌트, Outlet 컴포넌트, Footer 컴포넌트를 렌더링
// Outlet 컴포넌트 : 현재 URL에 해당하는 컴포넌트를 렌더링
const Layout: React.FC<{}> = () => {
  return(
    <div>
      <Nav/>

      <Outlet/>

      <Footer />
    </div>
  )
}

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* Layout의 Outlet 영역에 렌더링될 화면 작성 */}
          {/* npm install react-router-dom --save */}
          {/* <Route path=':movieId' element={<DetailPage />} /> */}
          {/* index : 해당 경로가 부모 경로에 정확히 일치할 때 랜더링되는 컴포넌트를 지정 */}
          <Route index element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
