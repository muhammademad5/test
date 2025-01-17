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
// get url 
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get('id'));

async function fetchBookDetails() {
    try {
        const response = await fetch(`http://localhost:3000/books/${bookId}`);
        const book = await response.json();
        displayBookDetails(book);
        fetchRelatedBooks(book.genre);
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}

function displayBookDetails(book) {
    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('bookAuthor').textContent = book.author;
    document.getElementById('bookDescription').textContent = book.description;
    document.getElementById('bookDuration').textContent = `Duration: ${book.duration}`;
}

// جلب الكتب ذات الصلة
async function fetchRelatedBooks(genre) {
    try {
        const response = await fetch(`http://localhost:3000/books?genre=${genre}`);
        const relatedBooks = await response.json();
        displayRelatedBooks(relatedBooks);
    } catch (error) {
        console.error('Error fetching related books:', error);
    }
}

// عرض الكتب ذات الصلة
function displayRelatedBooks(books) {
    const relatedBooksContainer = document.getElementById('relatedBooks');
    relatedBooksContainer.innerHTML = ''; // مسح المحتوى الحالي
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'audiobook-card';
        card.innerHTML = `
            <img src="${book.coverImageUrl}" alt="${book.title}" />
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <a href="details.html?id=${book.id}">Details</a>
        `;
        relatedBooksContainer.appendChild(card);
    });
}

function likeBook() {
  const likes = JSON.parse(localStorage.getItem('likes')) || {};
  likes[bookId] = true;
  localStorage.setItem('likes', JSON.stringify(likes));
  updateLikeDislikeButtons();
}
function dislikeBook() {
  const dislikes = JSON.parse(localStorage.getItem('dislikes')) || {};
  dislikes[bookId] = true;
  localStorage.setItem('dislikes', JSON.stringify(dislikes));
  updateLikeDislikeButtons();
}
function updateLikeDislikeButtons() {
  const likes = JSON.parse(localStorage.getItem('likes')) || {};
  const dislikes = JSON.parse(localStorage.getItem('dislikes')) || {};
  const likeButton = document.getElementById('likeButton');
  const dislikeButton = document.getElementById('dislikeButton');

  if (likes[bookId]) {
      likeButton.style.backgroundColor = 'green';
      dislikeButton.style.backgroundColor = '#007bff';
  } else if (dislikes[bookId]) {
      dislikeButton.style.backgroundColor = 'red';
      likeButton.style.backgroundColor = '#007bff';
  } else {
      likeButton.style.backgroundColor = '#007bff';
      dislikeButton.style.backgroundColor = '#007bff';
  }
}

function loadLikesDislikes() {
  updateLikeDislikeButtons();
}

function addComment() {
  const commentInput = document.getElementById('commentInput');
  const commentText = commentInput.value.trim();
  if (commentText) {
      const comments = JSON.parse(localStorage.getItem('comments')) || {};
      if (!comments[bookId]) comments[bookId] = [];
      comments[bookId].push(commentText);
      localStorage.setItem('comments', JSON.stringify(comments));
      commentInput.value = '';
      loadComments();
  }
}

function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || {};
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = ''; // مسح المحتوى الحالي
  if (comments[bookId]) {
      comments[bookId].forEach(comment => {
          const commentDiv = document.createElement('div');
          commentDiv.className = 'comment';
          commentDiv.textContent = comment;
          commentsList.appendChild(commentDiv);
      });
  }
}


fetchBookDetails();
