import { Context } from 'koa';
import File from '../models/File';
import downloadQueue from '../queue';
import downloadService from 'src/services/downloadService';

class FileController {

  static urls: Array<string>;

  static async init(ctx: Context) {
    ctx.response.body = "Hello"
  }
  // Создание файла (Create)
  static async create(ctx: Context) {
    try {
      const { url } = ctx.request.body as any;

      try{
        new URL(url);
      }catch(e){
        ctx.status = 400;
        ctx.body = "Not a URL";
        return e;
      }

      this.urls.push(url);

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
  static async update(url: string) {
    const files = await File.findAll();
    
    const newFiles = await downloadService(url);

    const newFilesToAdd = newFiles.filter(newFile => 
      !files.some(file => file.name === newFile.name)
    );
  
    for (const newFile of newFilesToAdd) {
      await File.create({
        url: files[0].url,
        name: newFile.name,
        data: newFile.data
      });
    }
  }
  

  // Удаление файла (Delete)
  static async delete(ctx: Context) {
    const {id} = ctx.request.query;

    await File.destroy({
      where: {
        id: id
      }
    });

    ctx.body = "File deleted!";
  }
}

export default FileController;
