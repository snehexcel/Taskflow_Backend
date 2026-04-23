'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Full-Stack Developer',
      bio: 'Expert in Next.js and modern web technologies',
    },
    {
      name: 'Sarah Williams',
      role: 'Product Designer',
      bio: 'Creating beautiful and intuitive user experiences',
    },
    {
      name: 'Mike Chen',
      role: 'DevOps Engineer',
      bio: 'Ensuring scalability and reliability',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80">
            <ArrowLeft className="w-5 h-5 text-blue-600" />
            TaskFlow
          </Link>
        </div>
      </nav>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Main About */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">
              About TaskFlow
            </h1>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>
                TaskFlow is a modern task management application built with cutting-edge web technologies. 
                We&apos;re passionate about helping teams stay organized and productive.
              </p>
              <p>
                Our mission is to provide a simple yet powerful platform for managing tasks and collaborating 
                with team members. We believe in quality over quantity and focus on delivering an exceptional 
                user experience.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Built With Modern Technology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>Frontend</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <ul className="space-y-2">
                    <li>• Next.js 16 with App Router</li>
                    <li>• React 19 with Hooks</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• TypeScript for type safety</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>Backend</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <ul className="space-y-2">
                    <li>• Next.js API Routes</li>
                    <li>• PostgreSQL with Supabase</li>
                    <li>• JWT Authentication</li>
                    <li>• Row Level Security (RLS)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <ul className="space-y-2">
                    <li>• bcrypt password hashing</li>
                    <li>• HTTP-only cookies</li>
                    <li>• CSRF protection</li>
                    <li>• Input validation with Zod</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>Deployment</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <ul className="space-y-2">
                    <li>• Vercel Hosting</li>
                    <li>• Automatic CI/CD</li>
                    <li>• Environment Management</li>
                    <li>• Real-time deployments</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-900">{member.name}</CardTitle>
                    <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex gap-3">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                        <Github className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                        <Linkedin className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                        <Mail className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'User First',
                  description: 'Everything we build is designed with our users in mind',
                },
                {
                  title: 'Quality',
                  description: 'We maintain high standards in code quality and user experience',
                },
                {
                  title: 'Innovation',
                  description: 'We constantly explore new technologies and better solutions',
                },
              ].map((value, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white space-y-4">
            <h2 className="text-2xl font-bold">
              Ready to Join Us?
            </h2>
            <p className="text-blue-100">
              Start managing your tasks with TaskFlow today
            </p>
            <Link href="/auth/register">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2026 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
