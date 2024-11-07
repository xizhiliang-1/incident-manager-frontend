// ParentComponent.js
// ChildComponent.js
import React from 'react';

function ChildComponent({ data }) {
    return (
        <div>
            <h2>Child Component</h2>
            {/* 显示从父组件传递来的数据 */}
            <p>{data}</p>
        </div>
    );
}

export default ChildComponent;

