'use client';

import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

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
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
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

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden z-0">
				{images.map((item, index) => {
					const { src, alt, type, poster } = item;
					const scale = scales[index % scales.length];

					const inferredType: MediaType = type
						? type
						: /\.(mp4|webm|ogg)(\?|#|$)/i.test(src)
						? 'video'
						: 'image';

					return (
						<motion.div
							key={index}
							style={{ scale }}
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

				{/* Global overlay that fades in when the primary video starts */}
				<div
					className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[4vw] transition-opacity duration-300 ${
						overlayVisible ? 'opacity-100' : 'opacity-0'
					}`}
					aria-hidden={!overlayVisible}
				>
					<div
						className="text-white text-center leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] uppercase font-black tracking-[0.02em] text-[clamp(74px,2.4vw,96px)] md:text-[clamp(76px,2vw,92px)]"
						style={{ fontFamily: 'Bebas Neue, sans-serif' }}
					>
						<span>GROW</span>
						<br />
						<span>YOUR</span>
						<br />
						<span>BUSINESS</span>
					</div>
				</div>
			</div>
		</div>
	);
}
