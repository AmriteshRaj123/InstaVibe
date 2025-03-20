import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function Post({ username, userImage, image, caption, likes: initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm mb-4">
      <div className="flex items-center p-4">
        <img src={userImage} alt={username} className="w-8 h-8 rounded-full object-cover" />
        <span className="ml-3 font-semibold">{username}</span>
      </div>

      <img src={image} alt="Post" className="w-full aspect-square object-cover" />

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button onClick={handleLike}>
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 stroke-red-500' : ''}`} />
            </button>
            <button>
              <MessageCircle className="w-6 h-6" />
            </button>
            <button>
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button>
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        <div className="font-semibold mb-2">{likes} likes</div>
        <div>
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </div>
      </div>
    </div>
  );
}