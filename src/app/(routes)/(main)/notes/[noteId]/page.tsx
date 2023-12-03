"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState, ChangeEvent } from "react";

import Editor from "@/app/_components/editor";
import { getUserId } from "@/app/_lib/getUser";
import { getNote, updateNote } from "@/lib/db";

interface NoteIdPageProps {
	params: {
		noteId: string;
	};
}

type Note = {
	id: string;
	userId: string;
	title: string;
	content: string;
};

export default async function NoteIdPage({ params }: NoteIdPageProps) {
	const router = useRouter();
	const [title, setTitle] = useState<string>("");
	const [userId, setUserId] = useState<string>("");
	const [note, setNote] = useState<Note | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	setUserId(await getUserId());

	useEffect(() => {
		async function fetchNote() {
			try {
				const fetchedNote = await getNote({
					id: params.noteId,
					userId: userId,
				});
				const convertedNote = fetchedNote && convertToNote(fetchedNote);

				if (convertedNote) {
					setNote(convertedNote);
					setTitle(convertedNote.title);
				} else {
					router.push("/notes");
				}
			} catch (error) {
				console.error("Error fetching note:", error);
			}

			setIsLoading(false);
		}

		fetchNote();
	}, [params.noteId, router]);

	const convertToNote = (noteArray: any[]): Note | null => {
		const noteObject = noteArray[0];

		if (
			noteObject &&
			typeof noteObject.id === "string" &&
			typeof noteObject.userId === "string" &&
			typeof noteObject.title === "string" &&
			typeof noteObject.content === "string"
		) {
			return {
				id: noteObject.id,
				userId: noteObject.userId,
				title: noteObject.title,
				content: noteObject.content,
			};
		}

		return null;
	};

	const handleContentChange = async (content: string) => {
		if (note) {
			const newNote = { ...note, content };
			setNote(newNote);

			await updateNote({
				id: note.id,
				userId: note.userId,
				content,
			});
		}
	};

	const handleTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		setTitle(newTitle);

		if (note) {
			const newNote = { ...note, title: newTitle };
			setNote(newNote);

			await updateNote({
				id: note.id,
				userId: note.userId,
				title: newTitle,
			});

			// TODO: Handle title update in the navigation component here
		}
	};

	return (
		<>
			<div className="p-5 flex text-center justify-center">
				<input
					className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full"
					type="text"
					value={title}
					onChange={handleTitleChange}
					placeholder="Enter note title..."
				/>
			</div>
			<div className="pt-20">
				<div className="md:max-w-3xl lg:max-w-4xl mx-auto">
					{!isLoading && note ? (
						<Editor
							onChange={handleContentChange}
							initialContent={note.content}
						/>
					) : (
						<div className="flex text-center items-center justify-center">
							Loading...
						</div>
					)}
				</div>
			</div>
		</>
	);
}
