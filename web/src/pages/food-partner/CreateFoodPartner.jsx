import React, { useState } from 'react'

const CreateFoodPartner = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setVideoFile(file)
      setPreview(URL.createObjectURL(file))
    } else {
      setVideoFile(null)
      setPreview(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // UI-only: log values. Replace with API call when ready.
    console.log('Submit video:', { name, description, videoFile })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create Food / Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dish name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full"
            />
          </div>

          {preview && (
            <div className="rounded overflow-hidden border mt-2">
              <video src={preview} controls className="w-full h-64 object-cover" />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFoodPartner