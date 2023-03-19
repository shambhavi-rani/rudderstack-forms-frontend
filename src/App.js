import SourceTypeSelector from "./SourceTypeSelector";
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function App() {

    const getSourceTypesUrl = "https://localhost:7043/api/FormTemplates/SourceTypes"

    const [sourceTypes, setSourceTypes] = useState([]);

    function getAllSourceTypes() {
        fetch(getSourceTypesUrl)
            .then(response => response.json())
            .then(data => setSourceTypes(data))
    }

    useEffect(() => {
        getAllSourceTypes()
    }, [])

    return (
        <Container>
            <SourceTypeSelector sourceTypes={sourceTypes} />
            <br /> <br />
        </Container>
    )
}

export default App;
