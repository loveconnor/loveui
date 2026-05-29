import { LazyImage } from "./lazy-image";

export function ImageGallery() {
	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-10">
			<div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
				{columns.map((column, col) => (
					<div className="grid gap-4" key={col}>
						{column.map((image) => (
							<LazyImage
								alt={image.alt}
								containerClassName="rounded-lg"
								fallback={image.fallback}
								inView={true}
								key={image.src}
								ratio={image.ratio}
								src={image.src}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

type GalleryImage = {
	alt: string;
	src: string;
	fallback: string;
	ratio: number;
};

const wikimediaImage = (fileName: string, width = 900) =>
	`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
		fileName
	)}?width=${width}`;

const images: GalleryImage[] = [
	{
		alt: "University Hall on The Ohio State University campus",
		src: wikimediaImage(
			"University Hall, The Ohio State University (Columbus, Ohio).jpg"
		),
		fallback: "https://placehold.co/900x600?text=University+Hall",
		ratio: 3 / 2,
	},
	{
		alt: "Ohio Stadium viewed from above",
		src: wikimediaImage("View of Ohio Stadium.jpg"),
		fallback: "https://placehold.co/900x600?text=Ohio+Stadium",
		ratio: 3 / 2,
	},
	{
		alt: "Mirror Lake at The Ohio State University",
		src: wikimediaImage(
			"Mirror Lake at The Ohio State University - DPLA - f1276865f9c52083353de2c6b0068290.jpg"
		),
		fallback: "https://placehold.co/900x600?text=Mirror+Lake",
		ratio: 3 / 2,
	},
	{
		alt: "Thompson Library at The Ohio State University",
		src: wikimediaImage(
			"Thompson Library at The Ohio State University - DPLA - d4a313f4ce0cca7538bf0ea6508722ae.jpg"
		),
		fallback: "https://placehold.co/600x900?text=Thompson+Library",
		ratio: 2 / 3,
	},
	{
		alt: "Ohio Stadium rotunda",
		src: wikimediaImage("Ohio State University-Ohio Stadium-Rotunda.jpg"),
		fallback: "https://placehold.co/900x600?text=Stadium+Rotunda",
		ratio: 3 / 2,
	},
	{
		alt: "The spring and Mirror Lake at Ohio State University",
		src: wikimediaImage(
			"The Spring and Mirror Lake at Ohio State University - DPLA - 238a754a6579c3fd1788745a85caaf4c (page 1).jpg"
		),
		fallback: "https://placehold.co/900x600?text=Mirror+Lake",
		ratio: 3 / 2,
	},
	{
		alt: "Ohio Stadium at The Ohio State University",
		src: wikimediaImage(
			"Ohio Stadium at The Ohio State University - DPLA - fa20937cd54b73c1c34c09ac5d4d3e6d.jpg"
		),
		fallback: "https://placehold.co/900x600?text=Ohio+Stadium",
		ratio: 16 / 10,
	},
	{
		alt: "Thompson Library from the first floor",
		src: wikimediaImage(
			"Ohio State University - Thompson Library from First Floor.jpg"
		),
		fallback: "https://placehold.co/900x675?text=Thompson+Library",
		ratio: 4 / 3,
	},
	{
		alt: "Ohio Stadium exterior",
		src: wikimediaImage("OSU Ohio Stadium.JPG"),
		fallback: "https://placehold.co/900x675?text=Ohio+Stadium",
		ratio: 4 / 3,
	},
	{
		alt: "Panoramic view of Ohio Stadium",
		src: wikimediaImage("Ohio Stadium (37516165921).jpg", 1200),
		fallback: "https://placehold.co/1200x460?text=Ohio+Stadium",
		ratio: 21 / 9,
	},
	{
		alt: "Historic Ohio State University campus view",
		src: wikimediaImage(
			"Ohio State University campus - DPLA - 74170bd1ea1086f74720703e80e0dc4c.jpg"
		),
		fallback: "https://placehold.co/900x600?text=Ohio+State+Campus",
		ratio: 3 / 2,
	},
	{
		alt: "Ohio State University campus aerial view",
		src: wikimediaImage(
			"Ohio State University campus aerial view looking west - DPLA - cb1a04591333ede0f6ac506328c1c460.jpg"
		),
		fallback: "https://placehold.co/900x600?text=Campus+Aerial",
		ratio: 3 / 2,
	},
];

const columns = [
	[images[0], images[3], images[6]],
	[images[1], images[4], images[8]],
	[images[2], images[5], images[9]],
	[images[7], images[10], images[11]],
];
