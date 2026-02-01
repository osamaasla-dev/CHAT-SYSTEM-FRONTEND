import { useState } from "react";

export const Test = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploading(true);
    setMessage(null);

    try {
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch("http://localhost:4000/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Upload response", result.data);

      setMessage("Image uploaded successfully!");
      setSelectedFile(null);
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "Something went wrong";
      setMessage(description);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setMessage(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-6">
      <form
        onSubmit={handleUpload}
        className="w-full max-w-md space-y-6 rounded-3xl border border-light/60 bg-light p-8 shadow-xl"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-primary-dark">Test</h1>
          <p className="text-sm text-muted-foreground">
            Upload an image to the media/upload endpoint.
          </p>
        </div>

        <label className="block cursor-pointer rounded-2xl border border-dashed border-primary/40 bg-secondary/40 p-6 text-center text-sm font-medium text-primary">
          <input
            type="file"
            name="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
          <span className="block">
            {selectedFile ? selectedFile.name : "Choose an image"}
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-2xl bg-primary py-3 text-base font-semibold text-light disabled:cursor-not-allowed disabled:bg-primary/70"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>

        {message && (
          <p className="text-center text-sm text-muted-foreground">{message}</p>
        )}
      </form>
    </div>
  );
};
