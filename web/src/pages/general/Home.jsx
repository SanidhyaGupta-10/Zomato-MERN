import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const raw = localStorage.getItem('savedItems')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const raw = localStorage.getItem('likedItems')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })
  const scrollContainerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const navigate = useNavigate()

  // Fetch food items from API (use cookie-based auth if available)
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        // Send cookies (token) if backend set them on registration/login
        const response = await fetch('http://localhost:3000/api/food', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Food items fetched:', data)
          const items = data.foodItems || []
          setFoodItems(items)
        } else if (response.status === 401) {
          console.error('Unauthorized - invalid or expired token')
          // If unauthorized, clear any stored token and send user to login
          localStorage.removeItem('token')
          navigate('/user/login')
        } else {
          console.error('Failed to fetch food items, status:', response.status)
        }
      } catch (error) {
        console.error('Error fetching food items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFoodItems()
  }, [])

  // Handle scroll snap behavior
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Snap to nearest video after scroll ends
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = scrollContainer.scrollTop
        const containerHeight = scrollContainer.clientHeight
        const snapIndex = Math.round(scrollPosition / containerHeight)
        
        scrollContainer.scrollTo({
          top: snapIndex * containerHeight,
          behavior: 'smooth'
        })
        setCurrentVideoIndex(snapIndex)
      }, 150)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const handleVisitStore = (foodItem) => {
    console.log('Visit store clicked for:', foodItem.name)
    // Add navigation logic here
  }

  const toggleSave = async (item) => {
    try {
      const isAlreadySaved = savedIds.includes(item._id)
      const res = await fetch('http://localhost:3000/api/food/save', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodId: item._id })
      })

      if (res.ok) {
        const data = await res.json()
        console.log('Save response:', data)
        
        // Update saved ids tracking
        setSavedIds((prev) => {
          const next = isAlreadySaved 
            ? prev.filter((id) => id !== item._id) 
            : [...prev, item._id]
          try {
            localStorage.setItem('savedItems', JSON.stringify(next))
          } catch (e) {}
          return next
        })
        
        // Update foodItems count: increment if saving, decrement if unsaving
        setFoodItems((prevItems) =>
          prevItems.map((video) =>
            video._id === item._id 
              ? { ...video, saveCount: isAlreadySaved ? (video.saveCount || 1) - 1 : (video.saveCount || 0) + 1 } 
              : video
          )
        )
      } else {
        console.error('Save request failed:', res.status)
      }
    } catch (error) {
      console.error('Error saving video:', error)
    }
  }

  const handleLike = async (item) => {
    try {
      const isAlreadyLiked = likedIds.includes(item._id)
      const res = await fetch('http://localhost:3000/api/food/like', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodId: item._id })
      })

      if (res.ok) {
        const data = await res.json()
        console.log('Like response:', data)
        
        // Update liked ids tracking
        setLikedIds((prev) => {
          const next = isAlreadyLiked 
            ? prev.filter((id) => id !== item._id) 
            : [...prev, item._id]
          try {
            localStorage.setItem('likedItems', JSON.stringify(next))
          } catch (e) {}
          return next
        })
        
        // Update foodItems count: increment if liking, decrement if unliking
        setFoodItems((prevItems) =>
          prevItems.map((video) =>
            video._id === item._id 
              ? { ...video, likeCount: isAlreadyLiked ? (video.likeCount || 1) - 1 : (video.likeCount || 0) + 1 } 
              : video
          )
        )
      } else {
        console.error('Like request failed:', res.status)
      }
    } catch (error) {
      console.error('Error liking video:', error)
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (foodItems.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">No videos available</div>
      </div>
    )
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black"
      style={{ scrollBehavior: 'smooth' }}
    >
      {foodItems.map((item, index) => (
        <div
          key={item._id}
          className="h-screen w-screen flex items-center justify-center relative snap-start"
        >
          {/* Video Background */}
          <video
            src={item.video}
            className="w-full h-full object-cover absolute inset-0"
            autoPlay={index === currentVideoIndex}
            muted
            loop
            playsInline
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content Overlay - Bottom positioning */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            {/* Description - Truncated to 2 lines */}
            <div className="mb-3">
              <div className="bg-white/10 backdrop-blur-md rounded p-3">
                <p className="text-white text-sm line-clamp-2 break-words">
                  {item.description || 'No description available'}
                </p>
              </div>
            </div>

            {/* Visit Store Button */}
            <div className="flex items-center gap-3">
              <Link to={`/food-partner/${item.foodPartner}`} className="block">
                <button
                  onClick={() => handleVisitStore(item)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Visit Store
                </button>
              </Link>

              <div className="ml-2 bg-white/10 backdrop-blur-md rounded px-3 py-2 flex items-center gap-3">
                <div className="text-white text-sm">Comments: <span className="font-semibold">{item.commentCount || 0}</span></div>
                <div className="text-white text-sm">Saves: <span className="font-semibold">{item.saveCount || 0}</span></div>
              </div>
            </div>
          </div>

          {/* Video Title - Bottom Right Corner */}
          <div className="absolute bottom-28 left-4 right-4 z-10">
            <h3 className="text-white text-lg font-bold drop-shadow-lg">
              {item.name}
            </h3>
          </div>

          {/* Right-side action icons */}
          <div className="absolute right-6 top-1/3 z-20 flex flex-col items-center gap-6">
            <button
              onClick={() => handleLike(item)}
              className="flex flex-col items-center text-white text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition ${likedIds.includes(item._id) ? 'fill-red-500' : 'fill-white'}`} viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 4.01 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 17.99 4 20 6.01 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="mt-1">{item.likeCount || 0}</span>
            </button>

            <button
              onClick={() => toggleSave(item)}
              className="flex flex-col items-center text-white text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition ${savedIds.includes(item._id) ? 'fill-yellow-400' : 'fill-white'}`} viewBox="0 0 24 24">
                <path d="M6 2a2 2 0 0 0-2 2v16l8-4 8 4V4a2 2 0 0 0-2-2H6z" />
              </svg>
              <span className="mt-1">{item.saveCount || (savedIds.includes(item._id) ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => console.log('comment', item._id)}
              className="flex flex-col items-center text-white text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 6h-2v9H7l-4 4V6a2 2 0 0 1 2-2h16v2z" />
              </svg>
              <span className="mt-1">{item.commentCount || 0}</span>
            </button>
          </div>
        </div>
      ))}

      {/* Bottom nav bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="bg-white/90 backdrop-blur border-t border-gray-200">
          <div className="max-w-4xl mx-auto flex items-center justify-between p-3">
            <Link to="/" className="flex items-center gap-2 text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" />
              </svg>
              <span className="font-medium">Home</span>
            </Link>

            <Link to="/saved" className="flex items-center gap-2 text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 2a2 2 0 0 0-2 2v16l8-4 8 4V4a2 2 0 0 0-2-2H6z" />
              </svg>
              <span className="font-medium">Saved</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home