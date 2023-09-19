import Queue from 'bull';
import downloadService from './services/downloadService';
import File from './models/File';

const downloadQueue = new Queue('download files', 'redis://redis:6379');

// Настройка обработчика очереди
downloadQueue.process(async (job) => {
  try {
    const { url } = job.data;
    const files = await downloadService(url);
    for(const file of files){

        await File.create({url: file.url, name: file.name, data: file.data});
    }
    return { id: job.id, message: 'Success' };
  } catch (err) {
    return err;
  }
});

export default downloadQueue;
