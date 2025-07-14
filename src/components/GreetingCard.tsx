import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface GreetingCardProps {
    content: string;
    writer?: string;
    font?: string;
    background?: string;
    date?: string;
}

const GreetingCard: React.FC<GreetingCardProps> = ({ content, writer, font, background, date }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleDownloadImage = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, { scale: 2 });
            const link = document.createElement('a');
            link.download = 'handwritten-letter.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const handleDownloadPDF = async () => {
        if (cardRef.current) {
            const element = cardRef.current;

            // Render canvas at high resolution
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');

            // Get the scaled canvas dimensions in pixels
            const imgWidthPx = canvas.width;
            const imgHeightPx = canvas.height;

            // Convert px to pt (1pt = 1.333px => 1px = 0.75pt)
            const imgWidthPt = imgWidthPx * 0.75;
            const imgHeightPt = imgHeightPx * 0.75;

            // Use the image dimensions to set the PDF page size
            const pdf = new jsPDF({
                orientation: imgWidthPt > imgHeightPt ? 'landscape' : 'portrait',
                unit: 'pt',
                format: [imgWidthPt, imgHeightPt],
            });

            // Add image to PDF at 0,0 (full fit)
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidthPt, imgHeightPt);
            pdf.save('handwritten-letter.pdf');
        }
    };





    return (
        <div>
            <div
                ref={cardRef}
                className="greeting-card"
                style={{
                    fontFamily: font || 'Indie Flower',
                    backgroundColor: background?.startsWith('#') ? background : undefined,
                    backgroundImage: background === 'paper'
                        ? `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`
                        : background === 'floral'
                            ? `url('https://www.transparenttextures.com/patterns/floral.png')`
                            : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {date && (
                    <div className="letter-date">
                        {date}
                    </div>
                )}
                <p>{content}</p>
                {writer && <div className="writer-signature">{writer}</div>}
            </div>
            <div className="button-row">
                <button className="download-btn" onClick={handleDownloadImage}>Download as Image</button>
                <button className="download-btn" onClick={handleDownloadPDF}>Download as PDF</button>
            </div>
        </div>
    );
};

export default GreetingCard;

