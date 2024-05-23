export const fetchBooks = async () => {
    try {
      const response = await fetch('https://openlibrary.org/subjects/fiction.json?limit=50');
      const data = await response.json();
      return data.works.map((book) => ({
        key: book.key,
     
        ratings_average: book.ratings_average || 'N/A',
        author_name: book.authors[0]?.name || 'N/A',
        title: book.title || 'N/A',
        first_publish_year: book.first_publish_year || 'N/A',
        subject: book.subject ? book.subject.join(', ') : 'N/A',
        
        author_birth_date: 'N/A',
        author_top_work: book.title || 'N/A' 
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  