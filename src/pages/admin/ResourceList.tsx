import React, { useEffect, useState } from 'react';
import { List, Trash2, Edit } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { Resource } from '../../types';
import { getResources, deleteResource } from '../../lib/api';

export function ResourceList() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await getResources();
      setResources(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resources');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) {
      return;
    }

    try {
      await deleteResource(id);
      setResources(resources.filter(r => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete resource');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => loadResources()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        {resources.length === 0 ? (
          <div className="p-6 text-center">
            <List className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No resources</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading a new resource.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {resources.map((resource) => (
              <li key={resource.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {resource.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Type: {resource.type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(resource.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}