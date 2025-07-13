import { jsPDF } from "jspdf";

export const generatePDF = (letterContent: string) => {
    const doc = new jsPDF();

    // Set the font and size
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    // Add the letter content to the PDF
    doc.text(letterContent, 10, 10);

    // Save the PDF with a specific name
    doc.save("handwritten_letter.pdf");
};