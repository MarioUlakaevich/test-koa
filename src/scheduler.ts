import cron from 'node-cron';
import File from './models/File';
import FileController from './controllers/FileController';

export async function checkForNewFiles() {
  for(const url in FileController.urls){
    FileController.update(url);
  }
}

// Запуск задачи каждые 30 минут
export function startScheduler() {
  cron.schedule('*/30 * * * *', async () => {
    const files = await File.findAll();
    if (files.length > 0) {
      checkForNewFiles();  // Запускаем проверку, если база данных не пуста
    }
  });
}
