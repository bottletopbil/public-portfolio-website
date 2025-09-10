'use client';

import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

type MediaType = 'image' | 'video';

interface MediaItem {
	src: string;
	alt?: string;
	type?: MediaType; // if omitted, inferred from extension
	poster?: string; // optional poster for videos
}

interface ZoomParallaxProps {
    /** Array of media (image or video); max 7 items */
    images: MediaItem[];
    /** Optional: where to start in the scroll progress [0..1] */
    initialProgress?: number;
    /** If true, treat initialProgress as the top of the page and hide pre-zoom layers */
    anchorAtInitial?: boolean;
}

export function ZoomParallax({ images, initialProgress, anchorAtInitial }: ZoomParallaxProps) {
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

	// Freeze the zoom near the end to keep the final frame still
	const FREEZE_AT = 0.9; // progress point to stop scaling
	const clamped = useTransform(scrollYProgress, (v) => Math.min(v, FREEZE_AT));

	const scale4 = useTransform(clamped, [0, FREEZE_AT], [1, 4]);
	const scale5 = useTransform(clamped, [0, FREEZE_AT], [1, 5]);
	const scale6 = useTransform(clamped, [0, FREEZE_AT], [1, 6]);
	const scale8 = useTransform(clamped, [0, FREEZE_AT], [1, 8]);
	const scale9 = useTransform(clamped, [0, FREEZE_AT], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	// Playback control: play the (first) video only once when it fills the screen
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const hasPlayedRef = useRef(false);
    const [overlayVisible, setOverlayVisible] = useState(false);

	// Determine the primary video index (first video in the list)
    const primaryVideoIndex = useMemo(() => {
        return images.findIndex((item) =>
            item.type === 'video' || /\.(mp4|webm|ogg)(\?|#|$)/i.test(item.src)
        );
    }, [images]);

    // When scroll reaches the freeze point (scale max), trigger video play once
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        // Control overlay visibility based on scroll position
        setOverlayVisible(v >= FREEZE_AT);

		if (hasPlayedRef.current) return;
		if (primaryVideoIndex === -1) return;
		// The first scale (for the first item) reaches full-screen at FREEZE_AT
        if (v >= FREEZE_AT) {
            const vid = videoRefs.current[primaryVideoIndex];
            if (vid && vid.paused) {
                vid.play().catch(() => {});
                hasPlayedRef.current = true;
            }
        }
    });

    // Option A: anchor the section so the chosen progress is at page top.
    const [anchorOffset, setAnchorOffset] = useState<number>(0);
    const initialP = useMemo(() => Math.max(0, Math.min(initialProgress ?? 0, 0.99)), [initialProgress]);
    const [ready, setReady] = useState(!anchorAtInitial);
    useLayoutEffect(() => {
        if (!anchorAtInitial) return;
        if (typeof window === 'undefined') return;
        const p = initialP;
        if (!p) { setReady(true); return; }
        const el = container.current;
        if (!el) return;
        const height = el.getBoundingClientRect().height;
        const travel = Math.max(0, height - window.innerHeight);
        // Negative margin to pull the section up so progress=p at scrollTop=0
        const offsetPx = -p * travel;
        setAnchorOffset(offsetPx);
        // Ensure motion value matches our anchored starting point and we are at scrollTop=0
        requestAnimationFrame(() => {
            scrollYProgress.set(p);
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            setReady(true);
        });
    }, [anchorAtInitial, initialP]);

    // Option B: legacy behavior — jump scroll to the progress point if not anchoring
    useEffect(() => {
        if (anchorAtInitial) return;
        if (typeof window === 'undefined') return;
        const p = initialP;
        if (!p) return;
        const el = container.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const height = rect.height;
        const travel = Math.max(0, height - window.innerHeight);
        const y = top + p * travel;
        requestAnimationFrame(() => {
            window.scrollTo({ top: y, left: 0, behavior: 'auto' });
        });
    }, [anchorAtInitial, initialP]);

    // Precompute numeric scales for the initial anchored frame to avoid a flash.
    const initialClamped = useMemo(() => Math.min(initialP, FREEZE_AT), [initialP]);
    const numericScales = useMemo(() => {
        const interp = (max: number) => 1 + (max - 1) * (initialClamped / FREEZE_AT);
        return [interp(4), interp(5), interp(6), interp(5), interp(6), interp(8), interp(9)];
    }, [initialClamped]);

    const onlyPrimary = !!anchorAtInitial; // hide other layers when anchored

    return (
        <div ref={container} className="relative h-[300vh]" style={{ marginTop: anchorOffset }}>
            <div className="sticky top-0 h-screen overflow-hidden z-0">
                {(onlyPrimary && primaryVideoIndex !== -1 ? [images[primaryVideoIndex]] : images).map((item, indexRaw) => {
                    // If only primary, we remap index to the actual index so styles still work if needed.
                    const index = onlyPrimary && primaryVideoIndex !== -1 ? primaryVideoIndex : indexRaw;
                    const { src, alt, type, poster } = item;
                    const mvScale = scales[index % scales.length];

					const inferredType: MediaType = type
						? type
						: /\.(mp4|webm|ogg)(\?|#|$)/i.test(src)
						? 'video'
						: 'image';

                    return (
                        <motion.div
                            key={index}
                            style={{ scale: ready ? mvScale : numericScales[index % numericScales.length] }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
                        >
                            <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-xl md:rounded-2xl">
                                {inferredType === 'video' ? (
                                    <>
                                        <video
                                            className="h-full w-full object-cover"
                                            src={src}
                                            poster={poster}
                                            muted
                                            playsInline
                                            preload="metadata"
                                            loop={false}
                                            ref={(el) => { videoRefs.current[index] = el; }}
                                            aria-label={alt || `Parallax video ${index + 1}`}
                                        />

										{/* overlay removed here; rendered once outside the scaled element */}
									</>
								) : (
									<img
										src={src || '/placeholder.svg'}
										alt={alt || `Parallax image ${index + 1}`}
										className="h-full w-full object-cover"
									/>
								)}
							</div>
						</motion.div>
					);
				})}

                {/* Global overlay that triggers when the primary video starts */}
                <div
                    className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[4vw] ${
                        overlayVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={!overlayVisible}
                >
                    <div
                        className="text-center font-extrabold"
                        style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}
                    >
                        {/* Mount only when visible so animation plays at the right time */}
                        {overlayVisible ? (
                            <TextGenerateEffect
                                key="grow-your-business-visible"
                                words="GROW YOUR BUSINESS"
                                // Override internal defaults to match hero styling
                                className="
                                  uppercase
                                  [&_div.text-2xl]:text-[clamp(74px,2.4vw,96px)] md:[&_div.text-2xl]:text-[clamp(76px,2vw,92px)]
                              [&_div.text-2xl]:leading-[1.1]
                              [&_div.text-2xl]:tracking-[0.02em]
                              lg:[&_div.text-2xl]:whitespace-nowrap
                              [&_div.mt-4]:mt-0
                              [&_span]:!text-white
                              [&_span]:drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
                            "
                                duration={1.2}
                                staggerDelay={0.45}
                        />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
