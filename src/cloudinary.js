import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dqileksbl',
    api_key: '951195839295791',
    apy_secret: '9u84zbOC2zhwGP18BIJpxRqv4KI',
    secure: true
});

export async function UpImage (filepath)
{
    return await cloudinary.uploader.upload(filepath), {
        folder: 'Images_LitSwap'
    };
}

export async function deleteImage(public_id)
{
    return await cloudinary.uploader.destroy(public_id);
}