import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import { Bold, Italic, List, ListOrdered, Code, Heading2, Heading3, Quote, Link2, Image as ImgIcon, Undo, Redo } from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export function RichEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-electric-blue underline" } }),
      Image,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] p-5 focus:outline-none prose-headings:font-display prose-headings:text-white prose-p:text-silver prose-strong:text-white prose-code:text-cyan-glow prose-a:text-electric-blue prose-pre:bg-silicon-950",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  const Btn = ({ active, onClick, children, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-white/10 transition ${active ? "bg-electric-blue/20 text-electric-blue" : "text-silver"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-white/10 rounded-xl bg-silicon-900 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-silicon-950/50">
        <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="size-4" /></Btn>
        <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="size-4" /></Btn>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="size-4" /></Btn>
        <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="size-4" /></Btn>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="size-4" /></Btn>
        <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="size-4" /></Btn>
        <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="size-4" /></Btn>
        <Btn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="size-4" /></Btn>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <Btn title="Link" onClick={() => {
          const url = window.prompt("URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}><Link2 className="size-4" /></Btn>
        <Btn title="Image" onClick={() => {
          const url = window.prompt("Image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}><ImgIcon className="size-4" /></Btn>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo className="size-4" /></Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo className="size-4" /></Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
