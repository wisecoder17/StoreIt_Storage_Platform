"use client";

import { useSkeletonLoader } from "@/components/SkeletonLoader";
import Card from "@/components/Card";
import { Models } from "node-appwrite";
import CardSkeleton from "./CardSkeleton";
import { FileType } from "@/lib/utils";

export default function FileList({
  types,
  searchText,
  sort,
}: {
  types: FileType[];
  searchText: string;
  sort: string;
}) {
  const fetchFiles = async () => {
    const { getFiles } = await import("@/lib/actions/file.actions");
    return getFiles({ types, searchText, sort });
  };

  const { isLoading, data: files } = useSkeletonLoader(fetchFiles, [
    types,
    searchText,
    sort,  
  ], 500);

  
  if (isLoading) {
    // Show 6 skeleton cards as a placeholder
    return (
      <section className="file-list">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </section>
    );
  }

  if (!files || files.total === 0) {
    return <p className="empty-list">No files uploaded</p>;
  }

  return (
    <section className="file-list">
      {files.documents.map((file: Models.Document) => (
        <Card key={file.$id} file={file} />
      ))}
      <CardSkeleton/>
    </section>
  );
}
