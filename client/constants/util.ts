import { jsPDF } from 'jspdf';

export const downloadHtmlAsPdf = () => {
  const pdf = new jsPDF('p', 'pt', 'letter');
  const html = '<!DOCTYPE html><html><body><h1>Hello</h1><div><h2>world</h2></div></body></html>';
  pdf.html(html, {
    callback: function (pdf) {
      // Download file function
      // ---------------------------
      const url = window.URL.createObjectURL(pdf.output('blob'));
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = 'test PDF.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      // ---------------------------
    },
  });
};
