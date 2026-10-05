import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface DispositivoAttributes {
  id: number;
  nome: string;
  marca: string;
  categoria: string;
  preco: number;
  estoque: number;
  ativo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DispositivoCreationAttributes = Optional<
  DispositivoAttributes,
  'id' | 'ativo' | 'createdAt' | 'updatedAt'
>;

export class Dispositivo
  extends Model<DispositivoAttributes, DispositivoCreationAttributes>
  implements DispositivoAttributes
{
  declare id: number;
  declare nome: string;
  declare marca: string;
  declare categoria: string;
  declare preco: number;
  declare estoque: number;
  declare ativo: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Dispositivo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return Number(this.getDataValue('preco'));
      }
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'dispositivos',
    modelName: 'Dispositivo',
    timestamps: true
  }
);
