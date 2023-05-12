import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: 'products',
  timestamps: false
})
export class ProductModel extends Model {

  @PrimaryKey
  @Column({allowNull: false})
  declare id: string

  @ForeignKey(() => InvoiceModel)
  @Column({allowNull: false, field: "invoice_id"})
  declare invoiceId: string

  @Column({allowNull: false})
  declare name: string

  @Column({allowNull: false})
  declare price: number
}