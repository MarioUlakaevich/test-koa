import axios from 'axios';

async function downloadService(url: string) {
    try {
        // Загружаем список файлов с сервера
        const newUrl = url.replace(/\/ru\/search\?/, '/api/bec/search/document?');
        
        const response = await axios.get(newUrl);
        
        const files = response.data.results;
        
        
        const downloadedFiles = [];

        for(const file of files){
            console.log(file)
            downloadedFiles.push({
                url: "https://www.beckmancoulter.com"+file.url,
                name: file.title,
                data: file.data
            })
        }
        

        return downloadedFiles;
    } catch (error) {
        console.error(`Failed to download files: ${error}`);
        return [];
    }

};

export default downloadService;
