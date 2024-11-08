import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 导入 Routes 而不是 Switch
import CSVTable from './components/CSVTable'; // 导入表格页面
import DetailPage from './components/DetailPage'; // 导入详情页面

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 用 Routes 包裹 Route 组件 */}
                <Route path="/" element={<CSVTable />} />
                <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;
