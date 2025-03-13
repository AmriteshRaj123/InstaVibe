export default function Stories() {
  const stories = [
    { id: 1, username: 'user1', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { id: 2, username: 'user2', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12' },
    { id: 3, username: 'user3', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
    { id: 4, username: 'user4', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
  ];

  return (
    <div className="flex space-x-4 p-4 bg-white border border-gray-200 mb-4 overflow-x-auto">
      {stories.map(story => (
        <div key={story.id} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full ring-2 ring-red-500 p-1">
            <img
              src={story.image}
              alt={story.username}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="text-xs mt-1">{story.username}</span>
        </div>
      ))}
    </div>
  );
}