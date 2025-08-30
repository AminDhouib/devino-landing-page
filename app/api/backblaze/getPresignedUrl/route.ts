import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, bucketType = 'documents' } = await request.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: 'fileName and fileType are required' },
        { status: 400 }
      );
    }

    // Get BackBlaze B2 credentials from environment
    const applicationKeyId = process.env.BACKBLAZE_APPLICATION_KEY_ID;
    const applicationKey = process.env.BACKBLAZE_APPLICATION_KEY;
    const bucketId = bucketType === 'images' 
      ? process.env.BACKBLAZE_BUCKET_ID_IMAGES 
      : process.env.BACKBLAZE_BUCKET_ID_DOCUMENTS;

    if (!applicationKeyId || !applicationKey || !bucketId) {
      return NextResponse.json(
        { error: 'BackBlaze B2 configuration missing' },
        { status: 500 }
      );
    }

    // Authorize with BackBlaze B2
    const authResponse = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${applicationKeyId}:${applicationKey}`).toString('base64')}`,
      },
    });

    if (!authResponse.ok) {
      throw new Error('Failed to authorize with BackBlaze B2');
    }

    const authData = await authResponse.json();

    // Get upload URL
    const uploadUrlResponse = await fetch(`${authData.apiUrl}/b2api/v3/b2_get_upload_url`, {
      method: 'POST',
      headers: {
        'Authorization': authData.authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bucketId: bucketId,
      }),
    });

    if (!uploadUrlResponse.ok) {
      throw new Error('Failed to get upload URL from BackBlaze B2');
    }

    const uploadData = await uploadUrlResponse.json();

    // Generate unique file name with timestamp
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${fileName}`;

    return NextResponse.json({
      uploadUrl: uploadData.uploadUrl,
      authorizationToken: uploadData.authorizationToken,
      fileName: uniqueFileName,
      fileKey: uniqueFileName, // Store this in database instead of full URL
    });

  } catch (error) {
    console.error('BackBlaze B2 presigned URL error:', error);
    return NextResponse.json(
      { error: 'Failed to generate presigned URL' },
      { status: 500 }
    );
  }
}
