export const getMimeType = (path: string): string => {
  const ext = path.split(".").pop();
  switch (ext) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    case "json":
      return "application/json";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "svg":
      return "image/svg+xml";
    case "pdf":
      return "application/pdf";
    case "zip":
      return "application/zip";
    case "tar":
      return "application/x-tar";
    case "gz":
      return "application/gzip";
    default:
      return "text/plain";
  }
};
