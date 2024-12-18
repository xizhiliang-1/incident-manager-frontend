import React, { useEffect, useState } from 'react';
import '../style/TableStyles.css'; // 导入样式
import '../style/HeaderStyles.css'; // 导入样式

const CSVTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const txtFilePath = `${process.env.PUBLIC_URL}/data/example.txt`;

        fetch(txtFilePath)
            .then((response) => response.text())
            .then((text) => {
                const lines = text.trim().split('\n');
                const headers = lines[0].split(',');
                const parsedData = lines.slice(1).map((line) => {
                    const values = line.split(',');
                    const row = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index];
                    });
                    return row;
                });

                setData(parsedData);
                setFilteredData(parsedData); // 初始化时，显示所有数据
            })
            .catch((error) => {
                console.error('Error reading TXT file:', error);
            });
    }, []);

    // 排序函数
    const sortData = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...filteredData].sort((a, b) => {
            const aValue = isNaN(a[key]) ? a[key] : Number(a[key]); // 检测并转换为数字
            const bValue = isNaN(b[key]) ? b[key] : Number(b[key]); // 检测并转换为数字

            if (aValue < bValue) {
                return direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setFilteredData(sortedData);
        setSortConfig({ key, direction });
    };

    // 筛选函数
    const handleFilterChange = (event, key) => {
        const value = event.target.value.toLowerCase();
        setFilters({ ...filters, [key]: value });

        const filteredRows = data.filter((row) => {
            return row[key].toLowerCase().includes(value);
        });

        setFilteredData(filteredRows);
    };

    return (
        <div>
            {/* Logo 和标题部分 */}
            <div className="header">
                <img src={`${process.env.PUBLIC_URL}/images/hsbc.jfif`} alt="Logo" className="logo" />
                <h1 className="title">EEP2024 Hackathon - Mail Assistant</h1>
            </div>

            {/* 数据表格部分 */}
            {data.length > 0 ? (
                <table className="table-style">
                    <thead>
                    <tr>
                        {Object.keys(data[0]).map((header, index) => (
                            <th key={index}>
                                <div>
                                    <button onClick={() => sortData(header)} className="sort-btn">
                                        {header}
                                    </button>
                                    {/* 筛选输入框 */}
                                    <input
                                        type="text"
                                        placeholder={`Filter ${header}`}
                                        onChange={(e) => handleFilterChange(e, header)}
                                        value={filters[header] || ''}
                                        className="filter-input"
                                    />
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading TXT data...</p>
            )}
        </div>
    );
};

export default CSVTable;
