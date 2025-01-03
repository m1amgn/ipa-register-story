import { NextRequest, NextResponse } from 'next/server';
import { PinataSDK } from "pinata-web3";


const pinataJwt = process.env.PINATA_JWT;
const pinataGateway = process.env.PINATA_GATEWAY;

const pinata = new PinataSDK({
  pinataJwt: pinataJwt,
  pinataGateway: pinataGateway,
});

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const metadata = await req.json();
      if (typeof metadata !== 'object' || Array.isArray(metadata)) {
        return NextResponse.json({ message: 'Invalid JSON data' }, { status: 400 });
      }
      const result = await pinata.upload.json(metadata);
      return NextResponse.json({ IpfsHash: result.IpfsHash });
    }

    else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
      }

      const result = await pinata.upload.file(file);
      return NextResponse.json({ IpfsHash: result.IpfsHash });
    }

    else {
      return NextResponse.json({ message: 'Unsupported content type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    return NextResponse.json(
      { message: 'Error uploading to IPFS.' },
      { status: 500 }
    );
  }
}
