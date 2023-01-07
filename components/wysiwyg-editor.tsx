import * as React from "react";
import ReactQuill, { Quill, ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RangeStatic } from "quill";
import api from "../service/api";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { addClassName } from "../utils/utils";

const fontSizes = ["14px", "16px", "20px", "24px", "32px", "42px", "54px", "68px", "84px", "98px"];
const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizes;
Quill.register(Size, true);

const ImageResize = require("@looop/quill-image-resize-module-react");
Quill.register("modules/imageResize", ImageResize.default);

type Props = ReactQuillProps & {
  html: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

const WysiwygEditor = ({ html, setHtml, className, ...props }: Props) => {
  const quillRef = React.useRef<ReactQuill>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = async () => {
      const files = input.files;
      const formData = new FormData();

      if (!files) {
        return;
      }

      formData.append("imageFile", files[0]);
      let res: AxiosResponse<any, any>;
      try {
        res = await api.post("/api/image/upload", formData);
      } catch (err) {
        toast.error("이미지를 업로드하는데 실패하였습니다.");
        return;
      }

      if (quillRef.current) {
        const index = (quillRef.current.getEditor().getSelection() as RangeStatic).index;

        const quillEditor = quillRef.current.getEditor();
        quillEditor.setSelection(index, 1);

        quillEditor.clipboard.dangerouslyPasteHTML(index, `<img src=${res.data} alt=${"alt text"} />`);
      }
    };
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [
            {
              size: fontSizes,
            },
          ],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image", "video"],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],

        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        modules: ["Resize"],
      },
    }),
    []
  );

  const formats = [
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "align",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      formats={formats}
      value={html}
      onChange={(content, delta, source, editor) => setHtml(editor.getHTML())}
      className={`[&_.ql-toolbar.ql-snow]:rounded-t-lg [&_.ql-container.ql-snow]:rounded-b-lg [&_.ql-editor]:h-[400px] 
      xl:[&_.ql-editor]:h-[500px] [&_.ql-container]:text-[14px]
      [&_.ql-snow_.ql-picker-label]:dark:text-gray-200 [&_.ql-snow_.ql-stroke]:dark:stroke-gray-200
      [&_.ql-snow_.ql-fill]:dark:fill-gray-200 [&_.ql-snow_.ql-editor_img]:inline 
      [&_.ql-snow_.ql-picker.ql-size_.ql-picker-item]:before:content-[attr(data-value)]
      [&_.ql-snow_.ql-picker.ql-size_.ql-picker-label]:before:content-[attr(data-value)]${addClassName(className)}`}
      {...props}
    />
  );
};

export default WysiwygEditor;
