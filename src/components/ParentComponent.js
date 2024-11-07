// ParentComponent.js
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
    const [data] = useState("Hello from Parent");

    return (
        <div>
            <h1>Parent Component</h1>
            {/* 将 data 作为 prop 传递给 ChildComponent */}
            <ChildComponent data={data} />
        </div>
    );
}

export default ParentComponent;