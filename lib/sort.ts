/**
 * Sort posts: featured first, then by date descending
 */
export function sortPostsWithFeatured<T extends { featured?: boolean | null; date: string }>(
  posts: T[]
): T[] {
  return [...posts].sort((a, b) => {
    // Featured posts first
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    // Then by date descending
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
