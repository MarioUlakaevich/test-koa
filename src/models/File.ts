import { Model, DataTypes } from 'sequelize';
import { dbConnect } from '../db-connect';

class File extends Model {
  public id!: number;
  public name!: string;
  public url!: string;
  public data!: Blob;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    data: {
      type: new DataTypes.BLOB('long'),
      allowNull: true,
    }
  },
  {
    tableName: 'files',
    sequelize: dbConnect,
  }
);

export default File;
