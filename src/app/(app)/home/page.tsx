"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import VideoCard from "../../../../components/VideoCard";
import { Video } from "../../../../types";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error("Invalid response or unexpected response format");
      }
    } catch (error:any) {
      console.log(error);
      setError(`Failed to fetch videos: ${error.message}`);

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {videos.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No Videos available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:gridcols-3 gap-6">
          {
            videos.map((video) => (
              <VideoCard
                key={String(video.id)}
                video={video}
                onDownload={handleDownload}
              />
            ))
          }
        </div>
      )}
    </div>
  );
}


