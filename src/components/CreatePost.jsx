import { useState } from 'react';
import { X } from 'lucide-react';
import Modal from 'react-modal';
import { supabase } from '../lib/supabase';

Modal.setAppElement('#root');

export default function CreatePost({ isOpen, onClose, onPostCreated }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      setLoading(true);
      
      // Upload image to Supabase Storage
      const fileExt = image.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('posts')
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('posts')
        .getPublicUrl(fileName);

      // Create post in database
      const { error: postError } = await supabase
        .from('posts')
        .insert([{ 
          image_url: publicUrl, 
          caption,
          user_id: (await supabase.auth.getUser()).data.user.id
        }]);

      if (postError) throw postError;

      onClose();
      setImage(null);
      setCaption('');
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-lg w-full mx-auto mt-20 bg-white rounded-lg shadow-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Post</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
          
          <div className="mb-4">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full p-2 border rounded-lg"
              rows="4"
            />
          </div>
          
          <button
            type="submit"
            disabled={!image || loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Share'}
          </button>
        </form>
      </div>
    </Modal>
  );
}