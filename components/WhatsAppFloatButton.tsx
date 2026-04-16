"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

const WA_LINK =
  "https://wa.me/5543988585127?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto"

export default function WhatsAppFloatButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="px-3 py-2 rounded-xl text-[13px] font-medium text-white whitespace-nowrap pointer-events-none"
            style={{
              background: "rgba(8,8,14,0.92)",
              border: "1px solid rgba(37,211,102,0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            Falar no WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Falar no WhatsApp"
        className="relative"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/25" />
        <span
          className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/15"
          style={{ animationDelay: "0.5s", animationDuration: "1.8s" }}
        />

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)]"
        >
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
        </motion.div>
      </a>
    </div>
  )
}
