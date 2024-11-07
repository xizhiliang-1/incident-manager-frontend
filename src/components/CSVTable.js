// App.js
import React, { useEffect, useState } from 'react';
import '../style/TableStyles.css'; // 导入样式
import '../style/HeaderStyles.css'; // 导入样式
const CSVTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const txtFilePath = `${process.env.PUBLIC_URL}/data/example.txt`;

        fetch(txtFilePath)
            .then((response) => response.text())
            .then((text) => {
                const lines = text.trim().split('\n');
                const headers = lines[0].split(',');
                const parsedData = lines.slice(1).map(line => {
                    const values = line.split(',');
                    const row = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index];
                    });
                    return row;
                });

                setData(parsedData);
            })
            .catch((error) => {
                console.error('Error reading TXT file:', error);
            });
    }, []);

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
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
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