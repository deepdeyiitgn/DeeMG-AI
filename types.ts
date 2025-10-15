
export enum GenerationType {
  Wedding = 'WEDDING',
  Baby = 'BABY',
  Location = 'LOCATION',
}

export interface ImageFile {
  base64: string;
  mimeType: string;
}
