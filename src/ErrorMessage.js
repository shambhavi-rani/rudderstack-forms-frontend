import Alert from 'react-bootstrap/Alert';

export default function ErrorMessage({ errors }) {
    return (
        <>
            {errors.map((error) => (
                <Alert key="danger" variant="danger">
                    { error }
                </Alert>
            ))}
        </>
    );
}