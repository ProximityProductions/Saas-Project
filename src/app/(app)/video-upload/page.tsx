"use client"

import React, { useState} from 'react'
import { useRouter } from 'next/navigation'
import axios  from 'axios'

const VideoUpload = () => {

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const router = useRouter();
  //max file size of 60MB
  const MAX_FILE_SIZE = 70 * 1024 * 1024;
  const handleSubmit = async (event: React.FormEvent) => {
   event.preventDefault()
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 70MB');
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('orignalSize', file.size.toString());
    try {
      const response = await axios.post('/api/video-upload', formData);
      if (response.status === 200) {
        router.push('/');
      } 
    } catch (error) {
      alert(error)
    } finally {
      setIsUploading(false);
    }
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            </div>
            <div>
              <label className='label'>
                <span className='label-text'>Description</span>
              </label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"></textarea>
            </div>
            <div>
              <label className='label'>
                <span className='label-text'>Video File</span>
              </label>
            <input
              type="file"
              accept='video/*'
              onChange={(e) => setFile(e.target.files?.[0]||null)}
              className="file-input file-input-bordered w-full"
              required
              />
              </div>  
              <button type='submit'
                className='btn btn-primary'
                disabled={isUploading}
              >{isUploading ? 'Uploading...' : 'Upload Video'}
              </button>
          </form>
        </div>
  );
}

export default VideoUpload