"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Notes } from "@/app/_lib/db";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function Navigation() {
  const router = useRouter();
  const NoteDb = new Notes("note");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    setNotes(NoteDb.getNotes());
  };

  const handleDeleteNote = (noteId: number) => {
    NoteDb.deleteNote(noteId);
    
    loadNotes();
    router.push(`/note`)
  };

  const handleCreateNote = () => {
    const newNote = { id: Date.now(), title: "Untitled", content: "" };
    NoteDb.createNote(newNote);
    
    loadNotes();
    openNote(newNote.id);
  };

  const openNote = (noteId: number) => {
    router.push(`/note/${noteId}`);
  }

  return (
    <>
      <aside className="min-h-full w-60 bg-secondary items-center flex flex-col p-4 gap-4 overflow-y-auto z-[99999]">
        <div>
          <Button onClick={handleCreateNote} className="flex flex-row gap-2">
            <Plus size={16} />
            Create Document
          </Button>
          <ul className="flex flex-col gap-2 p-2">
            {notes.map((note) => (
              <li className="flex flex-row items-center gap-2" key={note.id}>
                {note.title}
                <Button variant="outline" className="h-6 px-2 rounded-md" onClick={() => openNote(note.id)}>
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="outline"
                  className="h-6 px-2 rounded-md"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
