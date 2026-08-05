import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.show.upsert({
    where: { id: "seed-foot-traffic-2026-08-07" },
    update: {},
    create: {
      id: "seed-foot-traffic-2026-08-07",
      date: new Date("2026-08-07T00:00:00.000Z"),
      time: "Doors 7:00 PM / Show 7:30 PM",
      venue: "DC9",
      city: "Washington, DC",
      supportActs: "Foot Traffic w/ Makeup Girl",
      ticketUrl:
        "https://dice.fm/event/k6lanl-foot-traffic-7th-aug-dc9-washington-tickets",
    },
  });

  console.log("Seeded shows.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
