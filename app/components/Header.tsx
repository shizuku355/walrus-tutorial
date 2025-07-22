'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🌊</div>
            <span className="text-xl font-bold text-blue-900">Walrus Tutorial</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-900 transition-colors">
              ホーム
            </Link>
            <Link href="/what-is-walrus" className="text-gray-700 hover:text-blue-900 transition-colors">
              Walrusとは
            </Link>
            <Link href="/walrus-sites" className="text-gray-700 hover:text-blue-900 transition-colors">
              Walrus Sites
            </Link>
            <Link href="/tutorial" className="text-gray-700 hover:text-blue-900 transition-colors">
              作り方Tutorial
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link 
                href="/what-is-walrus" 
                className="text-gray-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Walrusとは
              </Link>
              <Link 
                href="/walrus-sites" 
                className="text-gray-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Walrus Sites
              </Link>
              <Link 
                href="/tutorial" 
                className="text-gray-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                作り方Tutorial
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}