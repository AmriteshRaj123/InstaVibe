import Stories from '../components/Stories';
import Post from '../components/Post';

export default function Home() {
  const posts = [
    {
      id: 1,
      username: 'johndoe',
      userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
      caption: 'Beautiful sunset today! 🌅',
      likes: 123,
    },
    {
      id: 2,
      username: 'janedoe',
      userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      image: 'https://images.unsplash.com/photo-1682687221038-404670d5f335',
      caption: 'Living my best life ✨',
      likes: 456,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto pt-4 pb-20 md:pt-20">
      <Stories />
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}