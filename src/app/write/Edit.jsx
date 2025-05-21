"use client";

import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import "./styles.css";
import { useCallback } from "react";
import Youtube from "@tiptap/extension-youtube";
import { BubbleMenu, FloatingMenu } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addYoutubeVideo = () => {
    const url = window.prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(640, 10)) || 640,
        height: Math.max(180, parseInt(480, 10)) || 480,
      });
    }
  };

  return (
    <>
      <div className="w-full pb-20 flex flex-col gap-5">
        <Input placeholder="Title" className="w-full" />
        <Textarea placeholder="Description" />
      </div>
      {editor && (
        <BubbleMenu editor={editor}>
          <div className="bubble-menu">
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              Bold
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              Strike
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "is-active" : ""}
            >
              Code
            </Button>
          </div>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu editor={editor}>
          <div className="floating-menu">
            <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </Button>
            {/* <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </Button> */}
            <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              H3
            </Button>
            {/* <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={
                editor.isActive("heading", { level: 4 }) ? "is-active" : ""
              }
            >
              H4
            </Button>
            <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              className={
                editor.isActive("heading", { level: 5 }) ? "is-active" : ""
              }
            >
              H5
            </Button>
            <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
              className={
                editor.isActive("heading", { level: 6 }) ? "is-active" : ""
              }
            >
              H6
            </Button> */}
            <Button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              Bullet list
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              Ordered list
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "is-active" : ""}
            >
              Code block
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              Blockquote
            </Button>
            <Button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              Horizontal rule
            </Button>
          </div>
        </FloatingMenu>
      )}
      <div className="control-group  ">
        <div className="Button-group flex flex-wrap gap-3 ">
          {/* <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </Button>
        <Button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </Button> */}
          {/* <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </Button> */}

          {/* <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
            Hard break
          </Button> */}
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            Undo
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            Redo
          </Button>
          <Button onClick={addImage}>Add Photo</Button>
          <Button onClick={addYoutubeVideo}>Add Youtube Video</Button>
        </div>
      </div>
    </>
  );
};

const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
  Image,
  ImageResize,
  Youtube,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    codeBlock: {
      HTMLAttributes: {
        class: "language-jsx",
      },
    },
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export default () => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      immediatelyRender={false}
      content={content}
      editorProps={{
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg focus:outline-none w-full dark:prose-invert py-20 absolute left-[50%] translate-x-[-50%] min-h-screen",
        },
      }}
    ></EditorProvider>
  );
};
