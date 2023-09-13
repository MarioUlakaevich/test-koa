import Queue from 'bull';
import downloadService from './services/downloadService';
import File from './models/File';

const downloadQueue = new Queue('download files', 'redis://127.0.0.1:6379');

downloadQueue.process(async (job, done) => {
  const { url } = job.data;

  try {
    const files = await downloadService(url);

    for(const file of files){

        await File.create(file);
    }
    done(null, { result: 'Success' });
  } catch (err) {
    done(err);
  }
});

export default downloadQueue;
