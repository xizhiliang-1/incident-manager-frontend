// DetailPage.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // 导入 useLocation 来获取路由传递的数据
import '../style/DetailPage.css'; // 自定义详情页面样式

const DetailPage = () => {
    const location = useLocation(); // 获取当前页面的路由信息
    const { row } = location.state; // 获取传递的行数据

    return (
        <div className="detail-container">
            <h2>Detail Information</h2>
            <div className="detail-content">
                {Object.keys(row).map((key) => (
                    <div key={key} className="detail-item">
                        <strong>{key}:</strong> {row[key]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailPage;
