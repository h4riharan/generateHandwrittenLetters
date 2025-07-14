import React, { useState } from 'react';
import LetterForm from './components/LetterForm';
import GreetingCard from './components/GreetingCard';

const App: React.FC = () => {
    const [letterContent, setLetterContent] = useState<string>('');
    const [writer, setWriter] = useState<string>('');
    const [font, setFont] = useState<string>('Indie Flower');
    const [background, setBackground] = useState<string>('paper');
    const [date, setDate] = useState<string>(new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }));


    const handleLetterSubmit = (content: string, name: string) => {
        setLetterContent(content);
        setWriter(name);
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawDate = e.target.value; // e.g. "2025-07-13"
        const formatted = new Date(rawDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setDate(formatted);
    };



    return (

        <div className="app">
            <h1>Handwritten Letter Generator</h1>
            <LetterForm onSubmit={handleLetterSubmit} />
            {letterContent && (
                <div className="style-controls">
                    <label>
                        Font:
                        <select value={font} onChange={(e) => setFont(e.target.value)}>
                            <option value="Indie Flower" style={{ fontFamily: 'Indie Flower' }}>Indie Flower</option>
                            <option value="Dancing Script" style={{ fontFamily: 'Dancing Script' }}>Dancing Script</option>
                            <option value="Pacifico" style={{ fontFamily: 'Pacifico' }}>Pacifico</option>
                            <option value="Satisfy" style={{ fontFamily: 'Satisfy' }}>Satisfy</option>
                        </select>
                    </label>

                    <label>
                        Background:
                        <select value={background} onChange={(e) => setBackground(e.target.value)}>
                            <option value="paper">Paper Texture</option>
                            <option value="floral">Floral</option>
                            <option value="#fffbe7">Light Yellow</option>
                            <option value="#f0f0f0">Plain Gray</option>
                        </select>
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </label>
                </div>
            )}



            {letterContent && (
                <GreetingCard
                    content={letterContent}
                    writer={writer}
                    font={font}
                    background={background}
                    date={date}
                />
            )}
            <footer className="app-footer">
                <p>Developed by Hari</p>
            </footer>
        </div>
    );
};

export default App;