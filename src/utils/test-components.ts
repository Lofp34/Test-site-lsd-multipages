// Simple test to verify component imports work correctly
import { Book } from '@/data/books';
import { enterpriseAccountCategory } from '@/data/books-enriched';

// Test data access
export function testDataAccess() {
  console.log('Testing data access...');
  console.log('Enterprise category:', enterpriseAccountCategory.title);
  console.log('Number of books:', enterpriseAccountCategory.books.length);
  console.log('First book:', enterpriseAccountCategory.books[0]?.title);
  
  // Test enriched fields
  const firstBook = enterpriseAccountCategory.books[0];
  if (firstBook) {
    console.log('Book has rating:', firstBook.rating);
    console.log('Book has difficulty:', firstBook.difficulty);
    console.log('Book has reading time:', firstBook.readingTime);
    console.log('Book has key points:', firstBook.keyPoints?.length);
  }
  
  return true;
}

// Test component props
export function testBookCardProps(book: Book) {
  return {
    book,
    variant: 'grid' as const,
    showRating: true,
    showDifficulty: true,
    showReadingTime: true
  };
}