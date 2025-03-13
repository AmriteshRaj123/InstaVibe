import { useState } from 'react';
import { X } from 'lucide-react';
import Modal from 'react-modal';
import { supabase } from '../lib/supabase';

Modal.setAppElement('#root');

export default function CreateStory({ isOpen, onClose, onStoryCreated }) {
  const [image, setImage] = useState(null);
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
        .from('stories')
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('stories')
        .getPublicUrl(fileName);

      // Create story in database
      const { error: storyError } = await supabase
        .from('stories')
        .insert([{ 
          image_url: publicUrl,
          user_id: (await supabase.auth.getUser()).data.user.id
        }]);

      if (storyError) throw storyError;

      onClose();
      setImage(null);
      if (onStoryCreated) onStoryCreated();
    } catch (error) {
      console.error('Error creating story:', error);
      alert('Error creating story. Please try again.');
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
          <h2 className="text-xl font-semibold">Create New Story</h2>
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
          
          <button
            type="submit"
            disabled={!image || loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Share Story'}
          </button>
        </form>
      </div>
    </Modal>
  );
}