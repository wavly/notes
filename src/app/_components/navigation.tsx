"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Button } from "@radix-ui/themes";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { getUserId } from "@/app/_lib/getUser";
import { createNote, deleteNote, getNotesByUser } from "@/lib/db";

type Note = {
	id: number;
	title: string;
};

export default async function Navigation() {
	const router = useRouter();
	const [userId, setUserId] = useState<string>("");
	const [notes, setNotes] = useState<Note[] | null>([]);

	setUserId(await getUserId());

	const loadNotes = async () => {
		if (userId !== "") {
			try {
				const fetchedNotes = await getNotesByUser(userId);
				const convertedNotes = convertToNotes(fetchedNotes);
				setNotes(convertedNotes);
			} catch (error) {
				console.error("Error fetching notes:", error);
			}
		}
	};

	useEffect(() => {
		loadNotes();
	}, []);

	function convertToNotes(notesArray: any[]): Note[] {
		return notesArray
			.filter(
				(note) => typeof note.id === "string" && typeof note.title === "string"
			)
			.map((note) => ({
				id: note.id,
				title: note.title,
			}));
	}

	const handleDeleteNote = async (note: Note) => {
		await deleteNote({ id: note.id.toString(), userId: userId });
		loadNotes();
		router.push(`/notes`);
	};

	const handleCreateNote = async () => {
		const newNote = await createNote({ userId: userId });
		loadNotes();
		if (newNote) {
			newNote.id && openNote(parseInt(newNote.id));
		}
	};

	const openNote = (noteId: number) => {
		router.push(`/notes/${noteId}`);
	};

	return (
		<>
			<aside className="min-h-full w-60 items-center flex flex-col p-4 gap-4 overflow-y-auto z-[99999]">
				<div>
					<Button onClick={handleCreateNote} className="flex flex-row gap-2">
						<Plus size={16} />
						Create Document
					</Button>
					<ul className="flex flex-col gap-2 p-2">
						{notes &&
							notes.map((note) => (
								<li className="flex flex-row items-center gap-2" key={note.id}>
									{note.title}
									<Button
										variant="outline"
										className="h-6 px-2 rounded-md"
										onClick={() => openNote(note.id)}
									>
										<Pencil size={16} />
									</Button>
									<Button
										variant="outline"
										className="h-6 px-2 rounded-md"
										onClick={() => handleDeleteNote(note)}
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
