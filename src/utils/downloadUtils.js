import { LANGUAGE_DATA } from './LANGUAGE_DATA';

const getFileExtension = (selectedLanguage) => {
  for (let index = 0; index < LANGUAGE_DATA.length; index++) {
    if (LANGUAGE_DATA[index].language === selectedLanguage) {
      return LANGUAGE_DATA[index].extension;
    }
  }
  return 'txt';
};

export const handleDownload = (code, language, fileName = null) => {
  try {
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid code. Please enter valid code before downloading.');
    }

    const fileExtension = getFileExtension(language);
    const defaultFileName = `code.${fileExtension}`;
    const finalFileName = fileName ? `${fileName}.${fileExtension}` : defaultFileName;

    const blob = new Blob([code], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = finalFileName;
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download file. Please try again.');
  }
};
