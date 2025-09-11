import { useState } from 'react'
import { FlaskConical, FileText } from 'lucide-react'
import Modal from './Modal'
import PocDemo from '../pages/PocDemo'
import ResearchNotes from '../pages/ResearchNotes'

export default function FloatingActions() {
  const [openPoc, setOpenPoc] = useState(false)
  const [openNotes, setOpenNotes] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setOpenPoc(true)}
          className="shadow-xl rounded-full px-5 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white flex items-center gap-2 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary-400/60"
          aria-label="Open PoC"
        >
          <FlaskConical size={18} className="animate-[pulse_2s_ease-in-out_infinite]" />
          <span className="hidden md:inline font-medium">Open PoC</span>
        </button>
        <button
          onClick={() => setOpenNotes(true)}
          className="shadow-xl rounded-full px-5 py-3 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-700 text-white flex items-center gap-2 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-400/50"
          aria-label="Open Research Notes"
        >
          <FileText size={18} className="animate-[pulse_2s_ease-in-out_infinite]" />
          <span className="hidden md:inline font-medium">Research Notes</span>
        </button>
      </div>

      <Modal open={openPoc} onClose={() => setOpenPoc(false)} title="PoC Implementation" widthClassName="w-[98vw] max-w-7xl">
        <PocDemo embedded />
      </Modal>

      <Modal open={openNotes} onClose={() => setOpenNotes(false)} title="Research Notes" widthClassName="w-[98vw] max-w-5xl">
        <ResearchNotes embedded />
      </Modal>
    </>
  )
}


