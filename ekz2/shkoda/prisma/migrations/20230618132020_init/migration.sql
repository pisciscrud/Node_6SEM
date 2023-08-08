-- CreateTable
CREATE TABLE `countries` (
    `idcountry` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(50) NULL,
    `visa` BIT(1) NULL,

    PRIMARY KEY (`idcountry`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `idorder` INTEGER NOT NULL AUTO_INCREMENT,
    `idvoucher` INTEGER NULL,
    `customer` VARCHAR(255) NULL,
    `pay` BIT(1) NULL,

    PRIMARY KEY (`idorder`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `touroperators` (
    `idoperator` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NULL,
    `phonenumber` VARCHAR(11) NULL,

    PRIMARY KEY (`idoperator`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tours` (
    `idtours` INTEGER NOT NULL AUTO_INCREMENT,
    `idcountry` INTEGER NULL,
    `idoperator` INTEGER NULL,
    `tourname` VARCHAR(255) NULL,
    `descr` VARCHAR(255) NULL,

    PRIMARY KEY (`idtours`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vouchers` (
    `idvoucher` INTEGER NOT NULL AUTO_INCREMENT,
    `idtour` INTEGER NULL,
    `vouchername` VARCHAR(255) NULL,
    `descr` VARCHAR(255) NULL,
    `price` DECIMAL(10, 2) NULL,
    `numberofpeople` INTEGER NULL,
    `nutrition` BIT(1) NULL,
    `accommodation` BIT(1) NULL,
    `hot` BIT(1) NULL,
    `discount` INTEGER NULL,

    PRIMARY KEY (`idvoucher`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_idvoucher_fkey` FOREIGN KEY (`idvoucher`) REFERENCES `vouchers`(`idvoucher`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tours` ADD CONSTRAINT `tours_idcountry_fkey` FOREIGN KEY (`idcountry`) REFERENCES `countries`(`idcountry`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tours` ADD CONSTRAINT `tours_idoperator_fkey` FOREIGN KEY (`idoperator`) REFERENCES `touroperators`(`idoperator`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_idtour_fkey` FOREIGN KEY (`idtour`) REFERENCES `tours`(`idtours`) ON DELETE NO ACTION ON UPDATE NO ACTION;
