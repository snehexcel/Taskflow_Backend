'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Zap, Shield, BarChart3, Users, Clock } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Task Management',
      description: 'Create, update, and organize your tasks with priorities and deadlines',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with Next.js for blazing-fast performance and instant updates',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Bank-grade security with JWT authentication and encrypted passwords',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track your productivity with detailed task statistics and insights',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share tasks and collaborate with team members seamlessly',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'See changes instantly across all your devices',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TaskFlow
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-900">
            Manage Tasks Like Never Before
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            TaskFlow is a modern, secure, and lightning-fast task management application. 
            Keep track of your productivity with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-lg">
                Start Free Today
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-blue-200 px-8 py-6 text-lg rounded-lg hover:bg-blue-50">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Every Team
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to manage tasks and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-100">
            Join thousands of users managing their tasks efficiently
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">TaskFlow</h3>
              <p className="text-gray-600 text-sm">
                Modern task management for modern teams
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-blue-600">Features</Link></li>
                <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
                <li><Link href="/" className="hover:text-blue-600">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-blue-600">Documentation</Link></li>
                <li><Link href="/" className="hover:text-blue-600">Blog</Link></li>
                <li><Link href="/" className="hover:text-blue-600">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-blue-600">Privacy</Link></li>
                <li><Link href="/" className="hover:text-blue-600">Terms</Link></li>
                <li><Link href="/" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-100 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
