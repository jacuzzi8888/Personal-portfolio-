---
title: "Mastering Modern React Patterns"
date: "2024-11-15"
description: "A deep dive into composition patterns, custom hooks, and performance optimization techniques that every React developer should know."
tags: ["React", "TypeScript", "Performance"]
---

# Mastering Modern React Patterns

After building React applications for years, I've learned that the difference between good and great code often comes down to patterns. Here are the techniques I use daily that have the biggest impact.

## 1. Composition Over Configuration

The most powerful pattern in React isn't `useState` or `useEffect` — it's composition. Instead of building monolithic components with dozens of props, build small, focused pieces that compose together.

```tsx
// ❌ Avoid: One giant component
<Card 
  title="..." 
  subtitle="..." 
  icon="..." 
  footer="..."
  variant="primary"
  size="large"
/>

// ✅ Prefer: Composable pieces
<Card>
  <Card.Header>
    <Card.Icon name="star" />
    <Card.Title>...</Card.Title>
  </Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer>...</Card.Footer>
</Card>
```

## 2. Custom Hooks for Logic Separation

Every time you find yourself copying `useState` + `useEffect` logic between components, that's a custom hook waiting to happen.

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

## 3. Optimistic Updates for Snappy UX

Don't make users wait for the server. Update the UI immediately, then reconcile with the server response.

```tsx
const handleLike = async () => {
  // Optimistic update
  setLiked(true);
  setLikes(prev => prev + 1);
  
  try {
    await api.like(postId);
  } catch {
    // Rollback on error
    setLiked(false);
    setLikes(prev => prev - 1);
    toast.error("Failed to like post");
  }
};
```

## Key Takeaways

- **Composition** makes components flexible and maintainable
- **Custom hooks** eliminate code duplication and improve testability
- **Optimistic updates** create a perception of speed

Master these patterns, and you'll write React code that's both powerful and a pleasure to maintain.
