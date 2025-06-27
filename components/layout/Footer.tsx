'use client'

import React from 'react'
import { Hexagon, Twitter, Youtube, Mail, Github } from 'lucide-react'
import { Button } from '../ui/Button'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Thumbnail<span className="gradient-text">Hive</span>
              </span>
            </div>
            <p className="text-dark-300 mb-6 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              AI-powered YouTube thumbnail generator with niche intelligence, 
              competitor analysis, and CTR prediction. Built with advanced machine learning technology.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <a href="#" className="text-dark-400 hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-400 hover:text-primary-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-400 hover:text-primary-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-400 hover:text-primary-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-dark-300 hover:text-white transition-colors text-sm">How It Works</a></li>
              <li><a href="#features" className="text-dark-300 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#pricing" className="text-dark-300 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-dark-300 hover:text-white transition-colors text-sm">API</a></li>
              <li><a href="#" className="text-dark-300 hover:text-white transition-colors text-sm">Integrations</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-dark-300 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-dark-300 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-dark-300 hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-dark-300 hover:text-white transition-colors text-sm">Status</a></li>
              <li><a href="#" className="text-dark-300 hover:text-white transition-colors text-sm">Changelog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-800 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-0 md:flex-row md:space-x-6">
              <p className="text-dark-400 text-xs md:text-sm text-center md:text-left">
                © 2025 ThumbnailHive. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs md:text-sm">
                <a href="#" className="text-dark-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-dark-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-dark-400 hover:text-white transition-colors">Security</a>
              </div>
            </div>
            
            {/* Final CTA */}
            <div className="text-center md:text-right">
              <p className="text-dark-300 text-xs md:text-sm mb-3 md:mb-2">Ready to boost your CTR?</p>
              <Button size="sm" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 