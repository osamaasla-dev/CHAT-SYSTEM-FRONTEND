import { useEffect, useMemo, useRef, useState } from "react";
import { Trash2, Upload } from "lucide-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components";

type AvatarChangeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (file: File) => void;
  isUploading: boolean;
};

export const AvatarChangeDialog = ({
  open,
  onOpenChange,
  onUpload,
  isUploading,
}: AvatarChangeDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) {
      return null;
    }

    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!open) {
      resetSelection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const resetSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    onUpload(selectedFile);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border border-primary/10 bg-light p-6 text-primary shadow-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-semibold text-primary">
            Change avatar
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Upload a new profile photo (one image at a time).
          </DialogDescription>
        </DialogHeader>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {previewUrl ? (
          <div className="group relative mt-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary/5">
            <img
              src={previewUrl}
              alt="Selected avatar preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={resetSelection}
              className="cursor-pointer absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-sm font-medium text-light opacity-0 transition group-hover:opacity-100"
            >
              <Trash2 className="size-4" /> Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 px-6 py-10 text-center text-primary transition hover:border-primary hover:bg-primary/10"
          >
            <Upload className="size-6" />
            <div>
              <p className="font-medium">Select image</p>
            </div>
          </button>
        )}

        {selectedFile ? (
          <p className="mt-3 rounded-full bg-primary/10 px-3 py-1 text-center text-xs text-primary">
            {selectedFile.name}
          </p>
        ) : null}

        <DialogFooter className="mt-6 flex-row justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="submit"
            size="sm"
            className="w-auto px-4 font-normal"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload photo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
