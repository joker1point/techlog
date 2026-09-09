import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { sortPostsWithFeatured } from '@/lib/sort'

export default async function Page() {
  const sortedPosts = sortPostsWithFeatured(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
