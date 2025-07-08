-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('STOCK', 'CRYPTO', 'COMMODITY', 'FOREX', 'INDEX', 'BOND', 'ETF');

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "price" DECIMAL(20,8) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "volume" DECIMAL(20,8),
    "high" DECIMAL(20,8),
    "low" DECIMAL(20,8),
    "open" DECIMAL(20,8),
    "close" DECIMAL(20,8),

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predictions" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "predictedPrice" DECIMAL(20,8) NOT NULL,
    "targetTime" TIMESTAMP(3) NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "modelVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "predictions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assets_symbol_key" ON "assets"("symbol");

-- CreateIndex
CREATE INDEX "prices_assetId_timestamp_idx" ON "prices"("assetId", "timestamp");

-- CreateIndex
CREATE INDEX "prices_timestamp_idx" ON "prices"("timestamp");

-- CreateIndex
CREATE INDEX "predictions_assetId_targetTime_idx" ON "predictions"("assetId", "targetTime");

-- CreateIndex
CREATE INDEX "predictions_targetTime_idx" ON "predictions"("targetTime");

-- CreateIndex
CREATE INDEX "predictions_modelVersion_idx" ON "predictions"("modelVersion");

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
