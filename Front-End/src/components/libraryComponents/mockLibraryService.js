
import book2 from './assets/book2.jpg'
export const fetchBooks = async () => {
  return [
      {
        id: 1,
        image: "https://example.com/book1.jpg",
        name: "كتاب 1",
        ratingReviews: [150, 200, 250, 300, 350],
        author: "مؤلف 1",
        publisher: "ناشر 1",
        dateOfPublish: "2023-01-01",
        price: 150,
        category: "رواية"
      },
      {
        id: 2,
        image: "https://example.com/book2.jpg",
        name: "كتاب 2",
        ratingReviews: [100, 150, 200, 250, 300],
        author: "مؤلف 2",
        publisher: "ناشر 2",
        dateOfPublish: "2022-05-15",
        price: 200,
        category: "خيالي"
      },
      {
        id: 3,
        image: "https://example.com/book3.jpg",
        name: "كتاب 3",
        ratingReviews: [130, 180, 230, 280, 330],
        author: "مؤلف 3",
        publisher: "ناشر 3",
        dateOfPublish: "2021-11-20",
        price: 120,
        category: "علوم"
      },
      {
        id: 4,
        image: "https://example.com/book4.jpg",
        name: "كتاب 4",
        ratingReviews: [110, 160, 210, 260, 310],
        author: "مؤلف 4",
        publisher: "ناشر 4",
        dateOfPublish: "2020-07-10",
        price: 180,
        category: "واقعي"
      },
      {
        id: 5,
        image: "https://example.com/book5.jpg",
        name: "كتاب 5",
        ratingReviews: [170, 220, 270, 320, 370],
        author: "مؤلف 5",
        publisher: "ناشر 5",
        dateOfPublish: "2019-03-25",
        price: 250,
        category: "ديني"
      },
      {
        id: 6,
        image: "https://example.com/book6.jpg",
        name: "كتاب 6",
        ratingReviews: [140, 190, 240, 290, 340],
        author: "مؤلف 6",
        publisher: "ناشر 6",
        dateOfPublish: "2018-09-30",
        price: 130,
        category: "شعر"
      },
      {
        id: 7,
        image: "https://example.com/book7.jpg",
        name: "كتاب 7",
        ratingReviews: [120, 170, 220, 270, 320],
        author: "مؤلف 7",
        publisher: "ناشر 7",
        dateOfPublish: "2017-12-05",
        price: 160,
        category: "اهتماماتي"
      },
      {
        id: 8,
        image: "https://example.com/book8.jpg",
        name: "كتاب 8",
        ratingReviews: [160, 210, 260, 310, 360],
        author: "مؤلف 8",
        publisher: "ناشر 8",
        dateOfPublish: "2016-04-18",
        price: 140,
        category: "الكل"
      }
      // Add more book objects here
  ];
};