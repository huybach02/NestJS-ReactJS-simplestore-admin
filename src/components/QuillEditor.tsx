/* eslint-disable @typescript-eslint/no-unused-expressions */
import {useCallback, useRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function QuillEditor({value, onChange}: QuillEditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);

  const handleChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    const url = data.url;

    return url;
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const url = await uploadToCloudinary(file);
          console.log(url);
          const quill = reactQuillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", url);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  }, []);

  return (
    <ReactQuill
      theme="snow"
      ref={reactQuillRef}
      style={{width: "100%"}}
      placeholder="Type something..."
      modules={{
        imageResize: {
          parchment: ReactQuill.Quill.import("parchment"),
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
        toolbar: {
          container: [
            [{header: "1"}, {header: "2"}, {font: []}],
            [{size: []}],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              {list: "ordered"},
              {list: "bullet"},
              {indent: "-1"},
              {indent: "+1"},
            ],
            ["link", "image", "video"],
            ["code-block"],
            ["clean"],
          ],
          handlers: {
            image: imageHandler, // <-
          },
        },
        clipboard: {
          matchVisual: false,
        },
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "code-block",
        "align",
        "direction",
      ]}
      value={value || ""}
      onChange={handleChange}
    />
  );
}
