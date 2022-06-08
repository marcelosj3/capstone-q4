import { hashSync } from 'bcrypt';
import { config } from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

config();

export class createTable1654700804046 implements MigrationInterface {
  name = 'createTable1654700804046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isEmployee" boolean NOT NULL DEFAULT false, "companyRole" character varying NOT NULL DEFAULT 'client', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("orderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUserId" uuid, "cartCartId" uuid, CONSTRAINT "REL_94ff849021104547f83d0482fd" UNIQUE ("cartCartId"), CONSTRAINT "PK_41ba27842ac1a2c24817ca59eaa" PRIMARY KEY ("orderId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("cartId" uuid NOT NULL DEFAULT uuid_generate_v4(), "isPaid" boolean NOT NULL DEFAULT false, "totalPrice" double precision NOT NULL, "shippingFee" double precision NOT NULL, "userUserId" uuid, CONSTRAINT "PK_75eb343efb7459aad5dd7f8045c" PRIMARY KEY ("cartId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cartProducts" ("cartProductsId" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "cartCartId" uuid, "productProductId" uuid, CONSTRAINT "REL_c7e938b25c302c8631c65bf553" UNIQUE ("productProductId"), CONSTRAINT "PK_2c1ef135bd194de25684ea1046d" PRIMARY KEY ("cartProductsId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("productId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "onSale" boolean NOT NULL DEFAULT false, "brand" character varying NOT NULL, "category" character varying NOT NULL, "description" character varying, "expiryDate" character varying NOT NULL, "stockStockId" uuid, CONSTRAINT "REL_5e89c6d53f4769aa019a787011" UNIQUE ("stockStockId"), CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459" PRIMARY KEY ("productId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "stocks" ("stockId" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "unityValueSupplier" double precision NOT NULL, "increaseValuePercentage" integer NOT NULL DEFAULT '30', "isAvailable" boolean NOT NULL DEFAULT true, "unityValueToSell" double precision NOT NULL, "supplierSupplierId" uuid, CONSTRAINT "PK_17fe126989bcddf544ae0758fab" PRIMARY KEY ("stockId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers" ("supplierId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "addressAddressId" uuid, CONSTRAINT "REL_137afdbe09840216a4ee1a7248" UNIQUE ("addressAddressId"), CONSTRAINT "PK_72715ca349897fe61381e321009" PRIMARY KEY ("supplierId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "addresses" ("addressId" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "state" character varying NOT NULL, "street" character varying NOT NULL, "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "houseNumber" character varying NOT NULL, "additionalAddressData" character varying NOT NULL, "isMain" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ff59275f5928941ce06f1d8890c" PRIMARY KEY ("addressId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users_address_addresses" ("usersUserId" uuid NOT NULL, "addressesAddressId" uuid NOT NULL, CONSTRAINT "PK_d60876b6cfbf31177c5bda9d584" PRIMARY KEY ("usersUserId", "addressesAddressId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_36676efc86ab5235d0dc0b280b" ON "users_address_addresses" ("usersUserId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a44aa06aac4aa3ad25319d534" ON "users_address_addresses" ("addressesAddressId") `
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_94ff849021104547f83d0482fdb" FOREIGN KEY ("cartCartId") REFERENCES "carts"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_b50e2403bed7d7f56a098ef7df4" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cartProducts" ADD CONSTRAINT "FK_3e084410764e757f8b8c2dc817c" FOREIGN KEY ("cartCartId") REFERENCES "carts"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cartProducts" ADD CONSTRAINT "FK_c7e938b25c302c8631c65bf553e" FOREIGN KEY ("productProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_5e89c6d53f4769aa019a7870117" FOREIGN KEY ("stockStockId") REFERENCES "stocks"("stockId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD CONSTRAINT "FK_81c121b7ea38c1c5bee154a49c9" FOREIGN KEY ("supplierSupplierId") REFERENCES "suppliers"("supplierId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers" ADD CONSTRAINT "FK_137afdbe09840216a4ee1a72488" FOREIGN KEY ("addressAddressId") REFERENCES "addresses"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users_address_addresses" ADD CONSTRAINT "FK_36676efc86ab5235d0dc0b280bf" FOREIGN KEY ("usersUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "users_address_addresses" ADD CONSTRAINT "FK_8a44aa06aac4aa3ad25319d5341" FOREIGN KEY ("addressesAddressId") REFERENCES "addresses"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "cpf", "password", "isActive", "isEmployee", "companyRole")
        VALUES ('${process.env.ADMIN_NAME}','${
        process.env.ADMIN_EMAIL
      }', '00985823987', '${hashSync(
        process.env.ADMIN_PASSWORD as string,
        10
      )}', true, true, 'admin')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_address_addresses" DROP CONSTRAINT "FK_8a44aa06aac4aa3ad25319d5341"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_address_addresses" DROP CONSTRAINT "FK_36676efc86ab5235d0dc0b280bf"`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers" DROP CONSTRAINT "FK_137afdbe09840216a4ee1a72488"`
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" DROP CONSTRAINT "FK_81c121b7ea38c1c5bee154a49c9"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_5e89c6d53f4769aa019a7870117"`
    );
    await queryRunner.query(
      `ALTER TABLE "cartProducts" DROP CONSTRAINT "FK_c7e938b25c302c8631c65bf553e"`
    );
    await queryRunner.query(
      `ALTER TABLE "cartProducts" DROP CONSTRAINT "FK_3e084410764e757f8b8c2dc817c"`
    );
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_b50e2403bed7d7f56a098ef7df4"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_94ff849021104547f83d0482fdb"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8a44aa06aac4aa3ad25319d534"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_36676efc86ab5235d0dc0b280b"`
    );
    await queryRunner.query(`DROP TABLE "users_address_addresses"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
    await queryRunner.query(`DROP TABLE "suppliers"`);
    await queryRunner.query(`DROP TABLE "stocks"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "cartProducts"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
