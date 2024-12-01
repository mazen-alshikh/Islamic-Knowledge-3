import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Database, List } from 'lucide-react';
import { ResourceList } from './ResourceList';
import { ResourceUpload } from './ResourceUpload';

export function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-3">
        <nav className="space-y-1">
          <Link
            to="/admin"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Database className="w-5 h-5" />
            <span>Resources</span>
          </Link>
          <Link
            to="/admin/upload"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <BookOpen className="w-5 h-5" />
            <span>Upload Resource</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="col-span-9">
        <Routes>
          <Route index element={<ResourceList />} />
          <Route path="upload" element={<ResourceUpload />} />
        </Routes>
      </div>
    </div>
  );
}