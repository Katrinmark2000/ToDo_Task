export const translateToRussian = async (text: string): Promise<string> => {
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ru`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.responseStatus === 200) {
        return data.responseData.translatedText;
      }
      return text;
    } catch {
      return text;
    }
  };