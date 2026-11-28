import { escape } from '@/config/prize';
import { numberWord } from '@/lib/format';

// The journal. Each piece is written here so its words live in one place. The photographs
// are the founder's own, taken on his own trips; none shows a Trove prize, and every piece
// says so and says where the first escape is. A guide gives each place the same parts: why
// go, what to do, what to eat, where to base yourself, when to go, how to get there and one
// thing most people miss. No hotel is named: we recommend places, not businesses we have no
// arrangement with. Signups from a piece are stored against its channel, so we can see which
// pieces bring people to the founding friends list.
export type JournalStill = { src: string; alt: string; blur: string; caption: string | null };
export type JournalPlace = {
  id: string;
  name: string;
  standfirst: string;
  still: JournalStill;
  why: string[];
  do: [string, string][];
  eat: string;
  base: string;
  when: string;
  how: string;
  tip: string;
  more: JournalStill[];
};
export type JournalPiece = { slug: string; title: string; description: string; intro: string[]; places: JournalPlace[]; channel: string };

export const journal: JournalPiece[] = [
  {
    "slug": "five-escapes-worth-the-journey",
    "title": "Five escapes worth the journey.",
    "description": "An insider’s guide to five places from our founder’s own trips: Sumba, Cape Town, Antigua, Kilimanjaro and Darjeeling. What to do, what to eat, where to stay and when to go.",
    "intro": [
      "Five places our founder has been and would go back to tomorrow. The photographs are his own. The notes are the ones we would give a friend who was going: what to do, what to eat, where to base yourself, when to go and the one thing most people miss.",
      "None of these is a Trove prize. They are here because they are the kind of place Trove was started for."
    ],
    "channel": "journal-five-escapes",
    "places": [
      {
        "id": "sumba",
        "name": "Sumba, Indonesia.",
        "standfirst": "An hour from Bali by air, and a long way from it in every other sense.",
        "still": {
          "src": "/media/journal-sumba-f61c1562.jpg",
          "alt": "Horses on a sandy beach between dark rocks, with green hills behind, on the island of Sumba",
          "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAIEBQb/xAAjEAABAwMEAgMAAAAAAAAAAAABAgMEABESBQYhQSIxM3GB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAQIh/9oADAMBAAIRAxEAPwAOgOFZSiUwVjq3I/KRe35ePytK+gaZO3348kzBJdS+tROabd+6mSY+pvS2Xm5QaSgWAHfHNx6NPgTKxfWrIDI2PXVZXckl0rSSo+F8QCQBRRUpR//Z",
          "caption": null
        },
        "why": [
          "Sumba is about twice the size of Bali and gets a sliver of its visitors. There are few towns, little traffic and long stretches of coast with nobody on them.",
          "Much of the island still follows Marapu, the ancestral religion, and its villages are built around stone tombs, under houses with tall peaked roofs. It feels like somewhere that has not been arranged for you."
        ],
        "do": [
          [
            "Swim in Weekuri lagoon.",
            "A saltwater lagoon in the far west, fed by the sea through the rock and calm enough to float in. Go early, before the day trippers arrive from Tambolaka."
          ],
          [
            "Visit a traditional village.",
            "Ratenggaro, at a river mouth on the south-west coast, has the tallest roofs on the island and megalithic tombs facing the surf. Go with a local guide, and ask before you photograph anyone."
          ],
          [
            "Watch the horses.",
            "Sumba breeds small, tough ponies. On the west coast they are taken down to the beach in the late afternoon to cool off in the sea. In February and March, riders charge each other with wooden spears at Pasola, the island’s ritual tournament."
          ],
          [
            "Go inland for a waterfall.",
            "Lapopu, in the hills of the west, falls in steps into a pool you can swim in. The east of the island, around Waingapu, is drier: open savanna, and the best ikat weaving in Indonesia."
          ]
        ],
        "eat": "Fish grilled the day it was caught, with rice and sambal. Outside the hotels the food is simple and good. The coffee is grown on the island.",
        "base": "Most people stay on the west and south-west coast, an hour or two by road from Tambolaka. There are a handful of very good hotels and little in between, so book well ahead.",
        "when": "May to October is dry, with the best surf from June to September. The island turns green in the rains from December to March, and Pasola falls in February and March.",
        "how": "Fly to Bali, then take the one-hour flight to Tambolaka in the west. Flights are few and the roads are slow, so allow a day at each end.",
        "tip": "Bring cash. There are few cash machines outside the two main towns, and nobody takes cards in a village or a market.",
        "more": [
          {
            "src": "/media/journal-sumba-lagoon-eb51a2d9.jpg",
            "alt": "A turquoise lagoon ringed by low green cliffs under towering clouds, in the west of Sumba",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAEGBAX/xAAkEAABAwQBAwUAAAAAAAAAAAABAgMEABESIQUTMUEUIiRhsf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGhEAAwADAQAAAAAAAAAAAAAAAAECAxEhMf/aAAwDAQACEQMRAD8ASOPduPYd/VdiLKjcbG6anM3O5x3upRiZJdUPkOC52VLP5Wxy+F/UKdcxJBJt2pZMza6iURpk9GJckFBUQB5B3SfkOXIBCcLpFvO6KKNdY58P/9k=",
            "caption": "Weekuri lagoon."
          },
          {
            "src": "/media/journal-sumba-roofs-f071e068.jpg",
            "alt": "Tall peaked thatched roofs above a stone terrace and pools, in the style of Sumba’s traditional houses",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAUDBAb/xAAiEAACAQQCAQUAAAAAAAAAAAABAgMABBEhBTESQYGRseH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAAH/xAAaEQEAAQUAAAAAAAAAAAAAAAAAAQIDEiEx/9oADAMBAAIRAxEAPwBo98snLQSJIDAI8Fs4G8/lXZb0pfwQAqUkRmZvrdYG24O4kmUWsjOnTFxpfimy8RLbOYHv28TvRY49gKOUw3R7cObe1zCFToDA6qCPTKfUZooqpC51/9k=",
            "caption": "Sumba’s peaked roofs."
          }
        ]
      },
      {
        "id": "cape-town",
        "name": "Cape Town, South Africa.",
        "standfirst": "A city with a mountain in the middle, a cold ocean on one side, and vineyards an hour away.",
        "still": {
          "src": "/media/journal-cape-town-14dbfac1.jpg",
          "alt": "A palm tree above rocks and breaking waves, with Lion’s Head behind, on the Atlantic coast of Cape Town",
          "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAAD/8QAIhAAAgEEAQQDAAAAAAAAAAAAAQIDAAQREjEFISJBcZGx/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/xAAZEQACAwEAAAAAAAAAAAAAAAAAAgEEQRH/2gAMAwEAAhEDEQA/ADCxKDZsKo5J4pNtbq+QjBtTg4PFE6nFN1G0bNw3hg6Jkg/NFvLN4niSGaSUMDtn1j8p73ZjAa1+6Lu3kNvFpI8SsjFlQ4Dd/f1WVjcNLYLlUUBtQFGOe9VVSXHqf//Z",
          "caption": null
        },
        "why": [
          "Few cities give you this much in a week. You can walk up a mountain before breakfast, swim at lunchtime and be eating among vines by the evening.",
          "From Britain there is almost no jet lag: the flight is overnight and the clocks are only an hour or two ahead. You land ready to start."
        ],
        "do": [
          [
            "Climb Lion’s Head at dawn.",
            "About an hour up, with chains and ladders near the top, and the whole city below you as the sun comes over the mountains. On a full moon, half of Cape Town goes up at dusk."
          ],
          [
            "See the penguins at Boulders Beach.",
            "A colony of African penguins lives on a sheltered beach near Simon’s Town. Go first thing, then carry on down the peninsula to Cape Point."
          ],
          [
            "Drive Chapman’s Peak.",
            "The road is cut into the cliff between Hout Bay and Noordhoek, and it is one of the great coast drives anywhere. Do it late in the day for the light."
          ],
          [
            "Spend a day in the Winelands.",
            "Franschhoek and Stellenbosch are about an hour inland. Book one long lunch at an estate and plan nothing after it."
          ],
          [
            "Take a picnic to Kirstenbosch.",
            "The botanical garden on the back of Table Mountain. On Sunday evenings in summer there are concerts on the lawn."
          ]
        ],
        "eat": "Fish and chips on the harbour wall at Kalk Bay. A braai, if anyone invites you. And wine that costs a fraction of what it would at home.",
        "base": "The Atlantic side, around Camps Bay and Bantry Bay, for beaches and sunsets. The City Bowl for restaurants and an easier drive to everywhere. Hire a car: you will want it.",
        "when": "November to March is summer, with long dry days and a strong south-easterly wind some afternoons that locals call the Cape Doctor. For whales, come between July and October and drive to Hermanus.",
        "how": "Direct overnight flights from London take about eleven and a half hours.",
        "tip": "The Atlantic is cold all year. For warmer water, swim on the False Bay side, at St James or Muizenberg.",
        "more": [
          {
            "src": "/media/journal-cape-penguins-38f89a94.jpg",
            "alt": "Dozens of African penguins on white sand beside granite boulders at Boulders Beach",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAQCBv/EACQQAAIBAwMEAwEAAAAAAAAAAAECAwAEERIhQRMxcYEFFJHB/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABkRAAIDAQAAAAAAAAAAAAAAAAACAQMRIf/aAAwDAQACEQMRAD8AlkEhUtHZTso5IwKkkt/kbmM9C0dVzjYb48n+V1WoEN04ixHLbexSOKYlZkEjMGwTgdh57cexStc7c0OKljuGrMC5Du4wQ5VtO2sDYZ/B+VRHLJ9idNWVU5AwNuaUoRD/2Q==",
            "caption": "Boulders Beach."
          },
          {
            "src": "/media/journal-cape-winelands-3a49f78f.jpg",
            "alt": "Vineyards on a valley floor under mountains and low cloud, with a faint rainbow, at Franschhoek",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAUCAwb/xAAgEAACAQQCAwEAAAAAAAAAAAABAgADERIhBTEEQWGB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQID/8QAGBEBAQADAAAAAAAAAAAAAAAAABEBEjH/2gAMAwEAAhEDEQA/AHy8tdSVQZtq9/Un4xfFipRSe2LTInmaDOt6GJAtkuhAc1RxcsrDWgT38jvicRCFHJP5LA53uEJkH//Z",
            "caption": "Franschhoek, in the Winelands."
          }
        ]
      },
      {
        "id": "antigua",
        "name": "Antigua.",
        "standfirst": "Calm water, a Georgian harbour still full of boats, and a sunset most evenings.",
        "still": {
          "src": "/media/journal-antigua-30a90979.jpg",
          "alt": "A pink and orange sunset over the sea, seen across a pool with a table and a parasol at its edge, in Antigua",
          "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQGBf/EAB4QAAEEAwEBAQAAAAAAAAAAAAEAAgMRBBIxEwVx/8QAFgEBAQEAAAAAAAAAAAAAAAAABAID/8QAGREAAwEBAQAAAAAAAAAAAAAAAAERAiEx/9oADAMBAAIRAxEAPwBqDHjcSN27DtEJs4Dasi/1Tnz8+TIlaHzTFgFuLpWlt1yqWu7K2bXu7nNgpenfRmXywiZHvhJ83EIGXMevJQhaBz//2Q==",
          "caption": null
        },
        "why": [
          "Antigua is the Caribbean at its easiest. The beaches are white and sheltered, the sea is warm and flat, and it is one direct flight from London.",
          "What sets it apart is English Harbour, where an eighteenth-century naval dockyard is still a working marina, and the island’s long history with boats is still its daily life."
        ],
        "do": [
          [
            "Walk around Nelson’s Dockyard.",
            "The Georgian dockyard at English Harbour is a World Heritage Site and still full of yachts. Go in the morning, then take the short headland trail to Fort Berkeley."
          ],
          [
            "Go to Shirley Heights on a Sunday.",
            "The old lookout above English Harbour holds a barbecue every Sunday, with a steel band as the sun goes down. It is busy, and worth it."
          ],
          [
            "Find your own beach.",
            "The island claims one for every day of the year. Half Moon Bay, on the Atlantic side, is the wild one. Ffryes and Darkwood, on the west coast, are the ones for a late swim."
          ],
          [
            "Take the ferry to Barbuda.",
            "Ninety minutes north, the sister island has miles of pink-tinged sand and a lagoon that holds one of the largest frigate bird colonies in the world."
          ]
        ],
        "eat": "The Antigua black pineapple, small and very sweet, from the stalls along Fig Tree Drive. Grilled lobster on the beach. Rum punch, with caution.",
        "base": "The west coast for sunsets and calm water. English Harbour for restaurants, boats and some life in the evening.",
        "when": "December to April is dry and breezy. Sailing Week, at the end of April, fills English Harbour. June to November is hurricane season: quieter and cheaper, with the risk that comes with it.",
        "how": "Direct flights from London take about eight and a half hours.",
        "tip": "Every beach on the island is public, including the ones in front of the hotels.",
        "more": [
          {
            "src": "/media/journal-antigua-bay-b3e54d3b.jpg",
            "alt": "A yacht at anchor in a blue bay with green hills behind, seen over palm trees and a white rail, in Antigua",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAUCBP/EACIQAAIBBAEEAwAAAAAAAAAAAAECAwAEERIFEyFBYSIxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAECEWH/2gAMAwEAAhEDEQA/ALKSQxDInAHn5Vk3EHSbW8jVvJyKhTcm2FNvcWSY+9mJ/KW13KwZpJ4JAW74YsB6HaqXT0mU8IUdsjcwtoS3TMunvGa75JmHJNaoFSGKNtUUUpRSIz//2Q==",
            "caption": null
          },
          {
            "src": "/media/journal-antigua-sun-9475c6ab.jpg",
            "alt": "The sun setting over a calm sea with a yacht and a headland in silhouette, from a beach in Antigua",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAEDBAb/xAAhEAABBAEDBQAAAAAAAAAAAAABAAIDEQUEITESI1HB4f/EABYBAQEBAAAAAAAAAAAAAAAAAAEAAv/EABgRAAMBAQAAAAAAAAAAAAAAAAABEQID/9oADAMBAAIRAxEAPwCzMdYBpJ+NdWzVkiycA6anbY8yfVCfVaCV4MsgcRx3HH2hdd2M0+WZUcu40a24tJxpCEEf/9k=",
            "caption": "Sunset on the south coast."
          }
        ]
      },
      {
        "id": "kilimanjaro",
        "name": "Kilimanjaro, Tanzania.",
        "standfirst": "The highest mountain in Africa, and the highest anywhere that you can simply walk up.",
        "still": {
          "src": "/media/journal-kilimanjaro-bd81ce0c.jpg",
          "alt": "A rocky valley high on Kilimanjaro, looking down onto a sea of cloud under a blue sky",
          "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIDBAb/xAAjEAABAwIFBQAAAAAAAAAAAAABAAIDBAUREiEikTFBQlJh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEwH/2gAMAwEAAhEDEQA/ANUlswOjm8qYt/1vK52kvNypztqS8HxkOYJ6i6XCpdndM4R+sbi0Kq2p5EZhuGA6qsLWk5SND2QhAd//2Q==",
          "caption": null
        },
        "why": [
          "Kilimanjaro stands on its own above the plains of northern Tanzania, nearly six thousand metres high. You need no climbing skill to reach the top. It asks for a week, patience and respect for the altitude.",
          "In that week you walk from rainforest through moorland and high desert to ice. Few journeys on foot change so completely from one day to the next."
        ],
        "do": [
          [
            "Choose a longer route.",
            "Lemosho and Machame take seven or eight days and cross the Shira plateau on the western side. The extra days are what get most people to the top, because the body needs time to adjust."
          ],
          [
            "Go slowly.",
            "Your guides will say pole pole, slowly slowly, all day long. They are right. The people who struggle are often the fit ones who set off too fast."
          ],
          [
            "Expect a hard summit night.",
            "You leave camp around midnight and climb in the dark and the cold to reach the crater rim at sunrise, then walk on to Uhuru Peak. It is the hardest part and the best."
          ],
          [
            "Look at the lower mountain too.",
            "The forest on the first day has colobus monkeys in the canopy. The moorland above it has giant groundsels, strange tree-sized plants that grow nowhere else."
          ]
        ],
        "eat": "Mountain cooks do better than seems possible on a gas ring at altitude: soup, stews, porridge and endless tea. Eat even when you are not hungry.",
        "base": "Moshi or Arusha, the two towns at the foot of the mountain. Arrive a day or two early to rest, and add a few days of safari afterwards: the Serengeti and Ngorongoro are close.",
        "when": "January to mid-March and June to October are the dry seasons. January and February are quieter, and often clearer.",
        "how": "Fly to Kilimanjaro International, usually with one change. Everyone climbs with a licensed guide and crew, because the national park requires it.",
        "tip": "Choose an operator that treats its porters properly, and budget for tips. The Kilimanjaro Porters Assistance Project lists the companies that do.",
        "more": [
          {
            "src": "/media/journal-kili-forest-935b2836.jpg",
            "alt": "Tall trees hung with moss disappearing into mist, in the cloud forest on the lower slopes of Kilimanjaro",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgUA/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDEQAEBRITITFBUWGx/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAIDBP/EABgRAQADAQAAAAAAAAAAAAAAAAABERJB/9oADAMBAAIRAxEAPwCljbxsZNYSoqbSnV1EfKWau03UNkHbAMgftRcVmNy/fubgJC3Dpj0PlC8vh0kx35pdQLQ2HFF0Jng0g4rSvmQmIBFatWfqb//Z",
            "caption": "The cloud forest."
          },
          {
            "src": "/media/journal-kili-moor-374070b9.jpg",
            "alt": "Tall spiky moorland plants in front of a wide plateau under low cloud, on the Shira plateau of Kilimanjaro",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMGBAX/xAAjEAABAwMDBQEAAAAAAAAAAAABAAMRAgQSBRMhFSIxcYFh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGBEBAAMBAAAAAAAAAAAAAAAAAAERE0H/2gAMAwEAAhEDEQA/AKp26wByBHxZTfSfz0pw63e1kgu5RyY4HpIe1K6EHeFAIhLSEo4WrfRjdGS7XRkTMCfi5bQ3XWKXO4VeQUIWXDf/2Q==",
            "caption": "The Shira plateau."
          }
        ]
      },
      {
        "id": "darjeeling",
        "name": "Darjeeling, India.",
        "standfirst": "A hill town in the clouds, tea on every slope, and the third highest mountain on Earth at the end of the street.",
        "still": {
          "src": "/media/journal-darjeeling-3a6cf975.jpg",
          "alt": "Tea gardens on steep green hillsides with a village on the ridge and mountains in cloud behind, near Darjeeling",
          "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQGAQP/xAAhEAACAgIBBAMAAAAAAAAAAAACAwERABIhBAUxUUFxof/EABUBAQEAAAAAAAAAAAAAAAAAAAMB/8QAGREBAAIDAAAAAAAAAAAAAAAAAAECEhNR/9oADAMBAAIRAxEAPwChHvKGDUHM+6mKzGd5QAWTq+h5yXBqVhOs7V+5z6gmawb6GPj3OHsrxcZIC4hPaK48cYs17WsLdhFXi5wwwSP/2Q==",
          "caption": null
        },
        "why": [
          "Darjeeling sits on a ridge about two thousand metres up in West Bengal, looking north to Kangchenjunga. The British built it as a summer retreat and planted the hills around it with tea.",
          "It is cooler, slower and greener than almost anywhere else in India, and it rewards doing very little: a walk, a pot of tea, and waiting for the cloud to lift."
        ],
        "do": [
          [
            "Ride the toy train.",
            "The Darjeeling Himalayan Railway is a narrow-gauge line from the nineteenth century and a World Heritage Site. The short steam run to Ghum, the highest station in India, loops around on itself at Batasia."
          ],
          [
            "Get up for Tiger Hill.",
            "Leave before dawn to watch the first light reach Kangchenjunga. On a very clear morning you can pick out Everest in the distance."
          ],
          [
            "Walk through a tea estate.",
            "Happy Valley, just below the town, shows you the picking, the withering and the rolling, and ends with a tasting."
          ],
          [
            "Carry on to Sikkim.",
            "Gangtok is a few hours north along the Teesta river, with monasteries and bigger mountain views. Foreign visitors need a permit, which is free and issued at the border."
          ]
        ],
        "eat": "Momos, the steamed dumplings of the hills, with a fierce chilli sauce. Thukpa, a noodle soup, on a cold evening. And the tea, drunk the local way, without milk.",
        "base": "Stay near Chowrasta, the square at the top of the town, so you can walk everywhere. A night or two on a working tea estate lower down is worth adding.",
        "when": "March to May, when the first tea is picked, and October and November, when the air is clearest. The monsoon, from June to September, hides the mountains for days at a time.",
        "how": "Fly to Bagdogra, usually through Delhi or Kolkata, then drive about three hours up into the hills.",
        "tip": "Tea is named for when it is picked. First flush, from spring, is light and floral. Second flush, from early summer, is the darker one with the muscatel taste Darjeeling is known for.",
        "more": [
          {
            "src": "/media/journal-darj-hills-ede6ab5b.jpg",
            "alt": "A hill town spread along a ridge above pine trees and tea gardens under heavy cloud, at Darjeeling",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMGBAX/xAAgEAABBAICAwEAAAAAAAAAAAABAAIDEQQhEjEUIoHw/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAEDBP/EABkRAQEAAwEAAAAAAAAAAAAAAAEAAgMRQf/aAAwDAQACEQMRAD8AocjFx7JOTEAerNpbMSAablx2fimfMkZHye97WVs3dJzM8ENuTRGiCDaRkPsPS5+Q8iDoexANhYZYmiZnElocLIHX7SELLrqt/9k=",
            "caption": "Darjeeling, from the tea gardens."
          },
          {
            "src": "/media/journal-darj-valley-4fc5ac82.jpg",
            "alt": "Colourful houses on a wooded hillside above a river bed, on the road north from Darjeeling",
            "blur": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMEBQb/xAAhEAABBAEEAwEAAAAAAAAAAAABAAIDESEEEhNBBTNRkf/EABYBAQEBAAAAAAAAAAAAAAAAAAMCBP/EABkRAAMAAwAAAAAAAAAAAAAAAAABAgQTMf/aAAwDAQACEQMRAD8AijzEYBMkDhXwpsHldHM8NcXxg9uGP1VepfJFKyMRu+2cmkeyPcYXhgbd7MklWsm11g65NHqCeXisnNbu6sdpYfxy8bA0Ns1iyLQhY6bGP//Z",
            "caption": "The road to Sikkim."
          }
        ]
      }
    ]
  }
] as JournalPiece[];

export function journalPiece(slug: string): JournalPiece | null {
  return journal.find((piece) => piece.slug === slug) ?? null;
}

export const journalPath = (piece: JournalPiece) => `/journal/${piece.slug}`;

// Where Trove itself begins, said the same way at the foot of every piece.
export function closerToHome(): string {
  return `Trove’s first escape is closer to home: ${numberWord(escape.nights)} nights at one of England’s finest country houses. ${escape.charity.localityStatement}`;
}
