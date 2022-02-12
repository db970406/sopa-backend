-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "appId" INTEGER,
ADD COLUMN     "backendId" INTEGER,
ADD COLUMN     "frontendId" INTEGER;

-- CreateTable
CREATE TABLE "Frontend" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,

    CONSTRAINT "Frontend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Backend" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,

    CONSTRAINT "Backend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FrontendToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BackendToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AppToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Frontend_skill_key" ON "Frontend"("skill");

-- CreateIndex
CREATE UNIQUE INDEX "Backend_skill_key" ON "Backend"("skill");

-- CreateIndex
CREATE UNIQUE INDEX "App_skill_key" ON "App"("skill");

-- CreateIndex
CREATE UNIQUE INDEX "_FrontendToPost_AB_unique" ON "_FrontendToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_FrontendToPost_B_index" ON "_FrontendToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BackendToPost_AB_unique" ON "_BackendToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_BackendToPost_B_index" ON "_BackendToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AppToPost_AB_unique" ON "_AppToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToPost_B_index" ON "_AppToPost"("B");

-- AddForeignKey
ALTER TABLE "_FrontendToPost" ADD FOREIGN KEY ("A") REFERENCES "Frontend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrontendToPost" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BackendToPost" ADD FOREIGN KEY ("A") REFERENCES "Backend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BackendToPost" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToPost" ADD FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToPost" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
