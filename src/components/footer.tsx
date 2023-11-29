import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="flex justify-between items-center w-full px-4 py-1 absolute bottom-0 border translate-y-full">
        <div>
          <p className="text-sm font-medium">
            &copy; 2023{" "}
            <a href="#" className="hover:underline">
              Wavly Notes
            </a>
          </p>
        </div>
        <div>Mode Toggle</div>
      </footer>
    </>
  );
}
