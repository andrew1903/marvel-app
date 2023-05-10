import img from './error.gif';

export function ErrorMessage() {
    return (
        <img
            src={img}
            alt='Error message'
            style={{
                display: 'block',
                width: '250px',
                height: '250px',
                objectFit: 'contain',
                margin: '0 auto'
            }}
        />
    );
}