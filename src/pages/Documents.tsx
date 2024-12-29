import { useQuery } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { FileText, Trash, UploadCloud } from 'lucide-react';
import { documents } from '../lib/api';
import { formatDate } from '../lib/utils';
import DocumentStatus from '../components/DocumentStatus';
import { Button } from '../components/ui';

export default function Documents() {
  const { data: documentList, refetch } = useQuery({
    queryKey: ['documents'],
    queryFn: documents.list,
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      try {
        await Promise.all(files.map((file) => documents.upload(file)));
        toast.success('Documents uploaded successfully');
        refetch();
      } catch (error) {
        toast.error('Failed to upload documents');
      }
    },
  });

  const handleDelete = async (id: number) => {
    try {
      await documents.delete(id);
      toast.success('Document deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Documents
        </h1>
      </div>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-[var(--border)] rounded-lg p-8 text-center mb-8 cursor-pointer hover:border-[var(--primary)] transition-colors"
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Drag and drop files here, or click to select files
        </p>
      </div>

      <div className="bg-[var(--muted)] rounded-lg overflow-hidden shadow-lg">
        <table className="min-w-full divide-y divide-[var(--border)]">
          <thead className="bg-[var(--background)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {documentList?.map((doc) => (
              <tr key={doc.id} className="hover:bg-[var(--background)]">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-[var(--muted-foreground)] mr-2" />
                    <span className="text-sm text-[var(--foreground)]">
                      {doc.filename}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <DocumentStatus
                    status={doc.status}
                    errorMessage={doc.error_message}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted-foreground)]">
                  {formatDate(doc.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    onClick={() => handleDelete(doc.id)}
                    variant="secondary"
                    className="text-[var(--foreground)] hover:text-[var(--primary)]"
                  >
                    <Trash className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}