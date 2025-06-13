

import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function EnhancedReferenceGenerator() {
  const [sourceType, setSourceType] = useState('website');
  const [formData, setFormData] = useState({
    // Support multiple authors
    authors: [''],

    // Common fields
    title: '',
    year: '',
    style: 'APA 7',

    // Website fields
    url: '',
    accessDate: '',
    websiteName: '',

    // Book fields
    publisher: '',
    place: '',
    edition: '',
    pages: '',

    // Journal fields
    journalName: '',
    volume: '',
    issue: '',
    pageRange: '',
    doi: '',

    // Video fields
    platform: '',
    duration: '',
    uploader: '',
    urlVideo: ''
  });

  const [citation, setCitation] = useState('');
  const [reference, setReference] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const styles = [
    'AMA',
    'American Chemical Society',
    'APA 6',
    'APA 7',
    'Chicago Author-Date',
    'Chicago Full Note',
    'CSE',
    'Harvard',
    'Harvard (Australia style)',
    'IEEE',
    'MHRA',
    'MLA 8',
    'MLA 9',
    'OSCOLA',
    'Vancouver'
  ];

  const sourceTypes = [
    { id: 'website', name: 'Website', icon: '🌐' },
    { id: 'book', name: 'Book', icon: '📚' },
    { id: 'journal', name: 'Journal', icon: '📄' },
    { id: 'video', name: 'Video', icon: '🎥' }
  ];

  // Helper: format a single author name as "Last, F."
  const formatAuthor = (authorName) => {
    if (!authorName) return '';
    const parts = authorName.trim().split(' ');
    if (parts.length >= 2) {
      const lastName = parts[parts.length - 1];
      const firstName = parts.slice(0, -1).join(' ');
      return `${lastName}, ${firstName.charAt(0)}.`;
    }
    return authorName.trim();
  };

  // Handle change for non-author fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle change for a specific author index
  const handleAuthorChange = (index, value) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = value;
    setFormData((prev) => ({
      ...prev,
      authors: newAuthors
    }));
  };

  // Add a new empty author input only if the last one is non-empty
  const addAuthor = () => {
    const lastAuthor = formData.authors[formData.authors.length - 1].trim();
    if (lastAuthor === '') return; // Do not add if last is empty
    setFormData((prev) => ({
      ...prev,
      authors: [...prev.authors, '']
    }));
  };

  // Remove an author input at given index (only if more than one remains)
  const removeAuthor = (index) => {
    if (formData.authors.length <= 1) return;
    const newAuthors = formData.authors.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      authors: newAuthors
    }));
  };

  // Validate and generate citation + reference
  const generateCitation = () => {
    const { authors, title, year, style } = formData;

    // Trim all author entries and remove empties
    const trimmedAuthors = authors.map((a) => a.trim()).filter((a) => a);
    if (trimmedAuthors.length === 0 || !title.trim() || !year.trim()) {
      setCitation('Please fill in at least one Author, Title, and Year.');
      setReference('');
      return;
    }

    // Format each author
    const formattedAuthors = trimmedAuthors.map((a) => formatAuthor(a));
    const formattedAuthorText = formattedAuthors.join(', ');

    // For inline citation, use last name of first author
    const firstAuthorParts = trimmedAuthors[0].split(' ');
    const inlineAuthor =
      firstAuthorParts.length > 0
        ? firstAuthorParts[firstAuthorParts.length - 1]
        : trimmedAuthors[0];

    let referenceText = '';

    switch (sourceType) {
      case 'website':
        referenceText = generateWebsiteReference(formattedAuthorText, style);
        break;
      case 'book':
        referenceText = generateBookReference(formattedAuthorText, style);
        break;
      case 'journal':
        referenceText = generateJournalReference(formattedAuthorText, style);
        break;
      case 'video':
        referenceText = generateVideoReference(formattedAuthorText, style);
        break;
      default:
        referenceText = 'Unsupported source type';
    }

    setReference(referenceText);

    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const output = `Your Generated Reference

${title.trim()}
Published: ${currentDate}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et libero ante. Vivamus ut gravida dolor. Mauris aliquet elementum tincidunt. Nunc ultrices euismod mauris, a mattis augue rutrum sit amet.

Sed nisi quam, efficitur a hendrerit sit amet, volutpat vitae velit. Duis nisl nulla, lobortis eget nibh et, vulputate ultrices magna. Etiam id suscipit velit. Nam accumsan eros semper velit hendrerit, venenatis porta massa maximus (${inlineAuthor}, ${year.trim()}).

Suspendisse aliquet, urna ut gravida sollicitudin, sem augue molestie turpis, et euismod elit ante et neque. Duis semper at nisl vel tempus. Maecenas pellentesque sit amet odio et venenatis.

Reference:
${referenceText}`;

    setCitation(output);
  };

  // Website reference formats
  const generateWebsiteReference = (formattedAuthorText, style) => {
    const { title, year, url, accessDate, websiteName } = formData;
    const accessDateFormatted =
      accessDate ||
      new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

    switch (style) {
      case 'APA 7':
        return `${formattedAuthorText} (${year}). *${title.trim()}*. ${
          websiteName ? `*${websiteName.trim()}*. ` : ''
        }${url ? `${url.trim()}` : ''}`;
      case 'MLA 9':
        return `${formattedAuthorText} "${title.trim()}." ${
          websiteName ? `*${websiteName.trim()}*, ` : ''
        }${year.trim()}. Web. ${accessDateFormatted}.`;
      case 'Chicago Author-Date':
        return `${formattedAuthorText} ${year.trim()}. "${title.trim()}." ${
          websiteName ? `*${websiteName.trim()}*. ` : ''
        }Accessed ${accessDateFormatted}. ${url}.`;
      case 'Harvard':
        return `${formattedAuthorText} (${year.trim()}) '${title.trim()}', ${
          websiteName ? `*${websiteName.trim()}*, ` : ''
        }viewed ${accessDateFormatted}, ${url}.`;
      default:
        return `${formattedAuthorText} (${year}). *${title.trim()}*. ${
          websiteName ? `*${websiteName.trim()}*. ` : ''
        }${url ? `${url.trim()}` : ''}`;
    }
  };

  // Book reference formats
  const generateBookReference = (formattedAuthorText, style) => {
    const { title, year, publisher, place, edition, pages } = formData;

    switch (style) {
      case 'APA 7':
        return `${formattedAuthorText} (${year.trim()}). *${title.trim()}*${
          edition ? ` (${edition.trim()} ed.)` : ''
        }. ${publisher.trim()}${place ? `, ${place.trim()}` : ''}${
          pages ? `, pp. ${pages.trim()}` : ''
        }.`;
      case 'MLA 9':
        return `${formattedAuthorText} *${title.trim()}*${
          edition ? `, ${edition.trim()} ed.` : ''
        }. ${publisher.trim()}, ${year.trim()}${
          pages ? `, pp. ${pages.trim()}` : ''
        }.`;
      case 'Chicago Author-Date':
        return `${formattedAuthorText} ${year.trim()}. *${title.trim()}*${
          edition ? `, ${edition.trim()} ed.` : ''
        }. ${place || 'Place'}: ${publisher.trim()}${
          pages ? `, pp. ${pages.trim()}` : ''
        }.`;
      case 'Harvard':
        return `${formattedAuthorText} (${year.trim()}) *${title.trim()}*${
          edition ? `, ${edition.trim()} edn` : ''
        }. ${place || 'Place'}: ${publisher.trim()}${
          pages ? `, pp. ${pages.trim()}` : ''
        }.`;
      default:
        return `${formattedAuthorText} (${year.trim()}). *${title.trim()}*${
          edition ? ` (${edition.trim()} ed.)` : ''
        }. ${publisher.trim()}${place ? `, ${place.trim()}` : ''}${
          pages ? `, pp. ${pages.trim()}` : ''
        }.`;
    }
  };

  // Journal reference formats
  const generateJournalReference = (formattedAuthorText, style) => {
    const { title, year, journalName, volume, issue, pageRange, doi } = formData;

    switch (style) {
      case 'APA 7':
        return `${formattedAuthorText} (${year.trim()}). ${title.trim()}. *${journalName.trim()}*${
          volume ? `, ${volume.trim()}` : ''
        }${issue ? `(${issue.trim()})` : ''}${
          pageRange ? `, ${pageRange.trim()}` : ''
        }${doi ? `. https://doi.org/${doi.trim()}` : ''}.`;
      case 'MLA 9':
        return `${formattedAuthorText} "${title.trim()}." *${journalName.trim()}*${
          volume ? `, vol. ${volume.trim()}` : ''
        }${issue ? `, no. ${issue.trim()}` : ''}, ${year.trim()}${
          pageRange ? `, pp. ${pageRange.trim()}` : ''
        }.`;
      case 'Chicago Author-Date':
        return `${formattedAuthorText} ${year.trim()}. "${title.trim()}." *${journalName.trim()}* ${
          volume.trim()
        }${issue ? ` (${issue.trim()})` : ''}${
          pageRange ? `: ${pageRange.trim()}` : ''
        }.`;
      case 'Harvard':
        return `${formattedAuthorText} (${year.trim()}) '${title.trim()}', *${journalName.trim()}*${
          volume ? `, vol. ${volume.trim()}` : ''
        }${issue ? `, no. ${issue.trim()}` : ''}${
          pageRange ? `, pp. ${pageRange.trim()}` : ''
        }.`;
      default:
        return `${formattedAuthorText} (${year.trim()}). ${title.trim()}. *${journalName.trim()}*${
          volume ? `, ${volume.trim()}` : ''
        }${issue ? `(${issue.trim()})` : ''}${
          pageRange ? `, ${pageRange.trim()}` : ''
        }${doi ? `. https://doi.org/${doi.trim()}` : ''}.`;
    }
  };

  // Video reference formats
  const generateVideoReference = (formattedAuthorText, style) => {
    const { title, year, platform, duration, uploader, urlVideo } = formData;

    switch (style) {
      case 'APA 7':
        return `${formattedAuthorText} (${year.trim()}). *${title.trim()}* [Video]. ${platform.trim()}. ${urlVideo.trim()}`;
      case 'MLA 9':
        return `${formattedAuthorText} "${title.trim()}." ${platform.trim()}, ${
          uploader.trim() || formattedAuthorText
        }, ${year.trim()}. Web. ${new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}.`;
      case 'Chicago Author-Date':
        return `${formattedAuthorText} ${year.trim()}. "${title.trim()}." ${platform.trim()} video${
          duration ? `, ${duration.trim()}` : ''
        }. ${urlVideo.trim()}.`;
      case 'Harvard':
        return `${formattedAuthorText} (${year.trim()}) *${title.trim()}* [video], ${
          platform.trim()
        }, viewed ${new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}, ${urlVideo.trim()}.`;
      default:
        return `${formattedAuthorText} (${year.trim()}). *${title.trim()}* [Video]. ${platform.trim()}. ${urlVideo.trim()}`;
    }
  };

  // Copy reference (with <em> around italicized parts)
  const copyToClipboard = async () => {
    try {
      // Split on asterisks and wrap odd-index parts in <em>
      const htmlParts = reference.split('*').map((part, idx) =>
        idx % 2 === 1 ? `<em>${part}</em>` : part
      );
      const htmlToCopy = htmlParts.join('');

      // Plain text version (remove asterisks)
      const plainTextToCopy = reference.replace(/\*/g, '');

      const blobHtml = new Blob([htmlToCopy], { type: 'text/html' });
      const blobText = new Blob([plainTextToCopy], { type: 'text/plain' });
      const clipboardItem = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText
      });
      await navigator.clipboard.write([clipboardItem]);

      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy formatted reference: ', err);
      // Fallback: copy plain text only
      try {
        await navigator.clipboard.writeText(reference.replace(/\*/g, ''));
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
    }
  };

  // Change source type
  const handleSourceTypeChange = (type) => {
    setSourceType(type);
    setFormData((prev) => ({
      authors: [''],
      title: '',
      year: '',
      style: prev.style,
      url: '',
      accessDate: '',
      websiteName: '',
      publisher: '',
      place: '',
      edition: '',
      pages: '',
      journalName: '',
      volume: '',
      issue: '',
      pageRange: '',
      doi: '',
      platform: '',
      duration: '',
      uploader: '',
      urlVideo: ''
    }));
    setCitation('');
    setReference('');
    setCopySuccess(false);
  };

  // Clear entire form
  const clearForm = () => {
    setFormData({
      authors: [''],
      title: '',
      year: '',
      style: 'APA 7',
      url: '',
      accessDate: '',
      websiteName: '',
      publisher: '',
      place: '',
      edition: '',
      pages: '',
      journalName: '',
      volume: '',
      issue: '',
      pageRange: '',
      doi: '',
      platform: '',
      duration: '',
      uploader: '',
      urlVideo: ''
    });
    setCitation('');
    setReference('');
    setCopySuccess(false);
  };

  // Render fields specific to each source type
  const renderSourceSpecificFields = () => {
    switch (sourceType) {
      case 'website':
        return (
          <>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="url"
                placeholder="https://example.com"
                value={formData.url}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website Name
              </label>
              <input
                type="text"
                name="websiteName"
                placeholder="e.g., Wikipedia, BBC News"
                value={formData.websiteName}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Access Date
              </label>
              <input
                type="text"
                name="accessDate"
                placeholder="3 June 2025"
                value={formData.accessDate}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
          </>
        );

      case 'book':
        return (
          <>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Publisher
              </label>
              <input
                type="text"
                name="publisher"
                placeholder="e.g., Oxford University Press"
                value={formData.publisher}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Place of Publication
                </label>
                <input
                  type="text"
                  name="place"
                  placeholder="e.g., London"
                  value={formData.place}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Edition
                </label>
                <input
                  type="text"
                  name="edition"
                  placeholder="3rd"
                  value={formData.edition}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Page Numbers
              </label>
              <input
                type="text"
                name="pages"
                placeholder="123-145 or 234"
                value={formData.pages}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
          </>
        );

      case 'journal':
        return (
          <>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Journal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="journalName"
                placeholder="e.g., Nature, Science"
                value={formData.journalName}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Volume
                </label>
                <input
                  type="text"
                  name="volume"
                  placeholder="15"
                  value={formData.volume}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue
                </label>
                <input
                  type="text"
                  name="issue"
                  placeholder="3"
                  value={formData.issue}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Page Range
                </label>
                <input
                  type="text"
                  name="pageRange"
                  placeholder="123-145"
                  value={formData.pageRange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                DOI
              </label>
              <input
                type="text"
                name="doi"
                placeholder="10.1000/sample.doi"
                value={formData.doi}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
          </>
        );

      case 'video':
        return (
          <>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="urlVideo"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.urlVideo}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Platform
                </label>
                <input
                  type="text"
                  name="platform"
                  placeholder="YouTube, Vimeo, etc."
                  value={formData.platform}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="5:30"
                  value={formData.duration}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Uploader/Channel
              </label>
              <input
                type="text"
                name="uploader"
                placeholder="Channel or uploader name"
                value={formData.uploader}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <Head>
        <title>Reference Generator</title>
        <meta name="reference_generator" content={'Reference Generator'} />
      </Head>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Academic Reference Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate properly formatted academic citations with multiple-author support
          </p>
        </div>

        {/* Source Type Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {sourceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSourceTypeChange(type.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  sourceType === type.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="text-lg">{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {sourceTypes.find((t) => t.id === sourceType)?.name} Details
              </h2>
              <button
                onClick={clearForm}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Multiple Authors */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author{formData.authors.length > 1 ? 's' : ''}{' '}
                  <span className="text-red-500">*</span>
                </label>
                {formData.authors.map((authorValue, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      name={`author-${idx}`}
                      placeholder="e.g., John Smith"
                      value={authorValue}
                      onChange={(e) => handleAuthorChange(idx, e.target.value)}
                      className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    />
                    {formData.authors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAuthor(idx)}
                        className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAuthor}
                  disabled={
                    formData.authors[formData.authors.length - 1].trim() === ''
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    formData.authors[formData.authors.length - 1].trim() === ''
                      ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  + Add Author
                </button>
              </div>

              {/* Title */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Introduction to Psychology"
                  value={formData.title}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  onChange={handleChange}
                />
              </div>

              {/* Year & Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="year"
                    placeholder="2024"
                    value={formData.year}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    onChange={handleChange}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Citation Style
                  </label>
                  <select
                    name="style"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white"
                    onChange={handleChange}
                    value={formData.style}
                  >
                    {styles.map((styleOption) => (
                      <option key={styleOption} value={styleOption}>
                        {styleOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Source-specific Fields */}
              {renderSourceSpecificFields()}

              {/* Generate Button */}
              <button
                onClick={generateCitation}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Generate Citation ✨
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Generated Citation</h2>
              {citation && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      copySuccess
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                    }`}
                  >
                    {copySuccess ? '✅ Copied!' : '📋 Copy Reference'}
                  </button>
                </div>
              )}
            </div>

            {citation ? (
              <div className="bg-gray-50/50 border-2 border-gray-100 rounded-xl p-6 min-h-96 overflow-auto">
                <div
                  id="citation-preview"
                  className="whitespace-pre-line text-sm leading-relaxed text-gray-800"
                >
                  {citation.split('*').map((part, index) =>
                    index % 2 === 1 ? (
                      <em key={index} className="text-gray-900">
                        {part}
                      </em>
                    ) : (
                      part
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 rounded-xl p-8 min-h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {sourceTypes.find((t) => t.id === sourceType)?.icon || '📝'}
                  </div>
                  <p className="text-gray-500 text-lg mb-2">
                    Ready to generate your {sourceType} citation?
                  </p>
                  <p className="text-gray-400 text-sm">
                    Fill in the required fields and click "Generate Citation"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 md:p-8">
          <h3 className="font-bold text-blue-900 mb-4 text-xl flex items-center">
            <span className="mr-2">💡</span>
            Tips for {sourceTypes.find((t) => t.id === sourceType)?.name} Citations
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {sourceType === 'website' && (
              <>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Include a valid URL and access date for web sources
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Always include the website name when available
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Verify URLs are still accessible
                  </li>
                </ul>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Check if the author is an organization or individual
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Use the most recent update date as the publication year
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Format multiple authors in the order they appear on the page
                  </li>
                </ul>
              </>
            )}

            {sourceType === 'book' && (
              <>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Include edition numbers for books with multiple editions
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Use page ranges (e.g., "123–145") for specific sections
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Check the copyright page for publication details
                  </li>
                </ul>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Place of publication is usually the publisher's main office
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    For multiple authors, list them in the order they appear
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Use the original publication year, not reprint dates
                  </li>
                </ul>
              </>
            )}

            {sourceType === 'journal' && (
              <>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Include DOI when available for better accessibility
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Volume and issue numbers help locate the article
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Page ranges show the complete article span
                  </li>
                </ul>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Article titles are not italicized, journal names are
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Check if the journal uses continuous or issue pagination
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Peer-reviewed articles are generally more credible
                  </li>
                </ul>
              </>
            )}

            {sourceType === 'video' && (
              <>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Include duration for longer videos when relevant
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Distinguish between creator and uploader if different
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Use valid video URL (YouTube, Vimeo, etc.)
                  </li>
                </ul>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Check if the video is part of a series or playlist
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Note if the video has been updated or edited
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Consider the credibility of the source and platform
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    <Footer />
    </div>
  );
}
