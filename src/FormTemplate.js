import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function FormTemplate({ formTemplate }) {

    const fields = Object.keys(formTemplate.fields);

    function getFieldDataFromForm() {
        const fieldData = {};
        fields.map(field => {
            if (formTemplate.fields[field].type == 0) {
                fieldData[field] = document.getElementById(field).checked.toString();
            }
            else {
                fieldData[field] = document.getElementById(field).value.toString();
            }
        });
        return fieldData;
    }

    function createSource(formData) {
        const postSourceUrl = "https://localhost:7043/api/Sources";
        fetch(postSourceUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then((data) => console.log(data))
            .catch(error => console.error('Unable to create Source.', error));
    }

    function submitFormHandler(e) {
        const fieldData = getFieldDataFromForm();
        const formData = {
            type: formTemplate.type,
            userData: fieldData
        };
        createSource(formData);
    }

    return (
        <>
            <Form id="my_form">
                <br />
                <h2>{formTemplate.type}</h2>
                <br />
                {
                    fields.map(field => {
                        switch (formTemplate.fields[field].type) {
                            case 0:
                                return (
                                    <>
                                        <input id={field} key={field} type="checkbox" name={field} />
                                        <label for={field}>{formTemplate.fields[field].label}</label><br /><br/>
                                    </>);
                            case 3:
                                return (
                                    <>
                                        <label for={field}>{formTemplate.fields[field].label}</label><br/>
                                        <select id={field} key={field} name={field} required={formTemplate.fields[field].required}>
                                            {
                                                formTemplate.fields[field].options.map(option => {
                                                    return (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    );
                                                })
                                            }
                                        </select><br/><br/>
                                    </>
                                );
                            case 4:
                            default:
                                return (
                                    <>
                                        <label for={field}>{formTemplate.fields[field].label}</label><br />
                                        <input id={field} key={field} type="text" name={field} required={formTemplate.fields[field].required} /><br /><br/>
                                    </>
                                );
                        } 
                    })
                }

                <Button variant="warning" onClick={submitFormHandler}>Create Source</Button>
            </Form>
            {/*<Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>*/}
        </>
    )
}