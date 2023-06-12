import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFeedback1686077863140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "feedbacks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "order_id",
            type: "uuid",
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "product_title",
            type: "varchar",
          },
          {
            name: "user_name",
            type: "varchar",
          },
          {
            name: "feedback",
            type: "varchar",
          },
          {
            name: "feedbackWithStars",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKProductId",
            referencedTableName: "products",
            referencedColumnNames: ["id"],
            columnNames: ["product_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKOrderId",
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            columnNames: ["order_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("feedbacks");
  }
}
