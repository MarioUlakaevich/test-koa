"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connect_1 = require("../db-connect");
class File extends sequelize_1.Model {
}
File.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    url: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    data: {
        type: new sequelize_1.DataTypes.JSON(),
        allowNull: true,
    }
}, {
    tableName: 'files',
    sequelize: db_connect_1.dbConnect,
});
exports.default = File;
//# sourceMappingURL=File.js.map