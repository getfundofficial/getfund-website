import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Save, ArrowLeft, Loader2, Check, AlertCircle, Image, FileText } from 'lucide-react';

const API_BASE = import.meta.env.VITE_CMS_API_URL || 'https://getfund-cms-backend.vercel.app/api';

interface PageSection {
  id: string;
  section_key: string;
  section_type: string;
  title: string;
  content: any;
}

export default function AboutEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pageContent, setPageContent] = useState<any>(null);
  const [sectionKey, setSectionKey] = useState<string>('');

  // Form fields
  const [boardImage, setBoardImage] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/pages/about`);
      if (!response.ok) throw new Error('Failed to fetch page');

      const data = await response.json();

      if (data && data.sections) {
        const pageContentSection = data.sections.find(
          (s: PageSection) => s.section_type === 'page_content'
        );

        if (pageContentSection) {
          setPageContent(pageContentSection.content);
          setSectionKey(pageContentSection.section_key);
          setBoardImage(pageContentSection.content?.boardImage || '');
          setBoardDescription(pageContentSection.content?.boardDescription || '');
        }
      }
    } catch (error) {
      console.error('Error fetching page:', error);
      setMessage({ type: 'error', text: 'Failed to load page content' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!sectionKey) {
      setMessage({ type: 'error', text: 'Page content section not found' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const updatedContent = {
        ...pageContent,
        boardImage,
        boardDescription
      };

      const response = await fetch(
        `${API_BASE}/pages/about/sections/${sectionKey}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: updatedContent })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      setMessage({ type: 'success', text: 'Board of Directors content saved successfully!' });

      // Update local state
      setPageContent(updatedContent);
    } catch (error: any) {
      console.error('Error saving:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#2a3f75] mx-auto mb-4" />
            <p className="text-gray-600">Loading page content...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/about')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#2a3f75] mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to About Page
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Edit About Page</h1>
            <p className="text-gray-600 mt-2">Update the Board of Directors content</p>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Board of Directors Editor */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 bg-[#2a3f75] text-white">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" />
                <div>
                  <h2 className="text-lg font-semibold">Board of Directors</h2>
                  <p className="text-white/80 text-sm">Edit the image and description shown in the Board of Directors modal</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Board Image */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4" />
                  Board Group Image URL
                </label>
                <input
                  type="text"
                  value={boardImage}
                  onChange={(e) => setBoardImage(e.target.value)}
                  placeholder="/images/about/getfund-7th-board-inauguration.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a3f75] focus:border-[#2a3f75] transition-colors"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the path to the board group photo (e.g., /images/about/board-photo.jpg)
                </p>

                {/* Image Preview */}
                {boardImage && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <div className="w-full max-w-md h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={boardImage}
                        alt="Board preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Board Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4" />
                  Board Description (HTML supported)
                </label>
                <textarea
                  value={boardDescription}
                  onChange={(e) => setBoardDescription(e.target.value)}
                  rows={15}
                  placeholder="Enter the board description content. HTML tags are supported..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a3f75] focus:border-[#2a3f75] font-mono text-sm transition-colors"
                />
                <p className="text-sm text-gray-500 mt-1">
                  You can use HTML tags like &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt; for formatting
                </p>
              </div>

              {/* HTML Preview */}
              {boardDescription && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Content Preview:</p>
                  <div
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: boardDescription }}
                  />
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-[#2a3f75] text-white rounded-lg hover:bg-[#1e2d54] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Tips for Editing</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Use image paths like <code className="bg-blue-100 px-1 rounded">/images/about/filename.jpg</code></li>
              <li>For HTML formatting, use tags like <code className="bg-blue-100 px-1 rounded">&lt;p&gt;</code>, <code className="bg-blue-100 px-1 rounded">&lt;h3&gt;</code>, <code className="bg-blue-100 px-1 rounded">&lt;ul&gt;</code>, <code className="bg-blue-100 px-1 rounded">&lt;li&gt;</code></li>
              <li>Changes will be visible on the website immediately after saving</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
