import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Saved = () => {
  const [savedItems, setSavedItems] = useState([])
  const [allItems, setAllItems] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('savedItems')
      const ids = raw ? JSON.parse(raw) : []
      setSavedItems(ids)
    } catch (e) {
      setSavedItems([])
    }

    // Try to load all items to display names (best-effort)
    const fetchAll = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/food', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setAllItems(data.foodItems || [])
        }
      } catch (e) {
        console.error('Failed to fetch all items for saved page', e)
      }
    }
    fetchAll()
  }, [])

  const savedDetails = savedItems.map((id) => allItems.find((it) => it._id === id)).filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Saved</h2>
        {savedDetails.length === 0 ? (
          <div className="text-gray-600">No saved items yet.</div>
        ) : (
          <ul className="space-y-4">
            {savedDetails.map((item) => (
              <li key={item._id} className="border p-3 rounded flex items-center justify-between bg-white/30 backdrop-blur-sm">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700">Saves: <span className="font-semibold">{item.saveCount || 0}</span></div>
                  <Link to={`/food-partner/${item.foodPartner}`} className="text-red-500">Visit Store</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex justify-end">
          <Link to="/" className="text-sm text-gray-700 hover:underline">Back Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Saved
