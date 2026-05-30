"use client";

import { motion, type Variants } from "framer-motion";
import { Circle, ArrowRight, MessageCircle, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const WA_LINK =
    "https://wa.me/5543988720576?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-gs-blue/[0.12]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-black/[0.04]",
                        "shadow-[0_8px_32px_0_rgba(59,130,246,0.10)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.65),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGarbato({
    badge = "Software House Premium",
    title1 = "Tecnologia que move",
    title2 = "o seu negócio",
    description = "Transformamos processos dispersos em plataformas profissionais, modernas e escaláveis, desenhadas para a operação real do seu negócio.",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
}) {
    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gs-bg pt-20"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-gs-blue/[0.06] via-transparent to-gs-cyan/[0.06] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-gs-blue/[0.18]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-gs-cyan/[0.16]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-gs-violet/[0.16]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-gs-amber/[0.16]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-gs-green/[0.14]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gs-surface border border-border mb-8 md:mb-12"
                    >
                        <Cpu className="h-3.5 w-3.5 text-gs-blue" />
                        <span className="text-sm text-gs-secondary tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-gs-text to-gs-text/70">
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-gs-blue via-gs-cyan to-gs-violet"
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-gs-secondary mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            {description}
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap items-center justify-center gap-3"
                    >
                        <button
                            onClick={() =>
                                document
                                    .querySelector("#contato")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="flex items-center gap-2 px-6 py-3 bg-gs-blue hover:bg-gs-blue-dim text-white font-semibold rounded-xl transition-all shadow-[0_8px_24px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 cursor-pointer"
                        >
                            Solicitar Projeto
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 border border-border hover:border-gs-text/20 text-gs-text font-medium rounded-xl transition-all hover:bg-black/[0.03] hover:-translate-y-0.5"
                        >
                            <MessageCircle className="w-4 h-4 text-[#25D366]" />
                            Falar pelo WhatsApp
                        </a>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-gs-surface to-transparent" />
        </section>
    );
}

export { HeroGarbato };
