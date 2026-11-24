import { escape } from '@/config/prize';
import { numberWord } from '@/lib/format';

// The journal. Each piece is written here so its words live in one place. The photographs
// are the founder's own, taken on his own trips; none shows a Trove prize, and every piece
// says so and says where the first escape is. Signups from a piece are stored against its
// channel, so we can see which pieces bring people to the founding friends list.
export type JournalPlace = { name: string; still: { src: string; alt: string; blur: string }; text: string; when: string };
export type JournalPiece = { slug: string; title: string; description: string; intro: string[]; places: JournalPlace[]; channel: string };

export const journal: JournalPiece[] = [
  {
    slug: 'five-escapes-worth-the-journey',
    title: 'Five escapes worth the journey.',
    description: 'Five places from our founder’s own trips, each with one photograph and when to go: Sumba, Cape Town, Antigua, Kilimanjaro and Darjeeling.',
    intro: [
      'Five places from our founder’s own trips. He took each photograph on his phone, and none has been retouched.',
      'None of these is a Trove prize. They are here because they are the kind of place Trove was started for.',
    ],
    channel: 'journal-five-escapes',
    places: [
      {
        name: 'Sumba, Indonesia.',
        still: { src: '/media/journal-sumba-f61c1562.jpg', alt: 'Horses on a sandy beach between dark rocks, with green hills behind, on the island of Sumba', blur: 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAIEBQb/xAAjEAABAwMEAgMAAAAAAAAAAAABAgMEABESBQYhQSIxM3GB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAQIh/9oADAMBAAIRAxEAPwAOgOFZSiUwVjq3I/KRe35ePytK+gaZO3348kzBJdS+tROabd+6mSY+pvS2Xm5QaSgWAHfHNx6NPgTKxfWrIDI2PXVZXckl0rSSo+F8QCQBRRUpR//Z' },
        text: 'Sumba is an hour’s flight east of Bali and has a fraction of the visitors. On the west coast the horses are walked down to the sea in the afternoon, and the beach is theirs for an hour.',
        when: 'Go between May and October, when it is dry.',
      },
      {
        name: 'Cape Town, South Africa.',
        still: { src: '/media/journal-cape-town-14dbfac1.jpg', alt: 'A palm tree above rocks and breaking waves, with Lion’s Head behind, on the Atlantic coast of Cape Town', blur: 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAAD/8QAIhAAAgEEAQQDAAAAAAAAAAAAAQIDAAQREjEFISJBcZGx/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/xAAZEQACAwEAAAAAAAAAAAAAAAAAAgEEQRH/2gAMAwEAAhEDEQA/ADCxKDZsKo5J4pNtbq+QjBtTg4PFE6nFN1G0bNw3hg6Jkg/NFvLN4niSGaSUMDtn1j8p73ZjAa1+6Lu3kNvFpI8SsjFlQ4Dd/f1WVjcNLYLlUUBtQFGOe9VVSXHqf//Z' },
        text: 'Lion’s Head from the Atlantic side of the city. Walk up it for sunrise, then drive south along the coast to the penguins at Boulders Beach.',
        when: 'Go between November and March, the southern summer.',
      },
      {
        name: 'Antigua.',
        still: { src: '/media/journal-antigua-30a90979.jpg', alt: 'A pink and orange sunset over the sea, seen across a pool with a table and a parasol at its edge, in Antigua', blur: 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQGBf/EAB4QAAEEAwEBAQAAAAAAAAAAAAEAAgMRBBIxEwVx/8QAFgEBAQEAAAAAAAAAAAAAAAAABAID/8QAGREAAwEBAQAAAAAAAAAAAAAAAAERAiEx/9oADAMBAAIRAxEAPwBqDHjcSN27DtEJs4Dasi/1Tnz8+TIlaHzTFgFuLpWlt1yqWu7K2bXu7nNgpenfRmXywiZHvhJ83EIGXMevJQhaBz//2Q==' },
        text: 'The west coast of the island faces the sunset, and most evenings it is worth stopping whatever you are doing to watch it.',
        when: 'Go between December and April, when it is dry.',
      },
      {
        name: 'Kilimanjaro, Tanzania.',
        still: { src: '/media/journal-kilimanjaro-bd81ce0c.jpg', alt: 'A rocky valley high on Kilimanjaro, looking down onto a sea of cloud under a blue sky', blur: 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIDBAb/xAAjEAABAwIFBQAAAAAAAAAAAAABAAIDBAUREiEikTFBQlJh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEwH/2gAMAwEAAhEDEQA/ANUlswOjm8qYt/1vK52kvNypztqS8HxkOYJ6i6XCpdndM4R+sbi0Kq2p5EZhuGA6qsLWk5SND2QhAd//2Q==' },
        text: 'The highest mountain in Africa, and one you can walk up without ropes. This was taken part of the way up, already above the clouds. Most routes take about a week.',
        when: 'Go between January and March, or June and October.',
      },
      {
        name: 'Darjeeling, India.',
        still: { src: '/media/journal-darjeeling-3a6cf975.jpg', alt: 'Tea gardens on steep green hillsides with a village on the ridge and mountains in cloud behind, near Darjeeling', blur: 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQGAQP/xAAhEAACAgIBBAMAAAAAAAAAAAACAwERABIhBAUxUUFxof/EABUBAQEAAAAAAAAAAAAAAAAAAAMB/8QAGREBAAIDAAAAAAAAAAAAAAAAAAECEhNR/9oADAMBAAIRAxEAPwChHvKGDUHM+6mKzGd5QAWTq+h5yXBqVhOs7V+5z6gmawb6GPj3OHsrxcZIC4hPaK48cYs17WsLdhFXi5wwwSP/2Q==' },
        text: 'Tea gardens on hillsides at the foot of the Himalayas, steep enough that the paths between the bushes zigzag. Come for the tea, the narrow mountain railway and the view on a clear morning.',
        when: 'Go between March and May, or in October and November.',
      },
    ],
  },
];

export function journalPiece(slug: string): JournalPiece | null {
  return journal.find((piece) => piece.slug === slug) ?? null;
}

export const journalPath = (piece: JournalPiece) => `/journal/${piece.slug}`;

// Where Trove itself begins, said the same way at the foot of every piece.
export function closerToHome(): string {
  return `Trove’s first escape is closer to home: ${numberWord(escape.nights)} nights at one of England’s finest country houses, in ${escape.destination}. ${escape.charity.localityStatement}`;
}
