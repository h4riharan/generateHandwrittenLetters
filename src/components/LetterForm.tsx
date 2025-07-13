import React, { useState } from 'react';

interface LetterFormProps {
    onSubmit: (content: string, name: string) => void;
}

const LetterForm: React.FC<LetterFormProps> = ({ onSubmit }) => {
    const [letterContent, setLetterContent] = useState('');
    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLetterContent(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(letterContent, name);
        setLetterContent('');
        setName('');
    };

    return (
        <form className="letter-form" onSubmit={handleSubmit}>
            <textarea
                value={letterContent}
                onChange={handleChange}
                placeholder="Write your letter here..."
                required
            />
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Your name"
                required
            />
            <button type="submit">Generate Letter</button>
        </form>
    );
};

export default LetterForm;