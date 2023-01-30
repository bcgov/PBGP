export const downloadHtmlAsPdf = (html: string) => {
  const a = window.open('/print', '_blank');
  a?.document.write(html);
  a?.document.close();
  a?.print();
};
