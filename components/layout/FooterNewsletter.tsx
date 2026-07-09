"use client";

import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

export default function FooterNewsletter() {
  const [activeTab, setActiveTab] = useState<'newsletter' | 'contact'>('newsletter');

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full mx-auto shadow-2xl relative overflow-hidden group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-aqua-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      <div className="relative">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Bleiben Sie in Kontakt</h3>
        <p className="text-slate-300 text-sm mb-6">
          Erhalten Sie die neuesten Updates oder kontaktieren Sie uns direkt.
        </p>

        {/* Tab Switcher */}
        <div className="flex space-x-1 bg-white/5 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('newsletter')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'newsletter'
                ? 'bg-aqua-500 text-white shadow-lg shadow-aqua-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Newsletter
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'contact'
                ? 'bg-aqua-500 text-white shadow-lg shadow-aqua-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Schnellkontakt
          </button>
        </div>

        {/* Forms Container */}
        <div className="relative min-h-[180px]">
          {/* Newsletter Form */}
          <div
            className={`transition-all duration-500 absolute inset-0 ${
              activeTab === 'newsletter'
                ? 'opacity-100 translate-y-0 pointer-events-auto relative'
                : 'opacity-0 translate-y-4 pointer-events-none absolute'
            }`}
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="email-newsletter" className="sr-only">E-Mail Adresse</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email-newsletter"
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 transition-all duration-300 sm:text-sm"
                    placeholder="Ihre E-Mail"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-aqua-600 to-aqua-500 hover:from-aqua-500 hover:to-aqua-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-aqua-500 transition-all duration-300 group"
              >
                Abonnieren
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Quick Contact Form */}
          <div
            className={`transition-all duration-500 ${
              activeTab === 'contact'
                ? 'opacity-100 translate-y-0 pointer-events-auto relative'
                : 'opacity-0 translate-y-4 pointer-events-none absolute inset-0'
            }`}
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="name-contact" className="sr-only">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="name-contact"
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-lg leading-5 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 transition-all duration-300 sm:text-sm"
                    placeholder="Ihr Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message-contact" className="sr-only">Nachricht</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-slate-400" />
                  </div>
                  <textarea
                    id="message-contact"
                    rows={3}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-lg leading-5 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 transition-all duration-300 sm:text-sm resize-none"
                    placeholder="Wie können wir helfen?"
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-aqua-600 to-aqua-500 hover:from-aqua-500 hover:to-aqua-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-aqua-500 transition-all duration-300 group"
              >
                Nachricht senden
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
