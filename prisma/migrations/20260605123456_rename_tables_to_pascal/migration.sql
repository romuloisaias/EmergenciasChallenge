/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact_activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `persons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `phone_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `phones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_personId_fkey";

-- DropForeignKey
ALTER TABLE "contact_activities" DROP CONSTRAINT "contact_activities_personId_fkey";

-- DropForeignKey
ALTER TABLE "phones" DROP CONSTRAINT "phones_personId_fkey";

-- DropForeignKey
ALTER TABLE "phones" DROP CONSTRAINT "phones_phoneTypeId_fkey";

-- DropTable
DROP TABLE "addresses";

-- DropTable
DROP TABLE "contact_activities";

-- DropTable
DROP TABLE "persons";

-- DropTable
DROP TABLE "phone_types";

-- DropTable
DROP TABLE "phones";

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "phoneTypeId" INTEGER NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneType" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "PhoneType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "locality" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactActivities" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "activityDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "ContactActivities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneType_typeName_key" ON "PhoneType"("typeName");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_phoneTypeId_fkey" FOREIGN KEY ("phoneTypeId") REFERENCES "PhoneType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactActivities" ADD CONSTRAINT "ContactActivities_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
