import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const category = {
    calma: await db.category.upsert({
      where: {
        title: "Calma",
      },
      update: {},
      create: {
        title: "Calma",
        iconPrimaryUrl: "images/sentiment-calm-primary.png",
        iconSecondaryUrl: "images/sentiment-calm-white.png",
        iconCardUrl: "images/card-icons/calma.png",
        backgroundUrl: "images/practice-background/calma.png",
      },
    }),
    dormir: await db.category.upsert({
      where: {
        title: "Dormir",
      },
      update: {},
      create: {
        title: "Dormir",
        iconPrimaryUrl: "images/sleep-sounds-primary.png",
        iconSecondaryUrl: "images/sleep-sounds-white.png",
        iconCardUrl: "images/card-icons/dormir.png",
        backgroundUrl: "images/practice-background/dormir.png",
      },
    }),
    bienestar: await db.category.upsert({
      where: {
        title: "Bienestar",
      },
      update: {},
      create: {
        title: "Bienestar",
        iconPrimaryUrl: "images/yoga-primary.png",
        iconSecondaryUrl: "images/yoga-white.png",
        iconCardUrl: "images/card-icons/bienestar.png",
        backgroundUrl: "images/practice-background/bienestar.png",
      },
    }),
    enfoque: await db.category.upsert({
      where: {
        title: "Enfoque",
      },
      update: {},
      create: {
        title: "Enfoque",
        iconPrimaryUrl: "images/focus-primary.png",
        iconSecondaryUrl: "images/focus-white.png",
        iconCardUrl: "images/card-icons/enfoque.png",
        backgroundUrl: "images/practice-background/enfoque.png",
      },
    }),
  };

  const practiceType = {
    meditacion: await db.practiceType.upsert({
      where: {
        title: "Meditación",
      },
      update: {},
      create: {
        title: "Meditación",
      },
    }),
    respiracion: await db.practiceType.upsert({
      where: {
        title: "Respiración",
      },
      update: {},
      create: {
        title: "Respiración",
      },
    }),
  };

  const practices = [
    await db.practice.upsert({
      where: {
        name: "Intención Positiva",
      },
      update: {},
      create: {
        categoryId: category.bienestar.id,
        practiceTypeId: practiceType.meditacion.id,
        name: "Intención Positiva",
        durationMillis: 104000,
        audioUrl: "audio/practice/BI_ME_1-5_N1_Intención positiva.m4a",
      },
    }),
    await db.practice.upsert({
      where: {
        name: "Meditación guiada",
      },
      update: {},
      create: {
        categoryId: category.calma.id,
        practiceTypeId: practiceType.respiracion.id,
        name: "Meditación guiada",
        durationMillis: 61000,
        audioUrl:
          "audio/practice/CA_ME_1-5_N1_Meditación guiada de un minuto para la calma.mp4",
      },
    }),
  ];
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
