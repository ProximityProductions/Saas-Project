export interface  Video{
    id: number;
    title: string;
    description: string;
    originalSize: number;
    compressedSize: number;
    createdAt: Date;
    publicId: string;
    duration: number;
    updatedAt: Date;
}
