import { Context } from 'koa';
import File from '../models/File';
import downloadQueue from '../queue';

class FileController {

  static async init(ctx: Context) {
    ctx.response.body = "Hello"
  }
  // Создание файла (Create)
  static async create(ctx: Context) {
    try {
      const { url } = ctx.request.body as any;

      downloadQueue.add({ url });

      
      ctx.status = 200;
      ctx.body = "Your request is being processed!";
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  }

  // Чтение всех файлов (Read)
  static async list(ctx: Context) {
    try {
      const files = await File.findAll();
      ctx.body = files;
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  }

  // Чтение одного файла по ID (Read)
  static async read(ctx: Context) {
    try {
      const id = ctx.params.id;
      const file = await File.findByPk(id);
      
      if (file) {
        ctx.body = file;
      } else {
        ctx.status = 404;
        ctx.body = { message: 'File not found' };
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  }

  // Обновление файла (Update)
  static async update() {
    /*const files = await File.findAll();
    
    const newFiles = await downloadService(files[0].url);

    const newFilesToAdd = newFiles.filter(newFile => 
      !files.some(file => file.name === newFile.name)
    );
  
    for (const newFile of newFilesToAdd) {
      await File.create({
        url: files[0].url,
        name: newFile.name,
        data: newFile.data
      });
    }*/
  }
  

  // Удаление файла (Delete)
  static async delete() {
    /*const oldFiles = await File.findAll();
    
    const files = await downloadService(oldFiles[0].url);

    const filesToDelete = oldFiles.filter(oldFile => 
      !files.some(file => file.name === oldFile.name)
    );

    for (const file of filesToDelete) {
      await File.destroy({
        where: {
          name: file.name
        }
      });
    }*/
  }
}

export default FileController;
