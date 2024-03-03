"use client"
import { Document, Page } from 'react-pdf';

// The worker src is required to load PDF files; specify the PDF.js worker URL

function PDFViewer({ file }) {
  return (
    <iframe src={file} width="100%" height="600px">
      {/* Fallback content */}
    </iframe>
    // <Document
    //   file={file}
    //   onLoadSuccess={({ numPages }) => console.log(`Loaded a document with ${numPages} pages!`)}
    // >
    //   <Page pageNumber={1} />
    //   {/* Render more <Page> components as needed */}
    // </Document>
  );
}

export default PDFViewer