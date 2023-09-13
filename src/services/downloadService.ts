import axios from 'axios';


async function downloadService(url: string) {
    try {
        // Загружаем список файлов с сервера
        const response = await axios.get(url);
        const fileList = response.data;

        // Массив для хранения загруженных файлов
        const downloadedFiles = [];

        // Загружаем каждый файл по очереди (или параллельно с использованием Promise.all)
        for (const fileMeta of fileList) {
            const fileResponse = await axios.get(fileMeta.url, { responseType: 'arraybuffer' });

            downloadedFiles.push({
                url: fileMeta.url,
                name: fileMeta.name,
                data: fileResponse.data
            });
        }

        return downloadedFiles;
    } catch (error) {
        console.error(`Failed to download files: ${error}`);
        return [];
    }

};

export default downloadService;
