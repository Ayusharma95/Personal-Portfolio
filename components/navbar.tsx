"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setIsScrolled(currentScrollY > 0)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      const navHeight = 64 // Height of the navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/50 backdrop-blur-lg' : 'bg-transparent'
    } ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => scrollToSection('#top')} 
            className="text-sky-500 font-bold text-xl"
          >
            Portfolio
          </button>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('#about')} 
              className="text-gray-300 hover:text-sky-500 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('#projects')} 
              className="text-gray-300 hover:text-sky-500 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('#contact')} 
              className="text-gray-300 hover:text-sky-500 transition-colors"
            >
              Contact
            </button>
          </div>

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('#about')}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-sky-500"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('#projects')}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-sky-500"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-sky-500"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}