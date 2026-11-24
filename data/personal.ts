export type PersonalPhoto = {
  src: string;
  alt: string;
  caption?: string;
  collection?: string;
  category?: string;
};

// Add local image paths and complete captions here as the gallery grows.
export const personalPhotos: PersonalPhoto[] = [];

// Collection IDs connect each photograph to its album without changing the gallery.
export const photoCollections = [
  { id: "nature", title: "Flora & fauna", categories: ["Plants", "Birds", "Mammals", "Reptiles", "Amphibians", "Insects", "Other wildlife"] },
  { id: "portraits", title: "Selfies & people", categories: ["Selfies", "Friends & family", "Portraits"] },
  { id: "scenery", title: "Scenery & light", categories: ["Landscapes", "Sunsets", "Water", "City scenes"] },
  { id: "everyday", title: "A little of everything", categories: ["Everyday", "Details", "Experiments", "Miscellaneous"] },
];

export const personalProjectSlugs = [
  "field-notes-photography-and-inaturalist",
] as const;
