-- CreateTable
CREATE TABLE "Character" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "planetId" INTEGER NOT NULL,

    PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToEpisode" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToEpisode_AB_unique" ON "_CharacterToEpisode"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToEpisode_B_index" ON "_CharacterToEpisode"("B");

-- AddForeignKey
ALTER TABLE "Character" ADD FOREIGN KEY ("planetId") REFERENCES "Planet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEpisode" ADD FOREIGN KEY ("A") REFERENCES "Character"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEpisode" ADD FOREIGN KEY ("B") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
