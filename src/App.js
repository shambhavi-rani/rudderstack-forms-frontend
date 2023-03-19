import SourceTypeSelector from "./SourceTypeSelector";
import Form from "./Form"
import React, { useState } from 'react'

function App() {

    const url = "https://localhost:7043/api/FormTemplates/SourceTypes"

    const [sourceTypes, setSourceTypes] = useState([]);

    const fetchAllSourceTypes = fetch(url)
        .then(response => response.json())
        .then(data => setSourceTypes(data))

    return (
        <>
            <SourceTypeSelector sourceTypes={sourceTypes} />
            <br /> <br />
            <Form />
        </>
    )
}

export default App;
