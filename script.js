const audiobooks = [
    {
      id: 1,
      title: "The Martian",
      author: "Andy Weir",
      genre: "Science Fiction",
      description: "A stranded astronaut must find a way to survive on Mars.",
      duration: "10h 35m",
      audioUrl: "https://example.com/audiobooks/the-martian.mp3",
      coverImageUrl: "https://example.com/covers/the-martian.jpg"
    },
    {
      id: 2,
      title: "Becoming",
      author: "Michelle Obama",
      genre: "Biography",
      description: "A memoir by the former First Lady of the United States.",
      duration: "15h 20m",
      audioUrl: "https://example.com/audiobooks/becoming.mp3",
      coverImageUrl: "https://example.com/covers/becoming.jpg"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      description: "A chilling depiction of a totalitarian regime and its impact on society.",
      duration: "11h 0m",
      audioUrl: "https://example.com/audiobooks/1984.mp3",
      coverImageUrl: "https://example.com/covers/1984.jpg"
    },
    {
      id: 4,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "History",
      description: "A brief history of humankind, from the Stone Age to the modern era.",
      duration: "14h 45m",
      audioUrl: "https://example.com/audiobooks/sapiens.mp3",
      coverImageUrl: "https://example.com/covers/sapiens.jpg"
    },
    {
      id: 5,
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      genre: "Self-help",
      description: "A counterintuitive approach to living a good life.",
      duration: "5h 40m",
      audioUrl: "https://example.com/audiobooks/subtle-art.mp3",
      coverImageUrl: "https://example.com/covers/subtle-art.jpg"
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      description: "A sci-fi epic about politics, religion, and survival on a desert planet.",
      duration: "21h 15m",
      audioUrl: "https://example.com/audiobooks/dune.mp3",
      coverImageUrl: "https://example.com/covers/dune.jpg"
    },
    {
      id: 7,
      title: "Educated",
      author: "Tara Westover",
      genre: "Biography",
      description: "A memoir of a woman who leaves her survivalist family to pursue education.",
      duration: "12h 10m",
      audioUrl: "https://example.com/audiobooks/educated.mp3",
      coverImageUrl: "https://example.com/covers/educated.jpg"
    },
    {
      id: 8,
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Dystopian",
      description: "A futuristic society shaped by technology, conditioning, and eugenics.",
      duration: "8h 30m",
      audioUrl: "https://example.com/audiobooks/brave-new-world.mp3",
      coverImageUrl: "https://example.com/covers/brave-new-world.jpg"
    },
    {
      id: 9,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      description: "An easy and proven way to build good habits and break bad ones.",
      duration: "6h 30m",
      audioUrl: "https://example.com/audiobooks/atomic-habits.mp3",
      coverImageUrl: "https://example.com/covers/atomic-habits.jpg"
    },
    {
      id: 10,
      title: "Homo Deus",
      author: "Yuval Noah Harari",
      genre: "History",
      description: "Explores the future of humanity in the age of artificial intelligence.",
      duration: "13h 45m",
      audioUrl: "https://example.com/audiobooks/homo-deus.mp3",
      coverImageUrl: "https://example.com/covers/homo-deus.jpg"
    }
];
const audiobooksList = document.getElementById('audiobooksList');
const searchBar = document.getElementById('searchBar');

async function fetchAudiobooks() {
  try {
      const response = await fetch('http://localhost:3000/books');
      const data = await response.json();
      displayAudiobooks(data);
  } catch (error) {
      console.error('Error fetching audiobooks:', error);
  }
}

// show audiobooks
function displayAudiobooks(books) {
    audiobooksList.innerHTML = ''; // delete
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'audiobook-card';
        card.innerHTML = `
            <img src="${book.coverImageUrl}" alt="${book.title}" />
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <a href="details.html?id=${book.id}">Details</a>
        `;
        audiobooksList.appendChild(card);
    });
}
// Search audiobooks
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBooks = audiobooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    displayAudiobooks(filteredBooks);
});

fetchAudiobooks();
// Show audiobooks
displayAudiobooks(audiobooks);

///////////////////////////////////////////////////////////

function likeBook(bookId) {
  const likes = JSON.parse(localStorage.getItem('likes')) || {};
  likes[bookId] = true;
  localStorage.setItem('likes', JSON.stringify(likes));
}

function dislikeBook(bookId) {
  const dislikes = JSON.parse(localStorage.getItem('dislikes')) || {};
  dislikes[bookId] = true;
  localStorage.setItem('dislikes', JSON.stringify(dislikes));
}

function addComment(bookId, comment) {
  const comments = JSON.parse(localStorage.getItem('comments')) || {};
  if (!comments[bookId]) comments[bookId] = [];
  comments[bookId].push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
}